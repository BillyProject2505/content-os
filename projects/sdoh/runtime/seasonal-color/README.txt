# November 2026 — Trans Awareness Month (Color-only contract)

**State:** OWNER_VISUAL_APPROVED_PRODUCTION_INACTIVE (2026-11-03; proof-only Owner approval recorded in `2026-11-owner-visual-approval.json`). This is an operational candidate, **not** an amendment to the project's permanent Sage/Burgundy palette. The JSON is deliberately **not consumed** by a production renderer or publication workflow.

## Effective window and scope

Publication-local dates: **2026-11-08 through 2026-11-30**, Asia/Makassar (inclusive), as amended by the Owner on 2026-11-03. **November 1–7 are out of scope** for the thematic campaign, seasonal palette and required campaign caption lines. Applicability to Carousel, Reels, and TikTok Poster requires separate format-specific renderer proof. Content IDs alone do not encode publication dates: never infer effective period from an ID or silently alter already published media.

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
- **Special dates:** Trans Awareness Week, November 13–19, 2026; Transgender Day of Remembrance, November 20, 2026. The campaign editorial tone must not equate transgender identity with trauma. Balance support, dignity, solidarity and joy.
- **Binding gate:** The **QA-only binding proposal** in this Draft branch registers exactly `SDOH-SAGE-CAR-0015` (approved copy fingerprint, Owner approval reference and 2026-11-08 target) for a **manual review render only**. The original `2026-11-content-binding.staged.json` is preserved as historical provenance, not used by the runtime. The binding change is not yet merged to `main`; production palette activation remains disabled, and no schedule/publish action exists in the manual QA workflow.
- **Exact caption lines for every November campaign publication, Owner-supplied (not an official international slogan):**

  `Transgender Awareness Month November 2026`

  `To Honor and To Hold: Their Lives, Their Legacies`

- **Placement:** preserve approved caption body verbatim. After the existing `satu dosis obat hati` signature, insert these two lines once and then preserve all five existing canonical hashtags in their original order. This is the November footer only; the shared base caption formatter, older copies and their fingerprints remain unchanged.
- **Implementation:** `compose-november-caption.mjs` adds the exact two lines to a REVIEW-ONLY caption artifact after both COPY_APPROVED and campaign binding validation. No auto-approval, publishing, scheduling or permanent production activation.

## Owner effective-date amendment — 2026-11-03

The Owner subsequently directed: "Tema ini kita mulai dari tanggal 8 november". This **supersedes only the start date** (formerly 2026-11-01) in the original visual approval and production brief; all approved colors, canonical asset preservation, and 2026-11-30 end date are unchanged. See `2026-11-start-date-amendment.json`.

- **2026-11-01 to 2026-11-07:** normal SDOH content and existing design rules, no Trans Awareness Month campaign binding, November caption footer, or seasonal recolor.
- **2026-11-08 to 2026-11-30:** eligible for Trans Awareness Month editorial, colors, and caption footer, subject to the existing campaign-specific content approval and QA gates.
- Do not retroactively edit, recolor, reschedule, or relabel content already published or scheduled for November 1–7.
- No automatic production activation or publication authority is conferred by this schedule amendment.


## November first-item approval and QA dependency — 2026-11-06

- **Approved copy:** `SDOH-SAGE-CAR-0015`, fingerprint `f322a5532ba7e8d7e07fb5c37dd65b803eb69221766191b09094bb5495ff6519`, Owner Copy Approved in [merged PR #191](https://github.com/BillyProject2505/content-os/pull/191). Copy and instance-only `balanced_3` plan are on GitHub `main`; no publication authorization is implied.
- **Binding proposal:** `2026-11-content-binding.json` in this Draft PR now has one content-specific approved item for **2026-11-08**. Until this PR is reviewed and separately authorized for merge, GitHub `main` remains binding-inactive and the live seasonal render cannot pass its gate.
- **QA blocker:** canonical default `wrapCopy` produces text widths greater than 600 px for slides 1, 2 and 5. The BUS-49 canonical renderer **correctly rejects** the first slide without outputting a review package. Do not weaken the overflow gate or change approved words.
- **Owner-approved line-wrap:** the existing three-line `balanced_3` routine was approved **only for `SDOH-SAGE-CAR-0015`** in [PR #191](https://github.com/BillyProject2505/content-os/pull/191#issuecomment-6684068829). It rendered all five slides in local QA without altering words, source assets, font, pose map or geometry. The [Drive proof](https://drive.google.com/file/d/1pcrVJ4I57SDx69EUHlbJCNtuLNC2P77B/view) is a candidate reference (ZIP SHA-256 `4130e15c01b61b9e3db0f08593c49f078097ce51624dcf9bbfd0ca2d88acd908`); live GitHub Actions render has **not** yet been reviewed.
- No merge, content-specific Owner Visual Approval, schedule, publication, or activation has been authorized.


## Campaign binding proposal — QA-only, pending separate merge approval (2026-11-06)

One content item is eligible for technical QA review when and only when the reviewed binding patch is merged to `main`:

- Content: `SDOH-SAGE-CAR-0015`; target date **2026-11-08** (Asia/Makassar).
- Copy status `COPY_APPROVED`, exact fingerprint `f322a5532ba7e8d7e07fb5c37dd65b803eb69221766191b09094bb5495ff6519`.
- Approval evidence: `https://github.com/BillyProject2505/content-os/pull/191#issuecomment-6683448778`.
- In-scope action: manual, read-only Drive-authenticated BUS-49 QA render, caption and asset hash verification, upload a short-lived QA proof artifact for Owner review.
- Explicitly out-of-scope: production activation, calendar scheduling, Instagram/TikTok publication, modifying historic content or removing the final Owner release gate.

**Do not merge this QA binding Draft PR or run publication without explicit Owner authorization.**
