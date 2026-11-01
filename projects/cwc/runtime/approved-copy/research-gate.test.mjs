import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {validateResearch} from "./research-gate.mjs";
const id="CWC-CRSL-0004";
const copy=JSON.parse(fs.readFileSync("projects/cwc/content/carousel/"+id+".json","utf8"));
const research=JSON.parse(fs.readFileSync("projects/cwc/content/research/"+id+".research.json","utf8"));
const clone=()=>structuredClone(research);
const mustFail=(mutate,code)=>{
 const record=clone();mutate(record);
 assert.throws(()=>validateResearch(copy,record),e=>e.code===code);
};
test("Research gate validates actual CWC-CRSL-0004 evidence coverage without claiming truth",()=>{
 const r=validateResearch(copy,research);
 assert.equal(r.result,"RESEARCH_EVIDENCE_STRUCTURE_PASS");
 assert.equal(r.claim_count,6);
 assert.equal(r.covered_sections,6);
 assert.match(r.research_sha256,/^[a-f0-9]{64}$/);
 for(const key of ["clinical_truth_verified","stg03_lifecycle_exit_verified",
 "stg08_technical_qa_passed","stg09_owner_release_approved","publication_authorized"]){
  assert.equal(r[key],false,key);
 }
});
test("Research gate rejects mismatched copy",()=>mustFail(r=>{r.copy_fingerprint="0".repeat(64)},"RESEARCH_COPY_MISMATCH"));
test("Research gate rejects broken provenance",()=>mustFail(r=>{r.sources[0].url="http://example.com/"},"RESEARCH_SOURCE_INVALID"));
test("Research gate rejects missing point-of-use reliability",()=>mustFail(r=>{r.sources[0].point_of_use_reliability=""},"RESEARCH_SOURCE_INVALID"));
test("Research gate rejects unsupported coverage",()=>mustFail(r=>{r.claims[0].coverage="INSUFFICIENT_EVIDENCE"},"RESEARCH_CLAIM_INVALID"));
test("Research gate rejects missing slide coverage",()=>mustFail(r=>{r.claims[0].locations=r.claims[0].locations.filter(x=>x!=="slide-1")},"RESEARCH_COVERAGE_INCOMPLETE"));
test("Research gate rejects unknown citation IDs",()=>mustFail(r=>{r.claims[0].source_ids=["NON_EXISTENT"]},"RESEARCH_SOURCE_LINK_MISSING"));
test("Research gate rejects fake clinical authority",()=>mustFail(r=>{r.human_clinical_signoff=true},"RESEARCH_AUTHORITY_INVALID"));
test("Research gate rejects uncited editorial navigation claims",()=>mustFail(r=>{r.claims[5].source_ids=["ID_JUKNIS_2023"]},"RESEARCH_EDITORIAL_AUTHORITY_INVALID"));
test("Research gate CLI emits non-authorizing JSON",()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),"cwc-research-"));
 try{
  const target=path.join(d,"research.json");
  const run=spawnSync(process.execPath,["projects/cwc/runtime/approved-copy/research-gate.mjs",
   "--content-id",id,"--out",target],{encoding:"utf8"});
  assert.equal(run.status,0,run.stderr);
  const result=JSON.parse(fs.readFileSync(target,"utf8"));
  assert.equal(result.result,"RESEARCH_EVIDENCE_STRUCTURE_PASS");
  assert.equal(result.publication_authorized,false);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
test("Research gate CLI fails closed when research source record missing",()=>{
 const d=fs.mkdtempSync(path.join(os.tmpdir(),"cwc-research-missing-"));
 try{
  const run=spawnSync(process.execPath,["projects/cwc/runtime/approved-copy/research-gate.mjs",
   "--content-id","CWC-CRSL-9999","--out",path.join(d,"research.json")],{encoding:"utf8"});
  assert.notEqual(run.status,0);
  assert.deepEqual(fs.readdirSync(d),[]);
 }finally{fs.rmSync(d,{recursive:true,force:true});}
});
