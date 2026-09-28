#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCUMENT_DIRS = [ROOT / "root", ROOT / "cross-cutting"]
REQUIRED_FIELDS = (
    "document_name",
    "document_class",
    "structural_classification",
    "system",
    "owner",
    "related_issue",
    "universal_identifier",
    "version",
    "status",
    "depends_on",
    "source_representation",
    "representation_profile",
)
ID_RE = re.compile(r'^universal_identifier:\s*"?(DIUA-DIC-\d{6})"?\s*$', re.MULTILINE)
LINK_RE = re.compile(r'\]\((?!https?://|mailto:)([^)#?]+\.md)(?:#[^)]+)?\)')

errors = []
seen_ids = {}

files = []
for directory in DOCUMENT_DIRS:
    if directory.exists():
        files.extend(sorted(directory.rglob("*.md")))

for path in files:
    text = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)

    if not text.startswith("---\n") or "\n---\n" not in text[4:]:
        errors.append(f"{rel}: META-01 missing YAML front matter")
        continue

    end = text.find("\n---\n", 4)
    front = text[4:end]

    for field in REQUIRED_FIELDS:
        if not re.search(rf"^{re.escape(field)}:", front, re.MULTILINE):
            errors.append(f"{rel}: META-01 missing field {field}")

    match = ID_RE.search(front)
    if not match:
        errors.append(f"{rel}: ID-01 malformed or missing universal_identifier")
        continue

    doc_id = match.group(1)
    if doc_id in seen_ids:
        errors.append(f"{rel}: ID-02 duplicate {doc_id}; first seen in {seen_ids[doc_id]}")
    else:
        seen_ids[doc_id] = rel

    if not path.name.startswith(doc_id + "_"):
        errors.append(f"{rel}: NAME-01 filename does not start with {doc_id}_")

    for target in LINK_RE.findall(text):
        resolved = (path.parent / target).resolve()
        try:
            resolved.relative_to(ROOT)
        except ValueError:
            errors.append(f"{rel}: LINK-01 link escapes repository: {target}")
            continue
        if not resolved.exists():
            errors.append(f"{rel}: LINK-01 missing relative target: {target}")

if errors:
    print("Content OS validation FAILED")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print(f"Content OS validation PASS: {len(files)} governed repository documents; {len(seen_ids)} unique identifiers.")
