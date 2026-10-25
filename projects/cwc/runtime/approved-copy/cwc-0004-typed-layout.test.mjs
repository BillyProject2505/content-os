import fs from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
import {attachLayout,layoutFingerprint} from "./typography-layout.mjs";
import {validateCopy} from "./preflight.mjs";

const path="projects/cwc/content/carousel/CWC-CRSL-0004";
const copy=JSON.parse(fs.readFileSync(path+".json","utf8"));
const layout=JSON.parse(fs.readFileSync(path+".layout.json","utf8"));
const copyHash="27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60";
const layoutHash="5f23b51944a8446f442f6372d4397318cb66be6284b95a48cc0b142f436ef134";

test("BUS-171 typed layout is independently fingerprinted and matches approved copy",()=>{
  assert.equal(validateCopy(copy,{contentId:copy.content_id,expectedFingerprint:copyHash}).result,"COPY_PREFLIGHT_PASS");
  assert.equal(layoutFingerprint(layout),layoutHash);
  assert.equal(layout.content_id,copy.content_id);
  const plan={schema:"cwc-carousel-render-plan-v1",status:"RENDER_PLAN_CANDIDATE",
    content_id:copy.content_id,slides:copy.slides.map(s=>({slide:s.slide,copy:s.text}))};
  const typed=attachLayout(plan,layout,layoutHash);
  assert.equal(typed.typography_layout.slides.length,5);
  assert.equal(typed.typography_layout.source_approval_verified,false);
  assert.equal(typed.typography_layout.fingerprint,layoutHash);
  for(let i=0;i<5;i++){
    assert.equal(typed.typography_layout.slides[i].blocks.map(b=>b.text).join(" "),copy.slides[i].text);
  }
});
test("changing text or layout invalidates the independent contract",()=>{
  const plan={schema:"cwc-carousel-render-plan-v1",status:"RENDER_PLAN_CANDIDATE",
    content_id:copy.content_id,slides:copy.slides.map(s=>({slide:s.slide,copy:s.text}))};
  const changed=structuredClone(layout);
  changed.slides[0].blocks[0].text="Copy berubah";
  assert.throws(()=>attachLayout(plan,changed,layoutHash),/LAYOUT_FINGERPRINT_MISMATCH/);
  assert.throws(()=>attachLayout(plan,layout,"0".repeat(64)),/LAYOUT_FINGERPRINT_MISMATCH/);
});
