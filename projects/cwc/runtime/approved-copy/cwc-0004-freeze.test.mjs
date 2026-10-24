// BUS-171 — snapshot integrity of one Owner-approved CWC carousel editorial payload.
// This test does not authenticate the human approval record or grant release authority.
import fs from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";
import {validateCopy,fingerprintOf} from "./preflight.mjs";

const base="projects/cwc/content/carousel/CWC-CRSL-0004";
const copy=JSON.parse(fs.readFileSync(base+".json","utf8"));
const editorial=JSON.parse(fs.readFileSync(base+".editorial-freeze.json","utf8"));
const frozenEditorHash="e5195692ad96cf153a56776f05ad396458400101c70125be65784435bc586f12";
const frozenCopyHash="27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60";
function canonical(v){
  if(Array.isArray(v))return v.map(canonical);
  if(v&&typeof v==="object")return Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])]));
  return v;
}
test("BUS-171 exact Owner-approved editorial snapshot is unchanged",()=>{
  const sha=createHash("sha256").update(JSON.stringify(canonical(editorial))).digest("hex");
  assert.equal(sha,frozenEditorHash);
  assert.equal(editorial.schema,"cwc-editorial-owner-copy-freeze-v0.2");
  assert.equal(editorial.issue,"BUS-171");
  assert.equal(editorial.slides.length,5);
  assert.deepEqual(copy.slides,editorial.slides.map(s=>({slide:s.slide,text:s.headline+" "+s.body})));
  assert.equal(copy.caption,editorial.caption);
});
test("BUS-171 frozen content instance has its own independently known fingerprint",()=>{
  assert.equal(copy.content_id,"CWC-CRSL-0004");
  assert.equal(copy.status,"COPY_APPROVED");
  assert.equal(copy.copy_fingerprint,frozenCopyHash);
  assert.equal(fingerprintOf(copy),frozenCopyHash);
  const check=validateCopy(copy,{contentId:"CWC-CRSL-0004",expectedFingerprint:frozenCopyHash});
  assert.equal(check.result,"COPY_PREFLIGHT_PASS");
  assert.equal(check.approval_evidence_verified,false);
  assert.equal(check.technical_visual_qa_passed,false);
  assert.equal(check.final_owner_approval_granted,false);
  assert.equal(check.publication_authorized,false);
});
