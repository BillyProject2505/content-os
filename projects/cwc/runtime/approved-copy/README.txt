# CWC approved-copy preflight — BUS-170 (pilot only)

This is a **non-authoritative operational prototype** implementing the first reusable SDOH pattern: integrity-locked approved copy. It has **no renderer, production-writeback, scheduling, Meta credentials or publication path**. It does not amend the canonical CWC lifecycle or allocate a Content ID.

## Current authorities (read latest revision at use)
- CWC Production Workflow: projects/cwc/DIUA-DIC-000017_CWC-Production-Workflow.md (STG-03 evidence, STG-09 approval, STG-10 Approved Release Identity).
- CWC Production Bible: projects/cwc/DIUA-DIC-000012_Coz-We-Care-Production-Bible.md (§6.6.1 five hashtags; §6.6.2 follow/share CTA).
- CWC Content Register: projects/cwc/DIUA-DIC-000027_CWC-Content-Register.md.
- CWC QA Mechanism: projects/cwc/DIUA-DIC-000019_CWC-QA-Mechanism.md.
- CWC Format Carousel: projects/cwc/DIUA-DIC-000029_CWC-FORMAT-CAROUSEL.md (v1.4 reference-validated Slide-1 layout; **not** SDOH BUS-49).
- Assets: CWC CAS/CAR/CAB/CRS; assets must come from currently authorized Google Drive binaries.

## Scope

The manual GitHub workflow only:
1. validates a previously allocated native CWC-CRSL-NNNN identifier and frozen copy JSON at projects/cwc/content/carousel/<ID>.json;
2. rejects anything except COPY_APPROVED, a Linear issue locator, ordered slides, CWC caption structure, and source evidence records when sensitive_claim=true;
3. compares SHA-256 canonical-copy fingerprint both with the file and **independently supplied** dispatch fingerprint;
4. uploads a small JSON COPY_PREFLIGHT_PASS evidence artifact.

The fingerprint covers all authorial payload fields except status and copy_fingerprint; array order and all copy/caption/evidence text are included. A status flip or URL does not prove that the Owner genuinely approved anything.

The preflight **cannot authenticate Linear approval**, confirm Content Register eligibility/duplicate status, judge current scientific validity, perform final CWC-QA, validate canonical asset checksums, render, or grant Owner visual approval. It records all these checks as false. Its output is **never** an Approved Release Identity or a publication manifest.

## Input contract

A source file should include the following structure, with a real STG-02 allocated ID and actual evidence. This illustration is not a production-ready copy file.

    {
      "schema": "cwc-approved-copy-v1",
      "content_id": "CWC-CRSL-NNNN",
      "format": "CRSL",
      "status": "COPY_APPROVED",
      "approval_record_url": "https://linear.app/bussiness-content-os/issue/BUS-NNN/...",
      "sensitive_claim": true,
      "source_evidence": [
        {"claim": "evidence-linked claim", "source_url": "https://...", "checked_at": "YYYY-MM-DD"}
      ],
      "slides": [{"slide": 1, "text": "Frozen approved slide text"}],
      "caption": "Approved final caption with follow/share CTA and five hashtags",
      "local_hashtag": "#Manado",
      "copy_fingerprint": "64-digit lowercase SHA-256 hex"
    }

COPY_APPROVED must reflect an actual CWC editorial decision. Generate the fingerprint before recording that decision using the exported fingerprintOf function in preflight.mjs (status is excluded). Pin it in the authoritative approval record; manual workflow dispatch must supply the same fingerprint from that independent record. Re-approval is required after any payload mutation.

The pilot validator currently only accepts #Manado and #SulawesiUtara as local-tag candidates. This is a **pilot restriction**, not a canonical limitation on CWC's geographic tags. Editorial review still decides whether geographic relevance is truthful.

## Run

    node --test projects/cwc/runtime/approved-copy/preflight.test.mjs
    node projects/cwc/runtime/approved-copy/preflight.mjs --content-id CWC-CRSL-000X --expected-copy-fingerprint <independently-pinned-sha256> --out /tmp/cwc-copy-preflight.json

Use GitHub Actions "CWC approved-copy preflight (BUS-170)" with exact confirmation COPY_PREFLIGHT_ONLY from main, after the pilot code is reviewed and merged. The workflow does not publish or render.

## Activation boundary

A later, separately reviewed PR must verify current CWC register, STG-03 provenance and STG-09 approval against the live source of truth, resolve Drive assets with checksums, implement a CWC-specific deterministic renderer and visual/technical QA, and stop at the visual Owner Review. Publication is a further separate, default-disabled milestone requiring a locked Approved Release Identity and verified Meta writeback. Do not reuse SDOH BUS-140's live executor or global switches.

Tracking: https://linear.app/bussiness-content-os/issue/BUS-170/cwc-approved-copy-automation-pilot-sdoh-pattern-adoption


## Phase B1 render-plan candidate (stacked on Phase A, NOT production renderer)

run:
  node --test projects/cwc/runtime/approved-copy/*.test.mjs

Phase B1 adds render-plan.mjs and synthetic tests. It uses the currently registered FORMAT-CAROUSEL v1.4:
- 1080x1350 canvas; Slide 1 copy x=72..551, gutter x=551..605;
- presenter core x=670..1015; intentional gesture may enter x=572..594;
- later slides do not acquire a new mandatory presenter requirement.
The pilot uses approved BUS-94 production derivatives and their existing checksums.
Logo and footer Drive IDs are taken from CRS v1.23; surface Blue/dark uses CWC_Master.svg plus white Footer; Light/white uses the approved light-surface logo plus blue Footer.

The CLI example below is illustrative. It will FAIL CLOSED until a legitimately allocated,
approved CWC copy file exists, with pinned fingerprint:
  node projects/cwc/runtime/approved-copy/render-plan.mjs \
    --content-id CWC-CRSL-000X \
    --expected-copy-fingerprint <independently-pinned-sha256> \
    --surface BLUE_DARK \
    --presenter-variant WHITE_POINT_LEFT \
    --copy-box '{"x":72,"y":250,"width":479,"height":440}' \
    --presenter-box '{"x":670,"y":260,"width":345,"height":780}' \
    --gesture-box '{"x":572,"y":500,"width":22,"height":120}' \
    --out /tmp/cwc-render-plan.json

The above rectangles are CANDIDATE composition placements, not approval of text wrapping or image clipping. Inputs that would exceed registered x boundaries fail. Plan output preserves the exact approved copy and independently pinned fingerprint. The presenter core box is NOT a full silhouette/alpha-pixel bound; physical asset placement and gesture transparency must still be checked after actual render.

**The plan never retrieves Drive assets, independently verifies their current authority status, checks their actual bytes, downloads fonts, performs SVG/PNG compositing, verifies logo/footer reserved regions, judges text wrapping, passes Technical QA, grants Owner approval, schedules or publishes.** Every such evidence field is false. Current canonical files remain unchanged; code const tables are temporary pilot snapshots, not new registry authority.

The B1 test workflow is PR-only until merged; current phase implementation is stacked as an independent review PR against Phase A. Production activation remains forbidden.


## Phase B2 — Blue/Dark actual candidate renderer (stacked PR)

A separate reviewed commit introduces an initial **Blue/Dark / White Jacket Point Left only**
candidate renderer, not an activated full production workflow. It adds:
- SHA-256 snapshot pinning for the exact BUS-94 presenter, CRS logo/footer, and two Montserrat
  font files fetched from Google Drive. The checksums were measured from actual Drive bytes
  on 2026-10-24.
- A manual-only review workflow using a read-only Google Drive access token via WIF;
  the workflow runs on main after merge, not on PRs.
- A Python Pillow/CairoSVG compositor that loads the pinned original bytes and produces
  ordered 1080x1350 PNG candidate slides plus contact sheet and SHA-256 report.
- Strict single-role headline/body typography. Copy that cannot fit at registered sizes
  fails closed. No auto-edit, auto-wrap outside width, or sub-floor scaling.
- Selected "HIV" words appear in mandatory red #E31C23.

The pilot is deliberately restrictive; it does not yet support all CWC layouts, multiple
text-role typography on one slide, Story/Reel/Poster, alternate presenters or both surfaces.
The image scaling is uniform but its visual quality and identity continuity still need
human STG-08 QA; **metadata preflight cannot detect all alpha-pixel collisions or font
rasterization differences**. The font-loaded SVG footer must also be visually inspected
for fidelity. Such limitations prohibit an automatic Technical QA PASS.

The renderer emits state RENDERED_CANDIDATE_UNAPPROVED, technical_qa NOT_COMPLETE,
visual_owner_review NOT_GRANTED and publication_authorized false. There is no
STG-09 approval/writeback, approved release identity, Meta interaction, scheduler,
publication or notification to Instagram in this workflow.

The workflow will fail if the WIF service account lacks reader access to CWC Drive assets;
this access has not yet been tested. Do not relax security by embedding an OAuth token
or replacing the real CWC assets with unapproved third-party downloads.

This B2 PR is stacked on B1 and must not merge directly into main until the earlier
contracts pass review. No current content or previously scheduled date is ever replayed.


## Phase B2 typography closure candidate (not an Owner approval)

A separate, explicit per-slide layout JSON file now binds semantic typography to the
frozen approved copy. The manual render job requires two independent fingerprints:
(1) approved-copy payload SHA-256, and (2) structured-layout JSON SHA-256. The
two files must match the same newly allocated \`CWC-CRSL-NNNN\` and the ordered
concatenation of layout components must exactly equal the frozen slide text
(no paraphrase, no silently inserted line break, no clinical meaning edits).

Layout JSON path: \`projects/cwc/content/carousel/<content-id>.layout.json\`.
Schema \`cwc-carousel-typography-layout-v1\`, fields:
- \`content_id\` and \`slides\`; each slide has \`slide\`, ordered \`blocks\`, \`accents\`.
- Each block: \`role\` (hero, headline, subheadline, kicker, body, supporting, cta),
  \`text\` (literal substring of the approved slide), \`rect\` integer x/y/width/height,
  and \`tone\` (WHITE, or YELLOW only for kicker).
- Accent: \`type:line\`, \`tone:YELLOW\`, bounded copy-safe \`rect\`.
- Blocks must not overlap protected layout regions, and the same frozen slide
  text must be recovered by joining block texts with exactly one ASCII space.

Registered typography matrix from FORMAT-CAROUSEL v1.4 remains the sole
authority: hero 88/92 ExtraBold, headline 72/82 Bold, subheadline 52/64 Bold,
kicker 28/34 SemiBold, body 38/52 Medium, supporting 34/46 Medium,
CTA 38/44 Bold. All 4 Montserrat files are SHA-pinned to verified CWC Drive
bytes. Text overflow triggers rejection, never text rewriting or below-floor
font shrinking. The word HIV is red by default in live text. The yellow
line is editorial decoration only, not part of copied source text.

This is a **pilot layout contract**, not a newly canonical typography policy.
No layout-file generation, approval or publication is automated. There is
currently NO allocated content layout file in this repository for the pilot;
the manual job must fail closed until an authorized copy and reviewed layout
exist. Exact visual parity with the previous R2 release and independent
STG-08 / STG-09 remain unverified.
