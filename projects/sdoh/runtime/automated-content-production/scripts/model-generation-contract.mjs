import { assessEditorialQuality } from "./editorial-quality-gate.mjs";
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

// Shared by the request validator and the approved-copy gates so both paths
// enforce exactly the same guardrail shape.
export function normalizeSemanticGuardrails(semantic_guardrails) {
  assert(
    semantic_guardrails &&
      typeof semantic_guardrails === "object" &&
      !Array.isArray(semantic_guardrails),
    "SEMANTIC_GUARDRAILS_INVALID",
    "semantic_guardrails must be an object"
  );
  assert(
    Array.isArray(semantic_guardrails.required_slide_anchor_groups) &&
      semantic_guardrails.required_slide_anchor_groups.length > 0,
    "SEMANTIC_ANCHORS_INVALID",
    "semantic_guardrails.required_slide_anchor_groups must be a non-empty array"
  );
  for (const group of semantic_guardrails.required_slide_anchor_groups) {
    assert(
      Array.isArray(group) && group.length > 0,
      "SEMANTIC_ANCHOR_GROUP_INVALID",
      "each required slide anchor group must be a non-empty array"
    );
    for (const entry of group) {
      assert(
        nonEmptyString(entry),
        "SEMANTIC_ANCHOR_INVALID",
        "semantic anchor entries must be non-empty strings"
      );
    }
  }
  assert(
    Number.isInteger(semantic_guardrails.minimum_required_slide_anchor_groups) &&
      semantic_guardrails.minimum_required_slide_anchor_groups >= 1 &&
      semantic_guardrails.minimum_required_slide_anchor_groups <=
        semantic_guardrails.required_slide_anchor_groups.length,
    "SEMANTIC_ANCHOR_MINIMUM_INVALID",
    "minimum_required_slide_anchor_groups must be within the required group count"
  );
  assert(
    Array.isArray(semantic_guardrails.forbidden_slide_phrases),
    "SEMANTIC_FORBIDDEN_PHRASES_INVALID",
    "semantic_guardrails.forbidden_slide_phrases must be an array"
  );
  for (const entry of semantic_guardrails.forbidden_slide_phrases) {
    assert(
      nonEmptyString(entry),
      "SEMANTIC_FORBIDDEN_PHRASE_INVALID",
      "forbidden slide phrase entries must be non-empty strings"
    );
  }
  return {
    required_slide_anchor_groups:
      semantic_guardrails.required_slide_anchor_groups.map((group) =>
        group.map((entry) => entry.trim())
      ),
    minimum_required_slide_anchor_groups:
      semantic_guardrails.minimum_required_slide_anchor_groups,
    forbidden_slide_phrases:
      semantic_guardrails.forbidden_slide_phrases.map((entry) => entry.trim()),
  };
}

export function normalizeEditorialGuardrails(editorial_quality_guardrails) {
  assert(
    editorial_quality_guardrails &&
      typeof editorial_quality_guardrails === "object" &&
      !Array.isArray(editorial_quality_guardrails),
    "EDITORIAL_GUARDRAILS_INVALID",
    "editorial_quality_guardrails must be an object"
  );

  const minWords = editorial_quality_guardrails.min_words_per_slide;
  const maxWords = editorial_quality_guardrails.max_words_per_slide;
  assert(
    Array.isArray(minWords) && minWords.length === 5 &&
      minWords.every((n) => Number.isInteger(n) && n >= 1),
    "EDITORIAL_MIN_WORDS_INVALID",
    "min_words_per_slide must contain five positive integers"
  );
  assert(
    Array.isArray(maxWords) && maxWords.length === 5 &&
      maxWords.every((n, i) => Number.isInteger(n) && n >= minWords[i]),
    "EDITORIAL_MAX_WORDS_INVALID",
    "max_words_per_slide must contain five integers >= the matching minimum"
  );
  assert(
    Number.isInteger(editorial_quality_guardrails.min_total_slide_words) &&
      editorial_quality_guardrails.min_total_slide_words >=
        minWords.reduce((sum, n) => sum + n, 0),
    "EDITORIAL_TOTAL_WORDS_INVALID",
    "min_total_slide_words must be at least the sum of per-slide minimums"
  );
  assert(
    Number.isInteger(editorial_quality_guardrails.min_unique_slide_content_words) &&
      editorial_quality_guardrails.min_unique_slide_content_words >= 1,
    "EDITORIAL_UNIQUE_WORDS_INVALID",
    "min_unique_slide_content_words must be a positive integer"
  );
  assert(
    typeof editorial_quality_guardrails.max_pairwise_content_similarity === "number" &&
      editorial_quality_guardrails.max_pairwise_content_similarity >= 0 &&
      editorial_quality_guardrails.max_pairwise_content_similarity <= 1,
    "EDITORIAL_SIMILARITY_INVALID",
    "max_pairwise_content_similarity must be between 0 and 1"
  );
  assert(
    Array.isArray(editorial_quality_guardrails.slide_progression) &&
      editorial_quality_guardrails.slide_progression.length === 5,
    "EDITORIAL_PROGRESSION_INVALID",
    "slide_progression must contain exactly five slide requirements"
  );
  editorial_quality_guardrails.slide_progression.forEach((item, index) => {
    assert(
      item && typeof item === "object" && item.slide === index + 1,
      "EDITORIAL_PROGRESSION_SLIDE_INVALID",
      "slide_progression must be ordered from slide 1 through 5"
    );
    assert(
      Array.isArray(item.required_anchor_groups) &&
        item.required_anchor_groups.length > 0 &&
        item.required_anchor_groups.every(
          (group) =>
            Array.isArray(group) &&
            group.length > 0 &&
            group.every((entry) => nonEmptyString(entry))
        ),
      "EDITORIAL_PROGRESSION_ANCHORS_INVALID",
      "each slide progression requirement must contain non-empty anchor groups"
    );
    assert(
      Number.isInteger(item.minimum_groups) &&
        item.minimum_groups >= 1 &&
        item.minimum_groups <= item.required_anchor_groups.length,
      "EDITORIAL_PROGRESSION_MINIMUM_INVALID",
      "minimum_groups must be within each slide's anchor group count"
    );
  });
  assert(
    Number.isInteger(editorial_quality_guardrails.caption_min_body_words) &&
      editorial_quality_guardrails.caption_min_body_words >= 1,
    "EDITORIAL_CAPTION_MIN_INVALID",
    "caption_min_body_words must be positive"
  );
  assert(
    Number.isInteger(editorial_quality_guardrails.caption_max_body_words) &&
      editorial_quality_guardrails.caption_max_body_words >=
        editorial_quality_guardrails.caption_min_body_words,
    "EDITORIAL_CAPTION_MAX_INVALID",
    "caption_max_body_words must be >= caption_min_body_words"
  );
  assert(
    Number.isInteger(editorial_quality_guardrails.caption_min_body_paragraphs) &&
      editorial_quality_guardrails.caption_min_body_paragraphs >= 1,
    "EDITORIAL_CAPTION_PARAGRAPHS_INVALID",
    "caption_min_body_paragraphs must be positive"
  );
  assert(
    nonEmptyString(editorial_quality_guardrails.caption_required_signature),
    "EDITORIAL_CAPTION_SIGNATURE_INVALID",
    "caption_required_signature is required"
  );
  validateStringArray(
    editorial_quality_guardrails.caption_required_hashtags,
    "EDITORIAL_CAPTION_HASHTAGS_INVALID",
    "caption_required_hashtags"
  );
  return structuredClone(editorial_quality_guardrails);
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
    semantic_guardrails,
    editorial_quality_guardrails,
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

  const normalizedSemanticGuardrails = normalizeSemanticGuardrails(semantic_guardrails);
  const normalizedEditorialGuardrails = normalizeEditorialGuardrails(editorial_quality_guardrails);

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
    semantic_guardrails: normalizedSemanticGuardrails,
    editorial_quality_guardrails: normalizedEditorialGuardrails,
  };
}

export function createRequestFingerprint(input) {
  return sha256Hex(canonicalJson(validateGenerationRequest(input)));
}

// Retry remediation is a non-canonical provider hint. It never enters the
// canonical request (and therefore never changes request_fingerprint); it is
// recorded as provenance inside generation_metadata, which the response
// fingerprint covers.
export const MAX_REMEDIATION_HINT_LENGTH = 2000;

export function normalizeRemediationHint(hint) {
  if (hint == null) return null;
  assert(typeof hint === "string", "REMEDIATION_HINT_INVALID", "remediation hint must be a string");
  const normalized = hint.replace(/\s+/g, " ").trim();
  assert(normalized.length > 0, "REMEDIATION_HINT_INVALID", "remediation hint must not be empty");
  assert(
    normalized.length <= MAX_REMEDIATION_HINT_LENGTH,
    "REMEDIATION_HINT_INVALID",
    `remediation hint must be at most ${MAX_REMEDIATION_HINT_LENGTH} characters`
  );
  return normalized;
}

function validateRetryProvenance(metadata) {
  const hasAttempt = Object.hasOwn(metadata, "generation_attempt");
  const hasHint = Object.hasOwn(metadata, "remediation_hint");
  const hasHintFingerprint = Object.hasOwn(metadata, "remediation_hint_fingerprint");
  if (!hasAttempt && !hasHint && !hasHintFingerprint) return;
  assert(
    hasAttempt && hasHint && hasHintFingerprint,
    "RETRY_PROVENANCE_INVALID",
    "generation_attempt, remediation_hint and remediation_hint_fingerprint must be recorded together"
  );
  assert(
    Number.isInteger(metadata.generation_attempt) && metadata.generation_attempt >= 1,
    "RETRY_PROVENANCE_INVALID",
    "generation_attempt must be a positive integer"
  );
  if (metadata.remediation_hint === null) {
    assert(
      metadata.remediation_hint_fingerprint === null,
      "RETRY_PROVENANCE_INVALID",
      "remediation_hint_fingerprint must be null when no hint was used"
    );
    return;
  }
  assert(
    normalizeRemediationHint(metadata.remediation_hint) === metadata.remediation_hint,
    "RETRY_PROVENANCE_INVALID",
    "remediation_hint must be stored in normalized form"
  );
  assert(
    metadata.remediation_hint_fingerprint === sha256Hex(metadata.remediation_hint),
    "RETRY_PROVENANCE_INVALID",
    "remediation_hint_fingerprint does not match remediation_hint"
  );
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

function normalizeSemanticText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateCandidateSemanticAlignment(candidate, request) {
  return validateSemanticAlignment(candidate, validateGenerationRequest(request).semantic_guardrails);
}

// Guardrail-level form shared with the approved-copy path: the gate logic lives
// here once and is never re-implemented.
export function validateSemanticAlignment(candidate, semanticGuardrails) {
  const normalizedGuardrails = normalizeSemanticGuardrails(semanticGuardrails);
  const slideText = normalizeSemanticText(
    candidate.slides.map((slide) => slide.copy).join(" ")
  );

  const groups = normalizedGuardrails.required_slide_anchor_groups;
  const hits = groups.map((group) =>
    group.some((entry) => slideText.includes(normalizeSemanticText(entry)))
  );
  const hitCount = hits.filter(Boolean).length;

  assert(
    hitCount >=
      normalizedGuardrails.minimum_required_slide_anchor_groups,
    "SEMANTIC_ALIGNMENT_FAILED",
    `candidate hit ${hitCount}/${groups.length} required slide anchor groups; minimum is ${normalizedGuardrails.minimum_required_slide_anchor_groups}`
  );

  const forbiddenHits =
    normalizedGuardrails.forbidden_slide_phrases.filter(
      (phrase) => slideText.includes(normalizeSemanticText(phrase))
    );

  assert(
    forbiddenHits.length === 0,
    "FORBIDDEN_SEMANTIC_DRIFT",
    `candidate contains forbidden drift phrase(s): ${forbiddenHits.join(", ")}`
  );

  return {
    ok: true,
    hit_count: hitCount,
    required_group_count: groups.length,
  };
}

export function validateCandidateEditorialQuality(candidate, request) {
  return validateEditorialQuality(candidate, validateGenerationRequest(request).editorial_quality_guardrails);
}

export function validateEditorialQuality(candidate, editorialGuardrails) {
  const assessment = assessEditorialQuality(
    candidate,
    normalizeEditorialGuardrails(editorialGuardrails)
  );
  assert(
    assessment.ok,
    "EDITORIAL_QUALITY_FAILED",
    assessment.issues.join("; ")
  );
  return assessment;
}

// Fixed project furniture (signature + hashtags) is deterministic; body text is
// never edited. Used by the optional generation adapter and the approved-copy path.
export function assembleCaption(bodyParagraphs, editorialGuardrails) {
  return (
    bodyParagraphs.join("\n\n") +
    "\n\n" +
    editorialGuardrails.caption_required_signature +
    "\n" +
    editorialGuardrails.caption_required_hashtags.join(" ")
  );
}

export function finalizeGenerationResponse(
  candidate,
  { request, provider, model, generationAttempt, remediationHint }
) {
  assert(nonEmptyString(provider), "PROVIDER_MISSING", "provider is required");
  assert(nonEmptyString(model), "MODEL_MISSING", "model is required");

  const normalizedRequest = validateGenerationRequest(request);
  const normalizedCandidate = validateGeneratedCandidate(candidate, {
    expectedContentId: normalizedRequest.content_id,
    expectedRiskClass: normalizedRequest.risk_class,
  });
  validateCandidateSemanticAlignment(normalizedCandidate, normalizedRequest);
  validateCandidateEditorialQuality(normalizedCandidate, normalizedRequest);
  const requestFingerprint = createRequestFingerprint(normalizedRequest);

  const retryProvenance = {};
  if (generationAttempt !== undefined || remediationHint !== undefined) {
    const hint = normalizeRemediationHint(remediationHint);
    retryProvenance.generation_attempt = generationAttempt ?? 1;
    retryProvenance.remediation_hint = hint;
    retryProvenance.remediation_hint_fingerprint = hint === null ? null : sha256Hex(hint);
  }

  const response = {
    ...normalizedCandidate,
    generation_metadata: {
      provider,
      model,
      request_fingerprint: requestFingerprint,
      response_fingerprint: "",
      ...retryProvenance,
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
  validateRetryProvenance(metadata);

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
