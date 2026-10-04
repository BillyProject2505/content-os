import fs from "node:fs";
import path from "node:path";
import {
  createRequestFingerprint,
  validateCandidateEditorialQuality,
  validateCandidateSemanticAlignment,
  validateGenerationResponse,
  validateGenerationRequest,
} from "./model-generation-contract.mjs";
import { buildSageRenderManifest } from "./carousel-manifest.mjs";

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0 || !process.argv[i + 1]) throw new Error(`Missing ${name}`);
  return process.argv[i + 1];
}

const candidatePath = path.resolve(arg("--candidate"));
const requestPath = path.resolve(arg("--request"));
const authorityPath = path.resolve(arg("--authority"));
const outPath = path.resolve(arg("--out"));
const expectedResponseFingerprint = arg("--expected-response-fingerprint");

const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
const request = validateGenerationRequest(JSON.parse(fs.readFileSync(requestPath, "utf8")));
const authority = JSON.parse(fs.readFileSync(authorityPath, "utf8"));

if (request.content_id !== "SDOH-SAGE-CAR-0009" || request.theme !== "SAGE") {
  throw new Error("Pilot render builder is locked to SDOH-SAGE-CAR-0009 / SAGE");
}
const requestFingerprint = createRequestFingerprint(request);
validateGenerationResponse(candidate, {
  expectedContentId: request.content_id,
  expectedRequestFingerprint: requestFingerprint,
  expectedRiskClass: request.risk_class,
});
validateCandidateSemanticAlignment(candidate, request);
// BUS-160 Editorial Quality Gate — Pilot Lock: a candidate that fails the gate
// must not receive render authority, even when its fingerprints are valid.
validateCandidateEditorialQuality(candidate, request);

if (candidate.generation_metadata.response_fingerprint !== expectedResponseFingerprint) {
  throw new Error(
    `Candidate response fingerprint mismatch: ${candidate.generation_metadata.response_fingerprint}`
  );
}

const manifest = buildSageRenderManifest({
  contentId: request.content_id,
  slides: candidate.slides,
  authority,
});
const plan = authority.sage_default_visual_plan;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`content_id=${manifest.content_id}`);
console.log(`candidate_response_fingerprint=${expectedResponseFingerprint}`);
console.log(`pose_route=${plan.pose_route.join("->")}`);
console.log("render_manifest_state=UNAPPROVED");
