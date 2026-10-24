import test from "node:test";
import assert from "node:assert/strict";
import { fingerprintOf } from "./preflight.mjs";
import { buildCarouselRenderPlan, PRESENTER_VARIANTS, FIXED_ASSETS } from "./render-plan.mjs";

function approvedCopy() {
  const c={
    schema:"cwc-approved-copy-v1",
    content_id:"CWC-CRSL-9999", // test-only, never allocated
    format:"CRSL",
    status:"COPY_APPROVED",
    approval_record_url:"https://linear.app/bussiness-content-os/issue/BUS-170/cwc-approved-copy-automation-pilot-sdoh-pattern-adoption",
    sensitive_claim:true,
    source_evidence:[{claim:"PrEP claim for review",source_url:"https://www.who.int/",checked_at:"2026-10-24"}],
    slides:[{slide:1,text:"PrEP dipahami melalui informasi yang dapat diperiksa."},{slide:2,text:"Cari informasi dari tenaga kesehatan."}],
    caption:"Untuk bantuan medis, konsultasikan ke tenaga kesehatan. Ikuti @cozwecare.id dan bagikan materi ini. #PrEP #HIV #EdukasiHIV #TesHIV #Manado",
    local_hashtag:"#Manado",
    copy_fingerprint:""
  };
  c.copy_fingerprint=fingerprintOf(c);return c;
}
function opts(c) {return{
  expectedFingerprint:c.copy_fingerprint,
  surface:"BLUE_DARK",
  presenterVariant:"WHITE_POINT_LEFT",
  coverCopyRect:{x:72,y:250,width:479,height:440},
  presenterBodyRect:{x:670,y:260,width:345,height:780},
  gestureRect:{x:572,y:500,width:22,height:120},
};}
function build(c=approvedCopy(),overrides={}){return buildCarouselRenderPlan(c,{...opts(c),...overrides});}
function shouldFail(overrides,code) {
  assert.throws(()=>build(approvedCopy(),overrides),e=>e.code===code);
}
test("CWC current Slide 1 composition produces non-publishable plan",()=>{
  const p=build();
  assert.equal(p.status,"RENDER_PLAN_CANDIDATE");
  assert.equal(p.authority.version,"1.4");
  assert.equal(p.canvas.width,1080);
  assert.equal(p.asset_refs.presenter.drive_id,PRESENTER_VARIANTS.WHITE_POINT_LEFT.id);
  assert.equal(p.asset_refs.logo.drive_id,FIXED_ASSETS.BLUE_DARK.logo.drive_id);
  assert.equal(p.gates.asset_bytes_sha256_verified,false);
  assert.equal(p.gates.approved_release_identity_issued,false);
  assert.equal(p.gates.publication_authorized,false);
  assert.equal(p.slides.length,2);
});
test("surface light selects light logo and blue footer",()=>{
  const p=build(approvedCopy(),{surface:"LIGHT_WHITE"});
  assert.equal(p.asset_refs.footer.drive_id,FIXED_ASSETS.LIGHT_WHITE.footer.drive_id);
  assert.equal(p.asset_refs.logo.drive_id,FIXED_ASSETS.LIGHT_WHITE.logo.drive_id);
});
test("all reusable production derivatives are selectable",()=>{
  for(const k of Object.keys(PRESENTER_VARIANTS))
    assert.equal(build(approvedCopy(),{presenterVariant:k}).composition.slide_1.presenter_variant,k);
});
test("unknown presenter derivative is rejected",()=>shouldFail({presenterVariant:"GENREF_NEW"},"PRESENTER_INVALID"));
test("unregistered surface is rejected",()=>shouldFail({surface:"BURGUNDY"},"SURFACE_INVALID"));
test("legacy x:504 copy geometry is rejected",()=>shouldFail({coverCopyRect:{x:504,y:250,width:47,height:440}},"COPY_ZONE_INVALID"));
test("copy violating right edge is rejected",()=>shouldFail({coverCopyRect:{x:72,y:250,width:500,height:440}},"COPY_ZONE_INVALID"));
test("presenter intruding composition gutter is rejected",()=>shouldFail({presenterBodyRect:{x:600,y:250,width:345,height:600}},"PRESENTER_ZONE_INVALID"));
test("presenter exceeding right core limit is rejected",()=>shouldFail({presenterBodyRect:{x:700,y:250,width:345,height:600}},"PRESENTER_ZONE_INVALID"));
test("gesture beyond allowed x 572..594 is rejected",()=>shouldFail({gestureRect:{x:560,y:500,width:40,height:90}},"GESTURE_ZONE_INVALID"));
test("illegal canvas overspill is rejected",()=>shouldFail({presenterBodyRect:{x:670,y:1200,width:345,height:200}},"PRESENTER_RECT_INVALID"));
test("missing human-approved copy fails closed",()=>{
  const c=approvedCopy();c.status="COPY_DRAFT";
  assert.throws(()=>build(c),e=>e.code==="COPY_NOT_APPROVED");
});
test("copy mutation breaks integrity",()=>{
  const c=approvedCopy();c.slides[0].text="changed after sign-off";
  assert.throws(()=>build(c),e=>e.code==="FINGERPRINT_MISMATCH");
});
test("fingerprint supplied independently must match",()=>shouldFail({expectedFingerprint:"a".repeat(64)},"FINGERPRINT_MISMATCH"));
test("format authority drift blocks execution",()=>{
  const c=approvedCopy();
  assert.throws(()=>buildCarouselRenderPlan(c,{...opts(c),authorityFile:"projects/cwc/runtime/approved-copy/README.txt"}),e=>e.code==="AUTHORITY_MISSING");
});
