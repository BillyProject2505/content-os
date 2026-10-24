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
