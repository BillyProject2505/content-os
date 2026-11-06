// SDOH November 8 integrated QA: in-memory campaign eligibility only.
// This script never changes production campaign binding, writes media,
// authenticates to Drive, schedules, approves, merges or publishes.
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { validateApprovedCopy, runApprovedCopyGates, assertManifestMatchesCopy } from "../automated-content-production/scripts/approved-copy-contract.mjs";
import { buildCarouselRenderManifest, resolveVisualPlan } from "../automated-content-production/scripts/carousel-manifest.mjs";
import { validateNovemberBinding } from "./verify-november-content.mjs";
import { composeNovemberCaption } from "./compose-november-caption.mjs";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const base = "projects/sdoh/";
const id = "SDOH-SAGE-CAR-0015";
const fingerprint = "f322a5532ba7e8d7e07fb5c37dd65b803eb69221766191b09094bb5495ff6519";
const contentDir = base + "content/sage/carousel/";
const seasonDir = base + "runtime/seasonal-color/";
const runtimeDir = base + "runtime/automated-content-production/render-runtime/";
const copy = read(contentDir + id + ".json");
const ownerCopy = read(contentDir + id + ".owner-copy-approval.json");
const ownerWrap = read(contentDir + id + ".owner-balanced3-approval.json");
const measuredLocalProof = read(contentDir + id + ".visual-qa-candidate.json");
const visualAuthority = read(runtimeDir + "carousel-v060-authority.json");
const activeBinding = read(seasonDir + "2026-11-content-binding.json");
const stagedBinding = read(seasonDir + "2026-11-content-binding.staged.json");
const palette = read(seasonDir + "2026-11-trans-awareness.json");
const logoManifest = read(seasonDir + "2026-11-logo-derivatives.json");

test("approved content and per-content visual override remain cryptographically pinned", () => {
  const validated = validateApprovedCopy(copy, {
    expectedContentId: id, expectedCopyFingerprint: fingerprint
  });
  assert.equal(ownerCopy.owner_decision, "APPROVED");
  assert.equal(ownerCopy.copy_fingerprint, fingerprint);
  assert.equal(ownerCopy.campaign_target_date, "2026-11-08");
  assert.equal(ownerCopy.lifecycle.scheduled, false);
  assert.equal(ownerCopy.lifecycle.published, false);
  assert.equal(ownerWrap.decision, "OWNER_APPROVED_INSTANCE_WRAP_BALANCED_3");
  assert.equal(ownerWrap.scope.applies_only_to_content_id, id);
  assert.equal(ownerWrap.scope.copy_fingerprint, fingerprint);
  assert.equal(ownerWrap.limits.owner_final_runtime_media_approval, false);
  const gates = runApprovedCopyGates(validated);
  assert.equal(gates.semantic.hit_count >= 4, true);
  assert.equal(gates.editorial.ok, true);
  const plan = resolveVisualPlan({contentId:id,theme:"SAGE",authority:visualAuthority});
  assert.equal(plan.wrap_mode, "balanced_3");
  assert.deepEqual(plan.pose_route, ["P02","P03","P05","P06","P07"]);
  assert.deepEqual({...plan,wrap_mode:undefined}, {...visualAuthority.sage_default_visual_plan,wrap_mode:undefined});
  const manifest = buildCarouselRenderManifest({
    contentId:id,theme:"SAGE",slides:validated.slides,authority:visualAuthority
  });
  assertManifestMatchesCopy(manifest,validated);
  assert.equal(manifest.slides.length,5);
  for(let i=0;i<5;i++){
    const slide=manifest.slides[i];
    assert.equal(slide.copy.split("\n").length,3);
    assert.equal(slide.copy.replace(/\s+/g," "), copy.slides[i].copy);
    assert.equal(slide.character.pose_id,plan.pose_route[i]);
    assert.equal(slide.character.anchor,"lower_right");
    assert.equal(slide.character.scale,"md");
    assert.equal(slide.character.ground_mode,"embedded");
    assert.equal(slide.optical_y_correction,0);
  }
});

test("campaign approved staging can validate in memory but runtime binding stays dormant", () => {
  assert.equal(activeBinding.state,"NO_NOVEMBER_COPY_APPROVED");
  assert.deepEqual(activeBinding.items,[]);
  assert.equal(stagedBinding.status,"PENDING_APPROVED_COPY_MAIN_MERGE");
  assert.equal(stagedBinding.gates.active_campaign_binding,false);
  assert.equal(stagedBinding.item.content_id,id);
  assert.equal(stagedBinding.item.copy_fingerprint,fingerprint);
  assert.equal(stagedBinding.item.target_date,"2026-11-08");
  assert.throws(() => validateNovemberBinding(activeBinding, copy, {
    contentId:id, fingerprint,targetDate:"2026-11-08"
  }),/NOVEMBER_CAMPAIGN_BINDING_REJECTED/);
  const synthetic = {
    schema:"sdoh-november-campaign-binding-v1",
    campaign:"Trans Awareness Month 2026",
    items:[stagedBinding.item],
    state:"NOVEMBER_CAMPAIGN_COPY_APPROVED"
  };
  const result=validateNovemberBinding(synthetic,copy,{
    contentId:id,fingerprint,targetDate:"2026-11-08"
  });
  assert.equal(result.publication_authorized,false);
  for(const d of ["2026-11-01","2026-11-07","2026-12-01"]){
    assert.throws(() => validateNovemberBinding(synthetic,copy,{
      contentId:id,fingerprint,targetDate:d
    }),/NOVEMBER_CAMPAIGN_BINDING_REJECTED/);
  }
});

test("seasonal palette and exact two-line caption do not mutate approved body", () => {
  assert.equal(palette.activation.enabled,false);
  assert.equal(palette.period.start,"2026-11-08");
  assert.equal(palette.period.end,"2026-11-30");
  assert.deepEqual(palette.period,logoManifest.period);
  assert.equal(palette.tokens.SAGE.surface,"#C5E4F0");
  assert.equal(palette.tokens.SAGE.text_fill,"#355E78");
  assert.equal(palette.tokens.SAGE.character_fill,"#355E78");
  assert.equal(palette.tokens.SAGE.logo_fill,"#355E78");
  assert.equal(logoManifest.assets.SAGE.sha256,"52fe51bb5954e5b735acb2be52e7444a31171f1eb6180266a925328f7ca4ce51");
  const before=JSON.stringify(copy);
  const caption=composeNovemberCaption(copy);
  const body=copy.caption_body_paragraphs.join("\n\n");
  assert.equal(caption,body+"\n\nsatu dosis obat hati\n"+
   "Transgender Awareness Month November 2026\n"+
   "To Honor and To Hold: Their Lives, Their Legacies\n"+
   "#satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja");
  assert.equal(JSON.stringify(copy),before);
});

test("previous local QA proof stays reference only, release & main-gated live workflow stay inactive", () => {
  const candidate=measuredLocalProof.candidate_alternative;
  assert.equal(candidate.mode,"balanced_3");
  assert.equal(candidate.technical_status,"LOCAL_QA_RENDER_PASS");
  assert.equal(candidate.measured_main_text_ink_widths_px.length,5);
  assert.equal(Math.max(...candidate.measured_main_text_ink_widths_px) <=600,true);
  assert.equal(measuredLocalProof.QA_proof.zip_sha256,"4130e15c01b61b9e3db0f08593c49f078097ce51624dcf9bbfd0ca2d88acd908");
  assert.equal(candidate.original_source_copy_modified,false);
  assert.equal(measuredLocalProof.gating.runtime_github_actions_QA,false);
  assert.equal(measuredLocalProof.gating.production_activation,false);
  assert.equal(measuredLocalProof.gating.scheduled,false);
  assert.equal(measuredLocalProof.gating.published,false);
  const workflow=fs.readFileSync(".github/workflows/sdoh-november-seasonal-qa.yml","utf8");
  assert.match(workflow,/github\.ref == 'refs\/heads\/main'/);
  assert.match(workflow,/workflow_dispatch:/);
  assert.doesNotMatch(workflow,/\b(pull_request_target|schedule):/);
});
