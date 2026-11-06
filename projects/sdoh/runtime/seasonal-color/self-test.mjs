// Dormant color-only seasonal contract test; never activates rendering.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const file = new URL("./2026-11-trans-awareness.json", import.meta.url);
const contract = JSON.parse(readFileSync(file, "utf8"));
const dateAmendment = JSON.parse(readFileSync(new URL("./2026-11-start-date-amendment.json", import.meta.url), "utf8"));
const logoManifest = JSON.parse(readFileSync(new URL("./2026-11-logo-derivatives.json", import.meta.url), "utf8"));
const EXACT_TOKENS = {
  SAGE: {
    surface: "#C5E4F0",
    text_fill: "#355E78",
    character_fill: "#355E78",
    logo_fill: "#355E78",
    stroke: "#355E78",
  },
  BURGUNDY: {
    surface: "#F5C9DA",
    text_fill: "#793E61",
    character_fill: "#793E61",
    logo_fill: "#793E61",
    stroke: "#793E61",
  },
};
const PRESERVE = [
  "canonical_character_asset_identity",
  "canonical_pose_route",
  "character_geometry_and_alpha",
  "Caveat_Medium_identity_and_metrics",
  "layout_and_safe_areas",
  "logo_geometry_and_placement",
  "production_and_owner_approval_gates",
];

function exactKeys(object, allowed) {
  assert.ok(object && typeof object === "object" && !Array.isArray(object));
  assert.deepEqual(Object.keys(object).sort(), [...allowed].sort());
}

function validate(value) {
  exactKeys(value, ["schema", "campaign", "status", "period", "tokens", "preserve", "activation"]);
  assert.equal(value.schema, "sdoh-seasonal-color-only-v1");
  assert.equal(value.campaign, "Trans Awareness Month");
  assert.equal(value.status, "OWNER_VISUAL_APPROVED_PRODUCTION_INACTIVE");
  exactKeys(value.period, ["start", "end", "timezone"]);
  assert.equal(value.period.start, "2026-11-08");
  assert.equal(value.period.end, "2026-11-30");
  assert.equal(value.period.timezone, "Asia/Makassar");
  exactKeys(value.tokens, ["SAGE", "BURGUNDY"]);
  for (const theme of ["SAGE", "BURGUNDY"]) {
    exactKeys(value.tokens[theme], ["surface", "text_fill", "character_fill", "logo_fill", "stroke"]);
    assert.deepEqual(value.tokens[theme], EXACT_TOKENS[theme]);
  }
  assert.deepEqual(value.preserve, PRESERVE);
  exactKeys(value.activation, [
    "enabled",
    "requires_canonical_source_compatible_render",
    "requires_visual_contrast_qa",
    "requires_owner_visual_approval",
  ]);
  assert.equal(value.activation.enabled, false, "Seasonal palette must not auto-activate");
  assert.equal(value.activation.requires_canonical_source_compatible_render, true);
  assert.equal(value.activation.requires_visual_contrast_qa, true);
  assert.equal(value.activation.requires_owner_visual_approval, true);
}

validate(contract);
assert.equal(dateAmendment.schema, "sdoh-seasonal-effective-date-amendment-v1");
assert.equal(dateAmendment.approval_state, "OWNER_APPROVED_SCHEDULE_CHANGE_ONLY_PRODUCTION_INACTIVE");
assert.equal(dateAmendment.original_effective_period.start, "2026-11-01");
assert.deepEqual(dateAmendment.amended_effective_period, contract.period);
assert.deepEqual(logoManifest.period, contract.period);
assert.equal(contract.activation.enabled, false);

const clone = (v) => structuredClone(v);
const unapproved = clone(contract);
unapproved.activation.enabled = true;
assert.throws(() => validate(unapproved), /auto-activate/);
const geometryDrift = clone(contract);
geometryDrift.tokens.SAGE.font_size = 42;
assert.throws(() => validate(geometryDrift));
const unexpectedColor = clone(contract);
unexpectedColor.tokens.BURGUNDY.stroke = "#000000";
assert.throws(() => validate(unexpectedColor));
const outOfWindow = clone(contract);
outOfWindow.period.end = "2026-12-01";
assert.throws(() => validate(outOfWindow));

console.log("PASS: seasonal color-only token contract, preserved-identity scope, inactive gate, and negative cases");
console.log("NOT RENDER ACTIVE: requires BUS-49-compatible recolor path, contrast QA, and Owner Visual Approval");
