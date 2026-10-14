#!/usr/bin/env python3
"""Read-only GitHub -> live Linear tracker reconciliation.

No GraphQL mutations. No writeback. Reports only sanitized identifiers and versions.
Unverifiable free-text claims are NOT reported as PASS.
"""
from collections import Counter
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DIRECTORIES = ("root", "cross-cutting", "system", "projects")
ENDPOINT = "https://api.linear.app/graphql"
SCOPE_OPTIONS = {"all", "root", "cross-cutting", "system", "cwc", "sdoh", "kds"}
DOC_ID = re.compile(r"^DIUA-DIC-\d{6}$")
ISSUE_ID = re.compile(r"^BUS-\d+$")
VERSION = re.compile(r"\bv(\d+(?:\.\d+)+)\b", re.IGNORECASE)
MARKER = re.compile(
    r"<!--\s*CONTENT_OS_CURRENT_AUTHORITY:\s*(DIUA-DIC-\d{6})@v?(\d+(?:\.\d+)+)\s*-->",
    re.IGNORECASE,
)
ALIASES = {
    "DIUA-DIC-000008": ("SDOH Production SOP", "Production SOP"),
    "DIUA-DIC-000012": ("CWC Production Bible", "CPB"),
    "DIUA-DIC-000013": ("CWC Asset System", "CAS"),
    "DIUA-DIC-000014": ("CWC Asset Registry", "CAR"),
    "DIUA-DIC-000015": ("CWC Asset Bible", "CAB"),
    "DIUA-DIC-000016": ("CWC Reference Sheet", "CRS"),
    "DIUA-DIC-000017": ("CWC Production Workflow", "Workflow"),
    "DIUA-DIC-000018": ("CWC-FSS-001", "FSS-001"),
    "DIUA-DIC-000019": ("CWC-QA-001", "QA-001"),
    "DIUA-DIC-000022": ("Sage Reels Register", "Sage Reels Content Register"),
    "DIUA-DIC-000024": ("Sage TikTok Poster Content Register", "Sage Poster Register"),
    "DIUA-DIC-000025": ("Burgundy TikTok Poster Content Register", "Burgundy Poster Register"),
    "DIUA-DIC-000027": ("CWC Content Register",),
    "DIUA-DIC-000028": ("FORMAT-POSTER",),
    "DIUA-DIC-000029": ("FORMAT-CAROUSEL",),
    "DIUA-DIC-000030": ("FORMAT-REEL",),
    "DIUA-DIC-000031": ("FORMAT-STORY",),
    "DIUA-DIC-000037": ("Reflection Carousel Format Specification",),
    "DIUA-DIC-000038": ("Psychology Series Production Bible",),
    "DIUA-DIC-000039": ("Psychology Series Layout Bible",),
}


def scalar(text, name):
    found = re.search(r"^\s*" + re.escape(name) + r":\s*(.+?)\s*$", text, re.M)
    if not found:
        return None
    value = found.group(1).strip()
    if value == "null":
        return None
    return value[1:-1] if value.startswith('"') and value.endswith('"') else value


def parse_doc(text, path="<fixture>"):
    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        raise ValueError("DOCUMENT_FRONTMATTER_INVALID")
    header = text[4:text.index("\n---\n", 4)]
    depends = re.search(r"^depends_on:\n((?:^[ \t].*(?:\n|$))*)", header, re.M)
    entries = re.split(r"(?=^  - id:)", depends.group(1) if depends else "", flags=re.M)
    dependencies = []
    for part in entries:
        if not re.match(r"^  - id:", part):
            continue
        normalized = part.replace("  - id:", "id:", 1)
        dependencies.append({
            "id": scalar(normalized, "id"),
            "name": scalar(part, "name"),
            "version": scalar(part, "version"),
        })
    result = {
        "document_id": scalar(header, "universal_identifier"),
        "issue_id": scalar(header, "related_issue"),
        "title": scalar(header, "document_name"),
        "version": scalar(header, "version"),
        "dependencies": dependencies,
        "path": str(path),
    }
    if not result["title"] or not result["version"]:
        raise ValueError("DOCUMENT_METADATA_INCOMPLETE")
    return result


def aliases(doc):
    name = doc.get("title") or ""
    suffix = name.rsplit(" — ", 1)[-1]
    unique = set((name, suffix, *ALIASES.get(doc.get("document_id"), ())))
    return sorted((x for x in unique if len(x) >= 4), key=len, reverse=True)


def strip_markup(line):
    line = re.sub(r"<issue\b[^>]*>([^<]*)</issue>", r"\1", line, flags=re.I)
    line = re.sub(r"\[([^\]]+)\]\(<[^>]*>\)", r"\1", line)
    line = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", line)
    # Linear Markdown may escape literal wildcard characters in canonical names
    # such as "DOC-\\*". Normalize escape sequences before stripping markup.
    line = re.sub(r"\\([*_`])", r"\1", line)
    line = re.sub(r"[*_`]", "", line)
    return re.sub(r"<[^>]+>", "", line)


def version_near_name(line, doc):
    line = strip_markup(line)
    for alias in aliases(doc):
        # Normalize the canonical name exactly like the rendered tracker text.
        normalized_alias = strip_markup(alias)
        found = re.search(r"(?<![A-Za-z0-9])" + re.escape(normalized_alias) + r"(?![A-Za-z0-9])", line, re.I)
        if not found:
            continue
        after = re.split(r"[;|\n]", line[found.end():], maxsplit=1)[0][:65]
        version = VERSION.search(after)
        if version:
            return version.group(1)
    return None


def contexts(description):
    heading = ""
    section_date = None
    offset = 0
    for number, raw in enumerate(description.replace("\r\n", "\n").split("\n")):
        if re.match(r"^#{1,3}\s", raw):
            heading = raw
            found = re.search(r"\b20\d{2}-\d{2}-\d{2}\b", raw)
            section_date = found.group() if found else None
            offset = 0
        else:
            offset += 1
        yield {"text": strip_markup(raw), "raw": raw, "heading": heading,
               "date": section_date, "offset": offset, "number": number}


def choose_claim(candidates):
    if not candidates:
        return {"state": "NOT_DECLARED"}
    # Legacy issue histories can have dated "current" checkpoints from older
    # revisions alongside newer undated assertions. Do not guess precedence.
    versions = sorted(set(x["version"] for x in candidates))
    if len(versions) > 1:
        return {"state": "AMBIGUOUS"}
    return {
        "state": "ASSERTED", "version": versions[0],
        "evidence": "unambiguous_current_assertion",
    }


def current_authority(description, doc):
    marker_values = {m.group(2) for m in MARKER.finditer(description)
                     if m.group(1) == doc.get("document_id")}
    if marker_values:
        return ({"state": "ASSERTED", "version": next(iter(marker_values)), "evidence": "structured_marker"}
                if len(marker_values) == 1 else {"state": "AMBIGUOUS"})
    candidates = []
    for ctx in contexts(description):
        if ctx["raw"].lstrip().startswith("#") or re.match(
            r"^\s*(historical|earlier|prior state|previous)", ctx["text"], re.I
        ):
            continue
        pin = version_near_name(ctx["text"], doc)
        if not pin:
            continue
        direct = bool(re.search(r"\b(current|terkini)\b", ctx["text"], re.I))
        current_section = bool(re.search(
            r"^#{1,3}\s.*(\bcurrent\b|canonical version pointer)", ctx["heading"], re.I
        )) and ctx["offset"] <= 7
        if direct or current_section:
            candidates.append({
                "version": pin, "date": ctx["date"], "strength": 2 if direct else 1,
            })
    return choose_claim(candidates)


def current_dependency_assertions(description, doc):
    qualifying = []
    for ctx in contexts(description):
        direct = bool(re.search(r"\bcurrent\s+(depends on|formal dependency|normative)", ctx["text"], re.I))
        section = (bool(re.search(r"^#{1,3}\s.*current normative", ctx["heading"], re.I))
                   and ctx["offset"] <= 15)
        if direct or section:
            qualifying.append(ctx)
    records = []
    for dep in doc["dependencies"]:
        if not dep["id"] or not dep["version"]:
            continue
        claims = []
        for ctx in qualifying:
            pin = version_near_name(ctx["text"], {"document_id": dep["id"], "title": dep["name"]})
            if pin:
                claims.append({"version": pin, "date": ctx["date"], "strength": 2})
        selected = choose_claim(claims)
        if selected["state"] == "NOT_DECLARED":
            continue
        records.append({
            "dependency_id": dep["id"],
            "expected": dep["version"],
            "observed": selected.get("version"),
            "status": ("AMBIGUOUS" if selected["state"] == "AMBIGUOUS"
                       else "MATCH" if selected["version"] == dep["version"] else "DRIFT"),
        })
    return records


def assess(doc, issue):
    record = {"document_id": doc["document_id"], "issue_id": doc["issue_id"],
              "expected_version": doc["version"]}
    if not issue or issue.get("identifier") != doc["issue_id"]:
        return dict(record, status="ISSUE_NOT_FOUND", dependency_results=[])
    description = issue.get("description") or ""
    claim = current_authority(description, doc)
    dependencies = current_dependency_assertions(description, doc)
    if claim["state"] == "AMBIGUOUS":
        result = "AMBIGUOUS"
    elif claim["state"] == "NOT_DECLARED":
        result = "NOT_DECLARED"
    else:
        result = "MATCH" if claim["version"] == doc["version"] else "DRIFT"
    return dict(record, status=result, observed_version=claim.get("version"),
                evidence=claim.get("evidence"), dependency_results=dependencies)


def graph_query(ids):
    if not ids or not all(ISSUE_ID.fullmatch(value) for value in ids):
        raise ValueError("INVALID_ISSUE_IDS")
    lines = ['query ContentOSReadOnlyIssueAudit {']
    for index, identifier in enumerate(ids):
        lines.append('  i{0}: issue(id: "{1}") {{ identifier title description updatedAt url }}'.format(index, identifier))
    return "\n".join(lines + ["}"])


def fetch_live(api_key, issue_ids, transport=urlopen):
    output = {}
    for offset in range(0, len(issue_ids), 8):
        batch = issue_ids[offset:offset + 8]
        payload = json.dumps({"query": graph_query(batch)}).encode("utf-8")
        request = Request(ENDPOINT, data=payload, method="POST",
                          headers={"Content-Type": "application/json", "Authorization": api_key})
        try:
            with transport(request, timeout=15) as response:
                if response.status != 200:
                    raise RuntimeError("LINEAR_HTTP_" + str(response.status))
                parsed = json.load(response)
        except HTTPError as error:
            raise RuntimeError("LINEAR_HTTP_" + str(error.code)) from None
        except (URLError, TimeoutError):
            raise RuntimeError("LINEAR_NETWORK_FAILURE") from None
        except (ValueError, json.JSONDecodeError):
            raise RuntimeError("LINEAR_JSON_FAILURE") from None
        if parsed.get("errors") or not isinstance(parsed.get("data"), dict):
            raise RuntimeError("LINEAR_GRAPHQL_QUERY_REJECTED")
        for idx, issue_id in enumerate(batch):
            output[issue_id] = parsed["data"].get("i" + str(idx))
    return output


def included(path, scope):
    if scope == "all":
        return True
    prefix = scope + "/" if scope in ("root", "cross-cutting", "system") else "projects/" + scope + "/"
    return path.replace("\\", "/").startswith(prefix)


def render_summary(report):
    c = report["counts"]
    rows = [
        "## Content OS — Linear read-only dependency reconciliation", "",
        "- GitHub revision: " + report["github_revision"],
        "- Scope: " + report["scope"] + "; governed documents: " + str(report["scanned_documents"]) +
        "; unique issues queried: " + str(report["issues_queried"]),
        "- MATCH: {0}; DRIFT: {1}; AMBIGUOUS: {2}; NOT_DECLARED: {3}; ISSUE_NOT_FOUND: {4}".format(
            *(c.get(x, 0) for x in ("MATCH", "DRIFT", "AMBIGUOUS", "NOT_DECLARED", "ISSUE_NOT_FOUND"))),
        "- Dependency claims compared: {0}; dependency DRIFT: {1}".format(
            report["dependency_comparisons"], report["dependency_drift"]),
        "",
        "Scope limitation: only unambiguous current-version assertions in live issue descriptions are compared. "
        "NOT_DECLARED means NOT VERIFIED, not PASS. Historical prose and migrated document titles are not "
        "treated as current authority. Linked Linear documents and issue relations are outside this audit.",
        "",
    ]
    exceptions = [r for r in report["results"] if r["status"] != "MATCH" or any(
        d["status"] != "MATCH" for d in r["dependency_results"])]
    if exceptions:
        rows += ["| Document | Linear issue | GitHub version | Tracker version | Result |",
                 "|---|---|---|---|---|"]
        for r in exceptions:
            rows.append("| {0} | {1} | {2} | {3} | {4} |".format(
                r["document_id"] or "exempt", r["issue_id"],
                r["expected_version"], r.get("observed_version") or "—", r["status"]))
    return "\n".join(rows) + "\n"


def main():
    scope = os.getenv("AUDIT_SCOPE", "all")
    if scope not in SCOPE_OPTIONS:
        raise RuntimeError("INVALID_AUDIT_SCOPE")
    api_key = os.getenv("LINEAR_API_KEY", "")
    if not api_key:
        raise RuntimeError("LINEAR_API_KEY_MISSING")
    docs = []
    for directory in DIRECTORIES:
        for path in sorted((ROOT / directory).rglob("*.md")) if (ROOT / directory).exists() else []:
            rel = str(path.relative_to(ROOT))
            if included(rel, scope):
                docs.append(parse_doc(path.read_text(encoding="utf-8"), rel))
    linked = [x for x in docs if ISSUE_ID.fullmatch(x["issue_id"] or "") and
              (not x["document_id"] or DOC_ID.fullmatch(x["document_id"]))]
    ids = sorted({x["issue_id"] for x in linked})
    if not ids:
        raise RuntimeError("NO_LINKED_ISSUES")
    live = fetch_live(api_key, ids)
    results = [assess(doc, live.get(doc["issue_id"])) for doc in linked]
    counts = dict(Counter(r["status"] for r in results))
    comparisons = sum(len(r["dependency_results"]) for r in results)
    dep_drift = sum(sum(d["status"] == "DRIFT" for d in r["dependency_results"]) for r in results)
    report = {"schema": "content-os-linear-readonly-v1", "generated_at": datetime.now(timezone.utc).isoformat(),
              "github_revision": os.getenv("GITHUB_SHA", "local"), "scope": scope,
              "scanned_documents": len(docs), "issues_queried": len(ids), "counts": counts,
              "dependency_comparisons": comparisons, "dependency_drift": dep_drift,
              "results": results}
    output = os.getenv("AUDIT_OUTPUT_PATH")
    if output:
        Path(output).write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    summary = render_summary(report)
    if os.getenv("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as stream:
            stream.write(summary)
    print(summary)
    if counts.get("DRIFT") or counts.get("ISSUE_NOT_FOUND") or dep_drift:
        return 2
    if os.getenv("AUDIT_STRICT", "").lower() == "true" and (counts.get("NOT_DECLARED") or counts.get("AMBIGUOUS")):
        return 3
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        # No token, raw GraphQL errors, remote descriptions, or HTTP response bodies.
        code = str(error).split(":", 1)[0]
        if not re.match(r"^(LINEAR_|INVALID_|NO_LINKED_|DOCUMENT_)", code):
            code = "AUDIT_UNEXPECTED_ERROR"
        print("Linear read-only reconciliation ERROR: " + code, file=sys.stderr)
        sys.exit(4)
