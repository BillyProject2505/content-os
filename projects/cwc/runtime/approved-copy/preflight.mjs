// BUS-170: non-authoritative CWC approved-copy preflight.
// This verifies shape and integrity only. It does NOT verify Linear approval,
// canonical register status, clinical facts, assets, layout or publication authority.
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = "projects/cwc/content/carousel";
const ID_PATTERN = /^CWC-CRSL-[0-9]{4}$/;
const FP_PATTERN = /^[a-f0-9]{64}$/;
const KEYS = [
  "schema", "content_id", "format", "status", "approval_record_url",
  "sensitive_claim", "source_evidence", "slides", "caption",
  "local_hashtag", "copy_fingerprint"
];
const SOURCE_KEYS = ["claim", "source_url", "checked_at"];
const SLIDE_KEYS = ["slide", "text"];

function reject(code, explanation) {
  const error = new Error(code + ": " + explanation);
  error.code = code;
  throw error;
}
function requireThat(condition, code, explanation) {
  if (!condition) reject(code, explanation);
}
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function exactKeys(record, keys, location) {
  requireThat(isRecord(record), "SCHEMA_INVALID", location + " must be an object");
  const actual = Object.keys(record).sort();
  requireThat(
    JSON.stringify(actual) === JSON.stringify([...keys].sort()),
    "SCHEMA_INVALID",
    location + " has missing or unexpected fields"
  );
}
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])])
  );
}
function isNonEmptyText(value) {
  return typeof value === "string" && value.length > 0 && value.trim() === value;
}
function safeHttpsUrl(value) {
  if (!isNonEmptyText(value)) return false;
  try {
    const u = new URL(value);
    return u.protocol === "https:" && Boolean(u.hostname) && !u.username && !u.password;
  } catch {
    return false;
  }
}
export function fingerprintOf(copy) {
  const { status, copy_fingerprint, ...approvedPayload } = copy;
  return createHash("sha256")
    .update(JSON.stringify(canonicalize(approvedPayload)), "utf8")
    .digest("hex");
}
export function validateCopy(copy, { contentId, expectedFingerprint } = {}) {
  exactKeys(copy, KEYS, "copy");
  requireThat(copy.schema === "cwc-approved-copy-v1", "SCHEMA_INVALID", "schema version must be v1");
  requireThat(ID_PATTERN.test(copy.content_id), "CONTENT_ID_INVALID", "only native CWC Carousel IDs are supported");
  requireThat(copy.content_id === contentId, "CONTENT_ID_MISMATCH", "requested Content ID differs from file");
  requireThat(copy.format === "CRSL", "FORMAT_INVALID", "pilot supports Carousel only");
  requireThat(copy.status === "COPY_APPROVED", "COPY_NOT_APPROVED", "a draft cannot enter preflight");
  requireThat(safeHttpsUrl(copy.approval_record_url) &&
    new URL(copy.approval_record_url).hostname === "linear.app" &&
    /\/issue\/BUS-[0-9]+(?:\/|$)/.test(new URL(copy.approval_record_url).pathname),
    "APPROVAL_REFERENCE_INVALID", "provide the existing CWC Linear approval record URL");
  requireThat(typeof copy.sensitive_claim === "boolean", "SCHEMA_INVALID", "sensitive_claim must be boolean");
  requireThat(Array.isArray(copy.slides) && copy.slides.length > 0, "SLIDES_INVALID", "at least one ordered slide is required");
  copy.slides.forEach((slide, i) => {
    exactKeys(slide, SLIDE_KEYS, "slide");
    requireThat(slide.slide === i + 1, "SLIDE_ORDER_INVALID", "slides must be numbered 1..N in order");
    requireThat(isNonEmptyText(slide.text), "SLIDE_TEXT_INVALID", "each slide needs frozen nonblank copy");
  });
  requireThat(Array.isArray(copy.source_evidence), "SOURCES_INVALID", "source_evidence must be an array");
  if (copy.sensitive_claim) {
    requireThat(copy.source_evidence.length > 0, "SOURCES_MISSING", "sensitive clinical claims require cited source records");
  }
  copy.source_evidence.forEach((s) => {
    exactKeys(s, SOURCE_KEYS, "source");
    requireThat(isNonEmptyText(s.claim) && safeHttpsUrl(s.source_url) &&
      /^\d{4}-\d{2}-\d{2}$/.test(s.checked_at) &&
      !Number.isNaN(Date.parse(s.checked_at)),
      "SOURCES_INVALID", "source records require a claim, HTTPS URL and ISO check date");
  });
  requireThat(isNonEmptyText(copy.caption), "CAPTION_INVALID", "caption cannot be blank");
  const tags = copy.caption.match(/#[\p{L}\p{N}_]+/gu) ?? [];
  requireThat(tags.length === 5 && new Set(tags.map((s) => s.toLowerCase())).size === 5,
    "CAPTION_HASHTAGS_INVALID", "CWC caption requires exactly five unique hashtags");
  requireThat(typeof copy.local_hashtag === "string" &&
    tags.some((tag) => tag.toLowerCase() === copy.local_hashtag.toLowerCase()),
    "CAPTION_LOCAL_TAG_MISSING", "selected local hashtag must appear among the five");
  requireThat(/^#(?:Manado|SulawesiUtara)$/i.test(copy.local_hashtag),
    "CAPTION_LOCAL_TAG_INVALID", "pilot accepts a Manado/SulawesiUtara geographic tag; locality relevance still needs human QA");
  requireThat(/@cozwecare\.id/i.test(copy.caption) && /\b(?:ikuti|follow)\b/i.test(copy.caption) &&
    /\b(?:bagikan|share)\b/i.test(copy.caption),
    "CAPTION_CTA_MISSING", "follow/share CTA and official account must be present");
  requireThat(FP_PATTERN.test(copy.copy_fingerprint), "FINGERPRINT_INVALID", "copy fingerprint must be lowercase SHA-256");
  requireThat(FP_PATTERN.test(expectedFingerprint ?? ""), "EXPECTED_FINGERPRINT_INVALID", "independently pinned expected SHA-256 required");
  requireThat(copy.copy_fingerprint === fingerprintOf(copy) &&
    copy.copy_fingerprint === expectedFingerprint,
    "FINGERPRINT_MISMATCH", "approved payload does not match both internal and dispatcher fingerprints");
  return {
    result: "COPY_PREFLIGHT_PASS",
    schema: "cwc-copy-preflight-evidence-v1",
    content_id: copy.content_id,
    copy_fingerprint: copy.copy_fingerprint,
    slide_count: copy.slides.length,
    sensitive_claim: copy.sensitive_claim,
    source_record_count: copy.source_evidence.length,
    approval_evidence_locator: copy.approval_record_url,
    approval_evidence_verified: false,
    content_register_verified: false,
    research_claims_verified: false,
    deterministic_render_performed: false,
    technical_visual_qa_passed: false,
    final_owner_approval_granted: false,
    publication_authorized: false,
    next_action: "Verify live CWC authority + research/QA before any renderer integration"
  };
}
function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    if (!["--content-id", "--expected-copy-fingerprint", "--out"].includes(key) ||
      !args[i + 1] || key.slice(2) in options) {
      reject("ARGUMENT_INVALID", "use --content-id, --expected-copy-fingerprint and --out once each");
    }
    options[key.slice(2)] = args[i + 1];
  }
  requireThat(Object.keys(options).length === 3, "ARGUMENT_INVALID", "all three arguments are mandatory");
  return options;
}
function main() {
  const args = parseArgs(process.argv.slice(2));
  requireThat(ID_PATTERN.test(args["content-id"]), "CONTENT_ID_INVALID", "invalid Carousel ID");
  const file = path.join(ROOT, args["content-id"] + ".json");
  requireThat(fs.existsSync(file), "COPY_NOT_FOUND", "no canonical copy file for this ID");
  const copy = JSON.parse(fs.readFileSync(file, "utf8"));
  const evidence = validateCopy(copy, {
    contentId: args["content-id"],
    expectedFingerprint: args["expected-copy-fingerprint"]
  });
  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, JSON.stringify(evidence, null, 2) + "\n");
  process.stdout.write("COPY_PREFLIGHT_PASS — no render, approval, or publication authority granted\n");
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (e) { process.stderr.write(String(e.message) + "\n"); process.exitCode = 1; }
}
