// November 2026 campaign caption furniture: separate from immutable COPY_APPROVED
// source and its fingerprint. This script NEVER publishes, approves, or schedules.
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { loadApprovedCopy } from "../automated-content-production/scripts/approved-copy-contract.mjs";
import { assembleCaption } from "../automated-content-production/scripts/model-generation-contract.mjs";
import { validateNovemberBinding } from "./verify-november-content.mjs";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const TITLE = "Transgender Awareness Month November 2026";
const TAGLINE = "To Honor and To Hold: Their Lives, Their Legacies";

function fail(message) { throw new Error("NOVEMBER_CAPTION_REJECTED: " + message); }

export function composeNovemberCaption(copy) {
  const signature = copy?.guardrails?.editorial?.caption_required_signature;
  const hashtags = copy?.guardrails?.editorial?.caption_required_hashtags;
  if (typeof signature !== "string" || !Array.isArray(hashtags) || !hashtags.length) {
    fail("Missing canonical SDOH caption signature or hashtags");
  }
  const body = copy.caption_body_paragraphs;
  if (!Array.isArray(body) || body.some(p => typeof p !== "string")) {
    fail("Invalid caption body");
  }
  if (body.some(p => p.includes(TITLE) || p.includes(TAGLINE))) {
    fail("Do not duplicate campaign footer inside approved caption body");
  }
  // Reuse the authoritative SDOH caption formatter; leave approved body intact.
  const baseline = assembleCaption(body, copy.guardrails.editorial);
  const suffix = "\n\n" + signature + "\n" + hashtags.join(" ");
  if (!baseline.endsWith(suffix)) fail("Unexpected baseline caption architecture");
  const updated = baseline.slice(0, -suffix.length)
    + "\n\n" + signature + "\n" + TITLE + "\n" + TAGLINE + "\n" + hashtags.join(" ");
  if (!updated.startsWith(body.join("\n\n"))) fail("Approved caption body was altered");
  return updated;
}

function arg(name) {
  const i = process.argv.indexOf(name);
  if (i < 0 || !process.argv[i + 1]) fail("Missing " + name);
  return process.argv[i + 1];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const contentId = arg("--content-id");
    const fingerprint = arg("--expected-copy-fingerprint");
    const targetDate = arg("--target-date");
    const out = path.resolve(arg("--out"));
    const provenanceOut = path.resolve(arg("--provenance-out"));
    if (!/^SDOH-(SAGE|BURGUNDY)-CAR-[0-9]{4}$/.test(contentId) ||
        !/^[0-9a-f]{64}$/.test(fingerprint) ||
        !/^2026-11-(0[8-9]|[12][0-9]|30)$/.test(targetDate)) fail("Invalid CLI input");
    const binding = JSON.parse(fs.readFileSync(path.join(ROOT,
      "projects/sdoh/runtime/seasonal-color/2026-11-content-binding.json"), "utf8"));
    const { copy } = loadApprovedCopy(contentId, { expectedCopyFingerprint: fingerprint });
    const approved = validateNovemberBinding(binding, copy, { contentId, fingerprint, targetDate });
    const caption = composeNovemberCaption(copy);
    // All checks are complete before writing review-only derivatives.
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.mkdirSync(path.dirname(provenanceOut), { recursive: true });
    fs.writeFileSync(out, caption + "\n", "utf8");
    const hash = createHash("sha256").update(caption + "\n").digest("hex");
    fs.writeFileSync(provenanceOut, JSON.stringify({
      schema: "sdoh-november-caption-review-v1",
      status: "REVIEW_ONLY_NOT_PUBLISHED",
      campaign: "Trans Awareness Month 2026",
      content_id: contentId, target_date: targetDate,
      theme: approved.theme, source_copy_fingerprint: fingerprint,
      approval_ref: approved.approval_ref,
      caption_sha256: hash,
      campaign_lines: [TITLE, TAGLINE],
      publication_authorized: false,
    }, null, 2) + "\n", "utf8");
    console.log("November caption review-only generated; source copy untouched: " + hash);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
