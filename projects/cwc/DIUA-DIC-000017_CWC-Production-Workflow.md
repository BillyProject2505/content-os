---
document_name: "CWC Production Workflow"
document_class: "Domain/Project Production Lifecycle Specification"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner"
related_issue: "BUS-61"
universal_identifier: "DIUA-DIC-000017"
version: "1.22"
status: "CANONICAL LOCKED"
depends_on:
  - id: "DIUA-DIC-000001"
    name: "Content OS — Root Level Architecture"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: "DIUA-DIC-000002"
    name: "Content OS — Root Governance"
    version: "1.11"
    status: "CANONICAL"
  - id: "DIUA-DIC-000012"
    name: "Coz We Care — Production Bible"
    version: "2.22"
    status: "CANONICAL"
  - id: "DIUA-DIC-000013"
    name: "CWC — Canonical Asset System (CAS)"
    version: "1.17"
    status: "CANONICAL"
  - id: "DIUA-DIC-000014"
    name: "Coz We Care — Canonical Asset Registry (CAR)"
    version: "1.18"
    status: "CANONICAL"
  - id: "DIUA-DIC-000015"
    name: "Coz We Care — Canonical Asset Bible (CAB)"
    version: "1.36"
    status: "CANONICAL"
  - id: "DIUA-DIC-000016"
    name: "Coz We Care — Reference Sheet (CRS)"
    version: "1.23"
    status: "CANONICAL"
  - id: "DIUA-DIC-000004"
    name: "Content OS — Reference Model"
    version: "1.13"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/cwc-production-workflow-v122-canonical-locked-970241872f6a"
representation_profile: "DIUA-DIC-000026@1.3"
---
# CWC Production Workflow

**Document Name:** CWC Production Workflow
**Document Class:** Domain/Project Production Lifecycle Specification
**Structural Classification:** Tiered — Document Tier: Domain/Project (Tier 2) — Coz We Care
**Owner:** **\[FORMAL\]** Billy Fernando Mende — CWC domain Owner
**Related Issue:** [BUS-61](<https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation>) — CWC Production Workflow (tracking issue for this document). Corrected 2026-09-19 by explicit Owner decision: this field previously named [BUS-62](https://linear.app/bussiness-content-os/issue/BUS-62/as-002-contextual-presenter-styling-rule) (AS-002 Contextual Presenter Styling Rule), a CAB-domain revision-trigger issue, not this document's tracking issue. This Linear document is now also parented to [BUS-61](https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation), satisfying Root Documentation Structure §6.1 (reachable via a stable reference from the issue that tracks the work producing it).
**System:** Content OS → Coz We Care (CWC)
**Universal Identifier (UNIS/DIC):** `DIUA-DIC-000017` — ALLOCATED / ACTIVE, per Content OS — Universal Identifier Registry and Universal Identifier Registration Record.
**Version:** 1.22 (CANONICAL LOCKED — [BUS-119](https://linear.app/bussiness-content-os/issue/BUS-119/cwc-production-workflow-publication-readiness-evidence-contract) Publication Readiness Evidence Contract, 2026-09-27). **v1.22 supersedes v1.21 as the current authoritative CANONICAL LOCKED state.** STG‑10 now makes the existing `APPROVED → READY_FOR_PUBLICATION → PUBLISHED` path deterministic by requiring an Approved Release Identity at the internal readiness checkpoint. No Stage, Lifecycle State, Exception Status, Quality Gate, approval authority, Content ID behavior, or tool-specific lifecycle dependency is added.
**Depends On:** Content OS — Root Level Architecture v1.11 CANONICAL; Content OS — Root Documentation Structure v2.5 CANONICAL; Content OS — Root Governance v1.11 CANONICAL; CWC Production Bible v2.22 CANONICAL; CWC Asset System v1.17 CANONICAL; CWC Asset Registry v1.18 CANONICAL; CWC Asset Bible v1.36 CANONICAL; CWC Reference Sheet v1.23 CANONICAL; Content OS — Reference Model v1.13 CANONICAL (RM1–RM4 apply normatively at STG‑03; RM5 restrains creation of a central registry without demonstrated coordination failure). (See §0.1k for the asset-production-behavior model. This Workflow has no `Depends On` relationship to the CWC QA Mechanism \[CWC-QA-001\] or the CWC Format Specialization Specification \[FSS-001\] — both are consumed laterally through existing Required-Input/extension channels.)
**Lateral Operational Reference:** CWC Content Register — **current canonical / active state** (`DIUA-DIC-000027`). The Workflow consumes duplicate-control results, Content ID disposition, and register synchronization laterally as operational inputs/outputs. Because this is a lateral operational relationship rather than an upstream normative dependency, this Workflow intentionally does not pin the Register's revision number here. The Content Register is intentionally **not** added to this Workflow's formal `Depends On` set because the Content Register itself normatively depends on the Workflow for Lifecycle State semantics; adding a reciprocal normative dependency would create a dependency cycle.
**Status:** **CANONICAL LOCKED — current authoritative state as of 2026-09-27.** v1.22 materializes [BUS-119](https://linear.app/bussiness-content-os/issue/BUS-119/cwc-production-workflow-publication-readiness-evidence-contract): the existing STG‑10 internal readiness checkpoint now requires a deterministic Approved Release Identity before `READY_FOR_PUBLICATION`, while `PUBLISHED` still requires platform-confirmed live evidence. This clarification is tool-agnostic and does not create a new lifecycle state, stage, gate, exception status, or approval rule.
**Drafted by:** Claude, acting as Senior Systems Architect / Production Workflow Architect (non-authoritative — see §0.3). Canonicalization is an Owner act, not an act of this document's drafter.
**Revision basis:** Compliance-only re-verification after CPB v2.12→v2.14 canonicalized the global CWC Typography System under [BUS-64](https://linear.app/bussiness-content-os/issue/BUS-64/cwc-typography-system-global-typeface-and-hierarchy-definition). The Workflow consumes CPB typography as upstream production knowledge but does not redefine typeface family, hierarchy, format-specific sizing, or asset-intrinsic typography. Workflow behavior, stages, lifecycle states, Production Behavior assignments, and QA gates remain unchanged.

### 0.1m Typography Dependency Reconciliation — v1.18 (2026-09-17)

**\[COMPLIANCE REVISION — NO WORKFLOW BEHAVIOR CHANGE\]** CPB advanced v2.12→v2.14 under [BUS-64](https://linear.app/bussiness-content-os/issue/BUS-64/cwc-typography-system-global-typeface-and-hierarchy-definition), establishing Montserrat as the global CWC Primary Typeface and defining global weight/role/case/fallback/data principles while assigning exact format sizing/leading/tracking to FSS and preserving asset-intrinsic typography under CAB/CRS. This Workflow re-verified the dependency and remains CONFORMANT. No Stage, Lifecycle State, Exception Status, transition, Gate, Production Behavior Mode, or execution contract changed.

---

### 0.1p CPB v2.16 Layout Dependency Reconciliation — 2026-09-25

**\[DOCUMENTATION / DEPENDENCY MAINTENANCE — NO WORKFLOW VERSION INCREMENT\]** Under [BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule), CPB advanced v2.15→v2.16 to establish the Brand Presenter Primary Layout Rule. The rule is specialized by FSS/FORMAT objects inside the existing STG-07 Visual Production extension path.

Workflow v1.18 was re-verified against CPB v2.16. **Result: CONFORMANT.** No Stage, Lifecycle State, Exception Status, transition, Quality Gate, Production Behavior Mode, approval/publication boundary, or execution contract changed. The document remains **v1.18 CANONICAL LOCKED**.

---

## 0. Document Control

### 0.1 Mandatory Source Retrieval — Evidence Record

All five dependencies were re-verified at the start of **this** revision pass (2026-09-07) via direct Linear lookup — not against Revision 3's cached summary — for version drift before reuse. **Result: unchanged.** Same document ids, same versions (CPB v2.10, CAS v1.11, CAR v1.10, CAB v1.11, CRS v1.5) as both the Revision 2 and Revision 3 retrievals. No new source content exists to incorporate. Revision 4's corrections are therefore, like Revision 3's internal-model corrections, adversarial-review findings against the Workflow's own prior text — not new findings from CPB/CAS/CAR/CAB/CRS. The table below is carried forward unchanged from Revision 3, with this re-verification appended.

| Dependency | Version | Status | Re-verification result | Used for (Revision 3 specific) |
| -- | -- | -- | -- | -- |
| CWC Production Bible (CPB) | v2.10 | CANONICAL | **Unchanged** since Revision 2 (same document id `de1b2ae2-…`, same version, re-checked via Linear `BUS-18` this pass) | Re-read in full to test §12/§16 changes: confirmed CPB Ch.6 §6.1 names "Production Quality" only as an excluded sibling concern, with **no** checklist, criteria, or owning-document reference anywhere in the retrieved text — this is why §18's QA row and §12's "fallback" claim are weakened in Revision 3 (see §0.2). Confirmed CPB never uses the phrase "sensitive claims," never defines a flagging taxonomy, and never states that Core Production Principles CP‑003/004/005 trigger a mandatory additional human gate — this is why §18's sensitive‑claims row is also weakened. |
| CWC Asset System (CAS) | v1.11 | CANONICAL | **Unchanged** | No new use beyond Revision 2 (§16, Asset Lifecycle). |
| CWC Asset Registry (CAR) | v1.10 | CANONICAL | **Unchanged** | No new use beyond Revision 2. |
| CWC Asset Bible (CAB) | v1.11 | CANONICAL | **Unchanged** | No new use beyond Revision 2. |
| CWC Reference Sheet (CRS) | v1.5 | CANONICAL | **Unchanged** | No new use beyond Revision 2 (§17, Visual Production Reserved‑Area pattern). |

No source retrieval failure. No version drift. No new conflict between the five sources was found during this pass. **The corrections in Revision 3 are internal architectural fixes to the Workflow's own state model (Stage/Lifecycle State/Exception Status), not new findings from the canonical sources** — except the two deliberate *weakenings* in §12 and §18 (QA ownership, sensitive‑claims criteria), which are source‑discipline corrections: Revision 2 over‑claimed what CPB supports, and this pass pulls those claims back to what the retrieved text actually says.

### 0.1a Current Dependency Reconciliation — v1.1 (2026-09-13)

**\[COMPLIANCE REVISION — NO ARCHITECTURAL CHANGE\]** Root Level Architecture §8.6 requires re-verification when a cited normative dependency advances. CAS has advanced from v1.11 to v1.12 and CRS from v1.5 to v1.6. Both amendments were re-verified against this Workflow's dependency use: CAS v1.12 only resolves the KOS-ST-001 open question and does not alter the Canonical Asset Lifecycle or asset architecture used by §16; CRS v1.6 only clarifies that CAB owns asset specifications while CRS owns authoritative visual-reference documentation, and does not alter the Reserved-Area/manual canonical-asset placement behavior used by this Workflow. **Result: CONFORMANT.** Current dependency basis is therefore CPB v2.10, CAS v1.12, CAR v1.10, CAB v1.11, and CRS v1.6. The 2026-09-07 retrieval record above remains unchanged as historical evidence of what Revision 4 actually inspected.

### 0.1b Identifier Registration — v1.2 (2026-09-13)

**\[COMPLIANCE REVISION — NO ARCHITECTURAL CHANGE\]** Registered this document as `DIUA-DIC-000017` in Universal Identifier Registration Record v1.13 and Universal Identifier Registry v1.13, closing the identifier-completeness gap under the mandatory-all-documents policy. No workflow stage, lifecycle state, transition, governance rule, QA gate, or production behavior changed.

### 0.1c Metadata + Dependency Conformance — v1.3 (2026-09-13)

**\[COMPLIANCE REVISION — NO ARCHITECTURAL CHANGE\]** The document header was brought into full Root Documentation Structure v2.4 D1 conformance by explicitly declaring Document Name, Document Class, Structural Classification, Owner, Related Issue state, Universal Identifier, and `Depends On`. Root Documentation Structure v2.4 §10.1 and the compliance-only advances of CPB/CAS/CAR/CAB/CRS were re-verified under Root Level Architecture §8.6. **Result: CONFORMANT.** No workflow stage, state, transition, quality gate, authority rule, or production behavior changed.

### 0.1d [BUS-40](https://linear.app/bussiness-content-os/issue/BUS-40/apply-revision-4-audit-p2-citation-precision-corrections-non-blocking) Citation-Precision Closure — v1.4 (2026-09-13)

**\[EDITORIAL / CITATION-PRECISION REVISION — NO ARCHITECTURAL CHANGE\]** Applied the six non-blocking P2 corrections tracked in [BUS-40](https://linear.app/bussiness-content-os/issue/BUS-40/apply-revision-4-audit-p2-citation-precision-corrections-non-blocking): corrected CPB Chapter 1 citations for AIP-002/AIP-003; narrowed the CPB scope-exclusion statement to chapters that explicitly contain the boundary while treating Ch.1/5/6 support as inference; corrected CRS field naming to `Source-of-truth boundary`; separated CRS §7 Reserved Area / Application Workflow grounding from CRS §5 AI / Production Boundary grounding; made Appendix C Test C outcome 2 explicitly declare `Affected Output(s)`; and expanded Test F to cover the previously omitted DEFINITION, RESEARCH, PLANNING, and ASSET PREPARATION pre-publication stages. **Result: CONFORMANT.** No Stage, Lifecycle State, Exception Status, transition, gate, authority boundary, or production behavior changed.

### 0.1e Owner Decision Materialization — v1.5 (2026-09-13)

**\[CONTROLLED OWNER-DECISION REVISION\]** Owner decisions for B‑1/[BUS-35](https://linear.app/bussiness-content-os/issue/BUS-35/owner-decision-required-b-1-research-depth-criteria-by-content-type), B‑2/[BUS-36](https://linear.app/bussiness-content-os/issue/BUS-36/owner-decision-required-b-2-blocked-to-cancelled-escalation-threshold), B‑4/[BUS-37](https://linear.app/bussiness-content-os/issue/BUS-37/owner-decision-required-b-4-campaignseries-level-orchestration), and B‑6/[BUS-39](https://linear.app/bussiness-content-os/issue/BUS-39/owner-decision-required-b-6-sensitive-claims-flag-criteria-and) were approved. B‑1 retains uniform research depth; B‑2 rejects any automatic `BLOCKED`→`CANCELLED` timer/retry threshold; B‑4 declines a Campaign/Series orchestration layer at this time; B‑6 adopts `SENSITIVE_CLAIM` handling folded into STG‑09 Approval. The sensitive-claims flag does **not** create a new Stage, Lifecycle State, Exception Status, or Quality Gate. It changes only the approval evidence required when material-harm-risk claims are present. B‑5 had already been resolved through CWC-QA-001. **Result: CONFORMANT.**

### 0.1f Final Stack Reconciliation — v1.6 (2026-09-13)

**\[COMPLIANCE REVISION — NO WORKFLOW BEHAVIOR CHANGE\]** Final stack audit re-verified current CWC Production Workflow → FSS → QA relationships after FSS and QA metadata/identifier compliance revisions. Workflow has no normative dependency on FSS or QA, so no `Depends On` chase is required. Its own D1 metadata, `DIUA-DIC-000017`, [BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) v1.16 / [BUS-17](../../system/Content-OS-Universal-Identifier-Registration-Record.md) v1.15 authority references, and CWC canonical dependency versions remain current. **Result: CONFORMANT.** No Stage, Lifecycle State, Exception Status, transition, Gate, or approval rule changed.

### 0.1g Final Domain Dependency Reconciliation — v1.7 (2026-09-13)

**\[COMPLIANCE REVISION — NO ARCHITECTURAL CHANGE\]** Root Documentation Structure advanced v2.4→v2.5 by adding the platform-independent Representation Portability constraint (§3). The five canonical CWC upstream dependencies advanced correspondingly: CPB v2.11→v2.12, CAS v1.13→v1.14, CAR v1.11→v1.12, CAB v1.12→v1.13, and CRS v1.7→v1.8. Each advance was re-verified against this Workflow's declared dependency use under Root Level Architecture §8.6. **Result: CONFORMANT.** Representation portability and upstream metadata synchronization do not alter any Stage, Lifecycle State, Exception Status, transition, Gate, approval rule, cancellation rule, or authority boundary in this Workflow. Historical retrieval/audit records remain unchanged as provenance.

### 0.1h Dependency Currency, Provenance Correction, and Current-State Reconciliation — v1.8 (2026-09-13)

**\[COMPLIANCE / PROVENANCE REVISION — NO ARCHITECTURAL CHANGE\]** A current-state audit (WF-AUD-01 through WF-AUD-08) found eight compliance/provenance defects in v1.7 CANONICAL, none of them lifecycle-architectural. This subsection records the corrections; the v1.8 Controlled Revision Record near the end of this document records the full accounting.

1. **Dependency currency (WF-AUD-01).** Re-retrieved all eight declared dependencies directly from Linear (not from cached v1.7 text). Two were stale: CWC Asset System (CAS) v1.14→**v1.15** (added an explicit §6 lifecycle-authority boundary clarifying that CAS owns the lifecycle model/transition semantics while CAR/CAB/CRS own current lifecycle state within their own domains — closes a [BUS-19](DIUA-DIC-000013_CWC-Canonical-Asset-System-CAS.md) audit ambiguity; no lifecycle state, transition, or downstream asset status changed); CWC Asset Bible (CAB) v1.13→**v1.15** (v1.14 added the Asset 002 Generated Presenter Variant Rule, an asset-specification-content addition entirely within CAB's own authority; v1.15 is a status-promotion-only step to CANONICAL). Both re-verified under Root Level Architecture §8.6: neither changes any Output Contract, Stage, Lifecycle State, Exception Status, or Gate this Workflow defines. **Result: CONFORMANT.** The remaining six dependencies (Root Level Architecture, Root Documentation Structure, Root Governance, CPB, CAR, CRS) showed no drift. The header's `Depends On` field is updated accordingly. Version advancement was not assumed to imply incompatibility — each advance was individually checked against this Workflow's declared use of it before being marked CONFORMANT.
2. **Revision-history structure (WF-AUD-02).** §0.1e/§0.1f had drifted into non-chronological, duplicated-identifier order (two `§0.1f` headings; §0.1e's own body displaced under the second `§0.1f` heading). Restored deterministic order — §0.1e (v1.5) → §0.1f (v1.6) → §0.1g (v1.7) → §0.1h (this subsection, v1.8) — with unique subsection identifiers and each body under its own correct heading. No historical claim's content or substance was altered; only structural placement was corrected.
3. **Version-lineage narrative (WF-AUD-03).** The document header previously described v1.7 as if it were the direct successor to v1.4, compressing the intervening v1.5 (Owner Decision materialization) and v1.6 (final stack reconciliation) into an implied single event. The header now states all five events (v1.4 through v1.8) explicitly and separately.
4. **QA relationship current-state text (WF-AUD-04).** §2, §6 (STG‑08), §12.3, and §21's QA row still read as though QA ownership were `[UNCONFIRMED SOURCE]` and B‑5 were open — stale relative to this document's own Appendix B (B‑5 **RESOLVED**) and relative to CWC-QA-001, which is canonical (currently v1.13 CANONICAL as of 2026-09-13, continuously advanced since this Workflow's own Owner canonicalized it at v1.4 on 2026-09-08, through the same kind of routine compliance/dependency-reconciliation revisions this Workflow itself uses — no redesign). CWC-QA-001 §18 records that the CWC domain Owner holds authority over QA criteria content (Owner Decision OD‑2 / [BUS-38](https://linear.app/bussiness-content-os/issue/BUS-38/owner-decision-required-b-5-cwc-qa-mechanism-ownership-and-criteria)), distinct from ownership of Core Workflow lifecycle machinery (unchanged, this document's own). Corrected text (§2, §6, §12.3, §21) now states plainly: a canonical QA Mechanism exists and owns QA criteria content; STG‑08 consumes "applicable QA criteria" through the Required-Input channel this Workflow's own architecture already reserved (§6 STG‑08); **no** `Depends On` **relationship is created** — the channel is a runtime input contract, not a document-version dependency under Root Level Architecture §8.6, and creating one would risk exactly the reverse-authority/circularity this revision is instructed to avoid. This Workflow remains the sole lifecycle authority; the QA Mechanism remains subordinate/external for QA criteria and execution content only.
5. **Format Specialization relationship current-state text (WF-AUD-05).** §17 and §21's Format-specific Production Specifications row stated "none authored" — stale; the CWC Format Specialization Specification (FSS‑001) is canonical (currently v1.13 CANONICAL). Corrected text recognizes FSS‑001 exists and extends the Core per §17's own extension model (selected once in Planning, entering/exiting only through Core transitions, never forking Stage/Lifecycle State/Exception Status). No reverse dependency is introduced; FSS‑001 remains a downstream extension artifact, not an upstream authority this Workflow depends on.
6. **Residual open-decision language (WF-AUD-06).** Swept the full current-normative text (excluding preserved Revision 1–4 historical provenance, which is left exactly as written) for statements treating B‑1, B‑2, B‑4, B‑5, B‑6, QA ownership, or Campaign/Series orchestration as unresolved. Found and corrected: §2 (QA checklist ownership), §3 (Campaign/Series "Open Decision" language for B‑4, now stated as resolved), §6 STG‑08, §12.3, §21 (two rows). Historical Revision 3/4 text (Appendix A.1/A.2, the Revision 3 and Revision 4 Change Summaries, and their own "Remaining Open Decisions" sub-items) is preserved unchanged — those passages were true statements of record at the time they were written and are not rewritten merely because later resolved. The current, non-historical "## Remaining Open Decisions" section (stating **None**) was already correct in v1.7 and required no change.
7. **Linear Project tracker drift (WF-AUD-07) and dynamic version references (WF-AUD-08).** Addressed as a Linear Project description reconciliation (applied 2026-09-13, within this task's scope over "the CWC Production Workflow document and its Linear project/tracker") — see the v1.8 Controlled Revision Record's Linear Tracker Reconciliation subsection near the end of this document. No tracker edit alters this document's own canonical substance; no historical issue content was mass-edited; Project completion status was left unchanged.

**Result: CONFORMANT.** No Stage, Lifecycle State, Exception Status, transition, Gate, Revision Event field, cancellation rule, Governance Resolution field, or Owner Decision outcome changed. This is a compliance/provenance correction pass, per the Amendment discipline this document defines for itself (see the Canonicalization Record's "Amendment discipline going forward").

### 0.1i Owner-Directed Canonical Asset Direct-Placement Reconciliation — v1.8 (2026-09-13)

**\[OWNER-DIRECTED EXECUTION-CONTRACT REVISION — NO LIFECYCLE ARCHITECTURE CHANGE\]** The Owner directed that Production AI retrieve the canonical CWC Official Brand Logo (AS-001) and Official Footer Platform (AS-004) from the authoritative asset repository and place those exact canonical assets directly into content. The owning asset authorities were reconciled first: CAB advanced to v1.16 CANONICAL with a Direct Canonical Asset Retrieval and Placement Rule, and CRS advanced to v1.9 CANONICAL with current production-file mappings and direct-placement application behavior. This Workflow then re-verified those dependencies under Root Level Architecture §8.6 and updated only the Visual Production execution contract (§6 STG‑07), Stage Handoff Matrix (§7), Asset Lifecycle Integration (§16), and system-relationship bindings (§21). **Result: CONFORMANT.** No Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event field, cancellation/publication rule, or Owner Decision B‑1–B‑6 changed. The normative Workflow concept remains tool-agnostic: it requires retrieval from the *current authoritative asset repository*; Google Drive is the current operational binding, not a lifecycle dependency. AI generation/redraw/reconstruction/substitution of AS-001/AS-004 remains prohibited.

### 0.1j [BUS-58](https://linear.app/bussiness-content-os/issue/BUS-58/adopt-reference-model-in-cwc-research-pipeline) Reference Model Adoption — v1.11 (2026-09-14)

**\[CONTROLLED ARCHITECTURAL-RELATIONSHIP REVISION\]** CWC adopts Content OS — Reference Model v1.13 as bounded normative authority at STG‑03. RM1–RM4 govern Reference classification, the external/internal boundary, recoverable provenance, reliability at the point of use, and the prohibition on external structural authority. RM5 remains a restraint against creating a central Reference registry without demonstrated coordination failure. STG‑03 now records provenance and point-of-use reliability in its existing source-coverage output; STG‑08 consumes that record through the existing QA input channel. No new Stage, Lifecycle State, Exception Status, Quality Gate, research provider, registry, or approval authority is created. All locked lifecycle and transition semantics remain unchanged.

### 0.1k [BUS-60](https://linear.app/bussiness-content-os/issue/BUS-60/cwc-production-workflow-asset-production-behavior-reconciliation) Asset Production Behavior Reconciliation — v1.12 (2026-09-16)

**\[CONTROLLED EXECUTION-CONTRACT / DEPENDENCY REVISION — NO LIFECYCLE ARCHITECTURE CHANGE\]** A live audit found Workflow v1.11 stale against the canonical CWC asset subsystem. Current authorities were re-retrieved before revision: CPB v2.12 CANONICAL; CAS v1.17 CANONICAL; CAR v1.17 CANONICAL; CAB v1.32 CANONICAL; CRS v1.21 CANONICAL. CAS v1.17 introduces the canonical Asset Production Behavior Model; CAB v1.32 assigns exactly one primary mode to each current production-use asset: AS-001 `EXACT_REUSE`, AS-002 `GENERATIVE_REFERENCE`, AS-003 `TOKEN_CONTROLLED`, AS-004 `EXACT_REUSE`, AS-005 `EXACT_REUSE`.

This revision changes only how STG‑06 validates asset readiness and how STG‑07 executes already-canonical asset behavior. It does not redefine the modes: CAS owns mode semantics; CAB owns per-asset assignment and constraints; CRS owns authoritative production files/references; CAR owns identity. Production Behavior is orthogonal to the CAS Canonical Lifecycle.

Execution rule consumed by this Workflow:

* `EXACT_REUSE`: use the exact approved CRS production file/variant through deterministic retrieval and placement/compositing; no generation, redraw, reconstruction, or visual substitution. If exact placement is technically unavailable, use the controlled Reserved Area/manual-placement fallback rather than fabricate a replacement.
* `GENERATIVE_REFERENCE`: generate only a controlled production derivative under CAB identity/variation/QA rules using the authoritative CRS generation-reference hierarchy; resemblance alone never makes a derivative canonical.
* `TOKEN_CONTROLLED`: apply CAB-defined canonical token values deterministically in their specified roles; CRS token imagery documents/validates values but is not itself the production bitmap.

AS-005 is therefore consumed as `EXACT_REUSE` through its approved transparent canonical production derivative; its opaque master remains the visual/identity master. AS-002 is consumed as `GENERATIVE_REFERENCE` through its locked GENREF hierarchy. No asset identity, binary, lifecycle state, lock scope, or CRS mapping is changed by this Workflow revision.

**Regression result:** no Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, approval rule, cancellation/publication boundary, Research/Reference behavior, Content ID behavior, or Production Alias changes.

### 0.1l [BUS-60](https://linear.app/bussiness-content-os/issue/BUS-60/cwc-production-workflow-asset-production-behavior-reconciliation) Targeted Validation + Owner Promotion — v1.13 (2026-09-16)

The v1.12 REVISION CANDIDATE was checked against the live authoritative stack before promotion.

| Validation item | Result |
| -- | -- |
| Dependency currency | **PASS** — CPB v2.12, CAS v1.17, CAR v1.17, CAB v1.32, CRS v1.21, Reference Model v1.13. |
| STG‑06 readiness contract | **PASS** — lifecycle eligibility, CAB primary Production Behavior Mode, and CRS/CAB mode inputs are all required before handoff. |
| STG‑07 `EXACT_REUSE` execution | **PASS** — deterministic exact-file retrieval/placement, controlled fallback, no fabrication; applies through CAB assignment rather than a stale hard-coded AS‑001/AS‑004 list. |
| STG‑07 `GENERATIVE_REFERENCE` execution | **PASS** — controlled derivative only under CAB constraints and authoritative CRS GENREF hierarchy; resemblance does not create canonicality. |
| STG‑07 `TOKEN_CONTROLLED` execution | **PASS** — exact canonical values/roles, no approximate sampling or unapproved derived treatment. |
| AS‑005 coverage | **PASS** — current CAB assignment `EXACT_REUSE`; approved transparent canonical derivative is consumed as the production-placement source while the opaque master remains visual/identity authority. |
| AS‑002 coverage | **PASS** — current CAB assignment `GENERATIVE_REFERENCE`; locked GENREF hierarchy is consumed without redefining presenter identity. |
| Lifecycle regression | **PASS** — no Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, cancellation/publication boundary, approval rule, Reference Model behavior, Content ID behavior, or Production Alias changed. |
| Authority boundary | **PASS** — CAS defines modes; CAB assigns modes/constraints; CRS maps files/references; CAR owns identity; Workflow only consumes them. |

**Owner decision:** the Owner's 2026-09-16 instruction to repair Blocking 2 is the approval act for this bounded revision after the v1.12 candidate passed the checks above. v1.13 is therefore promoted to **CANONICAL LOCKED** under the existing stable document identity `DIUA-DIC-000017`.

### 0.2 What Changed From Revision 2 to Revision 3 (carried forward for record continuity)

Two categories of change were made in Revision 3, preserved here as history: (1) an internal model correction making Stage/Lifecycle State/Exception Status formally coherent; (2) a source-discipline correction withdrawing two over-claims about CPB. Both are described in full in the Revision 3 text this document is built on; see §0.4 for what Revision 3 established and is now preserved.

### 0.2a What Changed From Revision 3 to Revision 4

This pass is narrower still — a correction to Revision 3's own remaining imprecisions, not a new model:

1. **Cancellation atomicity (§8, §10, §13, §14, §15, Appendix C).** Revision 3 correctly kept `CANCELLED` out of every pre-publication row of the Stage–State Validity Matrix, but its transition-table and prose wording (e.g. "any Stage, `CANCELLED` set…", "Lifecycle State becomes `CANCELLED`") could be read as implying an observable intermediate pair such as `VISUAL PRODUCTION + CANCELLED`. Revision 4 makes cancellation an explicit atomic jump: `(any pre-publication Stage/State) → (RECORD / CANCELLED)` in one transition, never a two-step "State becomes CANCELLED, then Stage becomes RECORD."
2. **Revision Event record fields (§11).** "Affected Output(s)" is now a distinct, separately-named field from "Downstream Invalidation Scope" in both the Revision Event structure and its worked example, matching the Governance Resolution Record's own field separation.
3. **QA Output Validation wording (§6 STG‑08, §12.3).** Replaced with the precise, bounded statement supplied by this revision's own instruction, removing any remaining implication of an external checklist this Workflow can see.
4. **Sensitive-claims governance status (§18).** Explicitly tagged `OWNER DECISION REQUIRED` for the flagging mechanism, criteria, and the mandatory-additional-checkpoint concept, distinguished from ordinary Approval (STG‑09), which remains a settled, unweakened control.
5. **Exception Status transition table (§9.4, new).** A compact, explicit transition table added; the existing constraint that Exception Status changes never alter Stage/Lifecycle State on their own is restated as a rule the table itself enforces by construction.

None of these required reopening any of Revision 3's 17 preserved decisions (§0.4) — each is a precision fix to wording or record structure, not an architectural change.

### 0.3 Authority Statement

Unchanged from Revision 2. This document defines lifecycle and control logic only, is not canonical until reviewed and locked by CWC's canonical authority (the Owner), and has no authority to override CPB, CAS, CAR, CAB, or CRS. A conflict found between this document and any of them is a governance issue (§14), not something this document resolves by fiat.

### 0.4 Revision 2 Decisions Preserved Unchanged

Per the correction prompt's explicit instruction not to re-litigate settled architecture, the following stand as they did in Revision 2, and are not re-derived here: the eleven-stage Core Workflow and its sequence; the Content Item as the single workflow unit; the Input/Output Contract model per stage (§6); the Stage Handoff Matrix (§7); the CAS Canonical Lifecycle (`DRAFT → REVISION CANDIDATE → CANONICAL → CANONICAL LOCKED`, `SUPERSEDED` from any state) as the Asset Preparation basis (§16); the CRS Reserved‑Area / manual canonical‑asset placement boundary as originally established in Revision 2 (subsequently superseded for recurring AS‑001/AS‑004 production by the Owner-directed direct-placement rule in §0.1i; retained as fallback only); the Publication one-way boundary and Cancellation-only-before-Publication rule (now precision-corrected for the Exception Status split, §15, not reopened in substance); RECORDED as terminal; Format Specialization as extension-only (§17); the Revision-2-era human-approval model recorded at §18 (subsequently reconciled by v1.5 so sensitive-claims handling is folded into STG‑09 rather than counted as a separate checkpoint); tool independence; AI-as-executor; and the source-grounding discipline itself.

---

## 1. Purpose

Unchanged from Revision 2. CWC Production Workflow defines the canonical, single production lifecycle every CWC content item passes through. It gives one deterministic answer to: what work domain (**Stage**) a Content Item occupies, where it sits in its normal progression (**Lifecycle State**), whether normal progression is currently suspended (**Exception Status**), what must be true to move forward, what happens on failure, and who or what is authorized to act.

## 2. Scope

Unchanged from Revision 2 (§0.1 confirms the exclusions below still hold against the re-verified sources):

**In scope:** stages, lifecycle states, exception status, the Stage–State relationship, transitions, input/output handoff contracts, transition conditions and the three formal Quality Gates, revision events, exception handling, governance interrupts, the asset-lifecycle boundary, the format-specialization contract, human-approval checkpoints, completion/recording rules.

**Out of scope:** production technique/craft standards (CPB); step-by-step execution (SOPs); asset identity/specification/visual-representation ownership (CAS/CAR/CAB/CRS); research methodology detail; the specific QA checklist content (owned by the canonical CWC QA Mechanism, CWC-QA-001 — see §12.3, §21 B‑5); format-specific production steps; AI agent architecture/orchestration/infrastructure; Linear/GitHub/Canva implementation detail.

## 3. Workflow Unit

Unchanged from Revision 2. The **Content Item** is the unit that moves through this workflow, holding exactly one Stage, one Lifecycle State, and (optionally) one Exception Status at a time (§9, INV‑ST‑1). **Asset** and **Campaign/Series** remain explicitly not the workflow unit (Asset lifecycle: §16; Campaign/Series orchestration: resolved by Owner Decision, no orchestration layer introduced at this time — §21 B‑4).

---

## 4. Workflow Principles

 1. **Stage, Lifecycle State, and Exception Status are three distinct dimensions** (§5), never collapsed into one field or into each other.
 2. **Single-lane determinism.** A Content Item holds exactly one Stage and one Lifecycle State at a time, always a valid pair per §8.2. Exception Status is a separate, optional overlay (§9) — it never substitutes for or invalidates that pair.
 3. **Separation of work types.** Content production, asset preparation, and visual production remain distinct stages with distinct Input/Output Contracts (§6).
 4. **No orphan handoff.** Every normal transition is Producer → Output Package → Output Contract → Output Validation → Consumer (§6, §7).
 5. **Every transition is governed by an explicit transition condition** (§10) — none is empty. **Not every transition is a formal Quality Gate**; Gate‑QA, Gate‑Approval, and Gate‑Publication (§12) are the three transitions that additionally carry cross‑functional/human‑authority weight. Conflating "transition condition" with "gate" was a Revision 2 imprecision, corrected here.
 6. **A Revision Event invalidates affected downstream outputs and returns the item to a responsible Stage/Lifecycle State — it is an event, not a resting state** (§11). It never erases history.
 7. **Governance is cross-cutting and reserved for genuine Canonical/Policy Ambiguity** — not every ambiguity (§14). It is represented as Exception Status, not as a Lifecycle State the item "becomes."
 8. **Publication is a one-way production boundary** (§15). Nothing returns to production, and neither Exception Status may be set, once Lifecycle State = `PUBLISHED`.
 9. **Lifecycle, not procedure.** WHAT/WHEN/WHY/TRANSITION only.
10. **Extension, not forking** (§17).
11. **Tool-agnostic** (§20).
12. **Deterministic execution is supported where the referenced contracts, specifications, and explicit human decisions provide the required inputs; where a required decision or contract is unresolved, the workflow routes to the appropriate exception or human checkpoint rather than allowing agent inference** (§18, precision‑corrected from Revision 2's unconditional determinism claim).
13. **No silent exit.** Every terminal outcome — published or cancelled — reaches `RECORDED` (§19).
14. **Evidence before assumption** (CPB UPR‑004) — this document does not assert what a source contains, or what architecture is settled, without having checked (§0).

---

## 5. The Formal Data Model — Stage, Lifecycle State, and Exception Status

This is the normative correction at the center of Revision 3.

A Content Item's current lifecycle position is represented as three separate fields, always read together but never merged:

```text
Current Stage
  +
Current Lifecycle State
  +
Optional Exception Status   (default: NONE)
```

* **Stage** answers *what work domain is being executed?* The eleven canonical stages are unchanged from Revision 2 — no retrieved source required reordering them:

```text
INTAKE → DEFINITION → RESEARCH → PLANNING → CONTENT PRODUCTION
  → ASSET PREPARATION → VISUAL PRODUCTION → QA → APPROVAL
    → PUBLICATION → RECORD
```

* **Lifecycle State** answers *where is the Content Item in its normal progression?* A Lifecycle State's name may differ from its Stage's name (§8).
* **Exception Status** answers *is normal progression currently suspended, and why?* It is `NONE`, `BLOCKED`, or `GOVERNANCE_REVIEW` (§9) — never a fourth thing invented for convenience, and never `REVISION_REQUIRED` (§11 explains why that is not a status at all, but a transient event).

### Worked examples

```text
Normal production:
  Stage = QA
  Lifecycle State = IN_QA
  Exception Status = NONE
```

```text
Blocked:
  Stage = VISUAL PRODUCTION
  Lifecycle State = IN_VISUAL_PRODUCTION
  Exception Status = BLOCKED
```

```text
Governance review:
  Stage = RESEARCH
  Lifecycle State = DEFINED
  Exception Status = GOVERNANCE_REVIEW
```

### Mandatory invariant (normative)

**Current Stage and Current Lifecycle State must always form a valid pair per the Stage–State Validity Matrix (§8.2). Exception Status does not replace or invalidate that pair; it suspends normal progression while preserving the underlying lifecycle position.** This is the specific correction to Revision 2, which stated the same intent in prose (§7.3 there) but then contradicted it by listing `BLOCKED`/`GOVERNANCE_REVIEW` as rows *inside* the state matrix it also said they weren't part of. In Revision 3, §8.2 contains **only** Stage/Lifecycle‑State pairs; Exception Status has its own matrix (§9.2) and can never appear as a value inside §8.2.

**Worked invalid example (carried forward from Revision 2, still correct):** `Current Stage = QA, Current Lifecycle State = IN_CONTENT_PRODUCTION` is not in §8.2 — a data-integrity fault, routed to `GOVERNANCE_REVIEW` (Exception Status), never silently reconciled.

---

## 6. Stage Definitions — Input/Output Contract Model

Unchanged from Revision 2 in structure and substance (Input Validation → Execution → Output Package → Output Contract → Output Validation → Handoff → Next Stage Input; the same field set: Purpose, Required Inputs, Input Preconditions, Input Source, Core Activities, Output Package, Output Contract, Output Validation, Consumer Stage, Exit Criteria, Failure Conditions, Valid Next Transition). Only the **Failure Conditions** wording changes throughout, to stop implying that `GOVERNANCE_REVIEW`/`BLOCKED` are destinations the Lifecycle State "becomes," and that revision is a state the item "enters."

---

### STG‑01 — INTAKE

| Field | Content |
| -- | -- |
| Purpose | Capture that a Content Item is intended to exist. |
| Required Inputs | A request, content-calendar slot, or governance-mandated production requirement. |
| Input Preconditions | The trigger is attributable to an authorized source. |
| Input Source | Content calendar / requester / a `GOVERNANCE_REVIEW` resolution (§14) mandating corrective content. |
| Core Activities | Register the Content Item with a unique workflow identity; record origin and trigger type. The INTAKE identity is not the native `CWC-{FORMAT}-{NNNN}` Content ID; native Content ID assignment occurs in STG‑02 after format definition and duplicate screening. |
| Output Package | Content Item record: identity, origin, raw intent. |
| Output Contract | Workflow identity is unique; origin is traceable to one of the three authorized trigger types. No native CWC Content ID is required yet. |
| Output Validation | Confirm origin attribution before accepting the record as complete. |
| Consumer Stage | DEFINITION |
| Exit Criteria | Content Item has an identity and a recorded, attributable origin. |
| Failure Conditions | Origin cannot be attributed → Exception Status `BLOCKED` (Stage/State frozen at INTAKE) pending attribution; unresolved → Lifecycle State `CANCELLED` (§15). |
| Valid Next Transition | Lifecycle State `INTAKE` → `DEFINED` (Stage moves to DEFINITION) when Output Contract is met. |

---

### STG‑02 — DEFINITION

| Field | Content |
| -- | -- |
| Purpose | Turn raw intent into a scoped, actionable brief. |
| Required Inputs | Content Item record. |
| Input Preconditions | Lifecycle State = `INTAKE`. |
| Input Source | STG‑01 Output Package. |
| Core Activities | Define objective, audience, format, platform, success criteria, Topic, Learning Objective, Core Message, and Editorial Angle; compare the resulting semantic signature against authoritative Content Register entries and legacy staging evidence; assign D0/D1/D2/D3; allocate or retain the appropriate native CWC Content ID only when the duplicate decision permits progression. |
| Output Package | Content Brief + duplicate-control result + Content ID disposition. |
| Output Contract | Unambiguous objective, audience, recognized format, platform, success criteria, Topic, Learning Objective, Core Message, Editorial Angle, Semantic Key, and D0/D1/D2/D3 result. For a new content instance permitted to proceed, a unique native `CWC-{FORMAT}-{NNNN}` Content ID is allocated in the correct format lane. Intentional cross-format adaptation records `Adapted From`; approved repost/update paths retain the existing Content ID where applicable. |
| Output Validation | Field-by-field check plus Content Register duplicate check. D0 = allow; D1 = allow with relationship recorded where useful; D2 = review required and exit remains blocked; D3 = no unrelated new-content progression unless the item is explicitly converted to an approved repurpose/adaptation/update/repost path. |
| Consumer Stage | RESEARCH |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | Format/objective exceeds this stage's authority (e.g., an unrecognized format) → Exception Status `GOVERNANCE_REVIEW` (Stage=DEFINITION, State=`INTAKE` frozen); awaiting a stakeholder decision → Exception Status `BLOCKED`; D2 semantic overlap → Exception Status `BLOCKED` while differentiation/review is resolved; D3 duplicate → the proposed unrelated-new-content path cannot exit DEFINITION and must be cancelled or explicitly converted to an approved repurpose/adaptation/update/repost path. |
| Valid Next Transition | `INTAKE` → `DEFINED` when Output Contract is met. |

---

### STG‑03 — RESEARCH

| Field | Content |
| -- | -- |
| Purpose | Establish source grounding sufficient for the Content Item's claims. |
| Required Inputs | Content Brief; external References and/or canonical internal knowledge sources appropriate to the claims. |
| Input Preconditions | Lifecycle State = `DEFINED`. |
| Input Source | STG‑02 Output Package. |
| Core Activities | Classify every substantive claim's source coverage. For every external Reference actually used, apply Content OS — Reference Model v1.13 RM1–RM4: identify it as a Reference rather than an internal dependency; record recoverable provenance; determine and record reliability at the specific point of use; and prevent the source from acquiring structural authority over Content OS or CWC. Research depth remains uniform across content types per Owner decision B‑1 / [BUS-35](https://linear.app/bussiness-content-os/issue/BUS-35/owner-decision-required-b-1-research-depth-criteria-by-content-type) (2026-09-13); no differentiated taxonomy is active. |
| Output Package | Source-coverage record per claim: explicit evidence / inference / ambiguity / contradiction / insufficient evidence. Each external Reference used includes recoverable provenance and a point-of-use reliability determination. |
| Output Contract | Every substantive claim is classified; none is omitted. Every external Reference actually used is traceable and has a recorded point-of-use reliability determination. No external Reference is treated as structural authority. |
| Output Validation | Claim-by-claim completeness check; provenance recoverability check; point-of-use reliability check. |
| Consumer Stage | PLANNING |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | Contradiction, insufficient evidence, unrecoverable provenance, or unresolved reliability for a required claim → Exception Status `GOVERNANCE_REVIEW` (Stage=RESEARCH, State=`DEFINED` frozen). |
| Valid Next Transition | `DEFINED` → `RESEARCHED` when Output Contract is met. |

---

### STG‑04 — PLANNING

| Field | Content |
| -- | -- |
| Purpose | Convert brief + research into an actionable production plan. |
| Required Inputs | Content Brief; Research output; applicable Format Specialization. |
| Input Preconditions | Lifecycle State = `RESEARCHED`. |
| Input Source | STG‑03 Output Package; Format Specialization registry. |
| Core Activities | Sequence content structure; identify preliminary Asset Requirements; assign Format Specialization. |
| Output Package | Production Plan; preliminary Asset Requirements (a deliberate statement, never a silent omission); assigned Format Specialization. |
| Output Contract | Traces to Brief and every Research classification; format recognized; requirements deliberate. |
| Output Validation | Cross-check against Brief and Research output. |
| Consumer Stage | CONTENT PRODUCTION |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | Required format has no specification and no ad-hoc authority → Exception Status `GOVERNANCE_REVIEW` (Stage=PLANNING, State=`RESEARCHED` frozen). |
| Valid Next Transition | `RESEARCHED` → `PLANNED` when Output Contract is met. |

---

### STG‑05 — CONTENT PRODUCTION

| Field | Content |
| -- | -- |
| Purpose | Produce the content substance. |
| Required Inputs | Production Plan; Research output; Format Specialization content requirements. |
| Input Preconditions | Lifecycle State = `PLANNED` AND Production Plan satisfies its Output Contract (STG‑04) AND Format Specialization is assigned AND every required input is present and valid. |
| Input Source | STG‑04 Output Package. |
| Core Activities | Write/produce content substance; finalize Asset Requirements; self‑check against STG‑03 classifications and, where CPB's Editorial Validation Standard applies (Ch.6 §6.10), Editorial System compliance. |
| Output Package | Content draft; finalized Asset Requirements. |
| Output Contract | Every claim traces to a STG‑03 classification; Asset Requirements finalized. |
| Output Validation | Claim-by-claim trace check; Asset Requirements completeness check. |
| Consumer Stage | ASSET PREPARATION |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | A new unsourced claim is introduced → **Revision Event** (Source/evidence defect), returning to Stage RESEARCH / Lifecycle State `DEFINED` (§11) — a self-contained production responsibility, not automatically governance-class, **unless** the underlying source basis is itself contradictory or insufficient, in which case Exception Status → `GOVERNANCE_REVIEW` instead (§14 test). |
| Valid Next Transition | `PLANNED` → `IN_CONTENT_PRODUCTION` (active) → `CONTENT_PRODUCED` when Output Contract is met. |

---

### STG‑06 — ASSET PREPARATION

| Field | Content |
| -- | -- |
| Purpose | Select, create, or commission assets; confirm each is canonical and valid. |
| Required Inputs | Finalized Asset Requirements; current CAS/CAR/CAB/CRS registry state. |
| Input Preconditions | Lifecycle State = `CONTENT_PRODUCED` AND finalized Asset Requirements satisfy their Output Contract. |
| Input Source | STG‑05 Output Package; CAR/CAB/CRS. |
| Core Activities | Select or trigger creation of assets through the CAS ecosystem's own process; confirm identity (CAR), specification and primary Production Behavior Mode (CAB), authoritative production-file/reference/token mapping (CRS), and applicable CAS Canonical Lifecycle state. For `EXACT_REUSE`, validate the approved production file/variant is retrievable or explicitly route to controlled fallback; for `GENERATIVE_REFERENCE`, validate the authoritative GENREF set and CAB generation constraints; for `TOKEN_CONTROLLED`, validate the exact canonical token values/roles to be applied. |
| Output Package | Validated asset set, each CAR-identified and carrying its current lifecycle eligibility, CAB primary Production Behavior Mode, and the CRS production-file/reference/token inputs required for STG‑07 execution. |
| Output Contract | Every requirement is satisfied by a CAR-identified asset at CAS Canonical Lifecycle state `CANONICAL` or `CANONICAL LOCKED` (never `DRAFT`, `REVISION CANDIDATE`, or `SUPERSEDED`, CAS §6), with exactly one CAB-assigned primary Production Behavior Mode and all mode-required CRS/CAB inputs resolved. A `CANONICAL LOCKED` asset needing canonical change requires an Owner unlock decision; STG‑06 may not substitute, reinterpret, or invent another production behavior. |
| Output Validation | Per-asset identity/spec/reference check; lifecycle-state check; CAB Production Behavior assignment check; mode-input completeness check against CRS/CAB. |
| Consumer Stage | VISUAL PRODUCTION |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | Required asset cannot be sourced within canonical constraints, or is ineligible with no Owner unlock → Exception Status `GOVERNANCE_REVIEW` (Stage=ASSET PREPARATION, State=`IN_ASSET_PREPARATION` frozen); merely pending delivery, no canonicality conflict → Exception Status `BLOCKED`. |
| Valid Next Transition | `CONTENT_PRODUCED` → `IN_ASSET_PREPARATION` (active) → `ASSETS_PREPARED` when Output Contract is met. |

---

### STG‑07 — VISUAL PRODUCTION

| Field | Content |
| -- | -- |
| Purpose | Compose the final visual artifact. |
| Required Inputs | Content draft; validated asset set; Format Specialization visual requirements. |
| Input Preconditions | Lifecycle State = `ASSETS_PREPARED` AND validated asset set satisfies its Output Contract. |
| Input Source | STG‑05 and STG‑06 Output Packages. |
| Core Activities | Compose using the designated visual production surface (currently Canva, tool-agnostic per §20). Where CPB Ch.7 §7.4 applies, its six visual systems are applied in sequence: Canvas → Layout → Surface → Typography → Graphic Elements → Imagery. Execute each validated canonical asset according to the single primary Production Behavior Mode assigned by CAB under CAS §7: `EXACT_REUSE` → retrieve and place/composite the exact approved CRS production file/variant with only specification-compliant placement/scaling; never generate, redraw, reconstruct, recolor outside an approved variant, distort internal geometry, or substitute it; if exact placement is technically unavailable, use the controlled Reserved Area/manual-placement fallback and do not fabricate a replacement. `GENERATIVE_REFERENCE` → create only a controlled production derivative under CAB identity/variation/QA constraints using the authoritative CRS generation-reference hierarchy; the derivative does not become canonical by resemblance. `TOKEN_CONTROLLED` → apply the exact CAB-defined canonical values in their specified roles; do not sample approximately from a reference image or invent unapproved derived treatments. Current CAB assignments are AS‑001/AS‑004/AS‑005=`EXACT_REUSE`, AS‑002=`GENERATIVE_REFERENCE`, AS‑003=`TOKEN_CONTROLLED`; the Workflow consumes these assignments rather than owning or hard-coding future asset classifications. |
| Output Package | Final visual composition. |
| Output Contract | Complete; only validated, current-lifecycle-state assets and finalized content. Every required asset is executed according to its CAB-assigned Production Behavior Mode: `EXACT_REUSE` assets use the approved CRS production file/variant without unauthorized modification; `GENERATIVE_REFERENCE` derivatives satisfy CAB identity/variation/QA constraints against the authoritative CRS reference hierarchy; `TOKEN_CONTROLLED` values are applied exactly in their canonical roles. Any `EXACT_REUSE` asset routed to controlled fallback has a correctly reserved area and remains explicitly unresolved until the exact canonical asset is placed. |
| Output Validation | Self-check against Format Specialization visual requirements plus CAS/CAB/CRS Production Behavior rules: verify CAR identity and lifecycle eligibility; verify CAB mode assignment; for `EXACT_REUSE`, exact source/variant and absence of redraw/reconstruction/substitution; for `GENERATIVE_REFERENCE`, CAB identity-preservation/variation/QA compliance against the applicable CRS GENREFs; for `TOKEN_CONTROLLED`, exact token values and roles. For fallback placement, verify the Reserved Area remains controlled and is filled with the exact canonical asset before exit. |
| Consumer Stage | QA |
| Exit Criteria | Output Contract satisfied: every required asset has been executed and validated according to its CAB-assigned Production Behavior Mode, and no required exact-reuse fallback Reserved Area remains unresolved. |
| Failure Conditions | Composition reveals an uncaught content or asset defect → **Revision Event** (Content or Asset defect, as applicable), returning to Stage CONTENT PRODUCTION or ASSET PREPARATION (§11) — a production-internal catch, not automatically a QA failure. |
| Valid Next Transition | `ASSETS_PREPARED` → `IN_VISUAL_PRODUCTION` (active) → `READY_FOR_QA` when Output Contract is met. |

> Visual Production is a production stage, not the Publication stage.

---

### STG‑08 — QA

| Field | Content |
| -- | -- |
| Purpose | Independently verify the Content Item before an approval decision. |
| Required Inputs | Final visual composition; Content Brief; source-coverage record; asset-validation record; applicable QA criteria. |
| Input Preconditions | Lifecycle State = `READY_FOR_QA` AND STG‑07's Output Contract was satisfied at handoff. |
| Input Source | STG‑07 Output Package; STG‑02/03/06 records for cross-check. |
| Core Activities | Verify against QA criteria (§12.3 — criteria owned and supplied by the canonical CWC QA Mechanism, CWC-QA-001); classify any defect by type. |
| Output Package | QA verdict: PASS, or FAIL with a classified defect and routing target. |
| Output Contract | A verdict is recorded; a FAIL is never recorded without a classification. The specific checklist content is not defined by this document (§12.3, §21 B‑5). |
| Output Validation | Verify that the QA verdict is recorded and that every FAIL has an identified defect classification and routing target. Detailed QA acceptance criteria and checklist ownership are governed by the canonical CWC QA Mechanism (CWC-QA-001) and are supplied to STG‑08 as an external Required Input; this Workflow does not restate or redefine them. |
| Consumer Stage | APPROVAL |
| Exit Criteria | Verdict recorded. |
| Failure Conditions | Defect found, correctable → **Revision Event**, routed per §11 (return target Stage + Lifecycle State, downstream invalidation applied); defect is Canonical/Policy-class per §14's test → Exception Status `GOVERNANCE_REVIEW` (Stage=QA, State=`IN_QA` frozen). |
| Valid Next Transition | `READY_FOR_QA` → `IN_QA` (active) → `READY_FOR_APPROVAL` when Output Contract is met. |

---

### STG‑09 — APPROVAL

| Field | Content |
| -- | -- |
| Purpose | Obtain the authorized human decision to allow publication. |
| Required Inputs | QA-passed Content Item; sensitive-claims flag if any (§18). |
| Input Preconditions | Lifecycle State = `READY_FOR_APPROVAL` AND QA verdict = PASS. |
| Input Source | STG‑08 Output Package. |
| Core Activities | Human authority (§18) decides: approve, request revision, or escalate to governance. AI may recommend; it does not decide (CPB AIP‑002/003). |
| Output Package | Approval decision, recorded with the deciding authority's identity. |
| Output Contract | Decision recorded by an authorized human approver; if flagged sensitive-claims, explicit human sign-off is recorded against that flag. |
| Output Validation | Decision-record completeness check; sensitive-claims flag cross-check. |
| Consumer Stage | PUBLICATION |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | Rejected, correctable → **Revision Event**, routed per §11; governance concern raised → Exception Status `GOVERNANCE_REVIEW` (Stage=APPROVAL, State=`READY_FOR_APPROVAL` frozen). |
| Valid Next Transition | `READY_FOR_APPROVAL` → `APPROVED` when Output Contract is met. |

---

### STG‑10 — PUBLICATION

| Field | Content |
| -- | -- |
| Purpose | Release the approved Content Item while preserving exact identity between the approved release package and the platform-live artifact. |
| Required Inputs | Approved Content Item; publication authorization (§18); current approved publication copy/caption where applicable; final publishable visual/binary set or equivalent platform-ready artifact. |
| Input Preconditions | Lifecycle State = `APPROVED` AND the artifact has not changed since Approval. |
| Input Source | STG‑09 Output Package plus the publication-ready export/copy set derived from the approved package. |
| Core Activities | (1) Confirm release readiness; (2) establish an **Approved Release Identity** binding the exact approved publication copy/caption and exact publishable visual/binary set, including ordering where order is meaningful; (3) record a reproducible integrity reference using checksum(s), immutable storage/version identifier(s), or an equivalent deterministic identity mechanism; (4) optionally assemble a Publication Manifest and/or downloadable release bundle as execution artifacts; (5) publish only that locked release identity; (6) confirm the platform registers the item as live. |
| Output Package | **At internal readiness checkpoint:** release-readiness record + Approved Release Identity + current publication copy/caption + traceable publishable artifact set, with optional manifest/release bundle. **At publication completion:** Published Content Item + platform-confirmed publish record. |
| Output Contract | Before Lifecycle State may become `READY_FOR_PUBLICATION`, the approved release identity is explicit, reproducibly identifiable, and unchanged from STG‑09 Approval. Before Lifecycle State may become `PUBLISHED`, the platform-live artifact matches that approved release identity and the platform confirms live status. A ZIP, Publication Manifest, checksum algorithm, storage provider, or publication tool is an implementation choice—not lifecycle authority—provided the identity evidence remains deterministic and auditable. |
| Output Validation | **Readiness validation:** compare the release package against STG‑09 Approval; confirm current caption/copy, file/order identity, and integrity reference. **Publication validation:** bit-for-bit or deterministically equivalent identity check against the approved release identity + platform-confirmation check before Lifecycle State becomes `PUBLISHED`. |
| Consumer Stage | RECORD |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | A mutation or discrepancy from the approved package discovered before live publication → **Revision Event**, returning to Stage APPROVAL; external release-prep/publish dependency failure → Exception Status `BLOCKED` (Stage=PUBLICATION, State=`READY_FOR_PUBLICATION` frozen); no `PUBLISHED` transition without platform-confirmed live evidence. Once Lifecycle State = `PUBLISHED`, no failure condition in this stage applies any longer — see the Post-Publication Boundary (§15). |
| Valid Next Transition | `APPROVED` → `READY_FOR_PUBLICATION` only after the Approved Release Identity is locked → `PUBLISHED` only after platform-confirmed live evidence is recorded. |

---

### STG‑11 — RECORD

| Field | Content |
| -- | -- |
| Purpose | Close the lifecycle with an auditable record, regardless of outcome. |
| Required Inputs | Full stage/state history; Content ID disposition; publish record, or cancellation reason and stage. |
| Input Preconditions | Lifecycle State = `PUBLISHED` **or** `CANCELLED` — the only two valid entry states (§8.2). |
| Input Source | STG‑10 Output Package, or the `CANCELLED` path (§15). |
| Core Activities | Capture final lineage: stage history, decisions, governance events, outcome; synchronize the CWC Content Register record when a native Content ID exists; for a published item, append the verified publication occurrence to the Publication Log; for cancellation after Content ID allocation, retain the Content ID and record `CANCELLED` without recycling its sequence. |
| Output Package | Closed, auditable Content Item record + synchronized Content Register / Publication Log evidence where applicable. |
| Output Contract | Reconstructs the outcome without external memory; every transition has a record entry; any allocated native Content ID has a terminal/current register status consistent with the workflow outcome; any verified publication occurrence is recorded without creating a new Content ID for a repost. |
| Output Validation | Completeness check against the transition log. |
| Consumer Stage | — (terminal) |
| Exit Criteria | Output Contract satisfied; duplicate disposition permits progression; and, where a new content instance is created, native Content ID allocation is complete. |
| Failure Conditions | History incomplete → a process-integrity issue, escalated as Exception Status `GOVERNANCE_REVIEW` rather than silently closed. |
| Valid Next Transition | `PUBLISHED` or `CANCELLED` → `RECORDED` (terminal). |

---

## 7. Stage Handoff Matrix

The matrix structure remains inherited from Revision 2. v1.8's VISUAL PRODUCTION direct-placement handoff remains intact. In v1.9, the DEFINITION handoff is extended only with Content Register duplicate-control evidence and Content ID disposition; no Stage/Lifecycle-State transition is added, removed, or reordered.

| From Stage | Output Package | Output Contract (summary) | Validation | To Stage | Required Input |
| -- | -- | -- | -- | -- | -- |
| INTAKE | Content Item record | Unique identity, attributable origin | Origin-attribution check | DEFINITION | Content Item record |
| DEFINITION | Content Brief + duplicate-control result + Content ID disposition | Objective/audience/format/platform/success criteria + semantic signature complete; duplicate disposition permits progression; native Content ID allocated/retained where required | Field-by-field + Content Register duplicate check | RESEARCH | Content Brief + Content ID + duplicate-control result |
| RESEARCH | Source-coverage record | Every claim classified; every external Reference traceable with point-of-use reliability recorded | Claim-by-claim + provenance + reliability check | PLANNING | Source-coverage record |
| PLANNING | Production Plan + preliminary Asset Requirements + Format Specialization | Traces to Brief & Research; format recognized | Cross-check | CONTENT PRODUCTION | Production Plan, Format Specialization |
| CONTENT PRODUCTION | Content draft + finalized Asset Requirements | Every claim traces; requirements finalized | Claim trace + completeness | ASSET PREPARATION | Finalized Asset Requirements |
| ASSET PREPARATION | Validated asset set | Every requirement met by CANONICAL/CANONICAL LOCKED, CAR-identified asset with CAB Production Behavior Mode and required CRS/CAB mode inputs resolved | Identity/spec/reference + lifecycle-state + mode-assignment/input check | VISUAL PRODUCTION | Validated asset set + finalized content draft |
| VISUAL PRODUCTION | Final visual composition | Complete; every required canonical asset executed according to its CAB-assigned Production Behavior Mode; no unresolved exact-reuse fallback Reserved Area | Identity/lifecycle + mode-specific CAS/CAB/CRS execution check + visual self-check | QA | Final visual composition |
| QA | QA verdict | Verdict recorded; FAIL always classified | Checklist-based | APPROVAL | PASS verdict |
| APPROVAL | Approval decision | Recorded; sensitive-claims sign-off if flagged | Decision-record + flag cross-check | PUBLICATION | Approved decision record |
| PUBLICATION | Release-readiness record + Approved Release Identity; then Published Content Item + publish record | Readiness identity locked; published artifact matches approved identity; platform-confirmed live | Release-identity check + platform confirmation | RECORD | Platform-confirmed publish record |
| (CANCELLED, any pre-publication stage) | Cancellation reason + stage at cancellation | Reason and stage recorded | Completeness check | RECORD | Cancellation record |

---

## 8. Lifecycle State Model

This section now governs **only** the Stage ↔ Lifecycle State relationship. `BLOCKED`, `GOVERNANCE_REVIEW`, and `REVISION_REQUIRED` do not appear anywhere in it — this is the specific correction the Revision 3 objective required.

### 8.1 Primary Lifecycle States

| \# | Lifecycle State | Meaning | Owning Stage(s) |
| -- | -- | -- | -- |
| 1 | `INTAKE` | Item registered | INTAKE (only state); DEFINITION's entry state |
| 2 | `DEFINED` | Brief complete | DEFINITION (exit); RESEARCH (entry) |
| 3 | `RESEARCHED` | Source coverage confirmed | RESEARCH (exit); PLANNING (entry) |
| 4 | `PLANNED` | Plan + preliminary Asset Requirements set | PLANNING (exit); CONTENT PRODUCTION (entry) |
| 5 | `IN_CONTENT_PRODUCTION` | Content substance being produced | CONTENT PRODUCTION (active) |
| 6 | `CONTENT_PRODUCED` | Draft + finalized Asset Requirements ready | CONTENT PRODUCTION (exit); ASSET PREPARATION (entry) |
| 7 | `IN_ASSET_PREPARATION` | Assets being selected/created/validated | ASSET PREPARATION (active) |
| 8 | `ASSETS_PREPARED` | Every requirement met by a validated asset | ASSET PREPARATION (exit); VISUAL PRODUCTION (entry) |
| 9 | `IN_VISUAL_PRODUCTION` | Final visual being composed | VISUAL PRODUCTION (active) |
| 10 | `READY_FOR_QA` | QA may begin | VISUAL PRODUCTION (exit); QA (entry) |
| 11 | `IN_QA` | QA is executing | QA (active) |
| 12 | `READY_FOR_APPROVAL` | QA passed; approval pending | QA (exit); APPROVAL (entry) |
| 13 | `APPROVED` | Authorized approval decision recorded | APPROVAL (exit); PUBLICATION (entry) |
| 14 | `READY_FOR_PUBLICATION` | Approved item prepared for release | PUBLICATION (internal checkpoint) |
| 15 | `PUBLISHED` | Target platform confirms publication | PUBLICATION (exit); RECORD (entry, path A) |
| 16 | `CANCELLED` | Production path terminated without publication | **\[Reclassified in Revision 3\]** RECORD (entry, path B) — see note below |
| 17 | `RECORDED` | Lifecycle closed | RECORD (exit, terminal) |

**Note on** `CANCELLED`**'s reclassification:** Revision 2 listed `CANCELLED` alongside `BLOCKED`/`GOVERNANCE_REVIEW`/`REVISION_REQUIRED` as an "exception state." Revision 3 corrects this: unlike `BLOCKED`/`GOVERNANCE_REVIEW`, `CANCELLED` is not a temporary overlay that later resumes normal progression — it is a permanent, one-way Lifecycle State transition that feeds Stage=RECORD, structurally identical in role to `PUBLISHED` (both are RECORD's two valid entry states, §8.2). It therefore belongs in the Lifecycle State list, not in the Exception Status model (§9). This is a terminology correction, not a behavior change — Revision 2's actual transition rules for `CANCELLED` (pre-publication only, feeds RECORD) are preserved exactly (§0.4).

**Cancellation atomicity (Revision 4 precision fix):** Revision 3's Stage–State Validity Matrix (§8.2) never listed `CANCELLED` under a pre-publication Stage row, but Revision 3's own transition-table and prose wording elsewhere (§10, §13.3, §14.3) could be read as a two-step event — "Lifecycle State becomes `CANCELLED`" first, "Stage becomes RECORD" second — which would momentarily produce an unlisted, invalid pair such as `VISUAL PRODUCTION + CANCELLED`. Revision 4 makes explicit what was always structurally intended: **Stage → RECORD and Lifecycle State →** `CANCELLED` **change together, in the same transition, with no observable intermediate step.** The Stage/State pair the item held immediately before cancellation is preserved only as history/audit metadata (§11.3, §15) — it is never the item's *current* Stage once cancellation occurs. See §10, §13.3, §14.3, §15, and Appendix C Test F.

`REVISION_REQUIRED` **does not appear in this table.** It was never a Lifecycle State a Content Item rests in; §11 defines it correctly as a transient event.

### 8.2 Stage–Lifecycle State Validity Matrix (Exception-Free)

| Stage | Valid Lifecycle States (Entry → \[Active\] → Exit) |
| -- | -- |
| INTAKE | `INTAKE` |
| DEFINITION | `INTAKE` → `DEFINED` |
| RESEARCH | `DEFINED` → `RESEARCHED` |
| PLANNING | `RESEARCHED` → `PLANNED` |
| CONTENT PRODUCTION | `PLANNED` → `IN_CONTENT_PRODUCTION` → `CONTENT_PRODUCED` |
| ASSET PREPARATION | `CONTENT_PRODUCED` → `IN_ASSET_PREPARATION` → `ASSETS_PREPARED` |
| VISUAL PRODUCTION | `ASSETS_PREPARED` → `IN_VISUAL_PRODUCTION` → `READY_FOR_QA` |
| QA | `READY_FOR_QA` → `IN_QA` → `READY_FOR_APPROVAL` |
| APPROVAL | `READY_FOR_APPROVAL` → `APPROVED` |
| PUBLICATION | `APPROVED` → `READY_FOR_PUBLICATION` → `PUBLISHED` |
| RECORD | `PUBLISHED` **or** `CANCELLED` → `RECORDED` |

No row contains `BLOCKED`, `GOVERNANCE_REVIEW`, or `REVISION_REQUIRED`. This table is now internally complete for normal lifecycle execution, and its own invariant (§5) is no longer self-contradicted.

**Atomicity clause (Revision 4):** the RECORD row's two entry paths (`PUBLISHED`, `CANCELLED`) are each reached in a single transition directly from their respective predecessor pair (§10, §15). No pre-publication Stage row in this table may ever be observed paired with `CANCELLED` — not as a resting value, not transiently, not as an intermediate step of a multi-part event. Any implementation that would set Lifecycle State to `CANCELLED` before Stage is set to RECORD violates this table and INV‑CAN‑2 (§20).

**Worked invalid example:** `Stage = QA, Lifecycle State = IN_CONTENT_PRODUCTION` — not in this table. Treated as a data-integrity fault (Exception Status → `GOVERNANCE_REVIEW`), never silently reconciled.

---

## 9. Exception Status Model

Exception Status is a separate control dimension. It may temporarily overlay a valid Stage + Lifecycle State pair; it never replaces, and never appears inside, that pair.

### 9.1 Values

| Exception Status | Meaning |
| -- | -- |
| `NONE` | Normal progression; no exception in effect. |
| `BLOCKED` | Normal progression suspended by an unresolved external dependency. Not a defect, not a governance issue (§13). |
| `GOVERNANCE_REVIEW` | Normal progression suspended pending a Canonical/Policy Ambiguity resolution by governance authority (§14). |

No third exception status is defined. `REVISION_REQUIRED` is explicitly **not** an Exception Status — it is an event (§11), gone the instant its routing is resolved, never a state the item "is in" while waiting.

### 9.2 Exception Status Validity Matrix

| Exception Status | Validity | Effect |
| -- | -- | -- |
| `NONE` | Always valid | Normal transitions permitted per §10. |
| `BLOCKED` | Only where the current Stage's own Failure Conditions (§6) list `BLOCKED` as reachable, and only while Lifecycle State ≠ `PUBLISHED` | Normal progression suspended; Stage + Lifecycle State frozen (§13). |
| `GOVERNANCE_REVIEW` | Only where the current Stage's own Failure Conditions list `GOVERNANCE_REVIEW` as reachable, only before `PUBLISHED`, and only when actually triggered by one of §12.2's seven conditions or §14's Canonical/Policy‑class test | Normal progression suspended pending resolution; Stage + Lifecycle State frozen (§14). |

### 9.3 Mandatory Invariant

`BLOCKED` **never replaces Stage.** `GOVERNANCE_REVIEW` **never replaces Stage. Neither is silently treated as a lifecycle position** — an executor asked "what Stage is this item in?" while Exception Status ≠ `NONE` answers with the frozen Stage, never with the Exception Status itself. Exception resolution always specifies what happens next explicitly (§13, §14) — an AI agent never improvises a resume point.

### 9.4 Exception Status Transition Table (new, Revision 4)

Revision 3 defined `NONE`/`BLOCKED`/`GOVERNANCE_REVIEW` and their entry/resolution logic in prose across §13 and §14, but never collected the legal moves between them in one place. This table is that collection — it adds no new logic, only makes §13/§14's existing logic explicit and enumerable.

| From Exception Status | To Exception Status | Trigger | Governed by |
| -- | -- | -- | -- |
| `NONE` | `BLOCKED` | An unresolved external dependency is identified against the current Stage's Failure Conditions | §13.1 |
| `NONE` | `GOVERNANCE_REVIEW` | One of §12.2's seven conditions is detected, or §14.2's test classifies an ambiguity as Canonical/Policy-class | §14.1 |
| `BLOCKED` | `GOVERNANCE_REVIEW` | Revalidation on attempted resumption finds the canonical basis itself changed or now conflicts | §13.2 (third outcome row) |
| `BLOCKED` | `NONE` | Dependency resolved AND revalidation confirms the frozen Stage/Lifecycle State is still valid and unchanged, or a Revision Event's routing resolves it | §13.2 (first and second outcome rows) |
| `GOVERNANCE_REVIEW` | `NONE` | A complete Governance Resolution Record is supplied with no external update required (with or without downstream invalidation) | §14.3 (first and second outcome rows) |
| `GOVERNANCE_REVIEW` | `BLOCKED` | The Resolution Record states an external canonical update is required | §14.3 (third outcome row) |

**No other cell in this 3×3 grid is reachable** — there is no `BLOCKED → BLOCKED` or `GOVERNANCE_REVIEW → GOVERNANCE_REVIEW` self-transition distinct from simply remaining in that status (§13.2's fourth outcome row; a Resolution Record found incomplete, §14.3), and there is no direct `NONE → NONE` "transition" since `NONE` is the default absence of exception.

**Constraint (restated, enforced by this table's construction):** every cell above changes Exception Status alone. None of the six listed transitions, by itself, changes Current Stage or Current Lifecycle State. A Stage/Lifecycle State change that accompanies an Exception Status change (e.g. a Revision Event resolving a `BLOCKED` item, or a cancellation resolving a `GOVERNANCE_REVIEW` item) is always a **separately declared** lifecycle transition (§10, §11, §13.3, §14.3, §15) layered on top of the Exception Status change shown here — never an implicit side effect of it.

---

## 10. Normal Lifecycle Transition Rules

This table governs Stage/Lifecycle-State changes only, under Exception Status = `NONE`. Exception Status changes are governed separately in §13/§14. Every row has an explicit, non-empty condition.

| From (Stage/State) | Condition | To (Stage/State) |
| -- | -- | -- |
| (none) | Content Item registered (STG‑01 entry) | Stage=INTAKE, State=`INTAKE` |
| INTAKE / `INTAKE` | STG‑02 Output Contract met | DEFINITION / `DEFINED` |
| DEFINITION / `DEFINED` | STG‑03 Output Contract met | RESEARCH / `RESEARCHED` |
| RESEARCH / `RESEARCHED` | STG‑04 Output Contract met | PLANNING / `PLANNED` |
| PLANNING / `PLANNED` | Required planning outputs exist AND Production Plan satisfies its Output Contract AND Format Specialization is assigned AND required inputs for Content Production are valid | CONTENT PRODUCTION / `IN_CONTENT_PRODUCTION` |
| CONTENT PRODUCTION / `IN_CONTENT_PRODUCTION` | STG‑05 Output Contract met | CONTENT PRODUCTION / `CONTENT_PRODUCED` |
| CONTENT PRODUCTION / `CONTENT_PRODUCED` | Finalized Asset Requirements satisfy their Output Contract AND required inputs for Asset Preparation are valid | ASSET PREPARATION / `IN_ASSET_PREPARATION` |
| ASSET PREPARATION / `IN_ASSET_PREPARATION` | STG‑06 Output Contract met | ASSET PREPARATION / `ASSETS_PREPARED` |
| ASSET PREPARATION / `ASSETS_PREPARED` | Validated asset set satisfies its Output Contract AND content draft finalized AND required inputs for Visual Production are valid | VISUAL PRODUCTION / `IN_VISUAL_PRODUCTION` |
| VISUAL PRODUCTION / `IN_VISUAL_PRODUCTION` | STG‑07 Output Contract met | VISUAL PRODUCTION / `READY_FOR_QA` |
| VISUAL PRODUCTION / `READY_FOR_QA` | QA review begins | QA / `IN_QA` |
| QA / `IN_QA` | Verdict = PASS | QA / `READY_FOR_APPROVAL` |
| QA / `READY_FOR_APPROVAL` | Approver decision = approve, recorded, sensitive-claims sign-off present if flagged | APPROVAL / `APPROVED` |
| APPROVAL / `APPROVED` | Release-readiness confirmed AND artifact unchanged since Approval | PUBLICATION / `READY_FOR_PUBLICATION` |
| PUBLICATION / `READY_FOR_PUBLICATION` | Platform confirms live AND published artifact is bit-for-bit the approved artifact | PUBLICATION / `PUBLISHED` |
| PUBLICATION / `PUBLISHED` | Publish record captured; full history compiled | RECORD / `RECORDED` |
| (any pre-publication Stage / valid Lifecycle State pair, Lifecycle State ≠ `PUBLISHED`) | Cancellation triggered by an explicit authorized human termination decision (§13.3/§15), including after a `BLOCKED` condition, or by governance authority resolving an unresolved policy conflict as cancellation (§14.3) — Stage and Lifecycle State change **together, atomically, in this one hop**; Exception Status (if any) resets to `NONE` as part of the same transition | RECORD / `CANCELLED` |
| RECORD / `CANCELLED` | Closure record captured; full history compiled, including the pre-cancellation Stage/State as history-only metadata (§11.3, §15) | RECORD / `RECORDED` |

Defect-driven and exception-driven transitions (QA/Approval FAIL, `BLOCKED`, `GOVERNANCE_REVIEW`, cancellation) are governed by §11 (Revision Events), §13 (`BLOCKED`), and §14 (`GOVERNANCE_REVIEW`) respectively — they are not additional rows in this table, because none of them is a normal Stage/State progression under Exception Status = `NONE`. The cancellation row above is the one exception listed directly in this table (rather than only in §13/§14) precisely because Revision 4 requires its atomicity to be visible at the transition-table level, not only in prose. No transition not listed above, in §11, §13, or §14 is valid. An executor encountering an unlisted state/condition pair treats it as a trigger for `GOVERNANCE_REVIEW`, never an improvised transition. **No executor may implement cancellation as two separate writes (State first, then Stage); it is one write, one record.**

---

## 11. Revision Event Model

`REVISION_REQUIRED` **is not a Lifecycle State.** Revision 2 named it correctly in prose ("transitional") but then used it as a state-machine node in its own transition table (an item "was in" `REVISION_REQUIRED`, then "transitioned out" of it). Revision 3 removes that node entirely. A Revision Event is a **transition outcome**, resolved in the same instant it is raised:

```text
Current Stage + Current Lifecycle State
        ↓
Revision Event  (QA or Approval finds a correctable defect)
        ↓
1. Defect Classification
        ↓
2. Affected Output(s)            (which Output Package(s) the defect is found in/against)
        ↓
3. Downstream Invalidation Scope (which further, already-produced outputs are superseded as a result)
        ↓
4. Return Target Stage
        ↓
5. Return Target Lifecycle State
```

**Field separation (Revision 4 precision fix):** Revision 3 sometimes folded "Affected Output(s)" and "Downstream Invalidation Scope" into a single "downstream invalidation" idea. They are distinct and both mandatory, mirroring the Governance Resolution Record's own field separation (§14.3): *Affected Output(s)* names what the defect was found in; *Downstream Invalidation Scope* names what else, built on top of that output, must now be treated as superseded. A defect can affect one output while invalidating several downstream of it, or vice versa — collapsing the two fields loses that distinction.

**Worked example (as specified):**

```text
QA / IN_QA
  ↓
Revision Event: Content Defect
  ↓
1. Defect Classification: Content writing defect
  ↓
2. Affected Output(s): Final visual composition (STG‑07 Output Package)
  ↓
3. Downstream Invalidation Scope: Visual Production's composition and QA's own prior verdict marked superseded (§11.2)
  ↓
4. Return Target Stage: CONTENT PRODUCTION
  ↓
5. Return Target Lifecycle State: IN_CONTENT_PRODUCTION
```

At no point does the item's Lifecycle State read `REVISION_REQUIRED` in the record — the record shows `QA/IN_QA` immediately followed by `CONTENT PRODUCTION/IN_CONTENT_PRODUCTION`, with the Revision Event's five fields (defect class, affected output(s), invalidation scope, return target Stage, return target Lifecycle State) logged as the transition's cause, not as an intervening state.

### 11.1 Defect Routing (unchanged from Revision 2, now correctly framed as event routing, not state routing)

| Defect Class | Return Target (Stage) | Concrete Lifecycle State Set To |
| -- | -- | -- |
| Content writing defect | Content Production | `IN_CONTENT_PRODUCTION` (has its own active state — re-enter directly) |
| Source/evidence defect | Research | `DEFINED` (Research's entry state — no dedicated active state) |
| Asset defect | Asset Preparation | `IN_ASSET_PREPARATION` (active state, direct re-entry) |
| Visual defect | Visual Production | `IN_VISUAL_PRODUCTION` (active state, direct re-entry) |
| Objective/audience/format/scope defect | Planning | `RESEARCHED` (Planning's entry state — no dedicated active state) |
| Canonical/policy conflict | **Not a Revision Event** | Routes to Exception Status `GOVERNANCE_REVIEW` instead (§14) |

**No-paradox rule (unchanged):** a return target is always either a stage's own Active State or, where none exists, that stage's own Entry State — never its Exit/completion state.

### 11.2 Affected Output(s) and Downstream Invalidation Scope

Two distinct, both-mandatory fields (Revision 4, §11's field-separation fix): **Affected Output(s)** identifies the specific Output Package(s) the defect was found in or against; **Downstream Invalidation Scope** identifies every further Output Package that materially depended on the affected output and must now be marked **superseded** (mirroring CAR/CAB's own registry-governance pattern, §0.1 of Revision 2's retrieval, preserved here). A Source/evidence defect (return to Research) has Affected Output(s) = the source-coverage classification, and a Downstream Invalidation Scope that reaches every output built on the affected claim; an Asset defect has Affected Output(s) = the specific asset, and a Downstream Invalidation Scope limited to Visual Production's composition. Determining the exact scope for a given defect remains a production judgment call (Production Ambiguity, §14) anchored to §11.1's table — this is distinct from, and simpler than, the Governance Resolution Record required for `GOVERNANCE_REVIEW` outcomes (§14.3), because a Revision Event's routing is already fully determined by its defect class.

### 11.3 Historical Integrity

Unchanged from Revision 2: a Revision Event never deletes previous outputs, QA verdicts, decisions, or governance events. Each becomes a superseded record, retained for audit.

---

## 12. Quality Gates and Transition Conditions

**Terminology correction (Revision 3):** Revision 2 stated "every transition is a gate." This is imprecise and is withdrawn. The correct statement:

> Every transition is governed by an explicit transition condition (§10). A small number of transitions are additionally formal **Quality Gates** — points where a cross-functional or human-authority boundary is crossed, not merely an internal handoff.

### 12.1 The Three Quality Gates

| Gate | Between | Enforces |
| -- | -- | -- |
| **Gate-QA** | Visual Production → QA | No item enters QA without a complete, self-checked composition. |
| **Gate-Approval** | QA → Approval | No item reaches an approver without a recorded PASS verdict. |
| **Gate-Publication** | Approval → Publication | No item publishes without a recorded, authorized human approval decision. |

Every other transition in §10 is an ordinary transition condition — internally enforced by the departing stage's Output Contract and the arriving stage's Input Preconditions (§6), but not a named Gate. Calling every transition a "Gate" diluted the term to the point where the three that actually matter for cross-functional/human-authority control were indistinguishable from routine internal handoffs; that ambiguity is removed here.

### 12.2 Governance Interrupt Conditions

**Renamed from "governance interrupt gate" (Revision 2) to avoid implying a fourth formal Gate.** Any of the following, detected before `PUBLISHED`, is grounds to set Exception Status = `GOVERNANCE_REVIEW` (§14) rather than continuing production: source coverage gap; canonical conflict; outdated source; policy conflict; asset canonicality problem; unresolved ambiguity; governance violation. Per §14, these are reserved for genuinely Canonical/Policy-class issues.

### 12.3 QA Criteria Ownership — Resolved (v1.8); Revision 3/4 Correction Preserved as History

**\[Current state, v1.8\]** B‑5 is resolved. The CWC QA Mechanism (CWC-QA-001) is canonical, and per its own §18 the CWC domain Owner holds authority over QA criteria content (Owner Decision OD‑2 / [BUS-38](https://linear.app/bussiness-content-os/issue/BUS-38/owner-decision-required-b-5-cwc-qa-mechanism-ownership-and-criteria)) — distinct from, and never overriding, this Workflow's own lifecycle authority. This Workflow does not own, restate, or fall back to any QA checklist; it consumes "applicable QA criteria" solely as a Required Input to STG‑08 (§6), through the channel this Workflow's own architecture already reserved before CWC-QA-001 existed. Recognizing that a canonical owner now exists does not create a `Depends On` relationship — see §0.1h and §21 for why a Required-Input channel is not treated as a Root Level Architecture §8.6 dependency here.

> **Current bounded statement (v1.8):** Verify that the QA verdict is recorded and that every FAIL has an identified defect classification and routing target. Detailed QA acceptance criteria and checklist ownership are the canonical CWC QA Mechanism's (CWC-QA-001's) authority — supplied to STG‑08 as a Required Input, not restated or interpreted by this Workflow.

**\[Preserved history, Revision 3/4 — unchanged in substance\]** Revision 2 stated that, pending resolution of the QA-Document question, "STG‑08's Output Contract falls back to CPB's Core Production Principles as the interim minimum criteria set." Re-reading the retrieved CPB text (§0.1) did not support this as a stated fallback — CPB never designates its Core Production Principles as a QA checklist, and never authorizes this Workflow to promote them into one. That claim was withdrawn in Revision 4. What **is** source-supported, and is retained: CPB Ch.1 §4 states "no chapter may contradict the Core Production Principles" (FND‑010) — a constraint on all CWC production output regardless of whether a QA stage exists to check it, not a QA checklist. At the time Revision 4 was written, who owned the checklist — and whether one even existed — remained **\[UNCONFIRMED SOURCE\]**, Open Decision §21 B‑5. Revision 4's own bounded statement, preserved here verbatim for provenance: *"Verify that the QA verdict is recorded and that every FAIL has an identified defect classification and routing target. Detailed QA acceptance criteria and checklist ownership are external to this Workflow unless an authoritative owner is explicitly established."* That condition — an authoritative owner being explicitly established — is what v1.8 now records as satisfied, above.

---

## 13. Exception Handling — BLOCKED

**BLOCKED = valid work + unresolved external dependency.** Never a quality defect, factual error, QA failure, or governance conflict. Examples: stakeholder decision pending; external asset delivery pending; platform outage; required canonical update pending.

### 13.1 Entry

Exception Status transitions `NONE → BLOCKED` when a Stage's Failure Conditions (§6) identify an external dependency. Stage and Lifecycle State are frozen at their current values (§9.3) — never reassigned to `BLOCKED` itself.

### 13.2 Resumption Requires Revalidation — Mandatory Correction

Revision 2's rule ("dependency resolved → resume originating state") assumed nothing else could have changed while blocked. This is corrected:

> When a `BLOCKED` dependency is resolved, the frozen Stage + Lifecycle State is revalidated against its Input Preconditions and relevant Output Contracts (§6) before normal execution resumes — it is never blindly resumed.

| Revalidation outcome | Result |
| -- | -- |
| Valid and unchanged | Exception Status → `NONE`; resume the frozen Stage + Lifecycle State normally. |
| Inputs changed, but the correction is production-class | A **Revision Event** is raised (§11), routed per §11.1 by defect class; Exception Status → `NONE` as part of that routing. |
| The canonical basis itself changed or now conflicts | Exception Status → `GOVERNANCE_REVIEW` (still the same frozen Stage + Lifecycle State, or an updated one if §14's resolution record says so). |
| Dependency remains unresolved | Exception Status remains `BLOCKED`. |

### 13.3 Cancellation from BLOCKED — Atomic Transition

There is **no automatic threshold** for cancellation from `BLOCKED` (Owner decision B‑2 / [BUS-36](https://linear.app/bussiness-content-os/issue/BUS-36/owner-decision-required-b-2-blocked-to-cancelled-escalation-threshold), 2026-09-13). Remaining `BLOCKED` for any duration, or after any number of retries, does not by itself cancel an item. Cancellation occurs only through an explicit authorized human decision, applied atomically as described below. **This is one atomic transition, not two sequential changes:** the frozen Stage (whatever it was) and the frozen Lifecycle State are replaced *together, in the same transition* by Stage = RECORD, Lifecycle State = `CANCELLED`; Exception Status resets to `NONE` as part of that same transition (since `CANCELLED` is a Lifecycle State, not an exception overlay, §8.1). At no point is Lifecycle State observed as `CANCELLED` while Stage still reads its pre-cancellation value. The pre-cancellation Stage and Lifecycle State are retained in the item's history/audit trail (§11.3) — never as its current position once this transition completes. Only reachable while Lifecycle State ≠ `PUBLISHED` (§15).

```text
Before:  Stage = <frozen Stage>, Lifecycle State = <frozen State>, Exception Status = BLOCKED
                                        ↓  (one atomic transition — §10)
After:   Stage = RECORD, Lifecycle State = CANCELLED, Exception Status = NONE
         (<frozen Stage>, <frozen State> retained in history only — §11.3, §15)
```

---

## 14. Exception Handling — GOVERNANCE_REVIEW

Formalized in Revision 3 to follow the identical architecture as `BLOCKED`: it preserves Stage + Lifecycle State while suspending normal progression, rather than behaving as a destination state.

### 14.1 Entry

Exception Status transitions `NONE → GOVERNANCE_REVIEW` when one of §12.2's seven conditions is detected, or when §14.2's test classifies an ambiguity as Canonical/Policy-class. Stage and Lifecycle State are frozen.

```text
Before:            Stage = RESEARCH, Lifecycle State = DEFINED, Exception Status = NONE
Governance trigger: Stage = RESEARCH, Lifecycle State = DEFINED, Exception Status = GOVERNANCE_REVIEW
```

### 14.2 Production Ambiguity vs. Canonical/Policy Ambiguity — Deterministic Test

**Production Ambiguity** — resolvable using existing canonical standards and the authority already granted to the stage. CPB grants exactly this discretion explicitly (Ch.1 §3 AIP‑003: "AI may choose any reasoning path that preserves Canonical Decisions"; Ch.7 §7.1: "Implementation Freedom: AI MAY determine visual implementation provided Canonical Identity is preserved… Implementation techniques are never Canonical Decisions"). Resolved in-stage; Exception Status stays `NONE`.

**Canonical/Policy Ambiguity** — cannot be resolved without interpretation, amendment, conflict resolution, or an authority decision beyond what an existing rule already settles. Sets Exception Status = `GOVERNANCE_REVIEW`.

**Deterministic test:** *Does an existing, unambiguous canonical rule (CPB, CAS, CAR, CAB, CRS, or this Workflow) already settle the question without new interpretation, a new exception, or an amendment?* Yes → Production Ambiguity, resolve in-stage, cite the rule. No — no applicable rule, the closest rule requires judgment it doesn't specify, or two rules conflict — → Canonical/Policy Ambiguity → `GOVERNANCE_REVIEW`.

### 14.3 Resolution — Mandatory Governance Resolution Record

**Mandatory correction (Revision 3):** an AI agent must never independently guess the resume point or invalidation scope after a governance correction. Whenever governance authority (human, §18) supplies a resolution, it must explicitly declare, as a single record:

1. **Resolution** — what was decided.
2. **Affected output(s)** — which Output Packages the resolution touches.
3. **Downstream invalidation scope** — which further outputs are superseded as a result.
4. **Resume target Stage.**
5. **Resume target Lifecycle State.**
6. **Whether an external canonical update is required** (yes/no).

**If this record is incomplete — the governance authority has not supplied enough to determine the return point — the item does not improvise. It remains in** `GOVERNANCE_REVIEW`**.** This is an execution-safety rule, not a formality.

Given a complete record, four outcomes:

| Governance authority's resolution | Effect |
| -- | -- |
| Correction supplied, **no** completed work invalidated | Exception Status → `NONE`; resume the exact frozen Stage + Lifecycle State (§14.1). |
| Correction supplied, completed work **is** invalidated | Exception Status → `NONE`; Lifecycle State set to the declared Resume Target (an Entry or Active State, per §11.1's no-paradox rule); declared downstream outputs marked superseded (§11.2). |
| External canonical update required | Exception Status → `BLOCKED` (§13), preserving the same frozen Stage + Lifecycle State, pending that update. |
| Unresolved / confirmed policy conflict | **Atomic cancellation** (only reachable if current Lifecycle State ≠ `PUBLISHED`, §15): Stage → RECORD and Lifecycle State → `CANCELLED` change **together, in the same transition** (§10, §13.3, §15) — never Lifecycle State changing first while Stage is still held at its frozen pre-conflict value. Exception Status resets to `NONE` as part of that same transition. The frozen pre-cancellation Stage/Lifecycle State is preserved in history only (§11.3). |

No production stage and no AI agent resolves a Canonical/Policy Ambiguity on its own initiative; only governance authority may supply the record above (§18). **A Governance Resolution Record must never state a resume point as "resume previous stage" or any other unnamed target — the Resume Target Stage and Resume Target Lifecycle State fields (items 4–5 above) are always named explicitly, or, for the cancellation outcome, the record explicitly names RECORD/**`CANCELLED` **as the atomic destination rather than any "previous" location.**

---

## 15. Post-Publication Boundary and Cancellation Boundary

`PUBLISHED` **and** `CANCELLED` **are RECORD's two symmetric entry paths — both one-way, both atomic, neither reversible.** Revision 4 states both explicitly and symmetrically, correcting Revision 3's asymmetric treatment (PUBLISHED given a diagram; CANCELLED left to scattered prose).

**Path A — Publication:**

```text
PUBLICATION / READY_FOR_PUBLICATION
        ↓  (Output Contract met — §6 STG‑10)
PUBLICATION / PUBLISHED
        ↓  (one atomic transition — §10)
RECORD / RECORDED
```

**Path B — Cancellation:**

```text
(any pre-publication Stage / valid Lifecycle State pair, Lifecycle State ≠ PUBLISHED)
        ↓  (§13.3 explicit authorized cancellation after BLOCKED, or §14.3 governance-authorized cancellation, or direct authorized human termination — one atomic transition)
RECORD / CANCELLED
        ↓  (one atomic transition — §10)
RECORD / RECORDED
```

Both paths terminate at `RECORDED` (§19); neither path's terminal Lifecycle State (`PUBLISHED` or `CANCELLED`) is itself the completion point — RECORD/`RECORDED` is.

**Atomicity (applies identically to both paths):** the Stage change and the Lifecycle State change happen together, in a single transition, with no observable intermediate step. For Path B specifically: an implementation must never set Lifecycle State to `CANCELLED` while Stage still reads its pre-cancellation value, even momentarily — that would produce a pair absent from §8.2 (e.g. `VISUAL PRODUCTION + CANCELLED`), which is a data-integrity fault, not a valid transient state (§8.2, INV‑CAN‑2).

**History-only preservation (Path B):** the Stage and Lifecycle State the item held immediately before cancellation are retained in the item's history/audit trail (§11.3) — visible in the RECORD‑stage closure record (§6 STG‑11) as "cancelled from `<Stage>` / `<Lifecycle State>`" — but are never the item's *current* Stage or Lifecycle State once the cancellation transition completes. The same non-reversal logic that governs Path A after `PUBLISHED` governs Path B after `CANCELLED`: once RECORD/`CANCELLED` is reached, the item never returns to a production Stage, and neither Exception Status may be set again (§9.2).

**One-way boundary (applies identically to both paths):** after Lifecycle State = `PUBLISHED` **or** `CANCELLED`, the item never returns to a production Stage; Exception Status may never be set to `BLOCKED`; Exception Status may never be set to `GOVERNANCE_REVIEW`; Lifecycle State may never change to anything other than `RECORDED`. This holds for both dimensions independently — neither the Stage/State pair nor the Exception Status overlay may move once either terminal Lifecycle State is reached.

`CANCELLED` is reachable only while Lifecycle State ≠ `PUBLISHED` (Path A and Path B are mutually exclusive for a given Content Item — once Path A is entered, Path B is permanently foreclosed, and vice versa).

If a published Content Item is later found to have a problem: **post-publication correction, withdrawal, takedown, or incident handling is outside the Core Production Workflow and requires a separate control process**, not defined in this document.

---

## 16. Asset Lifecycle Integration

Lifecycle architecture remains inherited from Revision 2. Assets follow the CAS Canonical Lifecycle (`DRAFT → REVISION CANDIDATE → CANONICAL → CANONICAL LOCKED`, `SUPERSEDED` from any state, CAS §6) — distinct from the Content Item's own Stage/Lifecycle State/Exception Status model. CAS v1.17 additionally defines the Asset Production Behavior Model; Production Behavior is orthogonal to lifecycle and answers **how** an eligible authoritative asset enters production. CAR owns identity; CAB owns specification plus one primary Production Behavior assignment per production-use asset; CRS owns authoritative production-file/reference/token documentation and mapping. Asset Preparation validates lifecycle eligibility, mode assignment, and mode inputs; Visual Production executes the validated mode. A `CANONICAL LOCKED` asset may not be changed by a production stage's own initiative — a need to alter locked canonical identity/spec/reference remains a Canonical/Policy Ambiguity (§14). `EXACT_REUSE` assets are retrieved and placed/composited from approved CRS production files with no generative reconstruction; `GENERATIVE_REFERENCE` assets yield controlled production derivatives under CAB rules using CRS reference hierarchy; `TOKEN_CONTROLLED` assets apply canonical values deterministically rather than placing the reference image itself. If exact-reuse retrieval/placement is technically unavailable, the controlled CRS Reserved Area/manual-placement mechanism remains fallback; fabrication is prohibited.

## 17. Format Specialization

Unchanged from Revision 2 in architecture. Format specifications extend Core stages; they never fork, skip, or redefine them. **\[Current state\]** The CWC Format Specialization Specification (FSS‑001) is canonical — this Workflow intentionally refers to its **current canonical state** without pinning a lateral revision number. It was authored as a separate artifact per point 5 below, after this document was locked, exactly as this section anticipated. Recognizing FSS‑001's existence does not alter this section's architecture and does not create a reverse dependency from this Workflow to FSS‑001 (§21).

```text
CWC Core Production Workflow
│
├── Poster Production Specification
├── Carousel Production Specification
├── Reel Production Specification
├── Story Production Specification
└── [other formats, added without modifying the Core]
```

1. Selected once, in Planning (STG‑04).
2. May add production steps within a Core stage's boundaries, but must still enter/exit through the Core transitions (§10).
3. May not introduce a new top-level Stage, skip a Core stage, or bypass a Quality Gate (§12.1).
4. May not redefine Lifecycle State or Exception Status values (§8, §9); may only add format-specific sub-status as metadata within a Core state.
5. Built as separate artifacts after this document is locked, never inside it — **realized**: the CWC Format Specialization Specification (FSS‑001) exists and is canonical, authored as exactly such a separate, extension-only artifact (§21).

### 17.1 Production Alias — Format-Specific Operational Naming

A **Production Alias** is an operational shorthand for applying the CWC Core Production Workflow together with one selected Format Specialization. A Production Alias is **not** a separate Production Workflow, does not create a new governed lifecycle document, and has no independent authority over Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, cancellation, approval, publication, or record semantics.

Canonical resolution rule:

```text
Production Alias
  = CWC Core Production Workflow
  + selected Format Specialization
```

Initial Production Aliases:

| Production Alias | Resolves To | Architectural Status |
| -- | -- | -- |
| **Produksi CWC Poster** | CWC Core Production Workflow + Poster Format Specialization | Operational alias only; not a separate workflow |
| **Produksi CWC Carousel** | CWC Core Production Workflow + Carousel Format Specialization | Operational alias only; not a separate workflow |
| **Produksi CWC Reels** | CWC Core Production Workflow + Reels Format Specialization | Operational alias only; not a separate workflow |

Rules:

1. A Production Alias may be used in prompts, production tasks, Linear work items, operating instructions, and human-readable production communication.
2. Every alias must resolve back to the Core Workflow plus the applicable Format Specialization; it may never define a competing Stage sequence or state machine.
3. Format-specific steps may exist only within the boundaries permitted by §17; they may not fork, skip, or redefine Core Stages, Lifecycle States, Exception Statuses, or Quality Gates.
4. If alias-level wording conflicts with the Core Workflow or the governing Format Specialization, the canonical Core Workflow and applicable Format Specialization prevail.
5. A Production Alias does not require a separate document identifier merely because the alias exists. Any governed format-specific specification retains its own existing identity and authority.
6. Additional format aliases may be added using the same pattern without creating a new top-level Production Workflow, provided the underlying format remains conformant with §17.

This permits teams and AI agents to say **“Produksi CWC Poster”** or **“Produksi CWC Carousel”** operationally while preserving one canonical lifecycle authority.

## 18. Human Approval Points

| Checkpoint | Why mandatory | Source grounding | AI agent role |
| -- | -- | -- | -- |
| **Approval decision (STG‑09)** | Publication authority is a human accountability act. | CPB AIP‑002 (Ch.1 §3): "Canonical Decisions define constraints, not reasoning steps." | May recommend; does not decide. **This checkpoint is settled and unweakened** — nothing in Revision 3 or Revision 4 places any part of ordinary Approval under `OWNER DECISION REQUIRED`; that tag applies only to the separate sensitive-claims row below. |
| **Sensitive-claims handling within STG‑09 Approval** | Material-harm-risk claims require explicit human review evidence before approval. This is **not a separate checkpoint**; it is a conditional evidence requirement inside STG‑09. | Owner decision B‑6 / [BUS-39](https://linear.app/bussiness-content-os/issue/BUS-39/owner-decision-required-b-6-sensitive-claims-flag-criteria-and) (2026-09-13), informed by CPB Core Production Principles CP‑003 Medical Accuracy, CP‑004 Educational Integrity, and CP‑005 Non‑Stigmatizing Communication. `SENSITIVE_CLAIM = YES` when the Content Item contains medical/health or safety claims where inaccuracy may materially affect care-seeking, treatment, prevention, adherence, testing, diagnosis/status, prognosis, risk perception, medication/dosage/interaction/contraindication, HIV/STI transmission or prevention efficacy, treatment outcomes, safety-critical behavior, or harmful framing involving vulnerable populations. Emotional sensitivity alone is insufficient; the trigger is material harm risk from inaccuracy or harmful framing. | May identify/flag candidate sensitive claims and present evidence, but may not supply the required human sign-off. A flagged item cannot satisfy STG‑09 Approval until explicit human review/sign-off is recorded. |
| **Governance exception resolution (§14)** | Interpreting or amending canonical material is an authority decision. | CAS §6: "Promotion between states… is an Owner decision… not automatic." | Surfaces the trigger and evidence; does not decide, and must supply the full Resolution Record (§14.3) before the item may resume — the "must supply" obligation falls on governance authority, not the agent. |
| **Publication authorization (STG‑10 entry)** | Making content public is the final human control point before external exposure. | Consistent with the Post-Publication Boundary (§15). | Executes the mechanical publish action once authorization is recorded; does not self-authorize. |

There remain three human checkpoints in this table: STG‑09 Approval, Governance exception resolution, and Publication authorization. Sensitive-claims handling is a **conditional evidence requirement within STG‑09**, not a fourth checkpoint and not eligible for AI self-approval. Everything else is subject to §4 principle 12's conditional-determinism formulation.

## 19. Completion Criteria

Unchanged from Revision 2. A Content Item is complete when Lifecycle State = `RECORDED`. `PUBLISHED` alone is not completion. A `CANCELLED` item also reaches completion once `RECORDED`.

---

## 20. Workflow Invariants

Reorganized to reflect the three-dimension model (Stage / Lifecycle State / Exception Status). Categories unchanged from Revision 2 where the underlying rule didn't change; several statements are tightened for the new model.

**Stage–Lifecycle State Integrity**

* INV‑ST‑1 — A Content Item holds exactly one Stage and one Lifecycle State at a time, always a valid pair per §8.2.
* INV‑ST‑2 — `BLOCKED`, `GOVERNANCE_REVIEW`, and `REVISION_REQUIRED` never appear as values inside the Stage–Lifecycle State Validity Matrix (§8.2). This is the specific Revision 3 correction.

**Exception Status Integrity** *(new category, Revision 3)*

* INV‑EX‑1 — Exception Status is `NONE`, `BLOCKED`, or `GOVERNANCE_REVIEW` only; no other value is defined.
* INV‑EX‑2 — Setting an Exception Status never reassigns Stage or Lifecycle State; both remain frozen at their pre-exception values until resolution explicitly changes them (§13, §14).
* INV‑EX‑3 — Neither exception status is reachable once Lifecycle State = `PUBLISHED` (§15).

**Input Integrity**

* INV‑IN‑1 — A stage cannot execute without its Required Inputs present and Input Preconditions satisfied (§6).

**Output Integrity**

* INV‑OUT‑1 — A stage cannot hand off without an Output Package satisfying its own Output Contract (§6, §7).

**Handoff Integrity**

* INV‑HO‑1 — Every normal transition has an explicit producer, output, contract, validation, and consumer (§7).

**Transition Integrity**

* INV‑TR‑1 — Only transitions listed in §10, §11, §13, or §14 are valid; every condition is explicit and non-empty. An unlisted pair routes to `GOVERNANCE_REVIEW`, never an improvised transition.

**Revision Integrity**

* INV‑REV‑1 — `REVISION_REQUIRED` is never a Lifecycle State; it is a Revision Event, resolved in the same instant it is raised (§11).
* INV‑REV‑2 — Every Revision Event carries a defect classification, a return target resolved per §11.1's no-paradox rule, and a downstream-invalidation scope (§11.2).
* INV‑REV‑3 — A Revision Event never deletes history (§11.3).

**Governance Integrity**

* INV‑GOV‑1 — Canonical/Policy Ambiguity is never resolved silently inside a production stage (§14); Production Ambiguity is never escalated needlessly (§14.2).
* INV‑GOV‑2 — A `GOVERNANCE_REVIEW` resolution is only actioned once the full six-part Resolution Record (§14.3) is supplied; an incomplete record leaves the item in `GOVERNANCE_REVIEW`.

**BLOCKED Integrity** *(new category, Revision 3)*

* INV‑BLK‑1 — Resuming from `BLOCKED` always revalidates the frozen Stage + Lifecycle State against current Input Preconditions and Output Contracts before normal execution resumes (§13.2); it is never blindly resumed.

**Approval Integrity**

* INV‑APP‑1 — No publication without a recorded, authorized human approval decision (Gate‑Publication, §12.1).

**Publication Boundary**

* INV‑PUB‑1 — `PUBLISHED` cannot transition back into any production Stage/Lifecycle State, and neither Exception Status may be set, once reached (§15).

**Publication Readiness Integrity**

* **INV‑PUB‑2** — `READY_FOR_PUBLICATION` requires an explicit **Approved Release Identity** that binds the current approved publication copy/caption and exact publishable artifact set; the evidence may use checksums, immutable storage/version identifiers, or another deterministic identity mechanism.
* **INV‑PUB‑3** — Publication manifests, downloadable bundles, ZIP archives, and provider-specific files are implementation artifacts only. They may support Approved Release Identity but never become lifecycle authority.
* **INV‑PUB‑4** — Any mutation after STG‑09 Approval and before platform-confirmed publication invalidates the readiness lock and routes through the existing Revision Event to APPROVAL; `PUBLISHED` is never inferred from package preparation alone.

**Cancellation Boundary**

* INV‑CAN‑1 — `CANCELLED` cannot be reached once Lifecycle State = `PUBLISHED` (§15).
* INV‑CAN‑2 — *(new, Revision 4)* `CANCELLED` never pairs with any Stage other than RECORD — not as a resting value, not transiently, not as an observable intermediate step. Stage → RECORD and Lifecycle State → `CANCELLED` change together in one atomic transition (§10, §13.3, §14.3, §15). A pair such as `<any non-RECORD Stage> + CANCELLED`, however momentary, is a data-integrity fault, routed to `GOVERNANCE_REVIEW` exactly as any other pair absent from §8.2.
* INV‑CAN‑3 — *(new, Revision 4)* The Stage/Lifecycle State pair a Content Item held immediately before cancellation is preserved in history/audit metadata only (§11.3); it is never the item's current Stage or Lifecycle State once RECORD/`CANCELLED` is reached.

**Closure Integrity**

* INV‑CLO‑1 — Every path (published or cancelled) reaches `RECORDED` (§19).

**Format Integrity**

* INV‑FMT‑1 — Format Specifications extend Core stages and never redefine Core Lifecycle States or Exception Statuses (§17).

**Tool Independence**

* INV‑TOOL‑1 — No lifecycle rule names or depends on a specific tool (§21, relationship table).

---

## 21. Relationship to Other CWC Systems

Relationship boundaries remain inherited from Revision 2, with current-state updates for QA/FSS and the CAS v1.17 / CAR v1.18 / CAB v1.35 / CRS v1.22 Production Behavior execution contract. Google Drive and Canva remain implementation bindings only; they do not own lifecycle, Production Behavior semantics, per-asset assignment, or asset authority.

| System | Relationship | Authority Boundary (as retrieved) | What this workflow consumes | What this workflow does not own |
| -- | -- | -- | -- | -- |
| **CPB** | Craft/philosophy authority within stages. | Ch.1 §6 establishes the production-knowledge boundary; Ch.2 §2.7, Ch.3 §3.6, Ch.4 §4.7, and Ch.7 §7.3/§7.4 explicitly exclude Production/Publication Workflow from those chapters' scope. Ch.1, Ch.5, and Ch.6 support the separation only by inference/context and are not cited as explicit per-chapter exclusions. | Core Production Principles (background context for §18, not a QA checklist, §12.3); six-system visual sequence (§6 STG‑07); Editorial Validation Standard and AI-First Philosophy (§6 STG‑05, §14.2). | Editorial/visual/brand content itself — remains CPB's, only referenced. |
| **CAS** | Architecture for the asset ecosystem. | §1: separate CWC asset concern; §6 owns Canonical Lifecycle semantics; §7 owns Production Behavior Mode semantics. | Canonical Lifecycle eligibility and the `EXACT_REUSE` / `GENERATIVE_REFERENCE` / `TOKEN_CONTROLLED` execution model (§16). | Individual asset identity, per-asset mode assignment/specification, or visual/reference mapping. |
| **CAR** | Identity/registration authority. | Own Authority boundary field: "owns identity and registration, not asset specifications or visual-reference detail." | "CAR-identified" as STG‑06's Output Contract term. | Specification or visual-reference content. |
| **CAB** | Specification and per-asset Production Behavior assignment authority. | CAB owns asset specifications and, under CAS §7, exactly one primary Production Behavior Mode plus asset-specific execution/QA constraints for each production-use asset. | Specification conformance, primary mode assignment, and asset-specific execution/QA constraints in STG‑06/STG‑07. | Identity or CRS file/reference mapping. |
| **CRS** | Authoritative visual/reference documentation and production-file/reference mapping authority. | CRS §1 **Source-of-truth boundary**; current CRS v1.22 maps approved exact-reuse production files, AS-002 generation references, token-reference documentation, and controlled fallback/reference assets. | The authoritative production file/variant for `EXACT_REUSE`; authoritative GENREF hierarchy for `GENERATIVE_REFERENCE`; token-reference documentation for `TOKEN_CONTROLLED`; Reserved Area fallback where applicable. | Identity, Production Behavior semantics, or per-asset specification/mode assignment. |
| **CWC QA Mechanism (CWC-QA-001)** | Criteria-content and checklist authority for STG‑08 (§6, §12.3). **\[Current state\]** Canonical; this Workflow intentionally consumes its current canonical criteria through the existing Required-Input channel without pinning a lateral revision number; B‑5 resolved. | CWC-QA-001 §18: the CWC domain Owner holds authority over QA criteria content (Owner Decision OD‑2 / [BUS-38](https://linear.app/bussiness-content-os/issue/BUS-38/owner-decision-required-b-5-cwc-qa-mechanism-ownership-and-criteria)), distinct from this Workflow's own lifecycle authority; CWC-QA-001 §5 states it has no authority to override this Workflow, CPB, CAS, CAR, CAB, or CRS. | "Applicable QA criteria" as STG‑08's Required Input (§6) — a Required-Input channel this Workflow's own architecture already reserved, not a `Depends On` relationship (§0.1h, §12.3). | QA checklist content, criteria maturity, and QA Record schema — CWC-QA-001's own (§12.3). |
| **Format-Specific Production Specifications (CWC Format Specialization Specification, FSS‑001)** | Extend the Core per §17. **\[Current state\]** Canonical; this Workflow intentionally refers to the current canonical FSS state without pinning a lateral revision number; authored as exactly the separate, extension-only artifact §17 anticipated. | FSS‑001 specializes format behavior within Core Stage boundaries; never forks, skips, or redefines Core Stage, Lifecycle State, or Exception Status (§17). | The general fact that a Format Specialization is assigned once, in Planning (§6 STG‑04, §10) — not FSS‑001's own content. | Format-specific production steps and criteria — FSS‑001's own (§17); no reverse `Depends On` from this Workflow to FSS‑001. |
| **Linear** | Work-tracking implementation surface. | Not a canonical content dependency. | Only that Stage/State/Exception Status must be representable as fields. | Board schema, automation config. |
| **GitHub** | Version-control implementation surface. | Not retrieved. | Nothing prescriptive. | Branching model. |
| **Google Drive** | Current operational repository binding for approved canonical CWC production files and visual/generation references. | Implementation surface only; CAS/CAB/CRS own mode semantics, assignment, constraints, and mapping. Repository location creates no asset identity, lifecycle, or Production Behavior authority. | Retrieval of approved exact-reuse files (currently including AS-001, AS-004, AS-005) and authoritative generation/reference inputs when required by CAB/CRS. | Asset identity, specification, canonical status, Production Behavior semantics/assignment, or workflow lifecycle semantics; the repository is replaceable (INV‑TOOL‑1). |
| **Canva** | Current Visual Production implementation surface and fallback manual-placement surface. | Implementation binding, subordinate to CAB/CRS placement rules. | The general fact a visual composition surface exists; manual placement when direct placement is technically unavailable. | Canva-specific technique or mandatory lifecycle semantics; replaceable (INV‑TOOL‑1). |

---

## Appendix A — Architectural Audit Log (Revision 3 audit preserved; Revision 4 audit added)

Per instruction, this is not a copy of the Revision 2 audit. Each item is re-checked against the actual document text, and marked `YES` only where the document structurally demonstrates it — `CONDITIONAL`, `OPEN`, or `UNCONFIRMED` otherwise. A.1 and A.2 are the Revision 3 audit, preserved unchanged (none of their bases were altered by the Revision 4 wording fixes). A.3 is the new Revision 4–specific audit (items A–F, as required).

### A.1 — Revision 3–Specific Tests (Required Minimum)

| \# | Test | Result | Basis |
| -- | -- | -- | -- |
| R1 | Stage vs Lifecycle State vs Exception Status formally separated? | **YES** | §5 defines three distinct fields; §8 governs only Stage/State; §9 governs only Exception Status; neither table references the other's values. |
| R2 | Exception statuses do not violate the Stage–State validity invariant? | **YES** | §9.3: exception resolution never reassigns Stage/State except through an explicit, declared transition (§13.2, §14.3); §8.2 contains no exception values to violate. |
| R3 | `REVISION_REQUIRED` is not a Lifecycle State? | **YES** | Removed from §8.1's table entirely; §11 defines it as an event resolved in the same instant it's raised; §10's transition table has no `REVISION_REQUIRED` row. |
| R4 | Governance Review does not create an invalid Stage–State pair? | **YES** | §14.1: entry freezes the existing (already-valid) pair; §14.3's four outcomes either resume that same valid pair or move to another Entry/Active State already listed in §8.2. |
| R5 | `BLOCKED` resume performs revalidation? | **YES** | §13.2's four-outcome table, replacing Revision 2's blind-resume rule. |
| R6 | Governance resolution declares invalidation scope? | **CONDITIONAL** | §14.3 makes the six-part Resolution Record structurally mandatory and forbids improvisation on an incomplete record — but whether any *specific real* governance resolution actually supplies it depends on the human governance authority's own compliance, which this document cannot guarantee. The design passes; real-world execution is conditional on human input. |
| R7 | QA ownership is not silently invented? | **YES**, underlying question still **UNCONFIRMED** | §12.3 explicitly withdraws Revision 2's unsupported fallback claim and states the gap plainly; the QA-owner question itself remains open (§21 B‑5) — disclosure achieved, the fact disclosed is still unresolved. |
| R8 | Sensitive-claims criteria are not silently invented? | **YES**, underlying criteria still **UNCONFIRMED** | §18 separates "the architectural decision to have a flag" (retained, this Workflow's own choice) from "the criteria for assigning it" (Open Decision, §21 B‑6) — same disclosure pattern as R7. |
| R9 | Transition conditions and Quality Gates are semantically distinct? | **YES** | §12 explicitly withdraws "every transition is a gate" and names exactly three Gates; §10's transitions are called transition conditions throughout. |
| R10 | AI determinism claims are conditional where external authority is required? | **YES** | §4 principle 12 and Appendix A.2 #21 below both use the conditional formulation; the four Human Approval Points (§18) are explicitly carved out. |

### A.2 — Original 26-Point Audit, Re-Run

Items unaffected by the Stage/State/Exception correction are marked unchanged; items touched by it are re-verified against the new text.

| \# | Test | Result |
| -- | -- | -- |
| 1–2 | Stage sequence sound; formats addable without Core change | **YES**, unchanged — §5, §17. |
| 3 | Asset lifecycle separate from Content Item lifecycle | **YES**, unchanged — §16. |
| 4 | QA is a gate, not just an activity | **YES**, re-verified under new terminology — Gate‑QA (§12.1) still requires a recorded verdict (§6 STG‑08); "gate" now used precisely. |
| 5 | Revision has a clear return path | **YES**, re-verified — §11.1's table, now framed as event routing, not state routing. |
| 6 | Governance can halt any (pre-publication) stage | **YES**, re-verified — §14.1, via Exception Status, not a Stage/State value. |
| 7 | Publication only after approval | **YES**, unchanged — Gate‑Publication, §12.1. |
| 8 | AI-agent executable without undocumented interpretation | **CONDITIONAL**, re-scoped — see R10 above and §4 principle 12; no longer claimed absolute. |
| 9 | Not over-detailed / not encroaching on SOP | **YES**, unchanged. |
| 10 | No redundant state | **YES**, re-verified — `CANCELLED` reclassified (§8.1 note) rather than duplicated; `REVISION_REQUIRED` removed rather than left redundant. |
| 11 | Every Lifecycle State has a valid transition | **YES**, re-verified against the exception-free §8.2/§10. |
| 12 | Valid if Canva replaced | **YES**, unchanged — INV‑TOOL‑1. |
| 13–18 | BLOCKED/REVISION/PUBLISHED/CANCELLED/RECORDED semantics | **YES**, re-verified under the new model — §13, §11, §15 (twice, both dimensions), §19. |
| 19–20 | Asset lifecycle distinct; format specs extend | **YES**, unchanged — §16, §17. |
| 21 | AI agents determine valid next transitions without undocumented interpretation | **CONDITIONAL** — restated per §4 principle 12; true only where contracts/specs/human decisions are actually resolved, false (by design — routes to exception/human checkpoint) otherwise. Revision 2's unconditional "YES" here was itself the defect §13 of the correction prompt flagged. |
| 22 | Tool references remain bindings | **YES**, unchanged. |
| 23 | No section takes over CPB/CAS/SOP/QA/agent architecture | **YES**, strengthened — §12.3 removes the one section that risked this (the QA fallback claim). |
| 24–25 | Claims grounded in retrieved text; no dependency treated as "known" unretrieved | **YES**, re-verified this pass — §0.1's re-verification found no drift; §12.3/§18 pulled two over-claims back to source. |
| 26 | Remaining Open Decisions genuinely unresolved | **YES**, re-verified — Appendix B, including one newly closed (source re-verification itself) and one newly added (B‑6, sensitive-claims criteria). |

### A.3 — Revision 4 Audit (Items A–F, as required)

Each item below is a targeted search/check against the corrected text, run to verify the specific defects Revision 4 was tasked to fix, not a general re-audit (that is A.1/A.2 above, unaffected).

| Item | Test | Result | Basis |
| -- | -- | -- | -- |
| **A** | Term search: every use of `CANCELLED` across the document — does any appear paired with a non-RECORD Stage, even transiently? | **YES — no misuse found** | Grep-equivalent review of §8.1, §8.2, §10, §13.3, §14.3, §15, §20, Appendix C: every occurrence either (i) names `CANCELLED` only alongside Stage=RECORD, or (ii) describes the atomic transition *into* that pair, with explicit "together/atomically/in the same transition" language. No sentence leaves a non-RECORD Stage paired with `CANCELLED` as a resting or intermediate value. |
| **B** | Term search: every use of `PUBLISHED`, `BLOCKED`, `GOVERNANCE_REVIEW`, `REVISION_REQUIRED` — any reintroduced misuse? | **YES — no misuse found** | `PUBLISHED` remains PUBLICATION-stage-only and one-way (§15 Path A). `BLOCKED`/`GOVERNANCE_REVIEW` remain Exception Status values only, never appearing inside §8.2. `REVISION_REQUIRED` still does not appear as a Lifecycle State anywhere (§8.1, §11); the new §9.4 table does not reintroduce it. |
| **C** | Transition integrity: does every transition-table row (§10) have a single, unambiguous, non-empty condition, including the corrected cancellation rows? | **YES** | §10's two cancellation rows each name their trigger source (§13.3/§14.3/§15) and their atomicity explicitly; no row is empty or vague. |
| **D** | Exception integrity: does §9's model (including the new §9.4 table) remain free of any cell that changes Stage/Lifecycle State as a side effect of an Exception Status change alone? | **YES** | §9.4's closing constraint paragraph states this explicitly and the table's six rows are Exception-Status-only transitions; every Stage/State-changing case is cross-referenced out to §10/§11/§13.3/§14.3/§15 as a separately declared transition. |
| **E** | Revision integrity: does every Revision Event worked example/structure now carry Affected Output(s) as a field distinct from Downstream Invalidation Scope? | **YES** | §11's diagram and worked example both list five separately numbered fields; §11.2 is retitled and its prose defines the two fields separately with a worked contrast (Source/evidence defect vs. Asset defect). |
| **F** | Governance integrity: does any Governance Resolution outcome (§14.3) use vague "resume previous stage" language, and does the ownership/authority language anywhere invent an authoritative owner not supported by source? | **YES — no vague language; no invented owner** | §14.3's table names Resume Target Stage/Lifecycle State explicitly in every row, including the cancellation row (now naming RECORD/`CANCELLED` explicitly rather than "previous state"); a sentence was added directly forbidding "resume previous stage" phrasing in any actual resolution record. §12.3/§18/§21 B‑5/B‑6 continue to mark QA ownership and sensitive-claims criteria `[UNCONFIRMED SOURCE]`/`OWNER DECISION REQUIRED` rather than naming an owner this document has not confirmed. |

---

## Appendix B — Decision Register (Revision 3/4 decisions; reconciled v1.5)

| ID | Open decision | Status | Basis |
| -- | -- | -- | -- |
| B‑1 | Research-depth criteria by content type (STG‑03) | **RESOLVED —** [BUS-35](https://linear.app/bussiness-content-os/issue/BUS-35/owner-decision-required-b-1-research-depth-criteria-by-content-type), Option A | Uniform research depth retained; no differentiated taxonomy adopted (Owner, 2026-09-13). |
| B‑2 | BLOCKED-to-CANCELLED escalation threshold (§13.3) | **RESOLVED —** [BUS-36](https://linear.app/bussiness-content-os/issue/BUS-36/owner-decision-required-b-2-blocked-to-cancelled-escalation-threshold), Option A | No automatic threshold; cancellation requires explicit authorized action (Owner, 2026-09-13). |
| B‑3 | Cross-validation against literal CPB/CAS/CAR/CAB/CRS text | **RESOLVED** (Revision 2); **RE-CONFIRMED, no drift** (Revision 3, §0.1). |  |
| B‑4 | Campaign/Series-level orchestration (§3) | **RESOLVED —** [BUS-37](https://linear.app/bussiness-content-os/issue/BUS-37/owner-decision-required-b-4-campaignseries-level-orchestration), Option A | No orchestration layer introduced at this time; Core Workflow remains Content-Item scoped (Owner, 2026-09-13). |
| B‑5 | Existence and ownership of a dedicated QA mechanism | **RESOLVED** | CWC-QA-001 exists as the canonical QA Mechanism; ownership/content-authority decisions were resolved through [BUS-38](https://linear.app/bussiness-content-os/issue/BUS-38/owner-decision-required-b-5-cwc-qa-mechanism-ownership-and-criteria) and controlled QA revisions. |
| B‑6 | Sensitive-claims flag criteria and mechanism adoption | **RESOLVED —** [BUS-39](https://linear.app/bussiness-content-os/issue/BUS-39/owner-decision-required-b-6-sensitive-claims-flag-criteria-and), Option B | `SENSITIVE_CLAIM` adopted as a conditional evidence requirement folded into STG‑09 Approval; no additional lifecycle checkpoint is created (Owner, 2026-09-13). |

**v1.5 reconciliation:** B‑1, B‑2, B‑4, B‑5, and B‑6 are now resolved. B‑3 remains previously resolved/re-confirmed. No open decision remains in this register.

---

## Appendix C — End-to-End State Tests

Demonstrated against the actual Revision 3 model, per instruction, rather than asserted.

### Test A — Normal Poster

| Step | Stage | Lifecycle State | Exception Status |
| -- | -- | -- | -- |
| 1 | INTAKE | `INTAKE` | NONE |
| 2 | DEFINITION | `DEFINED` | NONE |
| 3 | RESEARCH | `RESEARCHED` | NONE |
| 4 | PLANNING | `PLANNED` | NONE |
| 5 | CONTENT PRODUCTION | `IN_CONTENT_PRODUCTION` → `CONTENT_PRODUCED` | NONE |
| 6 | ASSET PREPARATION | `IN_ASSET_PREPARATION` → `ASSETS_PREPARED` | NONE |
| 7 | VISUAL PRODUCTION | `IN_VISUAL_PRODUCTION` → `READY_FOR_QA` | NONE |
| 8 | QA | `IN_QA` → `READY_FOR_APPROVAL` | NONE |
| 9 | APPROVAL | `APPROVED` | NONE |
| 10 | PUBLICATION | `READY_FOR_PUBLICATION` → `PUBLISHED` | NONE |
| 11 | RECORD | `RECORDED` | NONE |

Every pair above is present in §8.2. Passes.

### Test B — QA Content Defect

| Step | Stage / State | Event |
| -- | -- | -- |
| 1 | QA / `IN_QA` | Verdict = FAIL |
| 2 | — | Revision Event raised: Content writing defect (§11) |
| 3 | — | Downstream invalidation: Visual Production's composition and QA's own prior verdict marked superseded (§11.2) |
| 4 | CONTENT PRODUCTION / `IN_CONTENT_PRODUCTION` | Return target per §11.1 — no intervening `REVISION_REQUIRED` state ever recorded |
| 5 | CONTENT PRODUCTION / `CONTENT_PRODUCED` | Re-satisfies Output Contract |
| 6 | ASSET PREPARATION / `ASSETS_PREPARED` → VISUAL PRODUCTION / `READY_FOR_QA` | Normal progression resumes |
| 7 | QA / `IN_QA` | Re-entry |

`REVISION_REQUIRED` never appears as a Lifecycle State value at any step. Passes (confirms R3).

### Test C — Canonical Conflict

Baseline: `Stage = VISUAL PRODUCTION, Lifecycle State = IN_VISUAL_PRODUCTION, Exception Status = NONE`.

Trigger: `Exception Status → GOVERNANCE_REVIEW` (Stage/State frozen).

**P2 citation/record precision — outcome 2:** when the governance resolution supplies a correction **and completed work is invalidated**, the Governance Resolution Record must explicitly include `Affected Output(s): Final visual composition (STG‑07 Output Package)` for this Test C baseline, separately from `Downstream Invalidation Scope`. This makes the record fields consistent with §11.2 and prevents the affected output from being implied only through invalidation scope.

1. **Resolves without invalidation** → Resolution Record: {Resolution: clarified an ambiguous CRS reference; Affected outputs: none; Invalidation scope: none; Resume Stage: VISUAL PRODUCTION; Resume State: `IN_VISUAL_PRODUCTION`; External update needed: No} → `Exception Status → NONE`; Stage/State unchanged. **Stage+State remained valid throughout — passes.**
2. **Resolves with downstream invalidation** → Resolution Record declares Resume Stage = ASSET PREPARATION, Resume State = `IN_ASSET_PREPARATION`, invalidating the current visual composition → `Exception Status → NONE`; Stage/State moves to a pair already valid in §8.2. **Passes.**
3. **Requires external canonical update** → `Exception Status → BLOCKED`, Stage/State remains `VISUAL PRODUCTION / IN_VISUAL_PRODUCTION` (frozen, now under a different exception). **Passes — no invalid pair created.**
4. **Unresolved policy conflict confirmed** → **atomic transition** (reachable only because current Lifecycle State ≠ `PUBLISHED`): Stage `VISUAL PRODUCTION` → `RECORD` **and** Lifecycle State `IN_VISUAL_PRODUCTION` → `CANCELLED` change together, in one recorded transition; `Exception Status → NONE` as part of the same transition. At no point is a `VISUAL PRODUCTION / CANCELLED` pair observed — this is the specific case Revision 4 was tasked to correct. The pre-cancellation pair (`VISUAL PRODUCTION / IN_VISUAL_PRODUCTION`) is retained in history only (§11.3). **Passes — Cancellation Boundary and Cancellation Atomicity (INV‑CAN‑2) both respected.** See also Appendix C Test F.

### Test D — External Dependency

Baseline: `Stage = VISUAL PRODUCTION, Lifecycle State = IN_VISUAL_PRODUCTION, Exception Status = NONE` → `Exception Status → BLOCKED` (e.g., a required asset delivery is pending).

Dependency resolves → **revalidation** (§13.2) is performed, not a blind resume:

* If the asset arrived exactly as required → `Exception Status → NONE`, resume `IN_VISUAL_PRODUCTION` directly.
* If the asset arrived but doesn't match the finalized Asset Requirements → a **Revision Event** (Asset defect) is raised instead of resuming, routing to ASSET PREPARATION / `IN_ASSET_PREPARATION` (§11.1).
* If the delivery reveals the underlying CAB specification itself changed → `Exception Status → GOVERNANCE_REVIEW` instead of resuming.

The workflow does not blindly resume stale work in any of the three outcomes. **Passes (confirms R5).**

### Test E — Post-Publication Problem

`PUBLICATION / READY_FOR_PUBLICATION → PUBLICATION / PUBLISHED → RECORD / RECORDED`.

Hypothetical: a defect in the published Content Item is discovered afterward. Checked against §15: the Core Workflow does **not** transition back into a Revision Event, `BLOCKED`, `GOVERNANCE_REVIEW`, or `CANCELLED` — all four are explicitly barred once Lifecycle State = `PUBLISHED` (§9.2, §15, INV‑PUB‑1, INV‑CAN‑1). The defect is correctly identified as **outside the Core Production Workflow**, requiring a separate post-publication control process not defined here. **Passes.**

**Revision 4 addition:** this also confirms Path A and Path B of §15 are mutually exclusive — having reached `PUBLISHED` (Path A), the item cannot subsequently reach `CANCELLED` (Path B) under any circumstance tested above, including a discovered defect. **Passes (confirms INV‑CAN‑1 and the Path A/Path B exclusivity stated in §15).**

### Test F — Cancellation Atomicity (Revision 4, new)

Required by the Revision 4 correction prompt: demonstrate atomic cancellation from each of INTAKE, CONTENT PRODUCTION, VISUAL PRODUCTION, QA, APPROVAL, and the PUBLICATION/`READY_FOR_PUBLICATION` boundary — checking, at each row, Current Stage, Current Lifecycle State, Exception Status, Stage–State pair validity, cancellation atomicity, history-only preservation of the origin pair, and no-return-to-production.

| Origin Stage / Lifecycle State (pre-cancellation) | Trigger | Atomic transition | Resulting Stage / Lifecycle State / Exception Status | Pair valid per §8.2? | Atomic (no intermediate pair)? | Origin preserved in history only? | Returns to production? |
| -- | -- | -- | -- | -- | -- | -- | -- |
| INTAKE / `INTAKE` | Direct authorized human termination (§15) | INTAKE/`INTAKE` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes (RECORD row, §8.2) | Yes | Yes (§11.3) | No |
| DEFINITION / `DEFINED` | Direct authorized human termination (§15) | DEFINITION/`DEFINED` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes (RECORD row, §8.2) | Yes | Yes (§11.3) | No |
| RESEARCH / `RESEARCHED` | Direct authorized human termination (§15) | RESEARCH/`RESEARCHED` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes (RECORD row, §8.2) | Yes | Yes (§11.3) | No |
| PLANNING / `PLANNED` | Direct authorized human termination (§15) | PLANNING/`PLANNED` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes (RECORD row, §8.2) | Yes | Yes (§11.3) | No |
| ASSET PREPARATION / `IN_ASSET_PREPARATION` | Direct authorized human termination (§15) | ASSET PREPARATION/`IN_ASSET_PREPARATION` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes (RECORD row, §8.2) | Yes | Yes (§11.3) | No |
| CONTENT PRODUCTION / `IN_CONTENT_PRODUCTION` | Authorized human cancellation while item is `BLOCKED` (§13.3; no automatic threshold) | CONTENT PRODUCTION/`IN_CONTENT_PRODUCTION` → RECORD/`CANCELLED`, one hop; Exception Status resets `NONE` in the same transition | RECORD / `CANCELLED` / `NONE` | Yes | Yes | Yes | No |
| VISUAL PRODUCTION / `IN_VISUAL_PRODUCTION` | `GOVERNANCE_REVIEW` resolves as unresolved policy conflict (§14.3, Test C outcome 4) | VISUAL PRODUCTION/`IN_VISUAL_PRODUCTION` → RECORD/`CANCELLED`, one hop; Exception Status resets `NONE` in the same transition | RECORD / `CANCELLED` / `NONE` | Yes | Yes | Yes | No |
| QA / `IN_QA` | Direct authorized human termination | QA/`IN_QA` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes | Yes | Yes | No |
| APPROVAL / `READY_FOR_APPROVAL` | `GOVERNANCE_REVIEW` resolves as unresolved policy conflict | APPROVAL/`READY_FOR_APPROVAL` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes | Yes | Yes | No |
| PUBLICATION / `READY_FOR_PUBLICATION` | Direct authorized human termination — **the last point at which cancellation is reachable** | PUBLICATION/`READY_FOR_PUBLICATION` → RECORD/`CANCELLED`, one hop | RECORD / `CANCELLED` / `NONE` | Yes | Yes | Yes | No |
| PUBLICATION / `PUBLISHED` | *(boundary case — cancellation is no longer reachable)* | **No such transition exists.** INV‑CAN‑1 and INV‑PUB‑1 (§20) bar it explicitly; §15 states Path A and Path B are mutually exclusive. | Unchanged: PUBLICATION / `PUBLISHED` / `NONE` | N/A (no cancellation occurs) | N/A | N/A | N/A — only path is RECORD/`RECORDED` (§15 Path A) |

At every row where cancellation occurs, Stage and Lifecycle State change together in one recorded transition — no row shows, or implies, an intermediate state where Stage ≠ RECORD while Lifecycle State reads `CANCELLED`. The final row confirms the boundary is sharp: `READY_FOR_PUBLICATION` can still be cancelled; `PUBLISHED` cannot. **Confirms INV‑CAN‑2 and INV‑CAN‑3. Passes.**

---

## Revision 3 Change Summary (carried forward for record continuity)

**1. P0 corrections completed**

* Formally separated Stage, Lifecycle State, and Exception Status into three distinct dimensions (§5), resolving Revision 2's self-contradiction between "Stage ≠ State" and treating `BLOCKED`/`GOVERNANCE_REVIEW` as matrix rows.
* Rebuilt §8's Stage–Lifecycle State Validity Matrix as exception-free; added a dedicated Exception Status Model (§9) with its own validity matrix.
* Removed `REVISION_REQUIRED` as a Lifecycle State entirely; redefined it as a Revision Event resolved in the same instant it is raised (§11), with no holding state anywhere in §8, §9, or §10.
* Formalized `GOVERNANCE_REVIEW` as an Exception Status with the identical architecture as `BLOCKED` (freeze-and-resume), and added the mandatory six-part Governance Resolution Record with a "do not improvise, remain in review" fallback (§14.3).

**2. P1 corrections completed**

* `BLOCKED` resumption now mandates revalidation against current Input Preconditions/Output Contracts, with four explicit outcomes, replacing the prior blind-resume rule (§13.2).
* Governance resolutions must declare invalidation scope explicitly; an AI agent may not infer it (§14.3).
* Withdrew the unsupported claim that CPB's Core Production Principles serve as an interim QA checklist fallback; QA ownership remains genuinely open (§12.3, §21 B‑5).
* Weakened the sensitive-claims checkpoint's justification: the flag-plus-human-sign-off architecture is retained as this Workflow's own governance choice, but its assignment criteria are now explicitly Open (§18, §21 B‑6) rather than inferred from CP‑003/004/005.
* Distinguished ordinary transition conditions from the three formal Quality Gates; "every transition is a gate" is withdrawn (§12).

**3. P2 corrections completed**

* Replaced the absolute AI-determinism claim (Appendix A #21 in Revision 2) with a conditional formulation: deterministic where contracts/specifications/human decisions are resolved, routed to exception/human checkpoint otherwise (§4 principle 12; Appendix A, R10 and #21).

**4. Remaining Open Decisions**

* B‑1 Research-depth criteria; B‑2 BLOCKED-to-CANCELLED threshold; B‑4 Campaign/Series orchestration (all unchanged, genuinely unresolved); B‑5 QA Document ownership (unchanged question, corrected claim); B‑6 sensitive-claims flag criteria (new this revision).

**5. Source-grounding limitations discovered this pass**

* All five canonical sources were re-verified unchanged (same version, same document id) — no new source content was found. The limitations surfaced this pass are about Revision 2's own over-reach relative to the *already-retrieved* text, not new gaps in the sources themselves: Revision 2 asserted two normative claims (QA-checklist fallback, sensitive-claims criteria) that the retrieved CPB text does not actually state. Both are corrected in §12.3 and §18 respectively.

**6. Final status (Revision 3, superseded by Revision 4 below)**

```text
DRAFT — NOT LOCKED
```

---

## Revision 4 Change Summary

**Revision basis:** narrow correction pass over Revision 3 (§0.2a). No architecture reopened; no new Stage, Lifecycle State, or Exception Status introduced; all 17 of Revision 3's preserved decisions (§0.4) stand unchanged.

**1. P0 correction completed — Cancellation Atomicity**

* Cancellation is now stated, in every affected section (§8.1, §8.2, §10, §13.3, §14.3, §15, §20, Appendix C), as a single atomic transition directly from `(any pre-publication Stage/Lifecycle State pair)` to `RECORD/CANCELLED` — never a two-step "Lifecycle State becomes `CANCELLED`, then Stage becomes RECORD."
* §10's single ambiguous cancellation row was split into two explicit rows: the atomic cancellation hop, and the separate `RECORD/CANCELLED → RECORD/RECORDED` closure hop.
* §15 was rewritten to state `PUBLISHED` and `CANCELLED` as explicitly symmetric Path A / Path B diagrams into RECORD, both atomic, both one-way, mutually exclusive.
* Two new invariants added: INV‑CAN‑2 (no pairing of `CANCELLED` with any non-RECORD Stage, even transiently) and INV‑CAN‑3 (origin Stage/State preserved in history only).
* New Appendix C Test F demonstrates atomic cancellation from INTAKE, CONTENT PRODUCTION, VISUAL PRODUCTION, QA, APPROVAL, and the PUBLICATION/`READY_FOR_PUBLICATION` boundary, plus the boundary case (`PUBLISHED`, where cancellation is no longer reachable). Test C outcome 4 and Test E were both updated to reflect and cross-reference the corrected wording.

**2. P1 corrections completed**

* §11's Revision Event model now carries five separately-named fields (Defect Classification, Affected Output(s), Downstream Invalidation Scope, Return Target Stage, Return Target Lifecycle State), mirroring the Governance Resolution Record's own field separation; §11.2 retitled and rewritten to define "Affected Output(s)" and "Downstream Invalidation Scope" as distinct, both-mandatory fields with a worked contrast.
* STG‑08's Output Validation field and §12.3's prose now state the exact bounded statement: QA verdict recorded, every FAIL classified with a routing target, and detailed QA criteria/checklist ownership declared external to this Workflow absent an established owner — removing any remaining implication of a checklist this Workflow can see.
* §18's sensitive-claims row now explicitly tags the flagging mechanism, its assignment criteria, and the mandatory-additional-checkpoint concept itself as `OWNER DECISION REQUIRED` (all three, individually) and states the mechanism is inert pending that decision — distinguished explicitly from ordinary Approval (STG‑09), which is stated as settled and unweakened.

**3. P2 correction completed**

* §9 gained a new §9.4 Exception Status transition table (six legal cells: `NONE→BLOCKED`, `NONE→GOVERNANCE_REVIEW`, `BLOCKED→GOVERNANCE_REVIEW`, `BLOCKED→NONE`, `GOVERNANCE_REVIEW→NONE`, `GOVERNANCE_REVIEW→BLOCKED`), with an explicit closing constraint that an Exception Status transition alone never changes Current Stage or Current Lifecycle State.

**4. Audit performed**

* Appendix A gained a new §A.3 with the required items A–F: term-search audits for `CANCELLED`/`PUBLISHED`/`BLOCKED`/`GOVERNANCE_REVIEW`/`REVISION_REQUIRED` misuse, transition integrity, exception integrity, revision integrity, and governance/ownership integrity (no vague "resume previous stage" language; no invented authoritative owner). All six items passed — see Validation Results below for the corresponding named checks.

**5. Regression**

* Appendix C Tests A, B, D unchanged in substance (their content was never implicated by the cancellation-wording defect) and re-confirmed still valid against the corrected document. Test C (outcome 4) and Test E were updated in place, not replaced, to reflect the atomic wording and the Path A/Path B exclusivity statement.

**6. Remaining Open Decisions**

* Unchanged in substance from Revision 3 (§21 Appendix B, re-confirmed): B‑1 Research-depth criteria; B‑2 BLOCKED-to-CANCELLED threshold; B‑4 Campaign/Series orchestration; B‑5 QA Document ownership; B‑6 sensitive-claims flag criteria (status wording sharpened to `OWNER DECISION REQUIRED`, substance unchanged).

---

## Validation Results

| \# | Item | Result | Basis |
| -- | -- | -- | -- |
| 1 | Stage–State Integrity | **PASS** | §8.2's matrix unchanged and still exception-free; INV‑ST‑1/INV‑ST‑2 unaffected; Appendix A.3 item B confirms no reintroduced misuse. |
| 2 | Cancellation Atomicity | **PASS** | §8.1, §8.2, §10, §13.3, §14.3, §15 all now state the single-transition form explicitly; INV‑CAN‑2/INV‑CAN‑3 added; Appendix A.3 item A and Appendix C Test F both confirm no non-RECORD Stage is ever paired with `CANCELLED`, even transiently. |
| 3 | Exception Status Integrity | **PASS** | New §9.4 table enumerates all six legal transitions with an explicit "Exception Status alone never changes Stage/State" constraint; Appendix A.3 item D confirms no violation. |
| 4 | Revision Event Traceability | **PASS** | §11's diagram and worked example both carry five distinct, separately-named fields; Affected Output(s) and Downstream Invalidation Scope are defined and worked separately in §11.2; Appendix A.3 item E confirms. |
| 5 | Governance Resolution Integrity | **PASS** | §14.3's table names Resume Target Stage/Lifecycle State explicitly in every row including cancellation (now RECORD/`CANCELLED` by name, not "previous state"); an explicit sentence forbids vague "resume previous stage" phrasing; Appendix A.3 item F confirms. |
| 6 | QA Ownership Integrity | **PASS** | STG‑08 and §12.3 now state the exact bounded statement required, with no residual implication of a checklist this Workflow can see; the underlying ownership question remains correctly marked **\[UNCONFIRMED SOURCE\]** (§21 B‑5) rather than closed by assumption. |
| 7 | Sensitive Claims Governance Status | **PASS** | §18's sensitive-claims row explicitly tags the mechanism, criteria, and mandatory-checkpoint concept `OWNER DECISION REQUIRED`, states the mechanism is inert pending that decision, and explicitly distinguishes it from settled, unweakened ordinary Approval (STG‑09). |
| 8 | Regression Tests A–E | **PASS** | Tests A, B, D unaffected and re-confirmed; Test C (outcome 4) and Test E updated in place to the corrected atomic wording and re-verified against §14.3/§15 as corrected; both still pass under the new text. |

**All eight items: PASS.** No item required weakening to CONDITIONAL/OPEN — the Revision 4 corrections were wording/structure fixes to already-sound underlying logic (Revision 3's §8.2 matrix was never actually wrong), not new architecture requiring a hedged verdict.

---

## Remaining Open Decisions

**None.** B‑1, B‑2, B‑4, B‑5, and B‑6 have all been resolved through explicit Owner decisions and controlled materialization. B‑3 was already resolved/re-confirmed. Future policy changes require a new governed change proposal rather than reopening these entries implicitly.

**7. Final status (superseded — see Canonicalization Record below)**

```text
DRAFT — REVISION 4 (as of the Revision 4 correction pass, 2026-09-07)
```

This was the correct status at the time Revision 4 was completed, before the Final Architectural Audit ran. It is preserved here as history, not current status — see the Canonicalization Record immediately below for what superseded it.

---

## Canonicalization Record

**Current status: CANONICAL LOCKED.**

| Step | Result | Evidence |
| -- | -- | -- |
| Final Architectural Audit | Executive Verdict: **MINOR CORRECTIONS**. No P0/P1 defect found; cancellation atomicity, Revision Event field separation, QA wording, sensitive-claims governance status, and Exception Status transition completeness all independently re-verified against this document's own text and against CPB v2.10 / CAS v1.11 / CAR v1.10 / CAB v1.11 / CRS v1.5. | "CWC Production Workflow — Final Architectural Audit Report (Revision 4)," Linear document, `CWC Production Workflow` project. |
| Canonicalization-readiness gate | `OWNER DECISION REQUIRED` raised (`BUS-34`): canonicalize now carrying B‑1/B‑2/B‑4/B‑5/B‑6 forward, or hold until resolved. | `BUS-34`. |
| Owner decision | **Canonicalize now; carry B‑1, B‑2, B‑4, B‑5, B‑6 forward** as documented, non-blocking, post-canonicalization Open Decisions. | Owner approval, 2026-09-07. |
| Registration | This document is registered CANONICAL in the `CWC Production Workflow` Linear project and in the ContentOS Claude Project (`claude/CWC_Production_Workflow.md`), as the single working basis — no other copy or version supersedes it. | This document. |

**What CANONICAL means here, per this Project's own Authority Statement (§0.3, unchanged):** this document defines lifecycle and control logic for CWC content production and is now the Owner-approved current authoritative state. It still has no authority to override CPB, CAS, CAR, CAB, or CRS — a conflict found between this document and any of them remains a governance issue (§14), not something this document resolves by fiat. Canonical status here follows the same pattern already used in this workspace for CPB and CAS: approved with open questions explicitly carried forward, not silently closed.

**Historical post-canonicalization decision/follow-up record** (all items below are now resolved; retained for provenance):

* `BUS-35` — resolved: uniform research depth retained.
* `BUS-36` — resolved: no automatic BLOCKED→CANCELLED threshold.
* `BUS-37` — resolved: no Campaign/Series orchestration layer at this time.
* `BUS-38` — resolved through the canonical QA Mechanism and Owner decisions.
* `BUS-39` — resolved: sensitive-claims handling folded into STG‑09 Approval.
* `BUS-40` — resolved: six P2 citation-precision corrections materialized in v1.4.

**Amendment discipline going forward:** per this workspace's established convention (see CPB/CAS/CAR/CAB/CRS), a substantive future change creates a new version (v1.1, v1.2, …) with this Canonicalization Record's table extended, not overwritten; the prior version is retained as historical/reference material, never silently replaced. A change that only resolves one of the open items above, or applies the P2 corrections, is a compliance/content amendment (no change to canonical substance) unless it alters lifecycle, transition, revision, exception, or governance logic — in which case it is a substantive amendment and follows the Revision-model discipline this document defines for itself (§11).

---

**Document status: CANONICAL. Locked** to the substance described in this document's Canonicalization Record above; further substantive change follows the Amendment discipline stated there (new version, not silent edit of this one). This line supersedes the pre-canonicalization "Not canonical. Not locked." status note that appeared in earlier drafts of this file.

**\[Note added in v1.8, not a rewrite of the above\]** The line immediately above is v1.7's own closing status statement, preserved here unchanged as history — it described v1.7 truthfully at the time it was written, and v1.7 remains CANONICAL. It does not describe this document as it now stands: this document is now v1.8, a DRAFT compliance/provenance revision layered on top of v1.7. See the v1.8 Controlled Revision Record and v1.8 Targeted Audit immediately below, and this document's own header (`Version: 1.8 (DRAFT...)`) and final closing line.

---

## v1.8 Controlled Revision Record

**v1.8 began as a controlled compliance/provenance/dependency-reconciliation revision and now also contains the Owner-directed Visual Production execution-contract reconciliation for AS‑001/AS‑004 direct placement.** It remains a non-lifecycle redesign: no Stage/State/Exception architecture is reopened, and Owner Decisions B‑1 through B‑6 remain unchanged.

| Field | Value |
| -- | -- |
| Predecessor | v1.7 CANONICAL |
| Revision type | Compliance / provenance / dependency reconciliation + Owner-directed Visual Production execution-contract reconciliation |
| Trigger | Current-state audit — eight findings, WF-AUD-01 through WF-AUD-08; plus explicit Owner decision on 2026-09-13 directing Production AI to retrieve and directly place canonical AS‑001/AS‑004 assets |
| Findings addressed | WF-AUD-01 (dependency staleness); WF-AUD-02 (revision-history structure drift); WF-AUD-03 (version-lineage narrative drift); WF-AUD-04 (QA-relationship stale current-state text); WF-AUD-05 (Format Specialization relationship drift); WF-AUD-06 (residual open-decision language); WF-AUD-07 (Linear Project tracker drift); WF-AUD-08 (dynamic version references in trackers) |
| Substantive lifecycle architecture changed? | **NO** |
| Stage / Lifecycle State / Exception Status model changed? | **NO** — §5, §8, §9 unchanged |
| Revision Event / cancellation semantics changed? | **NO** — §11, §13, §14, §15, Appendix C unchanged |
| Owner Decisions (B‑1–B‑6) changed? | **NO** — all five outcomes stand exactly as decided 2026-09-13; only their textual currency in surrounding prose was corrected |
| Additional Owner execution decision | **YES — outside B‑1–B‑6.** Production AI shall retrieve and directly place canonical AS‑001/AS‑004 files from the current authoritative asset repository; manual Reserved Area placement is fallback-only when direct retrieval/placement is technically unavailable. |
| Reason for version increment | This workspace's own Amendment discipline (Canonicalization Record, "Amendment discipline going forward") requires a compliance/provenance correction to create a new version rather than silently edit a CANONICAL document, even where no canonical substance changes. Eight accumulated compliance/provenance defects (stale `Depends On` versions, malformed and non-chronological revision-history subsections, a collapsed version-lineage narrative, and current-state text left stale by resolved Owner Decisions and newly-canonical downstream artifacts) warranted correction rather than accumulation into v1.9+. |
| Affected sections | Original v1.8 pass: Header; §0.1e–§0.1h; §2; §3; §6 STG‑08; §12.3; §17; §21. Post-audit correction pass: header identifier metadata / `Revision basis`; §6 STG‑08 `Output Validation`; Canonicalization Record heading; `v1.8 Post-Audit Correction Pass`. Owner-directed direct-placement reconciliation: header `Depends On`/revision description; new §0.1i; §0.4 historical qualification; §6 STG‑07; §7 VISUAL PRODUCTION handoff row; §16; §21; Dependency Reconciliation table; final direct-placement audit. |

### Dependency Reconciliation (WF-AUD-01)

| Dependency | v1.7 declared | Current canonical (2026-09-13) | What changed | Effect on Workflow-owned behavior | Verdict |
| -- | -- | -- | -- | -- | -- |
| Root Level Architecture | v1.11 | v1.11 | No change | None | CONFORMANT — no drift |
| Root Documentation Structure | v2.5 | v2.5 | No change | None | CONFORMANT — no drift |
| Root Governance | v1.11 | v1.11 | No change | None | CONFORMANT — no drift |
| CWC Production Bible (CPB) | v2.12 | v2.12 | No change | None | CONFORMANT — no drift |
| CWC Asset System (CAS) | v1.14 | **v1.15** | Added an explicit §6 lifecycle-authority boundary (CAS owns the lifecycle model/transition semantics; CAR/CAB/CRS own current lifecycle state within their own domains) — closes a [BUS-19](DIUA-DIC-000013_CWC-Canonical-Asset-System-CAS.md) audit ambiguity | None — this Workflow references the CAS Canonical Lifecycle by name only (§16); the lifecycle model itself (`DRAFT → REVISION CANDIDATE → CANONICAL → CANONICAL LOCKED`, `SUPERSEDED`) is unchanged | **CONFORMANT** — `Depends On` updated v1.14→v1.15 |
| CWC Asset Registry (CAR) | v1.12 | v1.12 | No change | None | CONFORMANT — no drift |
| CWC Asset Bible (CAB) | v1.13 | **v1.16** | v1.14 added the Asset 002 Generated Presenter Variant Rule; v1.15 promoted it to CANONICAL; v1.16 adds the Owner-approved AS-001/AS-004 Direct Canonical Asset Retrieval and Placement Rule | STG‑07 execution contract updated to consume direct-placement behavior; no Stage, Lifecycle State, Exception Status, transition, Gate, Revision Event, cancellation, or publication rule changed | **CONFORMANT** — `Depends On` updated to v1.16 |
| CWC Reference Sheet (CRS) | v1.8 | **v1.9** | Owner-approved application-workflow amendment: AS-001 and AS-004 canonical production files may be retrieved from the current authoritative repository and directly placed by Production AI; Reserved Area/manual placement becomes fallback-only | STG‑07/§16/§21 placement execution wording updated; lifecycle architecture unchanged | **CONFORMANT** — `Depends On` updated v1.8→v1.9 |

No dependency advance required, or triggered, any change to this Workflow's Stage sequence, Lifecycle State model, Exception Status model, transition rules, Quality Gates, Revision Event model, or cancellation/publication rules. Version advancement was not assumed to imply incompatibility — each was individually checked against this Workflow's declared use of it (§16 for CAS/CAB) before being marked CONFORMANT.

### Provenance Correction (WF-AUD-02, WF-AUD-03)

§0.1e ("Owner Decision Materialization — v1.5") had lost its own body, which had been displaced to appear after a duplicated `§0.1f` heading; a second, differently-titled `§0.1f` ("Final Stack Reconciliation — v1.6") followed it, so the visible order was v1.7-content, then v1.5-content mislabeled under the v1.7 heading, then v1.6-content — non-chronological and carrying a duplicate subsection identifier. This is restored to §0.1e (v1.5) → §0.1f (v1.6) → §0.1g (v1.7) → §0.1h (v1.8, new), each under its own correctly-numbered heading, with no change to any body's wording or substance beyond that placement fix. The document header's own version narrative was separately corrected (WF-AUD-03) to name v1.4, v1.5, v1.6, v1.7, and v1.8 as five distinct, separately-caused events, rather than describing v1.7 as if it directly succeeded v1.4. No historical Revision 1–4 text, and no Revision 3/4 Change Summary, Appendix A audit, or Appendix C test, was altered, reordered, or reworded — those remain exactly as written, as historically accurate records of what was true when they were written.

### QA / FSS Relationship Reconciliation (WF-AUD-04, WF-AUD-05)

Corrected stale current-normative text in §2, §3, §6 (STG‑08), §12.3, §17, and §21 that still read as though QA criteria ownership were `[UNCONFIRMED SOURCE]`/B‑5 were open, and as though no Format Specialization Specification existed — both contradicted this document's own Appendix B (B‑5 **RESOLVED**) and the current canonical stack (CWC-QA-001 currently v1.13 CANONICAL; FSS‑001 currently v1.13 CANONICAL). The correction recognizes both artifacts' current canonical existence and authority (QA criteria content: CWC-QA-001 per its own §18/OD‑2; format specialization: FSS‑001 per its own extension-only scope) **without** adding either to this Workflow's `Depends On` field: both are consumed laterally, through Required-Input/extension channels this Workflow's own architecture already reserved before either artifact existed (§6 STG‑08 for QA; §10/§17 for FSS), not through an upstream normative dependency requiring Root Level Architecture §8.6 conformance tracking. This Workflow remains the sole lifecycle authority; neither QA nor FSS gained, or was given, any authority over Stage, Lifecycle State, Exception Status, transition, or Gate logic. No circular dependency exists or is created.

### Linear Tracker Reconciliation (WF-AUD-07, WF-AUD-08)

Applied 2026-09-13 to the `CWC Production Workflow` Linear Project description (`121a1b40-ead5-4b6f-b225-ca9722b1cc4f`). Before correction, the description's Current Phase and Working Rules text stated: the canonical Workflow "is registered in Linear as **CWC Production Workflow (v1.0, CANONICAL)**"; "`BUS-40` remains a separate, non-blocking documentation follow-up"; "the registered v1.0 document is CANONICAL and is the current workflow specification"; and "Post-canonicalization Open Decisions (`BUS-35`–`BUS-39`) and documentation follow-up (`BUS-40`) remain visible as tracked work" — all stale: the Linear document resource itself is titled "CWC Production Workflow (v1.7, CANONICAL)," and `BUS-34` through `BUS-40` (and `BUS-42`, an unrelated FSS audit issue) are all status **Done**. Correction applied, limited to exactly this stale current-state prose:

* Current Phase now names **v1.7 CANONICAL** as the current authoritative version, states `BUS-40` is resolved, and states that a v1.8 DRAFT compliance/provenance revision exists and is **not** canonical pending separate Owner review.
* Working Rules now names v1.7 CANONICAL as the current authoritative document (with the v1.8 DRAFT caveat), and states `BUS-35`–`BUS-39` and `BUS-40` are resolved/Done, retained only as historical record.
* The Project's completion status (`Completed`) was **not** changed — a v1.8 DRAFT existing does not reopen the Project, per this task's explicit instruction.
* Nothing in the tracker states or implies v1.8 is canonical.
* No historical issue content (the issues themselves, their descriptions, milestone records, or past comments) was mass-edited; only the Project description's current-state prose was corrected, per WF-AUD-08's "only correct where necessary to prevent a current-state contradiction" instruction. The Phase 6 milestone description's own "v1.0" reference was left untouched as an accurate historical record of the initial 2026-09-07 registration event, not a current-state claim.

---

## v1.8 First Targeted Audit (historical — superseded for current readiness)

Historical audit run after the first v1.8 correction pass and before the later post-audit/direct-placement amendments. Its findings are preserved as provenance; its readiness conclusion is superseded by the later audits below. Severity legend: **P0** critical architecture failure; **P1** required conformance/provenance correction; **P2** editorial/current-state clarity defect; **PASS** conformant.

| Test | Result | Basis |
| -- | -- | -- |
| **A. Dependency Currency** | **PASS** | All eight declared dependencies re-retrieved directly from Linear 2026-09-13 (not cached); the Dependency Reconciliation table above confirms exact current versions; `Depends On` updated to match (CAS v1.15, CAB v1.15; all others unchanged and already current). |
| **B. Dependency Conformance** | **PASS** | Both advanced dependencies (CAS v1.14→v1.15, CAB v1.13→v1.15) individually checked against this Workflow's declared use (§16) and found to have no effect on any Stage, Lifecycle State, Exception Status, transition, Gate, or Output Contract this Workflow defines. |
| **C. Version History Integrity** | **PASS** | §0.1a→§0.1h now run in strict chronological/version order (v1.1→v1.2→v1.3→v1.4→v1.5→v1.6→v1.7→v1.8) with unique subsection identifiers; no duplicate `§0.1f` (or any other) heading remains. |
| **D. Current-State Consistency** | **PASS** | Full-text sweep (excluding preserved Revision 1–4/3/4 historical passages) confirms no active paragraph asserts B‑1, B‑2, B‑4, B‑5, or B‑6 unresolved. §2, §3, §6 STG‑08, §12.3, §17, and §21 corrected; the current, non-historical "## Remaining Open Decisions" section (already stating **None**) required no change. |
| **E. Historical Integrity** | **PASS** | Appendix A.1/A.2 (Revision 3-specific tests and the 26-point re-run), the Revision 3 Change Summary, the Revision 4 Change Summary, Validation Results, and Appendix C (Tests A–F) are unchanged from v1.7 — confirmed by direct comparison against the retrieved v1.7 text. Their internal `[UNCONFIRMED SOURCE]`/`OWNER DECISION REQUIRED` language is preserved exactly as historically accurate statements of record at the time each was written; §12.3's history subsection now explicitly quotes Revision 4's original bounded statement verbatim for provenance rather than silently replacing it. |
| **F. QA Boundary** | **PASS** | §12.3 and §21 recognize CWC-QA-001 as canonical and as the authority for QA criteria content (its own §18/OD‑2), consume it only through STG‑08's pre-existing Required Input, and add no `Depends On` entry — no circularity; this Workflow's own lifecycle authority (§0.3) is restated as unaffected. |
| **G. FSS Boundary** | **PASS** | §17 and §21 recognize FSS‑001 as canonical and as extending the Core per its own extension-only scope; no new Stage/Lifecycle State/Exception Status fork is introduced or implied; no reverse `Depends On` from this Workflow to FSS‑001. |
| **H. State Machine Regression** | **PASS — no change** | §5, §8 (8.1/8.2), §9 (9.1–9.4), §10, §11, §13, §14, §15, §20, and Appendix C are textually unchanged from v1.7. Stage/State pair validity, Exception Status separation, Revision Event five-field structure, cancellation atomicity (INV‑CAN‑1/2/3), the Publication one-way boundary, and closure to `RECORDED` are all untouched — this revision made no lifecycle-behavior change, as required. |
| **I. Sensitive Claims Regression** | **PASS — no change** | §18 is textually unchanged from v1.7: `SENSITIVE_CLAIM` remains a conditional evidence requirement folded into STG‑09 Approval only; no new Stage, Lifecycle State, Exception Status, or Gate. |
| **J. Tracker Consistency** | **PASS — corrected and applied** | The Linear Project description's stale v1.0/[BUS-35](https://linear.app/bussiness-content-os/issue/BUS-35/owner-decision-required-b-1-research-depth-criteria-by-content-type)–40-open language (identified above) was corrected and applied to the live Linear Project description on 2026-09-13 (see Linear Tracker Reconciliation above for the exact before/after language). No stale current-state tracker language identifying v1.0, or [BUS-35](https://linear.app/bussiness-content-os/issue/BUS-35/owner-decision-required-b-1-research-depth-criteria-by-content-type)–[BUS-40](https://linear.app/bussiness-content-os/issue/BUS-40/apply-revision-4-audit-p2-citation-precision-corrections-non-blocking), as current/open remains. Project completion status unchanged; no v1.8-is-canonical claim introduced; no historical issue content mass-edited. |

**All ten items: PASS. No new P0 or lifecycle-level P1 architectural defect was found.** This revision's corrections were compliance/provenance/text fixes to already-sound underlying architecture (v1.7's Stage/Lifecycle State/Exception Status model was never in question), not new architecture requiring a hedged verdict.

---

### v1.8 Post-Audit Correction Pass — 2026-09-13

A subsequent independent audit challenged the first v1.8 targeted-audit readiness conclusion and identified five residual current-state/provenance issues. This correction pass resolves them **within v1.8 DRAFT**; no version increment and no lifecycle-architecture change was required.

| Finding | Resolution | Result |
| -- | -- | -- |
| `WF18-AUD-01` — concern that v1.7 CANONICAL was unavailable as a separate Linear artifact | Re-evaluated against Root Documentation Structure §3–§5 and actual Content OS document practice. Governed document identity is stable across versions; Linear may show the current working version/status on the same document identity. v1.7 remains the immediately prior canonical state preserved in this document's history/Canonicalization Record. Creating a second governed Linear document for the same `DIUA-DIC-000017` would risk duplicate identity and is not required. | **RESOLVED — prior audit assumption withdrawn** |
| `WF18-AUD-02` — stale active `Revision basis` pointed to Revision 3 | Header now states the active basis correctly: controlled compliance/provenance correction over v1.7 CANONICAL; Revision 3/4 rationale remains historical provenance only. | **RESOLVED** |
| `WF18-AUD-03` — STG‑08 Output Validation retained conditional ownership wording | STG‑08 now points deterministically to the canonical CWC QA Mechanism as criteria/checklist authority while preserving this Workflow's lifecycle boundary. | **RESOLVED** |
| `WF18-AUD-04` — Canonicalization Record heading said "What remains open" although every listed item was resolved | Heading changed to a historical resolved-decision/follow-up record; underlying historical entries remain unchanged. | **RESOLVED** |
| `WF18-AUD-05` — header cited stale UNIS/DIC registry versions | Header synchronized to Universal Identifier Registry v1.20 and Universal Identifier Registration Record v1.18; `DIUA-DIC-000017` itself is unchanged and remains ALLOCATED / ACTIVE. | **RESOLVED** |

**Post-correction regression check:** Stage sequence, Stage/Lifecycle State/Exception Status model, §10 transitions, §11 Revision Event semantics, §13/§14 exception handling, §15 publication/cancellation boundary, §18 sensitive-claims handling, and terminal `RECORDED` behavior were not changed by this pass. The first v1.8 Targeted Audit above is retained as audit provenance; its readiness conclusion is superseded by this correction pass and the verification performed after it.

---

### v1.8 Direct-Placement Reconciliation Audit — 2026-09-13

This audit is the current readiness audit for the Owner-directed AS‑001/AS‑004 direct-placement amendment. It supersedes the earlier v1.8 readiness conclusions without rewriting their historical record.

| Test | Result | Basis |
| -- | -- | -- |
| Asset authority ordering | **PASS** | CAB v1.16 and CRS v1.9 were updated as the owning asset specification/reference authorities before Workflow consumption was changed. |
| Exact canonical retrieval | **PASS** | STG‑07 requires retrieval of the exact approved canonical production file/variant; it does not permit an inferred or generated replacement. |
| Non-generation / non-substitution | **PASS** | AI generation, redraw, reconstruction, unauthorized recoloring, distortion, internal-structure alteration, and substitution of AS‑001/AS‑004 are explicitly prohibited. |
| Controlled fallback | **PASS** | Reserved Area/manual placement is fallback-only when direct retrieval or placement is technically unavailable; the item cannot exit VISUAL PRODUCTION with an unresolved fallback area. |
| Tool independence | **PASS** | Normative rule targets the `current authoritative asset repository`; Google Drive is recorded only as the current operational binding and may be replaced without changing asset identity or workflow semantics. |
| Lifecycle regression | **PASS** | Stage sequence, Stage/Lifecycle State/Exception Status model, §10 transitions, three Quality Gates, Revision Event model, cancellation atomicity, publication boundary, and `RECORDED` closure are unchanged. |
| Dependency currency | **PASS** | Header declares CAB v1.16 CANONICAL and CRS v1.9 CANONICAL; both advances were re-verified and materialized only in STG‑07/§7/§16/§21 execution-boundary text. |
| CPB boundary | **PASS** | CPB v2.12 does not require manual logo/footer placement. Its VDS boundary leaves concrete logo/footer identity/spec/reference to the Canonical Asset System ecosystem and permits AI implementation freedom provided Canonical Identity is preserved. |

**Verdict:** **PASS — no P0/P1 defect introduced by direct placement.** v1.8 is internally conformant and **READY FOR OWNER REVIEW**, but remains DRAFT until a separate Owner canonicalization act.

---

## v1.8 Canonicalization Record — 2026-09-13

**Owner decision:** APPROVED. The CWC domain Owner explicitly approved promotion of v1.8 from DRAFT to CANONICAL on 2026-09-13 after completion of the compliance/provenance correction pass, post-audit correction pass, dependency reconciliation, and Owner-directed canonical-asset direct-placement reconciliation.

**Canonicalization effect:** v1.8 becomes the current authoritative CWC Production Workflow under the existing stable document identity `DIUA-DIC-000017`; v1.7 remains the immediately prior canonical state and historical baseline. This promotion changes status only. It does not alter any Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event field, cancellation/publication boundary, or B-1–B-6 Owner Decision outcome.

**Direct-placement rule included in the canonical state:** STG-07 consumes CAB v1.16 and CRS v1.9. Production AI retrieves the exact approved canonical AS-001 Official Brand Logo and AS-004 Official Footer Platform production files from the current authoritative asset repository (currently Google Drive) and places them directly into the content. AI generation/redraw/reconstruction/substitution remains prohibited; Reserved Area/manual placement is fallback-only when retrieval or direct placement is technically unavailable.

**Canonicalization verdict:** APPROVED — v1.8 CANONICAL.

---

**Document status: v1.8 CANONICAL — CURRENT AUTHORITATIVE STATE.** Owner-approved on 2026-09-13. v1.8 supersedes v1.7 as the current canonical Workflow while preserving v1.7 as the immediately prior canonical state in this document's version history and Canonicalization Record. Further substantive change requires a new governed revision under the amendment discipline above.

---

## v1.9 Controlled Revision Candidate Record — Content Register Integration

**Date:** 2026-09-13
**Revision type:** Controlled workflow integration; no stage/state topology change.
**Lateral source under co-validation:** CWC Content Register v0.7 DRAFT (`DIUA-DIC-000027`).
**Prior authoritative state:** v1.8 CANONICAL.

### Scope

This candidate integrates the Content Register at the narrowest viable points in the existing workflow:

1. **STG‑01 INTAKE** retains its existing workflow identity and now explicitly distinguishes that identity from the native CWC Content ID.
2. **STG‑02 DEFINITION** becomes the duplicate-control gate because this is the first stage where format and the semantic signature (`Topic + Learning Objective + Core Message + Editorial Angle`) are sufficiently defined.
3. Native `CWC-{FORMAT}-{NNNN}` allocation occurs only after the STG‑02 duplicate disposition permits progression.
4. **STG‑11 RECORD** synchronizes final status and publication occurrences back to the Content Register.

### Deliberately not introduced

No new Stage, Lifecycle State, Exception Status, Quality Gate, database, global sequence, campaign orchestration layer, or separate duplicate-detection service is introduced.

### D2 / D3 behavior

* **D2** freezes exit from DEFINITION using existing Exception Status `BLOCKED` while differentiation/review is resolved.
* **D3** cannot proceed as unrelated new content. It must be cancelled or explicitly converted to an allowed repurpose/adaptation/update/repost path.
* Existing cancellation semantics remain authoritative; allocated Content IDs are never recycled.

### Revision-candidate verdict

**READY FOR TARGETED AUDIT.** This record does not canonicalize v1.9. v1.8 remains authoritative until Owner approval after audit.

### v1.9 Targeted Audit — Initial Pass

**Audit scope:** metadata currency, stage/state topology preservation, STG‑01 identity boundary, STG‑02 duplicate-control contract, handoff consistency, STG‑11 register closure, and current CWC dependency versions.

**Findings corrected during audit:**

1. `Revision basis` still described the v1.8 revision basis after v1.9 materialization — corrected to v1.8 CANONICAL as the immediate baseline.
2. Formal CWC dependencies had advanced after v1.8: CAR v1.12→v1.14, CAB v1.16→v1.19, CRS v1.9→v1.10 — reconciled after verifying that these advances add/activate asset-domain content without changing workflow stage/state semantics.
3. Universal Identifier authority references were stale (Registry v1.20 / Registration Record v1.18) — synchronized to v1.21 / v1.19.
4. Handoff-matrix preamble still described v1.8 as the latest matrix change — updated to state the v1.9 DEFINITION extension explicitly.

**Topology check:** PASS. Canonical stage order remains `INTAKE → DEFINITION → RESEARCH → PLANNING → CONTENT PRODUCTION → ASSET PREPARATION → VISUAL PRODUCTION → QA → APPROVAL → PUBLICATION → RECORD`. No new Lifecycle State, Exception Status, or Quality Gate was introduced.

**Integration check:** PASS. CWC Content Register v0.7 remains a lateral operational reference rather than a formal `Depends On` dependency. This is intentional and remains true after canonicalization because the Register normatively depends on the Workflow for lifecycle semantics; reciprocal `Depends On` would create a dependency cycle.

**Audit verdict:** **PASS — NO BLOCKING ARCHITECTURAL DEFECT REMAINS.** Cross-document conformance with CWC Content Register v0.7 is complete. v1.9 remains DRAFT and is READY FOR OWNER REVIEW / coordinated canonicalization.

### v1.9 Cross-Document Conformance Closure

**Compared against:** CWC Content Register v0.7 DRAFT.

Final checks:

* STG‑01 workflow identity is distinct from native CWC Content ID: PASS.
* STG‑02 has sufficient semantic fields before duplicate classification: PASS.
* D0/D1 progression, D2 `BLOCKED`, and D3 no-new-content behavior: PASS.
* Cross-format adaptation receives a new target-format ID with `Adapted From`: PASS.
* Repost retains existing Content ID and creates a Publication Log occurrence: PASS.
* STG‑11 synchronizes register status and publication evidence: PASS.
* Register mirrors Workflow Lifecycle State and does not define a parallel lifecycle: PASS.
* Forward-only legacy cutover and allocation-order semantics: PASS.
* No new Stage, Lifecycle State, Exception Status, Quality Gate, or global sequence introduced: PASS.
* Normative dependency cycle avoided: PASS. Register may depend on Workflow; Workflow consumes Register laterally and does not reciprocally declare it in `Depends On`.

**Final candidate verdict:** READY FOR OWNER REVIEW. No further architectural correction is required before coordinated canonicalization.

## v1.9 Canonicalization Record — Content Register Integration

**Date:** 2026-09-13
**Owner act:** APPROVED / CANONICAL
**Supersedes:** v1.8 CANONICAL
**Coordinated counterpart:** CWC Content Register v1.0 CANONICAL (`DIUA-DIC-000027`)

Owner approved the v1.9 revision after the Content Register activation dry-run, dependency-currentness review, lifecycle-authority reconciliation, and cross-document conformance review completed without blocking defects.

Canonical integration points:

1. **STG‑02 DEFINITION** owns semantic duplicate screening using `Topic + Learning Objective + Core Message + Editorial Angle`, assigns D0/D1/D2/D3, and allocates or retains the correct native CWC Content ID only when the disposition permits progression.
2. **STG‑11 RECORD** closes the auditable content record and synchronizes final register/publication evidence.
3. The Content Register is consumed laterally and is not a reciprocal normative dependency, preventing a Workflow ↔ Register dependency cycle.
4. No new Stage, Lifecycle State, Exception Status, Quality Gate, or automatic cancellation rule is introduced.
5. v1.8 remains preserved as the immediately prior canonical state in revision history; v1.9 is now the current authoritative Production Workflow.

---

## v1.10 Canonical Amendment Record — Production Alias

**Date:** 2026-09-13
**Predecessor:** v1.9 CANONICAL
**Trigger:** Owner instruction to create Production Alias terminology for format-specific production.
**Owner act:** APPROVED / CANONICAL on 2026-09-13.
**Supersedes:** v1.9 CANONICAL.
**Canonical scope:** terminology/operational alias layer only; no lifecycle architecture change.

**Change introduced:** §17.1 defines Production Alias as an operational shorthand for `CWC Core Production Workflow + selected Format Specialization`. Initial aliases are **Produksi CWC Poster**, **Produksi CWC Carousel**, and **Produksi CWC Reels**.

**Lifecycle impact:** NONE. No Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, cancellation/publication boundary, approval authority, Content Register behavior, or canonical-asset placement rule is changed.

**Authority impact:** NONE. A Production Alias has no independent lifecycle authority and cannot override the Core Workflow or applicable Format Specialization.

**Current status:** v1.10 CANONICAL LOCKED — CURRENT AUTHORITATIVE CWC PRODUCTION WORKFLOW. Owner-approved and locked on 2026-09-13. v1.9 remains preserved as the immediately prior canonical state. The canonical Production Aliases are **Produksi CWC Poster**, **Produksi CWC Carousel**, and **Produksi CWC Reels**; each remains operational shorthand for the Core Workflow plus the applicable Format Specialization and has no independent lifecycle authority.

## v1.10 Lock Record — 2026-09-13

**Tracker sync:** Linear project metadata must identify v1.10 CANONICAL LOCKED as the current authoritative state.

**Owner act:** LOCKED.

**Effect:** v1.10 remains the current authoritative canonical CWC Production Workflow and is now explicitly locked against silent substantive amendment. This lock changes no workflow rule, lifecycle behavior, authority boundary, Content Register integration, direct-placement rule, or Production Alias semantics. Any future substantive change must be introduced through a new governed version; historical v1.10 remains preserved unchanged as the locked canonical baseline.

## v1.13 Canonicalization / Lock Record — Asset Production Behavior Reconciliation

**Date:** 2026-09-16
**Tracking issue:** [BUS-60](https://linear.app/bussiness-content-os/issue/BUS-60/cwc-production-workflow-asset-production-behavior-reconciliation)
**Predecessor:** v1.11 CANONICAL LOCKED
**Reviewed candidate:** v1.12 REVISION CANDIDATE
**Owner act:** APPROVED / CANONICAL LOCKED

### Canonical effect

1. Current formal asset dependencies are synchronized to CPB v2.12, CAS v1.17, CAR v1.17, CAB v1.32, CRS v1.21, with Reference Model v1.13 unchanged.
2. STG‑06 now validates CAS lifecycle eligibility together with the CAB-assigned primary Production Behavior Mode and required CRS/CAB mode inputs.
3. STG‑07 executes assets by Production Behavior Mode rather than by a stale hard-coded list of direct-placement asset IDs.
4. Current execution coverage is AS‑001/AS‑004/AS‑005=`EXACT_REUSE`, AS‑002=`GENERATIVE_REFERENCE`, AS‑003=`TOKEN_CONTROLLED`, as assigned by CAB v1.32.
5. No asset identity, binary, lock state, or CRS mapping is changed by this Workflow revision.
6. No Core lifecycle topology or other locked Workflow semantics are changed.

**Blocking 2 disposition:** RESOLVED at the Workflow authority layer. v1.13 is the current authoritative **CANONICAL LOCKED** CWC Production Workflow. Future substantive changes require a new governed revision; this record and the prior v1.11 baseline remain preserved as provenance.

## v1.14 Controlled Revision Candidate Record — Lateral Pointer Stability

**Date:** 2026-09-16
**Trigger:** [BUS-61](https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation) final closure audit after Blocking 1/2 remediation.
**Predecessor:** v1.13 CANONICAL LOCKED.
**Revision type:** Compliance / current-state pointer stability; no workflow-behavior change.

### Scope

This candidate removes revision-number pins from relationships that this Workflow already defines as lateral/downstream rather than formal upstream normative dependencies: CWC Content Register, CWC-QA-001, and FSS-001. Formal `Depends On` versions for Root/CWC upstream authorities remain explicit and unchanged.

### Rationale

A lateral document can advance solely to reconcile itself with a new Workflow version. If the Workflow then pins that lateral document's new version, another Workflow revision is immediately required, which forces another downstream conformance revision. Version-agnostic `current canonical` references preserve the authority boundary while stopping this maintenance cycle.

### Regression boundary

No Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, approval, cancellation/publication rule, Reference Model behavior, Content ID behavior, Production Alias, asset identity, asset binary, Production Behavior Mode, FSS behavior, QA criterion, or Content Register schema changes.

**Candidate verdict:** READY FOR TARGETED AUDIT. v1.13 remains authoritative until Owner approval.

## v1.15 Canonicalization & Lock Record — Lateral Pointer Stability

**Date:** 2026-09-16
**Owner act:** APPROVED / CANONICAL LOCKED.
**Reviewed candidate:** v1.14 REVISION CANDIDATE.
**Supersedes:** v1.13 CANONICAL LOCKED.

Targeted audit passed all pointer-stability and regression checks. The current authoritative Workflow therefore references CWC Content Register, CWC-QA-001, and FSS-001 through their current canonical states without pinning lateral revision numbers, while keeping every formal upstream normative dependency explicitly version-pinned.

This promotion changes no Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, approval rule, cancellation/publication boundary, Reference Model behavior, Content ID behavior, Production Alias semantics, asset identity, asset binary, Production Behavior Mode, FSS behavior, QA criterion, or Content Register schema.

**Canonicalization verdict:** APPROVED — v1.15 CANONICAL LOCKED.

## v1.16 Controlled Compliance Revision — AS-002 Contextual Presenter Styling

**Date:** 2026-09-16
**Trigger:** [BUS-62](https://linear.app/bussiness-content-os/issue/BUS-62/as-002-contextual-presenter-styling-rule) / CAB v1.34 CANONICAL.
**Result:** CONFORMANT.

CAB v1.34 clarifies that AS-002 is a generative brand character: the canonical GENREF set provides identity/rendering guidance, while content-specific production may contextually vary pose, wardrobe styling, props, activity, scene role, framing, and thematic presentation. Raw GENREF copy-paste is optional rather than the default requirement. This remains fully within the existing `GENERATIVE_REFERENCE` mode already consumed by STG‑06/STG‑07. No Stage, Lifecycle State, Exception Status, Quality Gate, approval rule, Content ID behavior, asset identity, GENREF mapping, or Production Behavior Mode changed.

## v1.17 Controlled Compliance Revision — AS-003 Lifecycle-Notation Reconciliation

**Date:** 2026-09-16
**Trigger:** post-audit governance cleanup.
**Dependencies re-verified:** CAS v1.17, CAR v1.18, CAB v1.35, CRS v1.22.
**Result:** CONFORMANT. AS-003 wording is normalized to `CANONICAL LOCKED / ACTIVE`; no asset lifecycle transition, Production Behavior assignment, Stage, Lifecycle State, Exception Status, Quality Gate, or execution behavior changed. Workflow remains CANONICAL LOCKED.

---

### 0.1n Traceability Correction — Related Issue / Document Parent (2026-09-19)

**\[METADATA COMPLIANCE CORRECTION — NO WORKFLOW BEHAVIOR CHANGE — EXPLICIT OWNER AUTHORIZATION\]**

A CWC Project-level documentation audit on 2026-09-19 found two linked traceability defects on this document:

1. the `Related Issue` field named [BUS-62](https://linear.app/bussiness-content-os/issue/BUS-62/as-002-contextual-presenter-styling-rule), an AS-002 / CAB-domain revision-trigger issue, rather than an issue tracking this document; and
2. this Linear document had **no parent issue at all**, breaking the workspace-wide document → issue convention and Root Documentation Structure §6.1.

Both are corrected to [BUS-61](https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation) **— CWC Production Workflow** by explicit Owner decision (2026-09-19). The document is now parented to [BUS-61](https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation) and the `Related Issue` field matches.

**Scope limitation, recorded honestly:** [BUS-61](https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation) is a revision-scoped, closed issue. It is used here as the existing CWC Production Workflow tracking anchor per the Owner's decision not to create a new issue; it is not a live ownership tracker. If a standing ownership issue is later created, this field is re-pointed through the same compliance path.

**Version discipline:** no version increment is taken. This is a metadata/traceability correction only — no Stage, Lifecycle State, Exception Status, transition, Quality Gate, Production Behavior Mode, approval rule, cancellation/publication boundary, Content Register integration, or execution contract changed. Incrementing the version would invalidate the `Workflow v1.18` pins currently held by FSS-001 v1.23, CWC-QA-001 v1.23, CWC Content Register v1.10, and all four registered Format Specialization Objects, producing a cascade disproportionate to a metadata repair. The document remains **v1.18 CANONICAL LOCKED**.

---

### 0.1o Identifier-Pointer Precision Correction (2026-09-19)

**\[DOCUMENTATION MAINTENANCE — NO WORKFLOW BEHAVIOR CHANGE — NO VERSION INCREMENT\]** Recorded under the CWC amendment discipline (`[Root Level Architecture v1.11 §11, R7]`; `[Root Governance v1.11 §5, §6 CONSTRAINT]`; this document's own Canonicalization Record, "Amendment discipline going forward").

The header pinned the Universal Identifier Registry at v1.21 and the Universal Identifier Registration Record at v1.19; both are superseded (current: Registry v1.25, Registration Record v1.23). This is the third recurrence of the same staleness on this field — see `WF18-AUD-05`, which re-pinned v1.20/v1.18 to v1.21/v1.19 and left the underlying cause in place.

The pin is therefore **removed rather than re-pinned**. `DIUA-DIC-000017` is established by its allocation act recorded in the Registration Record, not by any registry revision number, so an unversioned pointer is both accurate and immune to recurrence. This applies to this field the same lateral-pointer-stability principle this document already adopted at v1.15 under [BUS-61](https://linear.app/bussiness-content-os/issue/BUS-61/cwc-production-workflow-lateral-pointer-stability-reconciliation) for the Content Register, CWC-QA-001, and FSS-001 pointers.

Formal upstream `Depends On` versions remain explicitly pinned and are unchanged. No Stage, Lifecycle State, Exception Status, transition, Quality Gate, Revision Event, Production Behavior Mode, approval rule, cancellation/publication boundary, Content Register integration, or execution contract changed. The document remains **v1.18 CANONICAL LOCKED**.

## Dependency Currency Reconciliation — 2026-09-22

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** CWC Production Bible advanced v2.14 → v2.15 under [BUS-93](https://linear.app/bussiness-content-os/issue/BUS-93/cwc-caption-and-hashtag-standard-five-tag-locality-rule) solely to add §6.6.1 Social Caption & Hashtag Standard (exactly five hashtags; at least one contextually relevant locality hashtag). This document's declared use of CPB was re-verified. **Result: CONFORMANT.** No local schema, lifecycle authority, format rule, QA architecture, identifier behavior, or production behavior is changed by this pointer synchronization.

---

### 0.1n Storage Authority Dependency Reconciliation — v1.19 (2026-09-26)

**\[COMPLIANCE REVISION — NO WORKFLOW BEHAVIOR CHANGE\]** CAB advanced v1.35→v1.36 and CRS v1.22→v1.23 solely to conform current storage-authority wording to [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md): Linear is governed-text authority and Google Drive is binary/reference storage. The Workflow re-verified both normative dependencies under Root Level Architecture §8.6. **Result: CONFORMANT.** No workflow Stage, state, transition, Gate, Production Behavior Mode, approval rule, asset identity, or binary changed.

**Version:** 1.18 → 1.19.

## Dependency Reconciliation — v1.20 — 2026-09-27

[BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract) advanced CPB to v2.17 and the Carousel format stack to FORMAT-CAROUSEL v1.3 / FSS v1.27 / QA v1.27. Workflow authority and behavior were re-verified.

**Result: CONFORMANT / NO WORKFLOW BEHAVIOR CHANGE.**

## Dependency Reconciliation — v1.21 — 2026-09-27

[BUS-116](https://linear.app/bussiness-content-os/issue/BUS-116/cwc-outreach-worker-service-navigation-promotion-standard) advanced CPB to v2.19 with an editorial CTA rule at §6.9.1. Workflow architecture and execution behavior were re-verified.

**Result: CONFORMANT / NO WORKFLOW BEHAVIOR CHANGE.**

## Controlled Revision — v1.22 — [BUS-119](https://linear.app/bussiness-content-os/issue/BUS-119/cwc-production-workflow-publication-readiness-evidence-contract) — 2026-09-27

**Trigger:** production execution of [BUS-112](https://linear.app/bussiness-content-os/issue/BUS-112/cwc-carousel-production-cwc-crsl-0002-prep-pep-jangan-tertukar) demonstrated that the existing STG‑10 internal readiness checkpoint required a more explicit evidence contract.

**Change:** STG‑10 now requires an **Approved Release Identity** before lifecycle transition `APPROVED → READY_FOR_PUBLICATION`. The identity binds the current approved publication copy/caption and exact publishable artifact set and must be reproducibly identifiable by checksum, immutable storage/version ID, or equivalent deterministic evidence. A Publication Manifest and downloadable release bundle are allowed implementation artifacts but are not universal file-format requirements and do not own lifecycle semantics.

**Preserved architecture:** all eleven Stages, Lifecycle States, Exception Status values, Quality Gates, Revision Event routing, human approval authority, sensitive-claim handling, Content ID semantics, Post-Publication Boundary, and STG‑11 Record behavior remain unchanged.

**Pilot conformance evidence:** `CWC-CRSL-0002` / [BUS-112](https://linear.app/bussiness-content-os/issue/BUS-112/cwc-carousel-production-cwc-crsl-0002-prep-pep-jangan-tertukar) uses Final Copy v1.1, Caption v1.1, Visual Candidate v0.4, Publication Manifest v1.0, per-slide SHA-256 identity evidence, and a downloadable release package while remaining `READY_FOR_PUBLICATION` until platform-confirmed live evidence exists.

**Result:** CANONICAL LOCKED / BEHAVIORAL CLARIFICATION WITH NO ARCHITECTURE FORK.

### 2026-10-10 — CPB v2.22 Dependency Currency Maintenance

Current normative CWC Production Bible pin synchronized from v2.21 to v2.22 following the Owner-directed caption follow/share closure in CPB §6.6.2. This is a **dependency pointer-only maintenance**; the local document version, workflow states, format geometry, asset behaviors, QA gates, register schema, and existing Content Item history remain unchanged. The two secondary engagement prompts are consumed from CPB at applicable caption-authoring steps, with clinical-action and five-hashtag rules preserved.
