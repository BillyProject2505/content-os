import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { resolveProductionInput } from "./resolve-production-input.mjs";

const FPC = "27d17fda54a1d16c282d31626a6342464e102974e504ac6174f712b7b0215b60";
const FPL = "a159704d5880edf2952d906b612c268e8d2190471caa671b5ae8ceac5e4e1124";
const id4 = "CWC-CRSL-0004", id5 = "CWC-CRSL-0005";
const opts4 = { expectedCopyFingerprint: FPC, expectedLayoutFingerprint: FPL };
const base = "projects/cwc/content/carousel/";
const cli = "projects/cwc/runtime/approved-copy/resolve-production-input.mjs";

test("real 0004 has typed renderer input without release or publish authority", () => {
  const o = resolveProductionInput(id4, opts4);
  assert.equal(o.source_mode, "EDITABLE_RENDER_CANDIDATE");
  assert.equal(o.status, "RENDER_INPUT_VERIFIED_UNAPPROVED");
  assert.equal(o.renderer_input.schema, "cwc-carousel-render-plan-v1");
  assert.equal(o.renderer_input.typography_layout.slides.length, 5);
  assert.equal(o.approved_media, null);
  assert.equal(o.render_performed, false);
  assert.equal(o.publication_authorized, false);
});
test("real 0005 is kept as approved raster and never silently re-rendered", () => {
  const o = resolveProductionInput(id5);
  assert.equal(o.source_mode, "IMMUTABLE_APPROVED_RASTER");
  assert.equal(o.status, "HASH_RECORDS_CONSISTENT_NONPUBLISHABLE");
  assert.equal(o.renderer_input, null);
  assert.equal(o.approved_media.original_png_sha256_in_order.length, 5);
  assert.equal(o.approved_media.approved_jpeg_sha256_in_order.length, 5);
  assert.equal(o.raw_media_bytes_checked_in_this_call, false);
  assert.equal(o.publication_authorized, false);
  assert.equal(o.platform_schedule_verified, false);
  assert.equal(o.platform_publication_verified, false);
});
test("editable source refuses missing or incorrect independent input SHA", () => {
  assert.throws(() => resolveProductionInput(id4), /FINGERPRINT_REQUIRED/);
  assert.throws(() => resolveProductionInput(id4, { ...opts4, expectedLayoutFingerprint: "0".repeat(64) }), /LAYOUT_FINGERPRINT_MISMATCH/);
});
test("raster source refuses render-mode fingerprint injection", () => {
  assert.throws(() => resolveProductionInput(id5, opts4), /FINGERPRINT_MODE_INVALID/);
});
test("unregistered ID never derives an identifier or falls back to another source", () => {
  assert.throws(() => resolveProductionInput("../0005"), /CONTENT_ID_INVALID/);
  assert.throws(() => resolveProductionInput("CWC-CRSL-9999"), /SOURCE_MISSING/);
});
test("ambiguous or partially present source records fail closed", () => {
  assert.throws(() => resolveProductionInput(id5, {
    fileExists: p => fs.existsSync(p) || p === base + id5 + ".json"
  }), /SOURCE_AMBIGUOUS/);
  assert.throws(() => resolveProductionInput(id4, {
    fileExists: p => p === base + id4 + ".json"
  }), /SOURCE_INCOMPLETE/);
  assert.throws(() => resolveProductionInput(id5, {
    fileExists: p => p === base + id5 + ".stg05-content.json"
  }), /SOURCE_INCOMPLETE/);
});
test("tampered stage source never yields a ready handoff", () => {
  assert.throws(() => resolveProductionInput(id5, {
    loadJson: p => {
      const data = JSON.parse(fs.readFileSync(p, "utf8"));
      if (p.endsWith(".stg07-visual.json")) data.reviewed_source.slide_sha256_in_order[0] = "0".repeat(64);
      return data;
    }
  }), /STG-07 slide 1 hash mismatch/);
});
test("both CLI modes are pure JSON and do not create publication authority", () => {
  const a = spawnSync(process.execPath, [cli, "--content-id", id4,
    "--copy-fingerprint", FPC, "--layout-fingerprint", FPL], { encoding: "utf8" });
  assert.equal(a.status, 0, a.stderr);
  assert.equal(JSON.parse(a.stdout).publication_authorized, false);
  const b = spawnSync(process.execPath, [cli, "--content-id", id5], { encoding: "utf8" });
  assert.equal(b.status, 0, b.stderr);
  assert.equal(JSON.parse(b.stdout).renderer_input, null);
  assert.equal(JSON.parse(b.stdout).platform_publication_verified, false);
});
test("no implicit permission-bearing workflow is introduced", () => {
  const source = fs.readFileSync(cli, "utf8");
  assert.doesNotMatch(source, /graph\.facebook|secrets\.|CWC_META_ACCESS_TOKEN|fetch\(/);
  assert.equal(path.extname(cli), ".mjs");
});
