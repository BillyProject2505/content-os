// BUS-160 Production Path: approved canonical copy.
//
//   COPY_APPROVED (GitHub, one JSON file per content item)
//     -> contract + status + integrity validation
//     -> Semantic Alignment validation   (existing gate, unchanged)
//     -> Editorial Quality validation    (existing gate, unchanged)
//     -> deterministic visual plan / BUS-49 manifest
//
// No model, provider, retry or remediation is involved. The gates are safety
// verification only: a copy that fails them FAILS CLOSED and goes back to
// editorial review. Nothing in this module rewrites, shortens, expands or
// paraphrases approved copy.
import fs from "node:fs";
import path from "node:path";
import {
  GenerationContractError,
  assembleCaption,
  canonicalJson,
  normalizeEditorialGuardrails,
  normalizeSemanticGuardrails,
  sha256Hex,
  validateEditorialQuality,
  validateSemanticAlignment,
} from "./model-generation-contract.mjs";

export const APPROVED_COPY_STATUS = "COPY_APPROVED";
export const APPROVED_COPY_ROOT = "projects/sdoh/content";
export const APPROVED_COPY_DIR = "projects/sdoh/content/sage/carousel";

// Project-level caption furniture (SDOH Production SOP caption architecture).
// An item cannot weaken it through its own guardrails.
const PROJECT_CAPTION_SIGNATURE = "satu dosis obat hati";
const PROJECT_CAPTION_HASHTAGS = [
  "#satudosisobathati",
  "#obathati",
  "#manado",
  "#mentalhealthmanado",
  "#pelanpelanaja",
];

const CONTENT_ID_RE = /^SDOH-SAGE-CAR-\d{4}$/;
const FIELDS = [
  "content_id",
  "status",
  "theme",
  "slides",
  "caption_body_paragraphs",
  "guardrails",
  "copy_fingerprint",
];

function fail(code, message) {
  throw new GenerationContractError(code, message);
}
function check(condition, code, message) {
  if (!condition) fail(code, message);
}
const plainObject = (value) => value && typeof value === "object" && !Array.isArray(value);
const singleLine = (value) =>
  typeof value === "string" && value.trim() === value && value.length > 0 && !/[\r\n\t]/.test(value);

// The fingerprinted payload is everything that defines the approved copy and
// the safety guardrails it was approved against. `status` is deliberately
// excluded so promoting COPY_DRAFT -> COPY_APPROVED does not change the
// fingerprint the Owner approved.
function fingerprintPayload(copy) {
  return {
    content_id: copy.content_id,
    theme: copy.theme,
    slides: copy.slides.map((slide) => ({ slide: slide.slide, copy: slide.copy })),
    caption_body_paragraphs: [...copy.caption_body_paragraphs],
    guardrails: {
      semantic: copy.guardrails.semantic,
      editorial: copy.guardrails.editorial,
    },
  };
}

export function createCopyFingerprint(copy) {
  return sha256Hex(canonicalJson(fingerprintPayload(copy)));
}

const COPY_STAGES = ["COPY_DRAFT", "EDITORIAL_REVIEW", APPROVED_COPY_STATUS];

// Shared schema normalization. `requireApproved` is true for every production
// use; the editorial sealing helper alone may look at pre-approval stages so a
// fingerprint can be computed before the Owner approves.
function normalizeCopy(input, { expectedContentId, requireApproved }) {
  check(plainObject(input), "COPY_INVALID", "approved copy must be a JSON object");
  for (const key of Object.keys(input)) {
    check(FIELDS.includes(key), "COPY_FIELD_UNKNOWN", `unexpected field: ${key}`);
  }
  check(CONTENT_ID_RE.test(input.content_id ?? ""), "COPY_CONTENT_ID_INVALID", "content_id must be an SDOH Sage/Burgundy Carousel ID");
  if (expectedContentId !== undefined) {
    check(input.content_id === expectedContentId, "COPY_CONTENT_ID_MISMATCH", "approved copy content_id does not match the requested content item");
  }
  check(input.theme === "SAGE" || input.theme === "BURGUNDY", "COPY_THEME_INVALID", "theme must be SAGE or BURGUNDY");
  check(input.content_id.startsWith(`SDOH-${input.theme}-CAR-`), "COPY_THEME_INVALID", "theme must match content_id");

  // Approval state is checked before content so a draft never looks "valid".
  if (requireApproved) {
    check(
      input.status === APPROVED_COPY_STATUS,
      "COPY_NOT_APPROVED",
      `status must be ${APPROVED_COPY_STATUS}, found ${JSON.stringify(input.status ?? null)}`
    );
  } else {
    check(COPY_STAGES.includes(input.status), "COPY_STATUS_INVALID", `status must be one of ${COPY_STAGES.join(", ")}`);
  }

  check(Array.isArray(input.slides) && input.slides.length === 5, "COPY_SLIDES_INVALID", "slides must contain exactly five entries");
  input.slides.forEach((slide, index) => {
    check(plainObject(slide) && Object.keys(slide).sort().join(",") === "copy,slide", "COPY_SLIDE_INVALID", `slide ${index + 1} must contain only slide and copy`);
    check(slide.slide === index + 1, "COPY_SLIDE_ORDER_INVALID", `slide ${index + 1} has an invalid slide number`);
    check(singleLine(slide.copy), "COPY_SLIDE_TEXT_INVALID", `slide ${index + 1} copy must be a trimmed single-line string`);
  });

  check(
    Array.isArray(input.caption_body_paragraphs) && input.caption_body_paragraphs.length > 0,
    "COPY_CAPTION_INVALID",
    "caption_body_paragraphs must be a non-empty array"
  );
  for (const paragraph of input.caption_body_paragraphs) {
    check(
      singleLine(paragraph) &&
        !paragraph.includes("#") &&
        !paragraph.toLowerCase().includes(PROJECT_CAPTION_SIGNATURE),
      "COPY_CAPTION_INVALID",
      "caption paragraphs must be trimmed single-line text without the signature or hashtags"
    );
  }

  check(
    plainObject(input.guardrails) && Object.keys(input.guardrails).sort().join(",") === "editorial,semantic",
    "COPY_GUARDRAILS_INVALID",
    "guardrails must contain exactly semantic and editorial"
  );
  const semantic = normalizeSemanticGuardrails(input.guardrails.semantic);
  const editorial = normalizeEditorialGuardrails(input.guardrails.editorial);
  check(
    editorial.caption_required_signature === PROJECT_CAPTION_SIGNATURE &&
      JSON.stringify(editorial.caption_required_hashtags) === JSON.stringify(PROJECT_CAPTION_HASHTAGS),
    "COPY_GUARDRAILS_INVALID",
    "caption signature and hashtags must match the project-level caption architecture"
  );

  const copy = {
    content_id: input.content_id,
    status: input.status,
    theme: input.theme,
    slides: input.slides.map((slide) => ({ slide: slide.slide, copy: slide.copy })),
    caption_body_paragraphs: [...input.caption_body_paragraphs],
    guardrails: { semantic, editorial },
    copy_fingerprint: input.copy_fingerprint,
  };

  return copy;
}

// Schema + approval-state + integrity validation. Returns the normalized copy.
export function validateApprovedCopy(input, { expectedContentId, expectedCopyFingerprint } = {}) {
  const copy = normalizeCopy(input, { expectedContentId, requireApproved: true });
  check(/^[0-9a-f]{64}$/.test(copy.copy_fingerprint ?? ""), "COPY_FINGERPRINT_INVALID", "copy_fingerprint must be lowercase SHA-256 hex");
  check(
    copy.copy_fingerprint === createCopyFingerprint(copy),
    "COPY_FINGERPRINT_MISMATCH",
    "copy_fingerprint does not match the copy content: the approved copy was changed after approval"
  );
  if (expectedCopyFingerprint !== undefined) {
    check(
      copy.copy_fingerprint === expectedCopyFingerprint,
      "COPY_FINGERPRINT_MISMATCH",
      "copy_fingerprint differs from the fingerprint pinned for this run"
    );
  }
  return copy;
}

// Editorial sealing helper: fingerprint of a copy file at any editorial stage
// (the fingerprint is independent of status). copy_fingerprint may be absent.
export function sealCopyFingerprint(input) {
  const { copy_fingerprint: _ignored, ...rest } = input ?? {};
  return createCopyFingerprint(normalizeCopy({ ...rest, copy_fingerprint: undefined }, { requireApproved: false }));
}

// Candidate-shaped view used only to feed the existing gates.
export function copyToCandidate(copy) {
  return {
    slides: copy.slides,
    caption: assembleCaption(copy.caption_body_paragraphs, copy.guardrails.editorial),
  };
}

// Safety verification with the existing gates. Throws the gate's own error
// (SEMANTIC_ALIGNMENT_FAILED / FORBIDDEN_SEMANTIC_DRIFT / EDITORIAL_QUALITY_FAILED)
// and never offers a rewrite.
export function runApprovedCopyGates(copy) {
  const candidate = copyToCandidate(copy);
  const semantic = validateSemanticAlignment(candidate, copy.guardrails.semantic);
  const editorial = validateEditorialQuality(candidate, copy.guardrails.editorial);
  return { semantic, editorial };
}

// The renderer must receive the approved copy verbatim: only whitespace
// (line breaks) may differ between the manifest and the approved slides.
export function assertManifestMatchesCopy(manifest, copy) {
  check(manifest.content_id === copy.content_id, "MANIFEST_COPY_MISMATCH", "manifest content_id differs from approved copy");
  check(manifest.theme === copy.theme, "MANIFEST_COPY_MISMATCH", "manifest theme differs from approved copy");
  check(Array.isArray(manifest.slides) && manifest.slides.length === copy.slides.length, "MANIFEST_COPY_MISMATCH", "manifest slide count differs from approved copy");
  manifest.slides.forEach((slide, index) => {
    const approved = copy.slides[index];
    check(slide.slide_number === approved.slide, "MANIFEST_COPY_MISMATCH", `manifest slide ${index + 1} number differs from approved copy`);
    const rendered = String(slide.copy).split(/\s+/).filter(Boolean).join(" ");
    const expected = approved.copy.split(/\s+/).filter(Boolean).join(" ");
    check(rendered === expected, "MANIFEST_COPY_MISMATCH", `manifest slide ${index + 1} text differs from approved copy`);
  });
}

export function approvedCopyDirectory(contentId) {
  check(CONTENT_ID_RE.test(contentId ?? ""), "COPY_CONTENT_ID_INVALID", "content_id must be an SDOH Sage/Burgundy Carousel ID");
  const theme = contentId.includes("-BURGUNDY-") ? "burgundy" : "sage";
  return path.join(APPROVED_COPY_ROOT, theme, "carousel");
}

export function approvedCopyPath(contentId, dir) {
  const resolvedDir = dir ?? approvedCopyDirectory(contentId);
  return path.join(resolvedDir, `${contentId}.json`);
}

// Discovery: the canonical file for a content item is <dir>/<content_id>.json.
export function loadApprovedCopy(contentId, { dir, expectedCopyFingerprint } = {}) {
  const file = approvedCopyPath(contentId, dir);
  check(fs.existsSync(file), "COPY_NOT_FOUND", `no canonical copy file for ${contentId} in ${dir}`);
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  return { file, copy: validateApprovedCopy(raw, { expectedContentId: contentId, expectedCopyFingerprint }) };
}

// Lists content IDs whose canonical file is currently marked COPY_APPROVED
// (status only; full validation happens when an item is loaded for a run).
export function discoverApprovedContentIds(dir = APPROVED_COPY_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /^SDOH-SAGE-CAR-\d{4}\.json$/.test(name))
    .sort()
    .filter((name) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")).status === APPROVED_COPY_STATUS;
      } catch {
        return false;
      }
    })
    .map((name) => name.replace(/\.json$/, ""));
}
