import assert from "node:assert/strict";
import test from "node:test";
import { validateNovemberBinding } from "./verify-november-content.mjs";
import fs from "node:fs";

const id = "SDOH-SAGE-CAR-0900"; // synthetic fixture, never allocated
const fingerprint = "a".repeat(64);
const targetDate = "2026-11-10";
const copy = { content_id: id, theme: "SAGE", status: "COPY_APPROVED", copy_fingerprint: fingerprint };
const validItem = {
  content_id: id, theme: "SAGE", copy_fingerprint: fingerprint,
  target_date: targetDate, approval_ref: "https://github.com/example/content-os/issues/1"
};
const active = {
  schema: "sdoh-november-campaign-binding-v1",
  campaign: "Trans Awareness Month 2026",
  state: "NOVEMBER_CAMPAIGN_COPY_APPROVED",
  items: [validItem],
};
const args = { contentId: id, fingerprint, targetDate };
const clone = (value) => structuredClone(value);
const fails = (binding, data = copy, supplied = args) =>
  assert.throws(() => validateNovemberBinding(binding, data, supplied),
    /NOVEMBER_CAMPAIGN_BINDING_REJECTED/);

test("fail closed: repo starts without any November approved binding", () => {
  const live = JSON.parse(fs.readFileSync(new URL("./2026-11-content-binding.json", import.meta.url), "utf8"));
  assert.equal(live.state, "NO_NOVEMBER_COPY_APPROVED");
  assert.deepEqual(live.items, []);
  fails(live);
});

test("accept one explicitly bound approved November copy without granting publication", () => {
  const result = validateNovemberBinding(active, copy, args);
  assert.equal(result.theme, "SAGE");
  assert.equal(result.target_date, targetDate);
  assert.equal(result.publication_authorized, false);
});

test("reject old or unbound content and invalid campaign date", () => {
  fails({...active,items: []});
  fails(active, copy, {...args,targetDate:"2026-10-21"});
  fails(active, copy, {...args,targetDate:"2026-12-01"});
  fails(active, copy, {...args,targetDate:"2026-11-31"});
  fails({...active,items: [validItem,validItem]});
  fails({...active,campaign: "October"});
});

test("reject mismatched editorial approval, source copy, or target date", () => {
  const changed = clone(active);
  changed.items[0].copy_fingerprint = "b".repeat(64);
  fails(changed);
  const otherDay = clone(active);
  otherDay.items[0].target_date = "2026-11-09";
  fails(otherDay);
  const absentProof = clone(active);
  absentProof.items[0].approval_ref = "";
  fails(absentProof);
  const brokenProof = clone(active);
  brokenProof.items[0].approval_ref = "some evidence";
  fails(brokenProof);
  fails(active, { ...copy, status:"COPY_DRAFT" });
  fails(active, { ...copy, copy_fingerprint:"b".repeat(64) });
  fails(active, { ...copy, theme:"BURGUNDY" });
  fails({...active,state:"NO_NOVEMBER_COPY_APPROVED"});
});

test("reject schema extensions that could weaken governance", () => {
  const extra = clone(active);
  extra.items[0].auto_publish = true;
  fails(extra);
});
