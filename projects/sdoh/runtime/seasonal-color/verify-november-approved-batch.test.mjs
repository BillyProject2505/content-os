// Verify Owner approval of the frozen twelve-copy editorial batch.
// This test calls the *real* approved-copy contract and semantic/editorial gates.
// It creates no binding, render, schedule or publication side effects.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateApprovedCopy, runApprovedCopyGates, sealCopyFingerprint } from "../automated-content-production/scripts/approved-copy-contract.mjs";

const root = fileURLToPath(new URL("../../../../", import.meta.url));
const read = (name) => readFileSync(path.join(root, name), "utf8");
const json = (name) => JSON.parse(read(name));
const gitBlobSha = (raw) => createHash("sha1")
  .update("blob " + Buffer.byteLength(raw, "utf8") + "\0")
  .update(raw, "utf8")
  .digest("hex");
const editorialPath = "projects/sdoh/runtime/seasonal-color/2026-11-editorial-series-draft.json";
const approvalPath = "projects/sdoh/runtime/seasonal-color/2026-11-owner-copy-approval-batch.json";
const editorial = json(editorialPath), approval = json(approvalPath);
const binding = json("projects/sdoh/runtime/seasonal-color/2026-11-content-binding.json");
const season = json("projects/sdoh/runtime/seasonal-color/2026-11-trans-awareness.json");

test("Owner approval is pinned to exact immutable draft snapshot and does not grant release rights", () => {
  assert.equal(approval.schema, "sdoh-november-2026-owner-copy-approval-batch-v1");
  assert.equal(approval.decision, "OWNER_COPY_APPROVED");
  assert.equal(approval.recorded_date, "2026-11-06");
  assert.equal(approval.approval_source.github_evidence_url,
    "https://github.com/BillyProject2505/content-os/pull/195#issuecomment-6686660189");
  assert.equal(approval.approval_source.editorial_source_blob_sha, gitBlobSha(read(editorialPath)));
  assert.equal(approval.approval_source.editorial_source_blob_sha,
    "cadaaf629376ecc1e43652284326eb045ecae101");
  assert.equal(editorial.drafts.length, 12);
  assert.equal(approval.scope.content_count, 12);
  for (const flag of [
    "owner_visual_approval", "november_binding_expansion", "global_palette_activation",
    "publication_scheduling", "publication", "merge_permission", "all_new_copy_canonical_on_main"
  ]) assert.equal(approval.scope[flag], false, flag);
  assert.equal(approval.gates.owner_copy_approval_recorded, true);
  assert.equal(approval.gates.canonical_promotion_pending_merge, true);
});

test("Each of twelve frozen copy packets passes actual approved-copy, semantic and editorial gates", () => {
  assert.equal(approval.items.length, 12);
  const draftMap = new Map(editorial.drafts.map((item) => [item.content_id, item]));
  assert.equal(draftMap.size, 12);
  const seen = new Set();
  for (const entry of approval.items) {
    assert.ok(!seen.has(entry.content_id), "duplicate content ID " + entry.content_id);
    seen.add(entry.content_id);
    const draft = draftMap.get(entry.content_id);
    assert.ok(draft, entry.content_id + " absent from Owner-approved snapshot");
    assert.equal(entry.theme, draft.theme);
    assert.equal(entry.planned_date, draft.planned_date);
    const expectedPath = "projects/sdoh/content/" +
      draft.theme.toLowerCase() + "/carousel/" + draft.content_id + ".json";
    assert.equal(entry.canonical_copy_path, expectedPath);
    const raw = read(expectedPath);
    assert.equal(gitBlobSha(raw), entry.copy_file_blob_sha, entry.content_id + " blob changed");
    const copy = validateApprovedCopy(JSON.parse(raw), {
      expectedContentId: entry.content_id,
      expectedCopyFingerprint: entry.copy_fingerprint,
    });
    assert.equal(copy.status, "COPY_APPROVED");
    assert.equal(copy.copy_fingerprint, sealCopyFingerprint(copy));
    assert.deepEqual(copy.slides, draft.slides, "approved slide text drift " + entry.content_id);
    assert.deepEqual(copy.caption_body_paragraphs, draft.caption_body_paragraphs,
      "approved caption body drift " + entry.content_id);
    const gate = runApprovedCopyGates(copy);
    assert.equal(gate.semantic.ok, true, entry.content_id);
    assert.equal(gate.editorial.ok, true, entry.content_id);
    assert.ok(gate.editorial.metrics.total_slide_words >= 35);
  }
  assert.equal(seen.size, 12);
});

test("Owner batch approval remains separate from QA binding and schedule/publication gates", () => {
  assert.equal(binding.items.length, 13);
  assert.equal(binding.items[0].content_id, "SDOH-SAGE-CAR-0015");
  assert.deepEqual(new Set(binding.items.slice(1).map(x => x.content_id)),
    new Set(approval.items.map(x => x.content_id)));
  assert.equal(season.activation.enabled, false);
  assert.equal(editorial.gates.production_binding_changes, false);
  assert.equal(editorial.gates.calendar_events_created, false);
  assert.equal(editorial.gates.scheduled, false);
  assert.equal(editorial.gates.published, false);
  assert.equal(approval.gates.render_qa_required, true);
  assert.equal(approval.gates.owner_visual_approval_required, true);
  assert.equal(approval.gates.publication_schedule_owner_approval_required, true);
});
