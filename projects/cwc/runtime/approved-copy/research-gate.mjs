// STG-03 evidence *structure* gate for CWC approved-copy-first production.
// Checks source/claim coverage and provenance linkage. Does NOT attest medical
// truth, a completed lifecycle transition, clinical signoff or publication.
import fs from "node:fs";
import path from "node:path";
import {createHash} from "node:crypto";
import {fileURLToPath} from "node:url";

const ID=/^CWC-CRSL-[0-9]{4}$/;
const HASH=/^[a-f0-9]{64}$/;
const DATE=/^\d{4}-\d{2}-\d{2}$/;
const COVERAGE=new Set(["EXPLICIT_EVIDENCE","EDITORIAL_NO_EXTERNAL_CLAIM"]);
function fail(code,message){const e=new Error(code+": "+message);e.code=code;throw e;}
function requireThat(ok,code,message){if(!ok)fail(code,message);}
function object(x){return x!==null && typeof x==="object" && !Array.isArray(x);}
function exact(x,fields,label){
 requireThat(object(x),"RESEARCH_SCHEMA_INVALID",label+" must be an object");
 requireThat(JSON.stringify(Object.keys(x).sort())===JSON.stringify([...fields].sort()),
  "RESEARCH_SCHEMA_INVALID",label+" keys invalid");
}
function text(x){return typeof x==="string" && x.trim().length>0 && x===x.trim();}
function url(x){
 if(!text(x))return false;
 try{const u=new URL(x);return u.protocol==="https:"&&!!u.hostname&&!u.username&&!u.password;}catch{return false;}
}
function date(x){return DATE.test(x)&&!Number.isNaN(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;}
function canonical(x){if(Array.isArray(x))return x.map(canonical);if(!object(x))return x;return Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])]));}
export function validateResearch(copy,research){
 exact(research,["schema","content_id","copy_fingerprint","status","review_date",
 "review_scope","source_review_record","sources","claims",
 "human_clinical_signoff","stg08_qa_passed","stg09_owner_release_approved",
 "publication_authorized"],"research");
 requireThat(research.schema==="cwc-research-evidence-v1","RESEARCH_SCHEMA_INVALID","unsupported version");
 requireThat(ID.test(copy?.content_id??"")&&research.content_id===copy.content_id,
  "RESEARCH_ID_MISMATCH","research and approved copy must use same native ID");
 requireThat(HASH.test(copy.copy_fingerprint)&&research.copy_fingerprint===copy.copy_fingerprint,
  "RESEARCH_COPY_MISMATCH","research must bind the immutable approved copy fingerprint");
 requireThat(research.status==="STG03_RESEARCH_EVIDENCE_RECORDED"&&date(research.review_date),
  "RESEARCH_STATUS_INVALID","research date and scope record required");
 requireThat(text(research.review_scope)&&url(research.source_review_record),
  "RESEARCH_PROVENANCE_MISSING","cite the original review and its scope");
 for(const k of ["human_clinical_signoff","stg08_qa_passed",
  "stg09_owner_release_approved","publication_authorized"]){
  requireThat(research[k]===false,"RESEARCH_AUTHORITY_INVALID","research cannot claim "+k);
 }
 requireThat(Array.isArray(research.sources)&&research.sources.length>0,
  "RESEARCH_SOURCES_MISSING","at least one provenance source required");
 const ids=new Set();
 for(const source of research.sources){
  exact(source,["id","url","sections","point_of_use_reliability"],"source");
  requireThat(text(source.id)&&!ids.has(source.id)&&url(source.url)&&
    text(source.sections)&&text(source.point_of_use_reliability),
   "RESEARCH_SOURCE_INVALID","unique ID, HTTPS provenance, section and reliability required");
  ids.add(source.id);
 }
 requireThat(Array.isArray(research.claims)&&research.claims.length>0,
  "RESEARCH_CLAIMS_MISSING","claim-to-source matrix required");
 const claimIds=new Set(),covered=new Set(),usedSources=new Set();
 const expected=new Set(copy.slides.map(s=>"slide-"+s.slide).concat("caption"));
 for(const claim of research.claims){
  exact(claim,["id","claim","coverage","locations","source_ids","applicability_limit"],"claim");
  requireThat(text(claim.id)&&!claimIds.has(claim.id)&&text(claim.claim)&&
    COVERAGE.has(claim.coverage)&&text(claim.applicability_limit),
   "RESEARCH_CLAIM_INVALID","claim requires ID, coverage classification and applicability limit");
  claimIds.add(claim.id);
  requireThat(Array.isArray(claim.locations)&&claim.locations.length>0&&
    claim.locations.every(loc=>expected.has(loc)),
   "RESEARCH_LOCATION_INVALID","each claim must map to a real slide or caption");
  for(const loc of claim.locations)covered.add(loc);
  requireThat(Array.isArray(claim.source_ids)&&claim.source_ids.length>0&&
    claim.source_ids.every(id=>ids.has(id)),
   "RESEARCH_SOURCE_LINK_MISSING","each claim must cite a registered provenance source");
  for(const id of claim.source_ids)usedSources.add(id);
  if(claim.coverage==="EDITORIAL_NO_EXTERNAL_CLAIM"){
   requireThat(claim.source_ids.every(id=>new URL(research.sources.find(s=>s.id===id).url).hostname==="linear.app"),
    "RESEARCH_EDITORIAL_AUTHORITY_INVALID","editorial assertions must cite the project decision record");
  }
 }
 requireThat([...expected].every(loc=>covered.has(loc)),
  "RESEARCH_COVERAGE_INCOMPLETE","all slide and caption sections need explicit claim classification");
 requireThat([...ids].every(id=>usedSources.has(id)),
  "RESEARCH_UNUSED_SOURCE","remove or associate unused research sources");
 const sha=createHash("sha256").update(JSON.stringify(canonical(research)),"utf8").digest("hex");
 return {schema:"cwc-research-structure-evidence-v1",
  result:"RESEARCH_EVIDENCE_STRUCTURE_PASS",content_id:copy.content_id,
  copy_fingerprint:copy.copy_fingerprint,research_sha256:sha,
  review_date:research.review_date,claim_count:claimIds.size,covered_sections:expected.size,
  clinical_truth_verified:false,stg03_lifecycle_exit_verified:false,
  stg08_technical_qa_passed:false,stg09_owner_release_approved:false,
  publication_authorized:false,
  next_action:"Human point-of-use source and stage-contract review before STG-08 or release"};
}
function main(args){
 const keys=new Set(["--content-id","--out"]),a={};
 requireThat(args.length===4,"RESEARCH_ARGS_INVALID","--content-id and --out are required");
 for(let i=0;i<args.length;i+=2){
  requireThat(keys.has(args[i])&&!Object.hasOwn(a,args[i])&&args[i+1],
   "RESEARCH_ARGS_INVALID","unknown, duplicate or missing option");
  a[args[i]]=args[i+1];
 }
 const id=a["--content-id"];
 requireThat(ID.test(id),"RESEARCH_ID_INVALID","invalid content ID");
 const copy=JSON.parse(fs.readFileSync(path.join("projects/cwc/content/carousel",id+".json"),"utf8"));
 const record=JSON.parse(fs.readFileSync(path.join("projects/cwc/content/research",id+".research.json"),"utf8"));
 const result=validateResearch(copy,record);
 const dest=path.resolve(a["--out"]);
 fs.mkdirSync(path.dirname(dest),{recursive:true});
 fs.writeFileSync(dest,JSON.stringify(result,null,2)+"\n");
 console.log(result.result+": "+id+" — structure only; no medical signoff or release");
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{main(process.argv.slice(2));}catch(e){console.error(String(e.message));process.exitCode=1;}
}
