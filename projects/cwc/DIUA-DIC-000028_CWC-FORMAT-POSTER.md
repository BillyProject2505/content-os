---
document_name: "CWC FORMAT-POSTER"
document_class: "Tier 2 Format Specialization Object / Poster Production Specification"
structural_classification: "Tiered — Domain/Project Tier 2 — Coz We Care"
system: "Content OS → Coz We Care (CWC)"
owner: "[FORMAL] Billy Fernando Mende — CWC domain Owner"
related_issue: "BUS-124"
universal_identifier: "DIUA-DIC-000028"
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
  locator: "https://linear.app/bussiness-content-os/document/cwc-format-poster-v16-registered-f10ea88e37eb"
representation_profile: "DIUA-DIC-000026@1.3"
---
# CWC FORMAT-POSTER

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | CWC FORMAT-POSTER |
| Document Class | Tier 2 Format Specialization Object / Poster Production Specification |
| System | Content OS → Coz We Care (CWC) |
| Format ID | `FORMAT-POSTER` |
| Document Version | 1.6 |
| Document Status | **REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION** |
| Current Authoritative Version | **v1.6 REGISTERED** |
| Registration Disposition | **REGISTERED — v1.6 retains the reference-validated FORMAT-POSTER v1.5 geometry unchanged and reconciles it to the current cross-format authority** [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout)\*\*.\*\* |
| Owner | **\[FORMAL\]** Billy Fernando Mende — CWC domain Owner |
| Related Amendment Issue | [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) — CWC Cross-Format Reference-Validated Copy / Brand Presenter Layout |
| Current Authority Issue | [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) |
| Prior Cross-Format Authority | [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) — superseded by [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) for current layout geometry across registered CWC formats; [BUS-123](https://linear.app/bussiness-content-os/issue/BUS-123/cwc-format-poster-reference-validated-copy-brand-presenter-layout) retained as the validated Poster source/reference |
| Structural Classification | Tiered — Domain/Project Tier 2 — Coz We Care |
| Universal Identifier | `DIUA-DIC-000028` — same governed FORMAT-POSTER document identity; this revision does not allocate a new identifier |
| Depends On | CWC Production Workflow v1.22 CANONICAL LOCKED; CWC Production Bible v2.22 CANONICAL; CWC Format Specialization Specification v1.31 CANONICAL; CWC QA Mechanism (CWC-QA-001) v1.32 CANONICAL; CWC Asset Bible v1.36 CANONICAL; CWC Reference Sheet v1.23 CANONICAL |

---

## 1. Purpose

Define the operational CWC Poster format specialization for single-canvas static social-feed posters, using the FSS-001 extension model without forking the CWC Core Production Workflow.

v1.5 introduced the visually validated CWC-POSTER-0004 composition: copy capped at 51% width, protected gutter at 51–56%, right-anchored AS-002 core body at approximately 62–94%, and intentional gesture allowance at approximately 53–55%. v1.6 keeps this geometry unchanged and makes FORMAT-POSTER a direct consumer of the [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) cross-format invariant.

[BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) now applies the same normalized composition to Poster, Carousel, Reel, and Story while preserving format-local safe areas and presenter-presence applicability. This document continues to own Poster-local coordinates, typography, preflight, and protected-region interaction.

## 2. Applicability

Baseline format:

* single-canvas static social-feed poster;
* portrait 4:5;
* baseline canvas **1080 × 1350 px**.

A materially different aspect ratio or placement is not automatically covered by this specialization and requires an explicit governed variant or another registered Format Specialization Object.

## 3. Authority Boundary

* CPB §7.4.2 owns the global Layout System concept: placement, alignment, grouping, spatial hierarchy, and visual organization.
* CPB §7.4.4 owns global CWC typography family, approved weights, semantic role hierarchy, case/fallback/data principles.
* FSS-001 owns the specialization schema, rule modes, Stage Attachment Model, Format Registry, and Format Addition Gate.
* This document owns poster-format implementation constraints: canvas baseline, layout classes, region/bounds behavior, collision/overflow rules, typography sizes/leading/tracking/floors, same-ratio scaling, copy-fit behavior, and poster preflight.
* CAB/CRS own canonical asset identity and asset-intrinsic specifications. FORMAT-POSTER resolves the current logo/footer assets from CAB/CRS rather than redefining them.
* CWC-QA-001 remains the formal QA authority. Layout Preflight is a preventive execution check inside Visual Production, not a replacement QA mechanism.

## 4. Format Specialization Object — v1.6 REGISTERED

```yaml
format_id: FORMAT-POSTER
format_name: CWC Social Feed Poster
status: REGISTERED
version: "1.6"
applicability: single-canvas static social-feed poster
purpose: implement the BUS-124 cross-format reference-validated composition for Poster while preserving registered typography, asset authority, and preflight behavior

dependencies:
  - CWC Production Workflow v1.22 CANONICAL LOCKED
  - CPB v2.22 CANONICAL
  - FSS-001 v1.31 CANONICAL
  - CWC-QA-001 v1.32 CANONICAL
  - CAB v1.36 CANONICAL
  - CRS v1.23 CANONICAL

stage_attachments:
  PLANNING:
    rule: EXTEND
    additional_output_elements:
      - "layout_class = LP-04 TEXT_PLUS_SUBJECT_REFERENCE"
      - "BUS-124 cross-format reference composition declaration"
    production_requirements:
      - "baseline canvas: 1080×1350 px, portrait 4:5"
      - "AS-002 CWC Official Brand Presenter is mandatory"
      - "copy left anchor = x=72 on 1080 baseline"
      - "copy maximum = 51% canvas width"
      - "protected composition gutter = 51–56% canvas width"
      - "presenter core body zone = approximately 62–94% canvas width"

  CONTENT_PRODUCTION:
    rule: CONSTRAIN
    additional_output_contract_clauses:
      - "copy density must fit the left Copy Field without crossing the 51% maximum or violating typography floors"
      - "content must be edited or restructured rather than forcing essential text below the minimum readable size"

  ASSET_PREPARATION:
    rule: EXTEND
    additional_asset_requirement_categories:
      - "canonical Official Brand Logo placement category; identity/specification resolved from CAR/CAB/CRS"
      - "canonical Footer Platform placement category where applicable; identity/specification resolved from CAR/CAB/CRS"
      - "AS-002 Brand Presenter production asset suitable for the right-side placement model"

  VISUAL_PRODUCTION:
    rule: CONSTRAIN
    additional_output_contract_clauses:
      - "copy remains left-aligned; default anchor x=72 (6.67%)"
      - "copy does not extend beyond x≈551 (51%)"
      - "x≈551–605 (51–56%) is a protected composition gutter"
      - "presenter core body is right-anchored in approximately x≈670–1015 (62–94%)"
      - "gesture may intentionally enter approximately x≈572–594 (53–55%) only to point toward/present copy"
      - "gesture may not obscure headline, supporting copy, CTA, logo, or footer"
      - "presenter visually directs attention toward copy through pose, gaze, or gesture"
      - "full-body reference envelope is approximately y≈297–1229 (22–91%)"
      - "hip-to-head/close crop is permitted only as a framing adaptation inside the same right-side placement model"
      - "presenter remains above the footer protected region"
      - "canonical logo and Footer Platform geometry/Production Behavior remain unchanged and protected"
      - "FORMAT-POSTER Layout Preflight is PASS before final assembly"

  QA:
    rule: EXTEND
    additional_validation_criteria:
      - "verify AS-002 Brand Presenter is present"
      - "verify copy anchor and 51% maximum"
      - "verify 51–56% protected gutter is free of normal copy and presenter core body"
      - "verify presenter core body is right-anchored approximately within 62–94%"
      - "verify any gesture intrusion is limited to the intentional gesture allowance and does not obscure copy"
      - "verify presenter directs attention toward copy"
      - "verify selected framing remains inside the same right-side placement model"
      - "verify presenter remains above footer protection"
      - "verify canonical logo and Footer Platform are unchanged and protected"
      - "verify typography remains within FORMAT-POSTER floors"
      - "verify no blocking overflow/collision/destructive crop"
```

## 5. Typography Matrix — Inherited Unchanged from v1.0

Baseline canvas: **1080 × 1350 px (4:5)**.

| Semantic Role | CPB Weight | Default Size | Line Height | Tracking | Poster Floor |
| -- | -- | -- | -- | -- | -- |
| Hero / Display | 800 | 96 px | 96 px | \-0.01em | 84 px |
| Headline | 700–800 | 80 px | 88 px | \-0.01em | 72 px |
| Subheadline | 700 | 56 px | 67 px | 0 | 50 px |
| Kicker / Eyebrow / Label | 600 | 30 px | 36 px | +0.04em | 28 px |
| Body | 400–500 | 42 px | 56 px | 0 | 40 px |
| Supporting Text | 500 | 36 px | 48 px | 0 | 36 px |
| CTA | 700 | 42 px | 46 px | 0 | 38 px |
| Data / Key Number | 700–800 | 96 px | 96 px | \-0.01em | 84 px |

No typography value changes in v1.1.

## 6. Readability Floor — Inherited Unchanged

* Essential live poster text must not render below its role-specific floor.
* **36 px** is the general minimum for essential explanatory/supporting live text on the 1080×1350 baseline.
* Kicker/Label may use **28–30 px** only because it is short categorical text, not long-form reading copy.
* AS-004 Footer Platform remains an asset-intrinsic exception governed by CAB/CRS and is not live poster typography.

## 7. Scaling Rule — Inherited Unchanged

For a canvas preserving 4:5 but using another pixel width, typography values scale proportionally from the 1080 px baseline width.

For materially different aspect ratios or placements, do not infer scaling. Use an explicit governed variant or another registered Format Specialization Object.

## 8. Copy-Fit Rule — Inherited Unchanged

When copy exceeds available space:

1. preserve semantic hierarchy;
2. revise copy density, line breaks, or layout;
3. use the permitted role floor only when necessary;
4. never solve overflow with arbitrary condensed tracking, distorted type, or text below the readability floor.

## 9. Case Rule — Inherited Unchanged

Inherits CPB v2.14:

* Sentence case is default for explanatory copy;
* ALL CAPS is not a general poster default;
* ALL CAPS may be used for short Kicker / Eyebrow / Label roles where legibility remains acceptable;
* headline casing follows editorial intent within CPB rules.

## 10. Poster Layout Contract

### 10.1 Coordinate Model

The baseline poster uses a top-left origin:

* canvas width: **1080 px**;
* canvas height: **1350 px**;
* legal canvas bounds: `x >= 0`, `y >= 0`, `x + width <= 1080`, `y + height <= 1350`.

Every content-instance layout proof must be expressible as explicit rectangular regions/bounding boxes, even when the final artwork uses non-rectangular visual shapes.

### 10.2 Protected Regions

A **Protected Region** is an area that ordinary live text, subject geometry, decoration, or destructive raster edits must not intrude into.

Protected Regions are resolved from applicable canonical assets plus the selected content-instance layout.

#### Footer protection

When AS-004 is applicable on the current 1080×1350 poster baseline:

* current verified Footer Platform placement: **1070×64 px at x=5, y=1281**;
* the complete bottom strip **y=1281–1349** is treated as the footer reserved/protected region for poster composition;
* no live text, subject/presenter body part, decoration, or unrelated raster correction may enter that strip;
* the exact asset remains governed by CAB/CRS. This rule protects its placement; it does not redefine the asset.

If CAB/CRS later changes the canonical footer geometry, the format object must consume the current canonical geometry rather than silently preserving stale coordinates.

#### Logo protection

The current logo asset and its actual placement/bounding box are resolved from CAB/CRS plus the content-instance layout.

FORMAT-POSTER does **not** invent one universal logo x/y coordinate.

Once placed, its resolved bounding box becomes protected against destructive overlap, redraw, crop, or raster correction.

### 10.3 Legal Content Region

The Legal Content Region is:

`Canvas Bounds - applicable Protected Regions`.

All essential live text and primary subject geometry must remain inside the Legal Content Region unless a canonical asset specification explicitly requires otherwise.

### 10.4 Region Declaration — v1.5

Before final rendering, every new FORMAT-POSTER v1.5 poster records the fixed [BUS-123](https://linear.app/bussiness-content-os/issue/BUS-123/cwc-format-poster-reference-validated-copy-brand-presenter-layout) composition contract:

```yaml
layout_class: LP-04
canvas: [0, 0, 1080, 1350]
copy:
  left_anchor_x: 72
  max_x: 551
  max_width_percent: 51
protected_gutter:
  x_range: [551, 605]
  percent_range: [51, 56]
presenter:
  asset: AS-002
  core_x_range: [670, 1015]
  core_percent_range: [62, 94]
  gesture_x_range: [572, 594]
  gesture_percent_range: [53, 55]
  visual_direction: toward-copy
  framing_modes: [full-body, hip-to-head]
full_body_reference:
  y_range: [297, 1229]
  percent_range: [22, 91]
protected_regions:
  - id: footer
    bbox: resolved/applicable
  - id: logo
    bbox: resolved/applicable
```

The v1.5 geometry is percentage-led. The 1080×1350 coordinates above are the registered baseline implementation. Same-ratio derivatives scale proportionally.

The protected gutter is not a generic empty column for additional copy. Only an intentional presenter gesture may enter its defined gesture allowance, and only when legibility and protected assets remain intact.

### 10.5 Overflow Rule

A final candidate fails preflight if any required text, subject/presenter geometry, or critical communication feature:

* exceeds the canvas;
* enters an applicable protected region;
* is clipped unintentionally;
* requires typography below FORMAT-POSTER floors to fit.

A known example from CWC-POSTER-0003 was a presenter extending **233 px beyond the right canvas edge**. Under v1.2 that condition must fail preflight before final assembly.

### 10.6 Collision Rule — v1.5

Essential copy SHALL remain left-aligned and must not extend beyond 51% of canvas width. The 51–56% band is a protected composition gutter.

The AS-002 presenter core body SHALL remain right-anchored approximately within 62–94% of canvas width. A hand/arm gesture may intentionally enter approximately 53–55% to point toward or present the copy, but may not obscure the headline, supporting copy, CTA, logo, footer, or materially reduce the gutter's separating function.

Decoration may approach the field boundary only when it:

* does not reduce copy legibility;
* does not obscure the presenter;
* does not enter protected logo/footer regions;
* does not convert the gutter into a competing content column;
* does not create a destructive raster-edit dependency.

### 10.7 Negative-Space Rule

Negative space may be intentional.

The renderer must not automatically fill unused regions with decorative elements merely because space is available.

Decoration remains subordinate to message hierarchy, canonical assets, and the primary subject.

### 10.8 Directional Gesture Rule — v1.5

AS-002 should visually direct attention toward the copy through pose, gaze, or gesture. When a hand/arm crosses toward the copy, the intended gesture allowance is approximately 53–55% of canvas width on the 1080 baseline (x≈572–594).

The presenter core body remains right-anchored. Gesture intrusion is an intentional exception, not permission for body overlap or copy collision.

The v1.5 layout may **not** be mirrored: copy remains left and presenter remains right.

### 10.9 Spatial Hierarchy Lock

Before final rendering, the layout proof must establish the intended relative dominance of:

1. primary headline/message;
2. supporting copy;
3. mandatory AS-002 Brand Presenter;
4. supporting decoration.

Basic scale/proportion imbalance should be corrected during layout proof/preflight, not discovered for the first time at Human Approval.

## 11. Layout Classes — v1.5

### Active Class: LP-04 — TEXT_PLUS_SUBJECT_REFERENCE

LP-04 is the **only active layout class for new FORMAT-POSTER v1.5 production**.

Mandatory v1.5 constraints:

* copy anchor: x=72 / approximately 6–7% of width;
* copy maximum: 51% of width;
* protected gutter: 51–56%;
* AS-002 core body: approximately 62–94%, right-anchored;
* intentional gesture allowance: approximately 53–55%;
* presenter directs attention toward copy;
* full-body reference envelope: approximately 22–91% of height;
* hip-to-head/close crop is permitted only as a framing adaptation inside LP-04;
* presenter remains above footer protection;
* canonical logo/footer protected regions remain unchanged.

### Historical Class: LP-03 — TEXT_PLUS_SUBJECT_5050

LP-03 (50:50 split, full-body presenter) remains historical evidence from v1.4 but is **not selectable for new v1.5 Poster production**. [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) remains authoritative for Carousel, Reel, and Story.

### Historical Class: LP-02 — TEXT_PLUS_SUBJECT

LP-02 (left 2/3 copy / right 1/3 hip-to-head presenter) remains historical evidence from v1.2–v1.3 but is **not selectable for new v1.5 Poster production**.

### Historical Class: LP-01 — TEXT_LED

LP-01 remains historical evidence from v1.1 but is **not selectable for new production**, because AS-002 presenter presence is mandatory.

## 12. Layout Selection and Lock — v1.5

For every new FORMAT-POSTER v1.5 Content Item:

1. layout class is fixed to `LP-04 TEXT_PLUS_SUBJECT_REFERENCE`;
2. copy is left-anchored and capped at 51% width;
3. the 51–56% band remains the protected composition gutter;
4. AS-002 is mandatory and right-anchored, with its core body approximately within 62–94%;
5. gesture may enter approximately 53–55% only when it directs attention toward copy without obscuring copy or protected assets;
6. framing may be full-body or hip-to-head within the same right-side placement model;
7. logo/footer protected regions are resolved without changing their canonical geometry;
8. composition is locked before final rendering.

A deviation from this structure requires a future governed FORMAT-POSTER amendment; it is not a content-instance creative option.

## 13. Layout Preflight

### 13.1 Status

Layout Preflight is the FORMAT-POSTER specialization of STG-07's existing Visual Production self-check / Output Validation against Format Specialization visual requirements and the Reserved-Area rule. It is performed within **VISUAL_PRODUCTION** before the composition is accepted as the final Visual Production output.

It is:

* **not** a new Workflow Stage;
* **not** a new Quality Gate;
* **not** Human Approval;
* **not** a substitute for CWC-QA-001.

### 13.2 Required Checks — v1.5

Before final raster/render assembly, verify:

 1. **Canvas** — 1080×1350 / 4:5 baseline is correct or a proportional same-ratio derivative is used.
 2. **Class** — layout class is exactly `LP-04 TEXT_PLUS_SUBJECT_REFERENCE`.
 3. **Copy anchor** — left anchor is approximately 6–7% (x=72 baseline).
 4. **Copy maximum** — essential copy does not extend beyond 51% width.
 5. **Protected gutter** — 51–56% width is free of normal copy and presenter core body.
 6. **Presenter presence** — AS-002 is present and right-anchored.
 7. **Presenter core** — core body sits approximately within 62–94% width.
 8. **Gesture allowance** — any cross-gutter gesture is intentional, approximately within 53–55%, and does not obscure copy.
 9. **Visual direction** — pose, gaze, or gesture directs attention toward copy.
10. **Framing** — full-body or hip-to-head framing remains inside the same right-side placement model.
11. **Footer clearance** — presenter remains above the footer protected region.
12. **Protected assets** — canonical Official Brand Logo and Footer Platform are unchanged, unobstructed, and protected.
13. **Typography fit** — all essential live copy respects FORMAT-POSTER floors.
14. **Collision/overflow** — no blocking overflow, destructive crop, or unintended copy/presenter overlap.

### 13.3 Preflight Result — v1.5

Preflight PASS requires all v1.5 checks above to pass. Any failure is corrected inside Visual Production before the candidate proceeds to formal QA.

The protected gutter and gesture allowance are composition controls, not additional content regions.

### 13.4 No Render-to-Discover Rule

A condition that can be determined from declared geometry or typography constraints must not intentionally be deferred to formal QA for first discovery.

Examples:

* presenter outside canvas;
* content entering footer reserved region;
* text below typography floor;
* obvious protected-region collision.

## 14. Localized Correction Safety

When a final assembly requires a localized raster correction:

* the edit region/bounding box must be limited to the intended target;
* the correction must not cross into protected canonical assets or critical subject features;
* if a safe localized correction cannot be guaranteed, rebuild from the editable source/previous valid assembly rather than using a destructive clearing operation.

Evidence basis: CWC-POSTER-0002 r8 introduced a pointing-hand defect because a headline correction region crossed into the presenter hand. v1.1 treats this as preventable production damage.

## 15. AS-004 Protection

FORMAT-POSTER does not override Footer Platform typography or asset identity.

AS-004 remains an EXACT_REUSE asset governed by CAB/CRS.

For the current baseline, §10.2 protects the poster footer placement during composition. The format object must follow future canonical CAB/CRS geometry if the asset specification changes.

## 16. Regression Evidence

### CWC-POSTER-0002

Mapping: **LP-02 TEXT_PLUS_SUBJECT**.

Observed lessons incorporated:

* text + presenter structure;
* full subject must remain inside canvas and above footer;
* negative space may be intentional;
* headline/body/presenter proportion must be resolved before Human Approval;
* destructive localized corrections must not cross subject-critical regions.

### CWC-POSTER-0003

Final mapping: **LP-02 TEXT_PLUS_SUBJECT**.

Superseded v0.2 structural evidence: **LP-01 TEXT_LED**.

Observed lessons incorporated:

* presenter overflow beyond canvas must fail preflight;
* body/supporting text below registered floors must fail before final assembly;
* presenter/message direction is a content relationship rather than a fixed left/right rule.

### CWC-POSTER-0001

Published evidence exists in the CWC Content Register, but equivalent production-history evidence is not available in Linear, and the registered ContentOS/CWC Drive folder does not currently contain the POSTER-0001 source/master artifact.

v1.1 must not invent numeric geometry or a new Layout Class from missing historical evidence.

POSTER-0001 is therefore a **non-blocking historical compatibility check**. If its source/master is recovered later, verify whether it maps to LP-01 or LP-02 and record the result. Historical evidence absence does not block correction of the demonstrated current-format defect evidenced by POSTER-0002 and POSTER-0003.

## 17. Registration Validation Record

Before Owner approval and registration, v1.1 was required to satisfy:

* Structural Validation — required;
* Workflow Conformance — required;
* Dependency Conformance — required;
* Conflict Detection — required;
* Completeness — required;
* Executability — required;
* regression check against CWC-POSTER-0002 and CWC-POSTER-0003 — required and completed in the audit path; CWC-POSTER-0001 remains a non-blocking historical compatibility check if its source/master is recovered;
* CWC-QA-001 downstream consumption review — required;
* Owner approval — required;
* FSS Format Registry version/state reconciliation — required.

All blocking validation conditions were satisfied in the targeted architectural re-audit recorded under [BUS-87](https://linear.app/bussiness-content-os/issue/BUS-87/cwc-format-poster-deterministic-layout-contract-and-preflight). Owner approval was explicitly granted on 2026-09-20. **v1.1 therefore supersedes v1.0 as the current authoritative REGISTERED FORMAT-POSTER.** v1.0 remains historical evidence and is not silently deleted.

---

## Registered Revision Summary — v1.1 (Historical)

v1.1 changes only the missing poster-layout execution layer:

* adds Poster Layout Contract;
* adds LP-01 TEXT_LED;
* adds LP-02 TEXT_PLUS_SUBJECT;
* adds content-instance region declaration;
* adds Layout Selection + Lock;
* adds Layout Preflight inside Visual Production;
* adds localized correction safety;
* extends QA criteria to consume layout constraints.

Unchanged from v1.0:

* 1080×1350 / 4:5 baseline;
* typography matrix;
* readability floors;
* scaling rule;
* copy-fit rule;
* case rule;
* CPB/FSS/CAB/CRS/CWC-QA ownership boundaries.

**Status at v1.1 (historical — superseded 2026-09-25 by v1.2; see "v1.2 Owner-Directed Registration Record" below): REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION / OWNER LOCKED.**

---

## Targeted Architectural Re-Audit — 2026-09-20

**Target:** CWC FORMAT-POSTER v1.1 REVISION CANDIDATE

| Check | Result | Basis |
| -- | -- | -- |
| Structural Validation | **PASS** | Object now conforms to FSS §8: required schema fields present; object status is `DRAFT`; only legal Stage Attachment rule values are used; undeclared `current_registered_version` field removed; `purpose` and `change_log` added. |
| Workflow Conformance | **PASS** | No Stage/State/Gate added or overridden. Layout Preflight is explicitly defined as the FORMAT-POSTER realization of STG-07's existing Visual Production self-check / Output Validation, not a new Stage or Quality Gate. |
| Dependency Conformance | **PASS** | STG-06 states asset categories only; specific canonical asset identity/specification remains CAR/CAB/CRS-owned. QA contributions remain additive criteria consumed by STG-08. |
| Conflict Detection | **PASS** | PLANNING = EXTEND; CONTENT PRODUCTION = CONSTRAIN; ASSET PREPARATION = EXTEND/categories only; VISUAL PRODUCTION = CONSTRAIN; QA = EXTEND/criteria only — all match FSS §10 eligibility. |
| Completeness | **PASS** | Every populated block has a legal rule and concrete clauses. Unsupported universal margins/split ratios are not invented; content-instance region declarations carry the variable geometry. |
| Executability | **PASS** | LP-01/LP-02, region declaration, legal bounds, protected regions, overflow/collision rules, typography floors, preflight result, and correction-safety behavior are explicit enough for deterministic pre-render validation. |

### Regression

* `CWC-POSTER-0002` → **PASS** as `LP-02 TEXT_PLUS_SUBJECT`.
* `CWC-POSTER-0003` final direction → **PASS** as `LP-02 TEXT_PLUS_SUBJECT`; superseded v0.2 validates the structural need for `LP-01 TEXT_LED`.
* `CWC-POSTER-0001` → historical source/master not found in the registered ContentOS/CWC Drive folder and no equivalent detailed production issue exists. This remains a **non-blocking historical compatibility check** and is not used to invent geometry or a new class.

### Audit Verdict

**PASS — NO BLOCKING ARCHITECTURAL DEFECT REMAINS.**

v1.1 remains **DRAFT / REVISION CANDIDATE / NON-AUTHORITATIVE** at the Format Object/document layers respectively. v1.0 remains the registered authority until an explicit Owner decision approves promotion and the FSS Format Registry is reconciled.

**Disposition: READY FOR OWNER REVIEW.**

---

## Owner Approval & Registration Record — v1.1, 2026-09-20 (Historical)

**Owner decision:** APPROVED.

Following the [BUS-87](https://linear.app/bussiness-content-os/issue/BUS-87/cwc-format-poster-deterministic-layout-contract-and-preflight) targeted architectural re-audit, the CWC domain Owner explicitly approved FORMAT-POSTER v1.1 for promotion.

**Registration effect:**

* Format Object registration state: `REGISTERED`.
* Current authoritative FORMAT-POSTER version as of this 2026-09-20 registration (historical — superseded 2026-09-25 by v1.2): **v1.1**.
* Stable Universal Identifier remains `DIUA-DIC-000028`; no new identifier is allocated for the revision.
* v1.0 is superseded as the current representation but retained as historical registration evidence.
* FSS-001 Format Registry is reconciled to v1.1 through FSS v1.24 CANONICAL.
* Existing in-flight Content Items assigned to v1.0 are not silently migrated; FSS §14 / Workflow Revision Event rules remain applicable.
* No Core Workflow Stage, Lifecycle State, Exception Status, Quality Gate, approval boundary, or publication boundary changes.

**Registration verdict (as of 2026-09-20, historical):** **REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE AT THAT TIME — superseded 2026-09-25 by v1.2.**

### Post-Registration Dependency Reconciliation — 2026-09-20

Following registration, CWC-QA-001 advanced v1.23→v1.24 solely to reconcile the new FORMAT-POSTER v1.1 validation criteria through the existing FSS/STG-08 channel. FORMAT-POSTER v1.1 was re-verified against QA v1.24. **Result: CONFORMANT.** No poster rule, layout class, typography value, workflow attachment, or registration state changed.

---

## Historical Owner Lock Record — v1.1 / 2026-09-20

**Decision:** LOCKED.

The Owner has locked `FORMAT-POSTER v1.1` as the current authoritative registered Poster Format Object.

Lock semantics:

* FSS object status remains `REGISTERED`; this lock does not introduce a new lifecycle/status value.
* v1.1 content must not be silently edited in a way that changes layout classes, geometry constraints, protected-region behavior, typography rules, Layout Preflight, Stage Attachments, QA criteria, or authority boundaries.
* Any future substantive change requires a governed amendment and a new revision/version following the existing FSS change-control discipline.
* Documentation-only precision corrections may follow existing maintenance rules but must not alter normative behavior.
* `DIUA-DIC-000028` remains the stable identifier for FORMAT-POSTER.
* v1.0 remains historical evidence; v1.1 remains the current authoritative representation until superseded by an explicitly approved later revision.

**Lock state:** **OWNER LOCKED / ACTIVE / REGISTERED.**

## Dependency Currency Reconciliation — 2026-09-22

**\[DOCUMENTATION MAINTENANCE — NO VERSION INCREMENT\]** CWC Production Bible advanced v2.14 → v2.15 under [BUS-93](https://linear.app/bussiness-content-os/issue/BUS-93/cwc-caption-and-hashtag-standard-five-tag-locality-rule) solely to add §6.6.1 Social Caption & Hashtag Standard (exactly five hashtags; at least one contextually relevant locality hashtag). This document's declared use of CPB was re-verified. **Result: CONFORMANT.** No local schema, lifecycle authority, format rule, QA architecture, identifier behavior, or production behavior is changed by this pointer synchronization.

---

## v1.2 Owner-Directed Registration Record — 2026-09-25

[BUS-103](https://linear.app/bussiness-content-os/issue/BUS-103/cwc-cross-format-brand-presenter-primary-layout-rule) supersedes v1.1 as the current Poster representation.

**Current rule:** mandatory AS-002 Brand Presenter, left 2/3 Copy Field, right 1/3 Presenter Field, hip-to-head framing. Official Brand Logo and Footer Platform remain unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE.

---

## v1.3 Storage-Authority Dependency Reconciliation — 2026-09-26

Compliance-only revision under [BUS-111](https://linear.app/bussiness-content-os/issue/BUS-111/cross-tier-storage-authority-audit-and-remediation). Current upstream dependencies were re-verified after the [BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md) storage-authority remediation. Layout classes, 2/3-left / 1/3-right presenter rule, protected regions, typography, preflight, and registration semantics are unchanged.

**Version:** 1.2 → 1.3.

## v1.4 Owner-Directed Universal Escalation Record — 2026-09-27

Under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body), the Owner escalated the [BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract)/FORMAT-CAROUSEL v1.3 50:50 full-body Slide 1 contract from a Carousel-only exception into the universal cross-format default, applied here to Poster.

Superseded Poster behavior: LP-02, left 2/3 copy / right 1/3 presenter / hip-to-head.

Current Poster behavior (LP-03):

* 50:50 composition, nominal split x=540;
* copy field x=72–504/y=250–1110;
* full-body presenter, containment x=576–1044/y=250–1240;
* bottom anchor y=1240;
* at least one hand points toward or presents the copy;
* no anatomical or lateral clipping.

Logo/footer rules and typography matrix remain unchanged. Identifier `DIUA-DIC-000028` is unchanged.

**Result:** REGISTERED / CONFORMANT / CURRENT AUTHORITATIVE.

## v1.5 Owner-Directed Reference Validation Record — 2026-09-28

Under [BUS-123](https://linear.app/bussiness-content-os/issue/BUS-123/cwc-format-poster-reference-validated-copy-brand-presenter-layout), the Owner adopted the approved CWC-POSTER-0004 / [BUS-120](https://linear.app/bussiness-content-os/issue/BUS-120/cwc-poster-production-cwc-poster-0004-prep-efektif-kalau-digunakan) W05 yellow-jacket composition as the permanent FORMAT-POSTER copy / Brand Presenter reference.

This revision supersedes [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body)'s Poster application only. Carousel, Reel, and Story remain unchanged under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body).

Registered change:

* copy left anchor approximately 6–7% / x=72 baseline;
* copy capped at 51% width;
* protected composition gutter at 51–56%;
* presenter core right-anchored at approximately 62–94%;
* intentional gesture allowance at approximately 53–55%;
* presenter visually directs attention toward copy;
* full-body reference envelope approximately 22–91% height;
* hip-to-head/close crop permitted only as framing adaptation within the same placement model;
* logo/footer protection unchanged.

**Disposition: REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION.**

## v1.6 Cross-Format Authority Reconciliation — 2026-09-28

Under [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout), the reference-validated FORMAT-POSTER v1.5 composition became the single cross-format CWC Brand Presenter Primary Layout invariant.

FORMAT-POSTER geometry is unchanged from v1.5. v1.6 updates authority and dependency reconciliation only:

* copy anchor x=72; maximum x≈551;
* protected gutter x≈551–605;
* presenter core x≈670–1015;
* gesture allowance x≈572–594;
* full-body default reference framing with hip-to-head/close crop permitted inside the same placement model.

[BUS-123](https://linear.app/bussiness-content-os/issue/BUS-123/cwc-format-poster-reference-validated-copy-brand-presenter-layout) remains the visually validated source/reference. [BUS-124](https://linear.app/bussiness-content-os/issue/BUS-124/cwc-cross-format-reference-validated-copy-brand-presenter-layout) is the current cross-format authority.

**Disposition: REGISTERED / CURRENT AUTHORITATIVE REPRESENTATION.**

### 2026-10-10 — CPB v2.22 Dependency Currency Maintenance

Current normative CWC Production Bible pin synchronized from v2.21 to v2.22 following the Owner-directed caption follow/share closure in CPB §6.6.2. This is a **dependency pointer-only maintenance**; the local document version, workflow states, format geometry, asset behaviors, QA gates, register schema, and existing Content Item history remain unchanged. The two secondary engagement prompts are consumed from CPB at applicable caption-authoring steps, with clinical-action and five-hashtag rules preserved.
