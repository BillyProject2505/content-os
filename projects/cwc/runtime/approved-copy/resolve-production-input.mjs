#!/usr/bin/env node
// CWC carousel production-source router. Local, read-only, and NON-PUBLISHABLE.
// Does not re-render approved media, create a release, or confirm remote schedule.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareReview } from "./prepare-review.mjs";
import { verifyStageHandoff } from "./verify-stage-handoff.mjs";

const ID = /^CWC-CRSL-[0-9]{4}$/;
const ROOT = "projects/cwc/content/carousel";
function reject(code, message) {
  const e = new Error(code + ": " + message);
  e.code = code;
  throw e;
}
function requireThat(ok, code, reason) { if (!ok) reject(code, reason); }

/** All sources are paths inside the versioned repository; no network operations. */
export function resolveProductionInput(contentId, {
  root = process.cwd(), fileExists, loadJson,
  expectedCopyFingerprint, expectedLayoutFingerprint
} = {}) {
  requireThat(ID.test(contentId), "CONTENT_ID_INVALID", "native CWC carousel Content ID required");
  const exists = fileExists ?? (p => fs.existsSync(path.join(root, p)));
  const load = loadJson ?? (p => JSON.parse(fs.readFileSync(path.join(root, p), "utf8")));
  const base = ROOT + "/" + contentId;
  const editableCopy = base + ".json";
  const editableLayout = base + ".layout.json";
  const stageCopy = base + ".stg05-content.json";
  const stageVisual = base + ".stg07-visual.json";
  const editableAny = exists(editableCopy) || exists(editableLayout);
  const stagedAny = exists(stageCopy) || exists(stageVisual);
  requireThat(!(editableAny && stagedAny), "SOURCE_AMBIGUOUS",
    "both editable and pre-rendered source records exist; no implicit precedence");
  requireThat(editableAny || stagedAny, "SOURCE_MISSING",
    "no registered local production input records for Content ID");

  if (editableAny) {
    requireThat(exists(editableCopy) && exists(editableLayout), "SOURCE_INCOMPLETE",
      "render candidate requires both frozen copy and independently reviewed typed layout");
    requireThat(typeof expectedCopyFingerprint === "string" &&
      /^[0-9a-f]{64}$/.test(expectedCopyFingerprint) &&
      typeof expectedLayoutFingerprint === "string" &&
      /^[0-9a-f]{64}$/.test(expectedLayoutFingerprint),
      "FINGERPRINT_REQUIRED", "two independent input fingerprints are mandatory");
    const prepared = prepareReview(load(editableCopy), load(editableLayout), {
      contentId, copyFingerprint: expectedCopyFingerprint,
      layoutFingerprint: expectedLayoutFingerprint
    });
    requireThat(prepared.typed.gates.publication_authorized === false &&
      prepared.typed.typography_layout.source_approval_verified === false,
      "AUTHORITY_ESCALATION", "renderer plan cannot authorize publishing or final approval");
    return {
      schema: "cwc-production-input-v1",
      content_id: contentId,
      source_mode: "EDITABLE_RENDER_CANDIDATE",
      status: "RENDER_INPUT_VERIFIED_UNAPPROVED",
      verification_scope: "REPOSITORY_COPY_LAYOUT_AND_RESEARCH_STRUCTURE_ONLY",
      source_files: [editableCopy, editableLayout,
        "projects/cwc/content/research/" + contentId + ".research.json"],
      copy_sha256: expectedCopyFingerprint,
      layout_sha256: expectedLayoutFingerprint,
      renderer_input: prepared.typed,
      approved_media: null,
      render_performed: false,
      clinical_claims_verified: false,
      technical_qa_verified: false,
      owner_final_visual_approval_verified: false,
      publication_authorized: false,
      platform_schedule_verified: false,
      platform_publication_verified: false
    };
  }

  requireThat(exists(stageCopy) && exists(stageVisual), "SOURCE_INCOMPLETE",
    "pre-rendered package requires both STG-05 and STG-07 records");
  requireThat(!expectedCopyFingerprint && !expectedLayoutFingerprint, "FINGERPRINT_MODE_INVALID",
    "editable-render fingerprints cannot be applied to immutable raster handoff");
  const result = verifyStageHandoff(contentId, { root, loadJson: load });
  return {
    schema: "cwc-production-input-v1",
    content_id: contentId,
    source_mode: "IMMUTABLE_APPROVED_RASTER",
    status: "HASH_RECORDS_CONSISTENT_NONPUBLISHABLE",
    verification_scope: "CROSS_STAGE_METADATA_AND_HASH_REFERENCES_ONLY",
    source_files: Object.values(result.source),
    copy_sha256: null,
    layout_sha256: null,
    renderer_input: null,
    approved_media: {
      release_identity: result.approved_release_identity,
      original_png_sha256_in_order: result.approved_png_sha256_in_order,
      approved_jpeg_sha256_in_order: result.approved_jpeg_sha256_in_order,
      caption_sha256: result.caption_sha256,
      source_archive_sha256: result.source_zip_sha256
    },
    render_performed: false,
    raw_media_bytes_checked_in_this_call: false,
    owner_final_visual_approval_verified: true,
    publication_authorized: false,
    platform_schedule_verified: false,
    platform_publication_verified: false
  };
}

function main(args) {
  const allowed = new Set(["--content-id", "--copy-fingerprint", "--layout-fingerprint"]);
  requireThat(args.length % 2 === 0, "ARGS_INVALID", "arguments must have values");
  const o = {};
  for (let i = 0; i < args.length; i += 2) {
    requireThat(allowed.has(args[i]) && args[i+1] && !Object.hasOwn(o, args[i]),
      "ARGS_INVALID", "unknown or repeated argument");
    o[args[i]] = args[i+1];
  }
  requireThat(Object.hasOwn(o, "--content-id"), "ARGS_INVALID", "Content ID required");
  const output = resolveProductionInput(o["--content-id"], {
    expectedCopyFingerprint: o["--copy-fingerprint"],
    expectedLayoutFingerprint: o["--layout-fingerprint"]
  });
  process.stdout.write(JSON.stringify(output, null, 2) + "\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (e) { process.stderr.write(e.message + "\n"); process.exitCode = 1; }
}
