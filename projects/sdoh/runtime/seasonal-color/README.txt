# November 2026 — Trans Awareness Month (Color-only contract)

**State:** OWNER_VISUAL_APPROVED_PRODUCTION_INACTIVE (2026-11-03; proof-only Owner approval recorded in `2026-11-owner-visual-approval.json`). This is an operational candidate, **not** an amendment to the project's permanent Sage/Burgundy palette. The JSON is deliberately **not consumed** by a production renderer or publication workflow.

## Effective window and scope

Publication-local dates: 2026-11-01 through 2026-11-30, Asia/Makassar (inclusive). Applicability to Carousel, Reels, and TikTok Poster requires separate format-specific renderer proof. Content IDs alone do not encode publication dates: never infer effective period from an ID or silently alter already published media.

| Role | Sage series | Burgundy series |
| --- | --- | --- |
| Main surface | `#C5E4F0` (pastel blue) | `#F5C9DA` (pastel pink) |
| Text fill | `#355E78` | `#793E61` |
| Character fill | `#355E78` | `#793E61` |
| Canonical existing linework | `#355E78` | `#793E61` |

| Logo fill | `#355E78` | `#793E61` |

No additional accent, plate, banner, decorative shape, or new layout is authorized by this contract.

## Hard preservation boundary

- Preserve the existing canonical character asset identity and registered pose route; **no regenerated or redesigned character**. When recoloring a character, preserve its source geometry and alpha values, including edge antialiasing.
- Preserve Caveat Medium identity, weight and every type metric: line breaks, position, tracking, leading, sizes, and stroke *width*.
- Preserve slide geometry, hierarchy, layout classes, safe areas, logo and ornament shapes/locations, original content, copy fingerprints and provenance.
- Preserve existing permanent Sage/Burgundy palette tokens outside this date-limited, explicit opt-in path.
- Do not alter the SHA-256-locked BUS-49 v0.6.0 source package in place or bypass checksum verification to apply color changes. A versioned, separately verified recolor implementation is required if the canonical source cannot accept palette parameters.

## Contrast and QA

Dark-on-pastel foreground contrast is approximately **5.20:1 for Sage** and **5.33:1 for Burgundy** against the nominal surface colors. A controlled proof using the checksum-verified BUS-49 v0.6.0 renderer copy, original Caveat Medium, original P02, and a QA-only alpha-preserving logo recolor passed: 5-slide render in each theme, text/character geometry and export metadata unchanged, original logo alpha identical, and source integrity PASS. All P01–P08 original pose sources were independently checksum-verified; hypothetical tint retains each source alpha exactly. The proof does NOT establish the deployed renderer has been updated, nor final Owner Visual Approval. Do not alter font, stroke width, layout or geometry as a workaround.

Before any activation, verify (1) full transparency/geometry invariance of the actual character derivatives against canonical input, (2) unchanged font and layout metrics, (3) token application is strictly date-scoped and opt-in, (4) output contrast and legibility including mobile-scale proof, (5) original production gates, and (6) explicit Owner Visual Approval. Fail closed on any deviation.

## Runtime boundary

The existing approved-copy manifest does not carry palette tokens, and the renderer source is an immutable Google Drive ZIP pinned in `render-runtime/carousel-v060-authority.json`. This proposal is **configuration plus static tests only**. It neither changes the active BUS-49 renderer nor modifies approval/scheduling/publication behavior. The test runs with:

```bash
node projects/sdoh/runtime/seasonal-color/self-test.mjs
```

Further implementation needs a narrow, separately reviewed renderer integration change, validated with the original source assets—not a regenerated visual prototype.

## Controlled proof evidence — November 3, 2026

- Detached BUS-49 v0.6.0 package SHA-256 `7bc6ffd0acf56b487e2eb88e55127d383e3e9b1709921f9af16a0e04519afb9f` was used as an isolated QA copy; its immutable source was not modified.
- Original font and P02 SHA-256 matched the canonical `carousel-v060-authority.json` pins. All P01–P08 matched registered pose checksums.
- Recolor of original logo alpha did not alter source geometry; test-only derivative checksum is separate from canonical registry.
- Nominal color contrast: Sage 5.20:1; Burgundy 5.33:1; sampled texture areas were also >4.5:1. Actual render remains a proof, NOT a publication-ready asset.
- Asset decision: emit QA candidates only; register and activate no assets until separate Owner Visual Approval and a versioned production integration path.


## November editorial and caption authority (Owner direction, 2026-11-03)

- **Editorial campaign scope:** November SDOH content must specifically and respectfully address transgender awareness, including identity and self-acceptance (Sage), or stigma, dignity, mutual care, remembrance and resilience (Burgundy). Generic emotional copy from prior months must NOT be relabeled as November campaign content.
- **Special dates:** Trans Awareness Week, November 13–19, 2026; Transgender Day of Remembrance, November 20, 2026. The entire month's editorial tone must not equate transgender identity with trauma. Balance support, dignity, solidarity and joy.
- **Binding gate:** `2026-11-content-binding.json` currently has NO approved November content. The manual preview requires a separately Owner/editor-approved November copy, its approved fingerprint, theme, target date and campaign-specific approval evidence before making a render.
- **Exact caption lines for every November campaign publication, Owner-supplied (not an official international slogan):**

  `Transgender Awareness Month November 2026`

  `To Honor and To Hold: Their Lives, Their Legacies`

- **Placement:** preserve approved caption body verbatim. After the existing `satu dosis obat hati` signature, insert these two lines once and then preserve all five existing canonical hashtags in their original order. This is the November footer only; the shared base caption formatter, older copies and their fingerprints remain unchanged.
- **Implementation:** `compose-november-caption.mjs` adds the exact two lines to a REVIEW-ONLY caption artifact after both COPY_APPROVED and campaign binding validation. No auto-approval, publishing, scheduling or permanent production activation.
