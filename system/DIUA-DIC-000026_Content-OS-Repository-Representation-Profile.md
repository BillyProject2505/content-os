---
document_name: "Content OS — Repository Representation Profile"
document_class: "System-Level Implementation Specification"
structural_classification: "Tiered — Document Tier: System Level (Tier 1)"
system: "Content OS"
owner: "[FORMAL] Billy Fernando Mende — Content OS Owner"
related_issue: "BUS-56"
universal_identifier: "DIUA-DIC-000026"
version: "1.3"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000005"
    name: "Content OS — System Architecture"
    version: "1.16"
    status: "CANONICAL"
  - id: "DIUA-DIC-000006"
    name: "Content OS — System Governance"
    version: "1.17"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-repository-representation-profile-v13-canonical-8ed80ab5e4b2"
representation_profile: "DIUA-DIC-000026@1.3"
---
# Content OS — Repository Representation Profile

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Repository Representation Profile |
| Document Class | System-Level Implementation Specification |
| Version | 1.3 |
| Status | **CANONICAL** — v1.3 amended 2026-09-28: synchronized dependencies to System Architecture v1.16 and System Governance v1.17; added deterministic repository serialization for current governed artifacts whose canonical metadata explicitly declares the Universal Identifier not applicable; updated migration authority semantics to the Owner-approved staged GitHub cutover model; and set `BillyProject2505/content-os` as the active migration repository context. Previously v1.2. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1) |
| System | Content OS |
| Owner | **\[FORMAL\]** Billy Fernando Mende — Content OS Owner |
| Related Issue | [BUS-56](https://linear.app/bussiness-content-os/issue/BUS-56/repository-representation-profile-github-export-mapping) — Repository Representation Profile — GitHub Export Mapping |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000026` — ALLOCATED / ACTIVE. Allocation establishes the stable governed-document identity and is representation-independent. |
| Depends On | Content OS — Root Documentation Structure v2.5 CANONICAL (§3 Representation Portability; §10.1 Registered Document Boundary); Content OS — Root Level Architecture v1.11 CANONICAL (tier structure and dependency direction); Content OS — System Architecture v1.16 CANONICAL (§3, §4.3a, §11 — System-wide implementation-specification responsibility and current System-tier placement); Content OS — System Governance v1.17 CANONICAL (System-level ownership and change control). |

---

## 1. Purpose

Define the deterministic mapping by which a registerable governed Content OS document is represented in a file/repository environment, including GitHub, without creating a second canonical identity, changing governance authority, or changing semantic dependencies.

This specification operationalizes Root Documentation Structure v2.5 §3 Representation Portability for repository/file export environments such as GitHub. It does not redefine document identity, registration eligibility, tier structure, lifecycle semantics, or canonicality.

**Scope boundary:** Google Drive, Google Docs, Google Sheets, and Google Slides are not treated as repository representations under this profile. Their role is governed by the Content OS Storage Authority Profile.

## 2. Core Representation Invariants

Every repository representation MUST preserve the following invariants:

1. **Identity invariant** — the same governed document retains the same `DIUA-DIC-*` identifier in every representation.
2. **Semantic invariant** — title, document class, tier, system/domain, version, status, owner, related issue, and normative dependency meaning remain equivalent.
3. **Authority invariant** — repository location, Git commit history, filename, recency, or branch position does not independently create canonical authority.
4. **Dependency invariant** — normative dependencies remain normative; informative/contextual references must not be silently promoted into `Depends On`.
5. **Lifecycle invariant** — DRAFT, CANONICAL, SUPERSEDED, ARCHIVED, and equivalent governed states are preserved rather than inferred from storage location.
6. **Single-identity invariant** — a Linear representation and repository representation carrying the same identifier are two representations of one governed document, not two governed documents.
7. **No silent mutation** — export tooling MUST fail closed when a required field cannot be mapped deterministically.
8. **Storage-role invariant** — repository export semantics do not authorize Google Drive or native Google Workspace documents as governed text-document authority.

## 3. Repository Representation Header

### 3.1 Required Markdown Front Matter

A repository representation of a REGISTERABLE GOVERNED DOCUMENT MUST begin with YAML front matter containing exactly one value for every required identity field below.

```yaml
---
document_name: "<canonical document name>"
document_class: "<declared document class>"
structural_classification: "<declared tier/domain classification>"
system: "<Content OS or declared domain path>"
owner: "<declared owner string>"
related_issue: "<BUS-n or explicit none/not separately assigned>"
universal_identifier: "DIUA-DIC-000000"
version: "<document version>"
status: "<governed lifecycle/status value>"
depends_on:
  - id: "<DIUA-DIC-* when available>"
    name: "<dependency canonical name>"
    version: "<version when the normative dependency is version-pinned>"
    status: "<status when declared>"
source_representation:
  platform: "Linear"
  locator: "<stable Linear issue/document locator or explicit source record>"
representation_profile: "DIUA-DIC-000026@1.3"
---
```

### 3.2 Mapping Rule

The front matter is a repository serialization of governed metadata. It MUST NOT introduce metadata values absent from the authoritative source. Where the source explicitly says `Not separately assigned`, `None`, or equivalent, that value is serialized rather than invented.

Free-text historical status narratives MAY remain in the Markdown body. The front-matter `status` field represents only the current governed status.

### 3.3 Field Normalization

* `universal_identifier` MUST match `^DIUA-DIC-[0-9]{6}$` for registerable governed documents.
* `version` MUST be serialized as a quoted string to avoid numeric coercion.
* `related_issue` SHOULD use the stable `BUS-n` identifier when one exists.
* `depends_on` MUST contain only normative dependencies declared by the source document.
* A dependency without a Content OS identifier MAY use `id: null`, but its canonical name and any declared version/status MUST be retained.
* Repository-only fields MUST be nested under `source_representation` or another explicitly representation-scoped object; they MUST NOT masquerade as governed document identity.

### 3.4 Explicit Identifier-Exempt Governed Artifacts

A current governed artifact MAY be serialized without a `DIUA-DIC-*` value only when its authoritative source metadata explicitly declares the Universal Identifier **not applicable** for a governed structural reason, such as a registry self-registration boundary or an allocation-evidence record that is not itself a registered entry.

For that case the repository representation MUST use:

```yaml
universal_identifier: null
identifier_exemption:
  status: "EXPLICIT_SOURCE_EXEMPTION"
  basis: "<verbatim or faithful source basis for why the identifier is not applicable>"
```

Rules:

* tooling MUST NOT invent a replacement `DIUA-DIC-*` value;
* `identifier_exemption` is representation metadata describing the source-declared exemption, not a new identity namespace;
* all other applicable governed metadata remains required;
* dependencies to an identifier-exempt governed artifact use `id: null` plus canonical name and declared version/status when applicable;
* a missing identifier without an explicit source exemption remains a blocking `ID-01` failure.

## 4. Stable Filename Mapping

### 4.1 Canonical Repository Filename

The deterministic filename for a registerable governed Markdown document is:

`<UNIVERSAL_IDENTIFIER>_<normalized-document-name>.md`

Example:

`DIUA-DIC-000017_CWC-Production-Workflow.md`

Normalization:

1. retain the identifier exactly;
2. convert spaces and separators to a single hyphen;
3. remove characters unsafe for ordinary cross-platform file paths;
4. preserve meaningful ASCII alphanumerics and established project abbreviations;
5. do not include lifecycle status or version in the filename;
6. filename changes caused only by version/status changes are prohibited.

The stable identifier is the collision-prevention key. Human-readable name text is navigational.

### 4.2 Rename Rule

If the governed document name changes while identity remains the same, the human-readable filename component MAY change, but the `DIUA-DIC-*` prefix MUST remain unchanged. A rename does not create a new governed document.

### 4.3 Filename for Explicit Identifier-Exempt Governed Artifacts

When §3.4 applies, the deterministic filename is:

`<normalized-document-name>.md`

The normalization rules in §4.1 points 2–6 still apply. No BUS issue number, lifecycle status, version, synthetic identifier, or migration timestamp may be inserted merely to simulate document identity. Repository path remains representation data and does not become canonical identity.

## 5. Repository Placement

This profile does not redefine the repository's global architecture. Placement MUST use the repository structure already in force.

The active Content OS migration repository is `BillyProject2505/content-os`. Its current repository navigation uses `root/`, `system/`, `cross-cutting/`, and later project-scoped paths as needed. Repository placement provides navigation/context only and does not establish authority.

Content OS export MUST select a destination consistent with the repository's active structure and MUST NOT infer tier or canonicality from directory names alone.

## 6. Reference and Link Mapping

### 6.1 Governed Document Dependencies

When a dependency is also exported into the same repository corpus:

* front matter preserves its semantic identity in `depends_on`;
* body references SHOULD use a relative Markdown link to the dependency's stable filename;
* link text SHOULD use the canonical document name or stable identifier;
* the link target MUST resolve during validation.

Example:

`[CWC Asset Bible](../path/DIUA-DIC-000014_CWC-Asset-Bible.md)`

The path is representation data; the dependency meaning comes from `depends_on` and the target identifier.

### 6.2 Linear-Native References

Linear-native issue/document markup MUST be converted as follows:

* `BUS-n` issue references remain visible as `BUS-n` semantic identifiers.
* If an exported governed target exists, prefer a relative repository link to that target.
* If no repository target exists, preserve the `BUS-n` text and MAY preserve the Linear URL as provenance/navigation.
* A Linear URL alone MUST NOT be treated as the identity of a governed document.

### 6.3 Informative References

Informative/contextual references remain body references and MUST NOT be inserted into `depends_on` unless the source document already declares a normative dependency.

## 7. Binary Asset Representation

Binary assets are not converted into Markdown text.

For each governed or referenced binary asset:

1. preserve the asset's existing governed identity where one exists;
2. place or reference the binary through the repository's approved asset location;
3. preserve filename/format only where they are part of the governed asset record;
4. use relative Markdown links for repository-resident assets;
5. retain external persistent locators when the binary remains external;
6. preserve checksum information when the source registry supplies it;
7. fail closed if an asset required for semantic completeness has neither a resolvable repository path nor an approved persistent external locator.

A copied binary does not become a new canonical asset merely because it exists in GitHub.

## 8. Export Procedure

A conforming export MUST execute these stages in order:

 1. **Resolve source** — retrieve the current authoritative governed document.
 2. **Classify** — confirm REGISTERABLE, explicit identifier-exempt current governed artifact under §3.4, EXEMPT PROCESS/EVIDENCE, or HISTORICAL under the source metadata and Root Documentation Structure §10.1.
 3. **Validate identity** — verify required source metadata and registry identity.
 4. **Serialize metadata** — generate front matter using §3.
 5. **Normalize filename** — apply §4.
 6. **Transform references** — apply §6 without changing semantic relationship type.
 7. **Resolve assets** — apply §7.
 8. **Pre-export validation** — run §9 checks before write.
 9. **Write representation** — create/update repository file.
10. **Post-export equivalence validation** — compare source and repository representation under §10.
11. **Record migration evidence** — record source locator, target path, commit/reference, validation result, and timestamp in migration evidence. Migration evidence does not create a second canonical identity.

Any blocking validation failure stops the write or marks the attempted migration failed; tooling MUST NOT silently repair governed metadata by guessing.

## 9. Validator / CI Requirements

A conforming validator MUST be able to test at least the following classes.

| Check | Blocking condition |
| -- | -- |
| META-01 | required front-matter field missing or empty without an explicitly valid source value |
| ID-01 | malformed `DIUA-DIC-*` identifier |
| ID-02 | duplicate active identifier assigned to semantically different documents |
| ID-03 | identifier differs from authoritative registry |
| ID-EX-01 | `universal_identifier: null` is used without an explicit source-backed `identifier_exemption`, or an identifier is invented for an explicitly exempt source artifact |
| NAME-01 | filename identifier prefix differs from front-matter identifier for a registerable governed document; identifier-exempt governed artifacts must use the §4.3 normalized-name rule |
| DEP-01 | declared normative dependency loses name/identifier/version semantics during export |
| DEP-02 | relative dependency link targets a missing file |
| DEP-03 | informative/contextual reference is promoted into normative `depends_on` without source authority |
| STATUS-01 | repository status differs from source current status |
| VERSION-01 | repository version differs from source current version at export time |
| OWNER-01 | owner is omitted or silently replaced |
| ASSET-01 | required asset locator is unresolved |
| LINK-01 | generated relative link is broken |
| EQ-01 | post-export identity tuple is not equivalent to source identity tuple |
| AUTH-01 | repository metadata claims new canonical authority not present in source governance |

Validator output MUST identify the file, check ID, expected value/basis, actual value, and PASS/FAIL result.

Warnings MAY be used for non-semantic formatting differences, but none of the blocking conditions above may be downgraded solely to permit migration.

## 10. Equivalence Model

### 10.1 Identity Tuple

For export equivalence, define:

`I = (universal_identifier_or_explicit_exemption, document_name, document_class, structural_classification, system, owner, related_issue, version, status)`

For an artifact governed by §3.4, `universal_identifier_or_explicit_exemption` is the source-backed identifier exemption rather than a synthetic ID. Source and repository representations pass identity equivalence only when every semantically applicable member of `I` is equivalent.

### 10.2 Dependency Tuple

For each normative dependency define:

`D = (dependency_identifier_if_available, canonical_name, declared_version_if_pinned, declared_status_if_present, relationship_type=NORMATIVE_DEPENDENCY)`

Repository order and path do not affect dependency equivalence. Addition, deletion, promotion, or demotion of a normative relationship does.

### 10.3 Round-Trip Test

A repository representation passes round-trip equivalence when parsing its front matter and normalized references reconstructs the same `I` and set of `D` tuples as the source representation, excluding representation-only fields such as path, URL, commit SHA, or source locator.

## 11. Dry-Run Validation

### 11.1 CWC Fixture — CWC Production Workflow

Source inspected: CWC Production Workflow v1.7 CANONICAL.

Dry-run target filename:

`DIUA-DIC-000017_CWC-Production-Workflow.md`

Key serialized identity:

```yaml
universal_identifier: "DIUA-DIC-000017"
document_name: "CWC Production Workflow"
document_class: "Domain/Project Production Lifecycle Specification"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner"
related_issue: "Not separately assigned"
version: "1.7"
status: "CANONICAL"
```

Normative dependency set preserved: Root Level Architecture v1.11; Root Documentation Structure v2.5; Root Governance v1.11; CWC Production Bible v2.12; CWC Asset System v1.14; CWC Asset Registry v1.12; CWC Asset Bible v1.13; CWC Reference Sheet v1.8.

**Dry-run result:** PASS — identity tuple reconstructs without loss; all eight normative dependencies remain distinguishable; no Linear-native locator is required to define document identity.

### 11.2 SDOH Fixture — Project Architecture

Source inspected: Satu Dosis Obat Hati — Project Architecture v1.12 CANONICAL.

Dry-run target filename:

`DIUA-DIC-000007_Satu-Dosis-Obat-Hati-Project-Architecture.md`

Key serialized identity:

```yaml
universal_identifier: "DIUA-DIC-000007"
document_name: "Satu Dosis Obat Hati — Project Architecture"
document_class: "Domain/Project-Level Architecture Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati"
system: "Content OS → Satu Dosis Obat Hati (SDOH)"
owner: "[OPERATIONAL DEFAULT] document creator"
related_issue: "BUS-24"
version: "1.12"
status: "CANONICAL"
```

Normative dependency semantics preserved from the source: Content OS — System Architecture v1.11 for tier positioning, plus the source-declared CWC sibling-boundary comparison dependency. The exporter MUST preserve that source meaning and MUST NOT strengthen the sibling comparison into new authority.

**Dry-run result:** PASS — stable identifier, version, status, tier, issue relation, and declared dependency meaning are reconstructable. The source's operational-default owner wording is preserved rather than silently converted into a formal owner assignment.

### 11.3 Round-Trip Result

Both fixtures satisfy:

* identity equivalence: PASS;
* normative dependency preservation: PASS;
* no duplicate canonical identity: PASS;
* filename determinism: PASS;
* repository-location independence: PASS.

No files were written during these dry runs; they validate the mapping before migration execution.

## 12. Migration and Authority Rule

An Owner-approved staged migration to `BillyProject2505/content-os` is active as of 2026-09-28. Authority transfers **per document**, not repository-wide by inference.

Before a document's cutover gate completes, Linear remains authoritative for that governed text. After the gate completes, the GitHub repository representation becomes canonical for that document and the Linear copy becomes historical/reference plus execution linkage.

The cutover gate requires repository path creation, representation validation, identity/dependency equivalence, blocking-check PASS, merged PR/commit, and recorded migration evidence. Successful export, commit recency, branch protection, CI success, or file presence alone does not transfer authority.

Google Drive remains outside governed-text authority and is reserved for binary/image/assets/visual-reference evidence.

## 13. Active Repository Migration Finding

The active migration target is `BillyProject2505/content-os`. Phase 1 successfully migrated and cut over `DIUA-DIC-000001` through `DIUA-DIC-000004`, and repository CI now enforces the minimum metadata/identifier/link integrity floor. This operational evidence validates the profile's core mapping while preserving the rule that path/location alone does not establish authority.

## 14. Change Control

Changes to this profile that alter required front-matter fields, filename identity semantics, equivalence rules, validator blocking classes, or authority behavior are System-level governed changes and require review/approval under System Governance.

Purely editorial examples or additional non-normative test fixtures may be revised without changing the semantic contract, subject to normal document control.

## 15. Canonical Closure

[BUS-56](https://linear.app/bussiness-content-os/issue/BUS-56/repository-representation-profile-github-export-mapping) deliverable gate is satisfied:

* deterministic metadata mapping — PASS;
* stable filename mapping — PASS;
* reference/link mapping — PASS;
* binary-asset rule — PASS;
* validator/CI blocking requirements — PASS;
* migration procedure — PASS;
* CWC dry run — PASS;
* SDOH dry run — PASS;
* round-trip identity/dependency equivalence — PASS;
* no second canonical identity introduced — PASS.

**Disposition:** APPROVED / CANONICAL v1.0. GitHub/repository export is now specification-ready. Actual corpus migration remains a separate execution event and is not performed by canonicalizing this profile.

**Registry synchronization:** Universal Identifier Registry v1.19 CANONICAL records the current canonical lifecycle state for `DIUA-DIC-000026`; Universal Identifier Registration Record v1.17 retains the original allocation act as immutable allocation evidence.

---

## 16. Change Record — v1.2 — 2026-09-26

**Change type:** Cross-profile boundary clarification and dependency synchronization.

Changes:

* System Architecture dependency synchronized to v1.14.
* System Governance dependency synchronized to v1.15.
* §1 clarifies that repository/file export semantics apply to repository environments such as GitHub, not Google Drive/Google Workspace.
* §2 adds a storage-role invariant.
* §12 clarifies that Google Drive remains binary/image/reference-evidence storage under the current Storage Authority Profile and is not a parallel governed-text representation.

No repository filename, front-matter, link, validator, migration, or equivalence rule changed.

---

## 17. Change Record — v1.3 — 2026-09-28

**Change type:** System-level representation-contract amendment and dependency synchronization.

**Owner approval:** Phase 2 migration execution authorized in the current Owner session.

Changes:

* System Architecture dependency v1.14 → v1.16;
* System Governance dependency v1.15 → v1.17;
* representation-profile marker updated to `DIUA-DIC-000026@1.3`;
* added deterministic serialization for current governed artifacts whose source explicitly declares Universal Identifier not applicable;
* prohibited synthetic IDs for those artifacts;
* added filename mapping and validator rule for the explicit exemption case;
* updated equivalence semantics to preserve source-backed identifier exemption;
* updated authority section to the active staged GitHub cutover model;
* replaced prior KnowledgeOS compatibility context with the active `BillyProject2505/content-os` migration finding.

No Root tier, document class, DIUA allocation rule, or identity namespace was changed.