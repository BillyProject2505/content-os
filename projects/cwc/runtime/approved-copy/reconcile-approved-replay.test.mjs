import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {makeReviewCheckpoint,attachRenderedEvidence} from "./review-checkpoint.mjs";
import {reconcileFromDisk,compareApprovedReplay} from "./reconcile-approved-replay.mjs";

const id="CWC-CRSL-0004";
const opts={
  expectedCopyFingerprint:"27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60",
  expectedLayoutFingerprint:"a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124"
};
const qaPath="projects/cwc/content/qa/"+id+".stg08-qa.json";
const approvalPath="projects/cwc/content/approval/"+id+".stg09-approval.json";
const releasePath="projects/cwc/content/release/"+id+".stg10-release-preparation.json";
const files={
  qa:JSON.parse(fs.readFileSync(qaPath,"utf8")),
  qaRaw:fs.readFileSync(qaPath,"utf8"),
  approval:JSON.parse(fs.readFileSync(approvalPath,"utf8")),
  release:JSON.parse(fs.readFileSync(releasePath,"utf8")),
  approvalRaw:fs.readFileSync(approvalPath,"utf8")
};
const paths={qa:qaPath,approval:approvalPath,release:releasePath};
function packet(){
  const base=makeReviewCheckpoint(id,opts);
  const e={
    schema:"cwc-render-artifact-integrity-v1",content_id:id,
    verdict:"ARTIFACT_INTEGRITY_PASS",actual_rendered_candidate:true,
    independent_clinical_qa_passed:false,formal_stg08_qa_passed:false,
    owner_stg09_approved_by_this_run:false,stg10_publication_authorized:false,
    publication_performed:false,source_copy_sha256:opts.expectedCopyFingerprint,
    slides:files.release.publishable_artifacts.ordered_files.map(x=>({
      order:x.order,name:x.name,sha256:x.sha256,dimensions:[1080,1350]
    })),
    contact_sheet_sha256:"b".repeat(64)
  };
  return attachRenderedEvidence(base,e);
}
test("exact approved 0004 replay reuses recorded evidence without creating approval",()=>{
  const out=reconcileFromDisk(packet());
  assert.equal(out.status,"IDENTICAL_TO_EXISTING_STG08_STG09_APPROVED_BYTES");
  assert.equal(out.exact_historically_approved_bytes_confirmed,true);
  assert.equal(out.reason.slide_count,5);
  assert.equal(out.reason.prior_qa_verdict,"PASS");
  assert.equal(out.new_stg08_qa_performed,false);
  assert.equal(out.new_stg09_owner_approval_created,false);
  assert.equal(out.publication_authorized_by_this_check,false);
  assert.equal(out.can_reuse_old_publication_time,false);
  assert.equal(out.current_register_state_verified,false);
});
test("changed one image or caption invalidates identity match without auto-approval",()=>{
  const p=packet();
  const slides=p.render_artifact_integrity.slides.map(x=>({...x}));
  slides[0].sha256="0".repeat(64);
  const out=compareApprovedReplay({...p,render_artifact_integrity:{...p.render_artifact_integrity,slides}},files,paths);
  assert.equal(out.exact_historically_approved_bytes_confirmed,false);
  assert.equal(out.status,"DIFFERENT_OR_INVALID_HISTORICAL_APPROVAL_REQUIRES_REVIEW");
  assert.match(JSON.stringify(out.reason),/at least one slide differs/);
  const c=compareApprovedReplay({...p,caption:p.caption+" changed"},files,paths);
  assert.equal(c.exact_historically_approved_bytes_confirmed,false);
  assert.match(JSON.stringify(c.reason),/release identity/);
});
test("cannot launder false historical STG-08 or STG-09 records",()=>{
  const p=packet();
  const a=compareApprovedReplay(p,{...files,qa:{...files.qa,verdict:"FAIL"}},paths);
  assert.equal(a.exact_historically_approved_bytes_confirmed,false);
  const b=compareApprovedReplay(p,{...files,approval:{...files.approval,decision:"REJECTED"}},paths);
  assert.equal(b.exact_historically_approved_bytes_confirmed,false);
  const c=compareApprovedReplay(p,{...files,approvalRaw:files.approvalRaw+" "},paths);
  assert.equal(c.exact_historically_approved_bytes_confirmed,false);
});
test("approved raster and unknown content IDs do not claim old approval",()=>{
  assert.equal(reconcileFromDisk(makeReviewCheckpoint("CWC-CRSL-0005")).exact_historically_approved_bytes_confirmed,false);
  assert.throws(()=>compareApprovedReplay({content_id:"../0004"},files,paths),/invalid Content ID/);
  const p=packet();
  assert.equal(compareApprovedReplay(p,{},paths).status,"NO_COMPLETE_PREEXISTING_APPROVAL_BUNDLE");
});
test("one-run must report equivalence read-only and cannot authorize scheduling",()=>{
  const y=fs.readFileSync(".github/workflows/cwc-production-review-one-run.yml","utf8");
  assert.match(y,/reconcile-approved-replay\.mjs/);
  assert.match(y,/approved-render-equivalence\.json/);
  assert.doesNotMatch(y,/CWC_META_ACCESS_TOKEN|graph\.facebook|contents: write/);
});
