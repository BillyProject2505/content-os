---
document_name: "Content OS — Universal Identifier Registry"
document_class: "System-Level Registry Document"
structural_classification: "Tiered — Document Tier: System Level (Tier 1)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per System Governance §4."
related_issue: "BUS-16"
universal_identifier: null
identifier_exemption:
  status: "EXPLICIT_SOURCE_EXEMPTION"
  basis: "Not applicable — this document is the registry itself, not a registered entry. A registry does not register itself (per UNIR-CORE-001 §5, Registered Construct Boundary)."
version: "1.50"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: "DIUA-DIC-000006"
    name: "Content OS — System Governance"
    version: "1.17"
    status: "CANONICAL"
  - id: "DIUA-DIC-000005"
    name: "Content OS — System Architecture"
    version: "1.16"
    status: "CANONICAL"
  - id: null
    name: "Content OS — Universal Identifier Registration Record"
    version: "1.34"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-universal-identifier-registry-v150-canonical-ef7653bc3e86"
representation_profile: "DIUA-DIC-000026@1.3"
---
# Content OS — Universal Identifier Registry

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Universal Identifier Registry |
| Document Class | System-Level Registry Document |
| Version | 1.50 |
| Status | **CANONICAL** — v1.50 synchronizes the Universal Identifier Registration Record dependency to v1.34 after its governance dependency maintenance. Identifier assignment, allocation evidence, lifecycle state, and next-available sequence are unchanged. Previously v1.49. |
| Related Issue | [BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) — Universal Identifier Registry |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per System Governance §4. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1) |
| Universal Identifier (UNIS/DIC) | Not applicable — this document is the registry itself, not a registered entry. A registry does not register itself (per UNIR-CORE-001 §5, Registered Construct Boundary). |
| Depends On | Content OS — Root Documentation Structure (v2.5, CANONICAL — [BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md) §3, §4.1, §4.2 — Representation Portability and adopted UNIS/UNIR/DNS-001 External Governing Standards), System Governance (v1.17, CANONICAL — [BUS-15](DIUA-DIC-000006_Content-OS-System-Governance.md) §6 — this document's change-control cycle), System Architecture (v1.16, CANONICAL — [BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md) §4.3, System Knowledge & Registries), and Universal Identifier Registration Record (v1.34, CANONICAL — [BUS-17](Content-OS-Universal-Identifier-Registration-Record.md) §3, §4 — this Registry's §5 process requires an allocation act to be recorded in [BUS-17](Content-OS-Universal-Identifier-Registration-Record.md) before this Registry's current-state table (§4) is updated; [BUS-17](Content-OS-Universal-Identifier-Registration-Record.md) is the evidence source for this document's allocations). This document is the demonstrated-need instance of §4.3. **External Governing Standard:** UNIR-CORE-001 v1.2 (external, reference material) — adopted narrowly for registry schema/structure (its six-Core model: SCH/OCM/IDM/NSM/LSM/GRP), per Root Level Architecture §8 point 5. |

---

## 1. Purpose

This document is Content OS's own, authoritative instance of a Universal Naming & Identification Registry (per UNIS-CORE-001, adopted at Root Documentation Structure §4.1). It records which `DIUA-DIC-<6DigitSequence>` identifiers are currently allocated to which Content OS documents.

**\[FACT\]** The UNIR-CORE-001, UNIR-REGISTRY-001, and UNIR-REGISTRATION-RECORD-001 material originally supplied to Content OS is **reference/illustrative material** — it demonstrates the registry pattern (schema, allocation-act structure, traceability conventions) but does not represent live external registry state that Content OS must continue numbering from. Content OS's own registry, represented by this document, is a **fresh instance**, starting at `DIUA-DIC-000001`.

This document does not define the DIC grammar itself (owned by UNIS-CORE-001, external) or Content OS's tier/document-class structure (owned by Root Level Architecture, [BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).

**\[CLARIFICATION\]** This registry governs only the `DIUA-DIC-*` scheme. The pre-existing, separate legacy `DOC-*` scheme (one confirmed member: `DOC-SYS-001`) is governed by its own sibling registry — [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace) — which is closed to new allocations. The two namespaces are disjoint; this registry does not absorb or supersede [BUS-23](https://linear.app/bussiness-content-os/issue/BUS-23/content-os-document-id-registry-legacy-doc-namespace).

---

## 2. Scope

### 2.1 In Scope

* Current authoritative state of `DIUA-DIC` allocations for Content OS documents.
* Registry object structure, following UNIR-SCH's pattern (Registry Object ID, Object Class, Canonical Name, Authority References, Lifecycle/State, Relationship References).
* The boundary distinguishing this Registry's own authority from UNIS's semantic authority (UNIR-CORE-001 §3: UNIR does not replace UNIS).

### 2.2 Out of Scope

* **Identifier grammar semantics** — owned by UNIS-CORE-001 (external).
* **Allocation-act-level evidence and traceability** — owned by the Registration Record ([BUS-17](Content-OS-Universal-Identifier-Registration-Record.md)).
* **Content OS's own tiers, document classes, or ownership model** — owned by Root Level Architecture ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)) and Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)).
* **Any external, non-Content-OS registry or namespace coordination** — this document represents Content OS's own instance only; it makes no claim about, and cannot verify, whether any other party also uses the `DIUA` namespace (§8, Open Question).

---

## 3. Namespace

**\[FACT\]** Content OS adopts the `DIUA` namespace literal as demonstrated in the reference UNIR-CORE-001 material (Canonical Name: "Document Identifier Universal Architecture"; Identifier Class: Document; Marker: `DIC`; Grammar: `DIUA-DIC-<6DigitSequence>`).

**\[OPEN QUESTION — flagged, not silently resolved\]** Whether `DIUA` is a namespace Content OS is entitled to use exclusively, or whether it is a shared/generic namespace that other parties might also adopt from the same reference material, is **not known** from this workspace. Content OS proceeds on the Owner's explicit instruction that the reference material's example allocations do not bind Content OS's own numbering (see §1, FACT). If a real coordination conflict is later discovered, this is a namespace-collision event to be resolved per UNIS-CORE-001 §7.5 (Collision Prevention), not silently absorbed.

---

## 3.1 Registration Eligibility Boundary

**\[CONSTRAINT\]** This Registry does not decide whether an artifact qualifies as a Content OS document eligible for DIUA-DIC registration. Eligibility is owned by Content OS — Root Documentation Structure v2.4 §10.1 (Registered Document Boundary).

This Registry therefore registers only artifacts classified there as `REGISTERABLE GOVERNED DOCUMENT`, except for the narrow self-registration exemptions already stated for this Registry and the Registration Record.

Artifacts classified as `EXEMPT PROCESS / EVIDENCE ARTIFACT` or `HISTORICAL / RETAINED ARTIFACT` do not receive a new DIUA-DIC solely because they are stored as Linear Documents. If classification is unresolved, no allocation occurs until the classification is resolved.

---

## 4. Current Registered Objects

**\[DECISION\]** The following are Content OS's current `DIUA-DIC` allocations, effective as of this document's authoring:

| Identifier | Registered Document | Object Class | Lifecycle State |
| -- | -- | -- | -- |
| `DIUA-DIC-000001` | Content OS — Root Level Architecture ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000002` | Content OS — Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md)) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000003` | Content OS — Root Documentation Structure ([BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md)) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000004` | Content OS — Reference Model ([BUS-13](https://linear.app/bussiness-content-os/issue/BUS-13/define-reference)) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000005` | Content OS — System Architecture ([BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md)) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000006` | Content OS — System Governance ([BUS-15](DIUA-DIC-000006_Content-OS-System-Governance.md)) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000007` | SDOH — Project Architecture (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000008` | SDOH — Production SOP (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000009` | SDOH — Research Source List (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000010` | SDOH — QA Document (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000011` | SDOH — Asset Registry (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000012` | CWC — Production Bible (Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000013` | CWC — Canonical Asset System (CAS) (Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000014` | CWC — Canonical Asset Registry (CAR) (Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000015` | CWC — Canonical Asset Bible (CAB) (Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000016` | CWC — Reference Sheet (CRS) (Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000017` | CWC Production Workflow (Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000018` | CWC Format Specialization Specification (`CWC-FSS-001`, Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000019` | CWC QA Mechanism (`CWC-QA-001`, Domain/Project Tier 2 — Coz We Care) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000020` | SDOH — Sage Carousel Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000021` | SDOH — Burgundy Carousel Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000022` | SDOH — Sage Reels Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000023` | SDOH — Burgundy Reels Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000024` | SDOH — Sage TikTok Poster Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000025` | SDOH — Burgundy TikTok Poster Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati) | Content OS Document | ALLOCATED — ACTIVE |
| `DIUA-DIC-000026` | Content OS — Repository Representation Profile (System Level / Tier 1) | System-Level Implementation Specification | ALLOCATED — ACTIVE |
| `DIUA-DIC-000027` | CWC — Content Register (Domain/Project Tier 2 — Coz We Care) | Project-Level Operational Content Register | ALLOCATED — ACTIVE |
| `DIUA-DIC-000028` | CWC FORMAT-POSTER (Domain/Project Tier 2 — Coz We Care) | Tier 2 Format Specialization Object / Poster Production Specification | ALLOCATED — ACTIVE |
| `DIUA-DIC-000029` | CWC FORMAT-CAROUSEL (Domain/Project Tier 2 — Coz We Care) | Tier 2 Format Specialization Object / Carousel Production Specification | ALLOCATED — ACTIVE |
| `DIUA-DIC-000030` | CWC FORMAT-REEL (Domain/Project Tier 2 — Coz We Care) | Tier 2 Format Specialization Object / Reel Production Specification | ALLOCATED — ACTIVE |
| `DIUA-DIC-000031` | CWC FORMAT-STORY (Domain/Project Tier 2 — Coz We Care) | Tier 2 Format Specialization Object / Story Production Specification | ALLOCATED — ACTIVE |

**\[CONSTRAINT\]** Per UNIR-CORE-001 §6 (Core Ownership Boundaries) and the Allocation Boundary pattern demonstrated throughout the reference material: this table is the **current registry state** only. It is distinct from the **allocation act** (the evidence establishing each allocation), which belongs to the Registration Record ([BUS-17](Content-OS-Universal-Identifier-Registration-Record.md)).

**\[DECISION\]** The next available sequence for future Content OS documents is `DIUA-DIC-000032`.

**\[DECISION — RESOLVES §7 Open Question 1, FULLY, 2026-09-06\]** Universal Identifier allocation is no longer discretionary per-domain. Per explicit Owner decision, a `DIUA-DIC` identifier is **MANDATORY** for every Content OS document, from System Level (Tier 1) through every Domain/Project (Tier 2) document, including recursive sub-projects (Root Level Architecture §9.2) — no tier or document class is exempt. This supersedes the prior SDOH-specific resolution above (which only established that Tier 2 domains receive identifiers when their Owner requests it) with a system-wide mandate applying to all domains, present and future, without requiring individual request. Existing CWC documents ([BUS-18](https://linear.app/bussiness-content-os/issue/BUS-18/cwc-production-bible)–22), previously unallocated under the old discretionary policy, are backfilled in this table (§4) as `DIUA-DIC-000012`–`000016`.

---

## 5. Registration Process

**\[DECISION\]** When a new Content OS document is created and its Owner determines it warrants a Universal Identifier (not automatic — see §7), the process is:

1. The Owner (or whoever is authoring the document) proposes the next sequential `DIUA-DIC` identifier (§4, "next available sequence").
2. An allocation act is recorded in the Registration Record ([BUS-17](Content-OS-Universal-Identifier-Registration-Record.md)).
3. This Registry (§4) is updated to reflect the new current state.
4. The registered document's own Document Identity is updated with the confirmed identifier.

This mirrors the Allocation Act → Registration Record → Registry State pattern demonstrated in the reference UNIR material, simplified for Content OS's current single-Owner, single-namespace scale (no separate multi-step authorization gate — no demonstrated need for one yet).

---

## 6. Exclusions

* Identifier grammar rules — UNIS-CORE-001 (external).
* Namespace authority beyond Content OS's own use of `DIUA` — not claimed here (§3).
* Coordination with any other real party using UNIR/UNIS — not possible from this workspace; flagged, not silently assumed absent.
* Any object class other than "Content OS Document" — not established; would require its own justification per UNIR-OCM's Object Classification Test (reference material), not invented here.

---

## 7. Open Questions / Unresolved Decisions

1. ~~Is a Universal Identifier mandatory for every Content OS document, or only for the six current canonical ones?~~ **RESOLVED 2026-09-06, by explicit Owner decision — see §4.** Mandatory for every Content OS document, Tier 1 through Tier 2 including sub-projects. No tier or document class is exempt going forward.
2. **Namespace exclusivity (§3)** — whether `DIUA` is safely Content OS's own or potentially shared with an unknown external party. Left open; flagged as a live risk, not resolved by assumption.
3. **Multi-step allocation authorization** — whether Content OS needs the reference material's more elaborate authorization gate (Allocation Act → Authorization → Active) as it scales. No demonstrated need yet; §5 uses a simplified version.

---

*End of Document — Content OS Universal Identifier Registry v1.42 (CANONICAL)*

---

## Current Registry Addendum — v1.18

### DIUA-DIC-000026

**Canonical Name:** Content OS — Repository Representation Profile
**Object Class:** System-Level Implementation Specification
**Structural Classification:** Tiered — Document Tier: System Level (Tier 1)
**Related Issue:** [BUS-56](DIUA-DIC-000026_Content-OS-Repository-Representation-Profile.md) — Repository Representation Profile — GitHub Export Mapping
**Lifecycle / State:** DRAFT / ALLOCATED — ACTIVE
**Authority References:** Root Documentation Structure v2.5 §3 (Representation Portability) and §10.1 (Registered Document Boundary); allocation evidence: CONTENT-OS-ALLOC-026 in Universal Identifier Registration Record v1.17.
**Canonicality Note:** Identifier allocation establishes stable identity only. It does not promote or canonicalize the target document.

---

## Current Registry Addendum — v1.21

### DIUA-DIC-000027

**Canonical Name:** CWC — Content Register
**Object Class:** Project-Level Operational Content Register
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Related Issue:** [BUS-57](<https://linear.app/bussiness-content-os/issue/BUS-57/cwc-content-register>) — CWC Content Register
**Lifecycle / State:** ALLOCATED — ACTIVE; target document currently DRAFT
**Allocation Evidence:** CONTENT-OS-ALLOC-027 in Universal Identifier Registration Record v1.19

---

## Current Registry Addendum — v1.22

### DIUA-DIC-000028

**Canonical Name:** CWC FORMAT-POSTER
**Object Class:** Tier 2 Format Specialization Object / Poster Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Related Issue:** [BUS-65](https://linear.app/bussiness-content-os/issue/BUS-65/cwc-format-poster-typography-specialization-and-registration) — CWC FORMAT-POSTER — Typography Specialization & Registration
**Document ID:** `f648d691-eb1c-4d16-b738-9689b4346fa4`
**Identifier State:** ALLOCATED — ACTIVE
**Target Document State at Allocation:** DRAFT
**Format Object State at Allocation:** DRAFT
**Allocation Evidence:** CONTENT-OS-ALLOC-028 in Universal Identifier Registration Record v1.20
**Next Available:** `DIUA-DIC-000029`

---

## Current Registry Addendum — v1.23

### DIUA-DIC-000029

**Canonical Name:** CWC FORMAT-CAROUSEL
**Object Class:** Tier 2 Format Specialization Object / Carousel Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Related Issue:** [BUS-66](https://linear.app/bussiness-content-os/issue/BUS-66/cwc-format-carousel-typography-specialization-and-registration) — CWC FORMAT-CAROUSEL — Typography Specialization & Registration
**Allocation Act:** CONTENT-OS-ALLOC-029
**Allocation State:** ALLOCATED — ACTIVE
**Current target state at allocation:** DRAFT pending FSS registration.

**Next available sequence:** `DIUA-DIC-000030`.

---

## Current Registry Addendum — v1.24

### DIUA-DIC-000030

**Canonical Name:** CWC FORMAT-REEL
**Object Class:** Tier 2 Format Specialization Object / Reel Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Related Issue:** [BUS-67](https://linear.app/bussiness-content-os/issue/BUS-67/cwc-format-reel-typography-specialization-and-registration) — CWC FORMAT-REEL — Typography Specialization & Registration
**Document ID:** `db940f77-f8a6-4dcf-9160-e263c16601a7`
**Identifier State:** ALLOCATED — ACTIVE
**Target Document State at Allocation:** DRAFT
**Format Object State at Allocation:** DRAFT
**Allocation Evidence:** CONTENT-OS-ALLOC-030 in Universal Identifier Registration Record v1.22
**Next Available:** `DIUA-DIC-000031`

---

## Current Registry Addendum — v1.25

### DIUA-DIC-000031

**Canonical Name:** CWC FORMAT-STORY
**Object Class:** Tier 2 Format Specialization Object / Story Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Related Issue:** [BUS-68](https://linear.app/bussiness-content-os/issue/BUS-68/cwc-format-story-typography-specialization-and-registration) — CWC FORMAT-STORY — Typography Specialization & Registration
**Document ID:** `132a6083-7617-4e1c-b525-f7e323573650`
**Identifier State:** ALLOCATED — ACTIVE
**Target Document State at Allocation:** DRAFT
**Format Object State at Allocation:** DRAFT
**Allocation Evidence:** CONTENT-OS-ALLOC-031 in Universal Identifier Registration Record v1.23
**Next Available:** `DIUA-DIC-000032`

---

## Current Registry Addendum — v1.26

### DIUA-DIC-000032

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Project Architecture

**Object Class:** Domain/Project-Level Architecture Document

**Structural Classification:** Tiered — Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-98](https://linear.app/bussiness-content-os/issue/BUS-98/kds-satu-hati-sulawesi-utara-project-architecture) — KDS Satu Hati Sulawesi Utara — Project Architecture

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Allocation Evidence:** CONTENT-OS-ALLOC-032 in Universal Identifier Registration Record v1.24

**Next Available:** `DIUA-DIC-000033`

---

## Lifecycle Synchronization Addendum — v1.27

### DIUA-DIC-000032

**Registered Document:** KDS Satu Hati Sulawesi Utara — Project Architecture

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-23

**Allocation Evidence:** CONTENT-OS-ALLOC-032 in Universal Identifier Registration Record v1.24

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000033`

---

## Current Registry Addendum — v1.28

### DIUA-DIC-000033

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Production SOP

**Object Class:** Domain/Project-Level Operational Workflow Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-99](https://linear.app/bussiness-content-os/issue/BUS-99/kds-satu-hati-sulawesi-utara-production-sop) — KDS Satu Hati Sulawesi Utara — Production SOP

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Allocation Evidence:** CONTENT-OS-ALLOC-033 in Universal Identifier Registration Record v1.25

**Next Available:** `DIUA-DIC-000034`

---

## Lifecycle Synchronization Addendum — v1.29

### DIUA-DIC-000033

**Registered Document:** KDS Satu Hati Sulawesi Utara — Production SOP

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-23

**Allocation Evidence:** CONTENT-OS-ALLOC-033 in Universal Identifier Registration Record v1.25

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000034`

---

## Current Registry Addendum — v1.30

### DIUA-DIC-000034

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Research Source List

**Object Class:** Domain/Project-Level Knowledge Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-100](https://linear.app/bussiness-content-os/issue/BUS-100/kds-satu-hati-sulawesi-utara-research-source-list) — KDS Satu Hati Sulawesi Utara — Research Source List

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Allocation Evidence:** CONTENT-OS-ALLOC-034 in Universal Identifier Registration Record v1.26

**Next Available:** `DIUA-DIC-000035`

---

## Lifecycle Synchronization Addendum — v1.31

### DIUA-DIC-000034

**Registered Document:** KDS Satu Hati Sulawesi Utara — Research Source List

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-23

**Allocation Evidence:** CONTENT-OS-ALLOC-034 in Universal Identifier Registration Record v1.26

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000035`

---

## Current Registry Addendum — v1.32

### DIUA-DIC-000035

**Canonical Name:** KDS Satu Hati Sulawesi Utara — QA Document

**Object Class:** Domain/Project-Level Quality Assurance Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-101](https://linear.app/bussiness-content-os/issue/BUS-101/kds-satu-hati-sulawesi-utara-qa-document) — KDS Satu Hati Sulawesi Utara — QA Document

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Allocation Evidence:** CONTENT-OS-ALLOC-035 in Universal Identifier Registration Record v1.27

**Next Available:** `DIUA-DIC-000036`

---

## Lifecycle Synchronization Addendum — v1.33

### DIUA-DIC-000035

**Registered Document:** KDS Satu Hati Sulawesi Utara — QA Document

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-23

**Allocation Evidence:** CONTENT-OS-ALLOC-035 in Universal Identifier Registration Record v1.27

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000036`

---

## Current Registry Addendum — v1.34

### DIUA-DIC-000036

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Asset Registry

**Object Class:** Domain/Project-Level Identity Registry Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-102](https://linear.app/bussiness-content-os/issue/BUS-102/kds-satu-hati-sulawesi-utara-asset-registry) — KDS Satu Hati Sulawesi Utara — Asset Registry

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Allocation Evidence:** CONTENT-OS-ALLOC-036 in Universal Identifier Registration Record v1.28

**Next Available:** `DIUA-DIC-000037`

---

## Lifecycle Synchronization Addendum — v1.35

### DIUA-DIC-000036

**Registered Document:** KDS Satu Hati Sulawesi Utara — Asset Registry

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-25

**Allocation Evidence:** CONTENT-OS-ALLOC-036 in Universal Identifier Registration Record v1.28

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000037`

---

## Current Registry Addendum — v1.36

### DIUA-DIC-000037

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification

**Object Class:** Domain/Project-Level Format Specification

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-105](https://linear.app/bussiness-content-os/issue/BUS-105/kds-satu-hati-sulawesi-utara-reflection-carousel-format-specification) — KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification

**Document ID:** `d9dfe1d1-b591-4fb3-9091-ece8968e2e0f`

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Allocation Evidence:** CONTENT-OS-ALLOC-037 in Universal Identifier Registration Record v1.29

**Next Available:** `DIUA-DIC-000038`

---

## Lifecycle Synchronization Addendum — v1.37

### DIUA-DIC-000037

**Registered Document:** KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-26

**Allocation Evidence:** CONTENT-OS-ALLOC-037 in Universal Identifier Registration Record v1.29

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000038`

---

## Current Registry Addendum — v1.38

### DIUA-DIC-000038

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Psychology Series Production Bible

**Object Class:** Domain/Project-Level Series Production Bible

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Related Issue:** [BUS-106](https://linear.app/bussiness-content-os/issue/BUS-106/kds-satu-hati-sulawesi-utara-psychology-series-production-bible) — KDS Satu Hati Sulawesi Utara — Psychology Series Production Bible

**Document ID:** `425b344a-8923-4b07-bfc6-62ba44a618fd`

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** RECOVERY DRAFT v0.1

**Allocation Evidence:** CONTENT-OS-ALLOC-038 in Universal Identifier Registration Record v1.30

**Next Available:** `DIUA-DIC-000039`

---

## Lifecycle Synchronization Addendum — v1.39

### DIUA-DIC-000038

**Registered Document:** KDS Satu Hati Sulawesi Utara — Psychology Series Production Bible

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-26

**Allocation Evidence:** CONTENT-OS-ALLOC-038 in Universal Identifier Registration Record v1.30

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000039`

---

## Current Registry Addendum — v1.40

### DIUA-DIC-000039

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible

**Object Class:** Domain/Project-Level Series Layout Bible

**Related Issue:** [BUS-107](https://linear.app/bussiness-content-os/issue/BUS-107/kds-psychology-series-layout-bible)

**Document ID:** `712fa865-2c0f-4fe0-a3a9-df7bfea52492`

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Allocation Evidence:** CONTENT-OS-ALLOC-039 in Universal Identifier Registration Record v1.31

### DIUA-DIC-000040

**Canonical Name:** KDS Satu Hati Sulawesi Utara — Psychology Series Reference Sheet

**Object Class:** Domain/Project-Level Visual Reference Sheet

**Related Issue:** [BUS-108](https://linear.app/bussiness-content-os/issue/BUS-108/kds-psychology-series-reference-sheet)

**Document ID:** `97bc6540-b662-4018-a131-4b2b601c3a41`

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Allocation Evidence:** CONTENT-OS-ALLOC-040 in Universal Identifier Registration Record v1.31

**Next Available:** `DIUA-DIC-000041`

---

## Current Registry Addendum — v1.41

### DIUA-DIC-000041

**Canonical Name:** Content OS — Storage Authority Profile

**Object Class:** System-Level Implementation Specification

**Related Issue:** [BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile)

**Document ID:** `160f1938-31b6-419c-93bf-31b26eda643e`

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Allocation Evidence:** CONTENT-OS-ALLOC-041 in Universal Identifier Registration Record v1.32

**Next Available:** `DIUA-DIC-000042`

---

## Lifecycle Synchronization Addendum — v1.42

### DIUA-DIC-000041

**Registered Document:** Content OS — Storage Authority Profile

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-26

**Allocation Evidence:** CONTENT-OS-ALLOC-041 in Universal Identifier Registration Record v1.32

**Change Scope:** lifecycle synchronization only.

**Next Available:** `DIUA-DIC-000042`

---

## Lifecycle Synchronization Addendum — v1.43

### DIUA-DIC-000039

**Registered Document:** KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible

**Target lifecycle:** **CANONICAL v1.0** — Owner-approved 2026-09-26 under [BUS-107](https://linear.app/bussiness-content-os/issue/BUS-107/kds-psychology-series-layout-bible).

**Allocation evidence:** `CONTENT-OS-ALLOC-039` in Universal Identifier Registration Record v1.31.

### DIUA-DIC-000040

**Registered Document:** KDS Satu Hati Sulawesi Utara — Psychology Series Reference Sheet

**Target lifecycle:** **CANONICAL v1.0** — Owner-approved 2026-09-26 under [BUS-108](https://linear.app/bussiness-content-os/issue/BUS-108/kds-psychology-series-reference-sheet).

**Allocation evidence:** `CONTENT-OS-ALLOC-040` in Universal Identifier Registration Record v1.31.

**Change scope:** lifecycle synchronization only. No identifier assignment, object class, allocation act, namespace grammar, eligibility rule, or next-available sequence changed.

**Next available sequence remains:** `DIUA-DIC-000042`.

---

## Lifecycle Synchronization Addendum — v1.44 — 2026-09-26

This addendum supersedes earlier **current-state** lifecycle notes for the three Psychology Series documents while preserving their historical allocation/canonicalization records.

### DIUA-DIC-000038

**Registered Document:** KDS Satu Hati Sulawesi Utara — Psychology Series Production Bible
**Current lifecycle/version:** **CANONICAL v1.8**
**Structural context:** Tier 2 recursive sub-project — Psychology Series; parent KDS Satu Hati Sulawesi Utara
**Allocation evidence:** `CONTENT-OS-ALLOC-038` in Registration Record v1.30

### DIUA-DIC-000039

**Registered Document:** KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible
**Current lifecycle/version:** **CANONICAL v1.1**
**Structural context:** Tier 2 recursive sub-project — Psychology Series; parent KDS Satu Hati Sulawesi Utara
**Allocation evidence:** `CONTENT-OS-ALLOC-039` in Registration Record v1.31

### DIUA-DIC-000040

**Registered Document:** KDS Satu Hati Sulawesi Utara — Psychology Series Reference Sheet
**Current lifecycle/version:** **CANONICAL v1.1**
**Structural context:** Tier 2 recursive sub-project — Psychology Series; parent KDS Satu Hati Sulawesi Utara
**Allocation evidence:** `CONTENT-OS-ALLOC-040` in Registration Record v1.31

### Dependency synchronization

System Governance dependency is synchronized from v1.14 to **v1.15 CANONICAL**. System Architecture remains v1.14 CANONICAL; Registration Record remains v1.32 CANONICAL.

**Next available sequence remains:** `DIUA-DIC-000042`.

**Change classification:** lifecycle/current-state and dependency maintenance only.

---

## Current Registry Addendum — v1.45 — 2026-09-27

### DIUA-DIC-000042

**Canonical Name:** Content OS — Production Connector Lifecycle Profile

**Object Class:** System-Level Implementation Specification

**Structural Classification:** Tiered — Document Tier: System Level (Tier 1)

**Related Issue:** [BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile)

**Document ID:** `a2969fdf-fb15-41f0-accd-f7921774a271`

**Identifier State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Allocation Evidence:** CONTENT-OS-ALLOC-042 in Universal Identifier Registration Record v1.33

**Next Available:** `DIUA-DIC-000043`

---

## Lifecycle Synchronization Addendum — v1.46 — 2026-09-27

### DIUA-DIC-000042

**Registered Document:** Content OS — Production Connector Lifecycle Profile

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** CANONICAL v1.0

**Canonicalization Date:** 2026-09-27

**Allocation Evidence:** CONTENT-OS-ALLOC-042 in Universal Identifier Registration Record v1.33

**Change Scope:** lifecycle synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000043`

---

## Lifecycle Synchronization Addendum — v1.47 — 2026-09-27

### DIUA-DIC-000042

**Registered Document:** Content OS — Production Connector Lifecycle Profile

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** **CANONICAL LOCKED v1.0**

**Lock Date:** 2026-09-27

**Allocation Evidence:** CONTENT-OS-ALLOC-042 in Universal Identifier Registration Record v1.33

**Change Scope:** lifecycle synchronization only. Identifier assignment, allocation evidence, and next-available sequence are unchanged.

**Next Available:** `DIUA-DIC-000043`

---

## Lifecycle Synchronization Addendum — v1.48 — 2026-09-27

### DIUA-DIC-000033

**Registered Document:** KDS Satu Hati Sulawesi Utara — Production SOP / Workflow

**Identifier State:** ALLOCATED — ACTIVE

**Current Document Lifecycle State:** **CANONICAL v1.14**

**Operational short name:** KDS Production Workflow

**Allocation Evidence:** CONTENT-OS-ALLOC-033 in Universal Identifier Registration Record v1.25

**Change Scope:** lifecycle/current-version synchronization only. Identifier assignment and allocation evidence are unchanged.

**Next Available:** `DIUA-DIC-000043`

---

## Lifecycle / Dependency Synchronization Addendum — v1.49 — 2026-09-28

### DIUA-DIC-000005

**Registered Document:** Content OS — System Architecture
**Identifier State:** ALLOCATED — ACTIVE
**Current Document Lifecycle State:** **CANONICAL v1.16**

### DIUA-DIC-000006

**Registered Document:** Content OS — System Governance
**Identifier State:** ALLOCATED — ACTIVE
**Current Document Lifecycle State:** **CANONICAL v1.17**

### DIUA-DIC-000041

**Registered Document:** Content OS — Storage Authority Profile
**Identifier State:** ALLOCATED — ACTIVE
**Current Document Lifecycle State:** **CANONICAL v1.1**

### Dependency synchronization

* System Governance dependency: v1.15 → **v1.17 CANONICAL**.
* System Architecture dependency: v1.14 → **v1.16 CANONICAL**.
* Universal Identifier Registration Record dependency: v1.32 → **v1.33 CANONICAL**.

**Change Scope:** lifecycle/current-version and dependency maintenance only. No identifier assignment or allocation evidence changed.

**Next Available:** `DIUA-DIC-000043`

---

## Dependency Synchronization Addendum — v1.50 — 2026-09-28

* Universal Identifier Registration Record dependency: v1.33 → **v1.34 CANONICAL**.
* No identifier assignment, lifecycle state, allocation evidence, or next-available sequence changed.
* **Next Available:** `DIUA-DIC-000043`.