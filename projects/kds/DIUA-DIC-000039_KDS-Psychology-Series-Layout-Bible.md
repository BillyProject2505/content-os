---
document_name: "KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible"
document_class: "Domain/Project-Level Series Layout Bible"
structural_classification: "Tiered — Domain/Project (Tier 2, recursive sub-project) — Psychology Series; Parent Project: KDS Satu Hati Sulawesi Utara"
system: "Content OS → KDS Satu Hati Sulawesi Utara → Psychology Series"
owner: "[OPERATIONAL DEFAULT] Document creator under KDS Project Architecture §0 until formally reassigned"
related_issue: "BUS-107"
universal_identifier: "DIUA-DIC-000039"
version: "1.16"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000032"
    name: "KDS Satu Hati Sulawesi Utara — Project Architecture"
    version: "1.10"
    status: "CANONICAL"
  - id: "DIUA-DIC-000038"
    name: "KDS Satu Hati Sulawesi Utara — Psychology Series Production Bible"
    version: "1.8"
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
  - id: "DIUA-DIC-000035"
    name: "KDS Satu Hati Sulawesi Utara — QA Document"
    status: "CANONICAL"
  - id: "DIUA-DIC-000036"
    name: "KDS Satu Hati Sulawesi Utara — Asset Registry"
    status: "CANONICAL"
  - id: "DIUA-DIC-000040"
    name: "KDS Satu Hati Sulawesi Utara — Psychology Series Reference Sheet"
    status: "governed reference"
allocation_evidence: "CONTENT-OS-ALLOC-039 in Universal Identifier Registration Record v1.31"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/kds-satu-hati-sulawesi-utara-psychology-series-layout-bible-v116-295ae824d6f2"
representation_profile: "DIUA-DIC-000026@1.3"
---

> **Migration normalization note (2026-09-28):** the Linear source's own Document Identity table declares its dependencies as unversioned "current CANONICAL" pointers (KDS Project Architecture, KDS Psychology Series Production Bible, KDS Production SOP, Root Documentation Structure) rather than hard version pins, and that lateral/floating characterization is preserved verbatim in the Document Identity table below per migration policy (do not convert lateral/current-canonical references into hard version pins in governed text unless the source requires it). The structured `depends_on` frontmatter above resolves each to its live-verified version at migration time (Project Architecture v1.10, Production Bible v1.8, Production SOP v1.14, Root Documentation Structure v2.5) for repository dependency-graph tooling only, consistent with the schema used across all prior KDS migration units; this is a metadata-layer resolution, not a semantic change to the governed text. KDS Psychology Series Production Bible (`DIUA-DIC-000038`) has an open, validated, CI-passing migration PR (#43) not yet merged at the time this file was authored; no GitHub canonical path exists for it yet, so body references to it remain plain text without a repository-relative link pending its merge.

## Named Layout Rule

**Psychology Editorial Layout v1.0** is the canonical named layout rule implemented by this Layout Bible. This document remains the implementation authority for that rule; the name does not create a separate document.

# KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | KDS Satu Hati Sulawesi Utara — Psychology Series Layout Bible |
| Document Class | Domain/Project-Level Series Layout Bible |
| Structural Classification | Tiered — Domain/Project (Tier 2, recursive sub-project) — **Psychology Series**; Parent Project: KDS Satu Hati Sulawesi Utara |
| Owner | **[OPERATIONAL DEFAULT]** Document creator under KDS Project Architecture §0 until formally reassigned |
| Version | 1.16 |
| Status | **CANONICAL** — v1.16 corrects the Series Badge width after production QA demonstrated that the v1.15 220 px frame could not contain the canonical `SERI PSIKOLOGI N` pattern at the locked Inter 700 / 22 px / +0.06em typography and 14 px horizontal padding. Badge width is now 252 px; all other geometry remains unchanged. Previously v1.15. |
| Related Issue | [BUS-107](https://linear.app/bussiness-content-os/issue/BUS-107/kds-psychology-series-layout-bible) — KDS Psychology Series — Layout Bible |
| Universal Identifier | `DIUA-DIC-000039` — ALLOCATED — ACTIVE |
| Allocation Evidence | CONTENT-OS-ALLOC-039 in Universal Identifier Registration Record v1.31 |
| Depends On | KDS Project Architecture — current CANONICAL; KDS Psychology Series Production Bible — current CANONICAL; KDS Production SOP — current CANONICAL; Root Documentation Structure — current CANONICAL |
| Lateral / Consuming Authorities | KDS QA Document — current CANONICAL; KDS Asset Registry — current CANONICAL; KDS Psychology Series Reference Sheet — current governed reference |
| Storage Authority | Inherits **Content OS — Storage Authority Profile — current CANONICAL** ([BUS-109](../../system/DIUA-DIC-000041_Content-OS-Storage-Authority-Profile.md)). Local implementation: this Layout Bible exists only in Linear; referenced visual evidence may reside in Google Drive as binary/image evidence. |

## 0. Authority Boundary

This document owns the layout architecture and visual-storytelling implementation rules specific to KDS Psychology Series.

It does not own:

* research verification;
* project-level QA verdicts;
* reusable asset identity/provenance;
* project-wide audience or channel strategy.

## 1. Owner-Approved Direction

Effective as the governing design direction for development:

* Canvas: **1080 × 1350 px / 4:5 portrait**.
* Layout: **one unified composition** consisting of a left editorial copy field that transitions into the right narrative scene through a **required white-to-transparent gradient**. A hard two-block split is not permitted.
* Primary visual character: **official KDS Brand Presenter (KDS-OBJ-000010)**.
* Rendering: **anime style render across all narrative visuals**.
* Every slide visual must actively participate in the story.
* Slide-to-slide scenes must feel chronological, emotionally coherent, and connected to the copy.
* Copy rhythm must remain continuous with the previously produced KDS Psychology themes.

## 2. Layout Architecture

### 2.1 Left Editorial Field

Required hierarchy:

1. KDS brand block;
2. Psychology Series badge;
3. topic label;
4. main headline;
5. body copy;
6. insight/callout box when applicable;
7. lower decorative system;
8. page indicator.

The editorial field must remain readable first on mobile and must not be visually overwhelmed by the narrative scene. It is not a separate rectangular panel; it participates in one continuous composition.

### 2.2 Right Narrative Visual Zone

The right narrative zone is a **scene**, not decorative fill. The scene may extend beneath the transition area so that it visually merges with the editorial field.

It must:

* use the official Brand Presenter as the primary recurring character;
* use anime rendering consistent with the Brand Presenter;
* depict one readable narrative moment;
* support the semantic message of the slide;
* continue the episode's emotional and chronological progression.

### 2.3 Editorial-to-Scene Gradient Boundary

The copy-to-illustration boundary must use a **white-to-transparent gradient/fade** that visually merges the editorial field into the narrative scene.

Required behavior:

* the editorial side remains white or visually white-dominant where essential copy sits;
* the white field fades progressively toward transparency as it approaches the narrative scene;
* the narrative illustration may continue beneath the fading white overlay;
* there must be **no hard vertical divider, abrupt color edge, or two independent rectangular blocks** separating copy and illustration;
* the transition must preserve copy readability while making the slide read as **one continuous composition**.

### 2.3.1 Definitive Gradient Profile — 1080 × 1350

The editorial-to-scene transition uses a **horizontal left-to-right white-to-transparent gradient** with the following fixed stops:

| X position | White opacity |
| -- | -- |
| **390 px** | **100%** |
| **420 px** | **80%** |
| **450 px** | **35%** |
| **475 px** | **0%** |

Canonical implementation rules:

* gradient color is always **White** `#FFFFFF`;
* gradient starts at **x = 390 px** and ends at **x = 475 px**;
* interpolation is **linear between each adjacent opacity stop**;
* gradient direction is strictly **horizontal, left → right**;
* the gradient spans the **full 1350 px canvas height**;
* the narrative illustration may continue fully beneath the gradient overlay;
* no hard divider, seam, alternate fade direction, or slide-specific opacity profile is permitted;
* the same gradient profile applies to every Psychology Series slide.

### 2.4 Minimum Spatial Contract — Evidence-Derived Envelope

This contract exists to make production repeatable without pretending that the seven visual references are exact geometry masters.

For the canonical **1080 × 1350 px** production canvas:

* **Editorial essential-copy safe zone:** essential editorial copy uses the exact horizontal range **x = 48–390 px**, providing a fixed **342 px usable editorial width**. Essential text must not extend beyond `x = 390 px`.
* **Transition band:** exactly **x = 390–475 px** is reserved for the canonical **white-to-transparent gradient profile** defined in §2.3.1. Essential text must not depend on this band for readability.
* **Narrative-scene zone:** the narrative artwork frame begins exactly at **x = 430 px**, extends to **x = 1080 px**, and spans **y = 0–1350 px**; it may continue beneath the gradient transition band but must not obscure essential copy.
* **Primary visual focal point:** the Brand Presenter face and other critical narrative focal points must remain inside the governed focal zone **x = 560–1010 px, y = 160–1150 px**. Critical focal points must not enter the gradient transition band.
* **Page indicator anchor:** deterministic by slide role. **Slide 1 / opening slide = bottom-right**; **slides 2–N = bottom-left/editorial region**. No free repositioning is permitted.

These values are an **implementation envelope**, not exact aesthetic coordinates. They are derived from the repeated boundary behavior observed across the seven approved Psychology Series references, where the copy-to-scene transition begins at roughly 37–40% of source width.

#### Overflow rule

When copy does not fit the editorial safe zone, production must resolve the content problem rather than breaking the layout contract. Preferred order:

1. tighten or rewrite copy without changing the learning objective;
2. move secondary detail to another slide when editorially justified;
3. revise hierarchy/line breaks within the existing safe zone.

Do **not** solve overflow by pushing essential copy across the transition band, covering the narrative focal point, or replacing the unified gradient composition with a hard split or different architecture.

### 2.5 Vertical Editorial Grid — 1080 × 1350

The Psychology Series editorial stack uses the following **fixed vertical anchors**. Coordinate origin is the top-left of the canvas.

| Editorial role | X anchor | Y start | Governed vertical allowance |
| -- | -- | -- | -- |
| **Series Badge** | **48 px** | **252 px** | **34 px** |
| **Topic Label** | **48 px** | **304 px** | **64 px** |
| **Headline** | **48 px** | **390 px** | **224 px** |
| **Body** | **48 px** | **638 px** | **216 px** |
| **Callout zone** | **48 px** | **878 px** | **156 px; bottom y = 1034 px** |

The essential editorial content is bounded exactly by `x = 48–390 px` for a fixed `342 px` usable width. No essential text may extend beyond `x = 390 px` or into the transition band to solve overflow.

#### Fixed vertical spacing

* Header-to-Series-Badge spacing: **30 px** from the governed header block to the Series Badge start.
* Series Badge → Topic Label: **18 px**.
* Topic Label → Headline: **22 px**.
* Headline → Body: **24 px**.
* Body → Callout zone: **24 px**.

These vertical anchors and inter-role gaps are **FIXED** across Psychology Series slides unless a later Owner-approved Layout Bible revision explicitly changes them.

The Callout zone is now fully resolved by the definitive Callout Box contract in §5.6. Its frame is fixed at `x=48, y=878, w=342, h=156`.

### 2.5.1 Definitive Horizontal Editorial Bounds & Gutter — 1080 × 1350

The editorial field uses the following exact horizontal contract:

| Property | Canonical value |
| -- | -- |
| Editorial left edge | **48 px** |
| Editorial right edge | **390 px** |
| Editorial usable width | **342 px** |
| Gradient start | **390 px** |
| Gradient end | **475 px** |
| Narrative artwork start | **430 px** |

Canonical rules:

* Topic Label, Headline, Body, and Callout text frames must remain within `x = 48–390 px`;
* the canonical editorial usable width is exactly `342 px`;
* `x = 390–475 px` belongs to the transition system;
* there is **no additional text gutter** between the editorial field and the gradient: the editorial right edge and gradient start meet at `x = 390 px`;
* this is valid because the gradient is still `100%` white at `x = 390 px`;
* text frames must not be widened to solve overflow;
* the locked Callout Box width `342 px` already matches the editorial usable width exactly;
* the Series Badge remains independently locked at `252 px` width and is not stretched to match the editorial field width.

### 2.6 Definitive Narrative Visual Bounds — 1080 × 1350

The narrative artwork uses the following fixed production frame:

| Property | Canonical value |
| -- | -- |
| Artwork X | **430 px** |
| Artwork Y | **0 px** |
| Artwork width | **650 px** |
| Artwork height | **1350 px** |
| Artwork right edge | **1080 px** |
| Critical focal zone X | **560–1010 px** |
| Critical focal zone Y | **160–1150 px** |
| Minimum right safe distance for critical focal points | **70 px** |
| Minimum X for face/critical focal point | **560 px** |

#### Narrative bounds rules

* narrative artwork bleeds fully to the **top, right, and bottom** canvas edges;
* artwork may extend beneath the gradient across `x = 430–475 px`;
* the Brand Presenter face and other critical focal points must not be placed inside the gradient transition band;
* face/critical focal points must begin at `x ≥ 560 px` and remain at least `70 px` from the right canvas edge;
* the governed critical focal zone is `x = 560–1010 px`, `y = 160–1150 px`;
* presenter crop may vary with the story, but the **head/face must not be cut off**;
* background, props, and non-critical environmental details may extend outside the critical focal zone and throughout the narrative artwork frame;
* when scene composition conflicts with editorial copy, **recompose the scene**. Do not move the editorial grid, gradient, or essential-copy anchors to accommodate the illustration.

### 2.7 Definitive Layout Protection Zones — 1080 × 1350

The canonical production canvas uses the following fixed protection zones:

| Zone | Canonical bounds | Function |
| -- | -- | -- |
| **Editorial essential-content zone** | `x=48–390, y=252–1034` | Essential editorial content only |
| **Narrative focal-content zone** | `x=560–1010, y=160–1150` | Face and critical narrative focal points |
| **Lower decorative band** | `y=1118–1200` | Governed lower ornament territory |
| **Bottom non-critical zone** | `y=1200–1350` | Non-essential content only, except governed page indicator |
| **Slide 1 page-indicator reserve** | `x=960–1053, y=1270–1322` | Exclusive reserve for Slide 1 indicator |
| **Slides 2–N page-indicator reserve** | `x=41–123, y=1274–1319` | Exclusive reserve for Slides 2–N indicator |

Canonical rules:

* essential editorial copy must remain inside `x=48–390, y=252–1034`;
* Brand Presenter face and other critical narrative focal points must remain inside `x=560–1010, y=160–1150`;
* `y=1200–1350` must not contain essential information other than the governed page indicator;
* the header brand system is governed by its own exact geometry in §3 and is explicitly exempt from the editorial essential-content zone;
* background artwork, bleed, lighting, texture, and non-critical decorative elements may extend outside these zones where permitted by their own contracts;
* the lower decorative band does not authorize ornament movement beyond the exact frames already locked in §6.5.1;
* the page-indicator reserves are exclusive to their respective slide roles and may not be occupied by competing copy, ornaments, or critical focal content;
* governed elements must not be moved, resized, or reflowed merely to work around zone collisions; resolve the conflicting content or scene composition instead.

## 3. Brand and Header System

The upper-left brand block uses registered KDS identity assets and has **deterministic production geometry** on the canonical 1080 × 1350 px canvas.

### 3.1 Canonical Asset Sources

* **Logo:** `KDS-OBJ-000001` — `KDS-OBJ-000001_Official-Logo_v1.0.png` — Google Drive file ID `17VJX_oJ7C-sXDjkPN0HzQwVCoeWpkKz5`.
* **Wordmark:** `KDS-OBJ-000002` — `KDS-OBJ-000002_Wordmark_PRODUCTION_v1.1.png` — Google Drive file ID `1uSJpkMosYoRbj3uUvBNVMQrkMAwxPXxn`.

The wordmark must be placed from the registered PNG asset. **Retyping or reconstructing** `KDS / Satu Hati / Sulawesi Utara` **as live text is non-conforming.**

### 3.2 Definitive Header Geometry — 1080 × 1350

Coordinate origin is the **top-left of the canvas** (`x = 0`, `y = 0`). Coordinates describe the placed PNG asset frames, including their native transparent margins.

| Element | X | Y | Width | Height | Rule |
| -- | -- | -- | -- | -- | -- |
| Official Logo `KDS-OBJ-000001` | **3 px** | **34 px** | **188 px** | **188 px** | Exact frame; preserve square aspect ratio |
| Gold divider | **182 px** | **53 px** | **2 px** | **132 px** | Exact geometry; Gold `#E2A93C` |
| Wordmark `KDS-OBJ-000002` | **204 px** | **65 px** | **188 px** | **109 px** | Exact frame; use registered PNG only |

These values are the canonical 1080 × 1350 implementation geometry. They were normalized from the repeated header placement in the approved Psychology Series reference evidence rather than imported from another project.

### 3.3 Header Lock Rules

* logo and wordmark positions and frame sizes are **FIXED** across all Psychology Series slides;
* do not move, scale, crop, stretch, recolor, rebuild, or substitute either asset;
* do not independently resize the logo or wordmark to accommodate copy pressure;
* the header may sit over the white-dominant editorial field but must remain visually isolated from the narrative focal point;
* any future geometry change requires explicit Owner decision and a Layout Bible version change.

## 4. Series Badge and Topic Label

Series badge uses sequential Psychology Series naming, e.g.:

* SERI PSIKOLOGI 1
* SERI PSIKOLOGI 2

Topic label identifies the episode focus, e.g. Minority Stress.

The badge and topic line remain structurally stable across an episode.

### 4.1 Definitive Series Badge Geometry — 1080 × 1350

The Psychology Series badge uses a fixed container:

| Property | Canonical value |
| -- | -- |
| X | **48 px** |
| Y | **252 px** |
| Width | **252 px** |
| Height | **34 px** |
| Corner radius | **17 px** |
| Fill | **Burgundy** `#96251E` |
| Text color | **White** `#FFFFFF` |
| Horizontal padding | **14 px** |
| Vertical padding | **4 px** |
| Horizontal alignment | **Center** |
| Vertical alignment | **Center** |

Typography remains governed by §5.2: **Inter 700 / 22 px / 26 px line-height / +0.06em / uppercase / one line**.

### 4.2 Series Badge Lock Rules

* the badge frame is **FIXED** across all Psychology Series slides;
* the badge must not auto-resize by episode number or wording length;
* do not widen, heighten, compress, or move the badge to accommodate copy;
* do not reduce font size, tracking, or weight to force text into the badge;
* if badge wording does not fit, resolve the naming/copy rather than mutating the container;
* no alternate fill color, outline-only variant, or transparent badge is permitted without explicit Owner decision.

## 5. Copy Hierarchy

### 5.0 Canonical Typography Family

**Canonical content typeface: Inter.**

Inter is mandatory for Psychology Series editorial copy, including:

* Psychology Series badge;
* topic label;
* headline;
* body copy;
* callout text;
* CTA/engagement copy when present;
* page indicator.

The registered KDS wordmark remains a PNG asset and must **not** be retyped, even though its approved underlying family is also Inter.

### 5.1 Core Typography Hierarchy — 1080 × 1350

The following values are **CANONICAL and FIXED** for Psychology Series production.

| Role | Family | Weight | Size | Line-height | Tracking | Case | Alignment | Line limit |
| -- | -- | -- | -- | -- | -- | -- | -- | -- |
| **Series Badge** | Inter | **700** | **22 px** | **26 px** | **+0.06em** | **UPPERCASE** | Center within badge | **1 line** |
| **Topic Label** | Inter | **600** | **26 px** | **32 px** | **0** | Title/Sentence Case | Left | **2 lines max** |
| **Headline** | Inter | **700** | **52 px** | **56 px** | **−0.02em** | Sentence Case | Left | **4 lines max** |
| **Body** | Inter | **400** | **25 px** | **36 px** | **0** | Sentence Case | Left | **6 lines max per text block** |
| **Callout** | Inter | **600** | **24 px** | **32 px** | **0** | Sentence Case | Left | **4 lines max** |

These values apply to the 1080 × 1350 canonical canvas and the current editorial safe-zone contract.

### 5.2 Series Badge Typography

Required:

* text pattern: `SERI PSIKOLOGI N`;
* Inter 700 / 22 px / 26 px line-height;
* tracking `+0.06em`;
* uppercase only;
* single line only;
* horizontally and vertically centered inside its governed badge container.

Do not reduce type size to fit a longer label. The badge wording must be shortened or otherwise resolved editorially.

### 5.3 Topic Label Typography

Required:

* Inter 600 / 26 px / 32 px line-height;
* tracking `0`;
* left aligned;
* Title Case or natural Sentence Case according to the topic name;
* maximum 2 lines.

The topic label must remain visually subordinate to the headline and stronger than body copy.

### 5.4 Headline Typography

The headline is the dominant editorial message.

Required:

* Inter 700 / 52 px / 56 px line-height;
* tracking `−0.02em`;
* left aligned;
* Sentence Case;
* maximum 4 lines;
* no forced all-caps headline;
* no font-size reduction below 52 px to solve overflow.

If a headline does not fit, rewrite or tighten the copy while preserving the learning objective.

### 5.5 Body Typography

Body copy expands the headline in short readable blocks.

Required:

* Inter 400 / 25 px / 36 px line-height;
* tracking `0`;
* left aligned;
* Sentence Case;
* maximum 6 lines per text block.

Inline emphasis may use **Inter 600** while retaining the same 25 px size and 36 px line-height. Do not use a different font family or reduce body size to force-fit copy.

Tone remains:

* empathic;
* non-diagnostic;
* non-shaming;
* evidence-aware;
* understandable to community audiences.

### 5.6 Callout Typography

Callout is used for a memorable insight, safety/validation statement, concise takeaway, or reflection prompt.

Required:

* Inter 600 / 24 px / 32 px line-height;
* tracking `0`;
* left aligned;
* Sentence Case;
* maximum 4 lines.

Callout typography must remain visually distinct from body copy but subordinate to the headline. It must not introduce a second unrelated learning objective.

#### Definitive Callout Box Geometry — 1080 × 1350

When a callout is used, it must use the following fixed container:

| Property | Canonical value |
| -- | -- |
| X | **48 px** |
| Y | **878 px** |
| Width | **342 px** |
| Height | **156 px** |
| Corner radius | **18 px** |
| Fill | **Beige** `#F9EBD1` |
| Stroke | **None** |
| Horizontal padding | **20 px** |
| Vertical padding | **16 px** |
| Text alignment | **Left / Top** |

Typography remains **Inter 600 / 24 px / 32 px line-height / tracking 0 / Sentence Case / maximum 4 lines**.

Callout lock rules:

* the callout frame must not auto-resize between slides;
* do not change width, height, radius, fill, padding, or typography to accommodate longer copy;
* do not add a stroke or alternate background color without explicit Owner decision;
* if content exceeds the governed capacity, shorten/rewrite the callout or move secondary detail elsewhere;
* if a slide does not require a callout, do not render an empty callout container.

### 5.7 Typography Overflow and Substitution Rules

For all five core roles:

1. **Do not shrink typography below the canonical size.**
2. **Do not condense, horizontally scale, or distort glyphs.**
3. **Do not substitute another font family.**
4. **Do not change tracking or line-height to force content to fit.**
5. Resolve overflow by rewriting, shortening, or moving secondary detail to another slide.

CTA/engagement copy that is not inside a callout inherits **Body typography** unless a later explicit role contract is established.

## 6. Page Indicator and Decorative Lower System

### 6.1 Format

The page indicator uses the canonical format:

`current/total`

Examples: `1/9`, `2/9`, `8/9`, `9/9`.

Rules:

* no spaces around `/`;
* use Arabic numerals;
* indicator must show the real current slide and real total slide count;
* numbering starts at `1` on the opening slide;
* the references/source slide, when included as the last carousel slide, is counted in the total.

### 6.2 Definitive Indicator Geometry — 1080 × 1350

Coordinate origin is the top-left of the canvas (`x = 0`, `y = 0`).

| Slide role | X | Y | Width | Height | Anchor |
| -- | -- | -- | -- | -- | -- |
| **Slide 1 / opening slide** | **960 px** | **1270 px** | **93 px** | **52 px** | bottom-right |
| **Slides 2–N / content and closing slides** | **41 px** | **1274 px** | **82 px** | **45 px** | bottom-left |

These frames are normalized from approved Psychology Series reference behavior to the canonical 1080 × 1350 production canvas.

### 6.3 Visual Treatment

| Property | Slide 1 | Slides 2–N |
| -- | -- | -- |
| Fill | Burgundy `#96251E` | Burgundy `#96251E` |
| Text | White `#FFFFFF` | White `#FFFFFF` |
| Corner radius | **12 px** | **10 px** |
| Text size | **30 px** | **26 px** |
| Text weight | **700 / Bold** | **700 / Bold** |
| Horizontal alignment | **Center** | **Center** |
| Vertical alignment | **Center** | **Center** |

Additional rules:

* page-number typography family is **Inter**;
* do not simulate the required weight by outlining or raster effects;
* indicator stays visually subordinate to headline, callout, and narrative focal point;
* position, frame dimensions, radius, text size, weight, color, content format, and alignment are fixed by this section.

### 6.4 Placement Lock

* Slide 1 uses only the **bottom-right** variant.
* Slides 2–N use only the **bottom-left** variant.
* Do not move the indicator to avoid illustration, ornament, or copy collisions. Resolve the conflicting content/layout element instead.
* Do not resize the frame because the episode has more slides; the `current/total` string must remain centered within the canonical frame.
* Do not place the indicator inside the gradient transition band.

### 6.5 Decorative Lower System

The lower decorative system uses only registered ACTIVE KDS ornament assets and must remain subordinate to copy, page indicator, and narrative scene.

### 6.5.1 Definitive Lower Ornament Geometry — 1080 × 1350

The canonical lower ornament system uses the following registered assets and frames:

| Ornament | Asset ID | X | Y | Width | Height | Role |
| -- | -- | -- | -- | -- | -- | -- |
| **Gold Wave Ornament** | `KDS-OBJ-000004` | **48 px** | **1120 px** | **250 px** | **80 px** | **Default lower ornament** |
| **Dot Matrix Ornament** | `KDS-OBJ-000005` | **316 px** | **1118 px** | **74 px** | **74 px** | **Optional secondary accent** |

Canonical rules:

* `KDS-OBJ-000004` Gold Wave is the **default lower ornament** for Psychology Series;
* `KDS-OBJ-000005` Dot Matrix may be added only as the secondary accent at its fixed frame;
* both ornaments are decorative only and must never carry essential information;
* neither ornament may overlap the Callout Box or enter the gradient transition band;
* both remain below the main editorial content area;
* both must preserve safe separation from the Slides 2–N page indicator;
* do not freely move, crop, stretch, recolor, or rescale either registered production asset;
* the Dot Matrix may be omitted when the slide would otherwise become visually crowded;
* the Gold Wave remains the default, but may be omitted only when a documented narrative/layout reason makes its presence harmful to readability or visual hierarchy;
* `KDS-OBJ-000006` through `KDS-OBJ-000009` are **not** default lower-system substitutes. Their use requires a separate explicit layout decision rather than spontaneous replacement.

## 7. Anime Rendering Standard

All narrative visuals in Psychology Series use **anime style render** consistent with the registered KDS Brand Presenter.

Disallowed as default Psychology Series rendering:

* photorealistic rendering;
* unrelated flat character styles;
* 3D character rendering;
* style changes between slides that break presenter identity.

Backgrounds, secondary characters, props, light, and environment must also be rendered as part of the same anime visual world.

## 8. Brand Presenter Use

The official Brand Presenter (KDS-OBJ-000010) is the primary Psychology Series character system.

Allowed:

* changes in pose;
* camera angle;
* facial expression;
* crop;
* scene;
* episode-appropriate wardrobe variants when authorized;
* interaction with secondary characters.

Required:

* stable face/hair/body identity;
* male presentation lock remains in force;
* anime-style identity remains stable;
* no replacement by a new protagonist without explicit authority.

## 9. Narrative Continuity

### 9.1 Every Slide Tells

Each visual must advance the story, emotional state, context, or understanding.

### 9.2 One Scene Rule

One visual panel represents one clear scene/moment rather than a collage of unrelated concepts.

### 9.3 Chronological Narrative

Scenes must read as an unfolding episode unless an explicit transition indicates otherwise.

### 9.4 Emotional Arc

Typical progression may move through recognition → explanation → reflection → support → realistic hope.

The exact sequence may vary by episode, but continuity must remain perceptible.

## 10. Copy–Visual Synchronization

The copy and scene must communicate the same slide-level message.

A slide fails the layout intent when:

* visual is generic and could fit any slide;
* presenter expression contradicts the copy;
* scene introduces a different story;
* the visual repeats without narrative progression.

## 11. Reference Authority

The KDS Psychology Series Reference Sheet stores approved visual evidence for composition, hierarchy, visual rhythm, and narrative continuity.

Reference images are evidence of **layout/storytelling logic**.

The approved anime examples are the current rendering evidence.

Photorealistic legacy examples, if retained, are composition-history evidence only and do not override the anime rendering standard.

## 12. QA-Relevant Conformance

Applicable QA evidence should verify:

* 1080 × 1350 / 4:5 canvas;
* unified left-copy-to-right-scene architecture with the required white-to-transparent gradient boundary;
* exact gradient stops: `x=390 / 420 / 450 / 475` with white opacity `100% / 80% / 35% / 0%`;
* horizontal left→right direction, linear interpolation between stops, and full-height 1350 px application;
* correct KDS identity assets;
* exact logo frame `x=3, y=34, w=188, h=188`;
* exact gold divider `x=182, y=53, w=2, h=132`;
* exact wordmark frame `x=204, y=65, w=188, h=109`;
* series badge/topic hierarchy;
* Series Badge frame `x=48, y=252, w=220, h=34`, radius `17 px`;
* Series Badge Burgundy `#96251E` fill, white text, padding `14 px / 4 px`, centered;
* Horizontal Editorial Bounds: `x=48–390`, usable width `342 px`, with gradient start exactly at `x=390` and no additional text gutter;
* Vertical Editorial Grid anchors: Badge `y=252`, Topic `y=304`, Headline `y=390`, Body `y=638`, Callout zone `y=878`;
* fixed inter-role spacing: `30 / 18 / 22 / 24 / 24 px` according to §2.5;
* readable headline/body/callout structure;
* Callout frame `x=48, y=878, w=342, h=156`, radius `18 px`;
* Callout fill Beige `#F9EBD1`, no stroke, padding `20 px / 16 px`, text left/top;
* anime rendering across scene elements;
* official Brand Presenter identity;
* narrative artwork frame `x=430, y=0, w=650, h=1350` with bleed to top/right/bottom;
* critical focal zone `x=560–1010, y=160–1150`;
* minimum `70 px` right safe distance for face/critical focal points;
* face/critical focal point at `x ≥ 560` and never inside the gradient transition band;
* presenter head/face not cropped;
* scene relevance to copy;
* chronological/emotional continuity;
* page indicator format `current/total`;
* Slide 1 indicator frame `x=960, y=1270, w=93, h=52`;
* Slides 2–N indicator frame `x=41, y=1274, w=82, h=45`;
* correct role-based bottom-right / bottom-left indicator placement;
* canonical content typeface **Inter**;
* Series Badge: Inter `700 / 22 / 26 / +0.06em`, uppercase, 1 line;
* Topic Label: Inter `600 / 26 / 32 / 0`, left, max 2 lines;
* Headline: Inter `700 / 52 / 56 / −0.02em`, left, max 4 lines;
* Body: Inter `400 / 25 / 36 / 0`, left, max 6 lines per block;
* Callout: Inter `600 / 24 / 32 / 0`, left, max 4 lines;
* lower ornament frames: Gold Wave `x=48, y=1120, w=250, h=80`; Dot Matrix `x=316, y=1118, w=74, h=74`;
* Gold Wave default / Dot Matrix optional-secondary behavior;
* no typography shrink/substitution to solve overflow;
* Burgundy `#96251E` indicator fill with centered white Inter text;
* Slide 1 indicator radius `12 px`, text `30 px / 700`;
* Slides 2–N indicator radius `10 px`, text `26 px / 700`;
* editorial essential-content zone `x=48–390, y=252–1034`;
* narrative focal-content zone `x=560–1010, y=160–1150`;
* lower decorative band `y=1118–1200`;
* bottom non-critical zone `y=1200–1350`;
* Slide 1 indicator reserve `x=960–1053, y=1270–1322`;
* Slides 2–N indicator reserve `x=41–123, y=1274–1319`;
* no unauthorized asset or style substitution.

Project QA remains the sole PASS/FAIL authority.

## 13. Numerical Specification Closure

**No current Psychology Series layout numerical specifications remain OPEN.**

All previously open numerical categories are now resolved through explicit Owner-approved canonical locks. Future numerical changes require an explicit Owner-approved Layout Bible revision rather than local production inference.

## 14. Lifecycle

**Current state:** CANONICAL v1.16 — ACTIVE / Psychology Series recursive Tier-2 sub-project. The Minimum Spatial Contract, exact Horizontal Editorial Bounds, fixed Vertical Editorial Grid, deterministic Series Badge and Callout Box geometry, deterministic white-to-transparent Gradient Profile, deterministic Narrative Visual Bounds and focal-zone protection, deterministic Lower Ornament Geometry, definitive Layout Protection Zones, deterministic logo/wordmark header geometry, complete role-based page-indicator contract, Inter content typeface, and complete core editorial typography hierarchy are authoritative for Psychology Series production. Series Badge width is corrected to 252 px following production QA. No current numerical layout constants remain OPEN. Storage authority is inherited from the System profile.

Before canonicalization:

* identifier allocation must be recorded;
* Reference Sheet linkage must be complete;
* Production Bible integration must be reconciled;
* QA/Asset Registry boundary review must pass;
* final critical review must pass;
* explicit Owner approval must be recorded.

---

## 15. Storage Boundary Correction — v0.2 — 2026-09-26

**Owner rule:**

* **Linear** is the sole storage and authority surface for KDS text/governance documents.
* **Google Drive** is restricted to binary/image files and visual reference evidence.
* No Google Doc/Sheet/Slide copy of this Layout Bible is authoritative or required.
* Visual evidence referenced by this Bible may reside in Google Drive as image/binary files and must be identified through stable file IDs/folders where needed.

The previously created Google Docs copy was deleted. This correction changes storage/provenance only and does not alter the Psychology Series layout rules.

**Version:** 0.1 → 0.2.

---

## 16. Current-System Integration Audit — v0.3 — 2026-09-26

### 16.1 Production Bible integration

**PASS.** Psychology Series Production Bible **v1.4 CANONICAL** establishes the series-level editorial, presenter, continuity, prompt-hierarchy, and 1080 × 1350 split-layout direction. This Layout Bible specializes implementation only and does not duplicate research, asset identity, or project QA authority.

The stale pre-adoption reusable-cast wording in the Production Bible was reconciled before this review. Current cast readiness is resolved through ACTIVE `KDS-OBJ-000010`.

### 16.2 Reference evidence

**PASS.** Psychology Series Reference Sheet v0.3 registers seven Owner-approved PNG references in Google Drive. All seven were read back and integrity-registered with stable Drive IDs, dimensions, file sizes, and SHA-256 hashes.

The source references are 1122 × 1402. They are evidence of composition/storytelling behavior only and do not override the governed **1080 × 1350 / 4:5** production canvas.

### 16.3 QA compatibility

**PASS.** KDS QA Document **v1.9 CANONICAL** remains the sole project PASS/FAIL authority. The Layout Bible contributes applicable conformance evidence only; it creates no parallel QA verdict system.

### 16.4 Asset Registry boundary

**PASS.** KDS Asset Registry **v1.8 CANONICAL** owns reusable asset identity and provenance. `KDS-OBJ-000010` is ACTIVE, male-locked, anime-rendered, and explicitly approved as the primary Psychology Series character system. This Layout Bible governs placement, scene use, and continuity but does not redefine the object identity.

### 16.5 Numerical-specification discipline

**PASS / intentionally OPEN.** The seven approved visual references consistently support a unified left-editorial/right-scene composition joined by soft white blending, but they are not deterministic layout masters. Therefore this review does **not** manufacture false precision for:

* split ratio;
* exact margins/gutters;
* typography metrics;
* callout dimensions;
* brand-block geometry;
* page-indicator geometry;
* lower-ornament geometry;
* safe-area constants.

These remain OPEN until repeated production evidence or an explicit Owner decision justifies locking numeric values.

## 17. Final Critical Review — v0.3

**Verdict: PASS — READY FOR OWNER APPROVAL.**

Verified:

* identifier/allocation integrity — PASS;
* Production Bible integration — PASS;
* Reference Sheet linkage and binary evidence — PASS;
* QA ownership — PASS;
* Asset Registry boundary — PASS;
* storage authority split — PASS;
* presenter identity and anime rendering direction — PASS;
* narrative/chronological continuity rules — PASS;
* unsupported exact geometry invention — NONE;
* cross-project rule import — NONE detected.

No blocking architectural or governance defect remains in the Layout Bible draft. Canonicalization is not performed by this review; explicit Owner approval remains required.

**Version:** 0.2 → 0.3.

---

## 18. BUS-107/108 Audit Remediation — v0.4 — 2026-09-26

Audit finding addressed: the Layout Bible was governance-clean but too permissive to guarantee repeatable production because nearly all spatial constraints remained OPEN.

### Remediation

* added §2.4 **Minimum Spatial Contract — Evidence-Derived Envelope**;
* retained OPEN status for micro-geometry that the evidence does not support;
* added an explicit overflow rule so copy pressure cannot silently mutate the layout architecture;
* replaced local restatement of storage policy with inheritance from the System-level Storage Authority Profile.

### Evidence basis

Across the seven approved reference PNGs, the repeated visual transition from editorial field to narrative scene begins at approximately **37–40% of source width**. The v0.4 production envelope translates that repeated behavior to the governed 1080 px production width without treating any source PNG as a pixel-exact template.

### Change classification

**Production-determinism / governance-boundary correction.** No new subsystem, Layout System, Geometry Bible, asset identity, QA mechanism, research rule, or channel rule was created.

**Version:** 0.3 → 0.4.

---

## 19. Post-Remediation Read-Back Verification — 2026-09-26

**Verdict: PASS.**

Read-back confirmed:

* v0.4 document identity and title are synchronized;
* §2.4 Minimum Spatial Contract is present and internally consistent;
* the evidence-derived horizontal envelope is present (`x = 48–410`, transition `x = 390–475`, narrative `x ≥ 430`);
* overflow behavior is fail-safe against layout mutation;
* fine-grained typography and micro-geometry remain OPEN rather than invented;
* Storage Authority Profile is inherited through the System-level pointer;
* [BUS-108](https://linear.app/bussiness-content-os/issue/BUS-108/kds-psychology-series-reference-sheet) remains an evidence source rather than a competing layout authority;
* no new project-level storage policy or governance layer was created.

No blocking defect remains in BUS-107. Canonicalization has **not** occurred.

---

## 20. Owner Approval & Canonicalization — v1.0 — 2026-09-26

**Owner decision:** APPROVED — CANONICALIZED.

**Preconditions satisfied:**

* identifier/allocation integrity — PASS;
* Production Bible integration — PASS;
* Reference Sheet evidence linkage — PASS;
* QA compatibility — PASS;
* Asset Registry boundary — PASS;
* Storage Authority inheritance — PASS;
* audit remediation — PASS;
* post-remediation read-back — PASS.

Effective immediately, this document is the canonical KDS Psychology Series layout authority within its stated scope.

Canonicalization does **not** convert intentionally OPEN micro-geometry into fixed rules. Exact typography metrics, aesthetic fade profile, detailed margins/gutters, callout dimensions, ornament geometry, and related fine-grained values remain OPEN until supported by evidence or a later explicit Owner decision.

**Canonical version:** v1.0.

---

## 21. Sub-project Structural Migration — v1.1 — 2026-09-26

**Change type:** structural classification / project-container migration only.

* Parent project: **KDS Satu Hati Sulawesi Utara**.
* Recursive Tier-2 sub-project: **Psychology Series**.
* Linear issue BUS-107 is now owned by the Psychology Series project.
* Universal Identifier `DIUA-DIC-000039` is unchanged.
* No layout rule, spatial contract, evidence interpretation, QA criterion, or asset identity changed.

**Version:** 1.0 → 1.1.

### v1.1 current-state maintenance — 2026-09-26

Post-migration read-back corrected the §14 lifecycle self-reference from v1.0 to the document's existing v1.1 state. No version increment or layout/storage rule change is introduced.

---

## 22. Owner Boundary Correction — v1.2 — 2026-09-27

**Owner decision:** the Psychology Series must not render the editorial copy area and narrative illustration as two visually separated blocks.

Canonical correction:

* the composition remains editorial-left / narrative-right for information hierarchy;
* the visible boundary is a **required white-to-transparent gradient**, not a hard split;
* the narrative scene may continue beneath the fading white overlay;
* hard vertical dividers, abrupt rectangular panel edges, or two independent block backgrounds are non-conforming;
* exact gradient stops and opacity curve remain OPEN within the existing transition envelope.

This is a layout-semantics correction to prevent misinterpretation of the prior “panel + panel” wording. It does not change the canvas, essential-copy safe zone, transition envelope, narrative focal-zone guidance, presenter identity, research authority, QA ownership, or storage policy.

**Version:** 1.1 → 1.2 CANONICAL.

---

## 23. Owner Header Geometry Lock — v1.3 — 2026-09-27

**Owner decision:** the KDS logo and wordmark must have definitive size and position in Psychology Series production.

Evidence basis:

* registered Drive assets `KDS-OBJ-000001` and `KDS-OBJ-000002` were read directly;
* repeated placement was checked against approved Psychology Series reference PNGs;
* source-reference geometry was normalized from 1122 × 1402 evidence to the canonical 1080 × 1350 production canvas.

Locked production frames:

* Logo: `x=3, y=34, w=188, h=188`;
* Divider: `x=182, y=53, w=2, h=132`, Gold `#E2A93C`;
* Wordmark: `x=204, y=65, w=188, h=109`.

The registered wordmark PNG is mandatory; live-text reconstruction is prohibited.

This closes **brand block geometry** from §13 OPEN Numerical Specifications. Other OPEN geometry remains unchanged.

**Version:** 1.2 → 1.3 CANONICAL.

---

## 24. Owner Page-Indicator Geometry Lock — v1.4 — 2026-09-27

**Owner decision:** slide numbering must have definitive placement and dimensions.

Canonical behavior:

* format: `current/total` with no spaces;
* Slide 1 / opening slide: bottom-right, frame `x=960, y=1270, w=93, h=52`;
* Slides 2–N: bottom-left, frame `x=41, y=1274, w=82, h=45`;
* fill: Burgundy `#96251E`;
* text: white, horizontally and vertically centered;
* no free repositioning or resizing;
* page indicator must not enter the gradient transition band.

The two-position rule preserves the approved visual behavior while converting it into a deterministic production contract. Page-indicator geometry is therefore removed from §13 OPEN Numerical Specifications. Typography family remains OPEN until owned by a Psychology Series/KDS typography authority.

**Version:** 1.3 → 1.4 CANONICAL.

---

## 25. Owner Page-Indicator Typography Completion — v1.5 — 2026-09-27

The v1.4 page-indicator geometry is retained. v1.5 closes the remaining visual-treatment ambiguity required for repeatable rendering:

* Slide 1: radius `12 px`, text `30 px`, weight `700/Bold`;
* Slides 2–N: radius `10 px`, text `26 px`, weight `700/Bold`;
* centered white text on Burgundy `#96251E`;
* font family remains OPEN/inherited until a governing Psychology Series/KDS typography authority locks it.

No header, gradient, narrative-zone, asset, research, QA, or storage rule changed.

**Version:** 1.4 → 1.5 CANONICAL.

---

## 26. Psychology Series Typeface Lock — v1.6 — 2026-09-27

The remaining font-family ambiguity is resolved.

**Canonical content typeface: Inter.**

Applies to Psychology Series badge, topic label, headline, body, callout, CTA/engagement copy, and page indicator.

Evidence/consistency basis:

* KDS Asset Registry records Inter as the approved wordmark family;
* its comparison record ranked Inter above the earlier provisional Montserrat assumption;
* using Inter for Psychology Series avoids a new cross-typeface dependency while remaining consistent with current KDS identity evidence.

The registered KDS wordmark continues to be placed as its production PNG; this typography lock does not authorize retyping the wordmark.

This decision closes **font family**. Non-indicator font sizes, line-height, tracking, and detailed role hierarchy remain OPEN until explicitly locked.

**Version:** 1.5 → 1.6 CANONICAL.

---

## 27. Owner Core Typography Hierarchy Lock — v1.7 — 2026-09-27

**Owner decision:** the Psychology Series core typography hierarchy is now fully deterministic.

Locked roles:

* Series Badge — Inter 700, 22 px, 26 px line-height, `+0.06em`, uppercase, 1 line;
* Topic Label — Inter 600, 26 px, 32 px line-height, tracking 0, max 2 lines;
* Headline — Inter 700, 52 px, 56 px line-height, `−0.02em`, max 4 lines;
* Body — Inter 400, 25 px, 36 px line-height, tracking 0, max 6 lines per text block;
* Callout — Inter 600, 24 px, 32 px line-height, tracking 0, max 4 lines.

All are locked to the canonical 1080 × 1350 canvas. Typography must not be shrunk, condensed, substituted, or re-tracked to solve overflow; copy must be rewritten or redistributed instead.

CTA/engagement copy inherits Body typography unless a later explicit role contract is approved.

This closes the remaining core typography size/weight/line-height/tracking hierarchy from §13 OPEN Numerical Specifications.

**Version:** 1.6 → 1.7 CANONICAL.

---

## 28. Owner Vertical Editorial Grid Lock — v1.8 — 2026-09-27

**Owner decision:** APPROVED.

The editorial stack is now deterministic on the canonical 1080 × 1350 canvas:

* Series Badge — `x=48, y=252`, vertical allowance `34 px`;
* Topic Label — `x=48, y=304`, vertical allowance `64 px`;
* Headline — `x=48, y=390`, vertical allowance `224 px`;
* Body — `x=48, y=638`, vertical allowance `216 px`;
* Callout zone — `x=48, y=878`, available through approximately `y=1100`.

Fixed spacing sequence:

* Header → Badge: `30 px`;
* Badge → Topic: `18 px`;
* Topic → Headline: `22 px`;
* Headline → Body: `24 px`;
* Body → Callout: `24 px`.

The existing essential-copy right boundary remains approximately `x=410`; essential text must not enter the transition band to solve overflow.

This amendment locks vertical editorial placement only. Callout-box geometry remains OPEN for its dedicated next decision.

**Version:** 1.7 → 1.8 CANONICAL.

---

## 29. Owner Series Badge Geometry Lock — v1.9 — 2026-09-27

**Owner decision:** APPROVED.

Canonical Series Badge container on 1080 × 1350:

* `x=48, y=252, w=220, h=34`;
* corner radius `17 px`;
* Burgundy fill `#96251E`;
* white text `#FFFFFF`;
* horizontal padding `14 px`;
* vertical padding `4 px`;
* centered horizontally and vertically;
* typography remains Inter 700 / 22 px / 26 px / `+0.06em`, uppercase, one line.

The badge must not auto-resize or trigger typography shrink. Overflow is resolved by naming/copy, not by changing the badge contract.

**Version:** 1.8 → 1.9 CANONICAL.

---

## 30. Owner Callout Geometry Lock — v1.10 — 2026-09-27

**Owner decision:** APPROVED.

Canonical Callout Box on 1080 × 1350:

* `x=48, y=878, w=342, h=156`;
* bottom edge `y=1034`;
* corner radius `18 px`;
* Beige fill `#F9EBD1`;
* no stroke;
* padding `20 px` horizontal / `16 px` vertical;
* text alignment left/top;
* typography Inter 600 / 24 px / 32 px / tracking 0 / max 4 lines.

The box must not auto-resize or trigger typography shrink. Overflow is resolved through copy editing or redistribution. Empty callout containers are not rendered on slides without a callout.

This closes **callout box dimensions/geometry** from §13 OPEN Numerical Specifications.

**Version:** 1.9 → 1.10 CANONICAL.

---

## 31. Owner Gradient Profile Lock — v1.11 — 2026-09-27

**Owner decision:** APPROVED.

Canonical editorial-to-scene gradient on 1080 × 1350:

* `x=390` → White `#FFFFFF` at `100%` opacity;
* `x=420` → White `#FFFFFF` at `80%` opacity;
* `x=450` → White `#FFFFFF` at `35%` opacity;
* `x=475` → White `#FFFFFF` at `0%` opacity;
* direction: horizontal left → right;
* interpolation: linear between adjacent stops;
* vertical coverage: full canvas height, `1350 px`;
* narrative illustration may continue underneath the overlay;
* no hard divider or slide-specific alternate fade profile.

This closes **exact white-gradient start/end stops and opacity curve** from §13 OPEN Numerical Specifications.

**Version:** 1.10 → 1.11 CANONICAL.

---

## 32. Owner Narrative Visual Bounds Lock — v1.12 — 2026-09-27

**Owner decision:** APPROVED.

Canonical narrative visual contract on 1080 × 1350:

* artwork frame: `x=430, y=0, w=650, h=1350`, right edge `x=1080`;
* bleed: full to top, right, and bottom edges;
* artwork may continue beneath gradient `x=430–475`;
* critical focal zone: `x=560–1010, y=160–1150`;
* minimum right safe distance for critical focal points: `70 px`;
* face/critical focal point minimum `x=560`;
* face/critical focal points must not enter the gradient band;
* presenter crop may vary, but head/face must not be cut off;
* if scene conflicts with editorial copy, recompose the scene rather than moving governed editorial geometry.

This converts the prior approximate narrative-start guidance into deterministic production geometry.

**Version:** 1.11 → 1.12 CANONICAL.

---

## 33. Owner Horizontal Editorial Bounds & Gutter Lock — v1.13 — 2026-09-27

**Owner decision:** APPROVED.

Canonical horizontal editorial contract on 1080 × 1350:

* editorial left edge: `x=48`;
* editorial right edge: `x=390`;
* usable editorial width: `342 px`;
* gradient starts exactly at `x=390` and ends at `x=475`;
* narrative artwork starts at `x=430`;
* Topic Label, Headline, Body, and Callout text must remain within `x=48–390`;
* no additional text gutter exists between editorial field and gradient;
* text frames must not widen to solve overflow;
* Callout Box width `342 px` intentionally matches the editorial usable width;
* Series Badge remains independently locked at `220 px` width.

This replaces the prior approximate `x≈410` essential-copy boundary with an exact `x=390` right edge and closes horizontal margin/gutter ambiguity in §13.

**Version:** 1.12 → 1.13 CANONICAL.

---

## 34. Owner Lower Ornament Geometry Lock — v1.14 — 2026-09-27

**Owner decision:** APPROVED.

Canonical lower ornament system on 1080 × 1350:

* `KDS-OBJ-000004` Gold Wave — `x=48, y=1120, w=250, h=80` — default lower ornament;
* `KDS-OBJ-000005` Dot Matrix — `x=316, y=1118, w=74, h=74` — optional secondary accent;
* ornaments are decorative only and may not carry essential information;
* no overlap with Callout Box or transition band;
* fixed placement/scale; no free movement or resizing;
* Dot Matrix may be omitted when composition is already visually dense;
* Gold Wave may be omitted only for a documented readability/narrative/layout reason;
* `KDS-OBJ-000006`–`000009` are not default substitutes and require a separate explicit layout decision.

This closes **lower ornament geometry** from §13 OPEN Numerical Specifications.

**Version:** 1.13 → 1.14 CANONICAL.

---

## 35. Owner Layout Protection Zones Lock — v1.15 — 2026-09-27

**Owner decision:** APPROVED.

Canonical zones on 1080 × 1350:

* editorial essential content: `x=48–390, y=252–1034`;
* narrative focal content: `x=560–1010, y=160–1150`;
* lower decorative band: `y=1118–1200`;
* bottom non-critical zone: `y=1200–1350`;
* Slide 1 indicator reserve: `x=960–1053, y=1270–1322`;
* Slides 2–N indicator reserve: `x=41–123, y=1274–1319`.

Essential copy must remain inside the editorial zone; critical face/focal content must remain inside the narrative focal zone; the bottom non-critical zone carries no essential information except the governed page indicator; header geometry remains separately governed; background, bleed, and non-critical decoration may extend beyond these zones where otherwise permitted.

This closes the final current numerical layout category. §13 now records **no current OPEN layout numerical specifications**.

**Version:** 1.14 → 1.15 CANONICAL.

---

## 36. Production QA Correction — Series Badge Width — v1.16 — 2026-09-27

**Owner decision:** APPROVED.

Production QA against v1.15 identified a blocking contradiction: the canonical badge frame `w=220 px` could not contain the required `SERI PSIKOLOGI N` pattern using the locked typography Inter 700 / 22 px / +0.06em with `14 px` horizontal padding and without shrinking typography.

Corrected canonical Series Badge frame:

* `x=48, y=252, w=252, h=34`;
* radius `17 px`;
* Burgundy `#96251E`;
* white text `#FFFFFF`;
* horizontal padding `14 px`;
* vertical padding `4 px`;
* typography unchanged: Inter 700 / 22 px / 26 px / `+0.06em`, uppercase, one line.

All other layout geometry remains unchanged. The correction is based on production QA rather than aesthetic preference.

**Version:** 1.15 → 1.16 CANONICAL.