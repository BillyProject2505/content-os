// BUS-170 Phase 1: one local, credential-free preparation step for a CWC Carousel.
// Reuses existing frozen-copy, registered-format and typography-layout contracts.
// It NEVER renders, approves, schedules, accesses Drive or publishes.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {validateCopy} from "./preflight.mjs";
import {validateResearch} from "./research-gate.mjs";
import {buildCarouselRenderPlan, FORMAT_AUTHORITY} from "./render-plan.mjs";
import {attachLayout} from "./typography-layout.mjs";

const ID=/^CWC-CRSL-[0-9]{4}$/;
const HASH=/^[0-9a-f]{64}$/;
const ROOT="projects/cwc/content/carousel";

function ensure(ok, message) {
  if (!ok) throw new Error("PHASE1_REJECTED: "+message);
}
function rects() {
  return {
    coverCopyRect:{x:72,y:450,width:479,height:440},
    presenterBodyRect:{x:670,y:310,width:345,height:900},
    gestureRect:{x:572,y:440,width:22,height:120}
  };
}
export function prepareReview(copy, layout, {contentId,copyFingerprint,layoutFingerprint}) {
  ensure(typeof contentId==="string" && ID.test(contentId), "Content ID invalid");
  ensure(typeof copyFingerprint==="string" && HASH.test(copyFingerprint), "independent copy SHA-256 required");
  ensure(typeof layoutFingerprint==="string" && HASH.test(layoutFingerprint), "independent layout SHA-256 required");
  ensure(copy?.content_id===contentId && layout?.content_id===contentId, "source Content IDs differ");
  const preflight=validateCopy(copy,{contentId,expectedFingerprint:copyFingerprint});
  const research=JSON.parse(fs.readFileSync(path.join("projects/cwc/content/research",contentId+".research.json"),"utf8"));
  const researchEvidence=validateResearch(copy,research);
  const plan=buildCarouselRenderPlan(copy,{
    expectedFingerprint:copyFingerprint,
    surface:"BLUE_DARK",
    presenterVariant:"WHITE_POINT_LEFT",
    authorityFile:FORMAT_AUTHORITY.source,
    ...rects()
  });
  const typed=attachLayout(plan,layout,layoutFingerprint);
  ensure(typed.typography_layout?.source_approval_verified===false, "layout cannot claim owner release approval");
  ensure(typed.gates?.publication_authorized===false, "publication must remain disabled");
  const manifest={
    schema:"cwc-phase1-review-preparation-v1",
    state:"PHASE1_VALIDATED_UNAPPROVED",
    content_id:contentId,
    copy_fingerprint:copyFingerprint,
    layout_fingerprint:layoutFingerprint,
    research_fingerprint:researchEvidence.research_sha256,
    slide_count:typed.slides.length,
    evidence:{
      copy_integrity:"PASS",
      layout_integrity:"PASS",
      registered_geometry:"PASS",
      research_evidence_structure:"PASS",
      live_owner_approval_verified:false,
      content_register_live_verified:false,
      clinical_claims_verified:false,
      asset_bytes_verified:false,
      deterministic_render_performed:false,
      stg08_technical_qa_passed:false,
      stg09_final_owner_approval_granted:false,
      stg10_release_identity_issued:false,
      publication_authorized:false
    },
    artifacts:["copy-preflight.json","research-evidence.json","render-plan.json","render-plan-typed.json"],
    next_action:"Verify live governance/clinical evidence and produce actual renderer candidate before STG-08"
  };
  return {preflight,researchEvidence,plan,typed,manifest};
}
function parseArgs(argv) {
  const keys=new Set(["--content-id","--copy-fingerprint","--layout-fingerprint","--out"]);
  ensure(argv.length===8, "four CLI options required");
  const a={};
  for(let i=0;i<argv.length;i+=2) {
    ensure(keys.has(argv[i]) && argv[i+1] && !Object.hasOwn(a,argv[i]),"invalid, missing or duplicated argument");
    a[argv[i]]=argv[i+1];
  }
  ensure(Object.keys(a).length===4,"four options required");
  return a;
}
function main(){
  const a=parseArgs(process.argv.slice(2));
  const id=a["--content-id"];
  ensure(ID.test(id),"Content ID invalid");
  const copy=JSON.parse(fs.readFileSync(path.join(ROOT,id+".json"),"utf8"));
  const layout=JSON.parse(fs.readFileSync(path.join(ROOT,id+".layout.json"),"utf8"));
  const prepared=prepareReview(copy,layout,{
    contentId:id,copyFingerprint:a["--copy-fingerprint"],
    layoutFingerprint:a["--layout-fingerprint"]
  });
  const dest=path.resolve(a["--out"]);
  fs.mkdirSync(dest,{recursive:true});
  for(const [name,data] of [
    ["copy-preflight.json",prepared.preflight],
    ["research-evidence.json",prepared.researchEvidence],
    ["render-plan.json",prepared.plan],
    ["render-plan-typed.json",prepared.typed],
    ["phase1-manifest.json",prepared.manifest]
  ]) fs.writeFileSync(path.join(dest,name),JSON.stringify(data,null,2)+"\n");
  console.log("PHASE1_VALIDATED_UNAPPROVED: "+id+"; no rendering, STG-08/09/10, scheduling or publication");
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{main();}catch(error){console.error(error.message);process.exitCode=1;}
}
