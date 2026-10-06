import { createHash } from "node:crypto";
import {
  buildPlanFingerprint,
  planWriteback,
  resolveWritebackRegisterDocumentId,
  validateRuntimeStatus,
} from "./publication-evidence-writeback.mjs";

const LINEAR_API_URL = "https://api.linear.app/graphql";
const TEST_BURGUNDY_REGISTER_DOCUMENT_ID =
  "346b4c0c-9aec-4454-a2b5-06210b2c88c6";

const EXIT = Object.freeze({
  OK: 0,
  CONFLICT: 20,
  ERROR: 30,
});

function sha256Text(value) {
  return createHash("sha256").update(String(value ?? "")).digest("hex");
}

export function replacePublicationRow(markdown, currentRow, proposedRow) {
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  const matches = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim() === String(currentRow ?? "").trim()) {
      matches.push(i);
    }
  }

  if (matches.length !== 1) {
    throw new Error(
      matches.length === 0
        ? "CURRENT_PUBLICATION_ROW_NOT_FOUND"
        : "CURRENT_PUBLICATION_ROW_NOT_UNIQUE"
    );
  }

  lines[matches[0]] = proposedRow;
  return lines.join("\n");
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const text = await response.text();

  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`NON_JSON_RESPONSE_HTTP_${response.status}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}_${payload?.error ?? "UNKNOWN"}`);
  }

  return payload;
}

async function fetchRuntimeStatus({ workerBaseUrl, executorSecret, jobId }) {
  return fetchJson(`${workerBaseUrl.replace(/\/$/, "")}/internal/status`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${executorSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ job_id: jobId }),
  });
}

const SECRET_PATTERNS = [
  /lin_api_[A-Za-z0-9]+/g,
  /lin_oauth_[A-Za-z0-9]+/g,
  /Bearer\s+[A-Za-z0-9._~+/=-]+/gi,
];

export function redactSecrets(value, secrets = []) {
  let text = String(value ?? "");
  for (const secret of secrets) {
    if (typeof secret === "string" && secret.length >= 8) {
      text = text.split(secret).join("[REDACTED]");
    }
  }
  for (const pattern of SECRET_PATTERNS) {
    text = text.replace(pattern, "[REDACTED]");
  }
  return text;
}

// Safe, bounded summary of a Linear GraphQL error response. Never includes
// request headers, variables, or document content; strings are redacted and
// truncated.
export function summarizeLinearErrors(payload, secrets = []) {
  const errors = Array.isArray(payload?.errors) ? payload.errors : [];
  return errors.slice(0, 5).map((error) => ({
    message: redactSecrets(error?.message, secrets).slice(0, 300),
    code: error?.extensions?.code
      ? redactSecrets(error.extensions.code, secrets).slice(0, 80)
      : null,
    type: error?.extensions?.type
      ? redactSecrets(error.extensions.type, secrets).slice(0, 80)
      : null,
    user_presentable_message: error?.extensions?.userPresentableMessage
      ? redactSecrets(error.extensions.userPresentableMessage, secrets).slice(0, 300)
      : null,
    path: Array.isArray(error?.path)
      ? error.path.map((part) => String(part).slice(0, 60)).slice(0, 5)
      : null,
  }));
}

function linearError(code, diagnostics) {
  const error = new Error(code);
  error.diagnostics = diagnostics;
  return error;
}

export async function linearRequest({
  apiKey,
  query,
  variables,
  operation = "unknown",
  fetchImpl = fetch,
}) {
  const requestBody = JSON.stringify({ query, variables });
  const response = await fetchImpl(LINEAR_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: requestBody,
  });

  const text = await response.text();
  let payload = null;
  try {
    payload = JSON.parse(text);
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw linearError(`LINEAR_HTTP_${response.status}`, {
      operation,
      http_status: response.status,
      request_body_bytes: Buffer.byteLength(requestBody, "utf8"),
      response_is_json: payload !== null,
      errors: summarizeLinearErrors(payload, [apiKey]),
      response_snippet: payload === null
        ? redactSecrets(text, [apiKey]).slice(0, 300)
        : null,
    });
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    throw linearError("LINEAR_GRAPHQL_ERROR", {
      operation,
      http_status: response.status,
      request_body_bytes: Buffer.byteLength(requestBody, "utf8"),
      errors: summarizeLinearErrors(payload, [apiKey]),
    });
  }

  if (payload === null) {
    throw linearError("LINEAR_NON_JSON_RESPONSE", {
      operation,
      http_status: response.status,
    });
  }

  return payload.data;
}

export async function fetchLinearDocument({ apiKey, documentId }) {
  const query = `
    query PublicationRegister($id: String!) {
      document(id: $id) {
        id
        title
        content
        updatedAt
      }
    }
  `;

  const data = await linearRequest({
    apiKey,
    query,
    variables: { id: documentId },
    operation: "document_read",
  });

  if (!data?.document?.content) {
    throw new Error("LINEAR_DOCUMENT_CONTENT_MISSING");
  }

  return data.document;
}

export async function updateLinearDocument({ apiKey, documentId, content }) {
  const query = `
    mutation PublicationRegisterWriteback(
      $id: String!
      $input: DocumentUpdateInput!
    ) {
      documentUpdate(id: $id, input: $input) {
        success
        document {
          id
          updatedAt
        }
      }
    }
  `;

  const data = await linearRequest({
    apiKey,
    query,
    variables: {
      id: documentId,
      input: { content },
    },
    operation: "document_update",
  });

  if (
    data?.documentUpdate?.success !== true ||
    data?.documentUpdate?.document?.id !== documentId
  ) {
    throw new Error("LINEAR_DOCUMENT_UPDATE_NOT_CONFIRMED");
  }

  return data.documentUpdate.document;
}

function validateConfiguration({
  apiKey,
  executorSecret,
  contentId,
  jobId,
  workerBaseUrl,
  expectedPlanSha256,
  confirmation,
}) {
  if (!apiKey || !executorSecret) {
    throw new Error("REQUIRED_SECRET_MISSING");
  }

  if (!/^SDOH-[A-Z0-9-]+$/.test(contentId)) {
    throw new Error("INVALID_CONTENT_ID");
  }

  if (!/^[A-Za-z0-9._:-]{1,128}$/.test(jobId)) {
    throw new Error("INVALID_JOB_ID");
  }

  if (!/^https:\/\//.test(workerBaseUrl)) {
    throw new Error("INVALID_WORKER_BASE_URL");
  }

  if (!/^[a-f0-9]{64}$/.test(expectedPlanSha256)) {
    throw new Error("INVALID_EXPECTED_PLAN_SHA256");
  }

  if (confirmation !== "APPLY_LINEAR_WRITEBACK") {
    throw new Error("WRITE_CONFIRMATION_REQUIRED");
  }
}

function runSelfTest() {
  const evidence = {
    content_id: "SDOH-BURGUNDY-CAR-0099",
    job_id: "IG-SDOH-BURGUNDY-CAR-0099-20261002T040500Z",
    scheduled_at: "2026-10-02T12:05:00+08:00",
    remote_media_id: "18098082377388129",
    remote_permalink: "https://www.instagram.com/p/Dd-mV6kjhHf/",
    published_at: "2026-10-02T04:13:19+0000",
    published_wita: "2026-10-02, 12:13:19 WITA",
  };

  const document = {
    id: TEST_BURGUNDY_REGISTER_DOCUMENT_ID,
    updatedAt: "2026-10-02T04:00:00.000Z",
    content: `
## Log publikasi

| ID konten | Akun / platform | Jadwal (WITA) | Status publikasi | Pemeriksaan akun / antrean: waktu & hasil | Waktu terbit aktual | URL / ID posting | Catatan / persetujuan repost |
| -- | -- | -- | -- | -- | -- | -- | -- |
| SDOH-BURGUNDY-CAR-0099 | Instagram — @satudosisobathati | **2026-10-02, 12:05 WITA** | **SCHEDULED** | ready | — | — | fresh job |
`,
  };

  const plan = planWriteback(document.content, evidence);
  if (plan.decision !== "DRY_RUN_UPDATE_READY") {
    throw new Error("self-test failed: expected update-ready plan");
  }

  const fingerprint = buildPlanFingerprint({ plan, evidence, document });
  if (!/^[a-f0-9]{64}$/.test(fingerprint)) {
    throw new Error("self-test failed: plan fingerprint");
  }

  const updated = replacePublicationRow(
    document.content,
    plan.current_row,
    plan.proposed_row
  );

  const verified = planWriteback(updated, evidence);
  if (verified.decision !== "ALREADY_SYNCED") {
    throw new Error("self-test failed: post-write verification");
  }

  let missingFailed = false;
  try {
    replacePublicationRow(document.content, "| missing |", plan.proposed_row);
  } catch (error) {
    missingFailed =
      error instanceof Error &&
      error.message === "CURRENT_PUBLICATION_ROW_NOT_FOUND";
  }

  if (!missingFailed) {
    throw new Error("self-test failed: missing row did not fail closed");
  }

  const leaked = summarizeLinearErrors(
    {
      errors: [
        {
          message: "Argument Validation Error: lin_api_SECRETVALUE123 Bearer abc.def",
          extensions: {
            code: "INVALID_INPUT",
            userPresentableMessage: "content too long for key lin_api_SECRETVALUE123",
          },
          path: ["documentUpdate"],
        },
      ],
    },
    ["lin_api_SECRETVALUE123"]
  );
  const serialized = JSON.stringify(leaked);
  if (
    serialized.includes("SECRETVALUE123") ||
    serialized.includes("abc.def") ||
    leaked[0].code !== "INVALID_INPUT" ||
    !leaked[0].message.startsWith("Argument Validation Error")
  ) {
    throw new Error("self-test failed: Linear error diagnostics are unsafe or incomplete");
  }

  console.log("publication evidence controlled writeback self-test PASS");
  console.log("safe Linear GraphQL error diagnostics (secrets redacted) PASS");
}

async function main() {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  const apiKey = process.env.LINEAR_API_KEY;
  const executorSecret = process.env.EXECUTOR_INGEST_SECRET;
  const contentId = String(process.env.CONTENT_ID ?? "").trim();
  const jobId = String(process.env.JOB_ID ?? "").trim();
  const workerBaseUrl = String(process.env.WORKER_BASE_URL ?? "").trim();
  const expectedPlanSha256 = String(
    process.env.EXPECTED_PLAN_SHA256 ?? ""
  ).trim();
  const confirmation = String(process.env.WRITE_CONFIRMATION ?? "").trim();
  let documentId;
  try {
    documentId = resolveWritebackRegisterDocumentId(
      contentId,
      process.env.LINEAR_REGISTER_DOCUMENT_ID
    );
  } catch (error) {
    console.error(JSON.stringify({
      ok: false,
      decision: "WRITEBACK_REJECTED_BEFORE_CONFIRMED_MUTATION",
      reason: error instanceof Error ? error.message : "REGISTER_ROUTING_FAILED",
      content_id: contentId,
      job_id: jobId,
      linear_mutation_may_have_occurred: false,
      instagram_publication_result_unchanged: true,
    }));
    process.exit(EXIT.ERROR);
  }

  let mutationApplied = false;

  try {
    validateConfiguration({
      apiKey,
      executorSecret,
      contentId,
      jobId,
      workerBaseUrl,
      expectedPlanSha256,
      confirmation,
    });

    const [runtimeStatus, document] = await Promise.all([
      fetchRuntimeStatus({ workerBaseUrl, executorSecret, jobId }),
      fetchLinearDocument({ apiKey, documentId }),
    ]);

    if (runtimeStatus.publishing_enabled !== false) {
      throw new Error("PUBLISHING_WINDOW_MUST_BE_CLOSED");
    }

    const evidence = validateRuntimeStatus(
      runtimeStatus,
      contentId,
      jobId,
      documentId
    );

    const plan = planWriteback(document.content, evidence);
    const planSha256 = buildPlanFingerprint({
      plan,
      evidence,
      document,
    });

    if (planSha256 !== expectedPlanSha256) {
      throw new Error("DRY_RUN_PLAN_FINGERPRINT_MISMATCH");
    }

    if (plan.decision === "ALREADY_SYNCED") {
      console.log(JSON.stringify({
        ok: true,
        decision: "ALREADY_SYNCED_NO_WRITE",
        content_id: contentId,
        job_id: jobId,
        plan_sha256: planSha256,
        linear_mutation_performed: false,
      }));
      process.exit(EXIT.OK);
    }

    if (plan.decision !== "DRY_RUN_UPDATE_READY") {
      throw new Error(
        `WRITEBACK_PLAN_NOT_ELIGIBLE_${plan.decision ?? "UNKNOWN"}`
      );
    }

    const sourceContentSha256 = sha256Text(document.content);

    const latest = await fetchLinearDocument({
      apiKey,
      documentId,
    });

    if (
      latest.updatedAt !== document.updatedAt ||
      sha256Text(latest.content) !== sourceContentSha256
    ) {
      throw new Error("REGISTER_CHANGED_SINCE_DRY_RUN_PLAN");
    }

    const latestPlan = planWriteback(latest.content, evidence);
    const latestPlanSha256 = buildPlanFingerprint({
      plan: latestPlan,
      evidence,
      document: latest,
    });

    if (
      latestPlan.decision !== "DRY_RUN_UPDATE_READY" ||
      latestPlanSha256 !== expectedPlanSha256
    ) {
      throw new Error("REGISTER_PLAN_CHANGED_BEFORE_WRITE");
    }

    const updatedContent = replacePublicationRow(
      latest.content,
      latestPlan.current_row,
      latestPlan.proposed_row
    );

    if (updatedContent === latest.content) {
      throw new Error("WRITEBACK_WOULD_BE_NOOP_UNEXPECTEDLY");
    }

    const mutation = await updateLinearDocument({
      apiKey,
      documentId,
      content: updatedContent,
    });
    mutationApplied = true;

    const verifiedDocument = await fetchLinearDocument({
      apiKey,
      documentId,
    });

    const verification = planWriteback(
      verifiedDocument.content,
      evidence
    );

    if (verification.decision !== "ALREADY_SYNCED") {
      throw new Error("POST_WRITE_VERIFICATION_FAILED");
    }

    console.log(JSON.stringify({
      ok: true,
      decision: "WRITEBACK_APPLIED",
      content_id: contentId,
      job_id: jobId,
      plan_sha256: expectedPlanSha256,
      source_register_updated_at: latest.updatedAt,
      mutation_updated_at: mutation.updatedAt,
      verified_register_updated_at: verifiedDocument.updatedAt,
      remote_media_id: evidence.remote_media_id,
      remote_permalink: evidence.remote_permalink,
      published_at: evidence.published_at,
      published_wita: evidence.published_wita,
      linear_mutation_performed: true,
      post_write_verification: "ALREADY_SYNCED",
    }));

    process.exit(EXIT.OK);
  } catch (error) {
    console.error(JSON.stringify({
      ok: false,
      decision: mutationApplied
        ? "WRITEBACK_APPLIED_VERIFY_OR_READBACK_FAILED"
        : "WRITEBACK_REJECTED_BEFORE_CONFIRMED_MUTATION",
      reason: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      linear_diagnostics: error?.diagnostics ?? null,
      reconciliation: "RECONCILIATION_REQUIRED",
      content_id: contentId,
      job_id: jobId,
      linear_mutation_may_have_occurred: mutationApplied,
      instagram_publication_result_unchanged: true,
    }));
    process.exit(
      mutationApplied ? EXIT.CONFLICT : EXIT.ERROR
    );
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
