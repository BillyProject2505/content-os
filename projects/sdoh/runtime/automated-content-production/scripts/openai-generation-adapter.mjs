import {
  canonicalJson,
  finalizeGenerationResponse,
  validateGenerationRequest,
} from "./model-generation-contract.mjs";

export class OpenAIGenerationError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "OpenAIGenerationError";
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
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          slide: { type: "integer" },
          copy: { type: "string" },
        },
        required: ["slide", "copy"],
      },
    },
    caption: { type: "string" },
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

export function buildOpenAIRequest({ request, model = "gpt-5.6-terra" }) {
  const normalized = validateGenerationRequest(request);

  const instructions = [
    "You are the text-generation component of the SDOH automated production system.",
    "Return only the requested structured candidate. Do not approve, schedule, publish, or claim that any gate passed.",
    "Use the supplied authority_packet as binding editorial constraints for this generation.",
    "Use duplication_context to avoid direct repetition and to keep this instance materially distinct.",
    "Produce exactly five slides, numbered 1 through 5 in order.",
    "Keep slide language concise and coherent as one narrative thread.",
    "Caption must expand the visual idea rather than merely copy the five slides.",
    "If any statement becomes research-sensitive, clinical, diagnostic, treatment-related, crisis-related, or otherwise evidence-sensitive, list it in research_sensitive_claims.",
    "If risk_class is REVIEW_REQUIRED, include REVIEW_REQUIRED in risk_flags.",
    "Do not invent supporting evidence or citations.",
    "Do not include cryptographic fingerprints or provider metadata; the trusted gateway adds them.",
  ].join("\n");

  return {
    model,
    store: false,
    reasoning: { effort: "medium" },
    instructions,
    input: canonicalJson(normalized),
    text: {
      format: {
        type: "json_schema",
        name: "sdoh_content_candidate",
        strict: true,
        schema: OUTPUT_SCHEMA,
      },
    },
  };
}

function extractStructuredText(body) {
  if (!body || typeof body !== "object") {
    throw new OpenAIGenerationError("OPENAI_RESPONSE_INVALID", "OpenAI response body is invalid");
  }
  if (body.status && body.status !== "completed") {
    throw new OpenAIGenerationError("OPENAI_RESPONSE_INCOMPLETE", `OpenAI response status is ${body.status}`);
  }

  const refusals = [];
  const texts = [];
  for (const item of body.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "refusal") refusals.push(content.refusal || "refused");
      if (content?.type === "output_text" && typeof content.text === "string") texts.push(content.text);
    }
  }

  if (refusals.length > 0) {
    throw new OpenAIGenerationError("OPENAI_REFUSAL", "OpenAI refused the generation request");
  }
  if (texts.length !== 1 || !texts[0].trim()) {
    throw new OpenAIGenerationError(
      "OPENAI_OUTPUT_MISSING",
      `Expected exactly one structured output text item, received ${texts.length}`
    );
  }
  return texts[0];
}

export async function generateWithOpenAI({
  request,
  apiKey,
  model = process.env.SDOH_GENERATION_MODEL || "gpt-5.6-terra",
  fetchImpl = globalThis.fetch,
}) {
  if (typeof apiKey !== "string" || apiKey.trim().length < 20) {
    throw new OpenAIGenerationError("OPENAI_API_KEY_MISSING", "OPENAI_API_KEY is missing or invalid");
  }
  if (typeof fetchImpl !== "function") {
    throw new OpenAIGenerationError("FETCH_UNAVAILABLE", "fetch implementation is unavailable");
  }

  const normalized = validateGenerationRequest(request);
  const payload = buildOpenAIRequest({ request: normalized, model });

  let response;
  try {
    response = await fetchImpl("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new OpenAIGenerationError("OPENAI_NETWORK_ERROR", "OpenAI request failed before a response was received");
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new OpenAIGenerationError("OPENAI_RESPONSE_NOT_JSON", "OpenAI returned a non-JSON response");
  }

  if (!response.ok) {
    const providerCode =
      typeof body?.error?.code === "string" && body.error.code.length <= 80
        ? body.error.code
        : "UNKNOWN";
    throw new OpenAIGenerationError(
      "OPENAI_HTTP_ERROR",
      `OpenAI returned HTTP ${response.status} (provider_code=${providerCode})`
    );
  }

  const text = extractStructuredText(body);
  let candidate;
  try {
    candidate = JSON.parse(text);
  } catch {
    throw new OpenAIGenerationError("OPENAI_OUTPUT_NOT_JSON", "Structured output could not be parsed as JSON");
  }

  return finalizeGenerationResponse(candidate, {
    request: normalized,
    provider: "openai",
    model,
  });
}
