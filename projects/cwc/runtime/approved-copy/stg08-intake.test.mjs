import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {makeReviewCheckpoint,attachRenderedEvidence} from "./review-checkpoint.mjs";
import {assembleStg08Intake,intakeMarkdown} from "./stg08-intake.mjs";

const id4="CWC-CRSL-0004",id5="CWC-CRSL-0005";
const pins={
  expectedCopyFingerprint:"27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60",
  expectedLayoutFingerprint:"a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124"
};
const repo="projects/cwc";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const authorities={
  qaAuthority:fs.readFileSync(repo+"/DIUA-DIC-000019_CWC-QA-Mechanism.md","utf8"),
  formatAuthority:fs.readFileSync(repo+"/DIUA-DIC-000029_CWC-FORMAT-CAROUSEL.md","utf8")
};
function fixture(){
  const packet=makeReviewCheckpoint(id4,pins);
  const artifact={
    schema:"cwc-render-artifact-integrity-v1",content_id:id4,
    verdict:"ARTIFACT_INTEGRITY_PASS",actual_rendered_candidate:true,
    independent_clinical_qa_passed:false,formal_stg08_qa_passed:false,
    owner_stg09_approved_by_this_run:false,stg10_publication_authorized:false,
    publication_performed:false,source_copy_sha256:pins.expectedCopyFingerprint,
    slides:packet.slides.map((s,i)=>({
      order:i+1,name:"slide-"+String(i+1).padStart(2,"0")+".png",
      sha256:"a".repeat(64),dimensions:[1080,1350]
    })),
    contact_sheet_sha256:"b".repeat(64)
  };
  const completed=attachRenderedEvidence(packet,artifact);
  return {packet:completed,artifact,copy:read(repo+"/content/carousel/"+id4+".json"),
    research:read(repo+"/content/research/"+id4+".research.json"),...authorities};
}
test("real CWC authorities assemble 20 pending review items with source traces",()=>{
  const f=fixture();
  const doc=assembleStg08Intake(f.packet,f.artifact,f);
  assert.equal(doc.status,"STG08_EVIDENCE_PREPARED_AWAITING_INDEPENDENT_REVIEW");
  assert.equal(doc.applicable_criteria_preparation.candidate_count,20);
  assert.equal(doc.pending_review_count,20);
  assert.equal(doc.applicable_criteria_preparation.criteria[0].review_key,"CORE-QA-00");
  assert.equal(doc.applicable_criteria_preparation.criteria[9].review_key,"CORE-QA-09");
  assert.equal(doc.applicable_criteria_preparation.criteria[10].review_key,"ASSET-QA-01");
  assert.equal(doc.applicable_criteria_preparation.criteria[11].canonical_criterion_id,null);
  assert.equal(doc.claim_source_matrix.length>0,true);
  assert.equal(doc.claim_source_matrix.every(c=>c.sources.every(s=>s.url?.startsWith("https://"))),true);
  assert.equal(doc.formal_stg08_verdict,null);
  assert.equal(doc.formal_stg08_qa_record_created,false);
  assert.equal(doc.stg10_publication_authorized,false);
  assert.equal(doc.owner_stg09_approval_granted,false);
  assert.match(intakeMarkdown(doc),/NOT a formal QA Record/);
});
test("cannot turn immutable previously-approved media into a fresh STG-08 intake",()=>{
  const f=fixture();
  assert.throws(()=>assembleStg08Intake(makeReviewCheckpoint(id5),f.artifact,f),/only new editable/);
});
test("cannot elevate a technical QA assertion into a formal pass",()=>{
  const f=fixture();
  assert.throws(()=>assembleStg08Intake(f.packet,{...f.artifact,formal_stg08_qa_passed:true},f),/scope or identity/);
  assert.throws(()=>assembleStg08Intake(f.packet,{...f.artifact,publication_performed:true},f),/scope or identity/);
  assert.throws(()=>assembleStg08Intake({...f.packet,usable_as_final_visual_review_package:true},f.artifact,f),/not an unapproved render/);
});
test("claim, copy and exact rendered image bindings cannot silently drift",()=>{
  const f=fixture();
  assert.throws(()=>assembleStg08Intake(f.packet,f.artifact,{...f,copy:{...f.copy,copy_fingerprint:"0".repeat(64)}}),/approved copy/);
  assert.throws(()=>assembleStg08Intake({
    ...f.packet,render_artifact_integrity:{...f.packet.render_artifact_integrity,
      slides:[{...f.packet.render_artifact_integrity.slides[0],sha256:"0".repeat(64)},
      ...f.packet.render_artifact_integrity.slides.slice(1)]}
  },f.artifact,f),/render bytes/);
  assert.throws(()=>assembleStg08Intake(f.packet,f.artifact,{...f,research:{...f.research,claims:[]}}),/RESEARCH_CLAIMS_MISSING/);
});
test("format or QA canonical changes block inferred review criteria",()=>{
  const f=fixture();
  assert.throws(()=>assembleStg08Intake(f.packet,f.artifact,{...f,qaAuthority:f.qaAuthority.replace('version: "1.32"','version: "1.33"')}),/authority drift/);
  assert.throws(()=>assembleStg08Intake(f.packet,f.artifact,{...f,formatAuthority:f.formatAuthority.replace('version: "1.4"','version: "1.5"')}),/authority drift/);
});
test("workflow generates intake only after render bytes pass, without automatic STG-08 verdict",()=>{
  const y=fs.readFileSync(".github/workflows/cwc-production-review-one-run.yml","utf8");
  assert.match(y,/stg08-intake\.mjs/);
  assert.match(y,/stg08-review-intake\.json/);
  assert.match(y,/formal_stg08_verdict==null/);
  assert.doesNotMatch(y,/STG08_APPROVED|stg08_qa_passed: true/);
});
