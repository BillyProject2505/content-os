// BUS-170 B2: structured typographic layout attachment, NO copy rewriting.
// Frozen approved copy remains in Phase A; this separate, independently hashed
// layout candidate is not STG-08, STG-09 or publication authority.
import fs from "node:fs";
import {createHash} from "node:crypto";
import path from "node:path";
import {fileURLToPath} from "node:url";

export const ROLE_STYLE=Object.freeze({
  hero:{size:88,leading:92,weight:800,font:"montserrat_extrabold",min_size:80},
  headline:{size:72,leading:82,weight:700,font:"montserrat_bold",min_size:64},
  subheadline:{size:52,leading:64,weight:700,font:"montserrat_bold",min_size:46},
  kicker:{size:28,leading:34,weight:600,font:"montserrat_semibold",min_size:26},
  body:{size:38,leading:52,weight:500,font:"montserrat_medium",min_size:36},
  supporting:{size:34,leading:46,weight:500,font:"montserrat_medium",min_size:32},
  cta:{size:38,leading:44,weight:700,font:"montserrat_bold",min_size:36},
});
const HASH=/^[a-f0-9]{64}$/, ID=/^CWC-CRSL-[0-9]{4}$/;
function fail(code,detail){const e=new Error(code+": "+detail);e.code=code;throw e;}
function requireTrue(v,code,detail){if(!v)fail(code,detail);}
function obj(v){return v&&typeof v==="object"&&!Array.isArray(v);}
function keys(x,allowed){return obj(x)&&Object.keys(x).sort().join("|")===allowed.slice().sort().join("|");}
function canonical(x){if(Array.isArray(x))return x.map(canonical);if(obj(x))return Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])]));return x;}
export function layoutFingerprint(x){return createHash("sha256").update(JSON.stringify(canonical(x))).digest("hex");}
function rectOk(r,slide,cover){if(!keys(r,["x","y","width","height"]))return false;
  const {x,y,width,height}=r;
  return [x,y,width,height].every(Number.isInteger)&&x>=72&&y>=230&&width>0&&height>0&&
    x+width <=(cover?551:1008)&&y+height<=1248;
}
function collide(a,b){return a.x<b.x+b.width&&b.x<a.x+a.width&&a.y<b.y+b.height&&b.y<a.y+a.height;}
export function attachLayout(plan,layout,expectedLayoutFingerprint){
  requireTrue(keys(layout,["schema","content_id","slides"]),"LAYOUT_SCHEMA","exact layout fields required");
  requireTrue(layout.schema==="cwc-carousel-typography-layout-v1","LAYOUT_SCHEMA","unsupported layout version");
  requireTrue(plan?.schema==="cwc-carousel-render-plan-v1"&&plan?.status==="RENDER_PLAN_CANDIDATE",
    "PLAN_INVALID","unapproved CWC render plan required");
  requireTrue(ID.test(layout.content_id)&&layout.content_id===plan.content_id,"CONTENT_ID_MISMATCH","layout source ID mismatch");
  requireTrue(typeof expectedLayoutFingerprint==="string"&&HASH.test(expectedLayoutFingerprint)&&layoutFingerprint(layout)===expectedLayoutFingerprint,
    "LAYOUT_FINGERPRINT_MISMATCH","independent SHA-256 does not match layout");
  requireTrue(Array.isArray(layout.slides)&&layout.slides.length===plan.slides?.length,"SLIDE_COUNT_MISMATCH","every approved slide needs a layout");
  const resulting=[];
  layout.slides.forEach((slide,i)=>{
    const cover=i===0,copy=plan.slides[i];
    requireTrue(keys(slide,["slide","blocks","accents"])&&slide.slide===i+1&&copy.slide===i+1,
      "SLIDE_ORDER_INVALID","slide numbers out of sync");
    requireTrue(Array.isArray(slide.blocks)&&slide.blocks.length>=1&&slide.blocks.length<=8,
      "BLOCKS_INVALID","need 1-8 typed textual blocks per slide");
    requireTrue(Array.isArray(slide.accents)&&slide.accents.length<=3,
      "ACCENTS_INVALID","maximum three exact line accents");
    const regions=[];
    const texts=[];
    let prevBottom=0;
    slide.blocks.forEach((b,j)=>{
      requireTrue(keys(b,["role","text","rect","tone"])&&Object.hasOwn(ROLE_STYLE,b.role),
        "TYPOGRAPHY_ROLE_INVALID","registered semantic role required");
      requireTrue(typeof b.text==="string"&&b.text.trim()===b.text&&b.text.length>0&&
         !/[\t\n\r]/.test(b.text)&&!/\s{2}/.test(b.text),
         "TEXT_INVALID","no blank or normalized copy components");
      requireTrue(b.tone==="WHITE"||(b.tone==="YELLOW"&&b.role==="kicker"),
        "TONE_INVALID","only canonical white live text, yellow kicker permitted");
      requireTrue(rectOk(b.rect,slide,cover),"TEXT_RECT_INVALID","copy text outside safe area");
      requireTrue(b.rect.y>=prevBottom,"TEXT_ORDER_INVALID","blocks must be top-to-bottom and not overlap");
      prevBottom=b.rect.y+b.rect.height;
      regions.push(b.rect);texts.push(b.text);
    });
    requireTrue(texts.join(" ")===copy.copy,"APPROVED_COPY_DRIFT","segments must equal frozen approved text byte-for-byte");
    const accents=[];
    slide.accents.forEach((a)=>{
      requireTrue(keys(a,["type","tone","rect"])&&a.type==="line"&&a.tone==="YELLOW",
        "ACCENT_INVALID","only approved simple yellow line accent supported");
      requireTrue(rectOk(a.rect,slide,cover)&&a.rect.height>=2&&a.rect.height<=8&&
        a.rect.width>=40&&a.rect.width<=220,"ACCENT_RECT_INVALID","line outside bounded safe area");
      requireTrue(regions.every(r=>!collide(r,a.rect)),"ACCENT_COLLISION","accent must not cover text");
      accents.push(a);
    });
    resulting.push({slide:slide.slide,blocks:slide.blocks,accents});
  });
  return {...plan,typography_layout:{
      schema:layout.schema,
      fingerprint:expectedLayoutFingerprint,
      source_approval_verified:false,
      slides:resulting
    }};
}
function main(){
  const argv=process.argv.slice(2),o={};
  for(let i=0;i<argv.length;i+=2){if(!argv[i]?.startsWith("--")||!argv[i+1]||Object.hasOwn(o,argv[i]))fail("ARGS","missing or duplicated argument");o[argv[i]]=argv[i+1];}
  const expected=["--plan","--layout","--expected-layout-fingerprint","--out"];
  requireTrue(keys(o,expected),"ARGS","plan,layout,expected-layout-fingerprint,out are mandatory");
  const plan=JSON.parse(fs.readFileSync(o["--plan"],"utf8"));
  const layoutPath=o["--layout"];
  requireTrue(layoutPath===path.join("projects/cwc/content/carousel",plan.content_id+".layout.json"),
    "LAYOUT_SOURCE_INVALID","only matching repository layout file permitted");
  const layout=JSON.parse(fs.readFileSync(layoutPath,"utf8"));
  const out=attachLayout(plan,layout,o["--expected-layout-fingerprint"]);
  fs.mkdirSync(path.dirname(o["--out"]),{recursive:true});
  fs.writeFileSync(o["--out"],JSON.stringify(out,null,2)+"\n");
  console.log("STRUCTURED_LAYOUT_CANDIDATE only; frozen approved copy remains unchanged.");
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{main();}catch(e){console.error(e.message);process.exitCode=1;}
}
