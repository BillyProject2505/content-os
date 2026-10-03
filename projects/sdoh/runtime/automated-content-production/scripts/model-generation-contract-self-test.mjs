import {
  GenerationContractError,
  createRequestFingerprint,
  createResponseFingerprint,
  validateGenerationRequest,
  validateGenerationResponse,
} from "./model-generation-contract.mjs";

function fail(message) {
  throw new Error(message);
}

function expectContractError(name, expectedCode, fn) {
  try {
    fn();
  } catch (error) {
    if (!(error instanceof GenerationContractError)) {
      fail(`${name}: expected GenerationContractError, got ${error?.name || typeof error}`);
    }
    if (error.code !== expectedCode) {
      fail(`${name}: expected ${expectedCode}, got ${error.code}`);
    }
    console.log(`PASS ${name}: ${error.code}`);
    return;
  }
  fail(`${name}: expected failure ${expectedCode}`);
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
    research_ref: "BUS-26",
  },
};

const normalized = validateGenerationRequest(request);
const requestFingerprint = createRequestFingerprint(normalized);

const validResponse = {
  schema_version: "1",
  content_id: request.content_id,
  slides: [
    { slide: 1, copy: "kadang ritmemu memang perlu berubah" },
    { slide: 2, copy: "kapasitasmu hari ini tidak harus sama dengan kemarin" },
    { slide: 3, copy: "menyesuaikan langkah bukan berarti menyerah" },
    { slide: 4, copy: "kamu boleh memilih ritme yang lebih mungkin dijalani" },
    { slide: 5, copy: "pelan tetap bisa menjadi cara untuk terus berjalan" },
  ],
  caption: "ritme yang berubah tidak selalu berarti kamu gagal.",
  risk_flags: [],
  research_sensitive_claims: [],
  generation_metadata: {
    provider: "self-test",
    model: "deterministic-fixture",
    request_fingerprint: requestFingerprint,
    response_fingerprint: "",
  },
};
validResponse.generation_metadata.response_fingerprint = createResponseFingerprint(validResponse);

const result = validateGenerationResponse(validResponse, {
  expectedContentId: request.content_id,
  expectedRequestFingerprint: requestFingerprint,
  expectedRiskClass: request.risk_class,
});

if (!result.ok) fail("valid response did not pass");
console.log("PASS valid response");

expectContractError("wrong content id", "CONTENT_ID_MISMATCH", () => {
  const response = structuredClone(validResponse);
  response.content_id = "SDOH-SAGE-CAR-0010";
  response.generation_metadata.response_fingerprint = createResponseFingerprint(response);
  validateGenerationResponse(response, {
    expectedContentId: request.content_id,
    expectedRequestFingerprint: requestFingerprint,
    expectedRiskClass: request.risk_class,
  });
});

expectContractError("four slides", "SLIDE_COUNT_INVALID", () => {
  const response = structuredClone(validResponse);
  response.slides = response.slides.slice(0, 4);
  response.generation_metadata.response_fingerprint = createResponseFingerprint(response);
  validateGenerationResponse(response, {
    expectedContentId: request.content_id,
    expectedRequestFingerprint: requestFingerprint,
    expectedRiskClass: request.risk_class,
  });
});

expectContractError("six slides", "SLIDE_COUNT_INVALID", () => {
  const response = structuredClone(validResponse);
  response.slides.push({ slide: 6, copy: "extra slide" });
  response.generation_metadata.response_fingerprint = createResponseFingerprint(response);
  validateGenerationResponse(response, {
    expectedContentId: request.content_id,
    expectedRequestFingerprint: requestFingerprint,
    expectedRiskClass: request.risk_class,
  });
});

expectContractError("malformed response", "SCHEMA_VERSION_INVALID", () => {
  const response = structuredClone(validResponse);
  delete response.schema_version;
  response.generation_metadata.response_fingerprint = createResponseFingerprint(response);
  validateGenerationResponse(response, {
    expectedContentId: request.content_id,
    expectedRequestFingerprint: requestFingerprint,
    expectedRiskClass: request.risk_class,
  });
});

const reviewRequest = {
  ...request,
  content_id: "SDOH-SAGE-CAR-0099",
  risk_class: "REVIEW_REQUIRED",
};
const reviewFingerprint = createRequestFingerprint(reviewRequest);

expectContractError("review required preservation", "REVIEW_REQUIRED_NOT_PRESERVED", () => {
  const response = structuredClone(validResponse);
  response.content_id = reviewRequest.content_id;
  response.generation_metadata.request_fingerprint = reviewFingerprint;
  response.risk_flags = [];
  response.generation_metadata.response_fingerprint = createResponseFingerprint(response);
  validateGenerationResponse(response, {
    expectedContentId: reviewRequest.content_id,
    expectedRequestFingerprint: reviewFingerprint,
    expectedRiskClass: reviewRequest.risk_class,
  });
});

const reviewResponse = structuredClone(validResponse);
reviewResponse.content_id = reviewRequest.content_id;
reviewResponse.generation_metadata.request_fingerprint = reviewFingerprint;
reviewResponse.risk_flags = ["REVIEW_REQUIRED"];
reviewResponse.generation_metadata.response_fingerprint = createResponseFingerprint(reviewResponse);
validateGenerationResponse(reviewResponse, {
  expectedContentId: reviewRequest.content_id,
  expectedRequestFingerprint: reviewFingerprint,
  expectedRiskClass: reviewRequest.risk_class,
});
console.log("PASS review required preserved");

expectContractError("request theme mismatch", "THEME_CONTENT_ID_MISMATCH", () => {
  validateGenerationRequest({ ...request, theme: "BURGUNDY" });
});

console.log("SDOH model-generation contract self-test PASS");
