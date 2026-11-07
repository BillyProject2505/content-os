// Fail-closed configuration checks for the 10-item *manual QA-only* batch.
// No rendering, scheduling, publishing or external API interactions.
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const src = new URL("./", import.meta.url);
const get = (p) => readFileSync(new URL(p, src), "utf8");
const json = (p) => JSON.parse(get(p));
const batch = get("../../../../.github/workflows/sdoh-november-batch-qa.yml");
const reused = get("../../../../.github/workflows/sdoh-november-seasonal-qa.yml");
const binding = json("2026-11-content-binding.json");
const owner = json("2026-11-owner-copy-approval-batch.json");
const firstThree = ["SDOH-SAGE-CAR-0015", "SDOH-BURGUNDY-CAR-0017", "SDOH-SAGE-CAR-0016"];

function matrixEntries() {
  const from = batch.indexOf("        include:\n");
  const to = batch.indexOf("    uses: ./.github/workflows/sdoh-november-seasonal-qa.yml", from);
  assert.ok(from > 0 && to > from, "Matrix boundaries cannot be determined");
  const fragment = batch.slice(from + "        include:\n".length, to);
  const pattern = /          - content_id: (SDOH-(?:SAGE|BURGUNDY)-CAR-\d{4})\n            expected_copy_fingerprint: ([a-f0-9]{64})\n            target_date: (2026-11-\d{2})(?:\n|$)/g;
  const entries = [...fragment.matchAll(pattern)].map(x => ({
    content_id: x[1], copy_fingerprint: x[2], target_date: x[3]
  }));
  assert.equal(fragment.trim().split(/\n(?=          - content_id: )/).length, entries.length,
    "Unexpected fields or malformed matrix item");
  return entries;
}

test("batch has exactly ten remaining items and excludes three final-approved media", () => {
  assert.equal(binding.items.length, 13);
  assert.deepEqual(binding.items.slice(0, 3).map(x => x.content_id), firstThree);
  const items = matrixEntries();
  assert.equal(items.length, 10);
  assert.deepEqual(items, binding.items.slice(3).map(x => ({
    content_id: x.content_id, copy_fingerprint: x.copy_fingerprint, target_date: x.target_date
  })));
  assert.equal(new Set(items.map(x => x.content_id)).size, 10);
  assert.equal(new Set(items.map(x => x.target_date)).size, 10);
  for (const x of items) {
    assert.ok(!firstThree.includes(x.content_id), x.content_id);
    const rec = owner.items.find(y => y.content_id === x.content_id);
    assert.ok(rec, "Unapproved ID " + x.content_id);
    assert.equal(rec.copy_fingerprint, x.copy_fingerprint);
    assert.equal(rec.planned_date, x.target_date);
  }
});

test("batch can only be started deliberately from main; independent jobs do not stop on first failure", () => {
  assert.match(batch, /^on:\n  workflow_dispatch:\n/m);
  assert.doesNotMatch(batch, /^\s*(schedule|push|pull_request|pull_request_target):/m);
  assert.match(batch,/if: github\.ref == 'refs\/heads\/main' && inputs\.confirmation == 'RENDER_REMAINING_10_QA_ONLY'/);
  assert.match(batch, /fail-fast: false/);
  assert.match(batch, /max-parallel: 2/);
  assert.match(batch, /permissions:\n  contents: read\n  id-token: write/);
  assert.match(batch, /    uses: \.\/\.github\/workflows\/sdoh-november-seasonal-qa\.yml\n    with:/);
  assert.match(batch,/content_id: \$\{\{ matrix\.content_id \}\}/);
  assert.match(batch,/expected_copy_fingerprint: \$\{\{ matrix\.expected_copy_fingerprint \}\}/);
  assert.match(batch,/target_date: \$\{\{ matrix\.target_date \}\}/);
  assert.match(batch,/confirmation: RENDER_SEASONAL_QA_ONLY/);
  assert.doesNotMatch(batch, /\bsecrets:\s*inherit\b/);
});

test("reusable workflow retains all QA-only and no-publication gates", () => {
  assert.match(reused, /^on:\n  workflow_dispatch:\n/m);
  assert.match(reused,/^  workflow_call:\n    inputs:/m);
  for (const name of ["content_id","expected_copy_fingerprint","target_date","confirmation"]) {
    const expected = new RegExp("  workflow_call:[\\s\\S]*?      " + name + ":\\n[\\s\\S]*?        required: true");
    assert.match(reused,expected);
  }
  assert.match(reused,/if: github\.ref == 'refs\/heads\/main'/);
  assert.match(reused,/test "\$CONFIRMATION" = "RENDER_SEASONAL_QA_ONLY"/);
  assert.match(reused,/https:\/\/www\.googleapis\.com\/auth\/drive\.readonly/);
  assert.match(reused,/\.approval == "NOT_GRANTED"/);
  assert.match(reused,/\.technical_qa\.text_overflow == false/);
  assert.match(reused,/\.publication_authorized == false/);
  assert.match(reused,/Upload QA-only proof for explicit Owner review/);
  assert.doesNotMatch(reused,/^\s*(schedule|pull_request_target):/m);
  assert.doesNotMatch(batch, /instagram|publish_workflow|schedule_event/i);
});
