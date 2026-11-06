// Approved-copy preflight: validates exact fingerprint + Owner record; NEVER renders or publishes.
import fs from "node:fs";
import { validateApprovedCopy, runApprovedCopyGates } from "./approved-copy-contract.mjs";

const id = "SDOH-SAGE-CAR-0015";
const source = "projects/sdoh/content/sage/carousel/" + id + ".json";
const approvalFile = "projects/sdoh/content/sage/carousel/" + id + ".owner-copy-approval.json";
const copy = JSON.parse(fs.readFileSync(source, "utf8"));
const approval = JSON.parse(fs.readFileSync(approvalFile, "utf8"));
const expectedFingerprint = "f322a5532ba7e8d7e07fb5c37dd65b803eb69221766191b09094bb5495ff6519";
const validated = validateApprovedCopy(copy, {
  expectedContentId: id, expectedCopyFingerprint: expectedFingerprint
});
if (approval.schema !== "sdoh-owner-copy-approval-v1" ||
    approval.content_id !== id ||
    approval.theme !== "SAGE" ||
    approval.owner_decision !== "APPROVED" ||
    approval.copy_fingerprint !== validated.copy_fingerprint ||
    approval.campaign_target_date !== "2026-11-08" ||
    approval.campaign_timezone !== "Asia/Makassar" ||
    approval.lifecycle.copy_status !== "COPY_APPROVED" ||
    approval.lifecycle.production_activation !== false ||
    approval.lifecycle.scheduled !== false ||
    approval.lifecycle.published !== false ||
    approval.lifecycle.owner_content_visual_approval !== "NOT_GRANTED") {
  throw new Error("Owner approval provenance/status mismatch");
}
if (!approval.owner_approval_evidence?.github_review_record?.startsWith(
    "https://github.com/BillyProject2505/content-os/pull/191#issuecomment-")) {
  throw new Error("Owner approval comment evidence missing");
}
const gates = runApprovedCopyGates(validated);
if (!gates.semantic || !gates.editorial) throw new Error("Approved-copy editorial gates incomplete");
if (!validated.slides.some(s => /transgender|identitas gender/i.test(s.copy))) {
  throw new Error("Campaign theme missing from approved carousel slides");
}
console.log(JSON.stringify({
  status:"COPY_APPROVED_PREFLIGHT_PASS",
  content_id:validated.content_id,
  copy_fingerprint:validated.copy_fingerprint,
  semantic_gate:"PASS",
  editorial_gate:"PASS",
  metrics:gates.editorial.metrics,
  owner_copy_approval:"GRANTED",
  owner_content_visual_approval:"NOT_GRANTED",
  publication_authority:"NOT_GRANTED"
},null,2));
