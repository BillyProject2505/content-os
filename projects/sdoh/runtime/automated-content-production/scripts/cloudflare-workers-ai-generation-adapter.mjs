import {
  canonicalJson,
  finalizeGenerationResponse,
  validateGenerationRequest,
} from "./model-generation-contract.mjs";

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
          copy: { type: "string", minLength: 1 },
        },
        required: ["slide", "copy"],
      },
    },
    caption: { type: "string", minLength: 1 },
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
    "caption",
    "risk_flags",
    "research_sensitive_claims",
  ],
};

export const DEFAULT_CLOUDFLARE_MODEL =
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export function buildCloudflareWorkersAIRequest({
  request,
  model = DEFAULT_CLOUDFLARE_MODEL,
}) {
  const normalized = validateGenerationRequest(request);

  const systemPrompt = [
    "You are the text-generation component of the SDOH automated production system.",
    "Return only the requested structured candidate.",
    "Do not approve, schedule, publish, or claim that any governance gate passed.",
    "Treat the authority_packet as binding editorial constraints for this generation.",
    "Use duplication_context to avoid direct repetition and keep this content materially distinct.",
    "semantic_guardrails are mandatory output constraints: satisfy the minimum required slide-anchor groups and avoid every forbidden slide phrase.",
    "editorial_quality_guardrails are also mandatory. Treat their word counts, slide-specific progression anchors, vocabulary depth, repetition threshold, caption depth, caption paragraph structure, signature, and hashtags as hard constraints.",
    "The slide sequence must keep the core_concept materially visible; do not replace it with a neighboring topic such as rest, overload, decision fatigue, disappointment, or recovery unless the supplied core_concept actually requires that topic.",
    "Produce exactly five slides numbered 1 through 5 in order.",
    "Each slide must read as a complete editorial micro-thought, not a two- or three-word label. Concision is required, but fragmentary generic copy is not acceptable.",
    "Build a clear progression across S1–S5: recognition of change, contextualization, reframing, permission/adaptive choice, then a spacious landing. Do not make the five slides interchangeable quotes.",
    "Keep slide copy natural in Indonesian. Satisfy required concepts without awkward keyword stuffing or repeating the same sentence structure.",
    "Caption must add substantive context/depth rather than simply repeat the visual copy. Use multiple short paragraphs before the project signature and fixed hashtags.",
    "If a statement becomes research-sensitive, clinical, diagnostic, treatment-related, crisis-related, or otherwise evidence-sensitive, list it in research_sensitive_claims rather than inventing evidence.",
    "If risk_class is REVIEW_REQUIRED, include REVIEW_REQUIRED in risk_flags.",
    "Do not include provider metadata or cryptographic fingerprints; the trusted gateway adds them after validation.",
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
        json_schema: OUTPUT_SCHEMA,
      },
      stream: false,
      max_tokens: 900,
      temperature: 0.35,
    },
  };
}

function normalizeCandidate(body) {
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

  const raw = body.result?.response;
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
  const providerRequest = buildCloudflareWorkersAIRequest({
    request: normalized,
    model,
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

  const candidate = normalizeCandidate(body);

  return finalizeGenerationResponse(candidate, {
    request: normalized,
    provider: "cloudflare-workers-ai",
    model,
  });
}
