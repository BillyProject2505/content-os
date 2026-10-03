import fs from "node:fs";
import {
  createRequestFingerprint,
  validateGenerationRequest,
} from "./model-generation-contract.mjs";

const path = new URL("../pilot-requests/SDOH-SAGE-CAR-0009.json", import.meta.url);
const request = JSON.parse(fs.readFileSync(path, "utf8"));
const normalized = validateGenerationRequest(request);

if (normalized.content_id !== "SDOH-SAGE-CAR-0009") {
  throw new Error("Pilot request Content ID mismatch");
}
if (normalized.risk_class !== "STANDARD") {
  throw new Error("Pilot request risk class mismatch");
}
if (!normalized.authority_packet.carousel_copy_rules.includes("The Gentle Naming")) {
  throw new Error("Pilot request is missing the current Sage Carousel architecture");
}
if (!normalized.authority_packet.caption_rules.includes("#satudosisobathati")) {
  throw new Error("Pilot request is missing the fixed caption hashtag baseline");
}
if (normalized.semantic_guardrails.minimum_required_slide_anchor_groups !== 2) {
  throw new Error("Pilot request semantic anchor minimum mismatch");
}
if (!normalized.semantic_guardrails.required_slide_anchor_groups.some((group) => group.includes("ritme"))) {
  throw new Error("Pilot request is missing the rhythm semantic anchor");
}
if (normalized.editorial_quality_guardrails.min_total_slide_words !== 30) {
  throw new Error("Pilot request editorial density floor mismatch");
}
if (normalized.editorial_quality_guardrails.caption_min_body_words !== 45) {
  throw new Error("Pilot request caption depth floor mismatch");
}
if (normalized.editorial_quality_guardrails.slide_progression.length !== 5) {
  throw new Error("Pilot request editorial progression contract mismatch");
}

console.log("BUS-144 pilot request contract PASS");
console.log(`request_fingerprint=${createRequestFingerprint(normalized)}`);
