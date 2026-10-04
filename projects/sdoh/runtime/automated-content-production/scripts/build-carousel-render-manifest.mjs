import fs from "node:fs";
import path from "node:path";
import {
  createRequestFingerprint,
  validateCandidateEditorialQuality,
  validateCandidateSemanticAlignment,
  validateGenerationResponse,
  validateGenerationRequest,
} from "./model-generation-contract.mjs";

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0 || !process.argv[i + 1]) throw new Error(`Missing ${name}`);
  return process.argv[i + 1];
}

function wrapCopy(copy) {
  const words = String(copy).trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return words.join("");
  if (words.length === 2) return words.join("\n");
  if (words.length === 3) {
    const first = words[0].length;
    if (first >= 8) return `${words[0]}\n${words.slice(1).join(" ")}`;
    return `${words.slice(0, 2).join(" ")}\n${words[2]}`;
  }
  if (words.length === 4) {
    return `${words.slice(0, 2).join(" ")}\n${words.slice(2).join(" ")}`;
  }
  const pivot = Math.ceil(words.length / 2);
  return `${words.slice(0, pivot).join(" ")}\n${words.slice(pivot).join(" ")}`;
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

const plan = authority.sage_default_visual_plan;
if (
  plan.layout_mode !== "illustrated_single_character" ||
  plan.anchor !== "lower_right" ||
  plan.scale !== "md" ||
  plan.ground_mode !== "embedded" ||
  JSON.stringify(plan.pose_route) !== JSON.stringify(["P02","P03","P05","P06","P07"])
) {
  throw new Error("Canonical Sage visual plan mismatch");
}

const manifest = {
  content_id: request.content_id,
  theme: "SAGE",
  layout_mode: plan.layout_mode,
  slides: candidate.slides.map((slide, index) => ({
    slide_number: slide.slide,
    copy: wrapCopy(slide.copy),
    optical_y_correction: 0,
    character: {
      enabled: true,
      pose_id: plan.pose_route[index],
      anchor: plan.anchor,
      scale: plan.scale,
      ground_mode: plan.ground_mode,
    },
  })),
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`content_id=${manifest.content_id}`);
console.log(`candidate_response_fingerprint=${expectedResponseFingerprint}`);
console.log(`pose_route=${plan.pose_route.join("->")}`);
console.log("render_manifest_state=UNAPPROVED");
