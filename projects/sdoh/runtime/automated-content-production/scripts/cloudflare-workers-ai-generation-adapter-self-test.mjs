import {
  CloudflareGenerationError,
  DEFAULT_CLOUDFLARE_MODEL,
  buildCloudflareWorkersAIRequest,
  generateWithCloudflareWorkersAI,
} from "./cloudflare-workers-ai-generation-adapter.mjs";
import { createResponseFingerprint } from "./model-generation-contract.mjs";

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
    "No direct duplicate found; distinguish from limited-energy, rest, disappointment, and recovery topics.",
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
  providerRequest.body.response_format.json_schema.properties.generation_metadata
) {
  fail("model schema must not request trusted generation metadata");
}
console.log("PASS Cloudflare JSON Mode request excludes trusted metadata");

const candidate = {
  schema_version: "1",
  content_id: request.content_id,
  slides: [
    { slide: 1, copy: "ritmemu boleh berubah" },
    { slide: 2, copy: "kapasitasmu tidak selalu sama setiap hari" },
    { slide: 3, copy: "menyesuaikan langkah bukan berarti gagal" },
    { slide: 4, copy: "kamu boleh memilih ritme yang lebih mungkin dijalani" },
    { slide: 5, copy: "pelan tetap bisa menjadi cara untuk berjalan" },
  ],
  caption:
    "kadang menyesuaikan ritme adalah cara untuk tetap hadir pada hidup yang sedang berubah.",
  risk_flags: [],
  research_sensitive_claims: [],
};

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
        return {
          success: true,
          errors: [],
          messages: [],
          result: { response: candidate },
        };
      },
    };
  },
});

if (!observedUrl.includes("/ai/run/@cf/meta/llama-3.3-70b-instruct-fp8-fast")) {
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

console.log("SDOH Cloudflare Workers AI generation adapter self-test PASS");
