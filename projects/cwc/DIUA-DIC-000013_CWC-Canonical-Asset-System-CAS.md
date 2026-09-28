---
document_name: "CWC — Canonical Asset System (CAS)"
document_class: "Domain Architecture Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner, per <issue id=\"e3ced467-5781-47a0-870c-3ccbc1959152\" href=\"https://linear.app/bussiness-content-os/issue/BUS-18/coz-we-care-production-bible\">BUS-18</issue> (Root Documentation Structure §5.1)."
related_issue: "BUS-19"
universal_identifier: "DIUA-DIC-000013"
version: "1.17"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/cwc-asset-system-cas-v117-canonical-ec3bfafe31a7"
representation_profile: "DIUA-DIC-000026@1.3"
---
# CWC — Canonical Asset System (CAS)

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | CWC — Canonical Asset System (CAS) |
| Document Class | Domain Architecture Document |
| System | Content OS → Coz We Care (CWC) |
| Version | 1.17 |
| Status | **CANONICAL** — v1.17: Owner-approved promotion of the v1.16 Production Behavior Model revision. The Owner's 2026-09-16 directive to repair Blocking 1 by making the Production Behavior Model canonical constitutes the approval decision under the CAS lifecycle. No asset identity, canonical binary, lifecycle state, or CRS file mapping changed. Prior state: v1.16 REVISION CANDIDATE — controlled architectural revision materialized the Asset Production Behavior Model identified by the 2026-09-14 production-fidelity audit, defining `EXACT_REUSE`, `GENERATIVE_REFERENCE`, and `TOKEN_CONTROLLED` plus their authority boundary. Prior state: v1.15 CANONICAL — amended to v1.15: added an explicit §6 lifecycle-authority boundary: CAS owns the lifecycle model and transition semantics, while CAR/CAB/CRS own current lifecycle state within their respective authority domains; CAS does not duplicate or override subordinate current-state declarations except through an explicit Owner-approved lifecycle-model change. This closes the [BUS-19](https://linear.app/bussiness-content-os/issue/BUS-19/cwc-asset-system-cas) audit ambiguity without changing lifecycle states or downstream asset status. Prior state: v1.14, CANONICAL — amended to v1.14: synchronized `Depends On` from Root Documentation Structure v2.4→v2.5 after adoption of §3 Representation Portability; result CONFORMANT. Canonical lifecycle, authority boundaries, and KOS-ST-001 disposition are unchanged. Prior state: v1.13, CANONICAL — re-verified against Root Documentation Structure v2.4 after adoption of §10.1 Registered Document Boundary; result CONFORMANT. CAS remains a current Tier 2 governed document; canonical lifecycle, authority boundaries, and KOS-ST-001 disposition are unchanged. Current `Depends On` updated v2.3→v2.4 only. Prior state: v1.12, CANONICAL — amended to v1.12: resolved §5 Open Question 2 (KOS-ST-001 relationship) by Owner decision after applying Root Level Architecture §8.5/§8.6 and the recorded [BUS-29](https://linear.app/bussiness-content-os/issue/BUS-29/cross-document-conformance-obligation-governance-review-finding-from) governance review. KOS-ST-001 has no applicable normative relationship to CAS or Content OS: it is not an adopted External Governing Standard, declared dependency, or structurally inherited authority. Co-delivery/provenance does not establish adoption. This amendment closes the open question without introducing a new relationship or changing CAS's architectural scope. Prior state: v1.11, CANONICAL — amended to v1.11: synced `Depends On` (Root Level Architecture v1.10→v1.11, Root Documentation Structure v2.2→v2.3), stale due to those documents being amended since this document's last sync. Found via full workspace stale-Depends-On sweep (following adversarial governance review of [BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop), SDOH Production SOP). Compliance update, no substantive content changed. Prior state: v1.10, CANONICAL — amended to v1.10: re-tagged `Owner` field from an untagged cross-reference to `[FORMAL]`, per Root Documentation Structure §5.1's mandatory three-state tag convention — found via independent cross-document audit ([BUS-20](https://linear.app/bussiness-content-os/issue/BUS-20/cwc-asset-registry-car) audit, 2026-09-06). Compliance/metadata correction; no change to who is accountable. Prior state: v1.9, CANONICAL — approved by the Owner (Billy Fernando Mende), 2026-09-06, per Root Governance §6 step 4 (Approve) and CAS's own Canonical Lifecycle (§6: REVISION CANDIDATE → CANONICAL, "Owner-approved current authoritative state"). Explicit approval given in-conversation following promotion to REVISION CANDIDATE (v1.8). §5 Open Question 2 (KOS-ST-001 relationship) remains explicitly OPEN — CANONICAL status here reflects the Owner's approval of CAS's own architectural content (Purpose, Known Issues, Content Summary, Exclusions, Canonical Lifecycle), consistent with precedent elsewhere in this workspace (e.g. Production Bible, [BUS-18](https://linear.app/bussiness-content-os/issue/BUS-18/cwc-production-bible), is CANONICAL with one Open Question still outstanding). Amended to v1.9: status promotion only, no content change. Prior state: v1.8, REVISION CANDIDATE per CAS's own Canonical Lifecycle (§6): the Owner has reviewed the document's architectural content (Purpose, Known Issues, Content Summary, Exclusions, Canonical Lifecycle) via critical review (v1.6–v1.7) and considers it complete and ready for sign-off, per §6's definition of REVISION CANDIDATE ("proposed for canonical status; under review... once its author considers it complete and ready for Owner sign-off"). §5 Open Question 2 (KOS-ST-001 relationship) remains explicitly OPEN by Owner decision — promotion to REVISION CANDIDATE does not require it to be closed; CANONICAL promotion still requires the Owner's explicit Approve (Root Governance §6, step 4) as a separate, subsequent step. Amended to v1.8: status promotion only, no content change. Prior state: v1.7, DRAFT substantive critical review findings applied — (1) added a currency note to §6's Canonical Lifecycle table flagging that the CANONICAL LOCKED evidentiary example (CRS Brand Presenter, cited 2026-09-03) is superseded by the ecosystem's current live state (Official Brand Color Asset now holds CANONICAL LOCKED, per [BUS-20](https://linear.app/bussiness-content-os/issue/BUS-20/cwc-asset-registry-car)/21), without changing the lifecycle model itself; (2) disambiguated §3's inline section references (§4, §5, §6–8) as referring to CWC-CAS-001's own internal numbering, not this document's sections. Content clarification following substantive critical review; no change to the lifecycle states, transitions, or architectural model definitions themselves. Prior state: v1.6, DRAFT appended evidentiary findings from a source audit of KOS-ST-001 itself to §5 Open Question 2, for reference — the question remains OPEN and undecided; findings are recorded as evidence only, not as a resolution. Editorial addition, no substantive scope change. Prior state: v1.5, DRAFT reframed §5 Open Question 2 (KOS-ST-001 relationship) for precision, per Owner instruction — now asks explicitly whether KOS-ST-001 holds normative authority, informative/reference status only, or no applicable relationship to CAS, and constrains that adoption must not be inferred from document provenance or upload context. Question remains OPEN; no relationship decided. Editorial clarification, no substantive scope change. Prior state: v1.4, DRAFT normalized document naming to the CWC abbreviation convention (H1 heading, Document Name field, footer — matching the pattern established by [BUS-18](https://linear.app/bussiness-content-os/issue/BUS-18/cwc-production-bible)'s own document title) per audit finding; pinned the version reference for the Universal Identifier citation ([BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) §4 → v1.10); corrected section ordering so §6 Canonical Lifecycle follows §5 Open Questions in sequence (previously misplaced between §3 and §4, an artifact of the v1.1 insertion). Compliance update, no substantive content changed. Prior state: v1.3, DRAFT — synced `Depends On` (Root Level Architecture v1.9→v1.10, Root Documentation Structure v2.0→v2.2), stale due to those documents being amended in this audit session (Issue #16 follow-on, system-wide stale-Depends-On sweep). Compliance update, no substantive content changed. Prior state: v1.2, DRAFT allocated `DIUA-DIC-000013` (Universal Identifier Registry v1.7 §4), per Registry §7 OQ1's resolution that identifiers are now mandatory for all Content OS documents. Prior state: v1.1, DRAFT: resolved the Canonical Lifecycle gap (§6). |
| Related Issue | [BUS-19](https://linear.app/bussiness-content-os/issue/BUS-19/coz-we-care-canonical-asset-system-cas) — Coz We Care — Canonical Asset System (CAS) |
| Owner | **\[FORMAL\]** Billy Fernando Mende — CWC domain Owner, per [BUS-18](https://linear.app/bussiness-content-os/issue/BUS-18/coz-we-care-production-bible) (Root Documentation Structure §5.1). |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — Coz We Care |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000013` — ALLOCATED, per Content OS's own registry ([BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) §4) |
| Depends On | Content OS — Root Level Architecture (v1.11, CANONICAL — [BUS-10](../../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md) §7, §9.2) and Root Documentation Structure (v2.5, CANONICAL — [BUS-12](../../root/DIUA-DIC-000003_Content-OS-Root-Documentation-Structure.md) §3, §10.1). CWC domain already registered at [BUS-18](https://linear.app/bussiness-content-os/issue/BUS-18/coz-we-care-production-bible) §1; this document does not re-register the domain. |

---

## 1. Purpose

Registers, as a Content OS Tier 2 artifact, the **Canonical Asset System (CWC-CAS)** — the architectural foundation governing how CWC's brand/visual assets (logos, presenters, and similar) are identified, specified, and visually represented. CAS establishes three subordinate artifacts, each owning a distinct concern:

* **CWC-CAR** (Canonical Asset Registry) — identity: *who/what is the object?* → [BUS-20](<https://linear.app/bussiness-content-os/issue/BUS-20/coz-we-care-canonical-asset-registry-car>)
* **CWC-CAB** (Canonical Asset Bible) — specification: *what is its canonical spec?* → [BUS-21](<https://linear.app/bussiness-content-os/issue/BUS-21/coz-we-care-canonical-asset-bible-cab>)
* **CWC-CRS** (Canonical Reference Sheet) — visual representation: *what does it look like, authoritatively?* → [BUS-22](<https://linear.app/bussiness-content-os/issue/BUS-22/coz-we-care-canonical-reference-sheet-crs>)

This is a **separate concern from the Production Bible** ([BUS-18](<https://linear.app/bussiness-content-os/issue/BUS-18/coz-we-care-production-bible>)): the Bible governs communication/production philosophy; CAS governs brand/visual **asset** identity, specification, and reference — both are Tier 2 CWC documents, neither supersedes the other.

---

## 2. Known Issues — Findings and Their Resolution

**\[FACT\]** CAS is honestly self-labeled `Version 1.0 (Working Draft)` — not locked/canonical. This document does not inflate that status.

**\[FACT — genuine content gap, not fabricated here\]** CAS §5 establishes five architectural models (Dependency, Pairing, Inheritance, Traceability, Synchronization) and, throughout its own text and its downstream artifacts (CAR, CAB), repeatedly refers to a **"Canonical Lifecycle"** as an authority owned by CAS (e.g., "CWC-CAB shall follow the Canonical Lifecycle established by the CWC-CAS"). **CAS itself, read in full, never actually defines what the Canonical Lifecycle consists of** — no lifecycle states, no transitions, no governance mechanics are specified anywhere in the source. This is a genuine gap in the source material, not something this registration document invents or fills in. Downstream claims that rely on "the Canonical Lifecycle" (in CAR/CAB) are therefore referencing an authority whose content does not yet exist.

**\[DECISION\]** This gap is now resolved (§6) rather than left silent — defined from evidence actually observed across the CWC-CAS ecosystem's own artifacts, not invented from nothing.

---

## 3. Content Summary

*(Section references below — §4, §5, §6–8 — refer to CWC-CAS-001's own internal numbering in the source material, not to this registration document's own sections.)*

* **Design Philosophy**: Canonical by Design, Single Source of Truth, One Concept One Home, Separation of Responsibility (CAR=identity, CAB=specification, CRS=visual), AI-First Knowledge Architecture.
* **Core Architectural Models** (§4): Object Architecture, Asset Architecture, Knowledge Architecture, Reference Architecture — each with Definition/Purpose/Responsibilities/Exclusions, mutually exclusive.
* **Canonical Relationships** (§5): Dependency Model, Pairing Model, Inheritance Model, Traceability Model, Synchronization Model — architectural *principles* for these relationships; specific implementations belong to CAR/CAB/CRS, not CAS.
* **Asset Production Behavior Model** (§7): defines the production-execution semantics `EXACT_REUSE`, `GENERATIVE_REFERENCE`, and `TOKEN_CONTROLLED`; CAB assigns one primary mode per production-use asset, CRS maps the authoritative files/references, and CAR remains identity-only.
* **CAR/CAB/CRS summaries** (§6–8): purpose, responsibilities, ownership boundaries, and architectural relationships for each, consistent with the separation-of-responsibility principle throughout.

---

## 4. Exclusions

* Individual Canonical Assets, their specifications, or visual representations — owned by CAR/CAB/CRS respectively, not CAS.
* Content OS's own tiers, document classes, or ownership model — owned by Root Level Architecture ([BUS-10](../../root/DIUA-DIC-000001_Content-OS-Root-Level-Architecture.md)).
* Definition of the Canonical Lifecycle — **RESOLVED, see §6.**

---

## 5. Open Questions / Unresolved Decisions

1. ~~Canonical Lifecycle definition (§2)~~ **RESOLVED 2026-09-03 — see §6.** Defined from evidence already present in CAS/CAR/CRS's own artifacts (DRAFT / REVISION CANDIDATE / CANONICAL / CANONICAL LOCKED / SUPERSEDED), not invented from nothing.
2. ~~**Relationship to KOS-ST-001**~~ **RESOLVED 2026-09-13 — option (c): no applicable normative relationship.**

   **\[DECISION\]** KOS-ST-001 does **not** hold normative authority over CAS or Content OS. It is not an adopted External Governing Standard under Root Level Architecture §8.5, is not declared in CAS's `Depends On`, and is not a structurally inherited authority. No adoption act exists naming KOS-ST-001's identity/version, bounded aspect(s), and reconciliation status. Under Root Level Architecture §8.6 and Principle 8, co-delivery, shared provenance, upload proximity, or prior working-session context cannot establish a conformance obligation.

   **\[EVIDENCE\]** The 2026-09-06 source audit found that KOS-ST-001 scopes its explicit authority claims to the "Knowledge Operating System (KOS)" and does not name Content OS; no evidence establishes Content OS as KOS or as governed by KOS. Treating KOS-ST-001 as normative would also conflict with the current canonical Content OS corpus, including its vocabulary and identifier grammar. These findings support non-adoption rather than creating a relationship.

   **\[CONSTRAINT\]** This resolution does not prohibit future explicit adoption of KOS-ST-001 or a bounded portion of it. Any future adoption would be a new governance decision and must satisfy Root Level Architecture §8.5, including an explicit adoption act and scoped reconciliation. Until then, KOS-ST-001 creates no cross-document conformance obligation for CAS.

---

## 6. Canonical Lifecycle (Owner-authored, 2026-09-03)

**\[DECISION — resolves §2, §5 OQ1\]** CAS's Canonical Lifecycle — referenced by CAS itself and by CAR/CAB but never previously defined — is defined here, in CAS, per One Concept, One Home (CAS §3, Design Philosophy). It is built entirely from terminology **already observed in use** across the CWC-CAS ecosystem's own artifacts, not invented:

| State | Evidence it's a real, used state |
| -- | -- |
| **DRAFT** | CAS's own status: "Version 1.0 (Working Draft)" |
| **REVISION CANDIDATE** | CAR's own Document Identity: "Status: Revision Candidate" |
| **CANONICAL** | CRS sheets' own header field: "STATUS: CANONICAL" (e.g., Official Brand Logo sheets) |
| **CANONICAL LOCKED** | CRS Brand Presenter sheets' own header field: "STATUS: CANONICAL LOCKED" — a stricter, distinct state from plain CANONICAL |
| **SUPERSEDED** | CAR's "Canonical Project Source" pattern (a new version supersedes the prior published one); consistent with the general Registration/Allocation Act pattern seen in reference registry material (`supersedes` relation) |

**\[DEFINITION\] Transitions:**

```text
DRAFT → REVISION CANDIDATE → CANONICAL → CANONICAL LOCKED
  │              │                 │               │
  └───────────────┴───────────────┴───────────────┴──→ SUPERSEDED
```

* **DRAFT** — initial authoring; no formal review yet. Freely editable by the Owner.
* **REVISION CANDIDATE** — proposed for canonical status; under review. A document/asset moves here once its author considers it complete and ready for Owner sign-off.
* **CANONICAL** — Owner-approved current authoritative state. May still receive minor, non-structural revision at the Owner's discretion.
* **CANONICAL LOCKED** — CANONICAL **and** explicitly frozen: no further revision without an explicit unlock decision by the Owner. Reserved for assets where accidental drift would be especially costly (the observed case, CRS Brand Presenter, is a photorealistic identity reference — exactly this kind of asset).
* **SUPERSEDED** — reachable from any state, whenever a newer revision formally replaces the current one. A superseded artifact is retained for provenance, not deleted (consistent with Content OS's own Root Governance G3-style discipline).

**\[CONSTRAINT\]** Promotion between states (especially to CANONICAL or CANONICAL LOCKED) is an Owner decision, following the same evidentiary discipline already practiced throughout this ecosystem — not automatic on a timer or a checklist alone.

**\[CONSTRAINT\]** This lifecycle governs CAS, CAR, CAB, and CRS artifacts specifically (the CWC-CAS ecosystem). It does not redefine or replace Content OS's own Draft/CANONICAL vocabulary (Root Governance §4.1, adopted at System tier by System Governance §4.1) — the two are parallel, domain-scoped vocabularies, consistent with Root Documentation Structure §11 OQ2's precedent of letting each tier/domain decide independently.

**\[AUTHORITY BOUNDARY\]** CAS owns the Canonical Lifecycle model and its transition semantics for the CWC-CAS ecosystem. Each subordinate artifact (CAR, CAB, CRS) owns the current lifecycle state of the records/assets within its own authority domain. CAS SHALL NOT duplicate or override those current-state declarations except by changing the lifecycle model itself through an explicit Owner-approved architectural decision.

**\[NOTE — evidentiary currency check, added 2026-09-06\]** The CANONICAL LOCKED example cited in the table above (CRS Brand Presenter, photorealistic identity reference) reflected the CWC-CAS ecosystem's observed state on 2026-09-03. The ecosystem has since evolved: as of 2026-09-06, the asset currently holding CANONICAL LOCKED status is the **Official Brand Color Asset** (`CWC-OBJ-000003` / `CWC-CAB-AS-003`, per [BUS-20](https://linear.app/bussiness-content-os/issue/BUS-20/cwc-asset-registry-car) CAR and [BUS-21](https://linear.app/bussiness-content-os/issue/BUS-21/cwc-asset-bible-cab) CAB), not the Brand Presenter — whose rendering direction is now documented as CWC Stylized 3D Character Rendering rather than photorealistic. This does not change the Canonical Lifecycle model itself (CANONICAL LOCKED remains a real, evidenced state in current use); only the specific illustrative example above is superseded. See [BUS-20](https://linear.app/bussiness-content-os/issue/BUS-20/cwc-asset-registry-car)/[BUS-21](https://linear.app/bussiness-content-os/issue/BUS-21/cwc-asset-bible-cab) for current authoritative asset status.

## 7. Asset Production Behavior Model (Owner-directed, 2026-09-16)

**\[DECISION\]** CAS defines the production-execution semantics for canonical CWC assets. This model resolves the production-fidelity architectural gap identified on 2026-09-14: exact reusable assets, generative identity references, and canonical design tokens require different execution behavior and must not be treated as interchangeable production inputs.

### 7.1 Primary Production Behavior Modes

Each canonical asset that is eligible to enter production MUST have exactly one **primary Production Behavior Mode** assigned by CAB. The three primary modes are mutually exclusive at the asset-assignment level.

| Mode | Definition | Permitted production behavior | Prohibited behavior |
| -- | -- | -- | -- |
| `EXACT_REUSE` | The approved canonical binary, vector geometry, or approved deterministic derivative is the production artifact. | Retrieve the authoritative production file; select only an explicitly approved variant; apply only CAB-compliant scaling and positioning; composite/place deterministically. | Generative synthesis, redraw, reconstruction, approximation, unauthorized recoloring, internal-geometry modification, typography/icon alteration, or visually-similar substitution. |
| `GENERATIVE_REFERENCE` | Canonical references constrain controlled generation; the reference itself is an identity/appearance authority, not automatically the final production artwork. | Generate a production derivative from the CAB-approved reference hierarchy; vary only properties explicitly permitted by CAB; validate against CAB identity-preservation and QA rules. | Treating resemblance as canonicality; silently converting generated details into canonical facts; replacing the approved reference hierarchy; bypassing CAB drift/rejection criteria. |
| `TOKEN_CONTROLLED` | Canonical scalar/design-token values are applied deterministically; a reference image documents or validates the tokens but is not the production bitmap. | Apply the exact canonical token values and CAB-defined semantic roles. | Sampling approximate values from a reference image; substituting near colors; treating tints, shades, gradients, or other derived treatments as canonical unless CAB explicitly authorizes them. |

### 7.2 Execution Failure / Fallback Rule

For `EXACT_REUSE`, if the authoritative production file cannot be retrieved or deterministically placed, production MUST use the applicable reserved-area/manual-placement or blocked-production path rather than fabricate a replacement.

For `GENERATIVE_REFERENCE`, if the approved reference hierarchy is unavailable or the generated derivative fails CAB QA, the output MUST be rejected/regenerated or production blocked; it must not be accepted by visual similarity alone.

For `TOKEN_CONTROLLED`, if an exact token value or its permitted semantic use is unavailable/ambiguous, production MUST stop and obtain a CAB decision rather than infer a value from pixels or surrounding artwork.

### 7.3 Assignment and Authority Boundary

One Concept, One Home applies:

* **CAS** defines the Production Behavior Model and mode semantics.
* **CAB** assigns the primary Production Behavior Mode to each production-use asset and owns all asset-specific constraints, permitted variations, and QA rules.
* **CRS** maps the authoritative production files, generation references, and visual-reference artifacts used by the CAB assignment.
* **CAR** owns asset identity and registration only; it does not assign production behavior.

CAS MUST NOT duplicate the current per-asset assignment table. Current assignments belong to CAB and may change only through a governed CAB revision consistent with any applicable asset lock.

### 7.4 No-Inference Rule

Production systems MUST NOT infer a Production Behavior Mode from file format, appearance, prior production practice, or model capability. If CAB has not assigned a primary mode, that asset is not eligible for automated production execution until CAB records a governed assignment.

### 7.5 Relationship to Canonical Lifecycle

Production Behavior Mode and Canonical Lifecycle are orthogonal. Lifecycle answers **whether an asset/state is authoritative**; Production Behavior Mode answers **how an authoritative asset is allowed to enter production**. A lifecycle promotion does not change Production Behavior Mode automatically, and a Production Behavior Mode assignment does not create a new asset identity or lifecycle state.

---

---

*End of Document — CWC Canonical Asset System (CAS) v1.17 (CANONICAL)*

---

## Compliance Correction — Identifier-Pointer Precision (2026-09-19)

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** Recorded under the CWC amendment discipline (`[Root Level Architecture v1.11 §11, R7]`; `[Root Governance v1.11 §5, §6 CONSTRAINT]`).

The `Universal Identifier` field pinned the Universal Identifier Registry at v1.10, long superseded (current: v1.25). The pin is removed rather than re-pinned: `DIUA-DIC-000013` is established by its allocation act recorded in the Universal Identifier Registration Record, not by a registry revision number, so an unversioned pointer is accurate and immune to the recurring staleness this pin caused.

No asset identity, Canonical Lifecycle state or transition semantics, Production Behavior Mode definition, authority boundary, exclusion, or Open Question changed. CAS remains **v1.17 CANONICAL**, and the CAS/CAR/CAB/CRS lifecycle and Production Behavior assignments are untouched.