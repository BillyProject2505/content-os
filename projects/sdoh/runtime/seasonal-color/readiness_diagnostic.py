"""Read-only SDOH November readiness probe. Never dispatches or publishes."""
import hashlib
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

HEALTH = "https://sdoh-instagram-publication-executor.billyfernando2505.workers.dev/health"
INDEX = "projects/sdoh/runtime/seasonal-color/2026-11-delivery-preparation.json"

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

def get(url, token="", limit=20 * 1024 * 1024):
    request = urllib.request.Request(
        url, method="GET",
        headers={"User-Agent": "sdoh-readiness-diagnostic/1.0"},
    )
    if token:
        request.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.build_opener(NoRedirect).open(request, timeout=20) as response:
            data = response.read(limit + 1)
            if len(data) > limit:
                return 0, b""
            return response.status, data
    except urllib.error.HTTPError as error:
        return error.code, b""
    except Exception:
        # Never emit error strings, response bodies, headers or credentials.
        return 0, b""

def media_rows(index):
    records = index["records"]
    if len(records) != 13:
        raise ValueError("INVALID_INDEX")
    rows, contents, files = [], set(), set()
    for record in records:
        cid = record["content_id"]
        if not re.fullmatch(r"SDOH-(SAGE|BURGUNDY)-CAR-[0-9]{4}", cid) or cid in contents:
            raise ValueError("INVALID_INDEX")
        contents.add(cid)
        media = record["media"]
        if sorted(m["slot"] for m in media) != [1, 2, 3, 4, 5]:
            raise ValueError("INVALID_INDEX")
        for item in media:
            fid = item["drive_file_id"]
            if (not re.fullmatch(r"[A-Za-z0-9_-]+", fid) or fid in files
                or not re.fullmatch(r"[0-9a-f]{64}", item["sha256"])
                or item["mime_type"] != "image/jpeg"):
                raise ValueError("INVALID_INDEX")
            files.add(fid)
            rows.append((cid, item))
    return rows

def probe(index, env, fetch=get):
    report = {
        "mode": "READ_ONLY",
        "publication_authorized": False,
        "config_present": {k: bool(env.get(k)) for k in (
            "GCP_PROJECT_ID", "GCP_WORKLOAD_IDENTITY_PROVIDER", "GCP_SERVICE_ACCOUNT")},
        "secret_present": {k: env.get(k + "_PRESENT") == "true" for k in (
            "LINEAR_API_KEY", "EXECUTOR_INGEST_SECRET")},
        "github_scheduler_enabled": env.get("SDOH_SCHEDULED_AUTOMATION_ENABLED") == "true",
        "wif_token_obtained": bool(env.get("GOOGLE_ACCESS_TOKEN")),
        "media": [],
        "limitations": [
            "Secret presence does not prove credential validity.",
            "Health wakeup flag does not prove deployed cron or successful GitHub dispatch.",
            "Manual publishing flag does not describe scheduled-mode authorization.",
            "This report does not authorize or schedule publication."
        ],
    }
    try:
        rows = media_rows(index)
    except (KeyError, ValueError, TypeError):
        rows = []
        report["index"] = "INVALID"
    else:
        report["index"] = "VALID"
    token = env.get("GOOGLE_ACCESS_TOKEN", "")
    for cid, item in rows:
        result = {"content_id": cid, "slot": item["slot"]}
        if not token:
            result["status"] = "NOT_TESTED_NO_TOKEN"
        else:
            code, data = fetch("https://www.googleapis.com/drive/v3/files/"
                               + item["drive_file_id"] + "?alt=media", token)
            result["http_status"] = code
            result["status"] = ("PASS" if code == 200 and
                hashlib.sha256(data).hexdigest() == item["sha256"] else
                "HASH_MISMATCH" if code == 200 else "READ_FAILED")
        report["media"].append(result)
    code, data = fetch(HEALTH)
    health = {"http_status": code, "status": "FAILED"}
    if code == 200:
        try:
            raw = json.loads(data)
            ig = raw.get("instagram", {})
            health.update({
                "ok": raw.get("ok") is True,
                "expected_username": ig.get("username") == "satudosisobathati",
                "user_id_match": ig.get("user_id_match") is True,
                "publishing_enabled": raw.get("publishing_enabled") is True,
                "scheduled_wakeup_enabled": raw.get("scheduled_wakeup_enabled") is True,
            })
            sha = raw.get("deployment", {}).get("commit_sha", "")
            health["commit_sha"] = sha if isinstance(sha, str) and re.fullmatch(r"[0-9a-f]{40}", sha) else None
            health["status"] = "PASS" if all(health[k] for k in
                ("ok", "expected_username", "user_id_match")) else "FAILED"
        except (ValueError, AttributeError, TypeError):
            pass
    report["worker"] = health
    report["media_passed"] = sum(m["status"] == "PASS" for m in report["media"])
    report["checks_passed"] = (
        report["index"] == "VALID" and report["media_passed"] == 65
        and all(report["config_present"].values())
        and all(report["secret_present"].values())
        and report["github_scheduler_enabled"]
        and health["status"] == "PASS" and health.get("scheduled_wakeup_enabled") is True
    )
    return report

if __name__ == "__main__":
    try:
        index = json.loads(Path(INDEX).read_text())
    except (OSError, ValueError):
        index = {}
    report = probe(index, os.environ)
    report["checked_commit"] = os.environ.get("GITHUB_SHA", "")
    output = Path(os.environ.get("RUNNER_TEMP", ".")) / "sdoh-readiness.json"
    output.write_text(json.dumps(report, indent=2) + "\n")
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a") as handle:
            handle.write("### SDOH read-only diagnostics\n\n```json\n"
                         + json.dumps(report, indent=2) + "\n```\n")
    print("Read-only diagnostics: " + ("PASS" if report["checks_passed"] else "INCOMPLETE_OR_FAILED"))
    sys.exit(0 if report["checks_passed"] else 1)
