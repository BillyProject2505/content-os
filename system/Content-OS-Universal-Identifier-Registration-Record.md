---
document_name: "Content OS — Universal Identifier Registration Record"
document_class: "System-Level Registration Record Document"
structural_classification: "Tiered — Document Tier: System Level (Tier 1)"
system: "Content OS"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per System Governance §4."
related_issue: "BUS-17"
universal_identifier: null
identifier_exemption:
  status: "EXPLICIT_SOURCE_EXEMPTION"
  basis: "Not applicable — this document is the evidence record, not a registered entry."
version: "1.34"
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
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/content-os-universal-identifier-registration-record-v134-canonical-984555237e68"
representation_profile: "DIUA-DIC-000026@1.3"
---
# Content OS — Universal Identifier Registration Record

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Content OS — Universal Identifier Registration Record |
| Document Class | System-Level Registration Record Document |
| Version | 1.34 |
| Status | **CANONICAL** — v1.34 synchronizes the current System Governance dependency to v1.17 after the staged GitHub migration model was incorporated. Allocation acts and historical allocation evidence are unchanged. Previously v1.33. |
| Related Issue | [BUS-17](https://linear.app/bussiness-content-os/issue/BUS-17/universal-identifier-registration-record) — Universal Identifier Registration Record |
| Owner | **\[OPERATIONAL DEFAULT\]** (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator (Billy Fernando Mende), per System Governance §4. |
| Structural Classification | Tiered — Document Tier: System Level (Tier 1) |
| Universal Identifier (UNIS/DIC) | Not applicable — this document is the evidence record, not a registered entry. |
| Depends On | Content OS — Root Documentation Structure (v2.5, CANONICAL — [BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md) §5 — Document Identity conventions this document follows; §3 — Representation Portability), and System Governance (v1.17, CANONICAL — [BUS-15](DIUA-DIC-000006_Content-OS-System-Governance.md) §6 — this document's change-control cycle). **Not a dependency (contextual reference only, no version pin):** Universal Identifier Registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4) is the current authoritative state this document's allocation acts evidence — the dependency runs the other way ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §5 depends on this document), so this document does not version-pin it. **External Governing Standard:** UNIR-CORE-001 v1.2 (external, reference material) — allocation-act pattern only, per Root Level Architecture §8 point 5. |

---

## 1. Purpose

This document records the allocation-act-level evidence for each `DIUA-DIC` identifier issued to a Content OS document — why it was allocated, to what, and when — mirroring the Allocation Act pattern demonstrated in the reference UNIR material, simplified for Content OS's current scale (single Owner, no multi-party authorization gate).

This document is evidence and traceability. The current authoritative state is the Registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4), not this document — per UNIR-CORE-001's own Allocation Boundary distinction (Concrete Identifier ≠ Allocation Act ≠ Registration Record ≠ Registry Object ≠ Current Registry State).

---

## 2. Scope

### 2.1 In Scope

* One allocation-act entry per `DIUA-DIC` identifier issued to a Content OS document.
* Traceability: target document, allocation basis, allocation date.

### 2.2 Out of Scope

* Current authoritative registry state — owned by the Registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §4).
* Identifier grammar semantics — owned by UNIS-CORE-001 (external).
* Any allocation made by a party other than this workspace — not represented here (this document only evidences Content OS's own allocations).

---

## 3. Allocation Acts

### CONTENT-OS-ALLOC-001 — DIUA-DIC-000001

**Target:** Content OS — Root Level Architecture ([BUS-10](../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md))
**Allocation Basis:** First document in Content OS's fresh `DIUA-DIC` sequence (Registry §4), per Owner instruction that the reference material's example allocations — verified as at least `000001` (a generic first-registration event) and `000005`–`000008` (tied to unrelated illustrative targets: UPKR documents, Universal Canonicalization Protocol) — do not bind Content OS's own numbering. `000002`–`000004` were not shown in the supplied material at all; their existence or target is unknown, not merely unbinding.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-002 — DIUA-DIC-000002

**Target:** Content OS — Root Governance ([BUS-11](../root/DIUA-DIC-000002_Content-OS-Root-Governance.md))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-001.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-003 — DIUA-DIC-000003

**Target:** Content OS — Root Documentation Structure ([BUS-12](../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-002.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-004 — DIUA-DIC-000004

**Target:** Content OS — Reference Model ([BUS-13](https://linear.app/bussiness-content-os/issue/BUS-13/define-reference))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-003.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-005 — DIUA-DIC-000005

**Target:** Content OS — System Architecture ([BUS-14](DIUA-DIC-000005_Content-OS-System-Architecture.md))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-004.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-006 — DIUA-DIC-000006

**Target:** Content OS — System Governance ([BUS-15](DIUA-DIC-000006_Content-OS-System-Governance.md))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-005; last of the initial six canonical documents.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-007 — DIUA-DIC-000007

**Target:** SDOH — Project Architecture (Domain/Project Tier 2 — Satu Dosis Obat Hati)
**Allocation Basis:** First Tier 2 allocation, per SDOH Owner's explicit instruction on 2026-09-03 to register the domain's canonical documents.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-008 — DIUA-DIC-000008

**Target:** SDOH — Production SOP (Domain/Project Tier 2 — Satu Dosis Obat Hati)
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-007.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-009 — DIUA-DIC-000009

**Target:** SDOH — Research Source List (Domain/Project Tier 2 — Satu Dosis Obat Hati)
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-008.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-010 — DIUA-DIC-000010

**Target:** SDOH — QA Document (Domain/Project Tier 2 — Satu Dosis Obat Hati)
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-009; last of SDOH's initial four canonical documents.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-011 — DIUA-DIC-000011

**Target:** SDOH — Asset Registry (Domain/Project Tier 2 — Satu Dosis Obat Hati)
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-010; new document created to register SDOH's reusable visual asset identities (logo variants, surfaces, ornament).
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-012 — DIUA-DIC-000012

**Target:** Coz We Care — Production Bible ([BUS-18](https://linear.app/bussiness-content-os/issue/BUS-18/coz-we-care-production-bible))
**Allocation Basis:** Backfill allocation per Universal Identifier Registry §7 OQ1's resolution (2026-09-06) — identifier is now mandatory for all Content OS documents, Tier 1 through Tier 2; this document previously had none under the prior discretionary policy.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-013 — DIUA-DIC-000013

**Target:** Coz We Care — Canonical Asset System (CAS) ([BUS-19](https://linear.app/bussiness-content-os/issue/BUS-19/coz-we-care-canonical-asset-system-cas))
**Allocation Basis:** Backfill allocation, same basis as CONTENT-OS-ALLOC-012.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-014 — DIUA-DIC-000014

**Target:** Coz We Care — Canonical Asset Registry (CAR) ([BUS-20](https://linear.app/bussiness-content-os/issue/BUS-20/cwc-asset-registry-car))
**Allocation Basis:** Backfill allocation, same basis as CONTENT-OS-ALLOC-012.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-015 — DIUA-DIC-000015

**Target:** Coz We Care — Canonical Asset Bible (CAB) ([BUS-21](https://linear.app/bussiness-content-os/issue/BUS-21/cwc-asset-bible-cab))
**Allocation Basis:** Backfill allocation, same basis as CONTENT-OS-ALLOC-012.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-016 — DIUA-DIC-000016

**Target:** Coz We Care — Reference Sheet (CRS) ([BUS-22](https://linear.app/bussiness-content-os/issue/BUS-22/cwc-reference-sheet-crs))
**Allocation Basis:** Backfill allocation, same basis as CONTENT-OS-ALLOC-012.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-017 — DIUA-DIC-000017

**Target:** CWC Production Workflow (Domain/Project Tier 2 — Coz We Care)
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-016; identifier backfill required because Universal Identifier Registry v1.7 made identifiers mandatory for every Content OS document and this canonical Workflow had no registered DIUA-DIC identifier.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-018 — DIUA-DIC-000018

**Target:** CWC Format Specialization Specification (`CWC-FSS-001`, Domain/Project Tier 2 — Coz We Care; [BUS-41](https://linear.app/bussiness-content-os/issue/BUS-41/cwc-format-specialization-specification-cwc-fss-001))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-017; identifier backfill replacing the document's prior `Not yet allocated` state.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-019 — DIUA-DIC-000019

**Target:** CWC QA Mechanism (`CWC-QA-001`, Domain/Project Tier 2 — Coz We Care; [BUS-43](<https://linear.app/bussiness-content-os/issue/BUS-43/cwc-qa-mechanism-cwc-qa-001>))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-018; identifier backfill replacing the document's prior `Not yet allocated` state.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-020 — DIUA-DIC-000020

**Target:** SDOH — Sage Carousel Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati; [BUS-50](https://linear.app/bussiness-content-os/issue/BUS-50/satu-dosis-obat-hati-carousel-content-registers))
**Allocation Basis:** First post-boundary allocation under Root Documentation Structure v2.4 §10.1; confirmed REGISTERABLE GOVERNED DOCUMENT.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-021 — DIUA-DIC-000021

**Target:** SDOH — Burgundy Carousel Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati; [BUS-50](https://linear.app/bussiness-content-os/issue/BUS-50/satu-dosis-obat-hati-carousel-content-registers))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-020; confirmed REGISTERABLE GOVERNED DOCUMENT under Root Documentation Structure v2.4 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-022 — DIUA-DIC-000022

**Target:** SDOH — Sage Reels Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati; [BUS-51](https://linear.app/bussiness-content-os/issue/BUS-51/satu-dosis-obat-hati-reels-content-registers))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-021; confirmed REGISTERABLE GOVERNED DOCUMENT under Root Documentation Structure v2.4 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-023 — DIUA-DIC-000023

**Target:** SDOH — Burgundy Reels Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati; [BUS-51](https://linear.app/bussiness-content-os/issue/BUS-51/satu-dosis-obat-hati-reels-content-registers))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-022; confirmed REGISTERABLE GOVERNED DOCUMENT under Root Documentation Structure v2.4 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-024 — DIUA-DIC-000024

**Target:** SDOH — Sage TikTok Poster Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati; [BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-023; confirmed REGISTERABLE GOVERNED DOCUMENT under Root Documentation Structure v2.4 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

### CONTENT-OS-ALLOC-025 — DIUA-DIC-000025

**Target:** SDOH — Burgundy TikTok Poster Content Register (Domain/Project Tier 2 — Satu Dosis Obat Hati; [BUS-54](https://linear.app/bussiness-content-os/issue/BUS-54/satu-dosis-obat-hati-tiktok-poster-content-registers))
**Allocation Basis:** Sequential allocation following CONTENT-OS-ALLOC-024; confirmed REGISTERABLE GOVERNED DOCUMENT under Root Documentation Structure v2.4 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

---

## 4. Canonical Closure (Current Batch)

```text
Allocations recorded:    16
Range:                   DIUA-DIC-000001 – DIUA-DIC-000016
Next available:          DIUA-DIC-000017
Registry cross-check:    Matches Universal Identifier Registry (BUS-16) §4, v1.8
```

---

## 5. Exclusions

* Multi-party authorization workflow — not adopted (no demonstrated need, §7).
* Any allocation act not originating from this workspace.

---

## 6. Open Questions / Unresolved Decisions

1. **Format for future allocation-act IDs** (`CONTENT-OS-ALLOC-NNN` here) — informal, invented for this document; not itself governed by UNIS/UNIR. Left open whether a more formal scheme is needed once volume increases.
2. Same namespace-exclusivity caveat as Registry ([BUS-16](https://linear.app/bussiness-content-os/issue/BUS-16/universal-identifier-registry) §7, Open Question 2) applies here identically.

---

*End of Document — Content OS Universal Identifier Registration Record v1.32 (CANONICAL)*

---

## Allocation Act Addendum — v1.17

### CONTENT-OS-ALLOC-026 — DIUA-DIC-000026

**Target:** Content OS — Repository Representation Profile ([BUS-56](DIUA-DIC-000026_Content-OS-Repository-Representation-Profile.md))
**Document Class:** System-Level Implementation Specification
**Structural Classification:** Tiered — Document Tier: System Level (Tier 1)
**Allocation Basis:** The document is intended to persist as the current implementation specification for repository/file representation of governed Content OS documents, owns the concrete representation-mapping rules subordinate to Root Documentation Structure v2.5 §3, may be cited by migration/export workflows, and has an independent lifecycle beyond a single review event. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT test in Root Documentation Structure v2.5 §10.1.
**Allocation State:** ALLOCATED — ACTIVE
**Canonicalization Effect:** None. Identifier allocation does not promote the target from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.19

### CONTENT-OS-ALLOC-027 — DIUA-DIC-000027

**Target:** CWC — Content Register (Domain/Project Tier 2 — Coz We Care; [BUS-57](<https://linear.app/bussiness-content-os/issue/BUS-57/cwc-content-register>))
**Document Class:** Project-Level Operational Content Register
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Allocation Basis:** The register is intended to persist as CWC's authoritative operational index of content instances and publication history; it owns duplicate-control, intentional repurposing traceability, and content-instance identity records; it may be referenced by CWC planning and production workflows; and it has an independent lifecycle beyond a single production or review event. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT test in Root Documentation Structure v2.5 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

---

## Allocation Act Addendum — v1.20

### CONTENT-OS-ALLOC-028 — DIUA-DIC-000028

**Target:** CWC FORMAT-POSTER (Domain/Project Tier 2 — Coz We Care; [BUS-65](https://linear.app/bussiness-content-os/issue/BUS-65/cwc-format-poster-typography-specialization-and-registration); Linear Document `f648d691-eb1c-4d16-b738-9689b4346fa4`)
**Document Class:** Tier 2 Format Specialization Object / Poster Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Allocation Basis:** FORMAT-POSTER persists as the authoritative operational definition of CWC single-canvas static social-feed poster specialization. It owns reusable poster-format implementation constraints, is consumed by production and QA, has an independent governed lifecycle, and is not a transient issue/comment/evidence artifact. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT test in Root Documentation Structure v2.5 §10.1.
**Allocation State:** ALLOCATED — ACTIVE
**Allocation Date:** 2026-09-17
**Owner Approval Context:** [BUS-65](https://linear.app/bussiness-content-os/issue/BUS-65/cwc-format-poster-typography-specialization-and-registration) typography matrix approved by the CWC domain Owner on 2026-09-17. Identifier allocation does not itself satisfy FSS registration; FSS §12 validation and Format Addition Gate remain separate acts.

---

## Allocation Act Addendum — v1.21

### CONTENT-OS-ALLOC-029 — DIUA-DIC-000029

**Target:** CWC FORMAT-CAROUSEL (Domain/Project Tier 2 — Coz We Care; [BUS-66](https://linear.app/bussiness-content-os/issue/BUS-66/cwc-format-carousel-typography-specialization-and-registration))
**Document Class:** Tier 2 Format Specialization Object / Carousel Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Allocation Basis:** `FORMAT-CAROUSEL` is intended to persist as CWC's governed carousel-format implementation object under FSS-001. It defines reusable format-specific production and typography constraints, is referenced by production/QA execution, and has an independent lifecycle beyond any single content item. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.
**Allocation State:** ALLOCATED — ACTIVE

Allocation establishes identity only. Registration remains governed by FSS-001 §12–§13 and Owner approval.

---

## Allocation Act Addendum — v1.22

### CONTENT-OS-ALLOC-030 — DIUA-DIC-000030

**Target:** CWC FORMAT-REEL (Domain/Project Tier 2 — Coz We Care; [BUS-67](https://linear.app/bussiness-content-os/issue/BUS-67/cwc-format-reel-typography-specialization-and-registration))
**Document Class:** Tier 2 Format Specialization Object / Reel Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Allocation Basis:** `FORMAT-REEL` is intended to persist as CWC's governed Reel-format implementation object under FSS-001. It defines reusable format-specific production and typography constraints, is referenced by production/QA execution, and has an independent lifecycle beyond any single content item. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.
**Allocation Date:** 2026-09-17
**Owner Approval Context:** [BUS-67](https://linear.app/bussiness-content-os/issue/BUS-67/cwc-format-reel-typography-specialization-and-registration) Reel typography matrix accepted through Owner continuation on 2026-09-17. Identifier allocation does not itself satisfy FSS registration; FSS §12 validation and Format Addition Gate remain separate acts.
**Allocation State:** ALLOCATED — ACTIVE
**Target Document State at Allocation:** DRAFT
**Format Object State at Allocation:** DRAFT

---

## Allocation Act Addendum — v1.23

### CONTENT-OS-ALLOC-031 — DIUA-DIC-000031

**Target:** CWC FORMAT-STORY (Domain/Project Tier 2 — Coz We Care; [BUS-68](https://linear.app/bussiness-content-os/issue/BUS-68/cwc-format-story-typography-specialization-and-registration))
**Document Class:** Tier 2 Format Specialization Object / Story Production Specification
**Structural Classification:** Tiered — Domain/Project Tier 2 — Coz We Care
**Allocation Basis:** `FORMAT-STORY` is intended to persist as CWC's governed Story-format implementation object under FSS-001. It defines reusable format-specific production and typography constraints, is referenced by production/QA execution, and has an independent lifecycle beyond any single content item. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.
**Allocation Date:** 2026-09-17
**Owner Approval Context:** [BUS-68](https://linear.app/bussiness-content-os/issue/BUS-68/cwc-format-story-typography-specialization-and-registration) typography matrix accepted through Owner continuation on 2026-09-17. Identifier allocation does not itself satisfy FSS registration; FSS §12 validation and Format Addition Gate remain separate acts.
**Allocation State:** ALLOCATED — ACTIVE

---

## Allocation Act Addendum — v1.24

### CONTENT-OS-ALLOC-032 — DIUA-DIC-000032

**Target:** KDS Satu Hati Sulawesi Utara — Project Architecture (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-98](https://linear.app/bussiness-content-os/issue/BUS-98/kds-satu-hati-sulawesi-utara-project-architecture))

**Document Class:** Domain/Project-Level Architecture Document

**Structural Classification:** Tiered — Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The Project Architecture is intended to persist as the authoritative project-level definition of KDS identity within Content OS, responsibility and scope boundaries, authority relationships, and downstream document ownership. It has an independent governed lifecycle beyond any single production event and therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.

**Allocation Date:** 2026-09-23

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target document from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.25

### CONTENT-OS-ALLOC-033 — DIUA-DIC-000033

**Target:** KDS Satu Hati Sulawesi Utara — Production SOP (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-99](https://linear.app/bussiness-content-os/issue/BUS-99/kds-satu-hati-sulawesi-utara-production-sop))

**Document Class:** Domain/Project-Level Operational Workflow Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The Production SOP is intended to persist as the authoritative KDS cross-format production workflow, governing stage routing, handoffs, authority calls, approval boundaries, and publication readiness across content production. It has an independent lifecycle beyond any single content item and therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.

**Allocation Date:** 2026-09-23

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target document from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.26

### CONTENT-OS-ALLOC-034 — DIUA-DIC-000034

**Target:** KDS Satu Hati Sulawesi Utara — Research Source List (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-100](https://linear.app/bussiness-content-os/issue/BUS-100/kds-satu-hati-sulawesi-utara-research-source-list))

**Document Class:** Domain/Project-Level Knowledge Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The Research Source List is intended to persist as the authoritative KDS project-level source-governance and claim-coverage document, maintaining source records, evidence limitations, access status, freshness/re-verification state, and claim-to-source relationships across multiple content instances. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.

**Allocation Date:** 2026-09-23

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target document from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.27

### CONTENT-OS-ALLOC-035 — DIUA-DIC-000035

**Target:** KDS Satu Hati Sulawesi Utara — QA Document (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-101](https://linear.app/bussiness-content-os/issue/BUS-101/kds-satu-hati-sulawesi-utara-qa-document))

**Document Class:** Domain/Project-Level Quality Assurance Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The QA Document is intended to persist as the authoritative KDS project-level quality gate across content instances, governing applicable checks, QA evidence, verdicts, failure routing, and readiness conformance. It therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.

**Allocation Date:** 2026-09-23

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target document from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.28

### CONTENT-OS-ALLOC-036 — DIUA-DIC-000036

**Target:** KDS Satu Hati Sulawesi Utara — Asset Registry (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-102](https://linear.app/bussiness-content-os/issue/BUS-102/kds-satu-hati-sulawesi-utara-asset-registry))

**Document Class:** Domain/Project-Level Identity Registry Document

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The Asset Registry is intended to persist as the authoritative KDS project-level reusable-asset identity and provenance registry, maintaining stable object IDs, lifecycle state, canonical source identity, binary/provenance records, derivatives, and retirement/supersession traceability across multiple content instances.

**Allocation Date:** 2026-09-23

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target document from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.29

### CONTENT-OS-ALLOC-037 — DIUA-DIC-000037

**Target:** KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-105](https://linear.app/bussiness-content-os/issue/BUS-105/kds-satu-hati-sulawesi-utara-reflection-carousel-format-specification))

**Target Document ID:** `d9dfe1d1-b591-4fb3-9091-ece8968e2e0f`

**Document Class:** Domain/Project-Level Format Specification

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The Reflection Carousel Format Specification is intended to persist as the governed format-specific authority for the recurring KDS Reflection Carousel structure, including its fixed three-slide semantic sequence and format-specific conformance rules across multiple content instances. It has an independent lifecycle beyond any single carousel and therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.

**Allocation Date:** 2026-09-26

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target document from DRAFT to CANONICAL.

---

## Allocation Act Addendum — v1.30

### CONTENT-OS-ALLOC-038 — DIUA-DIC-000038

**Target:** KDS Satu Hati Sulawesi Utara — Psychology Series Production Bible (Domain/Project Tier 2 — KDS Satu Hati Sulawesi Utara; [BUS-106](https://linear.app/bussiness-content-os/issue/BUS-106/kds-satu-hati-sulawesi-utara-psychology-series-production-bible))

**Target Document ID:** `425b344a-8923-4b07-bfc6-62ba44a618fd`

**Document Class:** Domain/Project-Level Series Production Bible

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** The Psychology Series Production Bible is intended to persist as the governed series-specific authority for recurring KDS Psychology Series editorial structure, visual continuity, prompt hierarchy, character/scene continuity, and series production rules across multiple content instances. It has an independent lifecycle beyond any single episode and therefore satisfies the REGISTERABLE GOVERNED DOCUMENT boundary in Root Documentation Structure v2.5 §10.1.

**Allocation Date:** 2026-09-26

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** RECOVERY DRAFT v0.1

**Legacy Provenance:** reconstructed from the historical Production Bible Seri Psikologi KDS v1.0 — LOCKED and associated locked rules from 2026-07-05.

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the RECOVERY DRAFT target to CANONICAL.

---

## Allocation Act Addendum — v1.31

### CONTENT-OS-ALLOC-039 — DIUA-DIC-000039

**Target:** KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible ([BUS-107](https://linear.app/bussiness-content-os/issue/BUS-107/kds-psychology-series-layout-bible))

**Target Document ID:** `712fa865-2c0f-4fe0-a3a9-df7bfea52492`

**Document Class:** Domain/Project-Level Series Layout Bible

**Structural Classification:** Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** This document persists as the governed series-specific authority for Psychology Series layout architecture, anime rendering behavior, Brand Presenter use, copy/visual hierarchy, and narrative continuity across multiple episodes.

**Allocation Date:** 2026-09-26

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Canonicalization Effect:** None.

### CONTENT-OS-ALLOC-040 — DIUA-DIC-000040

**Target:** KDS Satu Hati Sulawesi Utara — Psychology Series Reference Sheet ([BUS-108](https://linear.app/bussiness-content-os/issue/BUS-108/kds-psychology-series-reference-sheet))

**Target Document ID:** `97bc6540-b662-4018-a131-4b2b601c3a41`

**Document Class:** Domain/Project-Level Visual Reference Sheet

**Structural Classification:** Tiered — Reference / Project Reference — KDS Satu Hati Sulawesi Utara

**Allocation Basis:** This document persists as the governed visual reference for Psychology Series composition, anime rendering evidence, Brand Presenter continuity, and scene-driven storytelling across multiple content instances.

**Allocation Date:** 2026-09-26

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Canonicalization Effect:** None.

---

## Allocation Act Addendum — v1.32

### CONTENT-OS-ALLOC-041 — DIUA-DIC-000041

**Target:** Content OS — Storage Authority Profile ([BUS-109](https://linear.app/bussiness-content-os/issue/BUS-109/content-os-storage-authority-profile))

**Target Document ID:** `160f1938-31b6-419c-93bf-31b26eda643e`

**Document Class:** System-Level Implementation Specification

**Structural Classification:** Tiered — Document Tier: System Level (Tier 1)

**Allocation Basis:** This document persists as the cross-project implementation authority for the current Content OS storage split between Linear text/governance authority and Google Drive binary/image/reference-evidence storage. It applies across multiple Tier 2 projects and therefore belongs at System level.

**Allocation Date:** 2026-09-26

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Canonicalization Effect:** None.

---

## Allocation Act Addendum — v1.33

### CONTENT-OS-ALLOC-042 — DIUA-DIC-000042

**Target:** Content OS — Production Connector Lifecycle Profile ([BUS-118](https://linear.app/bussiness-content-os/issue/BUS-118/content-os-production-connector-lifecycle-profile))

**Target Document ID:** `a2969fdf-fb15-41f0-accd-f7921774a271`

**Document Class:** System-Level Implementation Specification

**Structural Classification:** Tiered — Document Tier: System Level (Tier 1)

**Allocation Basis:** The profile persists as the single cross-project implementation authority for when Linear and Google Drive connectors are resolved, stopped during local production, reconnected on explicit triggers, and used at final commit. The demonstrated need spans multiple Tier 2 projects and recursive sub-projects, specifically to prevent live connector dependence from blocking image generation, pose/expression changes, compositing, iterative rendering, and visual QA.

**Allocation Date:** 2026-09-27

**Allocation State:** ALLOCATED — ACTIVE

**Target Document State at Allocation:** DRAFT v0.1

**Canonicalization Effect:** None. Identifier allocation establishes stable identity only and does not promote the target from DRAFT to CANONICAL.

---

## Dependency Synchronization — v1.34 — 2026-09-28

* System Governance dependency: v1.15 → **v1.17 CANONICAL**.
* Allocation acts are immutable historical evidence and were not rewritten.
* No identifier allocation or next-sequence state changed.