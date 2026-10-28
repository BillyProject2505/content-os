// BUS-170 Phase B1: deterministic CWC Carousel render PLAN only.
// Not a renderer, asset fetcher, clinical checker, approval, or publication tool.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateCopy } from "./preflight.mjs";

export const FORMAT_AUTHORITY = Object.freeze({
  doc_id: "DIUA-DIC-000029",
  version: "1.4",
  source: "projects/cwc/DIUA-DIC-000029_CWC-FORMAT-CAROUSEL.md",
  width: 1080,
  height: 1350,
});
const PILOT_PROVENANCE = Object.freeze({
  presenter_inventory: "BUS-94",
  logo_footer: "DIUA-DIC-000016@1.24",
  asset_registry: "DIUA-DIC-000014@1.18",
});

// Reusable production derivatives only. Snapshot of current BUS-94, NOT a
// replacement authority. Validate against fresh register/Drive on use.
export const PRESENTER_VARIANTS = Object.freeze({
  WHITE_POINT_LEFT: Object.freeze({
    id: "1Vlh1cORMn5jMBQFmkXh5d9faYYuJaDjF",
    sha256: "e0fbb96e5261b7849420df7db8359d9b80d7f1184f32c1cbfce0ceaccc50cf80",
    width: 1122, height: 1402, "pose": "POINT_LEFT", "wardrobe": "WHITE_JACKET",
  }),
  BLUE_OPEN_PALM: Object.freeze({
    id: "1ik0nB3ajvhCmu0e5YLl4O9evtnWle6fM",
    sha256: "464ea5391aa5a34bba007f8af7fea13a4c481ee95d7993996db86c2557de3ec3",
    width: 1123, height: 1401, "pose": "OPEN_PALM", "wardrobe": "BLUE_JACKET",
  }),
  W03_WHITE_POLO: Object.freeze({
    id: "1Rdsjsvl6wrHemJwvMcGhAW9y3xMWk44K",
    sha256: "0893bc7f0ebb2a68f11f00aa99c034ac1f34274853e454717d2c0d8174329e0e",
    width: 2390, height: 2986, "pose": "CONTEXTUAL", "wardrobe": "WHITE_POLO_BLUE_TRIM",
  }),
  W04_BLUE_HOODIE: Object.freeze({
    id: "12rH71MfzyUOOD08cEq4wtJe-L2QYSUMt",
    sha256: "d3969559bd1c26cd9055fd3a4cd29e0b98604f4bf1cd7b705e6b049d76fcdb68",
    width: 1122, height: 1402, "pose": "CONTEXTUAL", "wardrobe": "BLUE_HOODIE",
  }),
  W05_YELLOW_JACKET: Object.freeze({
    id: "1PEUlWK6jaigQ-5foXAnmHicgaxb8nJhE",
    sha256: "29c8547d0f1ff8d5749c09a5069bea21baa845ffdd04b85a37434c84bb651342",
    width: 1122, height: 1402, "pose": "CONTEXTUAL", "wardrobe": "YELLOW_JACKET",
  }),
});

export const FIXED_ASSETS = Object.freeze({
  BLUE_DARK: Object.freeze({
    logo: {drive_id:"1If3wZTeAs-HrRHn982H1J6-qPwpt28bC",file:"CWC_Master.svg"},
    footer: {drive_id:"1KHhReT_dIUR0d33Lm7mfDr2Ct_2LDYPm",file:"CWC-CRS-AS-004_Footer-White_CANONICAL.svg"},
  }),
  LIGHT_WHITE: Object.freeze({
    logo: {drive_id:"1oJu7EHnPtDnVRJDSmDMwuN4R7B8Kc3Q5",file:"CWC_AS001_Surface-Light_Keyline_CANONICAL.svg"},
    footer: {drive_id:"1FgHs44NI7rgrtZIl7PE-W0daNiKHUmvB",file:"CWC-CRS-AS-004_Footer-Blue_CANONICAL.svg"},
  }),
});

function check(ok, code, reason) {
  if (!ok) {const e = new Error(code + ": " + reason);e.code=code;throw e;}
}
function integer(n){return Number.isInteger(n);}
function validRect(r) {
  return r && integer(r.x) && integer(r.y) && integer(r.width) && integer(r.height) &&
    r.x >= 0 && r.y >= 0 && r.width > 0 && r.height > 0 &&
    r.x+r.width <= FORMAT_AUTHORITY.width && r.y+r.height <= FORMAT_AUTHORITY.height;
}
function overlaps(a,b){return a.x < b.x+b.width && b.x < a.x+a.width &&
  a.y < b.y+b.height && b.y < a.y+a.height;}
function verifyFormatSource(filePath=FORMAT_AUTHORITY.source) {
  const body=fs.readFileSync(filePath,"utf8");
  const fm=body.match(/^---\s*\n([\s\S]*?)\n---/);
  check(Boolean(fm), "AUTHORITY_MISSING", "canonical format YAML front matter missing");
  const version=fm?.[1]?.match(/^version:\s*["']?([\d.]+)/m)?.[1];
  const identifier=fm?.[1]?.match(/^universal_identifier:\s*["']?([A-Z0-9-]+)/m)?.[1];
  check(version===FORMAT_AUTHORITY.version && identifier===FORMAT_AUTHORITY.doc_id,
    "AUTHORITY_DRIFT", "format version/identity changed, require renewed layout review");
}
export function buildCarouselRenderPlan(copy, {
  expectedFingerprint, surface, presenterVariant, coverCopyRect, presenterBodyRect,
  gestureRect=null, authorityFile,
}={}) {
  if(authorityFile) verifyFormatSource(authorityFile);
  validateCopy(copy,{contentId:copy?.content_id,expectedFingerprint});
  const checked=copy; // validateCopy returns evidence, not the normalized input.
  check(Object.hasOwn(FIXED_ASSETS,surface),"SURFACE_INVALID","only currently mapped CWC surface treatments accepted");
  check(Object.hasOwn(PRESENTER_VARIANTS,presenterVariant),"PRESENTER_INVALID","must select reusable BUS-94 derivative");
  const variant=PRESENTER_VARIANTS[presenterVariant];
  check(validRect(coverCopyRect),"COPY_RECT_INVALID","cover copy rectangle must fit canvas");
  check(coverCopyRect.x===72 && coverCopyRect.x+coverCopyRect.width<=551,
    "COPY_ZONE_INVALID","cover copy requires x=72 and right edge <=551");
  check(validRect(presenterBodyRect),"PRESENTER_RECT_INVALID","presenter rectangle must fit canvas");
  check(presenterBodyRect.x>=670 && presenterBodyRect.x+presenterBodyRect.width<=1015,
    "PRESENTER_ZONE_INVALID","core presenter rectangle must stay within x=670..1015");
  check(!overlaps(coverCopyRect,presenterBodyRect),"PRESENTER_COPY_COLLISION","copy/presenter must not overlap");
  if (gestureRect!==null) {
    check(validRect(gestureRect),"GESTURE_RECT_INVALID","gesture rectangle must fit canvas");
    check(gestureRect.x>=572 && gestureRect.x+gestureRect.width<=594,
      "GESTURE_ZONE_INVALID","gesture can enter x=572..594 only");
    check(!overlaps(coverCopyRect,gestureRect),"GESTURE_COPY_COLLISION","gesture cannot obscure copy");
  }
  // Avoid pretending to assert exact silhouette collision / visual layout / readability.
  // Rendering will need pixel/typographic QA (including reserved logo/footer regions).
  return {
    schema:"cwc-carousel-render-plan-v1",
    content_id:checked.content_id,
    source_copy_sha256:checked.copy_fingerprint,
    status:"RENDER_PLAN_CANDIDATE",
    authority:{...FORMAT_AUTHORITY, ...PILOT_PROVENANCE},
    canvas:{width:FORMAT_AUTHORITY.width,height:FORMAT_AUTHORITY.height,unit:"px"},
    composition:{
      slide_1:{
        copy_box:coverCopyRect,
        presenter_core_box:presenterBodyRect,
        gesture_box:gestureRect,
        protected_gutter:{x:551,y:0,width:54,height:FORMAT_AUTHORITY.height},
        presenter_variant:presenterVariant,
      },
      later_slides: "NO_PRESENTER_REQUIREMENT_FROM_FORMAT_V1_4",
    },
    asset_refs:{
      logo:{...FIXED_ASSETS[surface].logo,role:"AS-001"},
      footer:{...FIXED_ASSETS[surface].footer,role:"AS-004"},
      presenter:{drive_id:variant.id,expected_sha256:variant.sha256,
        expected_dimensions:{width:variant.width,height:variant.height},
        pose:variant.pose,wardrobe:variant.wardrobe,role:"AS-002"},
    },
    slides:checked.slides.map((s)=>({slide:s.slide,copy:s.text})),
    caption:checked.caption,
    claims_need_human_review:checked.sensitive_claim,
    gates:{
      json_contract_passed:true,
      geometry_metadata_preflight_passed:true,
      live_register_authority_verified:false,
      current_asset_authority_readback_verified:false,
      asset_bytes_sha256_verified:false,
      clinical_source_truth_verified:false,
      typography_overflow_verified:false,
      visual_collision_and_identity_qa_passed:false,
      owner_final_visual_approval_granted:false,
      approved_release_identity_issued:false,
      publication_authorized:false,
    },
  };
}
function argsFromCli(argv) {
  const keys=["--content-id","--expected-copy-fingerprint","--surface","--presenter-variant",
    "--copy-box","--presenter-box","--gesture-box","--out"];
  const o={};
  for(let i=0;i<argv.length;i+=2){
    check(keys.includes(argv[i]) && argv[i+1] && !Object.hasOwn(o,argv[i]),
      "ARGS_INVALID","invalid or repeated CLI argument");
    o[argv[i]]=argv[i+1];
  }
  for(const k of ["--content-id","--expected-copy-fingerprint","--surface","--presenter-variant",
  "--copy-box","--presenter-box","--out"]) check(o[k],"ARGS_INVALID","missing "+k);
  return o;
}
function parseRect(text) {
  try{
    const a=JSON.parse(text);
    check(a && Object.keys(a).sort().join(",")==="height,width,x,y","RECT_FORMAT_INVALID","rectangle requires x,y,width,height");
    return a;
  }catch(e){if(e.code)throw e;check(false,"RECT_FORMAT_INVALID","invalid rectangle JSON");}
}
function main() {
  const o=argsFromCli(process.argv.slice(2));
  const id=o["--content-id"];
  check(/^CWC-CRSL-[0-9]{4}$/.test(id),"CONTENT_ID_INVALID","requires CWC Carousel ID");
  // No external writes. An allocated ID must also have an existing approved copy in git.
  const source=path.join("projects/cwc/content/carousel",id+".json");
  check(fs.existsSync(source),"COPY_NOT_FOUND","approved copy file not present; nothing to render");
  const copy=JSON.parse(fs.readFileSync(source,"utf8"));
  check(copy.content_id===id,"CONTENT_ID_MISMATCH","source file Content ID differs from dispatched ID");
  verifyFormatSource();
  const plan=buildCarouselRenderPlan(copy,{
    expectedFingerprint:o["--expected-copy-fingerprint"],
    surface:o["--surface"],
    presenterVariant:o["--presenter-variant"],
    coverCopyRect:parseRect(o["--copy-box"]),
    presenterBodyRect:parseRect(o["--presenter-box"]),
    gestureRect:o["--gesture-box"]?parseRect(o["--gesture-box"]):null,
  });
  fs.mkdirSync(path.dirname(o["--out"]),{recursive:true});
  fs.writeFileSync(o["--out"],JSON.stringify(plan,null,2)+"\n");
  process.stdout.write("RENDER_PLAN_CANDIDATE only; no assets fetched, no render or approval.\n");
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try{main();}catch(e){process.stderr.write(String(e.message)+"\n");process.exitCode=1;}
}
