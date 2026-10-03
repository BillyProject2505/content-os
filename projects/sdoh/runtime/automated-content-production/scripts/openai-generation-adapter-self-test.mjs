import {
  buildOpenAIRequest,
  generateWithOpenAI,
  OpenAIGenerationError,
} from "./openai-generation-adapter.mjs";
import { createResponseFingerprint } from "./model-generation-contract.mjs";

function fail(message) {
  throw new Error(message);
}

async function expectError(name, code, fn) {
  try {
    await fn();
  } catch (error) {
    if (!(error instanceof OpenAIGenerationError)) {
      fail(`${name}: expected OpenAIGenerationError, got ${error?.name || typeof error}`);
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
  core_concept: "Memberi izin menyesuaikan ritme ketika kapasitas, keadaan, atau kebutuhan berubah tanpa menganggap adaptasi sebagai kegagalan.",
  campaign_context: "October 2026 Sage Carousel schedule",
  risk_class: "STANDARD",
  governance_context: {
    project_architecture_ref: "BUS-24@v1.13",
    production_sop_ref: "BUS-25@v1.39",
    qa_ref: "BUS-27@v1.31",
    format_lane_ref: "BUS-47",
    research_ref: "BUS-26@v1.14",
  },
  authority_packet: {
    theme_semantics: "Sage uses recognition, permission, and accompaniment without forced positivity.",
    carousel_copy_rules: "Exactly five concise slides forming one coherent narrative thread.",
    caption_rules: "Caption expands rather than repeats visual copy.",
    safety_rules: "Do not diagnose, prescribe, or turn uncertainty into a definitive psychological claim.",
    research_rules: "Flag research-sensitive claims instead of inventing evidence.",
  },
  duplication_context: "No direct duplicate found; distinguish from limited-energy and rest topics.",  semantic_guardrails: {
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

const payload = buildOpenAIRequest({ request, model: "gpt-5.6-terra" });
if (payload.model !== "gpt-5.6-terra") fail("model mismatch");
if (payload.store !== false) fail("store must be false");
if (payload.text?.format?.type !== "json_schema" || payload.text?.format?.strict !== true) {
  fail("structured outputs must be strict json_schema");
}
if (payload.text.format.schema.properties.generation_metadata) {
  fail("model schema must not request trusted generation metadata");
}
console.log("PASS request uses strict Structured Outputs and excludes trusted metadata");

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

let observedAuth = null;
let observedBody = null;
const mockFetch = async (_url, options) => {
  observedAuth = options.headers.Authorization;
  observedBody = JSON.parse(options.body);
  return {
    ok: true,
    status: 200,
    async json() {
      return {
        id: "resp_selftest",
        status: "completed",
        output: [
          {
            type: "message",
            content: [
              { type: "output_text", text: JSON.stringify(candidate) },
            ],
          },
        ],
      };
    },
  };
};

const secret = "sk-test-abcdefghijklmnopqrstuvwxyz0123456789";
const result = await generateWithOpenAI({
  request,
  apiKey: secret,
  model: "gpt-5.6-terra",
  fetchImpl: mockFetch,
});
if (observedAuth !== `Bearer ${secret}`) fail("Authorization header mismatch");
if (JSON.stringify(observedBody).includes(secret)) fail("API key leaked into request body");
if (result.content_id !== request.content_id) fail("content ID mismatch");
if (result.generation_metadata.provider !== "openai") fail("provider metadata mismatch");
if (result.generation_metadata.model !== "gpt-5.6-terra") fail("model metadata mismatch");
if (result.generation_metadata.response_fingerprint !== createResponseFingerprint(result)) {
  fail("response fingerprint mismatch");
}
console.log("PASS successful response normalization and gateway-owned fingerprints");

await expectError("missing API key", "OPENAI_API_KEY_MISSING", () =>
  generateWithOpenAI({ request, apiKey: "", fetchImpl: mockFetch })
);

await expectError("provider refusal", "OPENAI_REFUSAL", () =>
  generateWithOpenAI({
    request,
    apiKey: secret,
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      async json() {
        return {
          status: "completed",
          output: [{ type: "message", content: [{ type: "refusal", refusal: "no" }] }],
        };
      },
    }),
  })
);

await expectError("incomplete response", "OPENAI_RESPONSE_INCOMPLETE", () =>
  generateWithOpenAI({
    request,
    apiKey: secret,
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      async json() {
        return { status: "incomplete", output: [] };
      },
    }),
  })
);

await expectError("http failure", "OPENAI_HTTP_ERROR", () =>
  generateWithOpenAI({
    request,
    apiKey: secret,
    fetchImpl: async () => ({
      ok: false,
      status: 429,
      async json() {
        return { error: { code: "rate_limit_exceeded", message: "not logged" } };
      },
    }),
  })
);

console.log("SDOH OpenAI generation adapter self-test PASS");
