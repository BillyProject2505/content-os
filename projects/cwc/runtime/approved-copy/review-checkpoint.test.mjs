import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {makeReviewCheckpoint,reviewMarkdown} from "./review-checkpoint.mjs";

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
  assert.doesNotMatch(y,/id-token: write|contents: write|secrets\.|graph\.facebook|schedule:/);
  assert.doesNotMatch(y,/confirmation:/);
});
