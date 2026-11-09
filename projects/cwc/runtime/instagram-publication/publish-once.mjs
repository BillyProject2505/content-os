#!/usr/bin/env node
// CWC-CRSL-0004: one-shot Instagram carousel publisher, GitHub Actions only.
// No SDOH credentials, Workers, schedulers, or state are shared.
// All gates fail closed; a Git tag is an irreversible publish-attempt lock.
import fs from "node:fs";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";

const ROOT="projects/cwc/";
const id="CWC-CRSL-0004";
const targetMs=Date.parse("2026-11-10T11:00:00Z");
const publicationWindowStatus=(ms)=>ms<targetMs?"NOT_YET_OPEN":ms>targetMs+20*60*1000?"EXPIRED":"OPEN";
const digest=b=>crypto.createHash("sha256").update(b).digest("hex");
const j=p=>JSON.parse(fs.readFileSync(ROOT+p,"utf8"));
const assert=(x,msg)=>{if(!x)throw Error(msg)};
function canonical(x){
  if(Array.isArray(x))return x.map(canonical);
  if(x&&typeof x==="object")return Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])]));
  return x;
}
function context(){
 const release=j("content/release/"+id+".stg10-release-preparation.json");
 const authorization=j("content/release/"+id+".stg10-publication-authorization.json");
 const reschedule=j("content/release/"+id+".stg10-reschedule-20261110.json");
 const approval=j("content/approval/"+id+".stg09-approval.json");
 const qa=j("content/qa/"+id+".stg08-qa.json");
 const copy=j("content/carousel/"+id+".json");
 const media=j("content/instagram-media/"+id+".media-adaptation.json");
 const register=fs.readFileSync(ROOT+"DIUA-DIC-000027_CWC-Content-Register.md","utf8");
 return {release,authorization,reschedule,approval,qa,copy,media,register};
}
function validate(c){
 const {release:r,authorization:a,reschedule:t,approval:o,qa:q,copy,media:m,register}=c;
 assert(r.content_item_id===id&&a.content_item_id===id&&t.content_item_id===id&&o.content_item_id===id&&m.content_id===id,"CWC_CONTENT_ID_MISMATCH");
 assert(o.decision==="APPROVED"&&o.sensitive_claim_signoff.explicit_owner_signoff==="APPROVED","STG09_OWNER_OR_CLAIM_SIGNOFF_MISSING");
 assert(q.verdict==="PASS"&&q.checks.length===20,"STG08_QA_NOT_PASS");
 const calculated="sha256:"+digest(JSON.stringify(canonical(r.identity_material)));
 assert(r.approved_release_identity===calculated&&a.approved_release.release_identity===calculated&&m.source_approved_release_identity===calculated,"RELEASE_IDENTITY_DRIFT");
 assert(r.identity_material.approved_copy_fingerprint===copy.copy_fingerprint,"COPY_FINGERPRINT_DRIFT");
 assert(r.identity_material.caption_sha256===digest(Buffer.from(copy.caption,"utf8")),"CAPTION_SHA_DRIFT");
 // Keep the historical authority immutable; the later explicit Owner decision
 // authorizes only this new time, for the same exact source/caption/IG account.
 assert(a.requested_publication.utc_datetime==="2026-11-02T11:00:00Z"&&a.human_authorization.authorized===true,"HISTORIC_STG10_AUTHORIZATION_DRIFT");
 assert(t.owner_decision.verbatim==="iya"
   && t.owner_decision.interpreted_against_immediately_preceding_explicit_question==="Apakah Anda ingin menjadwalkan ulang ke Selasa, 10 November 2026 pukul 19.00 WITA?"
   && t.previous_slot.target_utc===a.requested_publication.utc_datetime
   && t.previous_slot.status==="MISSED_AND_EXPIRED"
   && t.new_slot.target_utc==="2026-11-10T11:00:00Z"
   && Date.parse(t.new_slot.target_utc)===targetMs
   && t.new_slot.utc_window_end==="2026-11-10T11:20:00Z"
   && t.new_slot.target_account==="@cozwecare.id"
   && t.approved_package.release_identity===calculated
   && t.approved_package.caption_sha256===r.identity_material.caption_sha256
   && t.approved_package.jpeg_public_media_commit===m.public_media_git_sha
   && t.approved_package.jpeg_files.length===5
   && t.approved_package.jpeg_files.every((f,i)=>f.order===i+1&&f.sha256===m.files[i].sha256&&f.source_png_sha256===m.files[i].source_png_sha256)
   && t.execution_and_controls.next_attempt_tag==="cwc-crsl-0004-ig-attempt-20261110"
   && t.execution_and_controls.exception_status_retained==="BLOCKED",
   "RESCHEDULE_OWNER_AUTHORIZATION_OR_RELEASE_IDENTITY_DRIFT");
 assert(a.human_authorization.destination_account==="@cozwecare.id","DESTINATION_ACCOUNT_DRIFT");
 assert(r.publishable_artifacts.ordered_files.length===5&&m.files.length===5,"CAROUSEL_LENGTH_NOT_FIVE");
 for(let i=0;i<5;i++){
   const p=o.approved_package.slides[i], z=r.publishable_artifacts.ordered_files[i], f=m.files[i];
   assert(p.sha256===z.sha256&&z.sha256===f.source_png_sha256&&z.order===i+1,"ORDERED_APPROVED_IMAGE_DRIFT");
   assert(f.name==="slide-0"+(i+1)+".jpg"&&/^[a-f0-9]{64}$/.test(f.sha256)&&f.bytes>1000,"JPEG_MANIFEST_INVALID");
 }
 assert(m.source_png_zip_sha256===r.publishable_artifacts.source_storage.sha256,"SOURCE_ZIP_SHA_DRIFT");
 const line=register.split("\n").find(v=>v.startsWith("| "+String.fromCharCode(96)+id+String.fromCharCode(96)+" |"));
 assert(line&&line.includes(" | READY_FOR_PUBLICATION |"),"NOT_READY_FOR_PUBLICATION");
 const blocked=line.includes(" | READY_FOR_PUBLICATION | BLOCKED |");
 const blockers=[];
 if(blocked)blockers.push("GOVERNANCE_EXCEPTION_BLOCKED");
 if(publicationWindowStatus(Date.now())==="EXPIRED")blockers.push("OWNER_AUTHORIZED_PUBLICATION_WINDOW_EXPIRED");
 if(m.candidate_owner_approved!==true||!m.approval_evidence)blockers.push("JPEG_DELIVERY_ADAPTATION_OWNER_APPROVAL_MISSING");
 if(!/^[a-f0-9]{40}$/.test(m.public_media_git_sha||""))blockers.push("IMMUTABLE_PUBLIC_JPEG_MEDIA_COMMIT_MISSING");
 if(process.env.CWC_INSTAGRAM_PUBLISH_ENABLED!=="true")blockers.push("CWC_INSTAGRAM_PUBLISH_ENABLED_NOT_TRUE");
 if(!/^[0-9]{5,30}$/.test(process.env.CWC_META_IG_USER_ID||""))blockers.push("CWC_META_IG_USER_ID_MISSING");
 if(!process.env.CWC_META_ACCESS_TOKEN)blockers.push("CWC_META_ACCESS_TOKEN_MISSING");
 if(!process.env.GITHUB_TOKEN)blockers.push("GITHUB_TOKEN_MISSING");
 return {blockers,ctx:c,identity:calculated};
}
async function api(path,{method="GET",body=null}={}){
 const token=process.env.CWC_META_ACCESS_TOKEN;
 const url="https://graph.facebook.com/v25.0/"+path;
 const response=await fetch(url,{method,headers:{"Authorization":"Bearer "+token,...(body?{"Content-Type":"application/x-www-form-urlencoded"}:{})},body:body?new URLSearchParams(body):undefined,signal:AbortSignal.timeout(30000)});
 const value=await response.json().catch(()=>({}));
 assert(response.ok&&!value.error,"META_GRAPH_REQUEST_FAILED_"+response.status+"_"+(value.error?.code||"UNKNOWN"));
 return value;
}
async function statusReady(containerId){
 for(let n=0;n<10;n++){
  const s=await api(containerId+"?fields=status_code");
  if(s.status_code==="FINISHED")return;
  assert(!["ERROR","EXPIRED","PUBLISHED"].includes(s.status_code),"MEDIA_CONTAINER_NOT_ELIGIBLE");
  await new Promise(ok=>setTimeout(ok,6000));
 }
 throw Error("MEDIA_CONTAINER_NOT_READY");
}
async function validatePublicMedia(ctx){
 const {media:m}=ctx;
 const root="https://raw.githubusercontent.com/BillyProject2505/content-os/"+m.public_media_git_sha+"/"+m.media_dir+"/";
 const urls=[];
 for(const f of m.files){
  const url=root+f.name;
  const res=await fetch(url,{signal:AbortSignal.timeout(20000)});
  assert(res.ok,"PUBLIC_IMAGE_NOT_ACCESSIBLE_"+f.name);
  const bytes=Buffer.from(await res.arrayBuffer());
  assert(bytes.length===f.bytes&&digest(bytes)===f.sha256,"PUBLIC_IMAGE_BYTES_NOT_APPROVED_"+f.name);
  assert(bytes[0]===255&&bytes[1]===216&&bytes[bytes.length-2]===255&&bytes[bytes.length-1]===217,"PUBLIC_IMAGE_NOT_JPEG_"+f.name);
  urls.push(url);
 }
 return urls;
}
function claimExactlyOnce(){
 const token=process.env.GITHUB_TOKEN;
 assert(token&&process.env.GITHUB_REPOSITORY==="BillyProject2505/content-os","GITHUB_EXECUTION_AUTHORITY_MISMATCH");
 const args=["api","-X","POST","repos/BillyProject2505/content-os/git/refs","-f","ref=refs/tags/cwc-crsl-0004-ig-attempt-20261110","-f","sha="+process.env.GITHUB_SHA];
 const r=spawnSync("gh",args,{encoding:"utf8",env:{...process.env,GH_TOKEN:token},timeout:20000});
 assert(r.status===0,"PUBLISH_ATTEMPT_LOCK_UNAVAILABLE_OR_ALREADY_EXISTS__STOP_AND_RECONCILE");
}
async function publish(v){
 const now=Date.now();
 assert(publicationWindowStatus(now)==="OPEN","PUBLISH_WINDOW_CLOSED_OR_NOT_YET_OPEN");
 assert(v.blockers.length===0,"PUBLISH_GATES_BLOCKED_"+v.blockers.join("_"));
 const {copy,media:m}=v.ctx;
 const ig=process.env.CWC_META_IG_USER_ID;
 const profile=await api(ig+"?fields=id,username");
 assert(profile.id===ig&&profile.username==="cozwecare.id","META_DESTINATION_ACCOUNT_NOT_CWC");
 const urls=await validatePublicMedia(v.ctx);
 // Query existing posts before any container writes. An ambiguous prior result must be reconciled.
 const existing=await api(ig+"/media?fields=id,caption,permalink&limit=25");
 assert(!existing.data?.some(p=>p.caption===copy.caption),"EXACT_CAPTION_ALREADY_PUBLISHED__RECONCILE");
 const children=[];
 for(const url of urls){
   const child=await api(ig+"/media",{method:"POST",body:{image_url:url,is_carousel_item:"true"}});
   assert(/^[0-9]+$/.test(String(child.id||"")),"CHILD_MEDIA_ID_INVALID");
   await statusReady(child.id);
   children.push(child.id);
 }
 const parent=await api(ig+"/media",{method:"POST",body:{media_type:"CAROUSEL",children:children.join(","),caption:copy.caption}});
 assert(/^[0-9]+$/.test(String(parent.id||"")),"PARENT_MEDIA_ID_INVALID");
 await statusReady(parent.id);
 claimExactlyOnce(); // Persisted Git ref prevents any further automatic publish retry.
 const published=await api(ig+"/media_publish",{method:"POST",body:{creation_id:parent.id}});
 assert(/^[0-9]+$/.test(String(published.id||"")),"PUBLISH_RESPONSE_AMBIGUOUS__DO_NOT_RETRY");
 const proof=await api(published.id+"?fields=id,caption,permalink,media_type");
 assert(proof.id===published.id&&proof.caption===copy.caption&&proof.permalink&&proof.media_type==="CAROUSEL","LIVE_MEDIA_IDENTITY_INCOMPLETE__DO_NOT_RETRY");
 const evidence={content_id:id,approved_release_identity:v.identity,scheduled_target:"2026-11-10T11:00:00Z",published_media_id:proof.id,permalink:proof.permalink,media_type:proof.media_type,caption_sha256:digest(Buffer.from(proof.caption,"utf8")),checked_at:new Date().toISOString()};
 fs.writeFileSync(process.env.RUNNER_TEMP+"/cwc-instagram-live-proof.json",JSON.stringify(evidence,null,2)+"\n");
 if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,"\nCWC Instagram verified live: "+proof.permalink+"\n");
 console.log(JSON.stringify({result:"PLATFORM_LIVE_PROOF_CAPTURED",permalink:proof.permalink,published_media_id:proof.id}));
}
async function main(){
 const mode=process.argv[2]||"--preflight";
 const v=validate(context());
 if(mode==="--self-test"){
   assert(publicationWindowStatus(targetMs-1)==="NOT_YET_OPEN","TIME_WINDOW_EARLY_REGRESSION");
   assert(publicationWindowStatus(targetMs)==="OPEN","TIME_WINDOW_START_REGRESSION");
   assert(publicationWindowStatus(targetMs+20*60*1000)==="OPEN","TIME_WINDOW_END_REGRESSION");
   assert(publicationWindowStatus(targetMs+20*60*1000+1)==="EXPIRED","TIME_WINDOW_EXPIRY_REGRESSION");
   assert(v.ctx.media.candidate_owner_approved===true
     ? !v.blockers.includes("JPEG_DELIVERY_ADAPTATION_OWNER_APPROVAL_MISSING")
     : v.blockers.includes("JPEG_DELIVERY_ADAPTATION_OWNER_APPROVAL_MISSING"),"JPEG_APPROVAL_GATE_REGRESSION");
   console.log("PASS: 5 ordered media, exact STG-09/10 sha, caption, time; publish fail-closed");
 }else if(mode==="--preflight"){
   console.log(JSON.stringify({content_id:id,identity:v.identity,authorized_time:"2026-11-10T11:00:00Z",publish_ready:v.blockers.length===0,blockers:v.blockers}));
 }else if(mode==="--publish"){
   await publish(v);
 }else{
   throw Error("UNSUPPORTED_MODE");
 }
}
main().catch(e=>{console.error("CWC_PUBLISH_REJECTED: "+e.message);process.exitCode=1;});
