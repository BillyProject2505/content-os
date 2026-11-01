import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {prepareReview} from "./prepare-review.mjs";

const ID="CWC-CRSL-0004";
const COPY_FP="27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60";
const LAYOUT_FP="a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124";
const root="projects/cwc/content/carousel/";
const copy=JSON.parse(fs.readFileSync(root+ID+".json","utf8"));
const layout=JSON.parse(fs.readFileSync(root+ID+".layout.json","utf8"));
const params={contentId:ID,copyFingerprint:COPY_FP,layoutFingerprint:LAYOUT_FP};

test("Phase 1 uses actual CWC approved copy and layout but never grants release",()=>{
  const out=prepareReview(copy,layout,params);
  assert.equal(out.preflight.result,"COPY_PREFLIGHT_PASS");
  assert.equal(out.plan.status,"RENDER_PLAN_CANDIDATE");
  assert.equal(out.typed.typography_layout.fingerprint,LAYOUT_FP);
  assert.equal(out.typed.slides.length,5);
  assert.equal(out.manifest.state,"PHASE1_VALIDATED_UNAPPROVED");
  assert.equal(out.researchEvidence.result,"RESEARCH_EVIDENCE_STRUCTURE_PASS");
  assert.equal(out.manifest.evidence.research_evidence_structure,"PASS");
  assert.equal(out.manifest.evidence.clinical_claims_verified,false);
  assert.equal(out.manifest.evidence.publication_authorized,false);
  for(const gate of ["live_owner_approval_verified","content_register_live_verified",
    "clinical_claims_verified","asset_bytes_verified","deterministic_render_performed",
    "stg08_technical_qa_passed","stg09_final_owner_approval_granted",
    "stg10_release_identity_issued"]) {
    assert.equal(out.manifest.evidence[gate],false,gate);
  }
});
test("Phase 1 fails closed on independent mismatched hashes and missing ID",()=>{
  assert.throws(()=>prepareReview(copy,layout,{...params,copyFingerprint:"0".repeat(64)}),/FINGERPRINT_MISMATCH/);
  assert.throws(()=>prepareReview(copy,layout,{...params,layoutFingerprint:"0".repeat(64)}),/LAYOUT_FINGERPRINT_MISMATCH/);
  assert.throws(()=>prepareReview(copy,layout,{...params,contentId:"CWC-CRSL-0005"}),/source Content IDs differ/);
  assert.throws(()=>prepareReview(copy,layout,{...params,contentId:"../outside"}),/Content ID invalid/);
});
test("Phase 1 never repairs frozen copy, missing source records or unsafe layout",()=>{
  const badCopy=structuredClone(copy);
  badCopy.slides[0].text+=" additional text";
  assert.throws(()=>prepareReview(badCopy,layout,params),/FINGERPRINT_MISMATCH/);
  const noSources=structuredClone(copy);
  noSources.source_evidence=[];
  assert.throws(()=>prepareReview(noSources,layout,params),/SOURCES_MISSING/);
  const badLayout=structuredClone(layout);
  badLayout.slides[3].blocks[1].rect.height=330;
  assert.throws(()=>prepareReview(copy,badLayout,{...params,layoutFingerprint:LAYOUT_FP}),/LAYOUT_FINGERPRINT_MISMATCH/);
});
test("Phase 1 CLI creates only non-publishable four-file JSON review package",()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),"cwc-phase1-test-"));
  try {
    const run=spawnSync(process.execPath,[
      "projects/cwc/runtime/approved-copy/prepare-review.mjs",
      "--content-id",ID,"--copy-fingerprint",COPY_FP,
      "--layout-fingerprint",LAYOUT_FP,"--out",temp
    ],{encoding:"utf8"});
    assert.equal(run.status,0,run.stderr);
    assert.deepEqual(fs.readdirSync(temp).sort(),[
      "copy-preflight.json","phase1-manifest.json","render-plan-typed.json","render-plan.json","research-evidence.json"
    ]);
    const report=JSON.parse(fs.readFileSync(path.join(temp,"phase1-manifest.json"),"utf8"));
    assert.equal(report.evidence.publication_authorized,false);
    assert.equal(report.content_id,ID);
    assert.equal(report.slide_count,5);
  } finally { fs.rmSync(temp,{recursive:true,force:true}); }
});
test("Phase 1 Actions workflow stays manual on main with no Drive/Meta write permissions",()=>{
  const yaml=fs.readFileSync(".github/workflows/cwc-phase1-review-preparation.yml","utf8");
  assert.match(yaml,/github\.event_name == 'workflow_dispatch' && github\.ref == 'refs\/heads\/main'/);
  assert.match(yaml,/contents: read/);
  assert.match(yaml,/PREPARE_UNAPPROVED_CWC_REVIEW/);
  assert.doesNotMatch(yaml,/id-token: write|drive\.readonly|google-github-actions\/auth|secrets\.|graph\.facebook|instagram\.com\/api|upload-media/);
  assert.match(yaml,/projects\/cwc\/runtime\/approved-copy\/prepare-review\.mjs/);
});
