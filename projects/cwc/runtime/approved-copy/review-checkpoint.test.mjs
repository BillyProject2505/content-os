import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {makeReviewCheckpoint,reviewMarkdown,attachRenderedEvidence} from "./review-checkpoint.mjs";

const id4="CWC-CRSL-0004",id5="CWC-CRSL-0005";
const hashes={
  expectedCopyFingerprint:"27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60",
  expectedLayoutFingerprint:"a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124"
};
const script="projects/cwc/runtime/approved-copy/review-checkpoint.mjs";
test("one run reports all 11 stages without inventing QA",()=>{
  const p=makeReviewCheckpoint(id4,hashes);
  assert.equal(p.stage_evidence.length,11);
  assert.equal(p.checkpoint_status,"RENDER_CANDIDATE_INPUT_CROSSCHECKED");
  assert.equal(p.stage_evidence[7].checkpoint_verdict,"NOT_VERIFIED_BY_THIS_RUN");
  assert.equal(p.scope.canonical_register_writeback,false);
  assert.equal(p.usable_as_final_visual_review_package,false);
});
test("approved raster is not re-rendered or treated as live",()=>{
  const p=makeReviewCheckpoint(id5);
  assert.equal(p.checkpoint_status,"EXISTING_APPROVED_MEDIA_CROSSCHECKED");
  assert.equal(p.stage_evidence[7].checkpoint_verdict,"QA_RECORD_PASS");
  assert.equal(p.stage_evidence[8].checkpoint_verdict,"OWNER_APPROVAL_RECORD_APPROVED");
  assert.equal(p.stage_evidence[9].checkpoint_verdict,"NO_PUBLICATION_AUTHORIZATION_IN_THIS_RUN");
  assert.equal(p.approved_media_hashes.approved_jpeg_sha256_in_order.length,5);
  assert.equal(p.scope.instagram_publication_verified,false);
  assert.equal(p.scope.rendered_media,false);
});
test("reject unknown ID, missing fingerprint, mismatched and cross-lane fingerprints",()=>{
  assert.throws(()=>makeReviewCheckpoint("../0004"),/invalid CWC/);
  assert.throws(()=>makeReviewCheckpoint(id4),/FINGERPRINT_REQUIRED/);
  assert.throws(()=>makeReviewCheckpoint(id4,{...hashes,expectedCopyFingerprint:"0".repeat(64)}),/FINGERPRINT_MISMATCH/);
  assert.throws(()=>makeReviewCheckpoint(id5,hashes),/FINGERPRINT_MODE_INVALID/);
});
test("readable summary includes caption and does not claim publication",()=>{
  const text=reviewMarkdown(makeReviewCheckpoint(id5));
  assert.match(text,/HIV positif bukan akhir ceritamu/);
  assert.match(text,/#Manado/);
  assert.match(text,/No visual render, publication, schedule, or canonical writeback/);
  assert.doesNotMatch(text,/READY_FOR_PUBLICATION|PUBLISHED/);
});
test("single execution produces one evidence package with two files",()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),"cwc-checkpoint-"));
  try{
    const r=spawnSync(process.execPath,[script,"--content-id",id5,"--out",dir],{encoding:"utf8"});
    assert.equal(r.status,0,r.stderr);
    assert.deepEqual(fs.readdirSync(dir).sort(),["review-checkpoint.json","review-summary.md"]);
    const p=JSON.parse(fs.readFileSync(path.join(dir,"review-checkpoint.json"),"utf8"));
    assert.equal(p.scope.stg10_publication_authorization_created,false);
    assert.equal(p.stage_evidence.length,11);
  }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test("Actions entrypoint never needs secret or redundant confirmation",()=>{
  const y=fs.readFileSync(".github/workflows/cwc-production-review-one-run.yml","utf8");
  assert.match(y,/workflow_dispatch:/);
  assert.match(y,/contents: read/);
  assert.match(y,/review-checkpoint\.mjs/);
  assert.match(y,/upload-artifact@v4/);
  assert.doesNotMatch(y,/contents: write|secrets\.|graph\.facebook|schedule:/);
  assert.match(y,/id-token: write/);
  assert.match(y,/google-github-actions\/auth@v3/);
  assert.match(y,/service_account: \$\{\{ vars\.CWC_GCP_SERVICE_ACCOUNT \}\}/);
  assert.match(y,/https:\/\/www\.googleapis\.com\/auth\/drive\.readonly/);
  assert.match(y,/check-render-artifact\.py/);
  assert.doesNotMatch(y,/confirmation:/);
});

test("limited byte evidence does not auto grant Owner approval or publish",()=>{
  const packet=makeReviewCheckpoint(id4,hashes);
  const e={
    schema:"cwc-render-artifact-integrity-v1",content_id:id4,
    verdict:"ARTIFACT_INTEGRITY_PASS",actual_rendered_candidate:true,
    independent_clinical_qa_passed:false,formal_stg08_qa_passed:false,
    owner_stg09_approved_by_this_run:false,stg10_publication_authorized:false,
    publication_performed:false,source_copy_sha256:hashes.expectedCopyFingerprint,
    slides:packet.slides.map((x,i)=>({
      order:i+1,name:"slide-"+String(i+1).padStart(2,"0")+".png",
      sha256:"a".repeat(64),dimensions:[1080,1350]
    })),contact_sheet_sha256:"b".repeat(64)
  };
  const result=attachRenderedEvidence(packet,e);
  assert.equal(result.scope.rendered_media,true);
  assert.equal(result.stage_evidence[7].checkpoint_verdict,"NOT_VERIFIED_BY_THIS_RUN");
  assert.equal(result.scope.stg09_decision_created,false);
  assert.equal(result.usable_as_final_visual_review_package,false);
  assert.match(reviewMarkdown(result),/NO formal STG-08/);
  assert.throws(()=>attachRenderedEvidence(makeReviewCheckpoint(id5),e),/fresh editable/);
  assert.throws(()=>attachRenderedEvidence(packet,{...e,stg10_publication_authorized:true}),/invalid or elevated/);
  assert.throws(()=>attachRenderedEvidence(packet,{...e,formal_stg08_qa_passed:true}),/invalid or elevated/);
  assert.throws(()=>attachRenderedEvidence(packet,{...e,slides:e.slides.slice(1)}),/slides do not match/);
});
