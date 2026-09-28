---
document_name: "KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification"
document_class: "Domain/Project-Level Format Specification"
structural_classification: "Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara"
system: "Content OS → KDS Satu Hati Sulawesi Utara"
owner: "[OPERATIONAL DEFAULT] Document creator under KDS Project Architecture §0 until formally reassigned"
related_issue: "BUS-105"
universal_identifier: "DIUA-DIC-000037"
version: "1.6"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000032"
    name: "KDS Satu Hati Sulawesi Utara — Project Architecture"
    version: "1.10"
    status: "CANONICAL"
  - id: "DIUA-DIC-000033"
    name: "KDS Satu Hati Sulawesi Utara — Production SOP / Workflow"
    version: "1.14"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: null
    name: "Content OS — Universal Identifier Registry"
    status: "CANONICAL"
lateral_authorities:
  - id: "DIUA-DIC-000036"
    name: "KDS Satu Hati Sulawesi Utara — Asset Registry"
    status: "CANONICAL"
  - id: "DIUA-DIC-000035"
    name: "KDS Satu Hati Sulawesi Utara — QA Document"
    status: "CANONICAL"
allocation_evidence: "CONTENT-OS-ALLOC-037 in Universal Identifier Registration Record v1.29"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/kds-satu-hati-sulawesi-utara-reflection-carousel-format-specification-da8a9ba3026c"
representation_profile: "DIUA-DIC-000026@1.3"
---
# KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification |
| Document Class | Domain/Project-Level Format Specification |
| Version | 1.6 |
| Status | **CANONICAL** — v1.6 amended 2026-09-27 under [BUS-115](https://linear.app/bussiness-content-os/issue/BUS-115/kds-reflection-carousel-slide-1-brand-presenter-primary-layout-new): introduces a mandatory Slide 1 Brand Presenter Primary Layout (50:50 composition, full-body KDS-OBJ-000010, hand-to-copy direction, deterministic bounds), aligned to the CWC cross-format rule normalized under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body). Canvas 1080×1350 (4:5) is established as Owner-supplied production evidence for this amendment only. All other OPEN items in §9 (typography, grid/margins beyond §3.1, palette distribution, export settings) remain unresolved. Previously v1.5. |
| Related Issue | [BUS-105](https://linear.app/bussiness-content-os/issue/BUS-105/kds-satu-hati-sulawesi-utara-reflection-carousel-format-specification) — KDS Satu Hati Sulawesi Utara — Reflection Carousel Format Specification |
| Owner | **[OPERATIONAL DEFAULT]** Document creator under KDS Project Architecture §0 until formally reassigned |
| Structural Classification | Tiered — Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000037` — ALLOCATED — ACTIVE |
| Allocation Evidence | CONTENT-OS-ALLOC-037 in Universal Identifier Registration Record v1.29 |
| Depends On | KDS Satu Hati Sulawesi Utara — Project Architecture (v1.10, CANONICAL); KDS Satu Hati Sulawesi Utara — Production SOP / Workflow (v1.14, CANONICAL); Content OS — Root Documentation Structure (v2.5, CANONICAL); Universal Identifier Registry (current CANONICAL) |
| Lateral / Consuming Authorities | KDS Asset Registry — current CANONICAL; KDS QA Document — current CANONICAL |

## 0. Governance and Authority

This specification inherits the KDS Tier 2 governance model defined in KDS Project Architecture §0.

This document owns only the implementation rules specific to the **KDS Reflection Carousel** format.

It does not own:

* KDS project identity or scope;
* reusable asset identity or provenance;
* project-wide research/source rules;
* project-level QA verdict semantics;
* publication-channel policy;
* project-wide audience strategy;
* rules for unrelated Poster, Story, Reel, or other formats.

Where this specification contributes format-specific QA requirements, the KDS QA Document remains the project-level QA authority.

## 1. Purpose

The purpose of this specification is to make recurring KDS Reflection Carousel production predictable and repeatable without turning one production convention into a project-wide rule.

## 2. Format Activation Basis

The Reflection Carousel is an **active governed KDS format** because a stable recurring structure exists and this format-specific authority reduces repeated interpretation during production.

The currently established recurring structure is:

1. **Slide 1 — Quote**
2. **Slide 2 — Reflection**
3. **Slide 3 — Question**

This document does not generalize those rules to all KDS carousels.

### 2.1 Evidence boundary

The format-specific rules presently supported for standardization are limited to:

* a recurring three-slide Reflection Carousel;
* the fixed semantic sequence **Quote → Reflection → Question**;
* continuity across the three slides as one reflection unit;
* a caption invitation to follow **@kds.satuhatisulut**.

This evidence does **not** by itself establish canonical numeric layout or export constants beyond the single amendment recorded in §3.1.

By explicit Owner decision on 2026-09-27 ([BUS-115](https://linear.app/bussiness-content-os/issue/BUS-115/kds-reflection-carousel-slide-1-brand-presenter-primary-layout-new)), the 1080×1350 (4:5) canvas and the Slide 1 Brand Presenter Primary Layout geometry defined in §3.1 are RESOLVED as Owner-supplied production evidence, scoped narrowly to that one amendment. All other canvas, safe-area, grid, margin, typography, placement, palette, and export decisions remain intentionally OPEN in §9 and are not inferred from this evidence.

This specification is now CANONICAL. The Reflection Carousel is therefore an active governed format within the scope defined here.

## 3. Defined Slide Structure

### Slide 1 — Quote

Primary semantic role:

* present one concise reflective statement or quotation;
* open the emotional or reflective frame for the carousel;
* avoid carrying the full explanatory burden of the topic.

### Slide 1 — Mandatory Brand Presenter Primary Layout — v1.6

By explicit Owner decision under [BUS-115](https://linear.app/bussiness-content-os/issue/BUS-115/kds-reflection-carousel-slide-1-brand-presenter-primary-layout-new), aligned to the CWC cross-format rule normalized under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body), Slide 1 additionally implements a mandatory Brand Presenter Primary Layout:

* **Canvas:** 1080 × 1350 px (4:5) — Owner-supplied production evidence for this amendment only.
* **Layout:** 50% left Copy Field / 50% right Brand Presenter Field; nominal split **x=540**.
* **Copy field:** x=72–504, y=250–1110; deterministic copy lower boundary **y=1110**.
* **Presenter field:** x=576–1044, y=250–1240 (identical to the CWC FORMAT-CAROUSEL reference geometry under [BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract), since both formats share the same 1080×1350 canvas — a derivation match, not a copy-paste assumption).
* **Presenter:** `KDS-OBJ-000010` (KDS Brand Presenter), full body — head, hands, arms, feet, and left/right silhouette fully visible, no clipping.
* **Presenter bottom anchor:** y=1240.
* **Hand-to-copy direction:** mandatory — at least one presenter hand shall visibly point toward, or perform an open-palm presenting gesture toward, the copy field. FAIL if both hands are passive or a gesture is directed away from copy.
* **Typography:** governed typography floors (§9, once set) shall not be shrunk to force-fit copy; if copy does not fit, rewrite/split rather than shrink below floor.
* **Protected assets:** KDS logo and footer/protected-region placement, wherever governed, are unchanged and are never moved or redefined to accommodate this layout.

Slides 2 and 3 gain **no** presenter requirement from this amendment; this rule applies to Slide 1 only.

### Slide 2 — Reflection

Primary semantic role:

* expand the meaning introduced by Slide 1;
* provide the central reflective interpretation or message;
* preserve continuity with the quote rather than introducing an unrelated second topic.

### Slide 3 — Question

Primary semantic role:

* close with one reflection-oriented question;
* invite the reader to think, respond, or relate the theme to their own experience;
* function as the closing interaction point for the carousel.

## 4. Sequence Rule

The sequence is fixed:

**Quote → Reflection → Question**

Rules:

* the three semantic roles must not be silently reordered;
* a slide must not be removed while still calling the output a KDS Reflection Carousel under this specification;
* additional slides are not authorized by this specification;
* a materially different sequence requires explicit format-specification revision.

## 5. Content Continuity

The three slides must operate as one reflection unit.

At minimum:

* Slide 2 must meaningfully interpret or deepen Slide 1;
* Slide 3 must arise from the same reflective theme;
* the carousel must not become three unrelated statements placed in one post.

This requirement governs continuity, not editorial ideology or audience strategy.

## 6. Caption Rule

For this format, the publication caption must include an invitation to follow:

**@kds.satuhatisulut**

The exact wording is not fixed by this version.

This rule is specific to the Reflection Carousel and does not establish a universal KDS caption rule for other formats.

The presence of @kds.satuhatisulut in this format rule does **not** by itself activate Instagram or any other publication channel at project level. Channel selection and publication authorization remain governed outside this specification.

## 6.1 Production SOP Integration

Because this specification is CANONICAL:

* **Stage 4 — Format Routing:** selecting KDS Reflection Carousel must resolve this specification as the applicable governed format authority;
* **Stage 5 — Draft Production:** the draft must use the three-slide Quote → Reflection → Question structure;
* **Stage 6 — Asset / Visual Execution:** visual implementation must respect this specification plus the current KDS Asset Registry for reusable assets;
* **Stage 7 — QA / Review Routing:** project QA must evaluate the mandatory format-contributed criteria defined in §8;
* **Stage 9 — Publication Readiness:** failure of an applicable mandatory Reflection Carousel rule prevents Publication Ready status.

This integration does not modify the Production SOP lifecycle or Publication Approval authority.

## 7. Asset Authority

Reusable KDS assets must resolve through the **KDS Asset Registry — current CANONICAL**.

This specification may define where or how an ACTIVE asset is used only when repeated Reflection Carousel production evidence justifies a format-specific placement rule.

It must not redefine:

* asset identity;
* canonical source;
* checksum;
* lifecycle;
* presenter identity;
* palette tokens.

### 7.1 Slide 1 Presenter Placement — v1.6

The Slide 1 Brand Presenter Primary Layout rule in §3.1 governs only the **placement, containment, framing, and gesture direction** of `KDS-OBJ-000010` within Slide 1. It does not redefine, and does not have authority over:

* `KDS-OBJ-000010` identity, canonical source, checksum, style, or variant set;
* the asset's lifecycle status;
* any other KDS Asset Registry record.

The **KDS Asset Registry** ([BUS-102](DIUA-DIC-000036_KDS-Asset-Registry.md)) remains the sole authority for `KDS-OBJ-000010` identity and lifecycle. This section only records where and how the ACTIVE asset is positioned for Slide 1 of this format.

## 8. Format-Specific QA Contribution

The following are **mandatory format-contributed QA criteria** owned by this specification. KDS project-level QA must verify:

* exactly 3 slides are present;
* order is Quote → Reflection → Question;
* each slide performs its declared semantic role;
* continuity exists across the three slides;
* caption includes a follow invitation for @kds.satuhatisulut;
* Slide 1 uses the 50:50 copy/presenter split at nominal x=540;
* Slide 1 copy remains within x=72–504/y=250–1110 and does not cross the deterministic copy lower boundary (y=1110);
* Slide 1 presenter (`KDS-OBJ-000010`) is full-body and contained within x=576–1044/y=250–1240, with no head/hand/arm/foot/lateral clipping, and a deterministic bottom anchor at y=1240;
* Slide 1 presenter shows mandatory hand-to-copy direction — at least one hand visibly points toward or open-palm presents the copy; FAIL if both hands are passive or directed away;
* no Slide 1 copy/presenter collision, and KDS logo/footer/protected-region placement is unchanged.

These checks supplement, but do not replace, project-level QA. Their criterion-level results are evaluated under the QA Document's existing PASS / FAIL / N/A and overall verdict model; this specification does not create a separate QA verdict system.

Reusable-asset conformance is **not** duplicated as a format-owned QA criterion. It remains governed by project QA Q6 and the KDS Asset Registry. Reflection Carousel production must still satisfy Q6 whenever reusable KDS assets are used.

## 9. Open Decisions

The following are intentionally **not defined** in the current specification because the evidence set does not yet justify canonical constants:

* safe areas (beyond the Slide 1 field defined in §3.1);
* grid;
* exact margins (beyond the Slide 1 field defined in §3.1);
* typography family/size/weight by text role;
* line-height;
* tracking;
* fixed text-length limits;
* logo/wordmark placement geometry;
* decorative-asset placement;
* mandatory palette distribution;
* background system;
* footer geometry;
* export settings.

These may be added only from repeated production evidence or an explicit Owner decision supported by a format-specific need.

**Resolved as of v1.6:** canvas dimensions/aspect ratio (1080×1350, 4:5) and Slide 1 presenter placement are no longer OPEN — both are RESOLVED under §3.1/§7.1 per [BUS-115](https://linear.app/bussiness-content-os/issue/BUS-115/kds-reflection-carousel-slide-1-brand-presenter-primary-layout-new), scoped to Slide 1 of this format only. All other items above remain OPEN.

## 10. Lifecycle

**Current state:** CANONICAL v1.6 — canonicalized as v1.0 on 2026-09-26; v1.6 introduces the Slide 1 Brand Presenter Primary Layout rule (§3.1/§7.1/§8) under [BUS-115](https://linear.app/bussiness-content-os/issue/BUS-115/kds-reflection-carousel-slide-1-brand-presenter-primary-layout-new), aligned to the CWC universal rule under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body). All other Reflection Carousel semantics (slide structure, sequence, continuity, caption rule) are unchanged.

Canonicalization prerequisites were satisfied at v1.0:

* Universal Identifier allocation and allocation evidence are resolvable;
* scope conforms to KDS Project Architecture §6;
* no project-wide strategy leakage remains;
* Production SOP compatibility is verified;
* QA contribution is bounded to format-owned criteria;
* lateral Asset Registry usage respects ACTIVE object authority;
* explicit Owner approval was recorded.

---

**Operating rule:** standardize only what repeated Reflection Carousel production has actually established.

---

## 11. Audit & Remediation Record — v0.2 — 2026-09-26

**Audit disposition:** CONDITIONAL PASS → remediated.

### Audit scope

Reviewed against:

* KDS Project Architecture §6 — format activation / anti-overengineering boundary;
* KDS Production SOP — Stage 4 format routing, Stage 5 drafting, Stage 6 visual execution, Stage 7 QA, and Publication Readiness;
* KDS QA Document — format-contributed criteria and verdict ownership;
* KDS Asset Registry — reusable-asset identity/provenance boundary;
* Universal Identifier Registry / Registration Record — identifier and allocation evidence.

### Remediated findings

* **A1 — premature canonical wording:** §3 renamed from "Canonical Slide Structure" to "Defined Slide Structure" while the document remains DRAFT.
* **A2 — QA normativity:** §8 changed from advisory "should verify" language to explicit mandatory format-contributed criteria, while preserving project QA as verdict authority.
* **A3 — SOP routing gap:** added §6.1 mapping the format authority to Production SOP Stages 4–7 and Publication Readiness.
* **A4 — channel leakage risk:** clarified that the @kds.satuhatisulut caption rule does not itself activate a publication channel.
* **A5 — evidence precision:** added §2.1 distinguishing established format rules from unsupported numeric layout/typography/export constants.

### Conformance result after remediation

* Architecture §6 format-boundary conformance: **PASS**.
* Production SOP compatibility: **PASS**.
* QA authority separation: **PASS**.
* Asset Registry authority separation: **PASS**.
* Identifier DIUA-DIC-000037 and allocation evidence CONTENT-OS-ALLOC-037: **PASS**.
* Unsupported numeric layout invention: **NONE**.
* Project-wide audience/channel/strategy leakage: **NONE after remediation**.

### Remaining gate

Final critical review and explicit Owner approval are required before promotion to CANONICAL.

**Version:** 0.1 → 0.2.

---

## 12. Final Critical Review — v0.3 — 2026-09-26

**Disposition:** PASS.

### Review scope

The final critical review verified:

* KDS Project Architecture §6 activation criteria and anti-overengineering boundary;
* Production SOP routing and Publication Approval separation;
* QA Q7 format-authority integration and project-level verdict ownership;
* Asset Registry authority boundary and ACTIVE-object routing;
* identifier `DIUA-DIC-000037` and allocation evidence `CONTENT-OS-ALLOC-037`;
* absence of unsupported numeric layout, typography, spacing, placement, or export constants;
* absence of project-wide audience, channel, strategy, or publication-authority leakage;
* internal version/reference consistency.

### Final review corrections

* stale references to `v0.1` in the sequence/open-decision wording were replaced with version-agnostic current-specification wording;
* reusable-asset conformance was removed from §8 as a format-owned QA criterion because it is already governed by project QA Q6 and the Asset Registry.

### Final findings

* recurring-format activation basis is sufficiently narrow for this specification;
* the specification governs only the KDS Reflection Carousel, not all KDS carousels;
* fixed three-slide order and semantic roles are clear and testable;
* caption CTA rule is bounded to this format and does not activate a publication channel;
* project QA remains the verdict authority;
* reusable-asset identity and conformance remain outside format ownership;
* no blocking dependency or authority conflict remains.

### Verdict

**READY FOR OWNER APPROVAL.**

Canonicalization has **not** occurred.

An explicit Owner approval is required before promotion to `v1.0 CANONICAL`.

**Version:** 0.2 → 0.3.

---

## 13. Owner Approval & Canonicalization — v1.0 — 2026-09-26

**Final critical review:** PASS.

**Owner decision:** APPROVED — CANONICALIZED.

### Canonical authority

Effective 2026-09-26, this document is the authoritative format-specific specification for the KDS Reflection Carousel.

Canonical rules activated by this document are limited to:

* exactly three slides;
* fixed sequence **Quote → Reflection → Question**;
* the semantic role of each slide;
* continuity across the three-slide reflection unit;
* caption invitation to follow **@kds.satuhatisulut**;
* mandatory format-contributed QA checks defined in §8.

### Explicitly unresolved

Canonicalization does **not** create numeric or visual constants that remain OPEN in §9, including canvas size, grid, margins, typography metrics, placement geometry, palette distribution, and export settings.

### Authority boundary

* KDS Production SOP owns cross-format routing and Publication Readiness.
* KDS QA Document owns project-level QA verdicts.
* KDS Asset Registry owns reusable asset identity/provenance and object lifecycle.
* This specification owns only Reflection Carousel format-specific implementation and criteria.

### Identifier

* Universal Identifier: `DIUA-DIC-000037`
* Allocation Evidence: `CONTENT-OS-ALLOC-037`
* Canonicalization does not change the allocated identifier.

**Canonical version:** v1.0.

---

## 14. Post-Canonical Dependency Synchronization — v1.1 — 2026-09-26

**Change type:** Editorial / dependency synchronization. No change to format semantics, QA criteria, or open numeric decisions.

After v1.0 canonicalization:

* Production SOP was amended to v1.9 CANONICAL to record Reflection Carousel as an active format-specific authority;
* QA Document was amended to v1.7 CANONICAL so Q7 applies to Reflection Carousel;
* this specification's formal Production SOP dependency is therefore synchronized from v1.8 to v1.9;
* QA remains a lateral / consuming authority and is intentionally not version-pinned here.

All v1.0 Reflection Carousel rules remain unchanged.

**Version:** 1.0 → 1.1.

---

## 15. Dependency Synchronization — v1.2 — 2026-09-26

**Change type:** Editorial / upstream dependency synchronization.

* Project Architecture: v1.6 → v1.7.
* Production SOP: v1.9 → v1.10.

No Reflection Carousel format rule, QA contribution, caption rule, or OPEN numeric/visual decision changed.

---

## 16. Dependency Synchronization — v1.3 — 2026-09-26

Project Architecture advanced to v1.8 and Production SOP to v1.11 during Psychology Series canonicalization. This amendment only refreshes those upstream references. Reflection Carousel rules are unchanged.

---

## Change Record — v1.4 — 2026-09-26

**Change type:** dependency synchronization only.

* Project Architecture: v1.8 → **v1.9 CANONICAL**.
* Production SOP: v1.11 → **v1.12 CANONICAL**.
* Psychology Series Layout/Reference canonicalization does not alter Reflection Carousel format rules.

**Version:** 1.3 → 1.4.

---

## Change Record — v1.5 — 2026-09-26

**Change type:** dependency synchronization only.

* Project Architecture: v1.9 → **v1.10 CANONICAL**.
* Production SOP: v1.12 → **v1.13 CANONICAL**.
* Psychology Series sub-project formation has no effect on Reflection Carousel rules.

**Version:** 1.4 → 1.5.

---

## Change Record — v1.6 — 2026-09-27

**Trigger:** [BUS-115](https://linear.app/bussiness-content-os/issue/BUS-115/kds-reflection-carousel-slide-1-brand-presenter-primary-layout-new) — KDS Reflection Carousel — Slide 1 Brand Presenter Primary Layout (New Rule, CWC-Aligned), propagating the CWC cross-format Brand Presenter Primary Layout rule normalized under [BUS-114](https://linear.app/bussiness-content-os/issue/BUS-114/cwc-cross-format-brand-presenter-layout-universal-5050-full-body) to the KDS Satu Hati Sulawesi Utara main project (Reflection Carousel only).

**Owner act:** Explicit Owner decision, 2026-09-27 — (1) escalate this rule to the KDS main-project Reflection Carousel; (2) supply 1080×1350 (4:5) as Owner production evidence for this amendment only, unblocking the previously OPEN canvas/geometry decision recorded in §2.1/§9.

**Old rule:** none — Slide 1 previously carried no Brand Presenter Primary Layout rule; canvas dimensions, safe area, and presenter placement were explicitly OPEN (§9).

**New rule:** Slide 1 mandatory Brand Presenter Primary Layout (§3.1) — 1080×1350 (4:5) canvas; 50:50 split at x=540; copy field x=72–504/y=250–1110 (copy lower boundary y=1110); presenter field x=576–1044/y=250–1240, full body, no clipping; presenter bottom anchor y=1240; mandatory hand-to-copy direction. Identical numeric geometry to the CWC FORMAT-CAROUSEL reference implementation ([BUS-113](https://linear.app/bussiness-content-os/issue/BUS-113/cwc-format-carousel-slide-1-copy-and-brand-presenter-boundary-contract)) because both formats share the same 1080×1350 canvas — this is a derivation match, not a copy-paste assumption for a different canvas.

**Scope of resolution:** ONLY canvas dimensions/aspect ratio and Slide 1 presenter placement move from OPEN to RESOLVED (§9). All other §9 items — safe areas beyond §3.1, grid, margins beyond §3.1, typography, line-height, tracking, text-length limits, logo/wordmark placement geometry, decorative-asset placement, palette distribution, background system, footer geometry, export settings — remain OPEN and are NOT resolved by this amendment.

**Authority effect:**

* `KDS-OBJ-000010` identity, canonical source, checksum, variant set, and lifecycle — UNCHANGED; KDS Asset Registry ([BUS-102](DIUA-DIC-000036_KDS-Asset-Registry.md)) remains sole authority (§7.1).
* KDS logo/footer/protected-region authority — UNCHANGED.
* §0 authority boundary (this document owns only Reflection Carousel format-specific implementation) — UNCHANGED.
* Slides 2–3 — UNCHANGED, gain no presenter requirement.
* KDS Production SOP and KDS QA Document version pins — NOT reconciled by this change (no stale reference introduced; §8 QA criteria are additive under this document's own existing format-contributed-criteria channel, consistent with §6.1 Stage 7 routing).
* No KDS sub-project (including Psychology Series) is affected, referenced, or mutated by this amendment.

**Regression result:** no Content ID semantics changed; no publication/history record rewritten; no Workflow Stage/Lifecycle State/QA Gate architecture changed; no new QA verdict system created.

**Version transition:** v1.5 → **v1.6 CANONICAL**.

**Result:** KDS Reflection Carousel v1.6 = **CANONICAL — Slide 1 Brand Presenter Primary Layout RESOLVED; all other §9 items remain OPEN.**
