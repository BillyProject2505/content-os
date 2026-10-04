SDOH automated content production runtime (BUS-160)

PRODUCTION PATH (canonical, needs no AI model, provider, retry, remediation or billing)

  CONTENT_PLAN -> COPY_DRAFT -> EDITORIAL_REVIEW -> COPY_APPROVED -> READY_FOR_RENDER
  -> deterministic visual plan -> BUS-49 render -> Technical QA -> READY_FOR_OWNER_REVIEW
  -> explicit Owner visual approval -> APPROVED/READY -> SCHEDULED -> BUS-140 -> PUBLISHED

  Copy is drafted with ChatGPT assistance, reviewed by the Owner/editor, and committed as
  canonical approved copy: projects/sdoh/content/sage/carousel/<CONTENT_ID>.json.
  Editorial batches are about 4-8 weeks; there is no annual backlog.

  Entry point: .github/workflows/sdoh-approved-copy-render.yml (manual, main only)
    inputs: content_id, expected_copy_fingerprint (recorded with the copy approval),
            confirmation RENDER_UNAPPROVED_REVIEW_PACKAGE
    1. scripts/build-approved-copy-render-manifest.mjs
         discover copy -> contract -> status must be COPY_APPROVED -> copy_fingerprint
         (file and pinned) -> Semantic Alignment gate -> Editorial Quality gate
         -> deterministic Sage visual plan -> render manifest + frozen copy snapshot
    2. .github/actions/sdoh-bus49-render  (checksum-locked BUS-49 v0.6.0 render from Drive)
    3. scripts/validate-carousel-review-package.mjs --copy ...
         Technical QA, re-verifies the frozen copy and that the renderer got exactly that copy
    4. review package: state READY_FOR_OWNER_REVIEW, approval NOT_GRANTED, publication PLANNED

  Gates are safety verification, not repair. A copy that fails any check FAILS CLOSED and
  returns to editorial review; it is never auto-rewritten, shortened, expanded or regenerated.
  Copy sent to render is immutable for the run (copy_fingerprint covers the text, caption
  paragraphs and the guardrails it was approved against).

  Hard stop: this path never grants Owner approval, schedules, calls BUS-140 or publishes.
  COPY_APPROVED (text) is separate from the Owner's final visual approval after render.

  Editorial helper: scripts/seal-approved-copy.mjs <file> [--write] prints/stores copy_fingerprint.

OPTIONAL GENERATION PATH (experimental; not a production dependency)

  BUS-161 provider-neutral generation contract, BUS-162 Cloudflare Workers AI adapter
  (free tier only; paid models are not authorized), deterministic retry remediation and the
  BUS-144 pilot (PRs #98-#102). Kept as history and test evidence. No production workflow
  calls it and its failure does not block approved-copy production.
    .github/workflows/sdoh-automated-content-generation-pilot.yml  (manual)
    .github/workflows/sdoh-bus144-automated-render-pilot.yml       (manual)
    scripts/generate-content-candidate.mjs, *-generation-adapter.mjs, remediation-hint.mjs,
    build-carousel-render-manifest.mjs

SHARED (used by both paths, single implementation)
  model-generation-contract.mjs  guardrail validation + Semantic/Editorial gate functions
  editorial-quality-gate.mjs     Editorial Quality assessment
  carousel-manifest.mjs          line-break policy + canonical Sage visual plan
  validate-carousel-review-package.mjs  Technical QA + review package
