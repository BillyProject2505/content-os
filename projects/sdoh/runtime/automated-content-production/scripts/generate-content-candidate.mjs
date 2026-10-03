import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_CLOUDFLARE_MODEL,
  generateWithCloudflareWorkersAI,
} from "./cloudflare-workers-ai-generation-adapter.mjs";

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

const baseRequest = JSON.parse(fs.readFileSync(requestPath, "utf8"));
let request = structuredClone(baseRequest);
let result = null;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  try {
    result = await generateWithCloudflareWorkersAI({
      request,
      accountId,
      apiToken,
      model,
    });
    console.log(`generation_attempt=${attempt}`);
    break;
  } catch (error) {
    const retryableGenerationQualityFailure =
      error?.code === "SEMANTIC_ALIGNMENT_FAILED" ||
      error?.code === "FORBIDDEN_SEMANTIC_DRIFT" ||
      error?.code === "EDITORIAL_QUALITY_FAILED";

    if (!retryableGenerationQualityFailure || attempt === maxAttempts) {
      throw error;
    }

    console.warn(
      `generation_attempt=${attempt} rejected_by=${error.code}; retrying with explicit semantic/editorial remediation`
    );

    request = {
      ...structuredClone(baseRequest),
      duplication_context:
        baseRequest.duplication_context +
        ` Automated remediation after attempt ${attempt}: the previous candidate failed ${error.code}. Regenerate from scratch. Keep the supplied core_concept materially visible across the slide sequence, satisfy semantic_guardrails and editorial_quality_guardrails exactly, preserve a clear five-slide progression, avoid fragmentary generic copy, and make the caption add substantive context rather than merely restating the slides.`,
    };
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
console.log("semantic_alignment=PASS");
console.log("editorial_quality=PASS");
console.log("candidate_state=UNAPPROVED");
