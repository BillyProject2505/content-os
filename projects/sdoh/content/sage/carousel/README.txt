SDOH Sage Carousel - canonical approved copy (BUS-160 Production Path)

One JSON file per content item: <CONTENT_ID>.json, e.g. SDOH-SAGE-CAR-0006.json.
This directory holds ONLY copy that is, or is going through, editorial review.
Binary assets and rendered output live in Google Drive; planning, workflow status,
approval evidence and traceability live in Linear. See
projects/sdoh/runtime/automated-content-production/README.txt.

Skeleton (copy_fingerprint is produced by the seal helper, never typed by hand):

{
  "content_id": "SDOH-SAGE-CAR-0006",
  "status": "COPY_DRAFT | EDITORIAL_REVIEW | COPY_APPROVED",
  "theme": "SAGE",
  "slides": [ { "slide": 1, "copy": "..." }, ...exactly five... ],
  "caption_body_paragraphs": [ "...", "...", "..." ],
  "guardrails": {
    "semantic":  { required_slide_anchor_groups, minimum_required_slide_anchor_groups, forbidden_slide_phrases },
    "editorial": { per-slide word windows, totals, similarity, slide_progression, caption limits,
                   caption_required_signature, caption_required_hashtags }
  },
  "copy_fingerprint": "<sha256, node .../seal-approved-copy.mjs <file> --write>"
}

The guardrails block has the same shape as semantic_guardrails and
editorial_quality_guardrails in
projects/sdoh/runtime/automated-content-production/pilot-requests/SDOH-SAGE-CAR-0009.json.
Only COPY_APPROVED files are rendered. COPY_APPROVED is copy approval only; it is not
final visual approval and never implies scheduling or publication.
