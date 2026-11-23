#!/usr/bin/env node
// Read-only CWC release handoff verifier. No provider calls, approvals, or state writes.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHA = /^[a-f0-9]{64}$/;
const ID = /^CWC-CRSL-[0-9]{4}$/;

function fail(message) { throw new Error("CWC_HANDOFF_FAIL: " + message); }
function check(condition, message) { if (!condition) fail(message); }
function sameHash(actual, expected, label) {
  check(typeof actual === "string" && SHA.test(actual) && actual === expected, label + " hash mismatch");
}
function orderedHashes(records, hashKey, sequenceKey, expectedCount, label) {
  check(Array.isArray(records) && records.length === expectedCount, label + " count mismatch");
  return records.map((item, i) => {
    check(item[sequenceKey] === i + 1, label + " order mismatch at " + (i + 1));
    check(typeof item[hashKey] === "string" && SHA.test(item[hashKey]), label + " invalid hash at " + (i + 1));
    return item[hashKey];
  });
}
function canonicalSort(value) {
  if (Array.isArray(value)) return value.map(canonicalSort);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalSort(value[key])]));
  }
  return value;
}
function canonicalSha(value) {
  return createHash("sha256").update(JSON.stringify(canonicalSort(value)) + "\n", "utf8").digest("hex");
}

/**
 * Verifies immutable, stage-scoped records and yields a normalized read-only
 * handoff. It intentionally does NOT turn an Owner-reported schedule into a
 * confirmed platform event or authorize a publisher.
 */
export function verifyStageHandoff(contentId, { root = process.cwd(), loadJson } = {}) {
  check(ID.test(contentId), "invalid or unregistered Content ID syntax");
  const load = loadJson ?? (relative => JSON.parse(readFileSync(path.join(root, relative), "utf8")));
  const car = "projects/cwc/content/carousel/" + contentId;
  const qaPath = "projects/cwc/content/qa/" + contentId + ".stg08-qa.json";
  const approvalPath = "projects/cwc/content/approval/" + contentId + ".stg09-approval.json";
  const jpegPath = "projects/cwc/content/approval/" + contentId + ".jpeg-delivery-approval.json";
  const releasePath = "projects/cwc/content/release/" + contentId + ".stg10-release-preparation.json";
  const content = load(car + ".stg05-content.json");
  const visual = load(car + ".stg07-visual.json");
  const qa = load(qaPath);
  const approval = load(approvalPath);
  const delivery = load(jpegPath);
  const release = load(releasePath);

  check(content.content_id === contentId && visual.content_id === contentId, "STG-05/07 identity mismatch");
  check(qa.content_item_id === contentId && approval.content_item_id === contentId, "QA/approval identity mismatch");
  check(delivery.content_id === contentId && release.content_id === contentId, "delivery/release identity mismatch");
  check(content.status === "STG05_OUTPUT_CONTRACT_PASS", "STG-05 not complete");
  check(visual.status === "STG07_OUTPUT_CONTRACT_PASS__READY_FOR_QA", "STG-07 not complete");
  check(qa.verdict === "PASS", "STG-08 QA not PASS");
  check(approval.decision === "APPROVED", "STG-09 not approved");
  check(release.current_lifecycle_state === "APPROVED", "release lifecycle is not APPROVED");
  check(release.current_exception_status === "NONE", "release has a blocking exception");
  const n = approval.approved_package?.slide_count;
  check(Number.isInteger(n) && n > 0 && n <= 10, "invalid slide count");
  check(content.content_draft?.slide_count === n, "STG-05 slide count mismatch");
  check(visual.reviewed_source?.slide_count === n, "STG-07 slide count mismatch");
  const approved = orderedHashes(approval.approved_package.slides, "sha256", "sequence", n, "STG-09 slides");
  check(content.copy_source?.approved_png_sha256_in_order?.length === n, "STG-05 slides missing");
  check(visual.reviewed_source?.slide_sha256_in_order?.length === n, "STG-07 slides missing");
  check(release.approval_crosscheck?.approved_ordered_slide_sha256?.length === n, "release slides missing");
  const approvedRelease = release.release_identity_candidate;
  const canonical = approvedRelease?.canonical_input;
  check(canonical?.content_id === contentId, "release canonical identity mismatch");
  const releaseHashes = orderedHashes(canonical.ordered_media, "sha256", "sequence", n, "release slides");
  approved.forEach((hash, i) => {
    sameHash(content.copy_source.approved_png_sha256_in_order[i], hash, "STG-05 slide " + (i + 1));
    sameHash(visual.reviewed_source.slide_sha256_in_order[i], hash, "STG-07 slide " + (i + 1));
    sameHash(release.approval_crosscheck.approved_ordered_slide_sha256[i], hash, "STG-10 slide " + (i + 1));
    sameHash(releaseHashes[i], hash, "release identity slide " + (i + 1));
  });
  const approvedCaption = approval.approved_package?.caption_sha256;
  check(SHA.test(approvedCaption || ""), "approved caption hash missing");
  sameHash(content.copy_source.caption_sha256, approvedCaption, "STG-05 caption");
  sameHash(visual.reviewed_source.caption_sha256, approvedCaption, "STG-07 caption");
  sameHash(release.approval_crosscheck.approved_caption_sha256, approvedCaption, "STG-10 caption");
  sameHash(canonical.caption?.sha256, approvedCaption, "release identity caption");
  sameHash(delivery.approved_caption_sha256, approvedCaption, "JPEG caption");
  const sourceZipHash = approval.approved_package.original_zip_sha256;
  sameHash(visual.reviewed_source.zip_sha256, sourceZipHash, "STG-07 source archive");
  sameHash(release.approval_crosscheck.approved_source_sha256, sourceZipHash, "STG-10 source archive");
  sameHash(delivery.source_png_zip_sha256, sourceZipHash, "JPEG source archive");
  check(approvedRelease.value === "sha256:" + canonicalSha(canonical), "release identity digest mismatch");
  check(delivery.source_approved_release_identity === approvedRelease.value, "JPEG release identity mismatch");
  check(delivery.candidate_owner_approved === true, "JPEG delivery not Owner-approved");
  const jpegHashes = orderedHashes(delivery.files, "sha256", "order", n, "JPEG delivery");
  delivery.files.forEach((item, i) => {
    sameHash(item.source_png_sha256, approved[i], "JPEG source slide " + (i + 1));
    check(item.delivery_binary_owner_approved === true, "JPEG not approved at index " + (i + 1));
  });

  return {
    schema: "cwc-release-handoff-readonly-v1",
    content_id: contentId,
    result: "PASS_READ_ONLY",
    source: { stg05: car + ".stg05-content.json", stg07: car + ".stg07-visual.json",
      qa: qaPath, stg09: approvalPath, jpeg_approval: jpegPath, release: releasePath },
    approved_release_identity: approvedRelease.value,
    approved_png_sha256_in_order: approved,
    approved_jpeg_sha256_in_order: jpegHashes,
    caption_sha256: approvedCaption,
    source_zip_sha256: sourceZipHash,
    qa_verdict: "PASS",
    human_approval: "APPROVED",
    publication_authorization_verified: false,
    platform_schedule_verified: false,
    platform_publication_verified: false,
    writeback_performed: false
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(JSON.stringify(verifyStageHandoff(process.argv[2]), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
