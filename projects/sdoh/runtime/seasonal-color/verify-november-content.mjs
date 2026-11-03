// Fail-closed campaign binding: COPY_APPROVED alone does not make an October
// content item a November Trans Awareness Month item.
// This is read-only and cannot approve, schedule, or publish content.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ID = /^SDOH-(SAGE|BURGUNDY)-CAR-[0-9]{4}$/;
const SHA = /^[0-9a-f]{64}$/;
const DATE = /^2026-11-(0[1-9]|[12][0-9]|30)$/;
// Theme relevance must be visible in the approved editorial copy itself,
// not merely appended as a generic seasonal footer.
const TOPIC_ANCHOR = /\btransgender\b|\btransfobia\b|\btransphobia\b|\borang\s+trans\b|\bkomunitas\s+trans\b|\bidentitas\s+gender\b/i;
const root = path.resolve(fileURLToPath(new URL("../../../../", import.meta.url)));

function fail(message) { throw new Error("NOVEMBER_CAMPAIGN_BINDING_REJECTED: " + message); }
function requireThat(condition, message) { if (!condition) fail(message); }

export function validateNovemberBinding(binding, copy, { contentId, fingerprint, targetDate }) {
  requireThat(binding?.schema === "sdoh-november-campaign-binding-v1", "Unknown binding schema");
  requireThat(binding?.campaign === "Trans Awareness Month 2026", "Incorrect campaign");
  requireThat(Array.isArray(binding?.items), "Binding items must be an array");
  requireThat(ID.test(contentId) && SHA.test(fingerprint) && DATE.test(targetDate), "Invalid target");
  requireThat(copy?.status === "COPY_APPROVED", "Copy is not approved");
  requireThat(copy.content_id === contentId && copy.copy_fingerprint === fingerprint, "Copy fingerprint/ID mismatch");
  const editorialText = [...(copy.slides ?? []).map(s => s?.copy ?? ""), ...(copy.caption_body_paragraphs ?? [])].join(" ");
  requireThat(TOPIC_ANCHOR.test(editorialText), "Approved content must explicitly address transgender awareness before adding campaign footer");
  const hits = binding.items.filter(x => x?.content_id === contentId);
  requireThat(hits.length === 1, "Content must have one explicit November campaign approval binding");
  const item = hits[0];
  requireThat(Object.keys(item).sort().join(",") ===
    "approval_ref,content_id,copy_fingerprint,target_date,theme", "Unrecognized binding fields");
  requireThat(item.copy_fingerprint === fingerprint &&
    item.theme === copy.theme && item.theme === contentId.match(ID)[1],
    "Campaign theme/fingerprint mismatch");
  requireThat(item.target_date === targetDate, "Target date not independently approved");
  requireThat(typeof item.approval_ref === "string" &&
    /^https:\/\/(github\.com|linear\.app)\/\S+$/.test(item.approval_ref),
    "Missing campaign-specific editorial approval evidence");
  requireThat(binding.state === "NOVEMBER_CAMPAIGN_COPY_APPROVED",
    "Campaign binder is not active for approved copy");
  return {
    content_id: contentId, theme: item.theme, target_date: targetDate,
    fingerprint, approval_ref: item.approval_ref, publication_authorized: false
  };
}

function arg(name) {
  const pos = process.argv.indexOf(name);
  if (pos < 0 || !process.argv[pos + 1]) fail("Missing " + name);
  return process.argv[pos + 1];
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const id = arg("--content-id");
    const fingerprint = arg("--expected-copy-fingerprint");
    const targetDate = arg("--target-date");
    requireThat(ID.test(id) && SHA.test(fingerprint) && DATE.test(targetDate), "Invalid request before file access");
    const binder = JSON.parse(fs.readFileSync(
      path.join(root, "projects/sdoh/runtime/seasonal-color/2026-11-content-binding.json"), "utf8"));
    const theme = id.includes("-BURGUNDY-") ? "burgundy" : "sage";
    const copy = JSON.parse(fs.readFileSync(
      path.join(root, "projects/sdoh/content", theme, "carousel", id + ".json"), "utf8"));
    const result = validateNovemberBinding(binder, copy, { contentId: id, fingerprint, targetDate });
    console.log("November campaign binding PASS: " + JSON.stringify(result));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
