import assert from "node:assert/strict";
import test from "node:test";
import { validateNovemberBinding } from "./verify-november-content.mjs";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const id = "SDOH-SAGE-CAR-0900"; // synthetic fixture, never allocated
const fingerprint = "a".repeat(64);
const targetDate = "2026-11-10";
const copy = { content_id: id, theme: "SAGE", status: "COPY_APPROVED", copy_fingerprint: fingerprint,
  slides: [{slide:1,copy:"Setiap orang transgender berhak dihormati"}],
  caption_body_paragraphs: ["Identitas gender seseorang patut dihormati."] };
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

test("binding grants QA eligibility only to Owner-approved Sage 0015 for November 8", () => {
  const live = JSON.parse(fs.readFileSync(new URL("./2026-11-content-binding.json", import.meta.url), "utf8"));
  const approved = JSON.parse(fs.readFileSync(
    new URL("../../content/sage/carousel/SDOH-SAGE-CAR-0015.json", import.meta.url), "utf8"));
  const owner = JSON.parse(fs.readFileSync(
    new URL("../../content/sage/carousel/SDOH-SAGE-CAR-0015.owner-copy-approval.json", import.meta.url), "utf8"));
  assert.equal(live.state, "NOVEMBER_CAMPAIGN_COPY_APPROVED");
  assert.equal(live.items.length, 1);
  assert.equal(owner.owner_decision, "APPROVED");
  assert.equal(owner.copy_fingerprint, approved.copy_fingerprint);
  assert.equal(live.items[0].copy_fingerprint, owner.copy_fingerprint);
  assert.equal(live.items[0].target_date, "2026-11-08");
  assert.equal(live.items[0].approval_ref, owner.owner_approval_evidence.github_review_record);
  const args = { contentId: approved.content_id, fingerprint: approved.copy_fingerprint, targetDate: "2026-11-08" };
  assert.equal(validateNovemberBinding(live, approved, args).publication_authorized, false);
  for (const day of ["2026-11-01", "2026-11-07", "2026-11-09", "2026-12-01"]) {
    assert.throws(() => validateNovemberBinding(live, approved, {...args, targetDate: day}),
      /NOVEMBER_CAMPAIGN_BINDING_REJECTED/);
  }
  fails(live); // unrelated synthetic content is still denied
  const cli = spawnSync(process.execPath, [
    new URL("./verify-november-content.mjs", import.meta.url).pathname,
    "--content-id", approved.content_id,
    "--expected-copy-fingerprint", approved.copy_fingerprint,
    "--target-date", "2026-11-08",
  ], { encoding: "utf8" });
  assert.equal(cli.status, 0, cli.stderr);
  assert.match(cli.stdout, /"publication_authorized":false/);
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
  fails(active, copy, {...args,targetDate:"2026-11-01"});
  fails(active, copy, {...args,targetDate:"2026-11-07"});
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
  fails(active, { ...copy, slides: [{slide:1,copy:"Kamu boleh menerima dirimu pelan pelan"}], caption_body_paragraphs:["Kamu berhak merasakan dukungan."] });

  fails({...active,state:"NO_NOVEMBER_COPY_APPROVED"});
});

test("reject schema extensions that could weaken governance", () => {
  const extra = clone(active);
  extra.items[0].auto_publish = true;
  fails(extra);
});

test("real CLI rejects October approved copy when labelled as November", () => {
  const oldCopy = JSON.parse(fs.readFileSync(
    new URL("../../content/sage/carousel/SDOH-SAGE-CAR-0009.json", import.meta.url), "utf8"
  ));
  const cli = spawnSync(process.execPath, [
    new URL("./verify-november-content.mjs", import.meta.url).pathname,
    "--content-id", oldCopy.content_id,
    "--expected-copy-fingerprint", oldCopy.copy_fingerprint,
    "--target-date", "2026-11-10",
  ], { encoding: "utf8" });
  assert.equal(cli.status, 1, "Old October content must never pass the November campaign gate");
  assert.match(cli.stderr, /NOVEMBER_CAMPAIGN_BINDING_REJECTED/);
  assert.doesNotMatch(cli.stderr, /ENOENT|MODULE_NOT_FOUND/);
});

test("November 8 is the first permitted campaign date", () => {
  const first = clone(active);
  first.items[0].target_date = "2026-11-08";
  const result = validateNovemberBinding(first, copy, {...args, targetDate:"2026-11-08"});
  assert.equal(result.target_date, "2026-11-08");
  assert.equal(result.publication_authorized, false);
});

test("historical staged record matches the single QA-only binding", () => {
  const draft = JSON.parse(fs.readFileSync(
    new URL("./2026-11-content-binding.staged.json", import.meta.url), "utf8"));
  const activeBinding = JSON.parse(fs.readFileSync(
    new URL("./2026-11-content-binding.json", import.meta.url), "utf8"));
  assert.equal(draft.schema, "sdoh-november-campaign-binding-staging-v1");
  assert.equal(draft.status, "PENDING_APPROVED_COPY_MAIN_MERGE");
  assert.equal(draft.campaign, "Trans Awareness Month 2026");
  assert.equal(draft.item.content_id, "SDOH-SAGE-CAR-0015");
  assert.equal(draft.item.theme, "SAGE");
  assert.equal(draft.item.copy_fingerprint, "f322a5532ba7e8d7e07fb5c37dd65b803eb69221766191b09094bb5495ff6519");
  assert.equal(draft.item.target_date, "2026-11-08");
  assert.match(draft.item.approval_ref, /^https:\/\/github\.com\/BillyProject2505\/content-os\/pull\/191#issuecomment-/);
  assert.equal(draft.gates.active_campaign_binding, false);
  assert.equal(draft.gates.production_activation, false);
  assert.equal(draft.gates.scheduled, false);
  assert.equal(draft.gates.published, false);
  assert.deepEqual(activeBinding.items, [draft.item]);
  assert.equal(activeBinding.state, "NOVEMBER_CAMPAIGN_COPY_APPROVED");
  assert.equal(draft.gates.production_activation, false);
  assert.equal(draft.gates.published, false);
});

test("manual November render includes canonical review-package validator and keeps release closed", () => {
  const yaml = fs.readFileSync(new URL("../../../../.github/workflows/sdoh-november-seasonal-qa.yml", import.meta.url), "utf8");
  const renderer = yaml.indexOf("name: Render with canonical source and isolated color overlay");
  const seasonalVerifier = yaml.indexOf("name: Verify seasonal result, hashes, source identity and contrast");
  const canonicalVerifier = yaml.indexOf("name: Run canonical approved-copy review-package validator (QA-only)");
  const upload = yaml.indexOf("name: Upload QA-only proof for explicit Owner review");
  assert.ok(0 < renderer && renderer < seasonalVerifier && seasonalVerifier < canonicalVerifier && canonicalVerifier < upload);
  assert.match(yaml, /validate-carousel-review-package\.mjs/);
  assert.match(yaml, /\.technical_qa\.text_overflow == false/);
  assert.match(yaml, /\.source_copy\.status == "COPY_APPROVED"/);
  assert.match(yaml, /\.approval == "NOT_GRANTED"/);
  assert.match(yaml, /github\.ref == 'refs\/heads\/main'/);
  assert.doesNotMatch(yaml, /^\s*(schedule|pull_request_target):\s*$/m);
});
