import { createHash } from "node:crypto";

export class GenerationContractError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "GenerationContractError";
    this.code = code;
  }
}

function assert(condition, code, message) {
  if (!condition) throw new GenerationContractError(code, message);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])])
    );
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function sha256Hex(value) {
  return createHash("sha256").update(value).digest("hex");
}

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStringArray(value, code, field) {
  assert(Array.isArray(value), code, `${field} must be an array`);
  for (const entry of value) {
    assert(nonEmptyString(entry), code, `${field} entries must be non-empty strings`);
  }
}

export function validateGenerationRequest(input) {
  assert(input && typeof input === "object" && !Array.isArray(input), "REQUEST_INVALID", "request must be an object");

  const {
    content_id,
    theme,
    format,
    core_concept,
    campaign_context,
    risk_class,
    governance_context,
    authority_packet,
    duplication_context,
  } = input;

  assert(
    /^SDOH-(SAGE|BURGUNDY)-CAR-\d{4}$/.test(content_id || ""),
    "CONTENT_ID_INVALID",
    "content_id must be an SDOH Sage/Burgundy Carousel ID"
  );
  assert(theme === "SAGE" || theme === "BURGUNDY", "THEME_INVALID", "theme must be SAGE or BURGUNDY");
  assert(
    content_id.startsWith(`SDOH-${theme}-CAR-`),
    "THEME_CONTENT_ID_MISMATCH",
    "theme must match content_id"
  );
  assert(format === "CAROUSEL", "FORMAT_INVALID", "format must be CAROUSEL");
  assert(nonEmptyString(core_concept), "CORE_CONCEPT_MISSING", "core_concept is required");
  assert(typeof campaign_context === "string", "CAMPAIGN_CONTEXT_INVALID", "campaign_context must be a string");
  assert(
    risk_class === "STANDARD" || risk_class === "REVIEW_REQUIRED",
    "RISK_CLASS_INVALID",
    "risk_class must be STANDARD or REVIEW_REQUIRED"
  );

  assert(
    governance_context && typeof governance_context === "object" && !Array.isArray(governance_context),
    "GOVERNANCE_CONTEXT_INVALID",
    "governance_context must be an object"
  );

  const governanceKeys = [
    "project_architecture_ref",
    "production_sop_ref",
    "qa_ref",
    "format_lane_ref",
    "research_ref",
  ];
  for (const key of governanceKeys) {
    assert(nonEmptyString(governance_context[key]), "GOVERNANCE_REF_MISSING", `governance_context.${key} is required`);
  }

  assert(
    authority_packet && typeof authority_packet === "object" && !Array.isArray(authority_packet),
    "AUTHORITY_PACKET_INVALID",
    "authority_packet must be an object"
  );
  const authorityKeys = [
    "theme_semantics",
    "carousel_copy_rules",
    "caption_rules",
    "safety_rules",
    "research_rules",
  ];
  for (const key of authorityKeys) {
    assert(nonEmptyString(authority_packet[key]), "AUTHORITY_PACKET_FIELD_MISSING", `authority_packet.${key} is required`);
  }

  assert(nonEmptyString(duplication_context), "DUPLICATION_CONTEXT_MISSING", "duplication_context is required");

  return {
    content_id,
    theme,
    format,
    core_concept: core_concept.trim(),
    campaign_context,
    risk_class,
    governance_context: Object.fromEntries(governanceKeys.map((key) => [key, governance_context[key]])),
    authority_packet: Object.fromEntries(authorityKeys.map((key) => [key, authority_packet[key]])),
    duplication_context: duplication_context.trim(),
  };
}

export function createRequestFingerprint(input) {
  return sha256Hex(canonicalJson(validateGenerationRequest(input)));
}

export function createResponseFingerprint(response) {
  assert(response && typeof response === "object" && !Array.isArray(response), "RESPONSE_INVALID", "response must be an object");
  const copy = structuredClone(response);
  if (copy.generation_metadata && typeof copy.generation_metadata === "object") {
    delete copy.generation_metadata.response_fingerprint;
  }
  return sha256Hex(canonicalJson(copy));
}

export function validateGeneratedCandidate(candidate, { expectedContentId, expectedRiskClass }) {
  assert(candidate && typeof candidate === "object" && !Array.isArray(candidate), "CANDIDATE_INVALID", "candidate must be an object");
  assert(candidate.schema_version === "1", "SCHEMA_VERSION_INVALID", "schema_version must be 1");
  assert(candidate.content_id === expectedContentId, "CONTENT_ID_MISMATCH", "candidate content_id does not match request");

  assert(Array.isArray(candidate.slides), "SLIDES_INVALID", "slides must be an array");
  assert(candidate.slides.length === 5, "SLIDE_COUNT_INVALID", "slides must contain exactly five entries");
  candidate.slides.forEach((slide, index) => {
    assert(slide && typeof slide === "object" && !Array.isArray(slide), "SLIDE_INVALID", `slide ${index + 1} must be an object`);
    assert(slide.slide === index + 1, "SLIDE_ORDER_INVALID", `slide ${index + 1} has an invalid slide number`);
    assert(nonEmptyString(slide.copy), "SLIDE_COPY_MISSING", `slide ${index + 1} copy is required`);
  });

  assert(nonEmptyString(candidate.caption), "CAPTION_MISSING", "caption is required");
  validateStringArray(candidate.risk_flags, "RISK_FLAGS_INVALID", "risk_flags");
  validateStringArray(candidate.research_sensitive_claims, "RESEARCH_CLAIMS_INVALID", "research_sensitive_claims");

  if (expectedRiskClass === "REVIEW_REQUIRED") {
    assert(
      candidate.risk_flags.includes("REVIEW_REQUIRED"),
      "REVIEW_REQUIRED_NOT_PRESERVED",
      "REVIEW_REQUIRED input must remain explicitly flagged in the candidate"
    );
  }

  return structuredClone(candidate);
}

export function finalizeGenerationResponse(candidate, { request, provider, model }) {
  assert(nonEmptyString(provider), "PROVIDER_MISSING", "provider is required");
  assert(nonEmptyString(model), "MODEL_MISSING", "model is required");

  const normalizedRequest = validateGenerationRequest(request);
  const normalizedCandidate = validateGeneratedCandidate(candidate, {
    expectedContentId: normalizedRequest.content_id,
    expectedRiskClass: normalizedRequest.risk_class,
  });
  const requestFingerprint = createRequestFingerprint(normalizedRequest);

  const response = {
    ...normalizedCandidate,
    generation_metadata: {
      provider,
      model,
      request_fingerprint: requestFingerprint,
      response_fingerprint: "",
    },
  };
  response.generation_metadata.response_fingerprint = createResponseFingerprint(response);

  validateGenerationResponse(response, {
    expectedContentId: normalizedRequest.content_id,
    expectedRequestFingerprint: requestFingerprint,
    expectedRiskClass: normalizedRequest.risk_class,
  });
  return response;
}

export function validateGenerationResponse(
  response,
  { expectedContentId, expectedRequestFingerprint, expectedRiskClass }
) {
  validateGeneratedCandidate(response, { expectedContentId, expectedRiskClass });

  const metadata = response.generation_metadata;
  assert(metadata && typeof metadata === "object" && !Array.isArray(metadata), "GENERATION_METADATA_INVALID", "generation_metadata is required");
  assert(nonEmptyString(metadata.provider), "PROVIDER_MISSING", "generation_metadata.provider is required");
  assert(nonEmptyString(metadata.model), "MODEL_MISSING", "generation_metadata.model is required");
  assert(/^[0-9a-f]{64}$/.test(metadata.request_fingerprint || ""), "REQUEST_FINGERPRINT_INVALID", "request_fingerprint must be lowercase SHA-256 hex");
  assert(
    metadata.request_fingerprint === expectedRequestFingerprint,
    "REQUEST_FINGERPRINT_MISMATCH",
    "response request_fingerprint does not match the validated request"
  );
  assert(/^[0-9a-f]{64}$/.test(metadata.response_fingerprint || ""), "RESPONSE_FINGERPRINT_INVALID", "response_fingerprint must be lowercase SHA-256 hex");

  const expectedResponseFingerprint = createResponseFingerprint(response);
  assert(
    metadata.response_fingerprint === expectedResponseFingerprint,
    "RESPONSE_FINGERPRINT_MISMATCH",
    "response_fingerprint does not match response payload"
  );

  return {
    ok: true,
    content_id: response.content_id,
    request_fingerprint: metadata.request_fingerprint,
    response_fingerprint: metadata.response_fingerprint,
  };
}
