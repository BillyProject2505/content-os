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

const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
const result = await generateWithCloudflareWorkersAI({
  request,
  accountId,
  apiToken,
  model,
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");

console.log(`content_id=${result.content_id}`);
console.log(`provider=${result.generation_metadata.provider}`);
console.log(`model=${result.generation_metadata.model}`);
console.log(`request_fingerprint=${result.generation_metadata.request_fingerprint}`);
console.log(`response_fingerprint=${result.generation_metadata.response_fingerprint}`);
console.log("candidate_state=UNAPPROVED");
