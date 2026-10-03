import fs from "node:fs";
import path from "node:path";
import { generateWithOpenAI } from "./openai-generation-adapter.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || !process.argv[index + 1]) {
    throw new Error(`Missing required argument ${name}`);
  }
  return process.argv[index + 1];
}

const requestPath = path.resolve(arg("--request"));
const outputPath = path.resolve(arg("--output"));
const model = process.env.SDOH_GENERATION_MODEL || "gpt-5.6-terra";
const apiKey = process.env.OPENAI_API_KEY || "";

const request = JSON.parse(fs.readFileSync(requestPath, "utf8"));
const result = await generateWithOpenAI({ request, apiKey, model });

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");

console.log(`content_id=${result.content_id}`);
console.log(`provider=${result.generation_metadata.provider}`);
console.log(`model=${result.generation_metadata.model}`);
console.log(`request_fingerprint=${result.generation_metadata.request_fingerprint}`);
console.log(`response_fingerprint=${result.generation_metadata.response_fingerprint}`);
console.log("candidate_state=UNAPPROVED");
