#!/usr/bin/env python3
"""Read-only CI checks for governed-document version and issue-pointer drift.

Checks the checked-out GitHub corpus only. Linear live state is NOT queried.
Historical prose and provenance locators are not interpreted as current pins.
"""
from dataclasses import dataclass
from pathlib import Path
import re
import sys

DIRECTORIES = ("root", "cross-cutting", "system", "projects")
SCALAR_RE = re.compile(r'^([a-z][a-z0-9_]*):\s*(.*?)\s*$', re.M)
ROW_RE = re.compile(r'^\|\s*Depends On\s*\|\s*(.*?)\s*\|\s*$', re.M)
ISSUE_ROW_RE = re.compile(r'^\|\s*Related Issue\s*\|\s*(.*?)\s*\|\s*$', re.M)
VERSION_RE = re.compile(r'\bv(\d+(?:\.\d+)+)\b')
ID_RE = re.compile(r'^DIUA-DIC-\d{6}$')
ALIASES = {
    'DIUA-DIC-000012': ('CPB',),
    'DIUA-DIC-000013': ('CAS',),
    'DIUA-DIC-000014': ('CAR',),
    'DIUA-DIC-000015': ('CAB',),
    'DIUA-DIC-000016': ('CRS',),
    'DIUA-DIC-000018': ('FSS-001', 'CWC-FSS-001'),
    'DIUA-DIC-000019': ('QA-001', 'CWC-QA-001'),
}


@dataclass
class Document:
    path: Path
    document_id: str | None
    name: str
    version: str
    issue: str
    body: str
    dependencies: list[dict[str, str | None]]


def scalar(raw: str) -> str | None:
    raw = raw.strip()
    if raw in ('null', '~', ''):
        return None
    if raw.startswith('"') and raw.endswith('"'):
        return raw[1:-1]
    return raw


def frontmatter(text: str) -> tuple[str, str] | None:
    if not text.startswith('---\n'):
        return None
    end = text.find('\n---\n', 4)
    if end < 0:
        return None
    return text[4:end], text[end + 5:]


def document_from_path(path: Path) -> tuple[Document | None, list[str]]:
    parsed = frontmatter(path.read_text(encoding='utf-8'))
    if parsed is None:
        return None, [f'{path}: DEP-META-01 malformed front matter (also covered by validate_documents.py)']
    header, body = parsed
    values = {key: scalar(val) for key, val in SCALAR_RE.findall(header)}
    block = re.search(r'(?m)^depends_on:\s*\n((?:^[ \t].*\n|^\s*\n)*)', header + '\n')
    dependencies: list[dict[str, str | None]] = []
    errors: list[str] = []
    if block:
        current: dict[str, str | None] | None = None
        for line in block.group(1).splitlines():
            start = re.fullmatch(r'\s{2}- id:\s*(.*?)\s*', line)
            prop = re.fullmatch(r'\s{4}(name|version|status):\s*(.*?)\s*', line)
            if start:
                if current is not None:
                    dependencies.append(current)
                current = {'id': scalar(start.group(1))}
            elif prop and current is not None:
                current[prop.group(1)] = scalar(prop.group(2))
            elif line.strip():
                errors.append(f'{path}: DEP-META-01 unrecognized depends_on entry: {line.strip()[:80]}')
        if current is not None:
            dependencies.append(current)
    for dep in dependencies:
        if not dep.get('name') or (dep.get('id') is not None and not ID_RE.fullmatch(dep['id'] or '')):
            errors.append(f'{path}: DEP-META-01 dependency missing name or invalid identifier: {dep}')
    doc = Document(path, values.get('universal_identifier'), values.get('document_name') or '',
                   values.get('version') or '', values.get('related_issue') or '', body, dependencies)
    return doc, errors


def aliases_for(dep: dict[str, str | None]) -> list[str]:
    name = dep.get('name') or ''
    variants = [name]
    if ' — ' in name:
        variants.append(name.rsplit(' — ', 1)[1])
    if name.startswith(('CWC ', 'SDOH ', 'KDS ')):
        variants.append(name.split(' ', 1)[1])
    variants.extend(ALIASES.get(dep.get('id') or '', ()))
    return sorted({v for v in variants if len(v) >= 3}, key=len, reverse=True)


def find_body_versions(row: str, dep: dict[str, str | None]) -> list[str]:
    # Inspect a matching dependency name in the semicolon-delimited identity row.
    # Do not interpret prose, change logs or source-representation URLs as active pins.
    found = []
    for alias in aliases_for(dep):
        pattern = re.compile(r'(?<![\w])' + re.escape(alias) + r'(?![\w])', re.I)
        for match in pattern.finditer(row):
            tail = row[match.end():].split(';', 1)[0].split('|', 1)[0]
            vm = VERSION_RE.search(tail[:130])
            if vm:
                found.append(vm.group(1))
        if found:
            break
    return found


def historical_table_exception(doc: Document, dep: dict[str, str | None], found: str) -> bool:
    # Existing migrated KDS Production Bible explicitly retains its old table pin.
    # Such an exception must be documented ahead of the Document Identity section.
    prefix = doc.body.split('## Document Identity', 1)[0]
    return (('Migration dependency note' in prefix) and
            ('historical provenance' in prefix) and
            ('frontmatter' in prefix) and
            (f'v{found}' in prefix) and (f'v{dep.get("version")}' in prefix) and
            any(alias.lower() in prefix.lower() for alias in aliases_for(dep)))


def validate(root: Path) -> tuple[list[str], int, int, int]:
    paths = sorted(p for directory in DIRECTORIES for p in (root / directory).rglob('*.md')
                   if (root / directory).exists())
    docs: list[Document] = []
    errors: list[str] = []
    for path in paths:
        doc, doc_errors = document_from_path(path)
        errors.extend(doc_errors)
        if doc:
            docs.append(doc)
    by_id = {d.document_id: d for d in docs if d.document_id and ID_RE.fullmatch(d.document_id)}
    by_name = {d.name: d for d in docs if d.name}
    checked = body_checked = 0
    for doc in docs:
        rel = doc.path.relative_to(root)
        for dep in doc.dependencies:
            dep_id, name, pin = dep.get('id'), dep.get('name'), dep.get('version')
            target = (by_id.get(dep_id) if dep_id else by_name.get(name or ''))
            if dep_id and not target:
                errors.append(f'{rel}: DEP-TARGET-01 unresolved registered dependency {dep_id} ({name})')
                continue
            if not target:
                continue  # Unregistered/external authority: no invented current version.
            if pin:
                checked += 1
                if pin != target.version:
                    errors.append(f'{rel}: DEP-VERSION-01 {dep_id or name} pinned v{pin}; current {target.path.relative_to(root)} is v{target.version}')
        row = ROW_RE.search(doc.body)
        if row:
            for dep in doc.dependencies:
                if not dep.get('version'):
                    continue
                for body_pin in find_body_versions(row.group(1), dep):
                    body_checked += 1
                    if body_pin != dep['version'] and not historical_table_exception(doc, dep, body_pin):
                        errors.append(f'{rel}: DEP-BODY-01 {dep.get("name")}: YAML v{dep.get("version")}, Document Identity Depends On v{body_pin}')
        related = ISSUE_ROW_RE.search(doc.body)
        if related and re.fullmatch(r'BUS-\d+', doc.issue):
            mentioned = re.search(r'\bBUS-\d+\b', related.group(1))
            if mentioned and mentioned.group(0) != doc.issue:
                errors.append(f'{rel}: DEP-ISSUE-01 related_issue {doc.issue} vs Document Identity {mentioned.group(0)}')
    return errors, len(docs), checked, body_checked


def main() -> int:
    errors, docs, pins, body = validate(Path(__file__).resolve().parents[1])
    if errors:
        print('Content OS dependency drift validation FAILED')
        for error in errors:
            print(f'- {error}')
        return 1
    print(f'Content OS dependency drift validation PASS: {docs} documents; '
          f'{pins} repository version pins; {body} explicit body pin comparisons; '
          'Linear live tracker not checked.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
