import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0 || !process.argv[i + 1]) throw new Error(`Missing ${name}`);
  return process.argv[i + 1];
}
function sha256File(p) {
  const h=createHash("sha256");
  h.update(fs.readFileSync(p));
  return h.digest("hex");
}
function assert(ok, message) {
  if (!ok) throw new Error(message);
}

const reportPath=path.resolve(arg("--report"));
const manifestPath=path.resolve(arg("--manifest"));
const candidatePath=path.resolve(arg("--candidate"));
const authorityPath=path.resolve(arg("--authority"));
const outPath=path.resolve(arg("--out"));
const renderDir=path.dirname(reportPath);

const report=JSON.parse(fs.readFileSync(reportPath,"utf8"));
const manifest=JSON.parse(fs.readFileSync(manifestPath,"utf8"));
const candidate=JSON.parse(fs.readFileSync(candidatePath,"utf8"));
const authority=JSON.parse(fs.readFileSync(authorityPath,"utf8"));
const plan=authority.sage_default_visual_plan;

assert(report.template_version === authority.renderer.version, "Renderer version mismatch");
assert(report.content_id === "SDOH-SAGE-CAR-0009", "Content ID mismatch");
assert(report.theme === "SAGE", "Theme mismatch");
assert(report.layout_mode === "illustrated_single_character", "Layout mode mismatch");
assert(report.outputs.length === 5, "Expected five render outputs");
assert(report.asset_hashes.font === authority.font.sha256, "Font hash mismatch");

for (const [index, output] of report.outputs.entries()) {
  const slide=index+1;
  const pose=plan.pose_route[index];
  const expectedPose=authority.poses[pose];
  assert(output.slide === slide, `Slide order mismatch at ${slide}`);
  assert(JSON.stringify(output.dimensions) === JSON.stringify([1080,1350]), `Dimensions mismatch S${slide}`);
  assert(output.icc_present === true, `ICC missing S${slide}`);
  assert(output.exif_entries === 0, `EXIF not empty S${slide}`);
  assert(output.jpeg_sampling === 0, `JPEG is not 4:4:4 S${slide}`);
  assert(output.main_text_ink_width_px <= 600, `Illustrated text overflow S${slide}`);
  assert(output.character?.pose_id === pose, `Pose mismatch S${slide}`);
  assert(output.character?.anchor === "lower_right", `Anchor mismatch S${slide}`);
  assert(output.character?.scale === "md", `Scale mismatch S${slide}`);
  assert(output.character?.ground_mode === "embedded", `Ground mode mismatch S${slide}`);
  assert(output.character?.sha256 === expectedPose.sha256, `Pose SHA mismatch S${slide}`);
  const jpg=path.join(renderDir,output.filename);
  assert(fs.existsSync(jpg), `Rendered JPEG missing S${slide}`);
  assert(sha256File(jpg) === output.sha256, `Rendered JPEG SHA mismatch S${slide}`);
}

const review={
  schema_version:"1",
  content_id:"SDOH-SAGE-CAR-0009",
  state:"READY_FOR_OWNER_REVIEW",
  approval:"NOT_GRANTED",
  publication_state:"PLANNED",
  source_candidate:{
    provider:candidate.generation_metadata.provider,
    model:candidate.generation_metadata.model,
    request_fingerprint:candidate.generation_metadata.request_fingerprint,
    response_fingerprint:candidate.generation_metadata.response_fingerprint,
    caption:candidate.caption
  },
  visual_plan:{
    layout_mode:plan.layout_mode,
    pose_route:plan.pose_route,
    anchor:plan.anchor,
    scale:plan.scale,
    ground_mode:plan.ground_mode
  },
  renderer:{
    version:authority.renderer.version,
    source_snapshot_sha256:authority.renderer.sha256
  },
  technical_qa:{
    result:"PASS",
    output_count:5,
    canvas:"1080x1350",
    sRGB_icc:true,
    jpeg_sampling:"4:4:4",
    zero_exif:true,
    text_overflow:false
  },
  outputs:report.outputs.map(o=>({
    slide:o.slide,
    filename:o.filename,
    sha256:o.sha256,
    main_text_ink_width_px:o.main_text_ink_width_px,
    pose_id:o.character.pose_id
  }))
};
fs.writeFileSync(outPath,JSON.stringify(review,null,2)+"\n");
console.log("technical_qa=PASS");
console.log("review_state=READY_FOR_OWNER_REVIEW");
console.log("owner_approval=NOT_GRANTED");
