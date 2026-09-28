---
document_name: "Satu Dosis Obat Hati — Project Architecture"
document_class: "Domain/Project-Level Architecture Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati. This document is SDOH's domain-registering document per Root Documentation Structure §8."
system: "Content OS → Satu Dosis Obat Hati (SDOH)"
owner: "[OPERATIONAL DEFAULT] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator, per Root Governance §4 (provisionally adopted — see note below)."
related_issue: "BUS-24"
universal_identifier: "DIUA-DIC-000007"
version: "1.13"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000005"
    name: "Content OS — System Architecture"
    version: "1.16"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/sdoh-project-architecture-v113-canonical-3e859ee8596e"
representation_profile: "DIUA-DIC-000026@1.3"
---
## Document Identity

| Field | Value |
| -- | -- |
| Document Name | Satu Dosis Obat Hati — Project Architecture |
| Document Class | Domain/Project-Level Architecture Document |
| System | Content OS → Satu Dosis Obat Hati (SDOH) |
| Version | 1.13 |
| Status | **CANONICAL** — amended to v1.13 (2026-09-13): cross-document conformance synchronization to Content OS System Architecture v1.12 after [BUS-56](../../system/DIUA-DIC-000026_Content-OS-Repository-Representation-Profile.md) established System-Wide Implementation Specifications. Updated the SDOH governance note so its provisional Tier 2 adoption of Root Governance no longer relies on the now-superseded System Architecture §1a precedent. Project identity, theme semantics, active formats, palette, format ownership, and Poster/Carousel/Reels boundaries are unchanged. Prior state: **CANONICAL** — amended to v1.12 (2026-09-13): activated TikTok Poster as the third active SDOH production format after [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) Sage Poster Rules v1.0 and [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) Burgundy deterministic-delta validation established format-specific authority. Architecture now recognizes the 4:5 / 1080×1350 master artwork model, 9:16 presentation context, [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) shared Poster mechanics, and [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) Burgundy deltas without duplicating their rulebooks. QA routing is synchronized to QA Document v1.26. No Sage/Burgundy project-level semantics, palette tokens, Carousel/Reels mechanics, or asset identities are redefined. Prior state: **CANONICAL** — amended to v1.11 (2026-09-10): reconciled §6 with the already-approved shared Caveat Medium identity registered as `SDOH-OBJ-000010`; removed obsolete active Newsreader and experimental-font statements; clarified that format-specific typography metrics remain owned by the production lanes. Editorial/conformance correction under Owner's sequential-remediation instruction; no new typeface selection or production-metric validation. Prior state: v1.10, CANONICAL — amended to v1.10: established the current operational format set as **Carousel + Reels only**. Poster is not an active SDOH production format at this time and is excluded from production workflow and QA until explicitly introduced through a future approved change. Prior state: v1.9, CANONICAL — resolved typography/template ownership drift. SDOH no longer defines one universal typeface or one universal slide template at project level. Typography, layout, slide mechanics, and other execution geometry are owned by the applicable format-specific production rules; Sage Carousel currently uses Newsreader per [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production), while Sage Reels retains typography as format-specific/experimental until separately locked. Prior state: v1.8, CANONICAL — canonicalized the project-level Sage/Burgundy color tokens against the approved visual reference. Sage is `#94AC9C`; Burgundy is `#5C1B29`. These tokens apply across SDOH formats unless a future explicitly approved format-specific exception supersedes them. Prior state: v1.7, CANONICAL — reconciled the cross-format Sage / Seri Peluk and Burgundy / Seri Jujur theme semantics, clarifying that the distinction is based on validation mode, emotional weight, and narrative function rather than a strict inward-vs-outward split. This applies across Poster, Carousel, and Reels. Prior state: v1.6, CANONICAL — amended to v1.6: synced `Depends On` (System Architecture v1.10→v1.11), stale due to that document being amended in the current workspace-wide stale-Depends-On sweep ([BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) extended stale-reference check, full-sweep pass). Compliance update, no substantive content changed. Prior state: v1.5, CANONICAL — amended to v1.5: synced `Depends On` (System Architecture v1.9→v1.10), stale due to that document being amended (v1.10 added an editorial §11 cross-reference) since this document's last sync. Found via adversarial governance review of [BUS-25](https://linear.app/bussiness-content-os/issue/BUS-25/satu-dosis-obat-hati-production-sop) (SDOH Production SOP) extended stale-reference check. Compliance update, no substantive content changed. Prior state: v1.4, CANONICAL — amended to v1.4: removed stale version-pin from `Universal Identifier` field (was citing Registry v1.3, now v1.10) — changed to unversioned form, matching the pattern already used in CWC's Document Identity fields ([BUS-18](../cwc/DIUA-DIC-000012_Coz-We-Care-Production-Bible.md)–22), to prevent this specific field from going stale again on future Registry amendments. Found via governance audit (Issue #16) extended stale-reference sweep. Compliance update, no substantive content changed. Prior state: v1.3, CANONICAL synced `Depends On` (System Architecture v1.7→v1.9), stale due to that document being amended in this audit session (Issue #16 follow-on, system-wide stale-Depends-On sweep). Compliance update, no substantive content changed. Prior state: v1.2, CANONICAL re-tagged `Owner` field from `[ASSUMPTION]` to `[OPERATIONAL DEFAULT]` per Root Documentation Structure §5.1 (a Content OS-wide Document Identity convention, applicable to Tier 2 as well), introduced via governance audit (Issue #16) P1 remediation. Compliance update, no substantive content changed. Prior state: v1.1, CANONICAL — promoted from v1.0 DRAFT to v1.1 CANONICAL on 2026-09-03 via the provisionally-adopted §6 change-control process (see §0 and Governance Note). |
| Related Issue | [BUS-24](https://linear.app/bussiness-content-os/issue/BUS-24/sdoh-project-architecture) — SDOH — Project Architecture |
| Owner | \[OPERATIONAL DEFAULT\] (Root Documentation Structure §5.1) Not yet formally assigned. Defaults to the document's creator, per Root Governance §4 (provisionally adopted — see note below). |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — Satu Dosis Obat Hati. This document is SDOH's domain-registering document per Root Documentation Structure §8. |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000007` — ALLOCATED, per Content OS's own registry ([BUS-16](../../system/Content-OS-Universal-Identifier-Registry.md) §4) |
| Depends On | Content OS — System Architecture (v1.16, CANONICAL) for tier positioning and the current System responsibility model; CWC domain documents for the sibling-boundary comparison referenced in §2-3. This document does not restate Root/System-level definitions. |
| Governance Note | \[DECISION\] SDOH provisionally adopts Root Governance's ownership and change-control model by extension (single Owner per document, defaulting to the document's creator per Root Governance §4; Propose/Classify/Review/Approve/Record per §6; Draft/CANONICAL status values per §4.1). This is a direct Tier 2 governance adoption for SDOH and does not depend on System Architecture's historical §1a provisional-governance precedent, which is now superseded by System Governance. This adoption applies to all SDOH (Tier 2 — Satu Dosis Obat Hati) documents and is limited to this domain's own documents; it grants no authority over Root or System-level documents. It stands until a dedicated Tier 2 governance model is defined and supersedes it. |

## 0. Governance Adoption (Change-Control Record)

Per the Governance Note above, this document was reviewed against Root Level Architecture, Root Governance, and Root Documentation Structure (2026-09-03) prior to Approval. Findings applied: (1) added missing Document Identity fields (Owner, Structural Classification, Universal Identifier, Related Issue, Depends On) per D1; (2) registered SDOH as the Tier 2 domain per §8; (3) resolved a naming collision on the source-list document (renamed from "Reference Model" to "Research Source List"). Approved and Recorded as CANONICAL v1.1 on 2026-09-03, per the adopted §6 process (Propose → Classify \[architectural\] → Review → Approve → Record).

## 1. Identity

**Project name:** Satu Dosis Obat Hati (SDOH)
**Type:** Content brand — healing & mental wellness, general audience
**Position in Content OS:** Project Level, sibling to CWC (Coz We Care)

## 2. Responsibility Statement

> SDOH owns general healing/mental-health content delivered through a two-layer content system (Seri Peluk / Seri Jujur) — content that validates emotional experience without diagnosing, treating, or addressing a specific health condition.

This is the boundary that justifies SDOH as a separate Project rather than folded into CWC: CWC's responsibility is HIV-specific identity/spec/visual ownership (CWC-CAR/CAB/CRS); SDOH's responsibility is general emotional healing content with no HIV-specific scope.

## 3. Scope Boundary

| In scope for SDOH | Out of scope |
| -- | -- |
| Seri Peluk (sage) + Seri Jujur (burgundy, 4 klaster) | HIV-specific stigma/education content → CWC / OBK Satu Hati Sulut |
| Visual system: pill-mark logo, canonical Burgundy `#5C1B29` / Sage `#94AC9C`, plus format-specific typography/layout rules | Any content requiring HIV-specific identity/spec ownership |
| IG @satudosisobathati, FB Page, WA consult channel | Domain — not in use yet |
| Consultation/e-book/workshop offerings (ideation only, not active) | — |

**Explicit non-overlap rule:** no HIV-stigma content crosses into SDOH; no HIV-specific content crosses out of CWC into SDOH.

## 4. Positioning

Bio/positioning: "obat hati | tempat cerita tanpa dihakimi" — framed as "Apotek Hati untuk yang distigma," psychology/counseling-based healing content, explicitly not ceramah/preaching. Target audience: ages 18-35, people who've supported ODHA, health workers, psychology/health students, general audience seeking healing without toxic-positivity content. Initial market focus: Manado & Eastern Indonesia.

## 5. Content System (two-layer)

SDOH uses two cross-format thematic modes. The current active production formats are **Carousel, Reels, and TikTok Poster**, and all three must inherit these meanings rather than redefine them. TikTok Poster is governed through approved format-specific production lanes: [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production) owns shared Sage/base Poster mechanics, while [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) owns Burgundy deterministic deltas and Burgundy-specific validation.

### 5.1 Sage / Seri Peluk

**Core function:** validasi kondisi.

**Core promise:** **“kamu aman.”**

**Canonical meaning:** Sage is the validation mode that gives someone room to recognize and allow their current emotional condition without pressure to immediately change, explain, confront, or resolve it.

Sage typically works with:

* quiet self-examination
* subtle emotional tension
* fatigue, confusion, loneliness, or low-intensity anxiety
* unnamed or hard-to-label feelings
* small moments of honesty
* pauses before decisions, replies, reactions, or conclusions
* recognition without immediate resolution

**Narrative behavior:** recognize, accompany, slow down, give space, and validate what is present.

**Emotional register:** generally light-to-medium in weight; calm, spacious, restrained, and reassuring rather than dramatic.

**Series role:** Seri Peluk remains an entry point / bridge into deeper Seri Jujur territory when a condition develops into a truth that requires courage to name or face.

### 5.2 Burgundy / Seri Jujur

**Core function:** validasi keberanian.

**Core promise:** **“kamu jujur.”**

**Canonical meaning:** Burgundy is the validation mode for honesty that requires courage — when someone names, faces, or stands inside a truth, wound, boundary, conflict, or spiritual tension that carries greater emotional weight.

Burgundy may be inward-facing, outward-facing, relational, or spiritual. It is **not defined by confrontation alone**.

Burgundy typically works with:

* anger or disappointment
* old wounds
* personal boundaries
* rejection or resistance
* guilt and difficult self-recognition
* conflicts of value or identity
* courage to name an uncomfortable truth
* emotionally weighty relational tension
* spiritual struggle or honesty with Allah

**Narrative behavior:** name, face, clarify, legitimize, and give backbone to difficult honesty.

**Emotional register:** generally medium-to-heavy in weight; intimate, weighted, firm, and emotionally grounded without requiring melodrama.

**4 klaster Seri Jujur:**

1. Jujur Sama Diri Sendiri
2. Berani Punya Batas
3. Luka Lama
4. Jujur Sama Allah

### 5.3 Relationship Between the Two Modes

Sage and Burgundy are **not opposites**. They are two validation modes within one SDOH emotional system.

* **Sage validates the condition:** “aku boleh merasakan ini.”
* **Burgundy validates the courage:** “aku berani jujur tentang ini.”

A single emotional journey may move from Sage into Burgundy, but neither mode is required to end with advice, transformation, or resolution.

### 5.4 Cross-Format Ownership Rule

The thematic meaning of Sage / Seri Peluk and Burgundy / Seri Jujur is owned at the **SDOH project level** in this architecture.

The current active formats — **Carousel, Reels, and TikTok Poster** — may each have their own format-specific rules for layout, pacing, motion, typography, sequencing, or static composition, but they must inherit the same canonical theme semantics defined here. Future formats are not considered active until explicitly introduced through project-level change control.

Format-specific issues must not create competing definitions of what Sage or Burgundy means.

## 6. Visual System

**Canonical project-level palette tokens:** Sage `#94AC9C`; Burgundy `#5C1B29`. The approved Sage-background/Burgundy-linework reference image is the visual authority for this pair. Texture, grain, anti-aliasing, and image compression may create local pixel variation; those rendered variations do not create new color tokens.

* **Logo identity:** pill/capsule-shaped monoline mark forming stylized initials with a small heart at the base (ties to the "dosis" metaphor); reusable logo variants are owned by SDOH Asset Registry.
* **Shared typeface identity:** **Caveat Medium** is the canonical family/weight across Sage Reels, Burgundy Reels, Sage Carousel, Burgundy Carousel, Sage TikTok Poster, and Burgundy TikTok Poster. Its reusable identity and shared handwritten character are registered in **SDOH Asset Registry**, object `SDOH-OBJ-000010`. This architecture recognizes that existing shared decision; the registry remains the identity lookup authority. Newsreader is superseded and is retained only in historical records.
* **Typography execution ownership:** font size, leading implementation, tracking, text-field geometry, placement, and renderer-specific measurements are governed by the applicable production lane. Reels mechanics are defined in [BUS-45](<https://linear.app/bussiness-content-os/issue/BUS-45>), with Burgundy inheritance and justified exceptions in [BUS-46](<https://linear.app/bussiness-content-os/issue/BUS-46>). Carousel mechanics are defined in [BUS-47](<https://linear.app/bussiness-content-os/issue/BUS-47>), with Burgundy deltas in [BUS-48](<https://linear.app/bussiness-content-os/issue/BUS-48>). Each lane states which metrics are locked and which remain pending validation; sharing a typeface does not validate or transfer those metrics across formats. TikTok Poster is an active SDOH format. Shared Poster mechanics and Sage implementation are governed by [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production); Burgundy inherits that base through [BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) deterministic deltas. Poster-specific typography metrics remain owned by those production lanes and are not implied by Carousel or Reels metrics.
* **Template/layout ownership:** [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) owns shared Carousel mechanics and [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) Burgundy deltas. [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) is the canonical reusable Carousel master-template authority implementing those rules through one manifest-driven renderer and Sage/Burgundy variants. Its source/configuration/manifests/provenance package is authoritative for implementation; generated HTML/JPEG proofs are derivatives. This is a shared Carousel master, not a universal template across formats. Reels retain their separate production rules. TikTok Poster retains its separate [BUS-52](https://linear.app/bussiness-content-os/issue/BUS-52/satu-dosis-obat-hati-sage-tiktok-poster-production)/[BUS-53](https://linear.app/bussiness-content-os/issue/BUS-53/satu-dosis-obat-hati-burgundy-tiktok-poster-production) production authority and does not inherit the Carousel master as a universal template.
* **Cross-format rule:** project-level visual identity includes shared reusable assets, palette identity, and the approved Caveat Medium family/weight. Format-specific rules own typography execution metrics, layout, pacing, motion, sequencing, and production geometry. A shared asset identity does not create one universal layout or production template.

## 7. Channels & Cadence

* Channels: Instagram @satudosisobathati, Facebook Page "Satu Dosis Obat Hati" (Page ID 106568862031888, category Penulis), WhatsApp for consultations. No separate domain in use.
* Posting cadence: 6-day macro cycle — 3 sage posts (1/day: carousel, reels, carousel), then 3 burgundy posts (same pattern), then repeats
* Posting time: 19:30

## 8. Governance Notes

* Account category set to Professional Creator - Penulis/Pendidik (not Kesehatan) to avoid platform restrictions
* Built as a product brand rather than a personal account for easier monetization
* Constraints: no HIV-stigma content; must differentiate from generic religious "obat hati" content; personal photo (not logo) as initial profile photo; avoid heavy education content at restart; avoid commanding/preachy phrasing

## 9. Lifecycle Status

**Current phase:** Active build — brand & content system defined, first content unit shipped ("marah itu wajar"), production SOP formalized.

**Team:** Solo (no team structure).
**Monetization:** Not active — consultation (60 min, Rp150-250k), e-book/class, and workshop ideas remain unexecuted.

## 10. Related Documents

* Satu Dosis Obat Hati — Production SOP
* Satu Dosis Obat Hati — Research Source List (renamed from an earlier draft title "Reference Model" to avoid collision with the Root-Level, cross-cutting Content OS — Reference Model document)
* Satu Dosis Obat Hati — QA Document
* Satu Dosis Obat Hati — Asset Registry — canonical identity for reusable visual assets, including logo variants, surfaces/textures, ornaments, character/supporting marks, and shared typeface identity; supersedes the informal asset listing in §6 above for identity purposes
* [BUS-49](<https://linear.app/bussiness-content-os/issue/BUS-49>) — Carousel Master Template System — canonical reusable renderer/master implementation and persisted source-snapshot authority; constrained by [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) mechanics, [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) deltas, and [BUS-28](https://linear.app/bussiness-content-os/issue/BUS-28/satu-dosis-obat-hati-asset-registry) reusable asset identities.

## 11. Dependencies on System Level

Visual system (palette, template) currently lives inside SDOH, not System Level. Per Content OS governance rule, it stays here unless a third project later needs the same shared visual/content-series pattern — flagged as a watch item, not an action.

## Carousel Authority Conformance Maintenance

Owner-requested cross-document sweep reconciles references to the already-canonical [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) master; no project semantics, format mechanics, palette tokens, or document identity/version are changed. [BUS-24](https://linear.app/bussiness-content-os/issue/BUS-24/satu-dosis-obat-hati-project-architecture) owns semantics, [BUS-28](https://linear.app/bussiness-content-os/issue/BUS-28/satu-dosis-obat-hati-asset-registry) asset identity/provenance, [BUS-47](https://linear.app/bussiness-content-os/issue/BUS-47/satu-dosis-obat-hati-sage-carousel-production) shared Carousel rules, [BUS-48](https://linear.app/bussiness-content-os/issue/BUS-48/satu-dosis-obat-hati-burgundy-carousel-production) Burgundy deltas, and [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system) reusable master implementation. Current master inputs and persisted snapshot are resolved through [BUS-49](https://linear.app/bussiness-content-os/issue/BUS-49/satu-dosis-obat-hati-carousel-master-template-system), not an earlier content-proof HTML.