---
document_name: "CWC FORMAT-STORY"
document_class: "Tier 2 Format Specialization Object / Story Production Specification"
structural_classification: "Tiered — Domain/Project Tier 2 — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner"
related_issue: "BUS-124"
universal_identifier: "DIUA-DIC-000031"
version: "1.6"
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
  locator: "https://linear.app/bussiness-content-os/document/cwc-format-story-v16-registered-0bad10002560"
representation_profile: "DIUA-DIC-000026@1.3"
---
# CWC FORMAT-STORY

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | CWC FORMAT-STORY |
| Document Class | Tier 2 Format Specialization Object / Story Production Specification |
| System | Content OS → Coz We Care (CWC) |
| Format ID | `FORMAT-STORY` |
| Document Version | 1.6 |
| Document Status | REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION |
| Format Object Status | REGISTERED |
| Owner | **\[FORMAL\]** Billy Fernando Mende — CWC domain Owner |
| Related Issue | [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) — CWC Cross-Format Reference-Validated Copy / Brand Presenter Layout |
| Structural Classification | Tiered — Domain/Project Tier 2 — Coz We Care |
| Universal Identifier | `DIUA-DIC-000031` — ALLOCATED / ACTIVE per [BUS-17](../../system/Content-OS-Universal-Identifier-Registration-Record.md) and [BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) |
| Depends On | CWC Production Workflow v1.22 CANONICAL LOCKED; CPB v2.22 CANONICAL; CWC-FSS-001 v1.31 CANONICAL; CWC-QA-001 v1.32 CANONICAL; CAB v1.36 CANONICAL; CRS v1.23 CANONICAL |

---

## 1. Purpose

Define the registered CWC format specialization for vertical full-screen Story output. This object specializes the canonical CWC Production Workflow through FSS-001 without redefining lifecycle, approval, publication, asset authority, or QA architecture.

## 2. Applicability

`FORMAT-STORY` applies to one CWC Content Item whose output is a vertical full-screen Story placement. Baseline canvas: **1080 × 1920 px (9:16 portrait)**.

FSS-001 §16.5 already establishes a full vertical 9:16 Story canvas and reserved safe zones for platform UI overlays. FORMAT-STORY v1.2 defines an Owner-approved CWC reserved-area envelope for the 1080 × 1920 Story canvas. These coordinates are a CWC production safety policy, not a claim of Meta-published platform geometry.

## 3. Stage Attachments

```yaml
format_id: FORMAT-STORY
format_name: CWC Vertical Full-Screen Story
status: REGISTERED
version: "1.6"
applicability: vertical full-screen Story placement

stage_attachments:
  PLANNING:
    rule: EXTEND
    production_requirements:
      - "baseline canvas: 1080×1920 px, portrait 9:16"
      - "reserve governed safe zones for platform UI overlays (BUS-86 envelope, unchanged)"
      - "AS-002 CWC Official Brand Presenter remains mandatory in every Story frame"
      - "every Story frame uses the BUS-124 reference-validated layout inside the BUS-86 primary content field"
      - "full-body is the default reference framing; hip-to-head/close crop is a framing adaptation inside the same right-side placement model"

  CONTENT_PRODUCTION:
    rule: CONSTRAIN
    additional_output_contract_clauses:
      - "copy is left-aligned at x≈134 and must not extend beyond x≈549 inside the BUS-86 field"
      - "x≈549–596 is the protected composition gutter"
      - "copy shall not descend past the existing deterministic copy lower boundary y=1376"
      - "if one Story frame cannot carry the message, split/rewrite content rather than shrinking essential text"

  ASSET_PREPARATION:
    rule: EXTEND
    additional_asset_requirement_categories:
      - "AS-002 Brand Presenter production asset for every Story frame"
      - "canonical logo/footer assets according to existing applicability; geometry and Production Behavior unchanged"

  VISUAL_PRODUCTION:
    rule: CONSTRAIN
    production_requirements:
      - "every frame uses BUS-86 primary content field x=72–1008/y=250–1620 unchanged"
      - "copy left anchor x≈134; copy maximum x≈549"
      - "protected composition gutter x≈549–596"
      - "presenter core body zone x≈652–952"
      - "gesture allowance x≈568–587 only when intentionally directing attention toward copy"
      - "presenter remains inside the BUS-86 vertical envelope and above the reserved bottom region"
      - "full-body is default; hip-to-head/close crop is permitted only inside the same right-side placement model"
      - "gesture may not obscure essential copy, logo, footer, or reserved UI-safe areas"
      - "governed Story safe/reserved areas (BUS-86) remain authoritative and unchanged"
      - "canonical logo/footer protected regions remain unchanged"
      - "pose/costume may vary only within CAB AS-002 identity-preservation rules; no stretch/distort/recolor/redraw/identity alteration/silent regeneration"
      - "apply the existing FORMAT-STORY typography matrix"

  QA:
    rule: EXTEND
    additional_validation_criteria:
      - "verify AS-002 Brand Presenter is present in every Story frame"
      - "verify copy is left-aligned at x≈134 and does not extend beyond x≈549"
      - "verify x≈549–596 remains a protected composition gutter"
      - "verify presenter core is right-anchored approximately within x≈652–952"
      - "verify any gesture intrusion is intentional and approximately within x≈568–587"
      - "verify gesture does not obscure essential copy or protected regions"
      - "verify presenter visually directs attention toward copy"
      - "verify selected framing remains inside the same right-side placement model"
      - "verify presenter placement respects the unchanged BUS-86 Story safe/reserved areas"
      - "verify canonical logo/footer are unchanged where applicable"
      - "verify typography/readability floors and no blocking collision"
```

Stages not declared above inherit the Core Workflow unchanged.

## 4. Typography Matrix

Baseline canvas: **1080 × 1920 px (9:16)**.

**Shared-matrix note:** this matrix is intentionally numerically aligned with `FORMAT-REEL` because both use the same 1080 × 1920 baseline canvas and current typography scale. The duplication here is a format-local snapshot for executability, not a separate authority. If either matrix changes, both must be reviewed for conformance to avoid silent drift.

| Semantic Role | CPB Weight | Default Size | Line Height | Tracking | Story Floor |
| -- | -- | -- | -- | -- | -- |
| Hero / Hook Display | 800 | 104 px | 108 px | \-0.01em | 92 px |
| Headline | 700–800 | 84 px | 94 px | \-0.01em | 76 px |
| Subheadline | 700 | 60 px | 72 px | 0 | 54 px |
| Kicker / Eyebrow / Label | 600 | 30 px | 36 px | +0.04em | 28 px |
| Body | 400–500 | 44 px | 60 px | 0 | 40 px |
| Supporting Text | 500 | 36 px | 48 px | 0 | 34 px |
| CTA | 700 | 44 px | 50 px | 0 | 40 px |
| Data / Key Number | 700–800 | 104 px | 108 px | \-0.01em | 92 px |

## 5. Readability and Frame Hierarchy

Essential explanatory live text should normally remain ≥40 px. Supporting text may reach 34–36 px when short and non-primary. Kicker/label may use 28–30 px. If body copy would need to go below its floor, split or rewrite the Story instead of shrinking typography.

Each Story frame should carry one primary message. Opening frames may use Hero/Headline treatment; explanatory frames should prioritize Headline/Subheadline + Body; CTA frames may use CTA treatment; Data/Key Number may dominate for numeric emphasis.

## 6. Scaling Rule

For a Story canvas that preserves 9:16 but changes pixel width, typography values scale proportionally from the 1080 px baseline width. Materially different aspect ratios require an explicit governed variant or another registered Format Specialization Object.

## 7. Reserved-Area Boundary — OWNER-DEFINED CWC STORY ENVELOPE

FSS-001 §16.5 requires reserved safe zones for platform UI overlays. Current accessible first-party Meta material does not expose a deterministic numeric pixel-coordinate table for organic Instagram Story placement. Therefore FORMAT-STORY does **not** represent the following coordinates as Meta-published platform fact.

By explicit Owner decision under [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) on **2026-09-23**, CWC adopts this conservative production envelope for the canonical **1080 × 1920 px** Story canvas:

* **Top reserved band:** 250 px
* **Bottom reserved band:** 300 px
* **Left reserved band:** 72 px
* **Right reserved band:** 72 px
* **Primary content field:** x = 72–1008; y = 250–1620
* **Primary content field size:** 936 × 1370 px

### Required behavior

1. Essential live text, AS-001 logo, required AS-002 presenter identity features, and primary CTA/question copy SHALL remain inside the primary content field.
2. Decorative overflow may extend beyond the primary field only when loss or platform occlusion would not affect meaning, required identity recognition, or brand recognition.
3. Native Instagram Poll/Question controls remain publication-layer elements and are positioned during human in-app assembly within the central usable region.
4. Final in-app preview is mandatory before publication because platform UI can vary by device, account, and release.
5. This Story envelope SHALL NOT be reused for Reel. Reel geometry remains independently governed.
6. If future first-party Meta Story geometry becomes recoverable, it may supersede this Owner-defined envelope only through a governed FORMAT-STORY amendment.

### Authority boundary

These numbers are **CWC policy coordinates**, not inferred or recovered Instagram/Meta coordinates.

## 7.1 Mandatory Brand Presenter Primary Layout Rule — v1.6

AS-002 CWC Official Brand Presenter remains a **mandatory visual component of every CWC Story frame**. This stronger every-frame applicability is unchanged.

Under [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout), every Story frame implements the CWC cross-format reference-validated layout **inside the unchanged** [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) **primary content field** (x=72–1008, y=250–1620). The [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) envelope is never re-margined or redefined by this rule.

Horizontal realization inside the 936 px [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) field:

* copy left anchor: **x≈134**;
* copy maximum: **x≈549**;
* protected composition gutter: **x≈549–596**;
* AS-002 presenter core body zone: **x≈652–952**;
* intentional presenter gesture allowance: **x≈568–587**.

Vertical behavior remains format-local:

* essential copy retains the existing lower boundary **y=1376**;
* presenter remains within the [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) legal vertical field and above the reserved bottom region;
* full-body is the default reference framing;
* hip-to-head / close crop is permitted only as a framing adaptation inside the same right-side placement model.

### Required behavior

* Every Story frame SHALL visibly include AS-002.
* Essential copy SHALL remain left-aligned and must not extend beyond x≈549.
* x≈549–596 SHALL remain a protected composition gutter; it is not a second copy column.
* Presenter core body SHALL remain right-anchored approximately within x≈652–952.
* A hand/arm gesture MAY intentionally enter approximately x≈568–587 only when it directs attention toward or presents the copy.
* Gesture intrusion SHALL NOT obscure headline, supporting copy, CTA, logo, footer, or reserved UI-safe areas.
* Presenter SHOULD visually direct attention toward copy through pose, gaze, or gesture.
* Live copy SHALL NOT descend past y=1376; if copy does not fit within typography floors, rewrite/split the frame rather than shrinking typography below its floor.
* No copy/presenter collision is permitted.
* Costume, pose, gesture, orientation, and allowed framing adaptation may change contextually while preserving AS-002 canonical identity and rendering rules.
* The existing [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) reserved/safe-area envelope, canonical Official Brand Logo, and Footer Platform remain completely unchanged.
* Omitting AS-002, placing presenter core in the copy field, using the protected gutter as normal copy space, obscuring essential copy with gesture, or violating [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) safe areas is a **blocking FORMAT-STORY conformance failure**.

### Authority boundary

[BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) owns the current cross-format layout invariant. FORMAT-STORY owns its every-frame applicability, Story-local coordinate realization, vertical bounds, typography, and safe-area interaction. [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) remains the sole authority for the reserved-area envelope itself. CAB/CRS remain authoritative for AS-002 identity, generation references, lifecycle, rendering language, and identity-preservation constraints.

**Supersession note:** the v1.5 50:50/full-body Story geometry under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) is historical and no longer current. Historical amendment records remain provenance only.

## 8. Asset Typography Boundary

This object does not override asset-intrinsic typography governed by CAB/CRS. Canonical exact-reuse asset typography must not be rebuilt as live Story text.

## 9. Owner Approval

Owner continuation/approval received on **2026-09-17** through [BUS-68](https://linear.app/bussiness-content-os/issue/BUS-68/cwc-format-story-typography-specialization-and-registration) workflow. Approved scope is exactly the matrix and rules presented in [BUS-68](https://linear.app/bussiness-content-os/issue/BUS-68/cwc-format-story-typography-specialization-and-registration); no numeric value changed during materialization.

## 10. Registration State

Current state: **REGISTERED / CONFORMANT — v1.6 CURRENT AUTHORITATIVE**. v1.5 remains the immediately prior historical state. v1.6 retains the Owner-defined CWC Story reserved-area envelope and every-frame AS-002 applicability unchanged, while replacing the [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) 50:50/full-body geometry with the [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) cross-format reference-validated composition derived inside the [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) primary content field.

Current Story horizontal realization:

* copy anchor x≈134; maximum x≈549;
* protected gutter x≈549–596;
* presenter core x≈652–952;
* gesture allowance x≈568–587;
* full-body default reference framing; hip-to-head/close crop permitted only as a framing adaptation inside the same right-side placement model.

The safe-area envelope remains governed under [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) and is unchanged by this amendment. The envelope is a CWC production safety policy and is not represented as Meta-published geometry.

FSS §12 validation completed on 2026-09-17: Structural Validation PASS; Workflow Conformance PASS; Dependency Conformance PASS; Conflict Detection PASS; Completeness PASS; Executability PASS.

Universal Identifier: `DIUA-DIC-000031`. Story reserved-area coordinates are now Owner-defined CWC production policy under [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story): top 250 px; bottom 300 px; left/right 72 px; primary field x 72–1008, y 250–1620. Reel geometry is outside this object's scope.

## Dependency Reconciliation — 2026-09-20

FSS-001 advanced v1.23→v1.24 to register FORMAT-POSTER v1.1; CWC-QA-001 advanced v1.23→v1.24 to consume its additive Poster QA criteria. FORMAT-STORY v1.0 was re-verified against both revisions. **Result: CONFORMANT.** No Story format rule, typography value, Stage Attachment, safe-zone source-gap disposition, registration state, or identifier changed.

## Dependency Currency Reconciliation — 2026-09-22

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** CWC Production Bible advanced v2.14 → v2.15 under [BUS-93](https://linear.app/bussiness-content-os/issue/BUS-93/cwc-caption-and-hashtag-standard-five-tag-locality-rule) solely to add §6.6.1 Social Caption & Hashtag Standard (exactly five hashtags; at least one contextually relevant locality hashtag). This document's declared use of CPB was re-verified. **Result: CONFORMANT.** No local schema, lifecycle authority, format rule, QA architecture, identifier behavior, or production behavior is changed by this pointer synchronization.

## Owner Amendment — 2026-09-23 — v1.1 (Historical)

**Supersession note (2026-09-25):** the crop/framing flexibility recorded below ("permits non-full-body crop and space-adaptive framing") was superseded by v1.3 §7.1 — every Story frame now specifically requires hip-to-head framing. This record is retained as provenance for the presenter-mandatory decision only and does not describe current framing rules.

Under [BUS-97](https://linear.app/bussiness-content-os/issue/BUS-97/cwc-format-story-mandatory-brand-presenter-rule), the Owner establishes AS-002 CWC Official Brand Presenter as mandatory in every CWC Story frame.

The amendment:

* requires presenter presence in every Story frame;
* permits costume changes appropriate to content context;
* permits non-full-body crop and space-adaptive framing;
* preserves CAB/CRS authority over AS-002 identity and GENERATIVE_REFERENCE behavior;
* adds corresponding Planning, Visual Production, and QA requirements;
* does not alter typography values, canvas geometry, identifier rules, lifecycle architecture, or safe-area source-gap status.

**Result:** FORMAT-STORY v1.1 remains **REGISTERED / CONFORMANT**.

## Owner Amendment — 2026-09-23 — v1.2 RESERVED-AREA ENVELOPE — LOCKED

**Trigger:** [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) — CWC 9:16 Reserved-Area Geometry — Reel & Story.

**Owner act:** APPROVED / LOCKED.

FORMAT-STORY advances **v1.1 → v1.2**.

For 1080 × 1920 Story output, the canonical CWC reserved-area production envelope is:

* top 250 px;
* bottom 300 px;
* left 72 px;
* right 72 px;
* primary content field x 72–1008 / y 250–1620.

This is explicitly a **CWC production safety policy**, not a representation of Meta-published Story pixel geometry.

Regression result:

* typography matrix unchanged;
* typography floors unchanged;
* AS-002 mandatory presenter rule unchanged;
* canvas unchanged;
* lifecycle/workflow architecture unchanged;
* QA architecture unchanged;
* no Reel geometry is inferred from this Story decision.

**Result:** FORMAT-STORY v1.2 = **REGISTERED / CONFORMANT / OWNER-LOCKED**.

---

## v1.3 Owner-Directed Registration Record — 2026-09-25

[BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule) preserves Story's stronger presenter-presence rule (AS-002 in every frame) and adds fixed layout/framing: left 2/3 copy, right 1/3 presenter, hip-to-head on every Story frame. Existing Story safe areas remain authoritative. Logo and Footer Platform remain unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE.

---

## v1.4 Storage-Authority Dependency Reconciliation — 2026-09-26

Compliance-only revision under [BUS-111](https://linear.app/bussiness-content-os/issue/BUS-111/cross-tier-storage-authority-audit-and-remediation). Current upstream dependencies were re-verified after [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) storage-authority remediation. Every-frame presenter requirement, split/framing, typography, and registration semantics are unchanged.

**Version:** 1.3 → 1.4.

---

## v1.5 Owner-Directed Universal Escalation Record — 2026-09-27

**Trigger:** [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) — CWC Cross-Format Brand Presenter Layout — Universal 50:50 Full-Body Escalation (Supersedes [BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule) Default).

**Owner act:** Explicit Owner-directed continuation instruction, 2026-09-27, escalating the [BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract) Carousel-only 50:50/full-body/hand-to-copy rule into the universal cross-format Brand Presenter Primary Layout default for Poster, Reel, and Story.

**Old rule (v1.3, now historical/superseded):** left 2/3 copy / right 1/3 AS-002 presenter; nominal split x=720; presenter framing hip-to-head; applied to every Story frame.

**New rule (v1.5, current authoritative):** 50:50 copy/presenter split at true midpoint of the unchanged [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) primary content field (x=540); copy field x=134–509/y=250–1376 (deterministic copy lower boundary y=1376); presenter field x=571–977/y=250–1508, full body, no head/hand/arm/foot/lateral clipping; deterministic presenter bottom anchor y=1508; mandatory hand-to-copy direction (point toward or open-palm present); applies to every Story frame (unchanged stronger applicability, preserved from v1.1/v1.3 — no new frames gained a presenter requirement, since every frame already required one).

**Geometry derivation:** derived directly from the Story canvas and the existing Owner-locked [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) reserved-area envelope (x=72–1008/y=250–1620), per the [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) Format-Aware Derivation Method — the envelope is treated as the legal content field and is never re-margined; only the 50:50 split and full-body/hand-to-copy/no-clipping rules are applied inside it. Coordinates are NOT copied from FORMAT-CAROUSEL's 1080×1350 reference.

**Authority effect:** FORMAT-STORY §7.1 now states the 50:50 full-body rule as current normative Story behavior. The v1.3 hip-to-head/2-3:1-3 text is retained verbatim above as historical provenance under "v1.3 Owner-Directed Registration Record — 2026-09-25" and is explicitly marked superseded; it must not be read as current.

**Regression result:**

* every-frame AS-002 mandatory-presenter applicability — UNCHANGED;
* [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) reserved-area envelope (top 250 px / bottom 300 px / left-right 72 px / primary field x=72–1008,y=250–1620) — UNCHANGED, not re-margined or redefined;
* canonical Official Brand Logo and Footer Platform identity, geometry, and protected-region treatment — UNCHANGED;
* typography matrix and typography floors — UNCHANGED;
* AS-002 identity, generation-reference hierarchy, and CAB/CRS authority — UNCHANGED;
* Universal Identifier `DIUA-DIC-000031` — UNCHANGED;
* Workflow Stage/Lifecycle State/QA Gate architecture — UNCHANGED, no new gate created;
* no Reel geometry is inferred from or applied to this Story decision.

**Version transition:** FORMAT-STORY v1.4 → **v1.5 REGISTERED**.

**Superseded rule:** v1.3 §7.1 left-2/3:right-1/3 hip-to-head layout ([BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule)), retained as historical provenance only.

**Downstream consumers:** CWC-FSS-001 §11.1 Current Registered Formats table (pointer update to v1.5/[BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body)); CWC-QA-001 (already carries the universal additive QA criteria channel; no new Story-specific QA Gate required); CWC Production Bible §7.4.2.1 (already amended to the universal default under v2.18). No Content ID semantics, publication/history records, or approval mechanism changed by this amendment.

**Result:** FORMAT-STORY v1.5 = **REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE**.

## v1.6 Cross-Format Reference-Validated Registration Record — 2026-09-28

Under [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout), FORMAT-STORY adopts the same reference-validated horizontal composition used by the other CWC mandatory branded frames, derived inside the unchanged [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) primary content field.

Current Story realization:

* copy anchor x≈134; maximum x≈549;
* protected gutter x≈549–596;
* presenter core x≈652–952;
* gesture allowance x≈568–587;
* full-body default reference framing, with hip-to-head/close crop permitted as a framing adaptation inside the same right-side placement model.

Every-frame AS-002 applicability and [BUS-86](https://linear.app/bussiness-content-os/issue/BUS-86/cwc-916-reserved-area-geometry-reel-and-story) safe-area authority remain unchanged.

**Disposition: REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION.**

### 2026-10-10 — CPB v2.22 Dependency Currency Maintenance

Current normative CWC Production Bible pin synchronized from v2.21 to v2.22 following the Owner-directed caption follow/share closure in CPB §6.6.2. This is a **dependency pointer-only maintenance**; the local document version, workflow states, format geometry, asset behaviors, QA gates, register schema, and existing Content Item history remain unchanged. The two secondary engagement prompts are consumed from CPB at applicable caption-authoring steps, with clinical-action and five-hashtag rules preserved.
