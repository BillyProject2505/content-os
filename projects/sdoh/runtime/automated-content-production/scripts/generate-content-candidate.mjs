import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_CLOUDFLARE_MODEL,
  generateWithCloudflareWorkersAI,
} from "./cloudflare-workers-ai-generation-adapter.mjs";
import { buildRemediationHint } from "./remediation-hint.mjs";

// GitHub annotations are readable through the checks API even when run logs
// and artifacts are not, so every rejection stays observable. Content only;
// never credentials, headers, or provider reasoning.
function annotate(level, title, message) {
  if (process.env.GITHUB_ACTIONS !== "true") return;
  const escape = (value) => String(value).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const safeTitle = String(title).replace(/[,:]/g, " ");
  console.log(`::${level} title=${escape(safeTitle)}::${escape(message)}`);
}

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || !process.argv[index + 1]) {
    throw new Error(`Missing required argument ${name}`);
  }
  return process.argv[index + 1];
}

const requestPath = path.resolve(arg("--request"));
const outputPath = path.resolve(arg("--output"));
const model = process.env.SDOH_GENERATION_MODEL || DEFAULT_CLOUDFLARE_MODEL;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "";
const apiToken = process.env.CLOUDFLARE_API_TOKEN || "";
const maxAttempts = 3;

// The canonical request is immutable across attempts: it alone defines
// request_fingerprint. Retry feedback travels as a separate provider hint.
const canonicalRequest = Object.freeze(JSON.parse(fs.readFileSync(requestPath, "utf8")));
let remediationHint = null;
let result = null;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  try {
    result = await generateWithCloudflareWorkersAI({
      request: structuredClone(canonicalRequest),
      accountId,
      apiToken,
      model,
      generationAttempt: attempt,
      remediationHint,
    });
    console.log(`generation_attempt=${attempt}`);
    break;
  } catch (error) {
    const retryableGenerationQualityFailure =
      error?.code === "SEMANTIC_ALIGNMENT_FAILED" ||
      error?.code === "FORBIDDEN_SEMANTIC_DRIFT" ||
      error?.code === "EDITORIAL_QUALITY_FAILED";

    if (retryableGenerationQualityFailure && error.rejectionDiagnostic) {
      const diagnostic = { generation_attempt: attempt, ...error.rejectionDiagnostic };
      const diagnosticsDir = process.env.SDOH_GENERATION_DIAGNOSTICS_DIR;
      if (diagnosticsDir) {
        fs.mkdirSync(diagnosticsDir, { recursive: true });
        fs.writeFileSync(
          path.join(diagnosticsDir, `rejected-attempt-${attempt}.json`),
          JSON.stringify(diagnostic, null, 2) + "\n"
        );
      }
      console.warn(`generation_attempt=${attempt} rejected_by=${error.code} candidate_state=REJECTED_NOT_FOR_RENDER request_fingerprint=${diagnostic.request_fingerprint} raw_candidate_fingerprint=${diagnostic.raw_candidate_fingerprint}`);
      const rejected = diagnostic.rejected_candidate;
      annotate(
        "warning",
        `SDOH gate rejection attempt ${attempt}`,
        [
          `model=${diagnostic.provider}/${diagnostic.model} gate=${error.code} candidate_state=REJECTED_NOT_FOR_RENDER owner_approval=NOT_GRANTED`,
          `request_fingerprint=${diagnostic.request_fingerprint} remediation_hint_fingerprint=${diagnostic.remediation_hint_fingerprint ?? "none"}`,
          `reason=${String(error.message).slice(0, 600)}`,
          ...rejected.slides.map((slide) => `S${slide.slide}: ${slide.copy}`),
          `caption_body=${rejected.caption.split("\n\n").length - 1} block(s): ${rejected.caption.slice(0, 500)}`,
        ].join("\n")
      );
    }

    if (!retryableGenerationQualityFailure || attempt === maxAttempts) {
      annotate(
        "error",
        `SDOH generation failed closed attempt ${attempt}`,
        `model=${model} code=${error?.code ?? "UNKNOWN"} message=${String(error?.message ?? "").slice(0, 400)} candidate_state=NONE owner_approval=NOT_GRANTED`
      );
      throw error;
    }

    console.warn(
      `generation_attempt=${attempt} rejected_by=${error.code}; retrying with explicit semantic/editorial remediation`
    );

    // Deterministic per-slide remediation computed from the canonical guardrails
    // and the rejected candidate; it never changes the canonical request.
    remediationHint = buildRemediationHint({
      request: canonicalRequest,
      rejectedCandidate: error.rejectionDiagnostic?.rejected_candidate,
      gateCode: error.code,
      gateReason: error.message,
      attempt,
    });
  }
}

if (!result) {
  throw new Error("Generation completed without a valid result");
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");

console.log(`content_id=${result.content_id}`);
console.log(`provider=${result.generation_metadata.provider}`);
console.log(`model=${result.generation_metadata.model}`);
console.log(`request_fingerprint=${result.generation_metadata.request_fingerprint}`);
console.log(`response_fingerprint=${result.generation_metadata.response_fingerprint}`);
console.log(`accepted_generation_attempt=${result.generation_metadata.generation_attempt}`);
console.log(`remediation_hint_fingerprint=${result.generation_metadata.remediation_hint_fingerprint ?? "none"}`);
console.log("semantic_alignment=PASS");
console.log("editorial_quality=PASS");
console.log("candidate_state=UNAPPROVED");
