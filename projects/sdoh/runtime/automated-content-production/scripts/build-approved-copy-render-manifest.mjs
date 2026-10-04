// BUS-160 Production Path entry point (render side).
//
//   discover approved copy -> validate contract -> verify COPY_APPROVED
//   -> integrity (file fingerprint + pinned fingerprint)
//   -> Semantic Alignment gate -> Editorial Quality gate
//   -> deterministic visual plan -> BUS-49 render manifest
//
// Needs no model, provider, credential or network. Any failure exits non-zero
// BEFORE a manifest or snapshot is written (FAIL CLOSED -> return to editorial
// review). Approved copy is never rewritten, shortened, expanded or regenerated.
import fs from "node:fs";
import path from "node:path";
import {
  APPROVED_COPY_DIR,
  assertManifestMatchesCopy,
  loadApprovedCopy,
  runApprovedCopyGates,
} from "./approved-copy-contract.mjs";
import { buildSageRenderManifest } from "./carousel-manifest.mjs";

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0 || !process.argv[i + 1]) throw new Error(`Missing ${name}`);
  return process.argv[i + 1];
}
function optionalArg(name) {
  const i = process.argv.indexOf(name);
  return i < 0 ? null : (process.argv[i + 1] ?? null);
}

try {
  const contentId = arg("--content-id");
  const copyDir = path.resolve(optionalArg("--copy-dir") ?? APPROVED_COPY_DIR);
  const authorityPath = path.resolve(arg("--authority"));
  const outPath = path.resolve(arg("--out"));
  const snapshotPath = path.resolve(arg("--snapshot-out"));
  const expectedCopyFingerprint = arg("--expected-copy-fingerprint");
  if (!/^[0-9a-f]{64}$/.test(expectedCopyFingerprint)) {
    throw new Error("--expected-copy-fingerprint must be 64 lowercase hex characters");
  }

  const { file, copy } = loadApprovedCopy(contentId, { dir: copyDir, expectedCopyFingerprint });
  const gates = runApprovedCopyGates(copy);

  const authority = JSON.parse(fs.readFileSync(authorityPath, "utf8"));
  const manifest = buildSageRenderManifest({ contentId: copy.content_id, slides: copy.slides, authority });
  assertManifestMatchesCopy(manifest, copy);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
  // The snapshot is the exact validated copy for this run; every later step
  // (Technical QA, review package) works from it, never from a re-read.
  fs.writeFileSync(snapshotPath, JSON.stringify(copy, null, 2) + "\n");
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");

  console.log(`content_id=${copy.content_id}`);
  console.log(`copy_file=${path.relative(process.cwd(), file)}`);
  console.log("copy_status=COPY_APPROVED");
  console.log(`copy_fingerprint=${copy.copy_fingerprint}`);
  console.log(`semantic_gate=PASS hits=${gates.semantic.hit_count}/${gates.semantic.required_group_count}`);
  console.log(`editorial_gate=PASS total_words=${gates.editorial.metrics.total_slide_words}`);
  console.log(`pose_route=${authority.sage_default_visual_plan.pose_route.join("->")}`);
  console.log("render_manifest_state=UNAPPROVED");
} catch (error) {
  const code = error?.code ?? "ERROR";
  console.error(`APPROVED_COPY_REJECTED code=${code}: ${error.message}`);
  console.error("FAIL CLOSED: no render manifest was produced. Return the copy to editorial review; it is never auto-rewritten.");
  process.exit(1);
}
