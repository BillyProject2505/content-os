#!/usr/bin/env node
// BUS-180: assemble a bounded STG-08 *intake*, never a QA verdict or approval.
// Everything below is read-only; actual medical/editorial/visual judgment remains STG-08.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {validateResearch} from "./research-gate.mjs";

const ID=/^CWC-CRSL-[0-9]{4}$/;
const HASH=/^[a-f0-9]{64}$/;
const CWC="projects/cwc";
const QA_AUTH=CWC+"/DIUA-DIC-000019_CWC-QA-Mechanism.md";
const FORMAT_AUTH=CWC+"/DIUA-DIC-000029_CWC-FORMAT-CAROUSEL.md";
function check(v,reason){if(!v)throw new Error("STG08_INTAKE_REJECTED: "+reason);}
function authorityVersion(doc,id,version) {
  const m=doc.match(/^---\s*\n([\s\S]*?)\n---/);
  check(m&&m[1].includes('universal_identifier: "'+id+'"') &&
    m[1].includes('version: "'+version+'"'),"authority drift: "+id);
}
function normalize(text) {return text.replace(/\u2011/g,"-").replace(/\u2013/g,"-");}
function qaChecklist(qaDoc,formatDoc) {
  authorityVersion(qaDoc,"DIUA-DIC-000019","1.32");
  authorityVersion(formatDoc,"DIUA-DIC-000029","1.4");
  const q=normalize(qaDoc),checks=[];
  for(let i=0;i<10;i++){
    const id="CORE-QA-"+String(i).padStart(2,"0");
    const row=q.split("\n").find(l=>l.includes("| "+id+" |"));
    check(row,"canonical core QA criterion missing: "+id);
    const cells=row.split("|").map(v=>v.trim()).filter(Boolean);
    check(cells.length>=4&&cells[0]===id,"canonical QA row shape changed: "+id);
    checks.push({review_key:id,canonical_criterion_id:id,source:"DIUA-DIC-000019@1.32",
      requirement:cells.at(-1),review_status:"PENDING_INDEPENDENT_EVALUATION"});
  }
  const assetRow=q.split("\n").find(l=>l.startsWith("> **ASSET-QA-01**"));
  check(assetRow,"canonical asset QA criterion missing");
  checks.push({review_key:"ASSET-QA-01",canonical_criterion_id:"ASSET-QA-01",
    source:"DIUA-DIC-000019@1.32",requirement:assetRow.replace(/^>\s*/,""),
    review_status:"PENDING_INDEPENDENT_EVALUATION"});
  const formatSection=formatDoc.match(/### QA — EXTEND\s*\n([\s\S]*?)\nStages not declared above/);
  check(formatSection,"canonical carousel format QA block missing");
  const bullets=formatSection[1].split("\n").map(x=>x.trim())
    .filter(x=>x.startsWith("* ")).map(x=>x.slice(2));
  check(bullets.length===9,"unexpected format contribution count; reconcile before QA");
  for(const [index,requirement] of bullets.entries())
    checks.push({review_key:"FORMAT-CAROUSEL-ITEM-"+String(index+1).padStart(2,"0"),
      canonical_criterion_id:null,source:"DIUA-DIC-000029@1.4",
      requirement,review_status:"PENDING_INDEPENDENT_EVALUATION"});
  return checks;
}
export function assembleStg08Intake(packet,artifact,{copy,research,qaAuthority,formatAuthority}){
  check(ID.test(packet?.content_id),"invalid Content ID");
  check(packet.source_mode==="EDITABLE_RENDER_CANDIDATE","only new editable render candidates require QA intake");
  check(packet.checkpoint_status==="CANDIDATE_RENDERED_ARTIFACT_INTEGRITY_PASS" &&
    packet.scope?.rendered_media===true &&
    packet.scope?.stg09_decision_created===false &&
    packet.scope?.stg10_publication_authorization_created===false &&
    packet.usable_as_final_visual_review_package===false,"checkpoint is not an unapproved render candidate");
  check(artifact?.schema==="cwc-render-artifact-integrity-v1" &&
    artifact.verdict==="ARTIFACT_INTEGRITY_PASS" &&
    artifact.content_id===packet.content_id &&
    artifact.actual_rendered_candidate===true &&
    artifact.formal_stg08_qa_passed===false &&
    artifact.stg10_publication_authorized===false &&
    artifact.owner_stg09_approved_by_this_run===false &&
    artifact.publication_performed===false,"technical evidence scope or identity mismatch");
  check(copy?.content_id===packet.content_id&&
    copy?.copy_fingerprint===artifact.source_copy_sha256&&
    HASH.test(copy.copy_fingerprint),"approved copy does not bind the rendered evidence");
  check(packet.render_artifact_integrity?.source_copy_sha256===copy.copy_fingerprint &&
    packet.render_artifact_integrity?.slides?.length===artifact.slides?.length &&
    packet.render_artifact_integrity.slides.every((s,i)=>
      s.sha256===artifact.slides[i].sha256&&s.name===artifact.slides[i].name),
    "render bytes do not match the one-run checkpoint");
  const researchEvidence=validateResearch(copy,research); // structural only
  check(researchEvidence.result==="RESEARCH_EVIDENCE_STRUCTURE_PASS","research structural coverage incomplete");
  const checks=qaChecklist(qaAuthority,formatAuthority);
  const sourceById=new Map(research.sources.map(s=>[s.id,s]));
  const claims=research.claims.map(c=>({
    id:c.id,claim:c.claim,coverage:c.coverage,
    locations:c.locations,applicability_limit:c.applicability_limit,
    sources:c.source_ids.map(sid=>({id:sid,url:sourceById.get(sid)?.url,
      point_of_use_reliability_recorded:sourceById.get(sid)?.point_of_use_reliability||null}))
  }));
  return {
    schema:"cwc-stg08-review-intake-v1",
    content_id:packet.content_id,
    status:"STG08_EVIDENCE_PREPARED_AWAITING_INDEPENDENT_REVIEW",
    authority:{qa:"DIUA-DIC-000019@1.32",format:"DIUA-DIC-000029@1.4"},
    copy_sha256:copy.copy_fingerprint,
    research_evidence_sha256:researchEvidence.research_sha256,
    source_review_record:research.source_review_record,
    rendered_slides:artifact.slides,
    contact_sheet_sha256:artifact.contact_sheet_sha256,
    claim_source_matrix:claims,
    applicable_criteria_preparation:{
      candidate_count:checks.length,
      criteria:checks,
      criteria_resolved_for_formal_qa:false,
      note:"Format bullets are source text, not invented canonical Criterion IDs. STG-08 reviewer must resolve final applicability and evidence."
    },
    automatic_checks:{
      research_coverage_structure:"PASS",
      image_encoding_dimensions_order_sha256:"PASS",
      canonical_assets_authority_readback:"NOT_REVERIFIED_BY_THIS_INTAKE",
      source_claim_truth:"NOT_EVALUATED",
      full_visual_and_accessibility_review:"NOT_EVALUATED"
    },
    pending_review_count:checks.length,
    formal_stg08_qa_record_created:false,
    formal_stg08_verdict:null,
    lifecycle_transition_performed:false,
    owner_stg09_approval_granted:false,
    stg10_publication_authorized:false,
    content_register_writeback_performed:false,
    next_action:"Complete all applicable CWC-QA-001 criteria with independent evidence, Expected/Actual and PASS/FAIL or classified unresolved finding. Only a valid formal QA record may request Owner STG-09 approval."
  };
}
export function intakeMarkdown(i){
  const out=[
    "# STG-08 independent QA intake — "+i.content_id,"",
    "**State:** "+i.status,"",
    "**Technical byte integrity:** PASS. **Clinical, editorial and visual QA:** NOT EVALUATED.","",
    "**This dossier is NOT a formal QA Record and cannot authorize STG-09 or STG-10.**","",
    "## Source-reviewed claims for independent assessment"
  ];
  for(const c of i.claim_source_matrix)out.push("",
    "**"+c.id+":** "+c.claim,"",
    "Scope: "+c.locations.join(", ")+"; limit: "+c.applicability_limit,"",
    "References: "+c.sources.map(s=>s.id+" ("+s.url+")").join("; "));
  out.push("","## Canonical QA review queue","",
    "| Source | Criterion / reference | Status |","|---|---|---|");
  for(const c of i.applicable_criteria_preparation.criteria)
    out.push("| "+c.source+" | "+c.review_key+" | "+c.review_status+" |");
  out.push("","## Reviewer instructions","",
    "Inspect each exact rendered PNG, verify visual/accessibility/identity checks and point-of-use claims against current sources; record evidence and expected/actual result per applicable criterion. Never treat this checklist as an automatic STG-08 verdict.");
  return out.join("\n")+"\n";
}
function main(argv){
  const allowed=new Set(["--content-id","--checkpoint","--technical-qa","--out"]);
  check(argv.length===8,"four CLI arguments required");
  const args={};
  for(let i=0;i<argv.length;i+=2){
    check(allowed.has(argv[i])&&argv[i+1]&&!Object.hasOwn(args,argv[i]),"unknown or repeated argument");
    args[argv[i]]=argv[i+1];
  }
  const id=args["--content-id"];
  check(ID.test(id),"invalid Content ID");
  const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
  const root=CWC+"/content";
  const output=assembleStg08Intake(
    read(args["--checkpoint"]),read(args["--technical-qa"]),{
      copy:read(root+"/carousel/"+id+".json"),
      research:read(root+"/research/"+id+".research.json"),
      qaAuthority:fs.readFileSync(QA_AUTH,"utf8"),
      formatAuthority:fs.readFileSync(FORMAT_AUTH,"utf8")
    });
  const dest=args["--out"];
  fs.mkdirSync(dest,{recursive:true});
  fs.writeFileSync(path.join(dest,"stg08-review-intake.json"),JSON.stringify(output,null,2)+"\n");
  fs.writeFileSync(path.join(dest,"stg08-review-intake.md"),intakeMarkdown(output));
  console.log("STG08_EVIDENCE_PREPARED_AWAITING_INDEPENDENT_REVIEW (no QA verdict)");
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{main(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1}
}
