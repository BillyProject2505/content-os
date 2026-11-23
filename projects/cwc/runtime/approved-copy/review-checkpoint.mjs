#!/usr/bin/env node
// BUS-180: one-run read-only checkpoint. No render, approval, provider or state writes.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {resolveProductionInput} from "./resolve-production-input.mjs";

const ID=/^CWC-CRSL-[0-9]{4}$/;
function requireThat(ok,reason){if(!ok)throw new Error("CWC_CHECKPOINT_REJECTED: "+reason);}
function stages(mode){
  const s=Array.from({length:11},(_,i)=>({
    stage:"STG-"+String(i+1).padStart(2,"0"),checkpoint_verdict:"NOT_VERIFIED_BY_THIS_RUN"
  }));
  if(mode==="EDITABLE_RENDER_CANDIDATE"){
    s[2].checkpoint_verdict="RESEARCH_STRUCTURE_PASS_NOT_CLINICAL";
    s[4].checkpoint_verdict="FROZEN_COPY_CONTRACT_PASS";
    s[6].checkpoint_verdict="TYPED_LAYOUT_PLAN_PASS_NOT_RENDERED";
  }else{
    s[4].checkpoint_verdict="APPROVED_PNG_HASH_REFERENCES_MATCH";
    s[6].checkpoint_verdict="VISUAL_HASH_REFERENCES_MATCH_NOT_PIXEL_QA";
    s[7].checkpoint_verdict="QA_RECORD_PASS";
    s[8].checkpoint_verdict="OWNER_APPROVAL_RECORD_APPROVED";
  }
  s[9].checkpoint_verdict="NO_PUBLICATION_AUTHORIZATION_IN_THIS_RUN";
  s[10].checkpoint_verdict="NO_PLATFORM_EVIDENCE_WRITEBACK";
  return s;
}
export function makeReviewCheckpoint(contentId,{expectedCopyFingerprint,expectedLayoutFingerprint,root=process.cwd()}={}){
  requireThat(ID.test(contentId),"invalid CWC Carousel Content ID");
  const source=resolveProductionInput(contentId,{root,expectedCopyFingerprint,expectedLayoutFingerprint});
  const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
  const immutable=source.source_mode==="IMMUTABLE_APPROVED_RASTER";
  const p="projects/cwc/content/carousel/"+contentId+(immutable?".stg05-content.json":".json");
  const c=read(p);
  const slides=immutable
    ? c.content_draft.slides.map(s=>({number:s.number,copy:s.copy}))
    : c.slides.map(s=>({number:s.slide,text:s.text}));
  const caption=immutable?c.content_draft.caption:c.caption;
  requireThat(slides.length>0&&slides.every((s,i)=>s.number===i+1),"slide order invalid");
  requireThat(typeof caption==="string"&&caption.length>0,"caption missing");
  return {
    schema:"cwc-review-checkpoint-v1",
    content_id:contentId,
    source_mode:source.source_mode,
    checkpoint_status:immutable?"EXISTING_APPROVED_MEDIA_CROSSCHECKED":"RENDER_CANDIDATE_INPUT_CROSSCHECKED",
    summary:immutable
      ? "Existing approved media HASH RECORDS match. No media bytes or Instagram status inspected; never re-render or re-publish."
      : "Frozen copy and typed layout structure verified; actual render, independent QA and Owner approval not performed.",
    slides,caption,
    approved_media_hashes:immutable?source.approved_media:null,
    stage_evidence:stages(source.source_mode),
    source_files:source.source_files,
    scope:{
      read_only:true,rendered_media:false,media_bytes_rechecked:false,
      clinical_claims_reviewed_this_run:false,stg09_decision_created:false,
      stg10_publication_authorization_created:false,
      instagram_schedule_verified:false,instagram_publication_verified:false,
      canonical_register_writeback:false
    },
    next_internal_action:immutable
      ? "Reconcile native scheduled post with platform evidence; never post twice."
      : "Render from validated source, run independent QA, then present actual visual/caption once for Owner approval.",
    owner_action_required_now:false,
    usable_as_final_visual_review_package:false
  };
}
export function reviewMarkdown(p){
  const lines=[
    "# CWC checkpoint: "+p.content_id,"",
    "**Mode:** "+p.source_mode,"",
    "**Evidence:** "+p.checkpoint_status,"",p.summary,"",
    "## Stage scope in this run","",
    "| Stage | Scope |","|---|---|",
    ...p.stage_evidence.map(s=>"| "+s.stage+" | "+s.checkpoint_verdict+" |"),
    "","## Content / caption for review"
  ];
  for(const s of p.slides){
    lines.push("","### Slide "+s.number);
    if(s.text!==undefined)lines.push(s.text);
    else for(const [k,v] of Object.entries(s.copy))lines.push("- "+k+": "+v);
  }
  lines.push("","## Caption","",p.caption,"","## Internal next action","",
    p.next_internal_action,"",
    "**No Owner approval required from this checkpoint.**","",
    "**No visual render, publication, schedule, or canonical writeback performed.**");
  return lines.join("\n")+"\n";
}
function main(argv){
  const allowed=new Set(["--content-id","--copy-fingerprint","--layout-fingerprint","--out"]);
  requireThat(argv.length>0&&argv.length%2===0,"arguments must be pairs");
  const opts={};
  for(let i=0;i<argv.length;i+=2){
    requireThat(allowed.has(argv[i])&&argv[i+1]&&!Object.hasOwn(opts,argv[i]),"invalid or repeated argument");
    opts[argv[i]]=argv[i+1];
  }
  requireThat(opts["--content-id"]&&opts["--out"],"Content ID and output directory required");
  const p=makeReviewCheckpoint(opts["--content-id"],{
    expectedCopyFingerprint:opts["--copy-fingerprint"],
    expectedLayoutFingerprint:opts["--layout-fingerprint"]
  });
  fs.mkdirSync(opts["--out"],{recursive:true});
  fs.writeFileSync(path.join(opts["--out"],"review-checkpoint.json"),JSON.stringify(p,null,2)+"\n");
  fs.writeFileSync(path.join(opts["--out"],"review-summary.md"),reviewMarkdown(p));
  console.log(p.content_id+": "+p.checkpoint_status+" (read-only)");
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{main(process.argv.slice(2))}catch(e){console.error(e.message);process.exitCode=1}
}
