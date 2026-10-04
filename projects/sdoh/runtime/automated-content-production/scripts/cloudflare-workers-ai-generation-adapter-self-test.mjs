import {
  CloudflareGenerationError,
  DEFAULT_CLOUDFLARE_MODEL,
  buildCloudflareWorkersAIRequest,
  generateWithCloudflareWorkersAI,
} from "./cloudflare-workers-ai-generation-adapter.mjs";
import { canonicalJson, createRequestFingerprint, createResponseFingerprint, sha256Hex } from "./model-generation-contract.mjs";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

function fail(message) {
  throw new Error(message);
}

async function expectError(name, code, fn) {
  try {
    await fn();
  } catch (error) {
    if (!(error instanceof CloudflareGenerationError)) {
      fail(`${name}: expected CloudflareGenerationError, got ${error?.name || typeof error}`);
    }
    if (error.code !== code) {
      fail(`${name}: expected ${code}, got ${error.code}`);
    }
    console.log(`PASS ${name}: ${code}`);
    return;
  }
  fail(`${name}: expected failure ${code}`);
}

const request = {
  content_id: "SDOH-SAGE-CAR-0009",
  theme: "SAGE",
  format: "CAROUSEL",
  core_concept:
    "Memberi izin menyesuaikan ritme ketika kapasitas, keadaan, atau kebutuhan berubah tanpa menganggap adaptasi sebagai kegagalan.",
  campaign_context: "October 2026 Sage Carousel schedule",
  risk_class: "STANDARD",
  governance_context: {
    project_architecture_ref: "BUS-24@v1.13",
    production_sop_ref: "BUS-25@v1.40",
    qa_ref: "BUS-27@v1.31",
    format_lane_ref: "BUS-47",
    research_ref: "BUS-26@v1.14",
  },
  authority_packet: {
    theme_semantics:
      "Sage uses recognition, permission, and accompaniment without forced positivity.",
    carousel_copy_rules:
      "Exactly five concise slides following The Gentle Naming.",
    caption_rules:
      "Caption expands rather than repeats visual copy and keeps the fixed project footer.",
    safety_rules:
      "Do not diagnose, prescribe, or turn uncertainty into a definitive psychological claim.",
    research_rules:
      "Flag research-sensitive claims instead of inventing evidence.",
  },
  duplication_context:
    "No direct duplicate found; distinguish from limited-energy, rest, disappointment, and recovery topics.",  semantic_guardrails: {
    required_slide_anchor_groups: [
      ["ritme"],
      ["menyesuaikan", "mengubah", "berubah"],
      ["gagal", "kegagalan"],
    ],
    minimum_required_slide_anchor_groups: 2,
    forbidden_slide_phrases: [
      "beban terlalu banyak",
      "perlu waktu sendiri",
      "izin untuk berhenti",
      "napas dalam diam",
    ],
  },
  editorial_quality_guardrails: {
    min_words_per_slide: [5, 5, 5, 5, 5],
    max_words_per_slide: [9, 9, 9, 9, 9],
    min_total_slide_words: 30,
    min_unique_slide_content_words: 18,
    max_pairwise_content_similarity: 0.72,
    slide_progression: [
      { slide: 1, required_anchor_groups: [["ritme"], ["berubah", "berbeda", "tidak sama"]], minimum_groups: 2 },
      { slide: 2, required_anchor_groups: [["kapasitas", "keadaan", "kebutuhan", "hari ini"], ["cara", "menjalani", "langkah", "ritme"]], minimum_groups: 2 },
      { slide: 3, required_anchor_groups: [["menyesuaikan", "adaptasi", "langkah"], ["gagal", "kegagalan"]], minimum_groups: 2 },
      { slide: 4, required_anchor_groups: [["boleh", "izin"], ["memilih", "menyesuaikan", "cara", "ritme"]], minimum_groups: 2 },
      { slide: 5, required_anchor_groups: [["berjalan", "melangkah", "lanjut"], ["cara", "ritme", "sama", "berbeda"]], minimum_groups: 2 },
    ],
    caption_min_body_words: 45,
    caption_max_body_words: 110,
    caption_min_body_paragraphs: 3,
    caption_required_signature: "satu dosis obat hati",
    caption_required_hashtags: [
      "#satudosisobathati",
      "#obathati",
      "#manado",
      "#mentalhealthmanado",
      "#pelanpelanaja",
    ],
  },


};

const providerRequest = buildCloudflareWorkersAIRequest({ request });
if (providerRequest.model !== DEFAULT_CLOUDFLARE_MODEL) {
  fail("default model mismatch");
}
if (providerRequest.body.stream !== false) {
  fail("JSON Mode must remain non-streaming");
}
if (
  providerRequest.body.response_format?.type !== "json_schema" ||
  !providerRequest.body.response_format?.json_schema
) {
  fail("Workers AI JSON Mode schema is missing");
}
if (
  providerRequest.body.response_format.json_schema.schema.properties.generation_metadata
) {
  fail("model schema must not request trusted generation metadata");
}
console.log("PASS Cloudflare JSON Mode request excludes trusted metadata");

const schema = providerRequest.body.response_format.json_schema.schema;
if (providerRequest.body.response_format.json_schema.strict !== true || providerRequest.body.reasoning_effort !== "high" || providerRequest.body.max_completion_tokens !== 8192 || providerRequest.body.max_tokens) fail("Kimi structured reasoning configuration mismatch");
const copySchema = schema.properties.slides.items.properties.copy;
if (copySchema.minLength !== 24 || copySchema.maxLength !== 90) {
  fail("slide copy schema bounds mismatch");
}
const captionSchema = schema.properties.caption_body_paragraphs;
if (captionSchema.type !== "array" || captionSchema.minItems !== 3 || schema.properties.caption) fail("structured caption body schema mismatch");
const instructions = providerRequest.body.messages[0].content;
if (!instructions.includes("S1 [sparse]: 5-6 words (gate 5-9); MUST contain (\"ritme\") AND")) fail("S1 word-count/anchor constraint missing");
if (!instructions.includes("S3 [peak]: 8-9 words (gate 5-9); MUST contain")) fail("S3 peak constraint missing");
if (!instructions.includes("body total 45-110 words")) fail("caption word-count constraint missing");
if (!instructions.includes("exactly 3 paragraphs")) fail("caption paragraph constraint missing");
if (!instructions.includes("Never write a two-, three- or four-word label")) fail("anti-fragment density mapping missing");
if (instructions.includes("RETRY REMEDIATION")) fail("first-attempt prompt must not carry a remediation hint");
console.log("PASS explicit editorial constraints surfaced");

const candidate = {
  schema_version: "1",
  content_id: request.content_id,
  slides: [
    { slide: 1, copy: "ritme yang dulu terasa pas bisa berubah hari ini" },
    { slide: 2, copy: "kapasitasmu berubah begitu juga cara kamu menjalaninya" },
    { slide: 3, copy: "menyesuaikan langkah bukan berarti kamu gagal" },
    { slide: 4, copy: "kamu boleh memilih ritme yang lebih mungkin dijalani" },
    { slide: 5, copy: "tetap berjalan tak harus dengan cara yang sama" },
  ],
  caption: "Kadang yang berubah bukan niatmu, tapi kapasitas, keadaan, atau kebutuhanmu.\n\nMenyesuaikan ritme bukan berarti kamu kehilangan arah atau gagal menjaga komitmen. Ada waktu ketika cara lama memang tidak lagi cocok dengan hidup yang sedang kamu jalani.\n\nKamu boleh mencari cara yang lebih mungkin dijalani sekarang, tanpa harus menganggap perubahan itu sebagai kekalahan.\n\nsatu dosis obat hati\n#satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja",
  risk_flags: [],
  research_sensitive_claims: [],
};

function providerOutput(canonicalCandidate) {
  const { caption, ...fields } = canonicalCandidate;
  return { ...fields, caption_body_paragraphs: caption.split("\n\nsatu dosis obat hati")[0].split("\n\n") };
}

function providerEnvelope(payload, finishReason = "stop") {
  return { success: true, result: { choices: [{ finish_reason: finishReason, message: { role: "assistant", content: JSON.stringify(payload), reasoning_content: "TEST_INTERNAL_REASONING_MUST_NOT_LEAK" } }] } };
}

let observedAuth = null;
let observedUrl = null;
let observedBody = null;

const token = "cf-test-token-abcdefghijklmnopqrstuvwxyz0123456789";
const accountId = "0123456789abcdef0123456789abcdef";

const result = await generateWithCloudflareWorkersAI({
  request,
  accountId,
  apiToken: token,
  fetchImpl: async (url, options) => {
    observedUrl = url;
    observedAuth = options.headers.Authorization;
    observedBody = JSON.parse(options.body);
    return {
      ok: true,
      status: 200,
      async json() {
        return providerEnvelope(providerOutput(candidate));
      },
    };
  },
});

if (!observedUrl.includes("/ai/run/@cf/moonshotai/kimi-k2.6")) {
  fail("Workers AI endpoint mismatch");
}
if (observedAuth !== `Bearer ${token}`) {
  fail("Authorization header mismatch");
}
if (JSON.stringify(observedBody).includes(token)) {
  fail("Cloudflare API token leaked into request body");
}
if (result.generation_metadata.provider !== "cloudflare-workers-ai") {
  fail("provider metadata mismatch");
}
if (result.generation_metadata.model !== DEFAULT_CLOUDFLARE_MODEL) {
  fail("model metadata mismatch");
}
if (
  result.generation_metadata.response_fingerprint !==
  createResponseFingerprint(result)
) {
  fail("response fingerprint mismatch");
}
console.log("PASS successful Workers AI normalization and gateway fingerprints");
if (result.caption !== candidate.caption) fail("assembled caption changed body or footer");
if (result.caption_body_paragraphs) fail("provider-only caption field leaked into canonical contract");
if (JSON.stringify(result).includes("TEST_INTERNAL_REASONING_MUST_NOT_LEAK")) fail("reasoning leaked into candidate");
console.log("PASS body preserved and fixed caption footer assembled deterministically");

await expectError("legacy free-form caption is not silently repaired", "CLOUDFLARE_OUTPUT_INVALID", () =>
  generateWithCloudflareWorkersAI({ request, accountId, apiToken: token, fetchImpl: async () => ({ ok: true, status: 200, json: async () => providerEnvelope(candidate) }) })
);

const sparse = structuredClone(candidate);
sparse.slides[2].copy = "Menyesuaikan langkah, bukan gagal.";
try {
  await generateWithCloudflareWorkersAI({ request, accountId, apiToken: token, fetchImpl: async () => ({ ok: true, status: 200, json: async () => providerEnvelope(providerOutput(sparse)) }) });
  fail("sparse copy must still fail after deterministic footer assembly");
} catch (error) {
  if (error.code !== "EDITORIAL_QUALITY_FAILED" || !error.message.includes("S3_TOO_SPARSE")) fail("sparse copy gate bypassed");
  if (error.rejectionDiagnostic.rejected_candidate.slides[2].copy !== sparse.slides[2].copy) fail("adapter edited rejected slide copy");
}
console.log("PASS deterministic footer cannot rescue editorially rejected slide copy");

await expectError("truncated Kimi response", "CLOUDFLARE_COMPLETION_INVALID", () =>
  generateWithCloudflareWorkersAI({ request, accountId, apiToken: token, fetchImpl: async () => ({ ok: true, status: 200, json: async () => providerEnvelope(providerOutput(candidate), "length") }) })
);
const legacyRequest = buildCloudflareWorkersAIRequest({ request, model: "@cf/meta/llama-4-scout-17b-16e-instruct" });
if (!legacyRequest.body.response_format.json_schema.properties || legacyRequest.body.reasoning_effort || legacyRequest.body.max_tokens !== 900) fail("legacy model request shape changed");

await expectError("missing account id", "CLOUDFLARE_ACCOUNT_ID_MISSING", () =>
  generateWithCloudflareWorkersAI({
    request,
    accountId: "",
    apiToken: token,
    fetchImpl: async () => {},
  })
);

await expectError("missing API token", "CLOUDFLARE_API_TOKEN_MISSING", () =>
  generateWithCloudflareWorkersAI({
    request,
    accountId,
    apiToken: "",
    fetchImpl: async () => {},
  })
);

await expectError("quota failure", "CLOUDFLARE_HTTP_ERROR", () =>
  generateWithCloudflareWorkersAI({
    request,
    accountId,
    apiToken: token,
    fetchImpl: async () => ({
      ok: false,
      status: 429,
      async json() {
        return {
          success: false,
          errors: [{ code: 3036, message: "daily free allocation exceeded" }],
          messages: [],
          result: null,
        };
      },
    }),
  })
);

await expectError("provider failure", "CLOUDFLARE_API_FAILURE", () =>
  generateWithCloudflareWorkersAI({
    request,
    accountId,
    apiToken: token,
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      async json() {
        return {
          success: false,
          errors: [{ code: 3040, message: "out of capacity" }],
          messages: [],
          result: null,
        };
      },
    }),
  })
);

// Exercise the actual CLI's three-attempt fail-closed path with a mocked provider.
const rejected = structuredClone(candidate);
rejected.caption = "Ini paragraf tunggal yang tidak memenuhi aturan editorial.\n\nsatu dosis obat hati\n#satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja";
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sdoh-rejection-test-"));
try {
  const requestPath = path.join(tempDir, "request.json");
  const outputPath = path.join(tempDir, "candidate.json");
  const diagnosticsDir = path.join(tempDir, "diagnostics");
  const mockPath = path.join(tempDir, "mock-provider.mjs");
  fs.writeFileSync(requestPath, JSON.stringify(request));
  fs.writeFileSync(mockPath, `globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => (${JSON.stringify(providerEnvelope(providerOutput(rejected)))}) });\n`);
  const cliPath = fileURLToPath(new URL("./generate-content-candidate.mjs", import.meta.url));
  const child = spawnSync(process.execPath, ["--import", mockPath, cliPath, "--request", requestPath, "--output", outputPath], {
    encoding: "utf8",
    env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: token, SDOH_GENERATION_MODEL: DEFAULT_CLOUDFLARE_MODEL, SDOH_GENERATION_DIAGNOSTICS_DIR: diagnosticsDir },
  });
  if (child.status !== 1) fail("rejected generation must exit 1");
  if (fs.existsSync(outputPath)) fail("rejected generation wrote an accepted candidate");
  const files = fs.readdirSync(diagnosticsDir).sort();
  if (files.length !== 3) fail("must retain all three rejected attempts");
  files.forEach((filename, index) => {
    const raw = fs.readFileSync(path.join(diagnosticsDir, filename), "utf8");
    const diagnostic = JSON.parse(raw);
    if (diagnostic.generation_attempt !== index + 1) fail("attempt order mismatch");
    if (diagnostic.candidate_state !== "REJECTED_NOT_FOR_RENDER" || diagnostic.owner_approval !== "NOT_GRANTED") fail("diagnostic state unsafe");
    if (diagnostic.gate_code !== "EDITORIAL_QUALITY_FAILED") fail("gate code lost");
    if (!diagnostic.gate_reason.includes("CAPTION_STRUCTURE_THIN") || diagnostic.gate_reason.includes("CAPTION_SIGNATURE_MISSING") || diagnostic.gate_reason.includes("CAPTION_HASHTAG_MISSING")) fail("assembled caption bypassed body gate or lost footer");
    if (diagnostic.rejected_candidate.caption !== rejected.caption) fail("rejected copy lost");
    if (diagnostic.raw_candidate_fingerprint !== sha256Hex(canonicalJson(rejected))) fail("raw payload fingerprint mismatch");
    if (index === 0 && diagnostic.request_fingerprint !== createRequestFingerprint(request)) fail("request fingerprint mismatch");
    if (raw.includes(token) || raw.includes(accountId)) fail("credentials leaked into diagnostic");
    if (raw.includes("TEST_INTERNAL_REASONING_MUST_NOT_LEAK")) fail("reasoning leaked into diagnostic");
    if (diagnostic.response_fingerprint || diagnostic.generation_metadata || diagnostic.approval || diagnostic.publication_state) fail("diagnostic implies accepted output");
  });
  // Retry feedback is a non-canonical provider hint: every attempt must carry
  // the same canonical request fingerprint, while the hint provenance differs.
  const retryDiagnostics = files.map(f => JSON.parse(fs.readFileSync(path.join(diagnosticsDir, f), "utf8")));
  if (new Set(retryDiagnostics.map(d => d.request_fingerprint)).size !== 1) fail("retry must not change the canonical request fingerprint");
  if (retryDiagnostics[0].request_fingerprint !== createRequestFingerprint(request)) fail("retry diagnostics lost canonical request fingerprint");
  if (retryDiagnostics[0].remediation_hint_fingerprint !== null) fail("first attempt must not carry a remediation hint");
  if (!retryDiagnostics.slice(1).every(d => /^[0-9a-f]{64}$/.test(d.remediation_hint_fingerprint || ""))) fail("retry attempts must record a remediation hint fingerprint");
  if (new Set(retryDiagnostics.map(d => d.remediation_hint_fingerprint)).size !== 3) fail("each attempt must record distinct remediation provenance");
  console.log("PASS three rejected attempts retained without accepted output or credentials");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log("SDOH Cloudflare Workers AI generation adapter self-test PASS");
