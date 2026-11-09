// Full November campaign integration preflight for a *proposed* QA-only binding.
// Never schedules, publishes, grants final visual approval or writes media.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateApprovedCopy, runApprovedCopyGates, assertManifestMatchesCopy
} from "../automated-content-production/scripts/approved-copy-contract.mjs";
import {
  buildCarouselRenderManifest, resolveVisualPlan
} from "../automated-content-production/scripts/carousel-manifest.mjs";
import { validateNovemberBinding } from "./verify-november-content.mjs";
import { composeNovemberCaption } from "./compose-november-caption.mjs";

const root = fileURLToPath(new URL("../../../../", import.meta.url));
const read = p => JSON.parse(fs.readFileSync(path.join(root,p), "utf8"));
const binding = read("projects/sdoh/runtime/seasonal-color/2026-11-content-binding.json");
const batch = read("projects/sdoh/runtime/seasonal-color/2026-11-owner-copy-approval-batch.json");
const draft = read("projects/sdoh/runtime/seasonal-color/2026-11-editorial-series-draft.json");
const original = read("projects/sdoh/content/sage/carousel/SDOH-SAGE-CAR-0015.owner-copy-approval.json");
const auth = read("projects/sdoh/runtime/automated-content-production/render-runtime/carousel-v060-authority.json");
const colors = read("projects/sdoh/runtime/seasonal-color/2026-11-trans-awareness.json");

test("13 QA-eligible IDs and dates follow frozen calendar; original binding is preserved", () => {
  assert.equal(binding.schema, "sdoh-november-campaign-binding-v1");
  assert.equal(binding.state, "NOVEMBER_CAMPAIGN_COPY_APPROVED");
  assert.equal(binding.items.length, 13);
  assert.equal(binding.items[0].content_id, original.content_id);
  assert.equal(binding.items[0].copy_fingerprint, original.copy_fingerprint);
  assert.equal(binding.items[0].approval_ref, original.owner_approval_evidence.github_review_record);
  assert.equal(binding.items[0].target_date, "2026-11-08");
  const dates = draft.schedule.filter(s => s.theme !== "OFF");
  assert.equal(dates.length, 13);
  assert.deepEqual(binding.items.map(x=>[x.target_date,x.content_id]),
    dates.map(x=>[x.date,x.content_id]));
  const other12 = binding.items.slice(1);
  assert.deepEqual(new Set(other12.map(x=>x.content_id)),
    new Set(batch.items.map(x=>x.content_id)));
  assert.equal(new Set(binding.items.map(x=>x.content_id)).size,13);
  assert.equal(new Set(binding.items.map(x=>x.target_date)).size,13);
  assert.equal(colors.activation.enabled,false);
});

test("all 12 Owner-approved sources pass real copy, campaign, caption, manifest and visual plan gates", () => {
  for(const entry of batch.items){
    const id=entry.content_id, theme=entry.theme, date=entry.planned_date;
    const copy=validateApprovedCopy(read(entry.canonical_copy_path),{
      expectedContentId:id, expectedCopyFingerprint:entry.copy_fingerprint
    });
    const gates=runApprovedCopyGates(copy);
    assert.equal(gates.semantic.ok,true,id);
    assert.equal(gates.editorial.ok,true,id);
    const bound=binding.items.find(x=>x.content_id===id);
    assert.deepEqual(bound,{
      content_id:id, theme,copy_fingerprint:entry.copy_fingerprint,
      target_date:date, approval_ref:batch.approval_source.github_evidence_url
    });
    const approved=validateNovemberBinding(binding,copy,{
      contentId:id, fingerprint:entry.copy_fingerprint,targetDate:date
    });
    assert.equal(approved.publication_authorized,false,id);
    const plan=resolveVisualPlan({contentId:id,theme,authority:auth});
    assert.equal(plan.wrap_mode,"balanced_3",id);
    assert.equal(plan.layout_mode,"illustrated_single_character",id);
    assert.equal(plan.anchor,"lower_right",id);
    assert.equal(plan.scale,"md",id);
    assert.equal(plan.ground_mode,"embedded",id);
    assert.ok(plan.pose_route.every(pose=>Object.hasOwn(auth.poses,pose)),id);
    const manifest=buildCarouselRenderManifest({contentId:id,theme,slides:copy.slides,authority:auth});
    assertManifestMatchesCopy(manifest,copy);
    assert.equal(manifest.slides.length,5,id);
    for(const [i,slide] of manifest.slides.entries()){
      const lineCount = (id === "SDOH-BURGUNDY-CAR-0018" && i === 1) ? 4 : 3;
      assert.equal(slide.copy.split("\n").length,lineCount,id+" slide "+(i+1));
      if (lineCount === 4) {
        assert.equal(slide.copy,
          "memahami berarti mau\nmendengar pengalaman\ntanpa buru buru\nmenyimpulkan",
          "Instance-only wrap must not change Owner-approved words");
      }
      assert.equal(slide.character.pose_id,plan.pose_route[i],id);
      assert.equal(slide.character.anchor,"lower_right",id);
      assert.equal(slide.character.scale,"md",id);
      assert.equal(slide.character.ground_mode,"embedded",id);
      assert.equal(slide.copy.replace(/\s+/g," ").trim(),copy.slides[i].copy,id);
    }
    const caption=composeNovemberCaption(copy);
    assert.ok(caption.startsWith(copy.caption_body_paragraphs.join("\n\n")),id);
    assert.match(caption,/Transgender Awareness Month November 2026/);
    assert.match(caption,/To Honor and To Hold: Their Lives, Their Legacies/);
    assert.ok(caption.endsWith("#pelanpelanaja"),id);
    for(const wrong of ["2026-11-07","2026-11-30", "2026-12-01"].filter(x=>x!==date)){
      assert.throws(()=>validateNovemberBinding(binding,copy,{
        contentId:id,fingerprint:entry.copy_fingerprint,targetDate:wrong
      }),/NOVEMBER_CAMPAIGN_BINDING_REJECTED/,id+" wrong date "+wrong);
    }
    assert.throws(()=>validateNovemberBinding(binding,copy,{
      contentId:id,fingerprint:"f".repeat(64),targetDate:date
    }),/NOVEMBER_CAMPAIGN_BINDING_REJECTED/,id+" altered fingerprint");
  }
});

test("historical copy and media stay intact; no schedule, publication or activation in QA workflow",()=>{
  const sage=read("projects/sdoh/content/sage/carousel/SDOH-SAGE-CAR-0015.json");
  assert.equal(sage.copy_fingerprint,original.copy_fingerprint);
  assert.equal(colors.activation.enabled,false);
  const yaml=fs.readFileSync(path.join(root,".github/workflows/sdoh-november-seasonal-qa.yml"),"utf8");
  assert.match(yaml,/workflow_dispatch:/);
  assert.match(yaml,/github.ref == 'refs\/heads\/main'/);
  assert.match(yaml,/RENDER_SEASONAL_QA_ONLY/);
  assert.match(yaml,/https:\/\/www\.googleapis\.com\/auth\/drive\.readonly/);
  assert.match(yaml,/Run canonical approved-copy review-package validator \(QA-only\)/);
  assert.doesNotMatch(yaml,/^\s+schedule:/m);
  assert.doesNotMatch(yaml,/^\s+pull_request_target:/m);
});
