import {
  GenerationContractError,
  createRequestFingerprint,
  createResponseFingerprint,
  finalizeGenerationResponse,
  validateGeneratedCandidate,
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
    research_ref: "BUS-26@v1.14",
  },
  authority_packet: {
    theme_semantics: "Sage uses recognition, permission, and accompaniment without forced positivity.",
    carousel_copy_rules: "Produce exactly five concise slides forming one coherent narrative thread.",
    caption_rules: "Caption expands rather than repeats the visual copy and uses the current SDOH signature architecture.",
    safety_rules: "Do not diagnose, prescribe, or turn uncertainty into a definitive psychological claim.",
    research_rules: "Flag any research-sensitive or clinical claim for review rather than inventing support.",
  },
  duplication_context: "No direct duplicate found; adjacent topics concern limited energy and rest but not adaptive rhythm.",  semantic_guardrails: {
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

const normalized = validateGenerationRequest(request);
const requestFingerprint = createRequestFingerprint(normalized);

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

validateGeneratedCandidate(candidate, {
  expectedContentId: request.content_id,
  expectedRiskClass: request.risk_class,
});
console.log("PASS candidate validation");

expectContractError("semantic drift rejected", "SEMANTIC_ALIGNMENT_FAILED", () => {
  finalizeGenerationResponse({
    ...candidate,
    slides: [
      { slide: 1, copy: "hati berat" },
      { slide: 2, copy: "beban terlalu banyak" },
      { slide: 3, copy: "perlu waktu sendiri" },
      { slide: 4, copy: "izin untuk berhenti" },
      { slide: 5, copy: "napas dalam diam" },
    ],
  }, {
    request,
    provider: "self-test",
    model: "deterministic-fixture",
  });
});
console.log("PASS semantic drift rejected");

expectContractError("editorial thin copy rejected", "EDITORIAL_QUALITY_FAILED", () => {
  finalizeGenerationResponse({
    ...candidate,
    slides: [
      { slide: 1, copy: "ritme berubah" },
      { slide: 2, copy: "menyesuaikan diri" },
      { slide: 3, copy: "tanpa rasa gagal" },
      { slide: 4, copy: "izin untuk berubah" },
      { slide: 5, copy: "menerima ritme baru" },
    ],
    caption: "Mengenal ritme hati yang berubah. Memberi izin pada diri untuk menyesuaikan, tanpa takut gagal. Satu dosis obat hati #satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja",
  }, {
    request,
    provider: "self-test",
    model: "deterministic-fixture",
  });
});
console.log("PASS editorial thin copy rejected");


const finalResponse = finalizeGenerationResponse(candidate, {
  request,
  provider: "self-test",
  model: "deterministic-fixture",
});
if (finalResponse.generation_metadata.request_fingerprint !== requestFingerprint) {
  fail("gateway request fingerprint mismatch");
}
if (finalResponse.generation_metadata.response_fingerprint !== createResponseFingerprint(finalResponse)) {
  fail("gateway response fingerprint mismatch");
}
validateGenerationResponse(finalResponse, {
  expectedContentId: request.content_id,
  expectedRequestFingerprint: requestFingerprint,
  expectedRiskClass: request.risk_class,
});
console.log("PASS gateway-owned fingerprints");

expectContractError("wrong content id", "CONTENT_ID_MISMATCH", () => {
  validateGeneratedCandidate({ ...candidate, content_id: "SDOH-SAGE-CAR-0010" }, {
    expectedContentId: request.content_id,
    expectedRiskClass: request.risk_class,
  });
});

expectContractError("four slides", "SLIDE_COUNT_INVALID", () => {
  validateGeneratedCandidate({ ...candidate, slides: candidate.slides.slice(0, 4) }, {
    expectedContentId: request.content_id,
    expectedRiskClass: request.risk_class,
  });
});

expectContractError("six slides", "SLIDE_COUNT_INVALID", () => {
  validateGeneratedCandidate({
    ...candidate,
    slides: [...candidate.slides, { slide: 6, copy: "extra slide" }],
  }, {
    expectedContentId: request.content_id,
    expectedRiskClass: request.risk_class,
  });
});

expectContractError("malformed response", "SCHEMA_VERSION_INVALID", () => {
  const malformed = structuredClone(candidate);
  delete malformed.schema_version;
  validateGeneratedCandidate(malformed, {
    expectedContentId: request.content_id,
    expectedRiskClass: request.risk_class,
  });
});

const reviewRequest = {
  ...request,
  content_id: "SDOH-SAGE-CAR-0099",
  risk_class: "REVIEW_REQUIRED",
};

expectContractError("review required preservation", "REVIEW_REQUIRED_NOT_PRESERVED", () => {
  validateGeneratedCandidate({ ...candidate, content_id: reviewRequest.content_id }, {
    expectedContentId: reviewRequest.content_id,
    expectedRiskClass: reviewRequest.risk_class,
  });
});

const reviewCandidate = {
  ...candidate,
  content_id: reviewRequest.content_id,
  risk_flags: ["REVIEW_REQUIRED"],
};
finalizeGenerationResponse(reviewCandidate, {
  request: reviewRequest,
  provider: "self-test",
  model: "deterministic-fixture",
});
console.log("PASS review required preserved");

expectContractError("request theme mismatch", "THEME_CONTENT_ID_MISMATCH", () => {
  validateGenerationRequest({ ...request, theme: "BURGUNDY" });
});

expectContractError("authority packet missing", "AUTHORITY_PACKET_INVALID", () => {
  const invalid = structuredClone(request);
  delete invalid.authority_packet;
  validateGenerationRequest(invalid);
});

const mutatedAuthority = structuredClone(request);
mutatedAuthority.authority_packet.caption_rules += " Updated.";
if (createRequestFingerprint(mutatedAuthority) === requestFingerprint) {
  fail("authority packet mutation must change request fingerprint");
}
console.log("PASS authority packet participates in request fingerprint");

console.log("SDOH model-generation contract self-test PASS");
