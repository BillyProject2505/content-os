import test from "node:test";
import assert from "node:assert/strict";
import {attachLayout,layoutFingerprint,ROLE_STYLE} from "./typography-layout.mjs";
function fixture(){
  const plan={
    schema:"cwc-carousel-render-plan-v1",status:"RENDER_PLAN_CANDIDATE",
    content_id:"CWC-CRSL-9999",
    slides:[{slide:1,copy:"Satu tujuan, metode bisa berbeda. Cara pakai PrEP tidak sama untuk semua orang."},
      {slide:2,copy:"PrEP membutuhkan informasi tepercaya."}],
  };
  const layout={schema:"cwc-carousel-typography-layout-v1",content_id:plan.content_id,
    slides:[
      {slide:1,blocks:[
        {role:"headline",text:"Satu tujuan, metode bisa berbeda.",rect:{x:72,y:450,width:479,height:248},tone:"WHITE"},
        {role:"supporting",text:"Cara pakai PrEP tidak sama untuk semua orang.",rect:{x:72,y:770,width:479,height:155},tone:"WHITE"}],
       accents:[{type:"line",tone:"YELLOW",rect:{x:72,y:397,width:121,height:6}}]},
      {slide:2,blocks:[
        {role:"body",text:"PrEP membutuhkan informasi tepercaya.",rect:{x:72,y:310,width:936,height:156},tone:"WHITE"}],accents:[]}
    ]};
 return {plan,layout};
}
function go(mutate=()=>{}){const {plan,layout}=fixture();mutate(plan,layout);return attachLayout(plan,layout,layoutFingerprint(layout));}
function fails(mutate,code){const {plan,layout}=fixture();mutate(plan,layout);assert.throws(()=>attachLayout(plan,layout,layoutFingerprint(layout)),e=>e.code===code);}
test("frozen content matches semantic components and accents",()=>{
  const p=go();assert.equal(p.typography_layout.slides[0].blocks.length,2);
  assert.equal(p.typography_layout.source_approval_verified,false);
  assert.equal(p.typography_layout.slides[0].accents[0].tone,"YELLOW");
});
test("registered CWC type sizes and floors",()=>{
 assert.equal(ROLE_STYLE.headline.size,72);assert.equal(ROLE_STYLE.supporting.size,34);
 assert.equal(ROLE_STYLE.hero.size,88);assert.equal(ROLE_STYLE.body.min_size,36);
});
test("independent layout hash rejects changed layout",()=>{
 const {plan,layout}=fixture();const sha=layoutFingerprint(layout);layout.slides[0].accents[0].rect.width=122;
 assert.throws(()=>attachLayout(plan,layout,sha),e=>e.code==="LAYOUT_FINGERPRINT_MISMATCH");
});
test("text paraphrase rejected even if layout hash updated",()=>fails((p,l)=>l.slides[0].blocks[1].text="Cara pakai PrEP berbeda.", "APPROVED_COPY_DRIFT"));
test("headline punctuation change rejected",()=>fails((p,l)=>l.slides[0].blocks[0].text="Satu tujuan, metode bisa berbeda","APPROVED_COPY_DRIFT"));
test("reversed type order rejected",()=>fails((p,l)=>l.slides[0].blocks[1].rect.y=300,"TEXT_ORDER_INVALID"));
test("wrong content id rejected",()=>fails((p,l)=>l.content_id="CWC-CRSL-0003","CONTENT_ID_MISMATCH"));
test("missing blocks rejected",()=>fails((p,l)=>l.slides[1].blocks=[],"BLOCKS_INVALID"));
test("extra slides rejected",()=>fails((p,l)=>l.slides.push(l.slides[0]),"SLIDE_COUNT_MISMATCH"));
test("copy extends into presenter/gutter rejected",()=>fails((p,l)=>l.slides[0].blocks[0].rect.width=600,"TEXT_RECT_INVALID"));
test("unregistered type size/role rejected",()=>fails((p,l)=>l.slides[0].blocks[0].role="tiny","TYPOGRAPHY_ROLE_INVALID"));
test("unapproved text color rejected",()=>fails((p,l)=>l.slides[0].blocks[0].tone="RED","TONE_INVALID"));
test("yellow kicker permitted without editorial rewrite",()=>go((p,l)=>{
  l.slides[1].blocks[0].role="kicker";l.slides[1].blocks[0].tone="YELLOW";
}));
test("accent cannot cover text",()=>fails((p,l)=>l.slides[0].accents[0].rect.y=500,"ACCENT_COLLISION"));
test("only yellow line accents permitted",()=>fails((p,l)=>l.slides[0].accents[0].tone="PINK","ACCENT_INVALID"));
test("geometry for later slides respects bottom safe area",()=>fails((p,l)=>l.slides[1].blocks[0].rect.y=1200,"TEXT_RECT_INVALID"));
test("layout unchanged copy fingerprint remains exactly original",()=>{
 const {plan,layout}=fixture();plan.source_copy_sha256="a".repeat(64);
 const out=attachLayout(plan,layout,layoutFingerprint(layout));
 assert.equal(out.source_copy_sha256,plan.source_copy_sha256);
 assert.deepEqual(out.slides,plan.slides);
});
