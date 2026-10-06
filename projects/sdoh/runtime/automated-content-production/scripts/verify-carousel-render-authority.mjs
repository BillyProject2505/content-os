import fs from "node:fs";

const authority=JSON.parse(
  fs.readFileSync(
    "projects/sdoh/runtime/automated-content-production/render-runtime/carousel-v060-authority.json",
    "utf8"
  )
);
const registry=fs.readFileSync(
  "projects/sdoh/DIUA-DIC-000011_SDOH-Asset-Registry.md",
  "utf8"
);

function assert(ok,message){ if(!ok) throw new Error(message); }

function requireRegistryRecord(label, id, sha) {
  assert(registry.includes(`\`${id}\``), `${label} Drive ID missing from canonical Asset Registry`);
  assert(registry.includes(`\`${sha}\``), `${label} SHA-256 missing from canonical Asset Registry`);
}

requireRegistryRecord("Caveat Medium",authority.font.drive_file_id,authority.font.sha256);
for(const [pose,rec] of Object.entries(authority.poses)){
  requireRegistryRecord(pose,rec.drive_file_id,rec.sha256);
}

const p=authority.sage_default_visual_plan;
assert(
  JSON.stringify(p.pose_route)===JSON.stringify(["P02","P03","P05","P06","P07"]),
  "Sage default pose route drift"
);
assert(p.anchor==="lower_right","Sage anchor drift");
assert(p.scale==="md","Sage character scale drift");
assert(p.ground_mode==="embedded","Sage ground mode drift");
assert(p.layout_mode==="illustrated_single_character","Sage layout mode drift");

const b=authority.content_visual_plans?.["SDOH-BURGUNDY-CAR-0007"];
assert(b && typeof b==="object","Burgundy 0007 visual plan missing");
assert(
  JSON.stringify(b.pose_route)===JSON.stringify(["P03","P04","P08","P02","P01"]),
  "Burgundy 0007 pose route drift"
);
assert(b.anchor==="lower_right","Burgundy 0007 anchor drift");
assert(b.scale==="md","Burgundy 0007 character scale drift");
assert(b.ground_mode==="embedded","Burgundy 0007 ground mode drift");
assert(b.layout_mode==="illustrated_single_character","Burgundy 0007 layout mode drift");

for (const [contentId, plan] of Object.entries(authority.content_visual_plans ?? {})) {
  assert(plan && typeof plan === "object", `${contentId} visual plan invalid`);
  assert(plan.layout_mode === "illustrated_single_character", `${contentId} layout mode invalid`);
  assert(["lower_right", "lower_center"].includes(plan.anchor), `${contentId} anchor invalid`);
  assert(["md", "lg"].includes(plan.scale), `${contentId} scale invalid`);
  assert(plan.ground_mode === "embedded", `${contentId} ground mode invalid`);
  assert(Array.isArray(plan.pose_route) && plan.pose_route.length === 5, `${contentId} pose route invalid`);
  for (const pose of plan.pose_route) {
    assert(authority.poses[pose], `${contentId} references unknown pose ${pose}`);
  }
  if (plan.wrap_mode !== undefined) {
    assert(plan.wrap_mode === "balanced_3", `${contentId} wrap mode invalid`);
  }
}

assert(authority.renderer.version==="0.6.0","Renderer version drift");
assert(
  authority.renderer.sha256==="7bc6ffd0acf56b487e2eb88e55127d383e3e9b1709921f9af16a0e04519afb9f",
  "BUS-49 renderer SHA drift"
);

console.log("SDOH carousel render runtime authority self-test PASS");
