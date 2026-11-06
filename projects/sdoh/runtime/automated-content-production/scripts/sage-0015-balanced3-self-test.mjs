import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { resolveVisualPlan, buildCarouselRenderManifest } from "./carousel-manifest.mjs";
import { validateApprovedCopy, assertManifestMatchesCopy } from "./approved-copy-contract.mjs";

const id = "SDOH-SAGE-CAR-0015";
const root = "projects/sdoh/";
const planSource = root + "runtime/automated-content-production/render-runtime/carousel-v060-authority.json";
const copySource = root + "content/sage/carousel/" + id + ".json";
const approvedSource = root + "content/sage/carousel/" + id + ".owner-balanced3-approval.json";
const authority = JSON.parse(fs.readFileSync(planSource, "utf8"));
const rawCopy = JSON.parse(fs.readFileSync(copySource, "utf8"));
const approval = JSON.parse(fs.readFileSync(approvedSource, "utf8"));
const fingerprint = "f322a5532ba7e8d7e07fb5c37dd65b803eb69221766191b09094bb5495ff6519";
const poseRoute = ["P02","P03","P05","P06","P07"];

test("Owner approval is exact, instance-only, QA-proof specific, not publication", () => {
  assert.equal(approval.schema, "sdoh-owner-instance-wrap-approval-v1");
  assert.equal(approval.content_id, id);
  assert.equal(approval.decision, "OWNER_APPROVED_INSTANCE_WRAP_BALANCED_3");
  assert.equal(approval.scope.wrap_mode, "balanced_3");
  assert.equal(approval.scope.applies_only_to_content_id, id);
  assert.equal(approval.scope.copy_fingerprint, fingerprint);
  assert.deepEqual(approval.scope.pose_route, poseRoute);
  assert.equal(approval.scope.reference_qa_zip_sha256,
    "4130e15c01b61b9e3db0f08593c49f078097ce51624dcf9bbfd0ca2d88acd908");
  assert.match(approval.evidence.github_comment, /^https:\/\/github\.com\/BillyProject2505\/content-os\/pull\/191#issuecomment-\d+$/);
  for (const key of ["owner_final_runtime_media_approval","campaign_binding_active",
    "live_github_actions_render_qa_passed","merge_authorized",
    "production_activation_authorized","scheduled","published"]) {
    assert.equal(approval.limits[key], false, key + " cannot be authorized by balanced_3");
  }
});

test("Approved copy fingerprint unchanged and only new instance plan uses balanced_3", () => {
  const copy = validateApprovedCopy(rawCopy, {
    expectedContentId: id, expectedCopyFingerprint: fingerprint
  });
  assert.equal(authority.sage_default_visual_plan.wrap_mode, undefined);
  const plan = resolveVisualPlan({contentId:id,theme:"SAGE",authority});
  assert.deepEqual(plan, {...authority.sage_default_visual_plan,wrap_mode:"balanced_3"});
  const manifest = buildCarouselRenderManifest({
    contentId:id, theme:"SAGE",slides:copy.slides,authority
  });
  assertManifestMatchesCopy(manifest, copy);
  assert.equal(manifest.layout_mode, "illustrated_single_character");
  for (let i=0;i<5;i++) {
    const slide = manifest.slides[i];
    assert.equal(slide.copy.split("\n").length, 3, "Five slides must use exactly 3 lines");
    assert.equal(slide.copy.replace(/\s+/g," ").trim(),copy.slides[i].copy);
    assert.equal(slide.character.pose_id,poseRoute[i]);
    assert.equal(slide.character.anchor,"lower_right");
    assert.equal(slide.character.scale,"md");
    assert.equal(slide.character.ground_mode,"embedded");
    assert.equal(slide.optical_y_correction,0);
  }
});

test("Other Sage and Burgundy content plans remain unchanged", () => {
  const authorityWithoutOverride = structuredClone(authority);
  delete authorityWithoutOverride.content_visual_plans[id];
  for (const existingId of ["SDOH-SAGE-CAR-0014","SDOH-SAGE-CAR-0013",
       "SDOH-BURGUNDY-CAR-0016","SDOH-BURGUNDY-CAR-0007"]) {
    const theme = existingId.includes("-BURGUNDY-") ? "BURGUNDY":"SAGE";
    assert.deepEqual(
      resolveVisualPlan({contentId:existingId,theme,authority}),
      resolveVisualPlan({contentId:existingId,theme,authority:authorityWithoutOverride})
    );
  }
  assert.deepEqual(
    resolveVisualPlan({contentId:"SDOH-SAGE-CAR-0016",theme:"SAGE",authority}),
    authority.sage_default_visual_plan
  );
});
