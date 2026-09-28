---
document_name: "KDS Satu Hati Sulawesi Utara — Project Architecture"
document_class: "Domain/Project-Level Architecture Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara"
system: "Content OS → KDS Satu Hati Sulawesi Utara"
owner: "[OPERATIONAL DEFAULT] Not yet formally assigned. Defaults to the document creator under the KDS Tier 2 Governance Adoption in §0 until formally reassigned."
related_issue: "BUS-98"
universal_identifier: "DIUA-DIC-000032"
version: "1.10"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000002"
    name: "Content OS — Root Governance"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: "DIUA-DIC-000005"
    name: "Content OS — System Architecture"
    version: "1.16"
    status: "CANONICAL"
  - id: null
    name: "Content OS — Universal Identifier Registry"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/kds-satu-hati-sulawesi-utara-project-architecture-v110-canonical-a910d7a0c2f7"
representation_profile: "DIUA-DIC-000026@1.3"
---
# KDS Satu Hati Sulawesi Utara — Project Architecture

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | KDS Satu Hati Sulawesi Utara — Project Architecture |
| Document Class | Domain/Project-Level Architecture Document |
| System | Content OS → KDS Satu Hati Sulawesi Utara |
| Version | 1.10 |
| Status | **CANONICAL** — v1.10 amended 2026-09-26: Psychology Series is now formally represented as a recursive Tier-2 sub-project of KDS, with its existing canonical Production Bible, Layout Bible, and Reference Sheet moved into that Linear project. No new structural tier or duplicate authority was created. Previously v1.9. |
| Related Issue | [BUS-98](https://linear.app/bussiness-content-os/issue/BUS-98/kds-satu-hati-sulawesi-utara-project-architecture) — KDS Satu Hati Sulawesi Utara — Project Architecture |
| Owner | **\[OPERATIONAL DEFAULT\]** Not yet formally assigned. Defaults to the document creator under the KDS Tier 2 Governance Adoption in §0 until formally reassigned. |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000032` — ALLOCATED — ACTIVE |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL); Root Governance (v1.11, CANONICAL), adopted by extension for KDS Tier 2 governance per §0; Root Documentation Structure (v2.5, CANONICAL); System Architecture (v1.16, CANONICAL); Universal Identifier Registry (current CANONICAL). Allocation evidence for this document remains CONTENT-OS-ALLOC-032 in Universal Identifier Registration Record v1.24 as immutable historical allocation evidence. |
| Structural Reference | [BUS-24](../sdoh/DIUA-DIC-000007_SDOH-Project-Architecture.md) — Satu Dosis Obat Hati — Project Architecture, used as a structural reference only; SDOH-specific semantics are not inherited |

## 0. Governance Adoption

**\[DECISION\]** KDS Satu Hati Sulawesi Utara provisionally adopts the ownership, document-status vocabulary, and change-control model of Content OS — Root Governance v1.11 by extension for KDS's own Tier 2 documents.

This adoption is bounded to the KDS project domain. It does not grant KDS authority over Root, System, or other Project documents.

Until a dedicated KDS governance model is justified and approved:

* each KDS governed document has exactly one Owner;
* when no formal Owner has been assigned, the document creator is the **\[OPERATIONAL DEFAULT\]** Owner;
* KDS uses the **DRAFT / CANONICAL** document-status vocabulary;
* architectural changes follow **Propose → Classify → Review → Approve/Reject → Record → Version**;
* promotion to CANONICAL requires a documented critical review before approval;
* conformance review includes the applicable higher-tier dependencies and the Content OS minimum integrity floor.

**Review-independence note:** until a second reviewer role is formally assigned, the Review and Approve/Reject steps in this workflow are executed by the same individual holding the Owner/creator role. Audit Records and Final Critical Review sections in KDS Tier 2 documents should be read as self-executed review, not independent third-party review, until this is explicitly changed.

This section establishes the active Tier 2 governance basis for KDS documents until a dedicated KDS governance model is justified, approved, and explicitly supersedes it.

---

## 1. Identity

**Project name:** KDS Satu Hati Sulawesi Utara

**Project position:** Domain/Project Tier 2 within Content OS.

**Project type:** Communication and content-production domain for KDS Satu Hati Sulawesi Utara.

This project exists to provide a governed, traceable production system for KDS communication artefacts without turning Content OS into the operational governance system for the organization itself.

## 2. Responsibility Statement

KDS Satu Hati Sulawesi Utara Project owns the project-level rules needed to create, review, maintain, and publish communication and content artefacts produced under the KDS identity.

At project level, this architecture owns:

* project identity inside Content OS;
* responsibility and scope boundaries;
* project-level authority relationships;
* downstream document ownership;
* cross-format rules that genuinely apply to more than one format;
* rules for adding future subsystems only when a demonstrated production need exists.

This architecture does **not** own format-specific implementation details unless a rule is genuinely project-wide.

## 3. Scope Boundary

### 3.1 In Scope

The project may govern:

* public-facing KDS communication content;
* educational and informational communication artefacts;
* engagement and community-facing content;
* campaign or activity communication intended for publication;
* production workflow and approval routing;
* research/source grounding for factual claims;
* quality assurance;
* reusable production assets and their identity/provenance;
* content-instance traceability if and when a Content Register is justified;
* format-specific production specifications when an active format requires them.

### 3.2 Out of Scope

The project does not, by default, govern:

* organizational constitution, bylaws, or institutional governance;
* internal member administration;
* attendance administration;
* financial bookkeeping or organizational accounting;
* meeting minutes as an organizational record system;
* case management or individual service records;
* referral records;
* confidential or personally identifiable service-user/member data;
* operational delivery of organizational services.

A future integration with any of these areas requires an explicit architecture change. It must not occur implicitly because an artefact happens to mention KDS.

## 4. Authority Boundary

The project follows the Content OS authority hierarchy.

* Root/System-level rules remain authoritative over KDS where applicable.
* This Project Architecture owns KDS project-level semantics and boundaries.
* Downstream KDS documents may specialize implementation but must not redefine project-level responsibility.
* Format-specific documents may define canvas, layout, typography metrics, pacing, motion, safe areas, sequencing, or other format mechanics only for their format.
* Reusable asset identity belongs in the KDS Asset Registry when that document is created.
* Source-validation rules belong in the KDS Research Source List.
* Operational production steps belong in the KDS Production SOP.
* Acceptance and rejection criteria belong in the KDS QA Document.

No downstream document may create a competing project identity or expand KDS scope without an architecture change.

## 5. Audience

The canonical project audience is **not yet defined by this architecture**.

Audience assumptions must not be embedded into downstream production rules until the audience definition is explicitly reviewed and added to this architecture or another designated authoritative project-level document.

This prevents production conventions from silently becoming strategy.

## 6. Channels and Active Formats

No social channel, publishing platform, or posting cadence is made canonical by this document.

**KDS Reflection Carousel** is currently the first active governed format, established through its own canonical format-specific authority after demonstrated recurring need.

Use of Poster, other Carousel types, Reel, Story, document, or another artefact type does not automatically create another governed format subsystem.

A format becomes an active governed format only when:

1. there is a recurring production need;
2. shared rules have emerged that should be reused;
3. ownership is clear;
4. a format-specific specification materially reduces production ambiguity or rework.

This is a deliberate anti-overengineering boundary.

## 7. Visual and Asset Architecture

This architecture does not define detailed visual specifications.

Project-wide identity assets are governed through:

* **KDS Asset Registry (CANONICAL)** — stable identity, lifecycle, provenance, and canonical source records for reusable assets;
* an Asset Bible or Reference Sheet only if asset complexity later justifies those additional layers.

A separate Asset System, Asset Bible, or Reference Sheet must **not** be created merely because CWC has one.

The minimum sufficient structure is preferred.

## 8. Research and Claim Grounding

Research/source-grounding implementation is a downstream concern, not an Architecture concern.

**KDS Research Source List (CANONICAL)** owns source taxonomy, evidence quality rules, claim-to-source mapping, limitations, and related research controls. **KDS Production SOP (CANONICAL)** owns when and how that authority is invoked during production.

This Architecture owns only the boundary: downstream production rules must not redefine research authority inside unrelated format or asset documents.

## 9. Quality Assurance

Quality-assurance implementation is a downstream concern.

**KDS QA Document (CANONICAL)** owns project-level acceptance/rejection criteria and QA routing. Format-specific specifications may add format-local checks but must not create a competing project-level QA authority.

This Architecture defines ownership separation only; it does not define the QA checklist.

## 10. Downstream Document Map

### 10.1 Initial Minimum Set

The initial KDS architecture uses the smallest practical document set:

1. **KDS Satu Hati Sulawesi Utara — Project Architecture** — project identity, scope, authority, and document ownership.
2. **KDS Satu Hati Sulawesi Utara — Production SOP** — operational production lifecycle.
3. **KDS Satu Hati Sulawesi Utara — Research Source List** — source grounding and evidence coverage.
4. **KDS Satu Hati Sulawesi Utara — QA Document** — quality gates and acceptance criteria.
5. **KDS Satu Hati Sulawesi Utara — Asset Registry** — reusable asset identity and provenance.

### 10.2 Need-Driven Expansion State

The following were not part of the initial minimum set and require demonstrated KDS need before creation.

**Demonstrated / created:**

* **KDS Reflection Carousel Format Specification** — CANONICAL; first active governed format, justified by recurring three-slide production rules.
* **KDS Psychology Series Production Bible** — CANONICAL; series production/editorial authority.
* **KDS Psychology Series Layout Bible** — CANONICAL; demonstrated need established by repeated Psychology Series layout/storytelling requirements and production-determinism audit.
* **KDS Psychology Series Reference Sheet** — CANONICAL; evidence/reference authority for the approved visual implementation set, without independent normative production authority.

**Still deferred unless separately justified:**

* Asset System;
* Asset Bible;
* Content Register;
* Typography System;
* additional format-specific specifications;
* reusable template systems;
* publication automation/executor.

Their existence in CWC or SDOH remains insufficient justification for KDS to adopt them.

### 10.3 Active Recursive Sub-project — Psychology Series

**Psychology Series** is an active **recursive Tier-2 Project** functioning as a sub-project of **KDS Satu Hati Sulawesi Utara**, consistent with Content OS Root Level Architecture §9.2. It is not a new structural tier.

**Parent authority retained by KDS:**

* KDS Project Architecture;
* KDS Production SOP;
* KDS Research Source List;
* KDS QA Document;
* KDS Asset Registry;
* applicable Root/System authorities.

**Sub-project-owned specialization:**

* Psychology Series Production Bible — `DIUA-DIC-000038`;
* Psychology Series Layout Bible — `DIUA-DIC-000039`;
* Psychology Series Reference Sheet — `DIUA-DIC-000040`.

The sub-project must reference inherited KDS authorities rather than copy or redefine them. Psychology Series may add future sub-project-local governed documents only when demonstrated production need satisfies §11.

The Linear project container is **Psychology Series**. Linear's available project schema does not expose a native parent-project field, so the parent/sub-project relationship is represented canonically by this Architecture and reciprocally in the two Linear project descriptions.

## 11. Change and Expansion Rule

KDS follows a need-driven expansion model:

> Production evidence first; abstraction second.

A new subsystem or governed document should be introduced only when at least one of the following is true:

* repeated production decisions are causing inconsistency;
* the same rule is being duplicated across multiple artefacts or formats;
* traceability is insufficient;
* QA cannot reliably determine conformance;
* reusable assets require stable identity/provenance;
* a recurring workflow needs deterministic execution;
* an external dependency requires explicit ownership.

One-off production preferences should remain local until reuse is demonstrated.

## 12. Privacy and Sensitive Information Boundary

The KDS Content OS project is a communication-production system, not a case-record or member-record repository.

Personally identifiable or confidential information about individuals must not be stored in production artefacts, source lists, QA records, or content registers unless a separate approved data-governance design explicitly authorizes and protects that information.

Public communication must use only information appropriate for publication.

## 13. Lifecycle Status

**Current phase:** Foundation established; minimum document set is operational; Reflection Carousel is an active governed format and Psychology Series is an active recursive Tier-2 sub-project.

**Current document state:** CANONICAL v1.10 (originally approved as v1.0 on 2026-09-23; see Change Records in §18–§27 for subsequent amendments).

Canonicalization followed the KDS Tier 2 Governance Adoption in §0.

The pre-canonical v0.2 audit remediation corrected the Tier 2 registration declaration, established a valid project-level governance basis for the Owner field, made dependency versions explicit, and removed Research/QA implementation leakage from this Architecture.

**Canonicalization record — 2026-09-23:** final critical review found no architectural blocker. Two stale editorial references to v0.1 were corrected. The Owner approved promotion to v1.0 CANONICAL through continuation of the requested workflow.

## 14. Open Decisions

The following remain intentionally unresolved as of this document's current version:

* canonical audience definition;
* active publication channels;
* additional active production formats beyond the canonical KDS Reflection Carousel;
* project-level editorial positioning;
* project-level visual identity rules beyond the existence of reusable assets;
* whether KDS requires a Content Register;
* whether future complexity warrants an Asset Bible or other subsystem beyond the now-canonical Psychology Series Production Bible, Layout Bible, and Reference Sheet.

These must be resolved from actual KDS requirements, not copied from another project.

## 15. Structural Reference Note

[BUS-24](../sdoh/DIUA-DIC-000007_SDOH-Project-Architecture.md) / SDOH Project Architecture is the primary structural reference because it demonstrates a compact project-level architecture with clear downstream ownership.

CWC is a secondary reference for mature subsystems only. Its current complexity is not the KDS starting architecture.

---

**Draft principle:** Keep KDS small until production evidence justifies expansion.

## 16. Audit Record — 2026-09-23

**Audit disposition:** CONDITIONAL PASS — v0.2 is structurally remediated and ready for Owner review; it remains DRAFT.

### Remediated findings

* **A1 — Tier 2 registration declaration:** corrected Structural Classification to the Root Documentation Structure §8 registration pattern.
* **A2 — Owner-governance gap:** added §0 Governance Adoption so the \[OPERATIONAL DEFAULT\] creator rule has a valid Tier 2 governance basis.
* **A3 — dependency precision:** replaced generic current-canonical references with explicit current dependency versions and allocation evidence.
* **A4 — architecture leakage:** removed detailed Research/QA implementation criteria and retained only authority/ownership boundaries.
* **A5 — duplicate canonicalization gate:** removed the project-specific approval checklist and routed canonicalization through the adopted governance model.

### Remaining open decisions

The unresolved items in §14 are intentionally deferred and do not prevent architecture review because v0.2 does not silently decide them.

### Canonicalization status

**Not canonicalized by this audit.** Final critical review and explicit Owner approval remain required.

## 17. Final Critical Review & Approval — 2026-09-23

**Disposition:** PASS

### Review scope

The final review checked:

* Root/Project tier conformance;
* ownership and governance basis;
* explicit dependency versions;
* DIUA-DIC registration validity;
* single-responsibility and authority boundaries;
* speculative-abstraction risk;
* downstream ownership separation;
* unresolved decisions for accidental implicit assumptions;
* stale internal version references.

### Final findings

* No blocking architectural conflict remains.
* DIUA-DIC-000032 is valid and active.
* Dependency versions remain current at review time: Root Level Architecture v1.11, Root Governance v1.11, Root Documentation Structure v2.5, System Architecture v1.13, Universal Identifier Registration Record v1.26.
* Open decisions in §14 are intentionally deferred and do not weaken the established project boundary.
* No CWC or SDOH subsystem was copied without demonstrated KDS need.
* Two stale references to v0.1 were corrected editorially before approval.

### Approval

**Owner decision:** APPROVED.

**Canonical state:** **KDS Satu Hati Sulawesi Utara — Project Architecture v1.0 CANONICAL**

**Effective date:** 2026-09-23

Future architectural changes must follow §0 governance and increment the document version.

---

## 18. Change Record — v1.1 — 2026-09-25

**Change type:** Editorial / corrective. No change to project scope, authority boundaries, or downstream document ownership.

**Changes:**

* §17 — corrected a mislabeled dependency-version reference: "Universal Identifier Registry v1.26" was factually the Universal Identifier **Registration Record** at v1.26 (a separate System-level document). The Registry itself remained v1.34 throughout, consistent with this document's own header. Verified against Content OS — Universal Identifier Registry (v1.34, CANONICAL) and Content OS — Universal Identifier Registration Record (v1.28, CANONICAL).
* §0 — added a review-independence disclosure: Review and Approve/Reject steps in the KDS Tier 2 workflow are currently executed by the same individual holding the Owner/creator role, pending assignment of a second reviewer.

**Basis:** documentation audit conducted 2026-09-24/25; corrections directed by Owner instruction ("perbaiki terkontrol", 2026-09-25).

**Version:** 1.0 → 1.1.

**Approval:** Owner-directed correction. No architectural blocker identified; scope, authority, and downstream ownership unchanged.

---

## 19. Change Record — v1.2 — 2026-09-25

**Change type:** Editorial / corrective. No change to architectural scope, authority, or boundaries.

**Changes:**

* §9 — corrected a stale inline citation: "KDS QA Document v1.0 CANONICAL" updated to "KDS QA Document v1.2 CANONICAL", reflecting that document's own amendments (2026-09-25).
* §13 — updated the Lifecycle Status self-reference, which had stayed at "CANONICAL v1.0" after the v1.1 amendment.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("bereskan semua", 2026-09-25).

**Version:** 1.1 → 1.2.

**Approval:** Owner-directed correction. No architectural blocker identified.

---

## 20. Change Record — v1.3 — 2026-09-25

**Change type:** Editorial / corrective. No change to architectural scope, authority, or boundaries.

**Changes:**

* §7 — updated framing: KDS Asset Registry is stated as currently governing project-wide identity assets (in DRAFT form, pending its own canonicalization), rather than something that "may later" be governed through it.
* §8 — removed stale "the future" framing for KDS Research Source List and KDS Production SOP, both now CANONICAL, and added explicit version citations (v1.1 and v1.3) consistent with §9's existing pattern for the QA Document.
* §13 — updated the Lifecycle Status self-reference.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("eksekusi sekarang", 2026-09-25).

**Version:** 1.2 → 1.3.

**Approval:** Owner-directed correction. No architectural blocker identified.

---

## 21. Change Record — v1.4 — 2026-09-25

**Change type:** Editorial / corrective. No change to architectural scope, authority, or boundaries.

**Changes:**

* §8, §9 — switched inline ownership citations (Research Source List, Production SOP, QA Document) from pinned version numbers to a version-agnostic "(CANONICAL)" form. These citations had gone stale twice already (v1.2 and v1.3) purely because a downstream document's own version kept incrementing. Exact version pinning remains in the header "Depends On" field, which is the correct, actively-maintained location for that.
* §13 — updated the Lifecycle Status self-reference.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Ya bereskan juga ini", 2026-09-25), extended to Architecture to resolve the citation this change itself made stale.

**Version:** 1.3 → 1.4.

**Approval:** Owner-directed correction. No architectural blocker identified.

---

## 22. Change Record — v1.5 — 2026-09-25

**Change type:** Editorial / corrective. No change to architectural scope, authority, or boundaries.

**Changes:**

* §14 — removed the stale version-tied framing "unresolved in v0.2", which could mislead a reader into thinking these open decisions were specific to the old pre-canonical draft rather than genuinely still open today.
* §13 — updated the Lifecycle Status self-reference.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Bereskan semuanya", 2026-09-25).

**Version:** 1.4 → 1.5.

**Approval:** Owner-directed correction. No architectural blocker identified.

---

## 23. Change Record — v1.6 — 2026-09-25

**Change type:** Editorial / dependency-state synchronization. No change to architectural scope, authority, or boundaries.

**Changes:**

* §7 — KDS Asset Registry updated from DRAFT/pending framing to **CANONICAL** after successful final critical review and Owner-approved canonicalization.
* Header — Universal Identifier Registry dependency refreshed from v1.34 to v1.35.
* §13 — lifecycle self-reference updated to v1.6.

**Authority effect:** none. Asset Registry ownership was already defined by this Architecture; this amendment only synchronizes the downstream document lifecycle state.

**Approval:** Owner-directed canonicalization transaction.

---

## 24. Change Record — v1.7 — 2026-09-26

**Change type:** Need-driven expansion-state synchronization.

**Basis:**

* KDS Reflection Carousel Format Specification has been canonicalized after demonstrated recurring production need.
* Historical KDS Psychology Series governance was recovered from prior KDS work, including a locked Production Bible, Psychology Editorial Layout, Prompt Architecture, and continuity rules; [BUS-106](https://linear.app/bussiness-content-os/issue/BUS-106/kds-satu-hati-sulawesi-utara-psychology-series-production-bible) now reconstructs that subsystem under current governance.

**Changes:**

* §6 — records Reflection Carousel as the first active governed KDS format while keeping all other formats non-canonical unless separately justified.
* §10.2 — replaces blanket deferred wording with an explicit need-driven expansion state.
* §13 — updates current project phase.
* §14 — narrows open decisions so already-resolved Reflection Carousel and demonstrated Psychology Series Production Bible need are no longer described as wholly unresolved.
* Header — Universal Identifier Registry dependency refreshed to v1.38.

**Boundary preserved:** this amendment does not canonicalize the Psychology Series Production Bible, define a project-wide audience, activate additional channels/formats, or import CWC/SDOH subsystems without KDS evidence.

---

## 25. Change Record — v1.8 — 2026-09-26

**Change type:** Need-driven expansion lifecycle synchronization.

* KDS Psychology Series Production Bible advanced from RECOVERY DRAFT to **CANONICAL** after final critical review PASS and explicit Owner approval.
* §10.2 and §13 now reflect Psychology Series as an active demonstrated-need subsystem.
* Universal Identifier Registry dependency refreshed to v1.39.

No project-wide audience, channel, or additional format was activated by this amendment. Psychology Series production dependencies for evidence and reusable cast remain governed downstream.

---

## 26. Change Record — v1.9 — 2026-09-26

**Change type:** demonstrated-need subsystem lifecycle synchronization.

Changes:

* Psychology Series Layout Bible `DIUA-DIC-000039` is now **v1.0 CANONICAL**;
* Psychology Series Reference Sheet `DIUA-DIC-000040` is now **v1.0 CANONICAL**;
* §10.2 now records both as demonstrated/created authorities rather than deferred architecture possibilities;
* §14 no longer lists Reference Sheet need as unresolved;
* Universal Identifier Registry dependency refreshed to **v1.43 CANONICAL**.

Boundary preserved:

* no Content Register was activated;
* no Asset Bible, Typography System, automation executor, or additional format subsystem was created;
* the Reference Sheet remains evidence/reference authority only and does not compete with the Layout Bible or Production Bible.

**Version:** 1.8 → 1.9.

---

## 27. Change Record — v1.10 — 2026-09-26

**Change type:** project-boundary / recursive-project structural change.

Owner direction: convert the existing Psychology Series governed subsystem into a sub-project named **Psychology Series**.

Implementation:

* created Linear Project **Psychology Series**;
* recorded parent project **KDS Satu Hati Sulawesi Utara**;
* classified the relationship as **Tier 2 recursive Project / sub-project**, not a new tier;
* moved [BUS-106](https://linear.app/bussiness-content-os/issue/BUS-106/kds-satu-hati-sulawesi-utara-psychology-series-production-bible), [BUS-107](https://linear.app/bussiness-content-os/issue/BUS-107/kds-psychology-series-layout-bible), and [BUS-108](https://linear.app/bussiness-content-os/issue/BUS-108/kds-psychology-series-reference-sheet) to the Psychology Series project without duplicating their canonical documents or identifiers;
* retained KDS ownership of Project Architecture, Production SOP, Research Source List, QA, and Asset Registry;
* retained Psychology Series ownership of Production Bible, Layout Bible, and Reference Sheet specialization.

No Content Register, Asset Bible, Typography System, publication executor, or other speculative subsystem was created.

**Version:** 1.9 → 1.10.