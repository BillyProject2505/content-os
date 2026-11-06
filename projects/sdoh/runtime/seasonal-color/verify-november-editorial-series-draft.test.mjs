// Editorial preflight only: this batch is NOT approved copy or a publishing plan.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("./", import.meta.url);
const json = (name) => JSON.parse(readFileSync(new URL(name, root), "utf8"));
const draft = json("2026-11-editorial-series-draft.json");
const binding = json("2026-11-content-binding.json");
const season = json("2026-11-trans-awareness.json");
const approved = JSON.parse(readFileSync(new URL(
  "../../content/sage/carousel/SDOH-SAGE-CAR-0015.json", root), "utf8"));
const count = (text) => text.trim().split(/\s+/).length;

test("November 8–30 cadence is exactly Sage, off, Burgundy, Sage, off, Burgundy, off", () => {
  assert.equal(draft.state, "EDITORIAL_DRAFT_ONLY_NOT_CANONICAL");
  assert.equal(draft.period.start, "2026-11-08");
  assert.equal(draft.period.end, "2026-11-30");
  assert.equal(draft.timezone, "Asia/Makassar");
  assert.equal(draft.cadence.publication_time, null);
  assert.deepEqual(draft.cadence.days, ["SAGE", "OFF", "BURGUNDY", "SAGE", "OFF", "BURGUNDY", "OFF"]);
  assert.equal(draft.schedule.length, 23);
  const start = Date.UTC(2026, 10, 8);
  const known = new Set();
  draft.schedule.forEach((slot, i) => {
    const expectedDate = new Date(start + i * 86400000).toISOString().slice(0, 10);
    assert.equal(slot.date, expectedDate);
    assert.equal(slot.theme, draft.cadence.days[i % 7]);
    if (slot.theme === "OFF") {
      assert.equal(slot.status, "NO_POST_PLANNED");
      assert.equal(slot.content_id, undefined);
    } else {
      assert.match(slot.content_id, /^SDOH-(SAGE|BURGUNDY)-CAR-\d{4}$/);
      assert.ok(!known.has(slot.content_id));
      known.add(slot.content_id);
    }
  });
  const posts = draft.schedule.filter(x => x.theme !== "OFF");
  assert.equal(posts.length, 13);
  assert.equal(posts.filter(x => x.theme === "SAGE").length, 7);
  assert.equal(posts.filter(x => x.theme === "BURGUNDY").length, 6);
  assert.equal(draft.schedule.find(x => x.date === "2026-11-13").theme, "BURGUNDY");
  assert.equal(draft.schedule.find(x => x.date === "2026-11-20").theme, "BURGUNDY");
  assert.equal(draft.schedule.find(x => x.date === "2026-11-30").theme, "OFF");
});

test("twelve complete five-slide/caption drafts are allocated only editorially", () => {
  assert.equal(draft.drafts.length, 12);
  const ids = new Set();
  const slots = new Map(draft.schedule.map(x => [x.date, x]));
  for (const item of draft.drafts) {
    assert.equal(item.status, "COPY_DRAFT");
    assert.ok(!ids.has(item.content_id));
    ids.add(item.content_id);
    assert.equal(slots.get(item.planned_date)?.content_id, item.content_id);
    assert.equal(slots.get(item.planned_date)?.theme, item.theme);
    assert.equal(item.slides.length, 5);
    const lengths = item.slides.map((s, i) => {
      assert.equal(s.slide, i + 1);
      assert.equal(s.copy.trim(), s.copy);
      assert.ok(!/[\r\n\t]/.test(s.copy));
      return count(s.copy);
    });
    assert.ok(lengths.every(n => n >= 7 && n <= 12),
      item.content_id + ": slide word counts " + lengths.join(","));
    assert.ok(lengths.reduce((a, b) => a + b) >= 35);
    assert.equal(item.caption_body_paragraphs.length, 3);
    const caption = item.caption_body_paragraphs.join(" ");
    assert.ok(count(caption) >= 45 && count(caption) <= 78, item.content_id);
    assert.doesNotMatch(caption, /#|satu dosis obat hati/i);
    assert.match(item.slides.map(x => x.copy).join(" ") + " " + caption, /transgender|identitas gender/i);
    for (const flag of ["owner_copy_approval", "owner_visual_approval", "production_binding", "scheduled", "published"]) {
      assert.equal(item[flag], false, item.content_id + " flag " + flag);
    }
  }
  assert.equal(ids.size, 12);
});

test("previously approved item remains unchanged and new drafts are not bound or scheduled", () => {
  assert.equal(approved.content_id, "SDOH-SAGE-CAR-0015");
  assert.equal(approved.status, "COPY_APPROVED");
  assert.equal(draft.existing_approved_content.source_copy_fingerprint, approved.copy_fingerprint);
  assert.deepEqual(binding.items.map(x => x.content_id), ["SDOH-SAGE-CAR-0015"]);
  assert.equal(season.activation.enabled, false);
  for (const flag of ["production_binding_changes", "production_activation", "calendar_events_created", "scheduled", "published"]) {
    assert.equal(draft.gates[flag], false);
  }
});
