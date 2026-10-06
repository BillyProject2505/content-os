// BUS-137 / BUS-140 Phase 4 — Linear writeback round-trip probe.
//
// Proves the production writeback mutation path end to end
//   runtime PUBLISHED evidence -> plan (DRY_RUN_UPDATE_READY)
//   -> documentUpdate (WRITEBACK_APPLIED) -> fresh re-read (ALREADY_SYNCED)
// using an EXISTING, already-published job, WITHOUT touching the canonical
// register and WITHOUT any Meta / Instagram / Drive call.
//
// How:
// 1. Read the real runtime status (must be a terminal PUBLISHED job with
//    verified remote media) and the real canonical register (read-only).
// 2. Require the canonical register to already be ALREADY_SYNCED for that job.
// 3. Create a clearly-labelled, non-authoritative probe document whose content
//    is the canonical register with only that one Log publikasi row reset to
//    its pre-writeback SCHEDULED shape.
// 4. Run the exact production planner + replacePublicationRow +
//    updateLinearDocument against the probe document, then re-read it.
//
// The canonical register is never written. The probe document id is printed
// so it can be inspected and archived afterwards.

import { createHash } from "node:crypto";
import {
  buildPlanFingerprint,
  findPublicationRows,
  planWriteback,
  resolveWritebackRegisterDocumentId,
  validateRuntimeStatus,
} from "./publication-evidence-writeback.mjs";
import {
  fetchLinearDocument,
  linearRequest,
  replacePublicationRow,
  updateLinearDocument,
} from "./publication-evidence-writeback-controlled.mjs";

const PROBE_TITLE_PREFIX = "SDOH WRITEBACK PROBE (non-authoritative)";

function sha256Text(value) {
  return createHash("sha256").update(String(value ?? "")).digest("hex");
}

export function buildPreWritebackRow(row) {
  const cells = [...row.cells];
  cells[3] = "**SCHEDULED**";
  cells[4] = "Probe: pre-writeback state reconstructed for BUS-137 round-trip proof.";
  cells[5] = "—";
  cells[6] = "—";
  cells[7] = "Probe document only; canonical register unchanged.";
  return `| ${cells.join(" | ")} |`;
}

export function buildProbeContent(canonicalContent, contentId) {
  const { rows } = findPublicationRows(canonicalContent, contentId);
  if (rows.length !== 1) throw new Error("PROBE_SOURCE_ROW_NOT_UNIQUE");
  const preRow = buildPreWritebackRow(rows[0]);
  const lines = String(canonicalContent).replace(/\r\n/g, "\n").split("\n");
  lines[rows[0].line_index] = preRow;
  const banner =
    `> ${PROBE_TITLE_PREFIX}. Copy of a canonical register used only to prove ` +
    `the BUS-137 writeback mutation path. Not an authority source.\n\n`;
  return banner + lines.join("\n");
}

async function createProbeDocument({ apiKey, issueId, title, content }) {
  const query = `
    mutation WritebackProbeCreate($input: DocumentCreateInput!) {
      documentCreate(input: $input) {
        success
        document { id updatedAt }
      }
    }
  `;
  const data = await linearRequest({
    apiKey,
    query,
    variables: { input: { title, content, issueId } },
    operation: "probe_document_create",
  });
  if (data?.documentCreate?.success !== true || !data.documentCreate.document?.id) {
    throw new Error("PROBE_DOCUMENT_CREATE_NOT_CONFIRMED");
  }
  return data.documentCreate.document;
}

async function fetchRuntimeStatus({ workerBaseUrl, executorSecret, jobId }) {
  const response = await fetch(`${workerBaseUrl.replace(/\/$/, "")}/internal/status`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${executorSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: jobId }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) {
    throw new Error(`RUNTIME_STATUS_HTTP_${response.status}`);
  }
  return payload;
}

function selfTest() {
  const content = [
    "## Log publikasi",
    "",
    "| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi | P | W | U | C |",
    "| -- | -- | -- | -- | -- | -- | -- | -- |",
    "| SDOH-SAGE-CAR-0099 | Instagram — @satudosisobathati | 2026-10-06, 07:30 WITA | **PUBLISHED** | Runtime terminal `PUBLISHED`; job `IG-X`; evidence verified from production runtime. | **2026-10-06, 07:53:37 WITA — runtime-confirmed** | `https://www.instagram.com/p/DeIbzd0jYkv/` — remote media ID `18116263924812596` | note |",
    "",
    "## Next",
  ].join("\n");
  const evidence = {
    content_id: "SDOH-SAGE-CAR-0099",
    job_id: "IG-X",
    scheduled_at: "2026-10-06T07:30:00+08:00",
    remote_media_id: "18116263924812596",
    remote_permalink: "https://www.instagram.com/p/DeIbzd0jYkv/",
    published_at: "2026-10-05T23:53:37+0000",
    published_wita: "2026-10-06, 07:53:37 WITA",
  };
  if (planWriteback(content, evidence).decision !== "ALREADY_SYNCED") {
    throw new Error("self-test failed: fixture must start synced");
  }
  const probe = buildProbeContent(content, "SDOH-SAGE-CAR-0099");
  const plan = planWriteback(probe, evidence);
  if (plan.decision !== "DRY_RUN_UPDATE_READY") {
    throw new Error("self-test failed: probe row must be update-ready");
  }
  const updated = replacePublicationRow(probe, plan.current_row, plan.proposed_row);
  if (planWriteback(updated, evidence).decision !== "ALREADY_SYNCED") {
    throw new Error("self-test failed: probe round trip must converge");
  }
  if (!probe.includes(PROBE_TITLE_PREFIX)) {
    throw new Error("self-test failed: probe banner missing");
  }
  console.log("writeback round-trip probe self-test PASS");
}

async function main() {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }

  const apiKey = process.env.LINEAR_API_KEY;
  const executorSecret = process.env.EXECUTOR_INGEST_SECRET;
  const contentId = String(process.env.CONTENT_ID ?? "").trim();
  const jobId = String(process.env.JOB_ID ?? "").trim();
  const workerBaseUrl = String(process.env.WORKER_BASE_URL ?? "").trim();
  const probeIssueId = String(process.env.PROBE_ISSUE_ID ?? "").trim();
  const confirmation = String(process.env.PROBE_CONFIRMATION ?? "").trim();

  const out = { ok: false, content_id: contentId, job_id: jobId, canonical_register_written: false };
  try {
    if (!apiKey || !executorSecret) throw new Error("REQUIRED_SECRET_MISSING");
    if (confirmation !== "RUN_WRITEBACK_ROUNDTRIP_PROBE") throw new Error("PROBE_CONFIRMATION_REQUIRED");
    if (!/^https:\/\//.test(workerBaseUrl)) throw new Error("INVALID_WORKER_BASE_URL");
    if (!/^[0-9a-f-]{36}$/.test(probeIssueId)) throw new Error("INVALID_PROBE_ISSUE_ID");

    const registerId = resolveWritebackRegisterDocumentId(contentId);
    const status = await fetchRuntimeStatus({ workerBaseUrl, executorSecret, jobId });
    const evidence = validateRuntimeStatus(status, contentId, jobId, registerId);

    const canonical = await fetchLinearDocument({ apiKey, documentId: registerId });
    const canonicalSha = sha256Text(canonical.content);
    const canonicalPlan = planWriteback(canonical.content, evidence);
    out.canonical_register_decision = canonicalPlan.decision;
    if (canonicalPlan.decision !== "ALREADY_SYNCED") {
      throw new Error("CANONICAL_REGISTER_NOT_ALREADY_SYNCED");
    }

    const probeContent = buildProbeContent(canonical.content, contentId);
    out.probe_content_bytes = Buffer.byteLength(probeContent, "utf8");
    const created = await createProbeDocument({
      apiKey,
      issueId: probeIssueId,
      title: `${PROBE_TITLE_PREFIX} — ${contentId} — ${new Date().toISOString()}`,
      content: probeContent,
    });
    out.probe_document_id = created.id;

    const probeDoc = await fetchLinearDocument({ apiKey, documentId: created.id });
    out.probe_create_roundtrip_identical = sha256Text(probeDoc.content) === sha256Text(probeContent);

    const plan = planWriteback(probeDoc.content, evidence);
    out.plan_decision = plan.decision;
    if (plan.decision !== "DRY_RUN_UPDATE_READY") throw new Error("PROBE_PLAN_NOT_UPDATE_READY");
    out.plan_sha256 = buildPlanFingerprint({ plan, evidence, document: probeDoc });

    const updatedContent = replacePublicationRow(probeDoc.content, plan.current_row, plan.proposed_row);
    out.update_request_content_bytes = Buffer.byteLength(updatedContent, "utf8");
    const mutation = await updateLinearDocument({
      apiKey,
      documentId: created.id,
      content: updatedContent,
    });
    out.decision = "WRITEBACK_APPLIED";
    out.linear_mutation_performed = true;
    out.mutation_updated_at = mutation.updatedAt;

    const verified = await fetchLinearDocument({ apiKey, documentId: created.id });
    const verification = planWriteback(verified.content, evidence);
    out.post_write_verification = verification.decision;
    out.post_write_content_identical_to_request =
      sha256Text(verified.content) === sha256Text(updatedContent);

    const canonicalAfter = await fetchLinearDocument({ apiKey, documentId: registerId });
    out.canonical_register_unchanged = sha256Text(canonicalAfter.content) === canonicalSha;

    out.ok = verification.decision === "ALREADY_SYNCED" && out.canonical_register_unchanged;
    console.log(JSON.stringify(out));
    process.exit(out.ok ? 0 : 20);
  } catch (error) {
    out.reason = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    out.linear_diagnostics = error?.diagnostics ?? null;
    console.error(JSON.stringify(out));
    process.exit(30);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
