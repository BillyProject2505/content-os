import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { finalizeGenerationResponse } from "./model-generation-contract.mjs";

function fail(message){ throw new Error(message); }
function sha256File(p){
  return createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

const root=fs.mkdtempSync(path.join(os.tmpdir(),"sdoh-render-selftest-"));
const requestPath=path.resolve(
  "projects/sdoh/runtime/automated-content-production/pilot-requests/SDOH-SAGE-CAR-0009.json"
);
const authorityPath=path.resolve(
  "projects/sdoh/runtime/automated-content-production/render-runtime/carousel-v060-authority.json"
);
const request=JSON.parse(fs.readFileSync(requestPath,"utf8"));
const authority=JSON.parse(fs.readFileSync(authorityPath,"utf8"));

const candidateFields={
  caption:"Mengenal ritme hati yang berubah. Memberi izin pada diri untuk menyesuaikan, tanpa takut gagal. Satu dosis obat hati #satudosisobathati #obathati #manado #mentalhealthmanado #pelanpelanaja",
  content_id:"SDOH-SAGE-CAR-0009",
  research_sensitive_claims:[],
  risk_flags:[],
  schema_version:"1",
  slides:[
    {copy:"ritme berubah",slide:1},
    {copy:"menyesuaikan diri",slide:2},
    {copy:"tanpa rasa gagal",slide:3},
    {copy:"izin untuk berubah",slide:4},
    {copy:"menerima ritme baru",slide:5},
  ],
};
const candidate=finalizeGenerationResponse(candidateFields,{
  request,
  provider:"cloudflare-workers-ai",
  model:"@cf/meta/llama-3.3-70b-instruct-fp8-fast",
});

if(candidate.generation_metadata.response_fingerprint!=="13d358fdc3cd45be106e8a67468bc770ec575bb855ef92ac16988b7f3996cb6a"){
  fail("Pilot 2 response fingerprint regression");
}

const candidatePath=path.join(root,"candidate.json");
const manifestPath=path.join(root,"manifest.json");
fs.writeFileSync(candidatePath,JSON.stringify(candidate,null,2));

const builder=spawnSync(process.execPath,[
  path.resolve("projects/sdoh/runtime/automated-content-production/scripts/build-carousel-render-manifest.mjs"),
  "--candidate",candidatePath,
  "--request",requestPath,
  "--authority",authorityPath,
  "--expected-response-fingerprint",candidate.generation_metadata.response_fingerprint,
  "--out",manifestPath,
],{encoding:"utf8"});
if(builder.status!==0) fail(builder.stderr||builder.stdout||"builder failed");

const manifest=JSON.parse(fs.readFileSync(manifestPath,"utf8"));
if(manifest.layout_mode!=="illustrated_single_character") fail("layout mode mismatch");
if(JSON.stringify(manifest.slides.map(s=>s.character.pose_id))!==JSON.stringify(["P02","P03","P05","P06","P07"])) fail("pose route mismatch");
if(manifest.slides[0].copy!=="ritme\nberubah") fail("line-break policy mismatch S1");
if(manifest.slides[2].copy!=="tanpa rasa\ngagal") fail("line-break policy mismatch S3");
if(manifest.slides[4].copy!=="menerima\nritme baru") fail("line-break policy mismatch S5");
console.log("PASS deterministic BUS-144 render manifest");

const renderDir=path.join(root,"rendered");
fs.mkdirSync(renderDir);
const route=authority.sage_default_visual_plan.pose_route;
const outputs=[];
for(let i=0;i<5;i++){
  const filename=`mock_S${String(i+1).padStart(2,"0")}.jpg`;
  const p=path.join(renderDir,filename);
  fs.writeFileSync(p,`mock-render-${i+1}`);
  const pose=route[i];
  outputs.push({
    slide:i+1,
    filename,
    sha256:sha256File(p),
    dimensions:[1080,1350],
    icc_present:true,
    exif_entries:0,
    jpeg_sampling:0,
    main_text_ink_width_px:200,
    character:{
      pose_id:pose,
      sha256:authority.poses[pose].sha256,
      anchor:"lower_right",
      scale:"md",
      ground_mode:"embedded",
    },
  });
}
const report={
  template_version:"0.6.0",
  content_id:"SDOH-SAGE-CAR-0009",
  theme:"SAGE",
  layout_mode:"illustrated_single_character",
  asset_hashes:{font:authority.font.sha256},
  outputs,
};
fs.writeFileSync(path.join(renderDir,"render_report.json"),JSON.stringify(report,null,2));

const reviewPath=path.join(root,"review_package.json");
const qa=spawnSync(process.execPath,[
  path.resolve("projects/sdoh/runtime/automated-content-production/scripts/validate-carousel-review-package.mjs"),
  "--report",path.join(renderDir,"render_report.json"),
  "--manifest",manifestPath,
  "--candidate",candidatePath,
  "--authority",authorityPath,
  "--out",reviewPath,
],{encoding:"utf8"});
if(qa.status!==0) fail(qa.stderr||qa.stdout||"review QA failed");

const review=JSON.parse(fs.readFileSync(reviewPath,"utf8"));
if(review.state!=="READY_FOR_OWNER_REVIEW") fail("review state mismatch");
if(review.approval!=="NOT_GRANTED") fail("approval boundary mismatch");
if(review.publication_state!=="PLANNED") fail("publication boundary mismatch");
console.log("PASS review-package state boundary");
console.log("SDOH automated carousel render self-test PASS");
