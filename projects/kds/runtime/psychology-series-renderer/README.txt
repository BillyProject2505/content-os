KDS Psychology Series deterministic slide assembler — REFERENCE IMPLEMENTATION (proposal)

STATUS
  Non-governed tooling proposed by the KDS Full Documentation Audit (2026-10-17).
  It creates no rule, approves nothing, schedules nothing and publishes nothing.
  If any constant here differs from the current canonical Psychology Series Layout Bible
  (DIUA-DIC-000039), the Layout Bible wins and this tool must be corrected.
  Adoption as the standard production path is an Owner decision under KDS Project
  Architecture §11 (demonstrated need: audit findings F25 and F29).

WHY IT EXISTS
  BUS-167 S01 v0.3A and S02 v0.1A were assembled by a renderer that lived only in a chat
  session. Its tracked-text path aligned each glyph by its own ink box instead of a shared
  baseline, so headline letters jumped up and down ("ser¡ng", "d¡r¡"). The defect passed a
  recorded STG-07 QA. This implementation draws every glyph on one baseline and has a
  regression test with a negative control for that defect.

WHAT THE MODEL MAY PRODUCE vs WHAT THIS TOOL PRODUCES
  Image model:  the narrative scene layer only (environment, presenter pose/expression where
                identity rules allow, props, light). No text, logo, wordmark, badge, callout,
                ornament, page number or citation.
  This tool:    white editorial field + canonical gradient, header (exact logo / divider /
                exact wordmark PNG), series badge, topic, headline, body, callout box, Gold
                Wave / optional Dot Matrix via `contain`, page indicator. Every registered
                binary is SHA-256 checked against the KDS Asset Registry; mismatch = FAIL.
                Copy that does not fit FAILS CLOSED; type is never shrunk.

RUN
  python3 render_slide.py --spec slide.json --assets <dir with registered PNGs> \
      --fonts /usr/share/fonts/opentype/inter --out slide.png
  -> slide.png + slide.png.manifest.json (input hashes, line breaks, checks, verdict)
  Exit code 0 only for preflight PASS. Layout Bible v1.22 resolves F32 by starting artwork
  at x=390 beneath the full x=390–475 gradient. Any non-canonical artwork_x fails closed.
  Exact canonical Inter is required for production; synthetic self-tests may exercise logic
  with a substitute font but that is never typography-conformance evidence.
  Preflight PASS is technical evidence for QA Q5/Q7;
  it is NOT a QA verdict, Owner Visual Approval or Publication Approval.

  slide.json keys: slide, total, scene, scene_focus_x, scene_focus_y, badge, topic,
  headline, body, callout (optional), dot_matrix (Slides 2-N only, optional),
  face_xy [x, y] (optional focal-zone check), artwork_x (leave unset; see F32).

KNOWN OPEN POINTS (Owner decisions, not fixed here)
  F32  RESOLVED in Layout Bible v1.22: artwork x=390, width=690, beneath the unchanged
       x=390–475 gradient. Renderer follows that canonical geometry.
  F31  A 4-line callout (4 x 32 px) exceeds the 124 px inner height of the 156 px box
       with 16 px padding. Reported as WARN, not enforced.

SELF-TEST (CI, no Drive access needed)
  python3 selftest.py
