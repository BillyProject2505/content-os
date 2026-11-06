// Draft-stage preflight only: no approval, render, scheduling or publication.
import fs from "node:fs";
import { sealCopyFingerprint, runApprovedCopyGates } from "./approved-copy-contract.mjs";

const file = "projects/sdoh/content/sage/carousel/SDOH-SAGE-CAR-0015.json";
const copy = JSON.parse(fs.readFileSync(file, "utf8"));
if (copy.content_id !== "SDOH-SAGE-CAR-0015" || copy.theme !== "SAGE" || copy.status !== "COPY_DRAFT") {
  throw new Error("Expected a Sage editorial DRAFT; cannot promote approval via preflight");
}
const actual = sealCopyFingerprint(copy);
if (actual !== copy.copy_fingerprint) throw new Error("Draft fingerprint mismatch");
const gates = runApprovedCopyGates(copy);
if (!gates.semantic || !gates.editorial) throw new Error("Editorial gates incomplete");
if (!copy.slides.some(s => /transgender|identitas gender/i.test(s.copy))) {
  throw new Error("Campaign theme missing from carousel slides");
}
console.log(JSON.stringify({
  status:"EDITORIAL_PREFLIGHT_PASS_NOT_APPROVED",
  content_id:copy.content_id,
  copy_fingerprint:actual,
  semantic_gate:"PASS",
  editorial_gate:"PASS",
  metrics:gates.editorial.metrics,
  owner_copy_approval:"NOT_GRANTED",
  render_authority:"NOT_GRANTED",
  publication_authority:"NOT_GRANTED"
},null,2));
