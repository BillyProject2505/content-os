import {
  assembleCaption,
  canonicalJson,
  createRequestFingerprint,
  finalizeGenerationResponse,
  normalizeRemediationHint,
  sha256Hex,
  validateGenerationRequest,
} from "./model-generation-contract.mjs";
import { captionParagraphTarget, slideRequirementLines } from "./remediation-hint.mjs";

export class CloudflareGenerationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "CloudflareGenerationError";
    this.code = code;
  }
}

const OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    schema_version: { type: "string", enum: ["1"] },
    content_id: { type: "string" },
    slides: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          slide: { type: "integer", minimum: 1, maximum: 5 },
          copy: { type: "string", minLength: 24, maxLength: 90 },
        },
        required: ["slide", "copy"],
      },
    },
    caption_body_paragraphs: {
      type: "array",
      items: { type: "string", minLength: 1 },
    },
    risk_flags: {
      type: "array",
      items: { type: "string" },
    },
    research_sensitive_claims: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "schema_version",
    "content_id",
    "slides",
    "caption_body_paragraphs",
    "risk_flags",
    "research_sensitive_claims",
  ],
};

// BUS-160 AI Cost Policy (Owner decision 2026-10-04): FREE-TIER ONLY.
// Paid AI providers/models are not authorized; the canonical runtime must work
// without paid AI billing. This constant is the single source of truth for the
// canonical default model (workflow input and tests resolve to it).
export const DEFAULT_CLOUDFLARE_MODEL =
  "@cf/meta/llama-4-scout-17b-16e-instruct";

// Historical/optional only (PR #93). Requires Workers Paid or prepaid credits:
// NOT the default, NOT a fallback, and NOT authorized for runtime calls
// without a new Owner decision (see PAID_MODELS_NOT_AUTHORIZED).
export const KIMI_K2_6_MODEL = "@cf/moonshotai/kimi-k2.6";

// Models that require paid billing. Runtime entry points must refuse them.
export const PAID_MODELS_NOT_AUTHORIZED = Object.freeze([KIMI_K2_6_MODEL]);

export function buildCloudflareWorkersAIRequest({
  request,
  model = DEFAULT_CLOUDFLARE_MODEL,
  remediationHint = null,
}) {
  const normalized = validateGenerationRequest(request);
  const hint = normalizeRemediationHint(remediationHint);
  const usesChatCompletions = model === KIMI_K2_6_MODEL;

  const editorial = normalized.editorial_quality_guardrails;
  const outputSchema = structuredClone(OUTPUT_SCHEMA);
  outputSchema.properties.caption_body_paragraphs.minItems = editorial.caption_min_body_paragraphs;
  const captionTarget = captionParagraphTarget(editorial);
  const exactEditorialConstraints = [
    "EXACT EDITORIAL CONSTRAINTS FOR THIS CONTENT INSTANCE (hard gates; a candidate that misses any line is rejected):",
    ...slideRequirementLines(editorial),
    "The Gentle Naming density words (sparse, light, peak, release) describe relative weight only. Even a sparse slide is a complete thought of at least " +
      Math.min(...editorial.min_words_per_slide) + " words. Never write a two-, three- or four-word label.",
    "Across S1-S5 use at least " + editorial.min_total_slide_words + " words total and at least " +
      editorial.min_unique_slide_content_words + " different content words; no two slides may repeat the same sentence shape.",
    "caption_body_paragraphs: exactly " + captionTarget.paragraphs + " paragraphs, each " +
      captionTarget.low + "-" + captionTarget.high + " words (body total " + editorial.caption_min_body_words + "-" +
      editorial.caption_max_body_words + " words). Paragraph 1 = situational opening, 2 = context/depth, 3 = gentle permission/accompaniment.",
    "Do not return a caption field, signature, or hashtags. The gateway appends the exact registered signature and hashtags after joining the body paragraphs.",
    "Before answering, count the words of every slide and paragraph and check every MUST line above.",
    "FORMAT EXAMPLE ONLY (different topic: moving to a new city; do not reuse its words or topic):",
    '  S1 "pindah ke kota baru ternyata terasa asing" (7 words) / S2 "jalan setapak itu belum terasa seperti rumah" (7 words) / ... each slide one complete lowercase thought.',
  ].join("\n");

  const systemPrompt = [
    "You are the text-generation component of the SDOH automated production system.",
    "Return only the requested structured candidate.",
    "Do not approve, schedule, publish, or claim that any governance gate passed.",
    "Treat the authority_packet as binding editorial constraints for this generation.",
    "Use duplication_context to avoid direct repetition and keep this content materially distinct.",
    "semantic_guardrails are mandatory output constraints: satisfy the minimum required slide-anchor groups and avoid every forbidden slide phrase.",
    "editorial_quality_guardrails are also mandatory. Treat their word counts, slide-specific progression anchors, vocabulary depth, repetition threshold, caption depth, caption paragraph structure, signature, and hashtags as hard constraints.",
    exactEditorialConstraints,
    "The slide sequence must keep the core_concept materially visible; do not replace it with a neighboring topic such as rest, overload, decision fatigue, disappointment, or recovery unless the supplied core_concept actually requires that topic.",
    "Produce exactly five slides numbered 1 through 5 in order.",
    "Each slide must read as a complete editorial micro-thought, not a two- or three-word label. Concision is required, but fragmentary generic copy is not acceptable.",
    "Build a clear progression across S1–S5: recognition of change, contextualization, reframing, permission/adaptive choice, then a spacious landing. Do not make the five slides interchangeable quotes.",
    "Keep slide copy natural in Indonesian. Satisfy required concepts without awkward keyword stuffing or repeating the same sentence structure.",
    "Use lowercase slide narrative as required by carousel_copy_rules. Avoid broken grammar, universal claims such as 'kita semua pernah', and pressure such as 'kita harus', 'yang penting terus melangkah', or 'mari'. Recognition and permission must remain gentle, not become an instruction to accept or keep progressing.",
    "Caption body paragraphs must add substantive context/depth rather than simply repeat the visual copy. Do not turn adapting rhythm into a requirement to slow down, rest, or improve productivity.",
    "If a statement becomes research-sensitive, clinical, diagnostic, treatment-related, crisis-related, or otherwise evidence-sensitive, list it in research_sensitive_claims rather than inventing evidence.",
    "If risk_class is REVIEW_REQUIRED, include REVIEW_REQUIRED in risk_flags.",
    "Do not include provider metadata or cryptographic fingerprints; the trusted gateway adds them after validation.",
    ...(hint
      ? [
          "RETRY REMEDIATION (provider hint only; the canonical request in the user message is unchanged and remains authoritative):",
          hint,
        ]
      : []),
  ].join("\n");

  return {
    model,
    body: {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: canonicalJson(normalized) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: usesChatCompletions
          ? { name: "sdoh_content_candidate", strict: true, schema: outputSchema }
          : outputSchema,
      },
      stream: false,
      ...(usesChatCompletions
        ? { max_completion_tokens: 8192, reasoning_effort: "high" }
        : { max_tokens: 900 }),
      temperature: 0.2,
    },
  };
}

function normalizeCandidate(body, model) {
  if (!body || typeof body !== "object") {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_RESPONSE_INVALID",
      "Cloudflare response body is invalid"
    );
  }

  if (body.success !== true) {
    const firstCode =
      Array.isArray(body.errors) && body.errors[0]?.code != null
        ? String(body.errors[0].code)
        : "UNKNOWN";
    throw new CloudflareGenerationError(
      "CLOUDFLARE_API_FAILURE",
      `Cloudflare Workers AI reported failure (provider_code=${firstCode})`
    );
  }

  let raw;
  if (model === KIMI_K2_6_MODEL) {
    const choices = body.result?.choices;
    if (!Array.isArray(choices) || choices.length !== 1 || choices[0]?.finish_reason !== "stop" || choices[0]?.message?.refusal || choices[0]?.message?.tool_calls?.length) {
      throw new CloudflareGenerationError(
        "CLOUDFLARE_COMPLETION_INVALID",
        "Expected one completed text response without truncation, refusal, or tool calls"
      );
    }
    raw = choices[0].message?.content;
    // reasoning_content is deliberately excluded from editorial candidates.
  } else {
    raw = body.result?.response;
  }
  if (raw == null) {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_OUTPUT_MISSING",
      "Cloudflare Workers AI returned no response payload"
    );
  }

  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw;
  }

  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      throw new CloudflareGenerationError(
        "CLOUDFLARE_OUTPUT_NOT_JSON",
        "Cloudflare Workers AI response could not be parsed as JSON"
      );
    }
  }

  throw new CloudflareGenerationError(
    "CLOUDFLARE_OUTPUT_INVALID",
    "Cloudflare Workers AI response payload has an unsupported type"
  );
}

export async function generateWithCloudflareWorkersAI({
  request,
  accountId,
  apiToken,
  model = process.env.SDOH_GENERATION_MODEL || DEFAULT_CLOUDFLARE_MODEL,
  fetchImpl = globalThis.fetch,
  generationAttempt = 1,
  remediationHint = null,
}) {
  if (typeof accountId !== "string" || accountId.trim().length < 8) {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_ACCOUNT_ID_MISSING",
      "Cloudflare account ID is missing or invalid"
    );
  }
  if (typeof apiToken !== "string" || apiToken.trim().length < 20) {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_API_TOKEN_MISSING",
      "Cloudflare API token is missing or invalid"
    );
  }
  if (typeof fetchImpl !== "function") {
    throw new CloudflareGenerationError(
      "FETCH_UNAVAILABLE",
      "fetch implementation is unavailable"
    );
  }
  if (
    typeof model !== "string" ||
    !/^@cf\/[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/.test(model)
  ) {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_MODEL_INVALID",
      "Cloudflare Workers AI model identifier is invalid"
    );
  }

  const normalized = validateGenerationRequest(request);
  const hint = normalizeRemediationHint(remediationHint);
  const providerRequest = buildCloudflareWorkersAIRequest({
    request: normalized,
    model,
    remediationHint: hint,
  });

  const endpoint =
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(
      accountId.trim()
    )}/ai/run/${model}`;

  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(providerRequest.body),
      signal: AbortSignal.timeout(180000),
    });
  } catch {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_NETWORK_ERROR",
      "Cloudflare request failed before a response was received"
    );
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_RESPONSE_NOT_JSON",
      "Cloudflare returned a non-JSON response"
    );
  }

  if (!response.ok) {
    const providerCode =
      Array.isArray(body?.errors) && body.errors[0]?.code != null
        ? String(body.errors[0].code)
        : "UNKNOWN";
    throw new CloudflareGenerationError(
      "CLOUDFLARE_HTTP_ERROR",
      `Cloudflare returned HTTP ${response.status} (provider_code=${providerCode})`
    );
  }

  const providerCandidate = normalizeCandidate(body, model);
  const paragraphs = providerCandidate.caption_body_paragraphs;
  if (
    !Array.isArray(paragraphs) || paragraphs.length === 0 ||
    paragraphs.some((value) => typeof value !== "string" || !value.trim() || /[\r\n#]/.test(value) || value.toLowerCase().includes(normalized.editorial_quality_guardrails.caption_required_signature.toLowerCase())) ||
    Object.hasOwn(providerCandidate, "caption")
  ) {
    throw new CloudflareGenerationError(
      "CLOUDFLARE_OUTPUT_INVALID",
      "Expected separate caption body paragraphs without a caption field, embedded paragraph breaks, signature, or hashtags"
    );
  }
  // Fixed project furniture is deterministic; generated body text stays unedited.
  // Both gates still assess the complete assembled candidate before acceptance.
  const candidate = {
    schema_version: providerCandidate.schema_version,
    content_id: providerCandidate.content_id,
    slides: providerCandidate.slides,
    caption: assembleCaption(paragraphs, normalized.editorial_quality_guardrails),
    risk_flags: providerCandidate.risk_flags,
    research_sensitive_claims: providerCandidate.research_sensitive_claims,
  };

  try {
    return finalizeGenerationResponse(candidate, {
      request: normalized,
      provider: "cloudflare-workers-ai",
      model,
      generationAttempt,
      remediationHint: hint,
    });
  } catch (error) {
    if (["SEMANTIC_ALIGNMENT_FAILED", "FORBIDDEN_SEMANTIC_DRIFT", "EDITORIAL_QUALITY_FAILED"].includes(error?.code)) {
      // Only retain structurally validated content, never HTTP headers or credentials.
      const rejectedCandidate = {
        schema_version: candidate.schema_version,
        content_id: candidate.content_id,
        slides: candidate.slides.map(({ slide, copy }) => ({ slide, copy })),
        caption: candidate.caption,
        risk_flags: candidate.risk_flags,
        research_sensitive_claims: candidate.research_sensitive_claims,
      };
      Object.defineProperty(error, "rejectionDiagnostic", {
        value: {
          candidate_state: "REJECTED_NOT_FOR_RENDER",
          owner_approval: "NOT_GRANTED",
          provider: "cloudflare-workers-ai",
          model,
          gate_code: error.code,
          gate_reason: error.message,
          request_fingerprint: createRequestFingerprint(normalized),
          remediation_hint_fingerprint: hint === null ? null : sha256Hex(hint),
          // Raw rejected payload hash is NOT an accepted response fingerprint.
          raw_candidate_fingerprint: sha256Hex(canonicalJson(rejectedCandidate)),
          rejected_candidate: rejectedCandidate,
        },
      });
    }
    throw error;
  }
}
