---
document_name: "CWC FORMAT-REEL"
document_class: "Tier 2 Format Specialization Object / Reel Production Specification"
structural_classification: "Tiered — Domain/Project Tier 2 — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner"
related_issue: "BUS-124"
universal_identifier: "DIUA-DIC-000030"
version: "1.4"
status: "REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION"
depends_on:
  - id: "DIUA-DIC-000017"
    name: "CWC Production Workflow"
    version: "1.22"
    status: "CANONICAL LOCKED"
  - id: "DIUA-DIC-000012"
    name: "Coz We Care — Production Bible"
    version: "2.21"
    status: "CANONICAL"
  - id: "DIUA-DIC-000018"
    name: "CWC Format Specialization Specification"
    version: "1.31"
    status: "CANONICAL"
  - id: "DIUA-DIC-000019"
    name: "CWC QA Mechanism"
    version: "1.32"
    status: "CANONICAL"
  - id: "DIUA-DIC-000015"
    name: "Coz We Care — Canonical Asset Bible (CAB)"
    version: "1.36"
    status: "CANONICAL"
  - id: "DIUA-DIC-000016"
    name: "Coz We Care — Reference Sheet (CRS)"
    version: "1.23"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/cwc-format-reel-v14-registered-9a01972bfa13"
representation_profile: "DIUA-DIC-000026@1.3"
---
# CWC FORMAT-REEL

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | CWC FORMAT-REEL |
| Document Class | Tier 2 Format Specialization Object / Reel Production Specification |
| System | Content OS → Coz We Care (CWC) |
| Format ID | `FORMAT-REEL` |
| Document Version | 1.4 |
| Document Status | REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION |
| Format Object Status | REGISTERED |
| Owner | **\[FORMAL\]** Billy Fernando Mende — CWC domain Owner |
| Related Issue | [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) — CWC Cross-Format Reference-Validated Copy / Brand Presenter Layout |
| Structural Classification | Tiered — Domain/Project Tier 2 — Coz We Care |
| Universal Identifier | `DIUA-DIC-000030` — ALLOCATED / ACTIVE via CONTENT-OS-ALLOC-030 |
| Depends On | CWC Production Workflow v1.22 CANONICAL LOCKED; CPB v2.21 CANONICAL; CWC-FSS-001 v1.31 CANONICAL; CWC-QA-001 v1.32 CANONICAL; CAB v1.36 CANONICAL; CRS v1.23 CANONICAL |

---

## 1. Purpose

Define the registered CWC format specialization for vertical short-form Reels. This object specializes the canonical CWC Production Workflow through FSS-001 without redefining lifecycle, approval, publication, asset authority, safe-area authority, or QA architecture.

## 2. Applicability

`FORMAT-REEL` applies to one CWC Content Item whose output is vertical short-form social video. Baseline canvas: **1080 × 1920 px (9:16 portrait)**.

Each screen/beat should have one primary communication role. Copy must be segmented temporally rather than compressed below typography readability floors.

## 3. Stage Attachments

```yaml
format_id: FORMAT-REEL
format_name: CWC Vertical Short-Form Reel
status: REGISTERED
version: "1.4"
applicability: vertical short-form social video

stage_attachments:
  PLANNING:
    rule: EXTEND
    production_requirements:
      - "baseline canvas: 1080×1920 px, portrait 9:16"
      - "opening visual beat / opening branded frame is mandatory"
      - "opening branded frame uses the BUS-124 reference-validated cross-format layout"
      - "full-body is the default presenter reference framing; hip-to-head/close crop is a framing adaptation inside the same right-side placement model"
      - "if a separate cover/thumbnail is produced, it uses the same layout"

  CONTENT_PRODUCTION:
    rule: CONSTRAIN
    additional_output_contract_clauses:
      - "opening copy is left-aligned at x=72 and does not extend beyond x≈551"
      - "x≈551–605 is the protected composition gutter"
      - "later beats remain temporally segmented rather than compressed"

  ASSET_PREPARATION:
    rule: EXTEND
    additional_asset_requirement_categories:
      - "AS-002 Brand Presenter asset for the opening branded frame and separate cover/thumbnail if produced, suitable for the right-side placement model"
      - "canonical logo/footer assets according to existing applicability; geometry and Production Behavior unchanged"

  VISUAL_PRODUCTION:
    rule: CONSTRAIN
    production_requirements:
      - "opening copy left anchor = x=72; copy maximum = x≈551"
      - "opening protected composition gutter = x≈551–605"
      - "opening presenter core body zone = x≈670–1015"
      - "gesture allowance = x≈572–594 only when intentionally directing attention toward copy"
      - "gesture may not obscure essential copy, logo, footer, or platform-safe areas"
      - "presenter remains right-anchored and visually directs attention toward copy"
      - "full-body is default; hip-to-head/close crop is permitted only inside the same right-side placement model"
      - "a separately produced Reel cover/thumbnail uses the same rule"
      - "later beats do not gain a new presenter requirement solely from v1.4"
      - "apply the existing FORMAT-REEL typography matrix"
      - "Reel platform-overlay safe-area remains its own pre-existing [UNCONFIRMED — SOURCE GAP]; this amendment does not invent or redefine it"

  QA:
    rule: EXTEND
    additional_validation_criteria:
      - "verify opening branded frame contains AS-002 Brand Presenter"
      - "verify copy is left-aligned and does not extend beyond 51% width"
      - "verify x≈551–605 remains a protected composition gutter"
      - "verify presenter core is right-anchored approximately within x≈670–1015"
      - "verify any gesture intrusion is intentional and approximately within x≈572–594"
      - "verify gesture does not obscure essential copy or protected regions"
      - "verify presenter visually directs attention toward copy"
      - "verify selected framing remains inside the same right-side placement model"
      - "if a separate cover exists, verify the same layout there"
      - "verify canonical logo/footer are unchanged where applicable"
      - "verify Reel typography hierarchy/readability floors"
```

Stages not declared above inherit the Core Workflow unchanged. No APPROVAL, PUBLICATION, or RECORD attachment is declared.

## 4. Typography Matrix

Baseline canvas: **1080 × 1920 px (9:16)**.

**Shared-matrix note:** this matrix is intentionally numerically aligned with `FORMAT-STORY` because both use the same 1080 × 1920 baseline canvas and current typography scale. The duplication here is a format-local snapshot for executability, not a separate authority. If either matrix changes, both must be reviewed for conformance to avoid silent drift.

| Semantic Role | CPB Weight | Default Size | Line Height | Tracking | Reel Floor |
| -- | -- | -- | -- | -- | -- |
| Hero / Hook Display | 800 | 104 px | 108 px | \-0.01em | 92 px |
| Headline | 700–800 | 84 px | 94 px | \-0.01em | 76 px |
| Subheadline | 700 | 60 px | 72 px | 0 | 54 px |
| Kicker / Eyebrow / Label | 600 | 30 px | 36 px | +0.04em | 28 px |
| Body | 400–500 | 44 px | 60 px | 0 | 40 px |
| Supporting Text | 500 | 36 px | 48 px | 0 | 34 px |
| CTA | 700 | 44 px | 50 px | 0 | 40 px |
| Data / Key Number | 700–800 | 104 px | 108 px | \-0.01em | 92 px |

## 5. Readability Rule

* Essential explanatory live text should normally remain **≥40 px** on a 1080×1920 Reel.
* Supporting text may reach **34–36 px** when short and non-primary.
* Kicker/label may use **28–30 px** because it is categorical/short-form text rather than sustained reading copy.
* If body copy would need to go below its floor, divide the content into additional beats/screens or rewrite the copy instead of shrinking typography.

## 6. Temporal / Sequential Typography Rule

Across one Reel:

1. one screen/beat should have one primary semantic role;
2. Hook/opening beat may use Hero or Headline treatment;
3. explanatory beats should prioritize Headline/Subheadline + Body hierarchy;
4. CTA/closing beat may use CTA treatment but must not introduce a new typeface or unapproved weight;
5. kinetic typography may animate position, scale, opacity, or timing within the production design, but semantic hierarchy and approved font/weight rules remain unchanged;
6. typographic variety should come from role, scale within the allowed range, layout, and motion—not arbitrary font-family changes.

## 7. Scaling Rule

For a Reel canvas that preserves 9:16 but changes pixel width, typography values scale proportionally from the 1080 px baseline width.

Materially different aspect ratios require an explicit governed format variant or another registered Format Specialization Object. Do not infer.

## 8. Safe-Area Boundary

This typography object does **not** define platform-overlay coordinates or independent safe-area geometry. Live Linear/Drive verification on 2026-09-17 did not locate a current CWC Reel safe-area coordinate authority. Therefore safe-area geometry is explicitly tagged **\[UNCONFIRMED — SOURCE GAP\]** and remains a separate implementation gap. If execution requires unresolved coordinates, route that decision to the appropriate governance/human checkpoint rather than infer values. This source gap does not alter the registered typography matrix.

## 9. Asset Typography Boundary

This object does not override asset-intrinsic typography governed by CAB/CRS. If a canonical exact-reuse asset contains typography, that typography remains governed by the asset authority and must not be rebuilt as live Reel text.

## 10. Owner Approval

Owner continuation/approval received on **2026-09-17** through [BUS-67](https://linear.app/bussiness-content-os/issue/BUS-67/cwc-format-reel-typography-specialization-and-registration) workflow. Approved scope is exactly the matrix and rules presented in [BUS-67](https://linear.app/bussiness-content-os/issue/BUS-67/cwc-format-reel-typography-specialization-and-registration); no numeric value was changed during materialization.

## 11. Registration State

Current state: **REGISTERED / CONFORMANT — v1.4 CURRENT AUTHORITATIVE**. Identifier: `DIUA-DIC-000030`. v1.3 and earlier are retained as historical registration evidence. FSS §12 validation passed all six checks; current layout registration is authorized by [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout).

## 12. FSS Validation Record — 2026-09-17

* Structural Validation — **PASS**
* Workflow Conformance — **PASS**
* Dependency Conformance — **PASS**
* Conflict Detection — **PASS**
* Completeness — **PASS**
* Executability — **PASS**

Safe-area coordinates remain **\[UNCONFIRMED — SOURCE GAP\]** outside this typography object's authority. The gap is explicit and routes to governance/human decision if required by execution; no coordinate was inferred.

**Final disposition:** REGISTERED / CONFORMANT.

---

## Dependency Currency Reconciliation — 2026-09-19

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** Recorded under the CWC amendment discipline (`[Root Level Architecture v1.11 §11, R7]`; `[Root Governance v1.11 §5, §6 CONSTRAINT]`; `[CWC-FSS-001 §14]`).

**FSS-001 pin synchronized v1.22 → v1.23 and CWC-QA-001 pin synchronized v1.22 → v1.23.** Both advanced only to record and reconcile against the Story Format Registry entry; each states in its own Status field that no architecture, schema, rule mode, Stage Attachment Model, Format Addition Gate, QA criterion ID, Gate, verdict, routing rule, evidence schema, or QA Record schema changed. **Re-verification result: CONFORMANT.** `FORMAT-REEL` remains present in `[FSS-001 §11.1]` with `status: REGISTERED`, version 1.0, identifier `DIUA-DIC-000030`, and this document as its authoritative Format Object.

**Universal Identifier pointer unpinned.** The field pinned Registration Record v1.22 / Registry v1.24, both superseded (current: Registration Record v1.23, Registry v1.25). `DIUA-DIC-000030` is established by allocation act `CONTENT-OS-ALLOC-030`, which the field already names; the revision numbers added only a staleness surface and are removed.

No typography value, Stage Attachment clause, readability floor, temporal/sequential rule, scaling rule, asset-typography boundary, or registration state changed. The Reel safe-area coordinate gap remains an explicit `[UNCONFIRMED — SOURCE GAP]` and is unaffected. At that 2026-09-19 historical checkpoint, `FORMAT-REEL` remained **v1.0 REGISTERED**; this statement is superseded by Owner-directed v1.1 under [BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule).

## Dependency Reconciliation — 2026-09-20

FSS-001 advanced v1.23→v1.24 to register FORMAT-POSTER v1.1; CWC-QA-001 advanced v1.23→v1.24 to consume its additive Poster QA criteria. FORMAT-REEL v1.0 was re-verified against both revisions. **Result: CONFORMANT.** No Reel format rule, typography value, Stage Attachment, safe-area source-gap disposition, registration state, or identifier changed.

## Dependency Currency Reconciliation — 2026-09-22

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** CWC Production Bible advanced v2.14 → v2.15 under [BUS-93](https://linear.app/bussiness-content-os/issue/BUS-93/cwc-caption-and-hashtag-standard-five-tag-locality-rule) solely to add §6.6.1 Social Caption & Hashtag Standard (exactly five hashtags; at least one contextually relevant locality hashtag). This document's declared use of CPB was re-verified. **Result: CONFORMANT.** No local schema, lifecycle authority, format rule, QA architecture, identifier behavior, or production behavior is changed by this pointer synchronization.

---

## v1.1 Owner-Directed Registration Record — 2026-09-25

[BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule) requires the Brand Presenter Primary Layout on the opening visual beat/opening branded frame and on any separately produced Reel cover/thumbnail. Later beats remain flexible. Logo and Footer Platform remain unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE.

---

## v1.2 Storage-Authority Dependency Reconciliation — 2026-09-26

Compliance-only revision under [BUS-111](https://linear.app/bussiness-content-os/issue/BUS-111/cross-tier-storage-authority-audit-and-remediation). Current upstream dependencies were re-verified after [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) storage-authority remediation. Opening branded-frame/cover applicability, typography, sequencing, and registration semantics are unchanged.

**Version:** 1.1 → 1.2.

## v1.3 Owner-Directed Universal Escalation Record — 2026-09-27

Under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body), the Owner escalated the [BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract)/FORMAT-CAROUSEL v1.3 50:50 full-body Slide 1 contract from a Carousel-only exception into the universal cross-format default, applied here to Reel's opening branded frame / cover.

Superseded Reel behavior: opening frame left 2/3 copy / right 1/3 presenter / hip-to-head, nominal split x=720.

Current Reel behavior:

* 50:50 composition, nominal split x=540;
* copy field x=72–504/y=356–1579;
* full-body presenter, containment x=576–1044/y=356–1764;
* bottom anchor y=1764;
* at least one hand points toward or presents the copy;
* no anatomical or lateral clipping;
* applies to the opening branded frame and any separately produced cover/thumbnail only — later beats unaffected.

Reel's platform-overlay safe-area remains its own pre-existing \[UNCONFIRMED — SOURCE GAP\], not resolved by this amendment. Logo/footer rules and typography matrix remain unchanged. Identifier `DIUA-DIC-000030` is unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE.

## v1.4 Cross-Format Reference-Validated Registration Record — 2026-09-28

Under [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout), the opening branded frame and any separately produced Reel cover/thumbnail adopt the current cross-format reference-validated layout.

Current 1080 px horizontal realization:

* copy anchor x=72; maximum x≈551;
* protected gutter x≈551–605;
* presenter core x≈670–1015;
* gesture allowance x≈572–594;
* presenter remains right-anchored and directs attention toward copy;
* full-body is the default reference framing; hip-to-head/close crop is permitted as a framing adaptation inside the same placement model.

Reel presenter-presence applicability is unchanged: later beats do not gain a presenter requirement solely from this amendment. Existing safe-area uncertainty is not reinterpreted.

**Disposition: REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION.**