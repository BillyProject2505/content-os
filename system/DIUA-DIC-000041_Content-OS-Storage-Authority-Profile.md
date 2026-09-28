---
document_name: "Content OS — Storage Authority Profile"
document_class: "System-Level Implementation Specification"
structural_classification: "Tiered — Document Tier: System Level (Tier 1)"
system: "Content OS"
owner: "[FORMAL] Billy Fernando Mende — Content OS Owner"
related_issue: "BUS-109"
universal_identifier: "DIUA-DIC-000041"
version: "1.2"
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
  locator: "https://linear.app/bussiness-content-os/document/content-os-storage-authority-profile-v12-canonical-69a1a7139936"
representation_profile: "DIUA-DIC-000026@1.3"
---
# Content OS — Storage Authority Profile

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Storage Authority Profile |
| Document Class | System-Level Implementation Specification |
| Version | 1.2 |
| Status | **CANONICAL** — v1.2 synchronizes current upstream System dependencies and Repository Representation Profile after Phase 2 migration preparation. Storage-authority semantics are unchanged from v1.1. Previously v1.1. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1) |
| System | Content OS |
| Owner | **\[FORMAL\]** Billy Fernando Mende — Content OS Owner |
| Related Issue | [BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile) — Content OS — Storage Authority Profile |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000041` — ALLOCATED — ACTIVE |
| Depends On | Content OS — Root Documentation Structure v2.5 CANONICAL; Content OS — Root Level Architecture v1.11 CANONICAL; Content OS — System Architecture v1.16 CANONICAL; Content OS — System Governance v1.17 CANONICAL |
| Related Implementation Specification | Content OS — Repository Representation Profile v1.3 CANONICAL |

## 1. Purpose

Define the current Content OS platform-storage authority split across Root, System, non-tiered/cross-cutting, and Tier 2 governed artifacts without changing Root-level platform independence.

This profile operationalizes the platform-independent documentation and representation rules without changing Root-level identity, tier, or portability semantics.

## 2. System-Wide Storage Authority

### 2.1 Governed Text Authority — GitHub After Cutover; Linear During Transition

**Exactly one authoritative text surface is permitted per governed document. GitHub is canonical after that document completes the approved repository cutover gate; until then, Linear remains authoritative. Linear remains the execution/work-management surface after cutover.**

This includes, but is not limited to:

* Architecture documents;
* Governance documents;
* SOP / Workflow documents;
* Production Bibles;
* Asset Bibles;
* Layout Bibles;
* Format Specifications;
* textual Reference Sheets;
* QA Documents / QA Mechanisms;
* Research Source Lists;
* Content Registers;
* Registries;
* governed Standards;
* implementation specifications;
* governed decision records;
* other persistent text documents that carry normative, lifecycle, identity, dependency, or authority meaning.

A duplicate Google Doc, Google Sheet, Google Slide, PDF text copy, or equivalent Drive-hosted text artifact does not become a second authority.

### 2.2 Google Drive — Binary / Image Authority

**Google Drive is restricted to binary/image assets and visual/reference evidence.**

Allowed classes include:

* PNG;
* JPG / JPEG;
* WEBP;
* SVG and other approved vector binaries;
* video files;
* audio files;
* source/master production files;
* packaged binary production assets;
* approved visual reference evidence;
* binary exports or deliverables where the binary itself is the governed production object.

A binary file may contain visible text as part of its rendered content. That does not make it a governed text-document authority.

### 2.3 Disallowed Drive Authority

Google Drive must not be used as authoritative storage for:

* Google Docs governance copies;
* Google Sheets used as governed text registries;
* Google Slides used as governance/standards documents;
* PDFs used as the canonical copy of an otherwise textual governed document;
* duplicate text versions of the current canonical governed document;
* text documents whose lifecycle/status/dependencies are maintained independently from the current canonical text authority.

## 3. Content OS Scope

This profile applies to registerable governed text documents and governed binary/reference artifacts across Content OS, including:

* Root-level documents;
* System-level documents;
* non-tiered / cross-cutting governed documents;
* CWC;
* Satu Dosis Obat Hati (SDOH);
* KDS Satu Hati Sulawesi Utara;
* recursive Tier 2 sub-projects;
* every future Content OS project unless an explicit System-level exception is approved.

This is a storage/representation implementation rule, not a redefinition of Root architecture. Root documents remain platform-independent in their normative content. Projects inherit this profile automatically and should not duplicate it into local policy unless a project-specific implementation detail genuinely requires an additional rule.

## 4. Reference Sheet Pattern

A governed Reference Sheet may have two parts:

1. **textual authority** — stored in GitHub after explicit document cutover; otherwise stored in Linear during staged migration;
2. **binary/visual evidence** — stored in Google Drive and referenced by stable file IDs/folders from Linear.

The Drive evidence does not independently carry lifecycle or governance authority.

## 5. Asset Registry Pattern

Asset registries remain governed text documents. GitHub becomes authoritative after their explicit cutover; until then, Linear remains authoritative.

Binary assets referenced by those registries remain in Google Drive.

The registry owns identity/lifecycle/provenance semantics; Drive stores the referenced binary object.

## 6. Content Register Pattern

Content Registers are governed text records. GitHub becomes authoritative after their explicit cutover; until then, Linear remains authoritative.

Rendered media, publication masters, exports, thumbnails, screenshots, and other binary evidence may reside in Google Drive.

## 7. Repository / GitHub Exception

The existing **Repository Representation Profile** governs deterministic repository/file representations, including GitHub exports.

A repository representation is a governed serialization under that profile. Before cutover it represents a Linear-authoritative document; after the approved cutover gate passes, that repository document becomes the canonical governed text representation.

This exception:

* does not authorize Google Drive as a text-document authority;
* does not make Google Docs/Sheets/Slides equivalent to repository export;
* does not create a second canonical identity;
* transfers authority only when the Owner-approved migration decision and the per-document cutover gate are satisfied; file presence, branch recency, or CI success alone are insufficient.

## 8. Existing Drive Text Documents

Existing Drive-hosted text/governance copies are classified as **migration debt**.

They must be handled as follows:

1. identify whether the content is still needed;
2. confirm the current authoritative text representation (GitHub after cutover; otherwise Linear) or migrate the needed governed text to the active authority surface;
3. preserve only historical/provenance evidence that has a justified retention need;
4. remove redundant duplicate Drive text copies after review;
5. never use Drive recency, filename, sharing state, or visual completeness to infer governance authority.

No bulk deletion should occur without confirming whether the item contains unique historical or operational evidence.

## 9. Cross-Project Enforcement

For every current or future project:

* new governed text documents are created on the authority surface active for their scope; during staged migration, unmigrated scopes remain in Linear until cutover;
* new binary/image assets and visual evidence are stored in Google Drive;
* project documentation must reference Drive binary locators rather than duplicate text content there;
* QA/audit should flag a Drive-hosted governed text document as storage-authority drift;
* a Drive-hosted binary is not considered authoritative unless the applicable canonical registry/reference record resolves it.

## 10. Conformance Rules

**SAP1 — Single text authority per document.** GitHub is canonical after explicit per-document cutover; otherwise Linear remains authoritative during staged migration. Dual canonical text authority is prohibited.

**SAP2 — Binary-only Drive role.** Google Drive is limited to binary/image assets and visual/reference evidence.

**SAP3 — No duplicate text authority.** Drive-hosted text copies cannot independently define version, status, dependency, ownership, or canonicality.

**SAP4 — Stable binary resolution.** The current canonical governed text document should reference stable Drive binary IDs/folders where binary provenance is required.

**SAP5 — Repository exception is explicit.** GitHub/repository representations are governed only through the Repository Representation Profile.

**SAP6 — Migration debt is fail-visible.** Existing Drive text copies must be classified and remediated rather than silently treated as compliant.

**SAP7 — Project inheritance.** Tier 2 projects inherit this System-wide profile automatically.

## 11. Lifecycle

**Current state:** CANONICAL v1.1 — Owner approved and effective 2026-09-28. v1.1 introduces staged GitHub canonical cutover while preserving single-authority semantics and Google Drive's binary/reference role.

Before canonicalization:

* Universal Identifier must be allocated;
* System Architecture must recognize this as a System-Wide Implementation Specification;
* System Governance ownership registry must include it;
* Repository Representation Profile must be checked for conflict;
* final conformance review must pass;
* explicit Owner approval must be recorded.

---

## 12. Final Critical Review & Owner Approval — v1.0 — 2026-09-26

**Disposition:** PASS.

### Review scope

Reviewed against:

* Root Level Architecture v1.11;
* Root Governance v1.11;
* Root Documentation Structure v2.5;
* System Architecture v1.14;
* System Governance v1.15;
* Repository Representation Profile v1.2;
* Universal Identifier allocation `DIUA-DIC-000041` / `CONTENT-OS-ALLOC-041`.

### Findings

* Root platform-independence remains intact: no Root document was changed to name Linear or Google Drive.
* The rule is correctly placed at System level because it coordinates multiple Tier 2 projects.
* Repository/GitHub representation semantics remain distinct and explicitly bounded.
* The profile does not create a second canonical identity.
* Linear text authority and Google Drive binary/image role are unambiguous.
* Existing Drive text copies are classified as migration debt rather than silently grandfathered.
* No project-specific policy is required to re-declare this system rule.

### Owner decision

**APPROVED — CANONICALIZED.**

### Effective scope

Applies to:

* CWC;
* SDOH;
* KDS Satu Hati Sulawesi Utara;
* every future Content OS Tier 2 project.

**Canonical version:** v1.0.

---

## 13. Change Record — v1.1 — 2026-09-28

**Change type:** System-level storage-authority implementation amendment.

**Owner decision:** APPROVED.

Changes:

* activated staged GitHub canonical migration for governed text documents;
* preserved exactly-one-authority semantics per document;
* retained Linear authority for documents not yet cut over and Linear as the execution/work-management surface after cutover;
* retained Google Drive exclusively for binary/image/assets/reference evidence;
* expanded implementation scope to Root, System, non-tiered/cross-cutting, and Tier 2 governed artifacts without introducing platform-specific requirements into Root normative documents;
* defined the per-document cutover gate as the authority-transfer event;
* confirmed that repository presence or CI success alone does not transfer authority.

**Phase 1 cutovers completed under this rule:**

* `DIUA-DIC-000001` — Root Level Architecture v1.11;
* `DIUA-DIC-000002` — Root Governance v1.11;
* `DIUA-DIC-000003` — Root Documentation Structure v2.5;
* `DIUA-DIC-000004` — Reference Model v1.13.

All other governed text documents remain Linear-authoritative until their explicit cutover.

---

## 14. Change Record — v1.2 — 2026-09-28

**Classification:** dependency/current-state synchronization only.

* System Architecture dependency: v1.14 → **v1.16 CANONICAL**.
* System Governance dependency: v1.15 → **v1.17 CANONICAL**.
* Related Repository Representation Profile: v1.2 → **v1.3 CANONICAL**.
* Storage-authority semantics from v1.1 are unchanged.