# CWC approved-copy preflight — BUS-170 (pilot only)

This is a **non-authoritative operational prototype** implementing the first reusable SDOH pattern: integrity-locked approved copy. It includes preflight and a review-only renderer; it has **no production-writeback, scheduling or publication authorization**. It does not amend the canonical CWC lifecycle or allocate a Content ID.

## BUS-180 replay equivalence — eliminate redundant Owner/QA work

An editable one-run candidate may reproduce a previously **STG-08 PASS / STG-09 APPROVED** output exactly. After image-byte integrity QA and the ordinary reviewer intake, the read-only `reconcile-approved-replay.mjs` checks the exact five PNG SHA-256 values, caption SHA-256, approved-copy fingerprint, linked immutable formal QA record and Owner approval Git blob, and release identity against the **existing records for the same Content ID**. It emits `approved-render-equivalence.json` into the same artifact.

- Exact identity: `IDENTICAL_TO_EXISTING_STG08_STG09_APPROVED_BYTES`. **Do not request a duplicate STG-08 or STG-09 merely because the same pixels were rendered again**; preserve the pre-existing evidence. This creates **no new** formal QA or Owner decision.
- No/partial approval records, or any mismatch: **no previous approval inferred**; the standard STG-08 reviewer intake remains pending for any genuinely new/changed outputs.
- Never treat historical STG-10 publication dates as reusable, infer CURRENT Content Register state, or schedule/publish from equivalence alone.
- Example smoke: `CWC-CRSL-0004` 2026-11-23 [one-run #45121173900](https://github.com/BillyProject2505/content-os/actions/runs/45121173900) produced 5/5 PNG SHA-256 + caption SHA-256 exactly equal to STG-09-approved bytes from 2026-11-01. The prior 2026-11-10 publication slot is expired and publication evidence remains separate.

## BUS-180 independent STG-08 intake (no new gate) — 2026-11-23

After an editable-source candidate has actually rendered and passed standalone image-byte verification, `stg08-intake.mjs` gathers the existing approved-copy record, STG-03 research/source-coverage record, exact render media digests and current CWC-QA-001 / FORMAT-CAROUSEL references into one `stg08-review-intake.json` and `.md` within the **same Actions artifact**. The QA checklist is sourced from the active canonical QA and Format Carousel documents and fails closed if authority version/shape drifts. It does not copy criteria blindly from a prior content item or create new format Criterion IDs.

**Boundary:** `STG08_EVIDENCE_PREPARED_AWAITING_INDEPENDENT_REVIEW` is an *intake*, **not** a formal `cwc-qa-record-v1`, PASS, an STG-09 Owner approval request, or STG-10 authorization. All 20 candidate criteria remain pending independent evidence/Expected/Actual adjudication, including clinical truth, stigmatizing language and exact rendered visual inspection. The independently rendered image bytes are measured, not clinically or editorially approved. Already-approved immutable rasters (such as `CWC-CRSL-0005`) do **not** reenter this QA intake.

One-run manual smoke and a real fresh-content pilot are still needed; CI success proves regression contracts, not end-to-end Google Drive, render, or live publication.

## BUS-180 one-run candidate render + bounded technical QA — 2026-11-23

`.github/workflows/cwc-production-review-one-run.yml` is the single manual entrypoint for evidence and review-candidate artifacts; PR events run tests only. It retains separate `STG-08` independent formal QA, `STG-09` human approval, and `STG-10` explicit publication authorization.

- Editable input mode: validates exact copy, research coverage and typed layout via `resolve-production-input.mjs`, obtains the existing **dedicated CWC** Google Drive read-only identity, checksum-locks the seven existing approved assets, runs the existing B2 renderer and then a separate `check-render-artifact.py` check on PNG bytes, geometry, order and contact-sheet digest. The same artifact contains one `review-summary.md`, `review-checkpoint.json`, `render-plan-typed.json`, output PNGs and bounded `technical-artifact-qa.json`. These artifacts are **UNAPPROVED CANDIDATES**, not STG-08 PASS or ready-to-publish content.
- Immutable approved-raster mode (e.g., `CWC-CRSL-0005`): only verifies existing metadata/hash references; never requests Drive credentials, rerenders, changes approval, schedules, or publishes.
- The current renderer still supports only `BLUE_DARK/WHITE_POINT_LEFT` pilot assets; a different registered format/wardrobe must fail closed, not be silently substituted. Clinical claim truth, exact artwork review, Content Register state and future publishing require their existing authorities.
- One run means **one dispatch + one artifact**, not collapsing the eleven canonical stages or automatically promoting state. Before claiming production-ready, execute a new-content pilot, independently complete STG-08 and count Owner interactions.

## Operational source routing — 2026-11-23 (PR scope)

`resolve-production-input.mjs` is a **read-only source router**, not a replacement for the renderer or for STG-08/09/10. Two mutually exclusive repository source modes:

- `EDITABLE_RENDER_CANDIDATE`: an existing `<Content ID>.json` plus independently reviewed `<Content ID>.layout.json`, with two externally pinned fingerprints. Uses existing Phase 1 copy/research/layout validation and returns the typed, **unapproved** render-plan object. Existing source example: `CWC-CRSL-0004`.
- `IMMUTABLE_APPROVED_RASTER`: STG-05/STG-07 structured records plus STG-08 QA, STG-09 human approval, and release/JPEG metadata. It verifies the exact approved PNG/JPEG/caption SHA references via the existing stage-handoff verifier, and **returns `renderer_input: null`**. This is correct for pre-rendered `CWC-CRSL-0005`: its editable typography/layout source was not retained, so rerendering it from text would alter the approved artwork.

Run from repository root (stdout JSON only; no GitHub/Drive/Meta changes):

```sh
node projects/cwc/runtime/approved-copy/resolve-production-input.mjs \
  --content-id CWC-CRSL-0004 \
  --copy-fingerprint 27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60 \
  --layout-fingerprint a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124
node projects/cwc/runtime/approved-copy/resolve-production-input.mjs --content-id CWC-CRSL-0005
```

Fail-closed: unrecognized/missing Content ID, partial or mixed source sets, bad independently supplied hashes, inconsistent QA/approval/binary hashes, and attempts to treat approved rasters as editable render input. This adapter checks record-integrity only; **it does not fetch or hash remote media bytes, review medical accuracy, prove Instagram scheduling, authorize STG-10, or publish**. Keep prior approvals/media immutable; no backfill of editable geometry by approximation. Future content can enter the render-candidate mode only with genuinely authored editable layout and independent fingerprints.

## Current execution snapshot — 2026-11-01

WIF Drive readonly succeeded in run 41273452129; official review render succeeded in run 41273768672 on an earlier commit. WIF integration is no longer the remaining blocker. The research-enabled contract now uses five JSON inputs; research validation checks structure/coverage, not clinical approval. Latest inspected B2 run 41292969183 failed; comments identify a Phase 1 confirmation value supplied to B2. B2 requires `RENDER_UNAPPROVED_CWC_REVIEW_PACKAGE`. Earlier success does not establish end-to-end success of the updated research-enabled path. Creative/clinical approval and publication authorization remain separate.

Older phase-specific sections below retain their historical scope and are not the current integration status.

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
- The word "HIV" inherits its enclosing text role color (CPB v2.23 §7.4.4); no red word override or white chip is permitted.

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
font shrinking. HIV inherits the enclosing typographic role color in live text. The yellow
line is editorial decoration only, not part of copied source text.

This is a **pilot layout contract**, not a newly canonical typography policy.
No layout-file generation, approval or publication is automated. There is
currently NO allocated content layout file in this repository for the pilot;
the manual job must fail closed until an authorized copy and reviewed layout
exist. Exact visual parity with the previous R2 release and independent
STG-08 / STG-09 remain unverified.


## 2026-11-01 — BUS-170 Phase 1 MVP: non-publishable review preparation

This is the current operational Phase 1 entrypoint. Existing Phase A/B1/B2 historical
notes above are preserved for provenance; they are not evidence of final release.

**GitHub workflow:** `.github/workflows/cwc-phase1-review-preparation.yml`
- PR CI automatically tests content/preflight/layout contracts when CWC content, runtime,
  or this workflow changes. Test success alone is NOT production readiness.
- A human invokes `workflow_dispatch` on **main** with the real registered Carousel
  Content ID, two independently verified approved-copy/layout SHA-256 fingerprints,
  and confirmation `PREPARE_UNAPPROVED_CWC_REVIEW`.
- The job executes the same JS `preflight.mjs` validation, CWC FORMAT-CAROUSEL
  authority-pinned `buildCarouselRenderPlan()`, and `attachLayout()`. It emits
  `copy-preflight.json`, `render-plan.json`, `render-plan-typed.json`, and
  `phase1-manifest.json` as a 14-day review-only GitHub Actions artifact.
- No credentials, Google Drive, Cloud IAM, renderer binaries, social platform
  integration, content modification, Linear writeback, approvals, schedule or publishing.
  `PHASE1_VALIDATED_UNAPPROVED` only means copy/layout integrity PASS.

**Pilot exact inputs for CWC-CRSL-0004** (verify against current main before launch):
- copy fingerprint: `27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60`
- layout fingerprint: `a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124`
- confirmation: `PREPARE_UNAPPROVED_CWC_REVIEW`

Equivalent read-only local CLI, from the repository root:

    node projects/cwc/runtime/approved-copy/prepare-review.mjs \
      --content-id CWC-CRSL-0004 \
      --copy-fingerprint 27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60 \
      --layout-fingerprint a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124 \
      --out /tmp/cwc-phase1

**Stage boundary:** live authority/clinical evidence, asset SHA bytes, full official
`render-carousel.py` output, STG-08 QA, STG-09 Owner release, STG-10 Release Identity,
and scheduling/publication are separate later gates. BUS-172 dedicated CWC WIF/Drive
reader remains deferred; it is not needed for this credential-free Phase 1. Do not
mistake four JSON files for approved publication assets, and never replay a past
editorial slot automatically.


## 2026-11-01 — STG-03 Research Evidence Gate (BUS-170 / BUS-171)

**Existing canonical authority:** CWC Production Workflow v1.22 already requires
Research at STG-03, BEFORE STG-04 Planning and STG-05 Content Production.
CWC-QA-001 already requires traceable claim-by-claim source evidence at STG-08.
This operational change introduces NO extra stage or alternative QA mechanism.

**Authoring sequence for each new CWC Carousel** (human editorial responsibility):
STG-02 approved Content Brief and duplicate classification -> STG-03 research
the exact claims and record primary sources, sections, point-of-use reliability,
scope/applicability and contradictions -> resolve missing/contradictory evidence
BEFORE copy is finalized -> STG-04 plan -> STG-05 Owner approved copy -> STG-06
assets -> STG-07 visual -> independent STG-08 QA -> explicit sensitive-claim
STG-09 Owner signoff -> release. If copy changes, recheck research mapping.

**Single minimal STG-03 production evidence file:**
`projects/cwc/content/research/<CWC-CRSL-NNNN>.research.json` (versioned in
GitHub). The source-of-truth for semantic medical judgment remains human research
review and the canonical STG-03 Output Contract; the JSON is its machine-checkable
coverage/index record, not a new governance authority. Each claim must have
- a claim ID, explicit coverage classification or editorial-only classification;
- slide/caption locations, source IDs and applicability limits;
- recoverable HTTPS source provenance with section and point-of-use reliability;
- matching already approved-copy SHA-256 and dated review scope.

`research-gate.mjs` fails closed if any slide or caption lacks mapped evidence,
references are missing or malformed, sources lack reliability, a clinical claim
has unsupported coverage class, or the content/copy fingerprint differs.
It DOES NOT download/read URLs during Actions, verify source medical truth,
decide a lifecycle transition, certify live local clinical procedure or impersonate
a medical reviewer. Human clinical signoff and QA/approval flags must remain false.

**Workflow enforcement:** manual approved-copy preflight, Phase 1 review
preparation and full B2 review-candidate render all check the research matrix
BEFORE producing their outputs; Phase 1 and B2 include research-evidence.json
in their nonpublishable artifacts. PR tests include actual CWC-CRSL-0004 evidence
plus negative tests for missing coverage/source provenance and fake approval.
Every future Carousel Content ID needs its own evidence file. Do not create
invented source citations or silently set a medical-verification PASS flag.

**Existing pilot** CWC-CRSL-0004 maps six claim groups (HIV tests, 3-month
2023 oral-PrEP tests, STI, kidney criteria, counselling, CWC DM navigation).
It specifically distinguishes the month-1 follow-up from month-3 HIV tests,
and does not certify that every 2026 facility follows the same operational SOP.
Its dated research is review evidence, NOT STG-03 lifecycle exit signoff and
NOT STG-08/09/10 or publication authorization. Preserve frozen copy and layout
hashes and previously produced PNGs; these workflows do not publish.
