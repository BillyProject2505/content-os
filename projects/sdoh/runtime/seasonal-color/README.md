# November 2026 — Trans Awareness Month (Color-only contract)

**State:** DRAFT_PENDING_RENDER_QA / INACTIVE. This is an operational candidate, **not** an amendment to the project's permanent Sage/Burgundy palette. The JSON is deliberately **not consumed** by a production renderer or publication workflow.

## Effective window and scope

Publication-local dates: 2026-11-01 through 2026-11-30, Asia/Makassar (inclusive). Applicability to Carousel, Reels, and TikTok Poster requires separate format-specific renderer proof. Content IDs alone do not encode publication dates: never infer effective period from an ID or silently alter already published media.

| Role | Sage series | Burgundy series |
| --- | --- | --- |
| Main surface | `#C5E4F0` (pastel blue) | `#F5C9DA` (pastel pink) |
| Text fill | `#FFFFFF` | `#FFFFFF` |
| Character fill | `#FFFFFF` | `#FFFFFF` |
| Thin outline/stroke | `#4B7A94` | `#A2577A` |

No additional accent, plate, banner, decorative shape, or new layout is authorized by this contract.

## Hard preservation boundary

- Preserve the existing canonical character asset identity and registered pose route; **no regenerated or redesigned character**. When recoloring a character, preserve its source geometry and alpha values, including edge antialiasing.
- Preserve Caveat Medium identity, weight and every type metric: line breaks, position, tracking, leading, sizes, and stroke *width*.
- Preserve slide geometry, hierarchy, layout classes, safe areas, logo and ornament shapes/locations, original content, copy fingerprints and provenance.
- Preserve existing permanent Sage/Burgundy palette tokens outside this date-limited, explicit opt-in path.
- Do not alter the SHA-256-locked BUS-49 v0.6.0 source package in place or bypass checksum verification to apply color changes. A versioned, separately verified recolor implementation is required if the canonical source cannot accept palette parameters.

## Contrast and QA

White fill on either pale surface has intrinsically low luminance contrast. A thin, darker outline is **not sufficient evidence of readable text**. Keep these colors as an Owner-directed design candidate, but block production until actual rendered typography at canonical sizes passes documented optical and accessibility QA. Do not "fix" this by changing the font, stroke width, layout, introducing a dark panel, or inventing a new decoration without a separate Owner decision.

Before any activation, verify (1) full transparency/geometry invariance of the actual character derivatives against canonical input, (2) unchanged font and layout metrics, (3) token application is strictly date-scoped and opt-in, (4) output contrast and legibility including mobile-scale proof, (5) original production gates, and (6) explicit Owner Visual Approval. Fail closed on any deviation.

## Runtime boundary

The existing approved-copy manifest does not carry palette tokens, and the renderer source is an immutable Google Drive ZIP pinned in `render-runtime/carousel-v060-authority.json`. This proposal is **configuration plus static tests only**. It neither changes the active BUS-49 renderer nor modifies approval/scheduling/publication behavior. The test runs with:

```bash
node projects/sdoh/runtime/seasonal-color/self-test.mjs
```

Further implementation needs a narrow, separately reviewed renderer integration change, validated with the original source assets—not a regenerated visual prototype.
