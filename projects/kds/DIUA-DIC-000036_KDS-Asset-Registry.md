---
document_name: "KDS Satu Hati Sulawesi Utara — Asset Registry"
document_class: "Domain/Project-Level Identity Registry Document"
structural_classification: "Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara"
system: "Content OS → KDS Satu Hati Sulawesi Utara"
owner: "[OPERATIONAL DEFAULT] Document creator under KDS Project Architecture §0 until formally reassigned"
related_issue: "BUS-102"
universal_identifier: "DIUA-DIC-000036"
version: "1.10"
status: "CANONICAL"
depends_on:
  - id: "DIUA-DIC-000032"
    name: "KDS Satu Hati Sulawesi Utara — Project Architecture"
    version: "1.10"
    status: "CANONICAL"
  - id: "DIUA-DIC-000003"
    name: "Content OS — Root Documentation Structure"
    version: "2.5"
    status: "CANONICAL"
  - id: null
    name: "Content OS — Universal Identifier Registry"
    status: "CANONICAL"
source_representation:
  platform: "Linear"
  locator: "https://linear.app/bussiness-content-os/document/kds-satu-hati-sulawesi-utara-asset-registry-v110-canonical-ffe19c5aa4c0"
representation_profile: "DIUA-DIC-000026@1.3"
---
# KDS Satu Hati Sulawesi Utara — Asset Registry

## Document Identity

| Field | Value |
| -- | -- |
| Document Name | KDS Satu Hati Sulawesi Utara — Asset Registry |
| Document Class | Domain/Project-Level Identity Registry Document |
| System | Content OS → KDS Satu Hati Sulawesi Utara |
| Version | 1.10 |
| Status | **CANONICAL** — v1.10 amended 2026-09-26: synchronized Project Architecture v1.10 after Psychology Series became a recursive Tier-2 sub-project. Asset identity, binary, checksum, variant, and object lifecycle state are unchanged. Previously v1.9. |
| Related Issue | [BUS-102](https://linear.app/bussiness-content-os/issue/BUS-102/kds-satu-hati-sulawesi-utara-asset-registry) — KDS Satu Hati Sulawesi Utara — Asset Registry |
| Owner | **\[OPERATIONAL DEFAULT\]** Document creator under KDS Project Architecture §0 until formally reassigned |
| Structural Classification | Tiered — Document Tier: Domain/Project (Tier 2) — KDS Satu Hati Sulawesi Utara |
| Universal Identifier (UNIS/DIC) | `DIUA-DIC-000036` — ALLOCATED — ACTIVE |
| Depends On | KDS Satu Hati Sulawesi Utara — Project Architecture (v1.10, CANONICAL); Content OS — Root Documentation Structure (v2.5, CANONICAL); Universal Identifier Registry — current CANONICAL |
| Allocation Evidence | CONTENT-OS-ALLOC-036 in Universal Identifier Registration Record v1.28 |
| Structural Reference | [BUS-28](../sdoh/DIUA-DIC-000011_SDOH-Asset-Registry.md) — Satu Dosis Obat Hati — Asset Registry; reusable-object identity/provenance structure only |

## 0. Governance and Authority

This registry inherits the KDS Tier 2 governance model defined in KDS Project Architecture §0.

This registry owns:

* reusable KDS asset identity;
* stable KDS object IDs;
* asset lifecycle state;
* canonical source identity;
* binary/source provenance;
* checksum and technical identity where applicable;
* variant/derivative relationships;
* reusable semantic role;
* supersession and retirement traceability.

This registry does **not** own:

* layout placement;
* crop, scale, rotation, spacing, or safe areas;
* format-specific geometry;
* typography metrics;
* motion, pacing, sequencing, or rendering implementation;
* channel-specific use;
* mandatory appearance frequency;
* content strategy or editorial meaning beyond an asset's reusable identity/role.

Those implementation decisions remain with the applicable production or format authority.

## 1. Purpose

The purpose of the KDS Asset Registry is to ensure that when production says "use the KDS logo", "use the KDS character", or another reusable asset, the identity of that asset can be resolved deterministically rather than inferred from memory, prior posts, screenshots, or visually similar files.

The registry distinguishes:

* **reusable canonical KDS assets**, which require stable identity and provenance;
* **content-local assets**, which are used for one content instance and do not automatically become reusable KDS assets.

Use in a published post does not by itself promote an asset into this registry.

## 2. KDS Object Identifier Namespace

Reusable KDS objects use:

`KDS-OBJ-######`

Examples:

* `KDS-OBJ-000001`
* `KDS-OBJ-000002`

Rules:

1. sequence is monotonic;
2. an object ID identifies one reusable semantic asset identity;
3. object IDs are never reassigned or reused;
4. replacement of the canonical source does not create a new object ID when the reusable identity is intentionally unchanged;
5. a materially different reusable identity receives a new object ID;
6. derivatives or variants may remain under the same object only when they clearly preserve the parent identity and the relationship is explicitly registered;
7. `KDS-OBJ-######` is separate from document identifier `DIUA-DIC-######`.

**Next available object ID:** `KDS-OBJ-000011`.

## 3. Asset Lifecycle

The registry uses four asset states.

### CANDIDATE

A reusable asset has been identified, but one or more canonicalization requirements are incomplete.

A CANDIDATE may be evaluated in production but must not be represented as the resolved canonical reusable binary.

### ACTIVE

The reusable asset is authorized for production within its recorded scope.

ACTIVE requires:

* stable object identity;
* canonical name/type;
* approved semantic role;
* canonical source identity;
* persistent source/binary locator where a binary exists;
* byte-level checksum or equivalent deterministic source verification where applicable;
* provenance sufficient to resolve the exact active source;
* no unresolved blocker relevant to the declared reusable scope.

### SUPERSEDED

The object identity remains historically valid, but a prior source/version/variant is no longer the active production source.

Superseded provenance must remain traceable.

### RETIRED

The reusable object is no longer authorized for new production.

Historical content may continue to reference it as historical evidence.

Asset lifecycle states do not replace document DRAFT/CANONICAL lifecycle.

## 4. Canonical Binary Storage — Google Drive Only

All KDS reusable production binaries are stored in **Google Drive only**.

### Canonical binary root

**Drive path:** `ContentOS / KDS Satu Hati Sulawesi Utara / Assets / Canonical`

**KDS project folder ID:** `1dMAkzR3XtgP7gomMT2gvKxlkyFRlfOwv`

**Assets folder ID:** `18oAbrO7xmiS0LYokxaY2qzPBgCNrCb3q`

**Canonical binary root folder ID:** `1Wia2juR5lv7Ps_DWepDM38xKbVpGuzro`

Each reusable object uses its own object folder:

`Canonical / KDS-OBJ-###### /`

### Storage authority split

* **Linear / this Asset Registry** owns reusable asset identity, lifecycle, semantic role, canonical checksum, and authoritative Drive locator metadata.
* **Google Drive** is the sole active persistent binary store for KDS reusable production assets.
* Chat-runtime files, File Library copies, Linear attachments, screenshots, social-media downloads, and generated reconstructions are not production binary authorities.

A binary is production-resolvable only when its active record identifies the exact Google Drive file/folder and verification evidence required by this registry.

### Minimum binary identity

For a binary-backed reusable asset, the record must include:

* canonical filename;
* media/file type;
* dimensions or other relevant technical properties;
* byte size;
* SHA-256 checksum where raw bytes are available;
* Google Drive file ID;
* Google Drive object-folder ID;
* provenance describing how the source entered the registry;
* verification date.

### Migration rule

If a KDS reusable binary is discovered outside the canonical Google Drive root, it must be copied/uploaded into the applicable `KDS-OBJ-######` folder and verified before it is treated as active production binary authority.

External or historical copies may remain as provenance but are not production fallbacks.

## 5. Binary Resolution and Fail-Closed Rule

Production requiring an ACTIVE reusable binary must resolve:

**Object ID → active source record → persistent locator → exact source identity → verification**

If a required binary:

* has no persistent locator;
* cannot be retrieved;
* does not match the recorded checksum;
* has ambiguous provenance;
* is only available as an approximation, redraw, regeneration, screenshot, or compressed social-media copy;

then the reusable asset is unresolved for production and QA must fail the applicable reusable-asset gate.

No visually similar substitute becomes canonical through convenience.

## 6. Source Replacement and Re-Canonicalization

An existing object may receive a new active source without changing its object ID only when:

* the semantic reusable identity intentionally remains the same;
* the replacement is explicitly reviewed and approved;
* prior source provenance is retained as SUPERSEDED;
* the new checksum and locator are recorded;
* downstream restrictions are revalidated where the changed binary could matter.

Create a new object ID when the replacement represents a materially different reusable identity rather than a source correction/re-canonicalization.

## 7. Variants and Derivatives

A derivative/variant may remain under a parent object when it preserves the parent asset identity.

Each registered derivative should record, as applicable:

* derivative/variant locator;
* relationship to parent;
* purpose;
* source derivation;
* checksum;
* persistent locator;
* restrictions.

A derivative must not silently redefine the parent identity.

Format-specific crop, scale, placement, animation, or one-off export does not automatically become a registered reusable derivative.

## 7A. Source Reference Evidence — Minority Stress Carousel

Five flattened carousel images supplied on 2026-09-23 are stored in Google Drive as **source-reference evidence**, not as canonical reusable production binaries.

**Source-reference folder:** `Assets / Source References / Minority Stress Carousel — 2026-09-23`

**Folder ID:** `1NuW1O6hk_VVhxZsRVrfT3VdFdriA1Y0p`

| Reference | Drive file ID | Dimensions | Size | Source SHA-256 |
| -- | -- | -- | -- | -- |
| Slide 2/9 | `1AH0PyS950HV7aIfTkirH7XYrHu6nMeia` | 1122×1402 | 2,422,761 bytes | `1c510a536f05b897cef6f2a4ef3c593d2dd24bbd02c31ce50d7cc32794e49558` |
| Slide 3/9 | `1C8w86M2Hx5e-myGbBFSA8-dIRQB2l2Ey` | 1122×1402 | 2,589,163 bytes | `e513fa611347ba5f0b514ddade7cc1dcc657f7031fff9993007637fa5a145ae2` |
| Slide 4/9 | `1mUzO7Od92KMB_X0Ygl4TLb7JgzbLOszn` | 1123×1401 | 2,608,437 bytes | `b046418640a1d8cfc70f27bc8720997f07bc60841c7cb00fadfa2977f43777fa` |
| Slide 5/9 | `17iCgUQefpZ8HyL2EAmvzyJlT9f7u47k5` | 1122×1402 | 2,648,192 bytes | `81c127bce0cad7d4bd8aef718a39ae93faf7dbc572bccca9dd0166fec9615737` |
| Slide 7/9 | `1ELG5Udclvr1tSfzsRYs2rnJft8K5vD7O` | 1122×1402 | 2,773,173 bytes | `8cdc09d7c6c783877955d24879829e350be4804a0a4621e3c9c150652595bae3` |

Drive metadata size matched the supplied files for all five references.

These references may establish that an element recurs, but a flattened composite is not itself sufficient to establish an isolated reusable production binary.

## 8. Registered Objects

### KDS-OBJ-000001 — Official KDS Logo

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000001` |
| Canonical Name | KDS Satu Hati Sulawesi Utara — Official Logo |
| Asset Type | Logo / reusable identity asset |
| Asset State | **ACTIVE — OWNER-SUPPLIED OFFICIAL SOURCE / BINARY VERIFIED** |
| Reusable Role | Official KDS identity/logo source |
| Source provenance | Owner-supplied PNG available in the current production conversation/runtime |
| Source filename | `KDS Official Logo.PNG` |
| Canonical filename | `KDS-OBJ-000001_Official-Logo_v1.0.png` |
| Media type | PNG |
| Dimensions | 1024 × 1024 px |
| Pixel mode | RGBA |
| Alpha channel | Present |
| Byte size | 1,716,727 bytes |
| SHA-256 | `261f24c65d44a01cfe669706ecfdbf7b5a240bc30f5a6ddec954e1cef593f554` |
| Persistent locator | Google Drive file ID `17VJX_oJ7C-sXDjkPN0HzQwVCoeWpkKz5` in object folder ID `1zdrUswBMCSTeedNvm9N1OrKXExRqv8nP` |
| Verification date | 2026-09-23 |
| Current production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |
| Format deployment | Owned by applicable production/format authority; not defined here |

#### Identity boundary

The object represents the reusable official KDS logo identity supplied by the Owner.

Because the Owner directly supplied this binary as the official source (rather than approving a reconstruction), no separate visual-approval step applies to this object — approval is evidenced by direct Owner provision, distinct from the reconstruction-approval basis used for KDS-OBJ-000002 through KDS-OBJ-000005.

The registry does not authorize redraw, regeneration, recreation, or visually similar substitution as the same canonical binary.

If a future transparent/monochrome/surface-specific version is needed, it must be evaluated as either:

* a registered derivative/variant under `KDS-OBJ-000001`, if identity is preserved; or
* a separate object, if it constitutes a materially different reusable identity.

#### Persistence verification

The Owner-supplied source was uploaded to Google Drive as:

* canonical filename: `KDS-OBJ-000001_Official-Logo_v1.0.png`
* Drive file ID: `17VJX_oJ7C-sXDjkPN0HzQwVCoeWpkKz5`
* object folder ID: `1zdrUswBMCSTeedNvm9N1OrKXExRqv8nP`
* byte size after Drive upload: 1,716,727 bytes
* SHA-256 after raw download from Drive: `261f24c65d44a01cfe669706ecfdbf7b5a240bc30f5a6ddec954e1cef593f554`

The raw-downloaded Google Drive binary is byte-identical to the supplied source checksum.

The storage/provenance blocker is therefore closed.

The object is **ACTIVE** following explicit Owner object-level promotion on 2026-09-25.

### KDS-OBJ-000002 — KDS Wordmark

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000002` |
| Canonical Name | KDS Satu Hati Sulawesi Utara — Wordmark |
| Asset Type | Wordmark / reusable typographic identity asset |
| Asset State | **ACTIVE — OWNER APPROVED / RECONCILED MASTER v1.1 VERIFIED** |
| Reusable Role | Official three-line KDS organization wordmark used together with the official KDS logo in the primary brand signature |
| Fixed text content | Line 1: `KDS`; Line 2: `Satu Hati`; Line 3: `Sulawesi Utara` |
| Logo relationship | Used with `KDS-OBJ-000001`; the logo is not part of this object's binary |
| Divider relationship | Vertical divider belongs to primary-signature composition, not to the wordmark object itself |
| Evidence | Repeats consistently across source-reference slides 2/9, 3/9, 4/9, 5/9, and 7/9 |
| Canonical source | Inter outlined geometry preserved from approved reconstruction; v1.1 recolored to locked KDS Project Palette v1.0 and persisted as new SVG/PNG source set |
| Google Drive object folder ID | `1pT1KSgnbIPkmnvvMMuOn5_5zNVBe9tvK` |
| Owner approval | **APPROVED — 2026-09-25** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

#### Identity correction

The previously recorded "Brand Lockup" interpretation was incorrect.

The recurring text element is the **KDS Wordmark**. Its normal content use is always paired with the official KDS logo, but the reusable identities remain separate:

* `KDS-OBJ-000001` — Official KDS Logo;
* `KDS-OBJ-000002` — KDS Wordmark.

The combined presentation — **Logo + vertical divider + Wordmark** — is a **primary brand-signature composition rule**, not a separate flattened reusable binary object.

#### Primary Brand Signature usage rule

For KDS content, the Wordmark is **not authorized as a standalone signature**.

The normal KDS identity signature is:

`KDS-OBJ-000001 Official Logo` **+ vertical divider +** `KDS-OBJ-000002 KDS Wordmark`

Rules:

* the official logo and wordmark remain separate reusable object identities;
* the wordmark must appear together with the official logo when used as the organization signature in content;
* the vertical divider is part of the composition, not part of either asset binary;
* the wordmark must not be replaced by retyped approximations, screenshots, or alternate font treatments;
* the logo must not be regenerated or redrawn to match the wordmark;
* a future compact, stacked, monochrome, or other signature variant requires explicit registration/change control rather than silent production convention.

Exact spacing, relative scale, divider geometry, and placement remain composition/layout parameters and may be specified separately without changing the identities of `KDS-OBJ-000001` or `KDS-OBJ-000002`.

#### Prior crop disposition

The earlier exact crop is retained only as source-reference evidence:

* Drive file ID: `1EOInpLEUvRNHYVLhMQE-THj7TYkl1G4w`;
* current filename: `KDS-SRCREF_Primary-Signature_Crop_S02.png`;
* current location: Source References / Minority Stress Carousel — 2026-09-23;
* SHA-256: `eee23daeb1869b83460de83ca89cb0a8346275ad0fbca6ee3b28bda6384ab06e`.

It is no longer treated as a candidate canonical binary for `KDS-OBJ-000002`.

#### Wordmark reconstruction requirement

The canonical wordmark must be **rewritten**, not cropped.

Before activation, the reconstruction must resolve and record:

1. font family;
2. font weight for each line;
3. exact line spacing / baseline relationship;
4. exact horizontal metrics or tracking when needed;
5. exact brand color for each line;
6. transparent master output;
7. editable/vector source where practical;
8. deterministic rendered binary stored in Google Drive;
9. checksum and visual comparison against the source-reference signature.

#### Typography comparison — v0.1

No prior authoritative KDS font specification was found in the current Linear or Google Drive records.

A shape-comparison test was run against the supplied flattened wordmark reference using multiple available sans-serif families. The test compares reconstructed glyph silhouettes against the raster reference; it is evidence, not automatic identity approval.

| Family | Aggregate shape score | Best KDS weight | Best Satu Hati weight | Best Sulawesi Utara weight |
| -- | -- | -- | -- | -- |
| **Inter** | **0.779** | SemiBold | SemiBold | Medium |
| Noto Sans | 0.770 | SemiBold | SemiBold | Medium |
| Open Sans | 0.757 | Bold | SemiBold | Regular |
| Lato | 0.748 | Bold | SemiBold | SemiBold |
| Roboto | 0.735 | Bold | Bold | Regular |
| Montserrat | 0.702 | SemiBold | Medium | Regular |

**Approved wordmark family:** **Inter**.

This supersedes the earlier provisional Montserrat assumption. Inter produced the strongest overall similarity to the supplied wordmark, especially for `KDS` and `Satu Hati`.

Approved weights:

* `KDS` — Inter SemiBold;
* `Satu Hati` — Inter SemiBold;
* `Sulawesi Utara` — Inter Medium.

**Owner visual approval:** APPROVED on 2026-09-23.

#### Color measurement — v0.1

Five source-reference slides were aligned and sampled. Interior text pixels were used to reduce anti-aliased edge contamination.

Cross-slide measured center:

| Wordmark line | Candidate RGB | Candidate HEX |
| -- | -- | -- |
| `KDS` | 98, 15, 19 | **#620F13** |
| `Satu Hati` | 10, 35, 65 | **#0A2341** |
| `Sulawesi Utara` | 8, 74, 40 | **#084A28** |

Observed raster variation around those centers is expected because the source references are flattened publication images.

These values were the **historical v1.0 wordmark colors** for `KDS-OBJ-000002` and are now superseded by the locked project-palette reconciliation:

* `KDS` — `#620F13`;
* `Satu Hati` — `#0A2341`;
* `Sulawesi Utara` — `#084A28`.

They are retained only as historical measurement/provenance. They are not authorized for the reconciled v1.1 master.

#### Comparison evidence

Google Drive source-reference folder:

`Assets / Source References / Minority Stress Carousel — 2026-09-23 / KDS-OBJ-000002 Wordmark Reconstruction`

Folder ID: `1sxCpRArf1fjMnajZyVIyotVqJJmjDqJ2`

Evidence files:

* Font/weight comparison — file ID `1WQ8iMgK7HUIiE52ioKXvl0Knr1WRTjKs`;
* Color comparison — file ID `12Z7PWPQ-ExbBXJiPdlZXCrbZQRulfmul`.

#### Reconstruction candidate v0.1

A transparent PNG candidate was rendered using:

* Inter SemiBold — `KDS`;
* Inter SemiBold — `Satu Hati`;
* Inter Medium — `Sulawesi Utara`;
* candidate colors `#620F13`, `#0A2341`, `#084A28`.

Google Drive:

* candidate folder ID: `15e6472LZ3NSzeV5GfvoT20mAdEEcAjL0`;
* file ID: `1ZhfsTzbbgG7qNdxIWD8tbQKE_PqJ0y0t`;
* filename: `KDS-OBJ-000002_Wordmark_INTER-CANDIDATE_v0.1.png`;
* dimensions: 197 × 114 px;
* PNG RGBA / transparent;
* byte size: 6,656 bytes;
* SHA-256: `c1c15679ff76601200b3188966269e2e60cce1c2db33a7b1e8be251e83785464`;
* Google Drive raw-download verification: **MATCH / byte-identical**.

**Owner approval: APPROVED.**

Historical v1.0 master set was persisted and verified before supersession:

* outlined SVG master — file ID `1RBSxaS8NBP5nolSrl8ujdvHfusJivR7X`;
* transparent PNG production export — file ID `1b7J_U7ugOuQ8Sxw7b3rTwPLbDPDrRZCm`.

Verification:

* SVG size: 6,849 bytes;
* SVG SHA-256: `7a11271a2559cc852367d704db251a21a31f2716880e1876ed42ba553dc12b2b`;
* PNG size: 6,656 bytes;
* PNG SHA-256: `c1c15679ff76601200b3188966269e2e60cce1c2db33a7b1e8be251e83785464`;
* Drive raw-download verification: **MATCH** for both files.

That v1.0 master set is now **SUPERSEDED** because its colors do not conform to KDS Project Palette v1.0. See the v1.1 reconciliation record below.

#### Reconciled Master v1.1 — 2026-09-25

The approved Inter geometry was preserved exactly while the three line colors were deterministically reconciled to the locked KDS Project Palette v1.0:

| Line | v1.1 locked color |
| -- | -- |
| `KDS` | Burgundy `#96251E` |
| `Satu Hati` | Navy `#142549` |
| `Sulawesi Utara` | Sage `#626C51` |

No glyph geometry, line structure, or approved Inter outline geometry was redesigned.

**New v1.1 master**

* filename: `KDS-OBJ-000002_Wordmark_MASTER-OUTLINED_v1.1.svg`
* Drive file ID: `1rxmNgDW9ry5fuikxPyk6Iy-syYSpqmYm`
* size: 6,892 bytes
* SHA-256: `72a5c0997da3f28f90dbf008340259eefc0ef79649a9c33997969deed4f76c1d`
* palette verification: contains `#96251E`, `#142549`, `#626C51`; contains none of the superseded v1.0 colors.

**New v1.1 production PNG**

* filename: `KDS-OBJ-000002_Wordmark_PRODUCTION_v1.1.png`
* Drive file ID: `1uSJpkMosYoRbj3uUvBNVMQrkMAwxPXxn`
* dimensions: 197 × 114 px
* mode: RGBA
* alpha range: 0–255
* size: 2,634 bytes
* SHA-256: `d8d28b554545b6f0c7c4972a3223bac905cac21114185eba98db38675c28915a`

**Superseded v1.0 provenance**

* Superseded folder ID: `1mTb-28oC2w9ECyyORtQTUMdIyfZM2k_V`
* SVG file ID retained: `1RBSxaS8NBP5nolSrl8ujdvHfusJivR7X`
* PNG file ID retained: `1b7J_U7ugOuQ8Sxw7b3rTwPLbDPDrRZCm`
* prior bytes preserved; filenames explicitly marked `SUPERSEDED_v1.0`.

**Lifecycle:** v1.1 is **OWNER APPROVED / MASTER VERIFIED / ACTIVE PROMOTION PENDING**. The v1.1 master identity is locked; no silent recolor, geometry change, or in-place replacement is permitted.

### KDS-OBJ-000003 — Protection Shield Icon

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000003` |
| Canonical Name | KDS — Protection Shield Icon |
| Asset Type | Icon / reusable semantic ornament |
| Asset State | **ACTIVE — OWNER APPROVED / MASTER VERIFIED** |
| Reusable Role | Shield/protection symbol used in recurring informational callout boxes |
| Source evidence | Minority Stress carousel source-reference slide 3/9 plus comparison evidence |
| Original extracted reference | `KDS-OBJ-000003_Protection-Shield_EXTRACTED-CANDIDATE_v0.1.png` |
| Canonical master | `KDS-OBJ-000003_Protection-Shield_MASTER_v1.0.svg` |
| Production export | `KDS-OBJ-000003_Protection-Shield_PRODUCTION_v1.0.png` |
| Google Drive object folder ID | `1RQPWrZiblcOCfkiWgcz9cbb5omyS-4Yd` |
| SVG Drive file ID | `13qeX-rJj_AC5cF7JpNfW38xIcoYmFbXF` |
| PNG Drive file ID | `1AWyuTz7dWxSSVLsiXOPrshyWxjkl2mUr` |
| SVG SHA-256 | `73760840f127e96de3cc8e44ec2d0ec05d092435990bb2d5f4eb88f46306f02d` |
| PNG SHA-256 | `0b33f0f90af79968213850c77856c7fd4f4cde70850b003ff176904adf94c07a` |
| Comparison evidence | Drive file ID `1dmucBoezZEAmZzafJc_UXKQHLzvWrM-i` |
| Owner approval | **APPROVED — 2026-09-24** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

#### Source and reconstruction boundary

The original 73 × 73 crop remains historical source-reference evidence only. It was extracted from a flattened carousel and is not the production master.

The approved clean master is a controlled vector reconstruction that:

* preserves the recurring circular burgundy field and shield silhouette;
* removes flattened publication-background pixels;
* uses transparency outside the circular icon;
* preserves the observed cream/light outer border;
* uses locked KDS Gold `#E2A93C` for the inner gold border where the source visually supports it;
* retains a controlled burgundy/red interior treatment consistent with the approved visual comparison.

The clean master is a reconstruction, not an original-source recovery. That provenance must remain explicit.

#### Approved master set

**SVG master**

* Drive file ID: `13qeX-rJj_AC5cF7JpNfW38xIcoYmFbXF`
* filename: `KDS-OBJ-000003_Protection-Shield_MASTER_v1.0.svg`
* size: 1,155 bytes
* SHA-256: `73760840f127e96de3cc8e44ec2d0ec05d092435990bb2d5f4eb88f46306f02d`

**PNG production export**

* Drive file ID: `1AWyuTz7dWxSSVLsiXOPrshyWxjkl2mUr`
* filename: `KDS-OBJ-000003_Protection-Shield_PRODUCTION_v1.0.png`
* dimensions: 1024 × 1024 px
* size: 45,824 bytes
* SHA-256: `0b33f0f90af79968213850c77856c7fd4f4cde70850b003ff176904adf94c07a`

**Comparison evidence**

* Drive file ID: `1dmucBoezZEAmZzafJc_UXKQHLzvWrM-i`
* purpose: source-reference versus reconstructed clean master.

#### Approval decision

Owner visual approval is **APPROVED**.

The approved master must not be silently redrawn, recolored, simplified, or replaced. Future substantive geometry/color changes require explicit change control and versioned replacement with preserved provenance.

`KDS-OBJ-000003` is **ACTIVE** following explicit Owner object-level promotion on 2026-09-25.

### KDS-OBJ-000004 — Gold Wave Ornament

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000004` |
| Canonical Name | KDS — Gold Wave Ornament |
| Asset Type | Ornament / reusable decorative asset |
| Asset State | **ACTIVE — OWNER APPROVED / REPRODUCED PRODUCTION MASTER VERIFIED** |
| Reusable Role | Repeating gold wave-line ornament used near the lower content/footer area |
| Source evidence | Minority Stress carousel source-reference slide 3/9 plus exact-crop and comparison evidence |
| Global crop rule | Exact crops are reference evidence only; final reusable asset must be reproduced |
| Approved production master | `KDS-OBJ-000004_Gold-Wave_PRODUCTION_v1.0.png` |
| Production master dimensions | 2067 × 761 px |
| Production master mode | RGBA / transparent |
| Google Drive object folder ID | `16xQ05LvKrFU5IQ4xu7SVYlscSFr7OS6G` |
| Production master Drive file ID | `1JHvtR9hLYDEqNv--c5Gn2DazeyOXsXJB` |
| Production master byte size | 534,208 bytes |
| Production master SHA-256 | `62d0d24d04ce6d78cbfd6c5cc436b878a3bb80978678dc3aaf820cc4743bfb50` |
| Drive verification | **MATCH / byte-identical** after raw download |
| Owner approval | **APPROVED** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

#### Reproduction decision

The final reusable Gold Wave is **not** the earlier exact crop.

The Owner explicitly required crop-only assets to be reproduced. A new transparent production asset was therefore produced and subsequently approved.

The earlier files remain provenance/reference only:

* exact-crop candidate: Drive file ID `1k9MHwJWiccb8wllnuf7HkfnjJtAGAdbs`;
* source-derived SVG candidate: Drive file ID `1tWr8DNeO_E4e3OK0UOscol2tamTqro0H`;
* source-derived PNG candidate: Drive file ID `1rRFkKL7Dna0l9QLtr9ZDAVD4KwRFAkNK`;
* comparison evidence: Drive file ID `1M1j3zyQw7zSpp_5jNZtHO19ooqcJ4XbF`.

None of those superseded/reference files may substitute for the approved reproduced production master.

#### Approved production master

**PNG**

* filename: `KDS-OBJ-000004_Gold-Wave_PRODUCTION_v1.0.png`;
* Drive file ID: `1JHvtR9hLYDEqNv--c5Gn2DazeyOXsXJB`;
* dimensions: 2067 × 761 px;
* RGBA / transparent;
* size: 534,208 bytes;
* SHA-256: `62d0d24d04ce6d78cbfd6c5cc436b878a3bb80978678dc3aaf820cc4743bfb50`;
* Drive raw-download verification: **MATCH**.

#### Lock rule

The approved production master must not be silently replaced by a crop, traced screenshot, or earlier candidate.

A substantive visual change requires explicit Owner approval, a new versioned production master, preserved prior provenance, and checksum re-verification.

`KDS-OBJ-000004` is **ACTIVE** following explicit Owner object-level promotion on 2026-09-25.

### KDS-OBJ-000005 — Dot Matrix Ornament

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000005` |
| Canonical Name | KDS — Dot Matrix Ornament |
| Asset Type | Ornament / reusable decorative asset |
| Asset State | **ACTIVE — OWNER APPROVED / MASTER VERIFIED** |
| Reusable Role | Repeating light-gold dot-matrix decorative field used in the lower content/footer area |
| Evidence | Recurs across multiple supplied Minority Stress carousel references |
| Reconstruction method | Deterministic vector reproduction from source-reference geometry; not a crop |
| Geometry | 8 columns × 5 rows; uniform circular dots; equal horizontal/vertical grid spacing |
| Color | KDS Gold canonical `#E2A93C` |
| Opacity | 30% |
| Background | Transparent |
| Google Drive object folder ID | `1RBcfK3kvRQmtx8EIKcJTyBVUd-RAzNMF` |
| SVG file ID | `163f5w16u0Dh7HFEf2yLdRMB9HkGPohIy` |
| PNG file ID | `1X_0dl7Y_imBVsLNo6p6eUlK189tVSZC4` |
| Comparison file ID | `1n1IubI2zDTizyiyB1WZF0vUVaBjySMYQ` |
| SVG SHA-256 | `0dbb6888232547cf43c629a64ee7874a45cbc9fbbd3e4d47cee4987d74b21755` |
| PNG SHA-256 | `19b1fda512d326044914013eb553c38877014fab37318514da24b12cfa6f8de2` |
| Comparison SHA-256 | `5dc7d3d6e1e7a1328211caa1cf056d7882bfaa0958f0617ae5e9ecb8a83611dd` |
| Owner approval | **APPROVED — 2026-09-25** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

#### Approved reconstruction

The approved Dot Matrix is a deterministic reconstruction, not a crop.

Locked identity characteristics:

* 8 columns × 5 rows;
* uniform circular dots;
* equal grid spacing;
* KDS Gold `#E2A93C`;
* 30% opacity;
* transparent background.

The original crop/reference remains evidence only and must never be substituted for the approved master.

#### Final master set

**SVG master**

* filename: `KDS-OBJ-000005_Dot-Matrix_MASTER_v1.0.svg`
* Drive file ID: `163f5w16u0Dh7HFEf2yLdRMB9HkGPohIy`
* size: 2,806 bytes
* SHA-256: `0dbb6888232547cf43c629a64ee7874a45cbc9fbbd3e4d47cee4987d74b21755`

**PNG production export**

* filename: `KDS-OBJ-000005_Dot-Matrix_PRODUCTION_v1.0.png`
* Drive file ID: `1X_0dl7Y_imBVsLNo6p6eUlK189tVSZC4`
* dimensions: 512 × 320 px
* size: 3,632 bytes
* SHA-256: `19b1fda512d326044914013eb553c38877014fab37318514da24b12cfa6f8de2`

**Comparison evidence**

* filename: `KDS-OBJ-000005_Dot-Matrix_COMPARISON_v0.2.png`
* Drive file ID: `1n1IubI2zDTizyiyB1WZF0vUVaBjySMYQ`
* SHA-256: `5dc7d3d6e1e7a1328211caa1cf056d7882bfaa0958f0617ae5e9ecb8a83611dd`

#### Approval and lock rule

**Owner decision: APPROVED.**

No silent crop substitution, redraw, recolor, opacity change, grid-count change, or geometry replacement is permitted.

A substantive change requires explicit change control, a new versioned master, preserved prior provenance, and checksum re-verification.

`KDS-OBJ-000005` is **ACTIVE** following explicit Owner object-level promotion on 2026-09-25.

### Source Reference — U=U Decorative Study

Owner supplied a U=U poster on 2026-09-25 and restricted the intake scope to **decorative elements only**.

Google Drive source-reference evidence:

* folder: `Decorative Study — U=U Poster — 2026-09-25`
* folder ID: `1EI8smJFVwugU-f3KL62r4M4FDRS-mAOe`
* source file: `KDS-SRCREF_UequalsU_Decorative-Study.jpeg`
* Drive file ID: `1bqjzEUsh7lIxaDEo1wscHb_nQzsK3JEp`

The flattened poster is evidence only. No crop from it may become a final reusable production master.

### Decorative Candidate Reference Sheet

A consolidated visual reference sheet was generated to support comparison and reproduction planning for the four decorative candidates.

Google Drive:

* filename: `KDS_Decorative-Candidates_REFERENCE_v0.1.png`
* file ID: `1UIz7B5eJcCiGRAoxc_tUEPRo8UAbDnCm`
* stored in: `Decorative Study — U=U Poster — 2026-09-25`

The sheet includes visual candidate representations for:

* `KDS-OBJ-000006` — Heart Brushstroke Ornament;
* `KDS-OBJ-000007` — Sparkle Ornament Set;
* `KDS-OBJ-000008` — Botanical Leaf Ornament Set;
* `KDS-OBJ-000009` — Corner Frame Ornament Set.

**Authority boundary:** this consolidated sheet is reference evidence only. It is not a canonical binary for any of the four object IDs and must not be used as a production master. Each object still requires its own isolated reproduced master, Drive persistence, checksum verification, and Owner approval.

### KDS-OBJ-000006 — Heart Brushstroke Ornament

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000006` |
| Canonical Name | KDS — Heart Brushstroke Ornament |
| Asset Type | Ornament / reusable decorative asset |
| Asset State | **ACTIVE — OWNER APPROVED / MASTER VERIFIED** |
| Reusable Role | Large hand-painted heart-outline ornament for relationship/emotional visual contexts |
| Reconstruction | Produced from scratch; not cropped from source poster |
| Locked color | KDS Burgundy `#96251E` |
| Background | Transparent |
| Google Drive object folder ID | `1MOykPD4L-3MVdxoddmYtRnlPS4rd3mHf` |
| SVG master | `17mx0QYgDRUbVicueff4Y4cxxm-F4OzAR` |
| PNG production | `1XfMkk6Sj3BVUdNrwg-pZ9Pt_ts-KEq6E` |
| SVG SHA-256 | `f4a69202ff4e225ff55ba50f676ca83e962117363246e472129ad85d31ca5c93` |
| PNG SHA-256 | `4b7f6bdb56b898cdf73ee24e8d9c65dce0c00dfc1e603eea291b50a770fec59a` |
| PNG dimensions | 1200 × 1200 px |
| Drive verification | **MATCH / byte-identical** |
| Owner approval | **APPROVED — 2026-09-25** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

The reproduced master preserves an organic open-heart brushstroke identity while remaining independent of the flattened poster.

Owner visual approval is complete. Final v1.0 filenames are locked:

* `KDS-OBJ-000006_Heart-Brushstroke_MASTER_v1.0.svg`;
* `KDS-OBJ-000006_Heart-Brushstroke_PRODUCTION_v1.0.png`.

File IDs and checksums are unchanged from the verified candidate binaries.

### KDS-OBJ-000007 — Sparkle Ornament Set

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000007` |
| Canonical Name | KDS — Sparkle Ornament Set |
| Asset Type | Ornament set / reusable decorative asset |
| Asset State | **ACTIVE — OWNER APPROVED / MASTER VERIFIED** |
| Reusable Role | Small gold sparkle/star accents used as supporting decorative highlights |
| Reconstruction | Produced from scratch; not cropped |
| Locked color | KDS Gold `#E2A93C` |
| Background | Transparent |
| Google Drive object folder ID | `1YE11OurrIRy6nztDJYhgU5ZjQnKgVPOy` |
| SVG master | `12KNWRLfJaR4qXPt4UUMogQI64i9iZkPF` |
| PNG production | `1qFYjeAGfXOYkHt4dODLh38tg1u26Qw5L` |
| SVG SHA-256 | `9dae56c32b06953ca58424107fcb6230635b3244c6f5ee72d1ebb94ec300cfe0` |
| PNG SHA-256 | `cc9bd0ed09ce4bccd789c7b487a09788310350eeeb98c74d419c65286be6afd9` |
| PNG dimensions | 1200 × 1200 px |
| Drive verification | **MATCH / byte-identical** |
| Owner approval | **APPROVED — 2026-09-25** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

The master candidate contains a coherent family of sparkle geometries rather than one isolated star.

Owner visual approval is complete. Final v1.0 filenames are locked:

* `KDS-OBJ-000007_Sparkle-Ornament-Set_MASTER_v1.0.svg`;
* `KDS-OBJ-000007_Sparkle-Ornament-Set_PRODUCTION_v1.0.png`.

File IDs and checksums are unchanged from the verified candidate binaries.

### KDS-OBJ-000008 — Botanical Leaf Ornament Set

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000008` |
| Canonical Name | KDS — Botanical Leaf Ornament Set |
| Asset Type | Ornament set / reusable botanical decorative asset |
| Asset State | **ACTIVE — OWNER APPROVED / MASTER VERIFIED** |
| Reusable Role | Botanical foliage accents used for framing and softening KDS compositions |
| Reconstruction | Produced from scratch; no source-poster crop |
| Locked color | KDS Sage `#626C51` |
| Background | Transparent |
| Google Drive object folder ID | `1aPCIYNwquVrw2Q55U7OFhjCkSy9p6oCY` |
| SVG master | `13TEhj3JBqUglqCzGmgCu4cS6lol5-9K_` |
| PNG production | `1Yze3-4DPlW0Ou98uSZKnDVEUQsv23-mI` |
| SVG SHA-256 | `e601087bf7dc4a3a6afdcdd7b2580a33f3764df9b52a25271861fd9c322bdaf7` |
| PNG SHA-256 | `d82c52149bd73d191754972e9f86ea66ffe7e0f5be344e6aeba366fcdd7c2154` |
| PNG dimensions | 1200 × 1200 px |
| Drive verification | **MATCH / byte-identical** |
| Owner approval | **APPROVED — 2026-09-25** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

The approved master is a reusable two-branch botanical family built independently from the flattened poster.

Owner visual approval is complete. Final v1.0 filenames are locked:

* `KDS-OBJ-000008_Botanical-Leaf-Ornament-Set_MASTER_v1.0.svg`;
* `KDS-OBJ-000008_Botanical-Leaf-Ornament-Set_PRODUCTION_v1.0.png`.

File IDs and checksums are unchanged from the verified candidate binaries.

### KDS-OBJ-000009 — Corner Frame Ornament Set

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000009` |
| Canonical Name | KDS — Corner Frame Ornament Set |
| Asset Type | Frame ornament set / reusable decorative composition asset |
| Asset State | **ACTIVE — OWNER APPROVED / MASTER VERIFIED** |
| Reusable Role | Curved top-right and bottom-left framing ornaments for KDS compositions |
| Reconstruction | Produced from scratch; not cropped |
| Locked colors | Burgundy `#96251E`, Navy `#142549`, Gold `#E2A93C` |
| Background | Transparent |
| Google Drive object folder ID | `1T88d5mm45WN5VA3GKlqHi3pS9ivHvaIo` |
| SVG master | `12oslDJgcp224HEg18OkDXtwol7uSgBaB` |
| PNG production | `1c7Qh3urAKj0N4Gz4S0D3IY8z2-krCL-d` |
| SVG SHA-256 | `63fa046152d7055c2131235a913607b9c85445cb07355158a8c3614178305492` |
| PNG SHA-256 | `d96744a11e4c8ef1d33e4dcf76ef797b6adab3017b4b4258646a30e0a229898a` |
| PNG dimensions | 1600 × 1200 px |
| Drive verification | **MATCH / byte-identical** |
| Owner approval | **APPROVED — 2026-09-25** |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

The set contains reusable top-right and bottom-left members while avoiding poster-specific text or scene content.

Owner visual approval is complete. Final v1.0 filenames are locked:

* `KDS-OBJ-000009_Corner-Frame-Ornament-Set_MASTER_v1.0.svg`;
* `KDS-OBJ-000009_Corner-Frame-Ornament-Set_PRODUCTION_v1.0.png`.

File IDs and checksums are unchanged from the verified candidate binaries.

### KDS-OBJ-000010 — KDS Brand Presenter

| Field | Value |
| -- | -- |
| Object ID | `KDS-OBJ-000010` |
| Canonical Name | KDS — Brand Presenter |
| Asset Type | Presenter identity / reusable character identity asset |
| Asset State | **ACTIVE — OWNER APPROVED / REFERENCE MASTER + 5 VARIANTS VERIFIED / MALE LOCKED** |
| Reusable Role | Recurring KDS presenter identity used across content, poses, expressions, costumes, crops, and scene contexts; **primary KDS Psychology Series character system approved 2026-09-26** |
| Default Rendering | **Flat anime style — LOCKED** |
| Gender Presentation | **Male — LOCKED** |
| Primary identity evidence | Recurring male presenter in Minority Stress carousel references plus Owner-approved reference master v1.0 |
| Google Drive object folder ID | `1pyEo0LfPgHUTdXzKnz9K1N9Y30in26CC` |
| Reference Master folder ID | `1jDPbAdWTWSCRTIHpJlokybVvQ5B0oJ4o` |
| Variants folder ID | `1yIFeIAtK0tUiqdyAm-96WVd6pXBDHi81` |
| Production authority | **ACTIVE — authorized for production within recorded scope as of 2026-09-25** |

#### Identity scope

`KDS-OBJ-000010` identifies the presenter identity, not one specific pose, costume, crop, expression, or scene.

The identity remains the same across:

* pose;
* facial expression;
* gaze direction;
* wardrobe;
* full-body / half-body / bust framing;
* hand position;
* camera angle;
* crop;
* background or scene context.

A new KDS object ID is required only if the presenter identity itself materially changes.

#### Locked default rendering

The KDS Brand Presenter default rendering is **flat anime style**.

The default rendering should preserve:

* clean linework;
* simplified but recognizable facial construction;
* restrained flat/cel-style shading;
* readable expressions;
* stable hair silhouette;
* consistent body proportions;
* clear separation from photorealistic, painterly, or 3D rendering.

A different rendering style requires an explicit variant/derivative decision rather than silent production drift.

#### Reference Master v1.0

Owner-approved reference master:

* filename: `KDS-OBJ-000010_Brand-Presenter_REFERENCE-MASTER_v1.0.png`;
* Drive file ID: `1sBDk1MZEVLjmid3l2xa57PcrUImpPsaw`;
* dimensions: 1448 × 1086 px;
* file type: PNG;
* byte size: 1,763,016 bytes;
* SHA-256: `eb1e2f5015be2845c9e5eb099b58229a7884117d1b72fa845219dc104292eeaf`;
* Google Drive metadata size matches source;
* Owner approval: **APPROVED**.

The reference master locks the identity baseline and default flat-anime rendering. It is a reference sheet, not a transparent scene asset.

#### Registered variants

All variants below are child variants of `KDS-OBJ-000010`; they do not receive new KDS object IDs.

##### VAR-001 — Beige Overshirt

* filename: `KDS-OBJ-000010_VAR-001_Beige-Overshirt_v1.0.png`;
* Drive file ID: `1jaF6ZDAxPlNIB8qY0sEscnsawZ1sPV9W`;
* dimensions: 1024 × 1536 px;
* PNG RGBA with transparent background;
* byte size: 1,352,260 bytes;
* SHA-256: `d753349c1c0feba7056d25f700a37d0fc1e5357731e2ec2f5a9407020586986f`;
* Owner approval: **APPROVED**.

##### VAR-002 — Navy Polo

* filename: `KDS-OBJ-000010_VAR-002_Navy-Polo_v1.0.png`;
* Drive file ID: `1mXGDROymfqW2cymp5QGQCouXIH-0mgrI`;
* dimensions: 1024 × 1536 px;
* PNG RGBA with transparent background;
* byte size: 1,296,456 bytes;
* SHA-256: `f16dd85960df0ffeb98234e8dcdd1a023a74e8a8db21556758a72982c72e00ce`;
* Owner approval: **APPROVED**.

##### VAR-003 — Burgundy Tee / Welcoming Gesture

* filename: `KDS-OBJ-000010_VAR-003_Burgundy-Tee-Welcome_v1.0.png`;
* Drive file ID: `1QuGX5xUqthPF_DGrIrWCE8SoD7wEF4OU`;
* dimensions: 1024 × 1536 px;
* PNG RGBA with transparent background;
* byte size: 1,306,835 bytes;
* SHA-256: `d0c36bc89fa1e0ec1ba3221604e5d6c35b80183c5ffb2f180461c5757cb6e7f3`;
* Owner approval: **APPROVED**.

##### VAR-004 — Navy Hoodie

* filename: `KDS-OBJ-000010_VAR-004_Navy-Hoodie_v1.0.png`;
* Drive file ID: `1d9Rry_ufRACSyOZKvKTnS_95dfxERPp_`;
* dimensions: 1024 × 1536 px;
* PNG RGBA with transparent background;
* byte size: 1,286,026 bytes;
* SHA-256: `ddfe51dae3856ffa78adacbed561567565008cc35ff56fc61d4e44fe2654bfb6`;
* Owner approval: **APPROVED**.

##### VAR-005 — Sage Jacket

* filename: `KDS-OBJ-000010_VAR-005_Sage-Jacket_v1.0.png`;
* Drive file ID: `1d6NHbaWo86Q2WEJvCLDUuhNkf-8eVdOX`;
* dimensions: 1024 × 1536 px;
* PNG RGBA with transparent background;
* byte size: 1,375,508 bytes;
* SHA-256: `b68b66f7c03995b9f01f9c396ea43bf7a4b704498e12d735deb6a3bd3c1b8a51`;
* Drive raw-download verification: **MATCH**;
* wardrobe: sage jacket over white T-shirt, navy trousers, white sneakers;
* rendering: flat anime style;
* Owner approval: **APPROVED — 2026-09-25**.

#### Identity lock — Gender Presentation

**Male — LOCKED.**

The KDS Brand Presenter is a male-presenting identity.

Rules:

* female-presenting generation is **INVALID IDENTITY DRIFT / DISCARD**;
* sex/gender presentation must not silently change between variants;
* wardrobe, pose, expression, framing, and scene may change while preserving the same male presenter identity;
* a materially different presenter identity requires a new object ID and explicit approval.

#### Variant rules

* variants preserve the same presenter face/hair/body identity;
* wardrobe, pose, and gesture may differ;
* variants must retain the locked flat anime rendering unless explicitly versioned otherwise;
* a variant may be used full-body, half-body, or cropped as layout requires;
* transparent-background variants are preferred for reusable production placement;
* new wardrobe/pose combinations should be registered as additional `VAR-###` entries rather than new object IDs;
* materially different presenter identity requires a new object ID.

#### Source-evidence boundary

Earlier clinic, bus, home, café, and promenade scene renders remain historical identity evidence only.

No scene crop supersedes the approved reference master or registered transparent variants.

### Observed but not allocated

The following remain deliberately **unallocated** pending stronger evidence or a separate design-system decision:

* multi-color dot clusters — likely component/token behavior rather than one stable binary;
* support/people icon — observed but not sufficiently recurrent in this evidence set;
* cream callout box, series badge, pagination badge, topic label, split-panel composition — layout/components, not standalone registry objects at this stage.

## 9. Legacy Asset Inputs

Existing pre-Content-OS KDS asset decisions, prior registries, historic posts, previously used characters, colors, or logo copies are **legacy/candidate inputs only** unless explicitly registered here through the current lifecycle.

Legacy use does not establish:

* active object identity;
* active checksum;
* active binary;
* persistent locator;
* variant relationship;
* production requirement.

Migration into this registry is deliberate and evidence-based.

## 10. Relationship to Production SOP

Production SOP Stage 6 routes reusable assets to this registry.

* If an artefact uses only content-local assets, registry resolution is not required solely because an image exists.
* If an artefact requires a reusable canonical KDS asset, the relevant object must be ACTIVE and resolvable.
* Missing reusable identity or unresolved binary produces BLOCKED at the applicable production/QA gate.

This registry does not determine when a format must display an asset.

## 11. Relationship to QA

QA Q6 verifies reusable-asset conformance against this registry.

QA may verify:

* object ID;
* ACTIVE state;
* active canonical source;
* checksum/provenance;
* applicable registered restrictions.

QA must not invent a missing object, choose a substitute binary, or promote a CANDIDATE object.

## 12. Registry Record Schema

Future reusable object records should include at minimum:

| Field | Requirement |
| -- | -- |
| Object ID | Stable `KDS-OBJ-######` |
| Canonical Name | Human-readable reusable identity |
| Asset Type | Logo, character, ornament, texture, etc. |
| Asset State | CANDIDATE / ACTIVE / SUPERSEDED / RETIRED |
| Reusable Role | What identity/function the object represents |
| Canonical Source | Exact active source identity |
| Persistent Locator | Durable provider/location |
| Technical Identity | File type, dimensions, size as applicable |
| Checksum | SHA-256 where raw-byte verification applies |
| Provenance | Origin and approval/registration context |
| Restrictions | Asset-level identity/use constraints only |
| Variants/Derivatives | Registered child relationships if any |
| Supersession | Prior/next source relation where applicable |
| Verification Date | Last canonical source verification |

## 13. Registry Maintenance

Update a record when:

* an object becomes ACTIVE;
* the canonical source changes;
* a variant/derivative is registered;
* a persistent locator changes;
* verification evidence changes;
* an object is superseded or retired;
* an asset-level restriction changes.

Do not modify historical provenance to make the past appear consistent with a newer source.

## 14. Open Decisions

This registry intentionally does not yet decide:

* whether the legacy "Billy" character should be migrated;
* whether legacy KDS colors should become separately registered reusable tokens/assets;
* whether an Asset Bible or Reference Sheet is justified;
* whether format-specific logo variants are required;
* automated checksum resolution;
* reusable template systems.

Those decisions require actual production evidence.

## 15. Current Registry State

As of this document's current version:

* `KDS-OBJ-000001` — Official KDS Logo — **ACTIVE / OWNER-SUPPLIED OFFICIAL SOURCE / BINARY VERIFIED**.
* `KDS-OBJ-000002` — KDS Wordmark — **ACTIVE / OWNER APPROVED / RECONCILED MASTER v1.1 VERIFIED**.
* `KDS-OBJ-000003` — Protection Shield Icon — **ACTIVE / OWNER APPROVED / MASTER VERIFIED**.
* `KDS-OBJ-000004` — Gold Wave Ornament — **ACTIVE / OWNER APPROVED / REPRODUCED PRODUCTION MASTER VERIFIED**.
* `KDS-OBJ-000005` — Dot Matrix Ornament — **ACTIVE / OWNER APPROVED / MASTER VERIFIED**.
* `KDS-OBJ-000006` — Heart Brushstroke Ornament — **ACTIVE / OWNER APPROVED / MASTER VERIFIED**.
* `KDS-OBJ-000007` — Sparkle Ornament Set — **ACTIVE / OWNER APPROVED / MASTER VERIFIED**.
* `KDS-OBJ-000008` — Botanical Leaf Ornament Set — **ACTIVE / OWNER APPROVED / MASTER VERIFIED**.
* `KDS-OBJ-000009` — Corner Frame Ornament Set — **ACTIVE / OWNER APPROVED / MASTER VERIFIED**.
* `KDS-OBJ-000010` — KDS Brand Presenter — **ACTIVE / OWNER APPROVED / REFERENCE MASTER + 5 VARIANTS VERIFIED / MALE LOCKED**.
* Google Drive remains the sole active persistent binary store for KDS reusable production assets.
* next available object ID is `KDS-OBJ-000011`.

Source-reference evidence remains outside the Canonical binary root and cannot substitute for the registered ACTIVE source.

Production requiring a reusable KDS asset must resolve the exact ACTIVE object and its recorded approved source. Content-local assets remain governed by the applicable non-registry rules and do not become reusable KDS authority merely through use.

## 16. Lifecycle Status

**Current document state:** CANONICAL v1.10 (canonicalized as v1.0 on 2026-09-25; see Change Records below for version history).

Canonicalization prerequisites satisfied at v1.0:

* conformance review against KDS Project Architecture (CANONICAL);
* conformance review against Production SOP (CANONICAL);
* conformance review against QA Document (CANONICAL);
* verification that asset identity does not leak into format-specific implementation;
* identifier and dependency integrity check;
* critical review under KDS Project Architecture §0.

### Registry lifecycle vs object lifecycle

The lifecycle of this **registry document** is separate from the lifecycle of each `KDS-OBJ-######`.

Canonicalizing the Asset Registry:

* changes the document lifecycle from DRAFT to CANONICAL;
* establishes the registry text as authoritative;
* does **not** by itself promote any object from CANDIDATE to ACTIVE;
* does **not** convert approval, verification, or master-lock evidence into ACTIVE production authority automatically.

An object becomes ACTIVE only through an explicit object-level lifecycle decision that is recorded in this registry or another authority explicitly designated by this registry.

That ACTIVE promotion must confirm, at minimum:

* the object has satisfied its recorded activation requirements;
* the approved persistent source remains resolvable;
* checksum/source verification remains valid where applicable;
* no unresolved blocker applies to the object's declared reusable scope;
* the promotion is explicitly recorded as an object-state change.

Therefore, after registry canonicalization, objects may remain CANDIDATE until their ACTIVE promotion is separately recorded.

---

**Operating rule:** resolve the exact reusable asset; never infer it from resemblance.

## 17. Binary Storage Decision — 2026-09-23

**Owner decision:** all KDS reusable production binary assets are stored in Google Drive.

### Active storage root

`ContentOS / KDS Satu Hati Sulawesi Utara / Assets / Canonical`

Folder ID: `1Wia2juR5lv7Ps_DWepDM38xKbVpGuzro`

### First persisted object

`KDS-OBJ-000001` — Official KDS Logo

* object folder ID: `1zdrUswBMCSTeedNvm9N1OrKXExRqv8nP`
* file ID: `17VJX_oJ7C-sXDjkPN0HzQwVCoeWpkKz5`
* source and Drive-download SHA-256: `261f24c65d44a01cfe669706ecfdbf7b5a240bc30f5a6ddec954e1cef593f554`
* size: 1,716,727 bytes
* verification: **MATCH / byte-identical**

### Migration status

Drive search on 2026-09-23 found no other existing KDS image binary requiring migration. Any future-discovered reusable KDS binary must be migrated into this canonical root before being treated as active production authority.

## 18. Candidate Asset Intake — Minority Stress Carousel — 2026-09-23

Review of the five supplied flattened carousel images identified four recurring elements with sufficient evidence for candidate object allocation:

* `KDS-OBJ-000002` KDS Wordmark;
* `KDS-OBJ-000003` Protection Shield Icon;
* `KDS-OBJ-000004` Gold Wave Ornament;
* `KDS-OBJ-000005` Dot Matrix Ornament.

No candidate was promoted to ACTIVE.

The source carousel images are retained in Google Drive as evidence only. Isolated reusable binaries must be resolved independently and stored under the Google Drive Canonical root before activation.

This intake deliberately avoids allocating IDs to dynamic components, design tokens, one-off scene imagery, or an insufficiently defined recurring character identity.

## 19. Wordmark Reclassification Decision — 2026-09-23

The Owner clarified that the recurring text beside the logo is the **KDS Wordmark**, not a standalone Brand Lockup binary.

### Decision

`KDS-OBJ-000002` is reclassified as **KDS Wordmark**.

The primary brand signature is a composition:

**KDS-OBJ-000001 Official Logo + vertical divider + KDS-OBJ-000002 Wordmark**

The composition rule may later be governed by a visual/layout authority, but it does not receive a separate reusable object ID at this stage.

### Prior extracted crop

The prior extracted crop remains historically valid as source-reference evidence only. It was moved out of the Canonical object folder and renamed:

`KDS-SRCREF_Primary-Signature_Crop_S02.png`

Drive file ID remains `1EOInpLEUvRNHYVLhMQE-THj7TYkl1G4w`.

### Reconstruction direction

The wordmark must be rebuilt from editable typography using the correct font family, weights, spacing, and KDS identity colors.

No font or exact color value is canonicalized by this decision. Montserrat is the current strongest visual font candidate and must be verified by overlay comparison before locking.

## 20. Wordmark Comparison & Candidate Reconstruction — 2026-09-23

### Font result

Inter ranked first in the current raster-shape comparison with aggregate score **0.779**, ahead of Noto Sans 0.770 and Montserrat 0.702.

Current candidate configuration:

* KDS — Inter SemiBold;
* Satu Hati — Inter SemiBold;
* Sulawesi Utara — Inter Medium.

### Color result

Cross-slide interior-pixel measured centers:

* KDS — `#620F13`;
* Satu Hati — `#0A2341`;
* Sulawesi Utara — `#084A28`.

These remain reconstruction candidates, not canonical color tokens.

### Persisted evidence

Comparison folder: `1sxCpRArf1fjMnajZyVIyotVqJJmjDqJ2`.

Candidate binary:

* Drive file ID: `1ZhfsTzbbgG7qNdxIWD8tbQKE_PqJ0y0t`;
* SHA-256: `c1c15679ff76601200b3188966269e2e60cce1c2db33a7b1e8be251e83785464`;
* raw-download verification: **MATCH**.

### Decision status

No wordmark font, weight, or color is canonicalized by this analysis alone.

`KDS-OBJ-000002` remains CANDIDATE pending Owner visual approval and final master generation.

## 21. KDS Wordmark Approval & Final Master — 2026-09-23

### Owner approval

The Owner approved the Inter reconstruction direction by continuation of the wordmark approval workflow.

Approved identity specification:

* line 1 `KDS` — Inter SemiBold — `#620F13`;
* line 2 `Satu Hati` — Inter SemiBold — `#0A2341`;
* line 3 `Sulawesi Utara` — Inter Medium — `#084A28`.

### Final master set

Google Drive object folder: `1pT1KSgnbIPkmnvvMMuOn5_5zNVBe9tvK`.

**Outlined SVG master**

* file ID: `1RBSxaS8NBP5nolSrl8ujdvHfusJivR7X`;
* filename: `KDS-OBJ-000002_Wordmark_MASTER-OUTLINED_v1.0.svg`;
* size: 6,849 bytes;
* SHA-256: `7a11271a2559cc852367d704db251a21a31f2716880e1876ed42ba553dc12b2b`;
* Drive verification: MATCH.

**Transparent PNG production export**

* file ID: `1b7J_U7ugOuQ8Sxw7b3rTwPLbDPDrRZCm`;
* filename: `KDS-OBJ-000002_Wordmark_PRODUCTION_v1.0.png`;
* dimensions: 197 × 114 px;
* size: 6,656 bytes;
* SHA-256: `c1c15679ff76601200b3188966269e2e60cce1c2db33a7b1e8be251e83785464`;
* Drive verification: MATCH.

### Signature rule

The KDS Wordmark is not used standalone as the organization signature in content.

The primary signature is composed from:

**KDS-OBJ-000001 Official Logo + vertical divider + KDS-OBJ-000002 KDS Wordmark**

No additional object ID is allocated for the composition itself.

### Lifecycle consequence

Wordmark identity/design approval is complete.

`KDS-OBJ-000002` remains CANDIDATE only because the containing Asset Registry remains DRAFT. It may be promoted to ACTIVE during Asset Registry canonicalization if no later audit blocker is found.

**Superseded 2026-09-25:** the color specification above is superseded by the Wordmark/Palette reconciliation decision in §34. The colors `#620F13`, `#0A2341`, `#084A28` are retained here as historical record of the original approval only and must not be used for new production renders.

## 22. Proposed Canonical Color Palette Study — 2026-09-23

### Source evidence

Owner-supplied poster: `KDS-SRCREF_Color-Study_UequalsU.jpeg`

Google Drive:

* source-reference folder ID: `1tnvKd-ImhmhMUcvka9t24Gp0PrM0h0lP`;
* source file ID: `18cvvmxZj3O_nu5gMjHcsVz1WVsvYL8xO`;
* source dimensions: 828 × 1030 px.

The study samples relatively solid interior regions and avoids anti-aliased edges, highlights, and obvious illustration shading where practical.

### Canonical KDS Project Palette v1.0

| Canonical token | RGB | HEX | Evidence region |
| -- | -- | -- | -- |
| Burgundy | 150, 37, 30 | **#96251E** | Large left `U` fill / red structural areas |
| Navy | 20, 37, 73 | **#142549** | Large right `U` fill / navy structural areas |
| Sage | 98, 108, 81 | **#626C51** | Mid-tone illustrated foliage |
| Beige | 249, 235, 209 | **#F9EBD1** | Dominant poster background |
| Gold | 226, 169, 60 | **#E2A93C** | `=` sign and gold decorative accents |

### Interpretation

These five values are the **Owner-approved and LOCKED KDS Project Palette v1.0** for KDS visual identity work.

They are authoritative project-level color tokens from the Owner decision dated 2026-09-23. Any future change requires explicit change control and must not occur through production convention.

The image is a flattened JPEG and therefore contains compression, lighting, texture, and illustration variation. The selected values represent stable interior color centers rather than arbitrary single pixels.

### Authority boundary

Color values are **design tokens**, not reusable binary objects. Therefore they do not receive `KDS-OBJ-######` identifiers.

This Asset Registry records the evidence temporarily because the active KDS visual-identity authority has not yet been separated into its own document.

These values are now approved as project-wide canonical colors. Their long-term authority should migrate to the appropriate KDS visual-identity/design-token authority if such a document is later justified. Until then, this locked Owner decision is recorded here as the active project-level palette authority.

### Relationship to KDS Wordmark

`KDS-OBJ-000002` currently has approved asset-specific wordmark colors:

* KDS — `#620F13`;
* Satu Hati — `#0A2341`;
* Sulawesi Utara — `#084A28`.

The canonical project palette above does **not** silently overwrite those approved wordmark colors.

A separate reconciliation decision is required before changing the wordmark master or asserting that the project palette and wordmark colors are identical.

**Superseded 2026-09-25:** the reconciliation decision has now been made — see §34. The wordmark colors no longer stand independently; they must conform to this canonical palette.

### Current decision state

**LOCKED / OWNER APPROVED — 2026-09-23**

Canonical KDS Project Palette v1.0:

* Burgundy — `#96251E` — RGB 150, 37, 30
* Navy — `#142549` — RGB 20, 37, 73
* Sage — `#626C51` — RGB 98, 108, 81
* Beige — `#F9EBD1` — RGB 249, 235, 209
* Gold — `#E2A93C` — RGB 226, 169, 60

**Change-control rule:** these values must not be altered, approximated, substituted, or re-sampled from later content without an explicit Owner-approved palette revision.

**Wordmark reconciliation remains separate.** The locked project palette does not modify the currently approved asset-specific KDS Wordmark colors unless a later explicit decision does so.

**Superseded 2026-09-25:** see §34 — the wordmark colors are no longer kept separate; they are reconciled to this palette.

## 23. Canonical Palette Lock Decision — 2026-09-23

**Owner decision:** LOCKED.

The following five KDS project-level visual identity tokens are approved and fixed as **KDS Project Palette v1.0**:

| Token | HEX | RGB |
| -- | -- | -- |
| Burgundy | `#96251E` | 150, 37, 30 |
| Navy | `#142549` | 20, 37, 73 |
| Sage | `#626C51` | 98, 108, 81 |
| Beige | `#F9EBD1` | 249, 235, 209 |
| Gold | `#E2A93C` | 226, 169, 60 |

### Governance effect

* the palette is fixed for project-wide KDS visual identity use;
* production may not derive substitute values from screenshots or later raster references;
* asset-specific colors may differ only when explicitly registered and approved;
* the existing KDS Wordmark asset-specific colors remain unchanged by this palette lock;
* future changes require an explicit Owner-approved revision;
* these are design tokens and do not receive `KDS-OBJ-######` identifiers.

The containing Asset Registry remains DRAFT until its own audit/canonicalization; however, the Owner palette decision itself is locked and must be preserved through later document migration or refactoring.

## 24. KDS Project Palette v1.0 — Canonical Visual Reference Binaries — 2026-09-23

The locked KDS Project Palette is represented not only by HEX/RGB token values but also by canonical visual-reference binaries generated directly from those values.

### Storage location

Google Drive path:

`ContentOS / KDS Satu Hati Sulawesi Utara / Assets / Canonical References / KDS Project Palette v1.0`

* Canonical References folder ID: `1l1HMebPiYcCxBvHy1Tv9rLPjY_aWTpuz`
* Palette reference folder ID: `1yBRoXBRlY2VwSLMY2yIhtyGTAlMfqvUY`

### PNG visual reference

* filename: `KDS_Project-Palette_v1.0_REFERENCE.png`
* Drive file ID: `1E-nNlH2aw0PLPnu3-728fh2wb-V9rs9I`
* dimensions: 2000 × 1200 px
* size: 66,869 bytes
* SHA-256: `2e3113a439f4b0d3df1376d4fd0d6ce711f27f985d8f966f040372c7f7bd3b2b`
* Drive raw-download verification: **MATCH**

### SVG visual reference

* filename: `KDS_Project-Palette_v1.0_REFERENCE.svg`
* Drive file ID: `1M7emgzxipGDrkj4HuRm3AH0QN6UyvgN_`
* size: 3,352 bytes
* SHA-256: `be6bec0a61ee22d642e59cce3f0cc1412629498094be52859ad3adcf04492dd9`
* Drive raw-download verification: **MATCH**

### Visual content

Both reference binaries display the five locked canonical tokens:

* Burgundy — `#96251E` — RGB 150, 37, 30
* Navy — `#142549` — RGB 20, 37, 73
* Sage — `#626C51` — RGB 98, 108, 81
* Beige — `#F9EBD1` — RGB 249, 235, 209
* Gold — `#E2A93C` — RGB 226, 169, 60

### Authority and usage

These files are **canonical visual references** for the locked palette.

They are not content-production assets and therefore do not receive `KDS-OBJ-######` identifiers.

Implementation authority remains the recorded HEX/RGB token values. The PNG/SVG exist to support:

* visual checking;
* design handoff;
* human-readable reference;
* QA comparison;
* prevention of accidental color drift.

If a visual reference and the recorded token values ever disagree, the locked HEX/RGB values are authoritative and the reference binary must be regenerated rather than the tokens re-sampled from the binary.

## 25. Canonical Palette Reference Lock — 2026-09-23

**Owner decision:** LOCKED.

The following Google Drive binaries are the fixed canonical visual references for **KDS Project Palette v1.0**:

### PNG reference

* file: `KDS_Project-Palette_v1.0_REFERENCE.png`
* Drive file ID: `1E-nNlH2aw0PLPnu3-728fh2wb-V9rs9I`
* SHA-256: `2e3113a439f4b0d3df1376d4fd0d6ce711f27f985d8f966f040372c7f7bd3b2b`

### SVG reference

* file: `KDS_Project-Palette_v1.0_REFERENCE.svg`
* Drive file ID: `1M7emgzxipGDrkj4HuRm3AH0QN6UyvgN_`
* SHA-256: `be6bec0a61ee22d642e59cce3f0cc1412629498094be52859ad3adcf04492dd9`

### Lock rules

1. These binaries must not be silently overwritten or replaced in place.
2. Their visual content must continue to represent exactly:
   * Burgundy `#96251E`
   * Navy `#142549`
   * Sage `#626C51`
   * Beige `#F9EBD1`
   * Gold `#E2A93C`
3. The locked HEX/RGB token values remain implementation authority.
4. If either binary becomes corrupted or inconsistent with the locked values, it must be regenerated from the locked token values and recorded as a controlled repair.
5. A substantive palette change requires an explicit Owner-approved palette revision and new versioned reference binaries; it must not mutate KDS Project Palette v1.0 silently.
6. Historical v1.0 checksum and Drive identity must remain traceable after any future revision.
7. These files remain canonical visual references, not `KDS-OBJ-######` production assets.

**Lock state:** ACTIVE / OWNER APPROVED.

This lock is effective immediately and must be preserved through later migration to any future KDS visual-identity/design-token authority.

## 26. KDS-OBJ-000003 Protection Shield Candidate Persistence — 2026-09-24

An exact crop candidate for the recurring Protection Shield Icon was persisted to the Google Drive Canonical object folder.

### Source and extraction

* source: Minority Stress carousel source-reference slide 3/9;
* operation: exact crop only;
* dimensions: 73 × 73 px;
* no redraw, regeneration, recoloring, or geometry reconstruction.

### Google Drive

* object folder ID: `1RQPWrZiblcOCfkiWgcz9cbb5omyS-4Yd`;
* file ID: `1HhHYODWk1JT2nN66OLtJr5NixfuIvo-8`;
* filename: `KDS-OBJ-000003_Protection-Shield_EXTRACTED-CANDIDATE_v0.1.png`;
* size: 8,905 bytes;
* SHA-256: `d1e9aaa8a41467fa3c4855d5e4bba6a9e678de7f65a9efeb114ae2ca4d719860`;
* Drive raw-download verification: **MATCH / byte-identical**.

### State decision

`KDS-OBJ-000003` remains **CANDIDATE**.

The exact crop is evidence only; a clean transparent/vector-capable master must be approved before ACTIVE promotion.

## 27. KDS-OBJ-000003 Clean Master Candidate v0.2 — 2026-09-24

The Protection Shield candidate advanced from exact-crop evidence to a clean vector-based reconstruction candidate.

### Persisted candidate masters

**PNG**

* file ID: `1AWyuTz7dWxSSVLsiXOPrshyWxjkl2mUr`
* 1024 × 1024 px
* 45,824 bytes
* SHA-256: `0b33f0f90af79968213850c77856c7fd4f4cde70850b003ff176904adf94c07a`

**SVG**

* file ID: `13qeX-rJj_AC5cF7JpNfW38xIcoYmFbXF`
* 1,155 bytes
* SHA-256: `73760840f127e96de3cc8e44ec2d0ec05d092435990bb2d5f4eb88f46306f02d`

**Comparison evidence**

* file ID: `1dmucBoezZEAmZzafJc_UXKQHLzvWrM-i`
* purpose: source-reference vs clean-master visual comparison.

### State decision

No ACTIVE promotion was performed.

The clean master is a reconstruction and therefore requires explicit Owner visual approval before becoming the canonical binary for `KDS-OBJ-000003`.

## 28. KDS-OBJ-000003 Owner Approval & Master Lock — 2026-09-24

**Owner decision:** APPROVED.

The clean Protection Shield reconstruction previously identified as master candidate v0.2 is accepted as the final v1.0 master set.

Google Drive filenames were finalized without changing the underlying file IDs or bytes:

* SVG: `KDS-OBJ-000003_Protection-Shield_MASTER_v1.0.svg` — file ID `13qeX-rJj_AC5cF7JpNfW38xIcoYmFbXF`;
* PNG: `KDS-OBJ-000003_Protection-Shield_PRODUCTION_v1.0.png` — file ID `1AWyuTz7dWxSSVLsiXOPrshyWxjkl2mUr`.

Checksums remain:

* SVG SHA-256 `73760840f127e96de3cc8e44ec2d0ec05d092435990bb2d5f4eb88f46306f02d`;
* PNG SHA-256 `0b33f0f90af79968213850c77856c7fd4f4cde70850b003ff176904adf94c07a`.

### Lock rule

The approved master identity is fixed. No silent redraw, recolor, geometry simplification, or in-place replacement is permitted.

A future substantive change requires explicit Owner approval, preserved prior provenance, new versioned master naming, and checksum re-verification.

### Lifecycle consequence

Design approval is complete. `KDS-OBJ-000003` is eligible for ACTIVE promotion when the Asset Registry itself passes final audit/canonicalization.

## 29. KDS-OBJ-000004 Gold Wave Candidate Persistence — 2026-09-24

An exact crop candidate for the recurring Gold Wave Ornament was persisted to the Google Drive Canonical object folder.

### Source and extraction

* source: Minority Stress carousel source-reference slide 3/9;
* operation: exact crop only;
* dimensions: 250 × 92 px;
* surrounding badge, dot matrix, and callout box excluded;
* no redraw, regeneration, recoloring, smoothing, or geometry reconstruction.

### Google Drive

* object folder ID: `16xQ05LvKrFU5IQ4xu7SVYlscSFr7OS6G`;
* file ID: `1k9MHwJWiccb8wllnuf7HkfnjJtAGAdbs`;
* filename: `KDS-OBJ-000004_Gold-Wave_EXTRACTED-CANDIDATE_v0.1.png`;
* size: 26,178 bytes;
* SHA-256: `eacd60b24319c86a903e19ba763ddd62499f1942b263aa80faaa08c94c550efa`;
* Drive raw-download verification: **MATCH / byte-identical**.

### State decision

`KDS-OBJ-000004` remains **CANDIDATE**.

The extracted crop is evidence only. A clean transparent/vector-capable master must be reconstructed, compared, and approved before ACTIVE promotion.

## 30. KDS-OBJ-000004 Clean Master Candidate v0.2 — 2026-09-24

The Gold Wave candidate advanced from flattened exact-crop evidence to a clean vector-derived reconstruction.

### Reconstruction method

* source: exact-crop candidate v0.1;
* seven wave trajectories fitted from the observed source geometry;
* paths converted to vector Bézier geometry;
* background removed;
* stroke color standardized to locked KDS Gold `#E2A93C`;
* no additional decorative paths introduced.

### Google Drive persistence

**SVG**

* file ID: `1tWr8DNeO_E4e3OK0UOscol2tamTqro0H`
* SHA-256: `a1b667b84e93341f1f2680c51722215d2e2d70119412842796231c0f8c68ba98`
* verification: MATCH

**PNG**

* file ID: `1rRFkKL7Dna0l9QLtr9ZDAVD4KwRFAkNK`
* SHA-256: `ca2adc77797f79c37ab084d1f809be6c904eaaf96673b7dd7ea2a28298909cbd`
* verification: MATCH

**Comparison**

* file ID: `1M1j3zyQw7zSpp_5jNZtHO19ooqcJ4XbF`
* SHA-256: `173e9a86319e74991659b9dcb9d77228b46e3d8856926e69808ddf0ad557aeea`
* verification: MATCH

### State decision

`KDS-OBJ-000004` remains CANDIDATE pending Owner visual approval.

No production authority was activated by this reconstruction step.

## 31. Crop-to-Master Production Rule — 2026-09-24

**Owner decision:** all reusable assets that exist only as crops from flattened content must be **reproduced** before they can become final/canonical production assets.

### Rule

**Crop = source-reference evidence.**

**Reproduced master = eligible canonical asset.**

A crop may be retained for:

* provenance;
* geometry comparison;
* color comparison;
* visual reference;
* reconstruction evidence.

A crop must **not** become the final reusable master solely because it was isolated from a prior publication.

Before ACTIVE promotion, a crop-derived reusable asset must have a reproduced master that is:

* clean and independent of the flattened publication background;
* transparent where the asset identity requires transparency;
* vector/editable where practical;
* stored in the canonical Google Drive object folder;
* checksum-verified;
* visually reviewed against the source reference;
* Owner-approved.

This rule applies to all current and future KDS reusable assets.

## 32. KDS-OBJ-000005 Dot Matrix Reproduction — 2026-09-24

The Dot Matrix Ornament was reproduced from source-reference structure rather than cropped.

### Geometry

* 8 columns × 5 rows;
* uniform circular dots;
* deterministic equal grid spacing;
* transparent background.

### Appearance

* fill: KDS Gold `#E2A93C`;
* opacity: 30%.

### Google Drive

Object folder:
`1RBcfK3kvRQmtx8EIKcJTyBVUd-RAzNMF`

Persisted files:

* SVG master candidate: `163f5w16u0Dh7HFEf2yLdRMB9HkGPohIy`
* PNG production candidate: `1X_0dl7Y_imBVsLNo6p6eUlK189tVSZC4`
* comparison evidence: `1n1IubI2zDTizyiyB1WZF0vUVaBjySMYQ`

All persisted files were raw-downloaded and checksum-verified **MATCH / byte-identical**.

### State decision

`KDS-OBJ-000005` remains **CANDIDATE / OWNER APPROVAL PENDING**.

No ACTIVE promotion has occurred.

## 33. Change Record — v0.18 — 2026-09-25

**Change type:** Editorial / corrective. No asset-state changes.

**Changes:**

* §2 — removed a stale version-tied reference ("at v0.5") on the next-available-object-ID line.
* §8 KDS-OBJ-000001 — clarified that Owner-supplied provenance is the approval basis for this object, distinct from the reconstruction-approval basis used for KDS-OBJ-000002 through KDS-OBJ-000005.
* Header — Project Architecture and Production SOP dependency versions synchronized to v1.1 following their editorial amendments (2026-09-25).

**Basis:** documentation audit conducted 2026-09-24/25; corrections directed by Owner instruction ("perbaiki terkontrol", 2026-09-25).

**Version:** 0.17 → 0.18.

## 34. Wordmark / Project Palette Color Reconciliation — 2026-09-25

**Owner decision:** the canonical KDS Project Palette v1.0 (§22–25) governs. KDS-OBJ-000002 Wordmark's asset-specific colors are **superseded** by the palette; the wordmark must be brought into conformance with the palette, not the reverse.

**Reconciled mapping:**

| Wordmark line | Previous candidate color | New locked color (KDS Project Palette v1.0) |
| -- | -- | -- |
| `KDS` | `#620F13` | `#96251E` (Burgundy) |
| `Satu Hati` | `#0A2341` | `#142549` (Navy) |
| `Sulawesi Utara` | `#084A28` | `#626C51` (Sage) |

**Note on the Sulawesi Utara mapping:** the palette has no dedicated dark-green token. Sage `#626C51` is the nearest available token by color family, but it is meaningfully lighter/more muted than the previously measured `#084A28`. Flagged for Owner awareness — a closer green match would require a separate palette-extension decision, not a wordmark-local exception.

**Effect on KDS-OBJ-000002:**

* the previously approved master files (outlined SVG file ID `1RBSxaS8NBP5nolSrl8ujdvHfusJivR7X`; transparent PNG file ID `1b7J_U7ugOuQ8Sxw7b3rTwPLbDPDrRZCm`) were rendered with the now-superseded candidate colors and are **no longer conformant** with the locked color specification;
* per §6 (Source Replacement and Re-Canonicalization), a new master render is required using the reconciled colors above, followed by checksum verification and Owner visual approval, before this object can be promoted to ACTIVE;
* the superseded master files are retained as historical/provenance evidence only — they are not deleted and must not be used as the active production source;
* Asset State updated accordingly (see §8, §15).

**Basis:** Owner decision, 2026-09-25 ("H3: gunakan palet warna sesuai yang ditetapkan, bukan palet warna pada wordmark; warna wordmark harus mengikuti warna yang ditetapkan").

**Open follow-up:** regenerate the KDS-OBJ-000002 master (SVG + PNG) with the reconciled colors and re-verify checksums. Not yet executed as part of this change.

**Version:** 0.18 → 0.19.

## 35. Change Record — v0.20 — 2026-09-25

**Change type:** Editorial / corrective. No asset-state changes.

**Changes:**

* §16 — updated the Lifecycle Status self-reference, which had stayed at "DRAFT v0.17" through two prior amendments (v0.18, v0.19).
* Header — Project Architecture, Production SOP, and QA Document dependency versions synced to v1.2, v1.3, and v1.2 respectively.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("bereskan semua", 2026-09-25).

**Version:** 0.19 → 0.20.

## 36. Change Record — v0.21 — 2026-09-25

**Change type:** Editorial / corrective. No asset-state changes.

**Changes:**

* §15 — removed the stale version-tied heading "At v0.17:", which had never been updated even though the bullet content beneath it was refreshed in earlier amendments.
* §16 — de-pinned the conformance-review requirements (Project Architecture, Production SOP, QA Document) from "v1.0" to version-agnostic "(CANONICAL)" form — these had never been updated since the document's original DRAFT baseline, the same recurring-staleness issue fixed elsewhere.
* Header — Project Architecture, Production SOP, and QA Document dependency versions synced.

**Basis:** documentation audit conducted 2026-09-25; correction directed by Owner instruction ("Bereskan semuanya", 2026-09-25).

**Version:** 0.20 → 0.21.

## 37. KDS-OBJ-000005 Owner Approval & Master Lock — 2026-09-25

**Owner decision:** APPROVED.

The reproduced Dot Matrix master is accepted as the final v1.0 master set.

Google Drive filenames were finalized without changing the underlying file IDs or bytes:

* SVG: `KDS-OBJ-000005_Dot-Matrix_MASTER_v1.0.svg` — file ID `163f5w16u0Dh7HFEf2yLdRMB9HkGPohIy`;
* PNG: `KDS-OBJ-000005_Dot-Matrix_PRODUCTION_v1.0.png` — file ID `1X_0dl7Y_imBVsLNo6p6eUlK189tVSZC4`.

Checksums remain:

* SVG SHA-256 `0dbb6888232547cf43c629a64ee7874a45cbc9fbbd3e4d47cee4987d74b21755`;
* PNG SHA-256 `19b1fda512d326044914013eb553c38877014fab37318514da24b12cfa6f8de2`.

### Lifecycle consequence

Design approval is complete.

`KDS-OBJ-000005` is eligible for ACTIVE promotion when the Asset Registry itself passes final audit/canonicalization.

## 38. Change Record — v0.23 — 2026-09-25

**Change type:** lifecycle/state synchronization and current-state maintenance.

### Changes

* `KDS-OBJ-000004` Gold Wave updated from approval-pending source-derived candidate state to **Owner-approved reproduced production master verified**.
* Approved Gold Wave production master persisted in Google Drive as `KDS-OBJ-000004_Gold-Wave_PRODUCTION_v1.0.png`, Drive file ID `1JHvtR9hLYDEqNv--c5Gn2DazeyOXsXJB`, SHA-256 `62d0d24d04ce6d78cbfd6c5cc436b878a3bb80978678dc3aaf820cc4743bfb50`.
* Earlier Gold Wave crop/vector candidates retained as provenance/reference only and explicitly barred from substituting for the approved reproduced master.
* `KDS-OBJ-000005` Dot Matrix approval/master lock retained as current state.
* duplicate change-record numbering for the Dot Matrix approval was corrected from §33 to §37.
* [BUS-102](https://linear.app/bussiness-content-os/issue/BUS-102/kds-satu-hati-sulawesi-utara-asset-registry) current-state tracker summary synchronized to this document.
* Production SOP and QA downstream dependency-state notes synchronized to Asset Registry v0.23 DRAFT.

### No canonicalization effect

This update does not promote the Asset Registry or any KDS object to ACTIVE.

**Version:** 0.22 → 0.23.

## 39. Decorative-Only Intake — U=U Poster — v0.24 — 2026-09-25

**Owner scope decision:** decorative elements only.

Allocated candidates:

* `KDS-OBJ-000006` — Heart Brushstroke Ornament;
* `KDS-OBJ-000007` — Sparkle Ornament Set;
* `KDS-OBJ-000008` — Botanical Leaf Ornament Set;
* `KDS-OBJ-000009` — Corner Frame Ornament Set.

The source poster is persisted in Google Drive as reference evidence only.

All four candidates are governed by the global crop-to-master rule:

**crop/reference evidence ≠ reusable production master**

Each object must be reproduced, persisted, reviewed, approved, and checksum-verified before it can be eligible for ACTIVE promotion.

**Next available object ID:** `KDS-OBJ-000010`.

**Version:** 0.23 → 0.24.

## 40. Decorative Candidate Reference Sheet Sync — v0.25 — 2026-09-25

A consolidated decorative-candidate reference sheet was persisted in Google Drive and registered as shared source/reference evidence.

* file: `KDS_Decorative-Candidates_REFERENCE_v0.1.png`
* Drive file ID: `1UIz7B5eJcCiGRAoxc_tUEPRo8UAbDnCm`
* source-reference folder: `1EI8smJFVwugU-f3KL62r4M4FDRS-mAOe`

The sheet supports `KDS-OBJ-000006` through `KDS-OBJ-000009` as visual evidence only.

No asset-state change occurred. All four objects remain **CANDIDATE / REPRODUCTION REQUIRED**.

**Version:** 0.24 → 0.25.

## 41. KDS Brand Presenter Allocation — v0.26 — 2026-09-25

**Owner decision:** APPROVED to register the recurring KDS presenter as one reusable identity object.

Allocated:

`KDS-OBJ-000010 — KDS Brand Presenter`

### Identity model

The object identifies the presenter identity, not a single scene render.

Pose, expression, wardrobe, framing, and background may vary under the same identity.

### Evidence

The recurring male presenter from the Minority Stress carousel is accepted as candidate identity evidence.

Scene renders remain source/reference evidence only and cannot become the presenter master by crop or extraction.

### Required next step

Produce an isolated Brand Presenter Reference Master with stable multi-view identity, transparent background, Google Drive persistence, checksum verification, and Owner approval.

**Next available object ID:** `KDS-OBJ-000011`.

**Version:** 0.25 → 0.26.

## 42. KDS Brand Presenter Reference Master & Variant Registration — v0.27 — 2026-09-25

**Owner decision:** APPROVED.

### Reference master

`KDS-OBJ-000010_Brand-Presenter_REFERENCE-MASTER_v1.0.png`

* Drive file ID: `1sBDk1MZEVLjmid3l2xa57PcrUImpPsaw`;
* SHA-256: `eb1e2f5015be2845c9e5eb099b58229a7884117d1b72fa845219dc104292eeaf`.

### Default rendering

**Flat anime style — LOCKED.**

### Registered transparent variants

* `VAR-001` Beige Overshirt — Drive ID `1jaF6ZDAxPlNIB8qY0sEscnsawZ1sPV9W`;
* `VAR-002` Navy Polo — Drive ID `1mXGDROymfqW2cymp5QGQCouXIH-0mgrI`;
* `VAR-003` Burgundy Tee / Welcoming Gesture — Drive ID `1QuGX5xUqthPF_DGrIrWCE8SoD7wEF4OU`;
* `VAR-004` Navy Hoodie — Drive ID `1d9Rry_ufRACSyOZKvKTnS_95dfxERPp_`.

All four variants are 1024 × 1536 PNG RGBA assets with transparent backgrounds and are Owner-approved.

The reference master and variants are persisted under the `KDS-OBJ-000010` Google Drive object folder.

No ACTIVE promotion occurs yet because the Asset Registry remains DRAFT.

**Version:** 0.26 → 0.27.

## 43. KDS Brand Presenter VAR-005 Sage Jacket — v0.28 — 2026-09-25

A fifth Brand Presenter wardrobe variant was added before final presenter lock.

### VAR-005

`KDS-OBJ-000010_VAR-005_Sage-Jacket_v1.0.png`

* Drive file ID: `1d6NHbaWo86Q2WEJvCLDUuhNkf-8eVdOX`;
* folder: `1yIFeIAtK0tUiqdyAm-96WVd6pXBDHi81`;
* dimensions: 1024 × 1536 px;
* format: PNG RGBA;
* transparent background;
* byte size: 1,375,508 bytes;
* SHA-256: `b68b66f7c03995b9f01f9c396ea43bf7a4b704498e12d735deb6a3bd3c1b8a51`;
* Drive raw-download verification: **MATCH**;
* wardrobe: sage jacket / white T-shirt / navy trousers / white sneakers;
* default rendering: flat anime style.

### Lifecycle

VAR-005 is **PERSISTED / VERIFIED / OWNER APPROVAL PENDING FINAL LOCK**.

The existing Reference Master and VAR-001–VAR-004 approvals remain unchanged.

No ACTIVE promotion occurs because the Asset Registry remains DRAFT.

**Version:** 0.27 → 0.28.

## 44. Binary Gap Closure — KDS-OBJ-000006 through KDS-OBJ-000009 — v0.29 — 2026-09-25

The four previously empty canonical object folders now contain reproduced binary candidates.

### KDS-OBJ-000006 — Heart Brushstroke Ornament

* SVG `17mx0QYgDRUbVicueff4Y4cxxm-F4OzAR`
* PNG `1XfMkk6Sj3BVUdNrwg-pZ9Pt_ts-KEq6E`
* Drive verification: MATCH

### KDS-OBJ-000007 — Sparkle Ornament Set

* SVG `12KNWRLfJaR4qXPt4UUMogQI64i9iZkPF`
* PNG `1qFYjeAGfXOYkHt4dODLh38tg1u26Qw5L`
* Drive verification: MATCH

### KDS-OBJ-000008 — Botanical Leaf Ornament Set

* SVG `13TEhj3JBqUglqCzGmgCu4cS6lol5-9K_`
* PNG `1Yze3-4DPlW0Ou98uSZKnDVEUQsv23-mI`
* Drive verification: MATCH

### KDS-OBJ-000009 — Corner Frame Ornament Set

* SVG `12oslDJgcp224HEg18OkDXtwol7uSgBaB`
* PNG `1c7Qh3urAKj0N4Gz4S0D3IY8z2-krCL-d`
* Drive verification: MATCH

All were produced independently of flattened poster crops and use transparent backgrounds.

Lifecycle for all four:
**CANDIDATE / REPRODUCED MASTER CANDIDATE PERSISTED / DRIVE VERIFIED / OWNER APPROVAL PENDING**.

No ACTIVE promotion occurred.

**Version:** 0.28 → 0.29.

## 45. Decorative Asset Owner Approval & Master Lock — v0.30 — 2026-09-25

**Owner decision:** APPROVED for all four reproduced decorative assets.

### KDS-OBJ-000006 — Heart Brushstroke Ornament

* SVG: `KDS-OBJ-000006_Heart-Brushstroke_MASTER_v1.0.svg` — Drive ID `17mx0QYgDRUbVicueff4Y4cxxm-F4OzAR`
* PNG: `KDS-OBJ-000006_Heart-Brushstroke_PRODUCTION_v1.0.png` — Drive ID `1XfMkk6Sj3BVUdNrwg-pZ9Pt_ts-KEq6E`
* SHA-256 unchanged from verified candidate binaries.

### KDS-OBJ-000007 — Sparkle Ornament Set

* SVG: `KDS-OBJ-000007_Sparkle-Ornament-Set_MASTER_v1.0.svg` — Drive ID `12KNWRLfJaR4qXPt4UUMogQI64i9iZkPF`
* PNG: `KDS-OBJ-000007_Sparkle-Ornament-Set_PRODUCTION_v1.0.png` — Drive ID `1qFYjeAGfXOYkHt4dODLh38tg1u26Qw5L`
* SHA-256 unchanged from verified candidate binaries.

### KDS-OBJ-000008 — Botanical Leaf Ornament Set

* SVG: `KDS-OBJ-000008_Botanical-Leaf-Ornament-Set_MASTER_v1.0.svg` — Drive ID `13TEhj3JBqUglqCzGmgCu4cS6lol5-9K_`
* PNG: `KDS-OBJ-000008_Botanical-Leaf-Ornament-Set_PRODUCTION_v1.0.png` — Drive ID `1Yze3-4DPlW0Ou98uSZKnDVEUQsv23-mI`
* SHA-256 unchanged from verified candidate binaries.

### KDS-OBJ-000009 — Corner Frame Ornament Set

* SVG: `KDS-OBJ-000009_Corner-Frame-Ornament-Set_MASTER_v1.0.svg` — Drive ID `12oslDJgcp224HEg18OkDXtwol7uSgBaB`
* PNG: `KDS-OBJ-000009_Corner-Frame-Ornament-Set_PRODUCTION_v1.0.png` — Drive ID `1c7Qh3urAKj0N4Gz4S0D3IY8z2-krCL-d`
* SHA-256 unchanged from verified candidate binaries.

### Lifecycle consequence

All four assets are now:

**CANDIDATE / OWNER APPROVED / MASTER VERIFIED / REGISTRY CANONICALIZATION PENDING**

The Google Drive filenames were finalized without replacing the underlying files or changing their file IDs.

No asset is promoted to ACTIVE yet because the containing Asset Registry remains DRAFT.

**Version:** 0.29 → 0.30.

## 46. KDS Wordmark Palette Reconciliation — v0.31 — 2026-09-25

The `KDS-OBJ-000002` Wordmark binary blocker was remediated by controlled source replacement.

### What changed

* approved Inter outlined geometry preserved;
* v1.0 colors replaced with locked project tokens:
  * Burgundy `#96251E`;
  * Navy `#142549`;
  * Sage `#626C51`;
* new v1.1 SVG and PNG persisted in the canonical object folder;
* prior v1.0 SVG and PNG moved to a dedicated `Superseded` folder and retained intact.

### New files

* SVG `1rxmNgDW9ry5fuikxPyk6Iy-syYSpqmYm`
  * SHA-256 `72a5c0997da3f28f90dbf008340259eefc0ef79649a9c33997969deed4f76c1d`
* PNG `1uSJpkMosYoRbj3uUvBNVMQrkMAwxPXxn`
  * SHA-256 `d8d28b554545b6f0c7c4972a3223bac905cac21114185eba98db38675c28915a`

### Current lifecycle

**CANDIDATE / RECONCILED MASTER v1.1 PERSISTED / PALETTE VERIFIED / OWNER VISUAL APPROVAL PENDING / REGISTRY CANONICALIZATION PENDING**

No ACTIVE promotion occurred.

**Version:** 0.30 → 0.31.

## 47. KDS-OBJ-000002 Wordmark v1.1 Owner Approval & Master Lock — v0.32 — 2026-09-25

**Owner decision:** APPROVED.

The palette-reconciled Wordmark v1.1 is accepted as the final approved master set for `KDS-OBJ-000002`.

### Approved master

* SVG: `KDS-OBJ-000002_Wordmark_MASTER-OUTLINED_v1.1.svg`
  * Drive ID: `1rxmNgDW9ry5fuikxPyk6Iy-syYSpqmYm`
  * SHA-256: `72a5c0997da3f28f90dbf008340259eefc0ef79649a9c33997969deed4f76c1d`
* PNG: `KDS-OBJ-000002_Wordmark_PRODUCTION_v1.1.png`
  * Drive ID: `1uSJpkMosYoRbj3uUvBNVMQrkMAwxPXxn`
  * dimensions: 197 × 114 px
  * SHA-256: `d8d28b554545b6f0c7c4972a3223bac905cac21114185eba98db38675c28915a`

### Locked palette mapping

* `KDS` → Burgundy `#96251E`
* `Satu Hati` → Navy `#142549`
* `Sulawesi Utara` → Sage `#626C51`

The approved Inter outline geometry is preserved.

### Superseded provenance

The v1.0 master set remains preserved under Drive folder `1mTb-28oC2w9ECyyORtQTUMdIyfZM2k_V` as SUPERSEDED provenance and must not be used as the active source.

### Lock rule

No silent recolor, font substitution, outline modification, line-content change, or in-place source replacement is permitted.

A substantive change requires explicit Owner approval, a new versioned master, preserved prior provenance, and checksum re-verification.

### Lifecycle consequence

`KDS-OBJ-000002` is now:

**CANDIDATE / OWNER APPROVED / RECONCILED MASTER v1.1 VERIFIED / REGISTRY CANONICALIZATION PENDING**

No ACTIVE promotion occurs until the Asset Registry itself is canonicalized.

**Version:** 0.31 → 0.32.

## 48. KDS Brand Presenter Final Variant & Gender Lock — v0.33 — 2026-09-25

**Owner decision:** APPROVED.

### VAR-005 — Sage Jacket

The fifth presenter variant is approved.

* filename: `KDS-OBJ-000010_VAR-005_Sage-Jacket_v1.0.png`
* Drive file ID: `1d6NHbaWo86Q2WEJvCLDUuhNkf-8eVdOX`
* dimensions: 1024 × 1536 px
* format: PNG RGBA / transparent
* byte size: 1,375,508 bytes
* SHA-256: `b68b66f7c03995b9f01f9c396ea43bf7a4b704498e12d735deb6a3bd3c1b8a51`
* Drive verification: **MATCH**
* Owner approval: **APPROVED**

### Gender-presentation lock

**Male — LOCKED.**

The Brand Presenter identity is explicitly male-presenting.

Female-presenting generations are classified as:

**INVALID IDENTITY DRIFT / DISCARD**

They must not be stored, registered, or used as variants of `KDS-OBJ-000010`.

### Current approved presenter set

* Reference Master v1.0
* VAR-001 — Beige Overshirt
* VAR-002 — Navy Polo
* VAR-003 — Burgundy Tee / Welcoming Gesture
* VAR-004 — Navy Hoodie
* VAR-005 — Sage Jacket

All variants remain children of the same identity object.

### Lifecycle consequence

`KDS-OBJ-000010` is now:

**CANDIDATE / OWNER APPROVED / REFERENCE MASTER + 5 VARIANTS VERIFIED / MALE LOCKED / REGISTRY CANONICALIZATION PENDING**

No ACTIVE promotion occurs until the Asset Registry itself is canonicalized.

**Version:** 0.32 → 0.33.

## 49. Final-Audit Remediation — Current-State Sync & Lifecycle Clarification — v0.34 — 2026-09-25

**Change type:** controlled documentation remediation following final audit.

### §15 current-state synchronization

Corrected stale current-state entries:

* `KDS-OBJ-000002` now reflects **OWNER APPROVED / RECONCILED MASTER v1.1 VERIFIED**;
* `KDS-OBJ-000006` through `KDS-OBJ-000009` now reflect **OWNER APPROVED / MASTER VERIFIED**.

Historical change records that document earlier pending states remain unchanged as historical evidence.

### §16 lifecycle clarification

Clarified the authority boundary between:

* **registry document lifecycle** — DRAFT / CANONICAL; and
* **asset object lifecycle** — CANDIDATE / ACTIVE / SUPERSEDED / RETIRED.

Canonicalization of this registry does **not** automatically activate any object.

ACTIVE promotion requires an explicit object-level lifecycle decision and recorded state change after confirming activation requirements.

### Audit consequence

The blocking documentation drift identified in the final audit is remediated.

No binary, checksum, object ID, Drive locator, palette token, or approved master was changed.

**Version:** 0.33 → 0.34.

## 50. Final Critical Review & Canonicalization — v1.0 — 2026-09-25

### Review disposition

**PASS.**

Final canonicalization review confirmed:

* conformance with KDS Project Architecture v1.5 CANONICAL;
* conformance with KDS Production SOP v1.5 CANONICAL;
* conformance with KDS QA Document v1.3 CANONICAL;
* reusable asset identity/provenance remains owned by this registry;
* no format-specific implementation authority leaked into this registry;
* identifier `DIUA-DIC-000036` and allocation evidence `CONTENT-OS-ALLOC-036` are valid;
* all ten registered object identities are traceable to persistent Google Drive records;
* active binary audit completed with 22/22 fresh-download checksum matches;
* Wordmark superseded provenance is preserved;
* Brand Presenter identity lock and five approved variants are recorded;
* registry lifecycle is explicitly separated from object lifecycle.

### Owner decision

**APPROVED — CANONICALIZED.**

### Canonical state

**KDS Satu Hati Sulawesi Utara — Asset Registry v1.0 CANONICAL**

**Effective date:** 2026-09-25

### Object lifecycle consequence

Canonicalization activates the registry authority only.

It does **not** automatically promote any `KDS-OBJ-######` from CANDIDATE to ACTIVE.

All currently registered objects remain **CANDIDATE / ACTIVE PROMOTION PENDING** until an explicit object-level promotion is reviewed and recorded.

Future changes must preserve provenance, identifier stability, Drive source resolution, checksum integrity where applicable, and the registry/object lifecycle separation.

---

## 51. Post-Canonical Dependency Synchronization — v1.1 — 2026-09-25

**Change type:** Editorial / dependency metadata synchronization. No change to registry authority or object lifecycle.

Following the v1.0 canonicalization transaction, the other KDS canonical documents were amended to remove stale DRAFT references to this Asset Registry.

This document's dependency metadata is therefore synchronized to:

* KDS Project Architecture v1.6 CANONICAL;
* KDS Production SOP v1.6 CANONICAL;
* KDS QA Document v1.4 CANONICAL;
* Universal Identifier Registry v1.35 CANONICAL.

The Asset Registry remains CANONICAL.

All registered `KDS-OBJ-000001`–`KDS-OBJ-000010` remain **CANDIDATE / ACTIVE PROMOTION PENDING**. No object-level lifecycle state changed in this amendment.

**Version:** 1.0 → 1.1.

---

## 52. Pre-Activation Current-Record Remediation — v1.2 — 2026-09-25

**Change type:** Editorial / current-record normalization before object-level ACTIVE promotion review.

Corrected current object wording without changing any binary or approval decision:

* `KDS-OBJ-000001` — “Proposed canonical filename” → “Canonical filename”; reusable role no longer described as a candidate source.
* `KDS-OBJ-000002` — v1.0 source block explicitly labeled historical/superseded rather than “final”.
* `KDS-OBJ-000006`–`000008` — locked palette fields no longer use stale “candidate” wording.
* `KDS-OBJ-000008` — approved master description no longer calls the asset a candidate.
* `KDS-OBJ-000010 VAR-005` — stale “PENDING FINAL LOCK” corrected to **APPROVED — 2026-09-25**.

No object was promoted to ACTIVE by this amendment.

**Version:** 1.1 → 1.2.

---

## 53. Object-Level ACTIVE Promotion — v1.3 — 2026-09-25

**Change type:** explicit Owner lifecycle decision.

### Pre-activation review

The object-level ACTIVE promotion review returned **PASS — 10/10**.

For each registered object, the review confirmed the applicable requirements:

* stable object identity;
* canonical name and type;
* approved reusable semantic role;
* approved canonical source identity;
* persistent Google Drive locator;
* checksum or deterministic source verification where applicable;
* sufficient provenance;
* no unresolved blocker relevant to the declared reusable scope.

### Owner decision

**ACTIVATE ALL.**

Effective 2026-09-25, the following objects are promoted from CANDIDATE to ACTIVE:

* `KDS-OBJ-000001` — Official KDS Logo;
* `KDS-OBJ-000002` — KDS Wordmark;
* `KDS-OBJ-000003` — Protection Shield Icon;
* `KDS-OBJ-000004` — Gold Wave Ornament;
* `KDS-OBJ-000005` — Dot Matrix Ornament;
* `KDS-OBJ-000006` — Heart Brushstroke Ornament;
* `KDS-OBJ-000007` — Sparkle Ornament Set;
* `KDS-OBJ-000008` — Botanical Leaf Ornament Set;
* `KDS-OBJ-000009` — Corner Frame Ornament Set;
* `KDS-OBJ-000010` — KDS Brand Presenter.

### Production authority

Each object is now authorized for production **within its recorded scope and restrictions**.

For `KDS-OBJ-000010`:

* default rendering remains **Flat anime style — LOCKED**;
* Gender Presentation remains **Male — LOCKED**;
* Reference Master + VAR-001 through VAR-005 are the registered approved set;
* female-presenting generations remain **INVALID IDENTITY DRIFT / DISCARD**.

### Binary consequence

No Google Drive binary was replaced or modified by this lifecycle promotion.

Existing Drive file IDs, checksums, canonical filenames, provenance, and superseded records remain unchanged.

### Future change control

Any substantive source replacement, identity change, recolor outside the recorded authority, or lifecycle transition must be explicitly reviewed and recorded.

**Version:** 1.2 → 1.3.

---

## 54. Post-Activation Dependency Synchronization — v1.4 — 2026-09-26

**Change type:** Editorial / dependency metadata synchronization and header correction. No change to asset authority or object lifecycle.

After `KDS-OBJ-000001`–`KDS-OBJ-000010` were promoted to ACTIVE:

* Production SOP was synchronized to v1.7 CANONICAL;
* QA Document was synchronized to v1.5 CANONICAL;
* both now reflect the current ACTIVE object set;
* the Asset Registry header's stale v1.2 status text was corrected.

All ten registered objects remain ACTIVE.

No Google Drive binary, checksum, locator, canonical filename, object ID, approved source, or lifecycle state changed.

**Version:** 1.3 → 1.4.

---

## 55. Lateral Pointer Stability Reconciliation — v1.5 — 2026-09-26

**Change type:** Dependency-model correction. No change to asset identity, lifecycle, binary authority, or object scope.

### Decision

Production SOP and QA Document are removed from this registry's formal version-pinned `Depends On` metadata.

They are consuming/lateral project authorities:

* Production SOP routes work to reusable-asset authority;
* QA verifies reusable-asset conformance;
* neither defines this registry's reusable object identity, lifecycle, provenance, or canonical source.

The Asset Registry's formal upstream dependencies remain:

* KDS Project Architecture;
* Content OS Root Documentation Structure;
* Universal Identifier Registry.

### Rationale

Version-pinning SOP and QA here created a recursive maintenance cycle:

Asset Registry → SOP / QA → Asset Registry.

Removing those pins preserves the authority relationship while eliminating dependency churn.

Historical review records that cite specific SOP/QA versions remain unchanged as provenance.

### Lifecycle consequence

None.

`KDS-OBJ-000001`–`KDS-OBJ-000010` remain **ACTIVE**.

No Google Drive binary, checksum, locator, object ID, canonical filename, approved source, or production restriction changed.

**Version:** 1.4 → 1.5.

---

## 56. Dependency Synchronization — v1.6 — 2026-09-26

**Change type:** Editorial / upstream dependency synchronization.

* Project Architecture: v1.6 → v1.7.
* Universal Identifier Registry: v1.35 → v1.38.

No object identity, lifecycle, binary, checksum, locator, approved source, or production restriction changed.

`KDS-OBJ-000001`–`KDS-OBJ-000010` remain ACTIVE.

---

## 57. Dependency Synchronization — v1.7 — 2026-09-26

**Change type:** Editorial / upstream dependency synchronization.

* Project Architecture: v1.7 → v1.8.
* Universal Identifier Registry: v1.38 → v1.39.

No object identity, lifecycle, binary, checksum, locator, approved source, or production restriction changed. `KDS-OBJ-000001`–`KDS-OBJ-000010` remain ACTIVE. Psychology Series cast identity remains unresolved unless separately registered.

---

## 58. Psychology Series Brand Presenter Use Approval — v1.8 — 2026-09-26

**Owner decision:** APPROVED.

`KDS-OBJ-000010 — KDS Brand Presenter` is explicitly approved as the **primary recurring character system for KDS Psychology Series**.

Applicable locks remain:

* ACTIVE object state;
* Male — LOCKED;
* Flat anime style — LOCKED;
* Reference Master + VAR-001–VAR-005 remain the approved identity/wardrobe set.

Psychology Series may vary pose, expression, framing, scene, and authorized wardrobe while preserving the same presenter identity.

This approval changes **use authorization only**.

No binary, Drive file ID, checksum, canonical filename, object ID, identity geometry, or variant lifecycle changed.

**Version:** 1.7 → 1.8.

---

## Change Record — v1.9 — 2026-09-26

**Change type:** upstream dependency synchronization only.

* Project Architecture: v1.8 → **v1.9 CANONICAL**.
* Psychology Series Layout Bible/Reference Sheet canonicalization does not change any KDS object ID, binary source, checksum, variant, lifecycle state, or Asset Registry authority boundary.
* `KDS-OBJ-000010` remains ACTIVE and approved as the primary Psychology Series character system.

**Version:** 1.8 → 1.9.

---

## Change Record — v1.10 — 2026-09-26

**Change type:** upstream structural-dependency synchronization only.

* Project Architecture: v1.9 → **v1.10 CANONICAL**.
* Psychology Series now consumes this parent KDS Asset Registry from its recursive Tier-2 sub-project boundary.
* `KDS-OBJ-000010` remains ACTIVE as the primary Psychology Series character system.
* No object ID, binary, checksum, variant, lifecycle, or provenance record changed.

**Version:** 1.9 → 1.10.