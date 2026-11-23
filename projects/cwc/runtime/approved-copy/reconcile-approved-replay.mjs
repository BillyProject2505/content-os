#!/usr/bin/env node
// BUS-180 — Exact replay reconciliation, read-only. NOT a new STG-08/STG-09 verdict.
// Prevents asking Owner to reapprove bytes already governed by existing records.
import fs from "node:fs";
import path from "node:path";
import {createHash} from "node:crypto";
import {fileURLToPath} from "node:url";

const ID=/^CWC-CRSL-[0-9]{4}$/;
const HASH=/^[0-9a-f]{64}$/;
const CWC="projects/cwc";
const base=(id)=>({
  qa:CWC+"/content/qa/"+id+".stg08-qa.json",
  approval:CWC+"/content/approval/"+id+".stg09-approval.json",
  release:CWC+"/content/release/"+id+".stg10-release-preparation.json"
});
const sha256=s=>createHash("sha256").update(s,"utf8").digest("hex");
const blobSha=s=>createHash("sha1").update("blob "+Buffer.byteLength(s,"utf8")+"\0"+s,"utf8").digest("hex");
function evidence(status,id,detail={},paths=null) {
  const exact=status==="IDENTICAL_TO_EXISTING_STG08_STG09_APPROVED_BYTES";
  return {
    schema:"cwc-historical-approved-render-reconciliation-v1",
    content_id:id,
    status,
    reason:detail,
    existing_records:paths,
    source_scope: "EXACT_PNG_AND_CAPTION_BYTES_PLUS_EXISTING_QA_APPROVAL_LINKAGE",
    exact_historically_approved_bytes_confirmed:exact,
    prior_stg08_record_reference_confirmed:exact,
    prior_stg09_record_reference_confirmed:exact,
    new_stg08_qa_performed:false,
    new_stg09_owner_approval_created:false,
    publication_authorized_by_this_check:false,
    publication_performed:false,
    platform_schedule_verified:false,
    can_reuse_old_publication_time:false,
    current_register_state_verified:false,
    next_action:exact
      ? "No repeated STG-08/09 on identical approved material. Independently reconcile CURRENT register/blockers and require valid current STG-10 publication authority before any provider action."
      : "No exact historical approval established. Keep newly rendered candidate in independent STG-08 review intake; do not infer prior approval."
  };
}
export function compareApprovedReplay(packet,{qa,qaRaw,approval,release,approvalRaw}={},paths=null) {
  const id=packet?.content_id;
  if(!ID.test(id??""))throw new Error("REPLAY_REJECTED: invalid Content ID");
  if(packet?.source_mode!=="EDITABLE_RENDER_CANDIDATE"||
     packet?.checkpoint_status!=="CANDIDATE_RENDERED_ARTIFACT_INTEGRITY_PASS"||
     packet?.scope?.rendered_media!==true||packet?.scope?.media_bytes_rechecked!==true||
     packet?.scope?.stg09_decision_created!==false||
     packet?.scope?.stg10_publication_authorization_created!==false) {
    return evidence("NO_REPLAY_IN_UNVERIFIED_SOURCE_MODE",id,{},paths);
  }
  if(!qa||!approval||!release||typeof approvalRaw!=="string")
    return evidence("NO_COMPLETE_PREEXISTING_APPROVAL_BUNDLE",id,{},paths);

  const problems=[];
  const need=(ok,s)=>{if(!ok)problems.push(s)};
  const rendered=packet.render_artifact_integrity?.slides;
  const approved=approval.approved_package?.slides;
  const released=release.publishable_artifacts?.ordered_files;
  const fp=packet.render_artifact_integrity?.source_copy_sha256;
  const captionSha=sha256(packet.caption);
  need(HASH.test(fp??""),"input fingerprint missing");
  need(Array.isArray(rendered)&&rendered.length>0&&rendered.every((x,i)=>
    x.order===i+1&&x.name==="slide-"+String(i+1).padStart(2,"0")+".png"&&HASH.test(x.sha256)),
    "rendered image references invalid");
  need(qa.schema==="cwc-qa-record-v1" && qa.content_item_id===id &&
    qa.verdict==="PASS"&&qa.gates?.stg08_passed===true &&
    qa.approved_copy_fingerprint===fp &&
    qa.artifact?.all_png_sha256_verified===true &&
    qa.artifact?.zip_sha256===release.publishable_artifacts?.source_storage?.sha256 &&
    qa.artifact?.id===release.publishable_artifacts?.historical_source?.github_artifact_id,
    "existing formal QA authority missing or does not match copy");
  need(approval.schema==="cwc-stg09-owner-approval-v1"&&approval.content_item_id===id &&
    approval.stage==="STG-09" && approval.decision==="APPROVED" &&
    approval.owner_approval_boundaries?.approved_content_and_sensitive_claims===true &&
    approval.approved_package?.approved_copy_fingerprint===fp &&
    approval.prerequisites?.qa_verdict==="PASS" &&
    approval.prerequisites?.qa_record_path===paths?.qa &&
    typeof qaRaw==="string" &&
    approval.prerequisites?.qa_record_blob_sha===blobSha(qaRaw),
    "Owner approval does not bind valid QA or copy");
  need(release.schema==="cwc-stg10-release-preparation-v1" &&
    release.content_item_id===id &&
    release.source_approval?.record_path===paths?.approval &&
    release.source_approval?.approval_git_blob_sha===blobSha(approvalRaw) &&
    release.source_approval?.decision==="APPROVED" &&
    release.identity_material?.stg09_approval_id===approval.approval_id &&
    release.identity_material?.content_id===id &&
    release.identity_material?.approved_copy_fingerprint===fp &&
    release.identity_material?.caption_sha256===captionSha &&
    release.publishable_artifacts?.caption?.utf8_sha256===captionSha,
    "release identity cannot be linked to existing Owner approval and caption");

  need(Array.isArray(rendered)&&Array.isArray(approved)&&Array.isArray(released) &&
    approved.length===rendered.length && released.length===rendered.length &&
    rendered.every((s,i)=>s.order===i+1 &&
      approved[i]?.sequence===i+1 &&
      released[i]?.order===i+1 &&
      s.name===approved[i]?.filename &&
      s.name===released[i]?.name &&
      s.sha256===approved[i]?.sha256 &&
      s.sha256===released[i]?.sha256 &&
      s.sha256===release.identity_material?.ordered_slide_sha256?.[i]),
    "at least one slide differs from historically approved/identity-pinned bytes");
  need(release.publishable_artifacts?.caption?.source_copy_fingerprint===fp &&
       release.publishable_artifacts?.caption?.length_characters===packet.caption.length,
       "published source metadata/caption length differs");

  if(problems.length) return evidence("DIFFERENT_OR_INVALID_HISTORICAL_APPROVAL_REQUIRES_REVIEW",id,{problems},paths);
  return evidence("IDENTICAL_TO_EXISTING_STG08_STG09_APPROVED_BYTES",id,{
    prior_qa_verdict:"PASS",
    prior_qa_date:qa.qa_pass_date,
    prior_approval_id:approval.approval_id,
    prior_approval_date:approval.decision_date,
    prior_release_identity:release.approved_release_identity,
    slide_count:rendered.length,
    ordered_slide_sha256:rendered.map(x=>x.sha256),
    caption_sha256:captionSha,
    approved_copy_fingerprint:fp
  },paths);
}
export function reconcileFromDisk(packet,{root=process.cwd()}={}){
  const p=base(packet.content_id);
  const present=Object.fromEntries(Object.entries(p).map(([k,v])=>[k,fs.existsSync(path.join(root,v))]));
  if(!Object.values(present).some(Boolean))return evidence("NO_COMPLETE_PREEXISTING_APPROVAL_BUNDLE",packet.content_id,{},p);
  if(!Object.values(present).every(Boolean))return evidence("NO_COMPLETE_PREEXISTING_APPROVAL_BUNDLE",packet.content_id,{missing:Object.keys(present).filter(k=>!present[k])},p);
  const raw=fs.readFileSync(path.join(root,p.approval),"utf8");
  return compareApprovedReplay(packet,{
    qa:JSON.parse(fs.readFileSync(path.join(root,p.qa),"utf8")),
    qaRaw:fs.readFileSync(path.join(root,p.qa),"utf8"),
    approval:JSON.parse(raw),
    release:JSON.parse(fs.readFileSync(path.join(root,p.release),"utf8")),
    approvalRaw:raw
  },p);
}
function main(argv){
  if(argv.length!==4||argv[0]!=="--checkpoint"||argv[2]!=="--out")
    throw new Error("REPLAY_ARGS_INVALID: checkpoint and output required");
  const packet=JSON.parse(fs.readFileSync(argv[1],"utf8"));
  const r=reconcileFromDisk(packet);
  fs.writeFileSync(argv[3],JSON.stringify(r,null,2)+"\n","utf8");
  console.log(r.status+": "+r.content_id+"; STG-08/STG-09 never changed");
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{main(process.argv.slice(2))}catch(e){console.error(e.message);process.exitCode=1}
}
