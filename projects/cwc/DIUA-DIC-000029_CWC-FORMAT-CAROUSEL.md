---
document_name: "CWC FORMAT-CAROUSEL"
document_class: "Tier 2 Format Specialization Object / Carousel Production Specification"
structural_classification: "Tiered — Domain/Project Tier 2 — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner"
related_issue: "BUS-124"
universal_identifier: "DIUA-DIC-000029"
version: "1.4"
status: "REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION"
depends_on:
  - id: "DIUA-DIC-000017"
    name: "CWC Production Workflow"
    version: "1.22"
    status: "CANONICAL LOCKED"
  - id: "DIUA-DIC-000012"
    name: "Coz We Care — Production Bible"
    version: "2.22"
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
  locator: "https://linear.app/bussiness-content-os/document/cwc-format-carousel-v14-registered-owner-locked-4e5f5baf2042"
representation_profile: "DIUA-DIC-000026@1.3"
---
# CWC FORMAT-CAROUSEL

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | CWC FORMAT-CAROUSEL |
| Document Class | Tier 2 Format Specialization Object / Carousel Production Specification |
| System | Content OS → Coz We Care (CWC) |
| Format ID | `FORMAT-CAROUSEL` |
| Document Version | 1.4 |
| Document Status | REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION |
| Format Object Status | REGISTERED |
| Owner | **\[FORMAL\]** Billy Fernando Mende — CWC domain Owner |
| Related Issue | [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) — CWC Cross-Format Reference-Validated Copy / Brand Presenter Layout |
| Structural Classification | Tiered — Domain/Project Tier 2 — Coz We Care |
| Universal Identifier | `DIUA-DIC-000029` — ALLOCATED / ACTIVE via CONTENT-OS-ALLOC-029 |
| Depends On | CWC Production Workflow v1.22 CANONICAL LOCKED; CPB v2.22 CANONICAL; CWC-FSS-001 v1.31 CANONICAL; CWC-QA-001 v1.32 CANONICAL; CAB v1.36 CANONICAL; CRS v1.23 CANONICAL |

---

## 1. Purpose

Define the registered CWC format specialization for multi-slide static social-feed carousels. This object specializes the canonical CWC Production Workflow through FSS-001 without redefining lifecycle, approval, publication, asset authority, or QA architecture.

## 2. Applicability

`FORMAT-CAROUSEL` applies to one CWC Content Item whose output is a sequence of static social-feed slides. Baseline per slide: **1080 × 1350 px (4:5 portrait)**.

A carousel is one Content Item with a multi-slide output package. Each slide must have one primary communication role and preserve sequence continuity.

## 3. Stage Attachments

format_id: FORMAT-CAROUSEL
format_name: CWC Social Feed Carousel
status: REGISTERED
version: "1.4"
applicability: multi-slide static social-feed carousel

### PLANNING — EXTEND

* baseline slide canvas: 1080×1350 px, portrait 4:5
* carousel is one Content Item with a multi-slide output package
* Slide 1 is the mandatory branded frame
* Slide 1 uses the [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) reference-validated cross-format layout
* full-body is the default presenter reference framing; hip-to-head / close crop is permitted only as a framing adaptation inside the same right-side placement model
* presenter should visually direct attention toward copy through pose, gaze, or gesture

### CONTENT_PRODUCTION — CONSTRAIN

* Slide 1 live copy is left-aligned with default anchor x=72 and must not extend beyond x≈551 (51% of width)
* x≈551–605 is the protected composition gutter and is not a second copy column
* later-slide copy remains distributed by message role rather than compressed below readability floors

### ASSET_PREPARATION — EXTEND

* AS-002 Brand Presenter asset for Slide 1 suitable for the right-side placement model
* canonical logo/footer assets according to existing applicability; their geometry and Production Behavior remain unchanged

### VISUAL_PRODUCTION — CONSTRAIN

* Slide 1 copy left anchor = x=72; copy maximum = x≈551
* Slide 1 protected composition gutter = x≈551–605
* Slide 1 presenter core body zone = x≈670–1015
* Slide 1 gesture allowance = x≈572–594 only when intentionally directing attention toward copy
* gesture may not obscure headline, supporting copy, CTA, logo, or footer
* full-body is default; hip-to-head / close crop remains a framing adaptation inside the same right-side placement model
* presenter remains above applicable footer protection
* canonical logo/footer protected regions remain unchanged
* later slides do not gain a presenter requirement solely from v1.4
* apply the existing FORMAT-CAROUSEL typography matrix on all slides

### QA — EXTEND

* verify Slide 1 copy is left-aligned at the registered anchor and does not extend beyond 51% width
* verify x≈551–605 remains a protected composition gutter
* verify AS-002 presenter core remains right-anchored approximately within x≈670–1015
* verify any cross-gutter gesture is intentional and limited approximately to x≈572–594
* verify gesture does not obscure essential copy or protected assets
* verify presenter visually directs attention toward copy
* verify selected framing remains inside the same right-side placement model
* verify canonical logo/footer geometry and Production Behavior are unchanged
* verify slide-to-slide typography hierarchy and readability floors

Stages not declared above inherit the Core Workflow unchanged. No APPROVAL, PUBLICATION, or RECORD attachment is declared.

## 3.1 Slide 1 Reference-Validated Boundary Contract — OWNER-LOCKED

Baseline canvas: **1080 × 1350 px**.

### Copy

* default left anchor: **x=72**
* maximum horizontal extent: **x≈551**
* protected composition gutter begins immediately after copy maximum: **x≈551–605**
* copy remains left-aligned and may not use the gutter as an additional text column

### Presenter

* core body zone: **x≈670–1015**
* gesture allowance: **x≈572–594**
* full-body = default reference framing
* hip-to-head / close crop = permitted framing adaptation within the same right-side placement model
* pose, gaze, or gesture should direct attention toward copy
* presenter must remain clear of canonical footer protection and other protected regions

The presenter may be uniformly scaled and repositioned within the governed placement model. If an existing reusable asset cannot satisfy the placement and identity rules, another lifecycle-eligible asset must be selected through STG-06; do not distort anatomy or silently regenerate.

This v1.4 Carousel rule is the format-local realization of the [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) cross-format invariant.

## 4. Typography Matrix

Baseline per slide: **1080 × 1350 px (4:5)**.

| Semantic Role | CPB Weight | Default Size | Line Height | Tracking | Carousel Floor |
| -- | -- | -- | -- | -- | -- |
| Hero / Cover Display | 800 | 88 px | 92 px | \-0.01em | 80 px |
| Headline | 700–800 | 72 px | 82 px | \-0.01em | 64 px |
| Subheadline | 700 | 52 px | 64 px | 0 | 46 px |
| Kicker / Eyebrow / Label | 600 | 28 px | 34 px | +0.04em | 26 px |
| Body | 400–500 | 38 px | 52 px | 0 | 36 px |
| Supporting Text | 500 | 34 px | 46 px | 0 | 32 px |
| CTA | 700 | 38 px | 44 px | 0 | 36 px |
| Data / Key Number | 700–800 | 88 px | 92 px | \-0.01em | 80 px |

## 5. Readability Rule

* Essential explanatory live text should normally remain **≥36 px** on a 1080×1350 slide.
* Supporting micro-copy may reach **32 px** when short and non-primary.
* Kicker/label may use **26–28 px** because it is categorical/short-form text rather than reading copy.
* If body copy would need to go below its floor, split or rewrite the slide rather than shrinking the typography.

## 6. Sequence Consistency Rule

Across one carousel:

1. the same semantic role retains the same default typography treatment unless a documented slide-role exception exists;
2. Cover/Hook may use Hero or Headline treatment;
3. internal educational slides prioritize Headline/Subheadline + Body hierarchy;
4. CTA/closing slide may use CTA treatment but must not introduce a new typeface or unapproved weight;
5. visual variety comes from layout, scale within the allowed range, imagery, and composition—not arbitrary typeface changes.

## 7. Scaling Rule

For a slide canvas that preserves 4:5 but changes pixel width, values scale proportionally from the 1080 px baseline.

Materially different aspect ratios require an explicit governed variant or another registered Format Specialization Object. Do not infer.

## 8. Asset Typography Boundary

This object does not override asset-intrinsic typography governed by CAB/CRS. If a canonical exact-reuse asset contains typography, that typography remains governed by the asset authority and must not be rebuilt as live carousel text.

## 9. Owner Approval

Owner continuation/approval received on **2026-09-17** through [BUS-66](https://linear.app/bussiness-content-os/issue/BUS-66/cwc-format-carousel-typography-specialization-and-registration) workflow. Approved scope is exactly the matrix and rules presented in [BUS-66](https://linear.app/bussiness-content-os/issue/BUS-66/cwc-format-carousel-typography-specialization-and-registration); no numeric value was changed during materialization.

## 10. Registration State

Current state: **REGISTERED / CONFORMANT — v1.4 CURRENT AUTHORITATIVE / OWNER-LOCKED**. v1.3 and earlier are retained as historical registration evidence. v1.4 implements the [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) cross-format reference-validated layout on Slide 1.

Owner approval/continuation recorded on 2026-09-17. Identifier `DIUA-DIC-000029` is ALLOCATED / ACTIVE.

FSS §12 validation results:

* Structural Validation — **PASS**
* Workflow Conformance — **PASS**
* Dependency Conformance — **PASS**
* Conflict Detection — **PASS**
* Completeness — **PASS**
* Executability — **PASS**

Validation confirms that this object uses only legal EXTEND/CONSTRAIN attachment modes; introduces no APPROVAL/PUBLICATION/RECORD override; keeps asset-intrinsic typography under CAB/CRS; contributes QA criteria additively through the existing FSS channel; and provides deterministic format-specific typography rules.

**Registration disposition:** REGISTERED / CONFORMANT. Recognition by STG-04 becomes effective when this object is present in the FSS Format Registry with `status: REGISTERED`.

---

## Dependency Currency Reconciliation — 2026-09-19

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** Recorded under the CWC amendment discipline (`[Root Level Architecture v1.11 §11, R7]`; `[Root Governance v1.11 §5, §6 CONSTRAINT]`; `[CWC-FSS-001 §14]`).

**FSS-001 pin synchronized v1.21 → v1.23 and CWC-QA-001 pin synchronized v1.21 → v1.23.** FSS-001 advanced only to record the Reel and Story Format Registry entries, and CWC-QA-001 only to reconcile against those registrations; both state in their own Status fields that no architecture, schema, rule mode, Stage Attachment Model, Format Addition Gate, QA criterion ID, Gate, verdict, routing rule, evidence schema, or QA Record schema changed. **Re-verification result: CONFORMANT.** `FORMAT-CAROUSEL` remains present in `[FSS-001 §11.1]` with `status: REGISTERED`, version 1.0, identifier `DIUA-DIC-000029`, and this document as its authoritative Format Object.

No typography value, Stage Attachment clause, readability floor, sequence-consistency rule, scaling rule, asset-typography boundary, or registration state changed. At that 2026-09-19 historical checkpoint, `FORMAT-CAROUSEL` remained **v1.0 REGISTERED**; this statement is superseded by Owner-directed v1.1 under [BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule).

## Dependency Reconciliation — 2026-09-20

FSS-001 advanced v1.23→v1.24 to register FORMAT-POSTER v1.1; CWC-QA-001 advanced v1.23→v1.24 to consume its additive Poster QA criteria. FORMAT-CAROUSEL v1.0 was re-verified against both revisions. **Result: CONFORMANT.** No Carousel format rule, typography value, Stage Attachment, registration state, or identifier changed.

## Dependency Currency Reconciliation — 2026-09-22

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** CWC Production Bible advanced v2.14 → v2.15 under [BUS-93](https://linear.app/bussiness-content-os/issue/BUS-93/cwc-caption-and-hashtag-standard-five-tag-locality-rule) solely to add §6.6.1 Social Caption & Hashtag Standard (exactly five hashtags; at least one contextually relevant locality hashtag). This document's declared use of CPB was re-verified. **Result: CONFORMANT.** No local schema, lifecycle authority, format rule, QA architecture, identifier behavior, or production behavior is changed by this pointer synchronization.

---

## v1.1 Owner-Directed Registration Record — 2026-09-25

[BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule) adds a mandatory Slide 1 Brand Presenter Primary Layout: left 2/3 copy, right 1/3 AS-002 presenter, hip-to-head framing. Later slides remain governed by existing message/hierarchy rules unless separately amended. Logo and Footer Platform remain unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE.

---

## v1.2 Storage-Authority Dependency Reconciliation — 2026-09-26

Compliance-only revision under [BUS-111](https://linear.app/bussiness-content-os/issue/BUS-111/cross-tier-storage-authority-audit-and-remediation). Current upstream dependencies were re-verified after [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) storage-authority remediation. Slide-1 presenter applicability, layout, typography, sequencing, and registration semantics are unchanged.

**Version:** 1.1 → 1.2.

---

## v1.3 Owner-Locked Boundary Amendment — 2026-09-27

Under [BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract), the Owner locked the visually tested 50:50 full-body Slide 1 layout.

Superseded Carousel behavior: left 2/3 copy / right 1/3 presenter / hip-to-head.

Current Carousel Slide 1 behavior:

* 50:50 composition;
* copy field x=72–504 / y=250–1110;
* full-body presenter;
* presenter containment x=576–1044 / y=250–1240;
* bottom anchor y=1240;
* at least one hand points toward or presents the copy;
* no anatomical or lateral clipping.

Logo/footer rules and typography matrix remain unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE / OWNER-LOCKED.

## v1.4 Cross-Format Reference-Validated Registration Record — 2026-09-28

Under [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout), the [BUS-123](https://linear.app/bussiness-content-os/issue/BUS-123/cwc-format-poster-reference-validated-copy-brand-presenter-layout) reference-validated Poster composition was escalated into the current cross-format layout invariant.

FORMAT-CAROUSEL Slide 1 now uses:

* copy anchor x=72 and maximum x≈551;
* protected gutter x≈551–605;
* presenter core x≈670–1015;
* gesture allowance x≈572–594;
* right-side presenter attention direction toward copy;
* full-body default reference framing with hip-to-head/close crop permitted as an adaptation inside the same placement model.

Slide 1 presenter applicability is unchanged; later slides do not gain a presenter requirement from this amendment.

**Disposition: REGISTERED / OWNER-LOCKED / CURRENT AUTHORITATIVE REPRESENTATION.**

### 2026-10-10 — CPB v2.22 Dependency Currency Maintenance

Current normative CWC Production Bible pin synchronized from v2.21 to v2.22 following the Owner-directed caption follow/share closure in CPB §6.6.2. This is a **dependency pointer-only maintenance**; the local document version, workflow states, format geometry, asset behaviors, QA gates, register schema, and existing Content Item history remain unchanged. The two secondary engagement prompts are consumed from CPB at applicable caption-authoring steps, with clinical-action and five-hashtag rules preserved.
