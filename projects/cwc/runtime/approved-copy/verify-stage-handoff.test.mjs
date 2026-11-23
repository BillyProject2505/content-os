import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { verifyStageHandoff } from "./verify-stage-handoff.mjs";

const id = "CWC-CRSL-0005";
const files = {
  copy: "projects/cwc/content/carousel/" + id + ".stg05-content.json",
  visual: "projects/cwc/content/carousel/" + id + ".stg07-visual.json",
  qa: "projects/cwc/content/qa/" + id + ".stg08-qa.json",
  approval: "projects/cwc/content/approval/" + id + ".stg09-approval.json",
  jpeg: "projects/cwc/content/approval/" + id + ".jpeg-delivery-approval.json",
  release: "projects/cwc/content/release/" + id + ".stg10-release-preparation.json"
};
const read = relative => JSON.parse(readFileSync(path.resolve(relative), "utf8"));
const withMutation = (file, mutate) => verifyStageHandoff(id, { loadJson: relative => {
  const data = read(relative);
  if (relative === files[file]) mutate(data);
  return data;
}});

test("actual CWC-CRSL-0005 immutable handoff passes without publication authority", () => {
  const result = verifyStageHandoff(id);
  assert.equal(result.result, "PASS_READ_ONLY");
  assert.equal(result.approved_png_sha256_in_order.length, 5);
  assert.equal(result.approved_jpeg_sha256_in_order.length, 5);
  assert.equal(result.publication_authorization_verified, false);
  assert.equal(result.platform_schedule_verified, false);
  assert.equal(result.platform_publication_verified, false);
  assert.equal(result.writeback_performed, false);
});
test("rejects unsafe Content ID traversal", () => {
  assert.throws(() => verifyStageHandoff("../../secrets"), /invalid.*Content ID/);
});
test("rejects altered STG-05 source hash", () => {
  assert.throws(() => withMutation("copy", x => { x.copy_source.approved_png_sha256_in_order[0] = "0".repeat(64); }), /STG-05 slide 1 hash mismatch/);
});
test("rejects altered STG-07 caption", () => {
  assert.throws(() => withMutation("visual", x => { x.reviewed_source.caption_sha256 = "0".repeat(64); }), /STG-07 caption hash mismatch/);
});
test("rejects failed QA", () => {
  assert.throws(() => withMutation("qa", x => { x.verdict = "FAIL"; }), /STG-08 QA not PASS/);
});
test("rejects missing human approval", () => {
  assert.throws(() => withMutation("approval", x => { x.decision = "PENDING"; }), /STG-09 not approved/);
});
test("rejects changed release identity", () => {
  assert.throws(() => withMutation("release", x => { x.release_identity_candidate.value = "sha256:" + "0".repeat(64); }), /release identity digest mismatch/);
});
test("rejects unapproved JPEG delivery", () => {
  assert.throws(() => withMutation("jpeg", x => { x.candidate_owner_approved = false; }), /JPEG delivery not Owner-approved/);
});
test("rejects wrong JPEG source mapping", () => {
  assert.throws(() => withMutation("jpeg", x => { x.files[0].source_png_sha256 = "0".repeat(64); }), /JPEG source slide 1 hash mismatch/);
});
