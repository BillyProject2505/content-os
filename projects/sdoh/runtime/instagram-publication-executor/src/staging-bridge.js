import { validateAuthoritySnapshotPayload } from "./execution-authority.js";

const encoder = new TextEncoder();

const EXPECTED_ACCOUNT = "@satudosisobathati";
const MAX_BODY_BYTES = 64 * 1024;
const CAROUSEL_SLOTS = [1, 2, 3, 4, 5];
const NORMAL_MAX_LATENESS_MS = 30 * 60 * 1000;
const RECOVERY_MAX_LATENESS_MS = 24 * 60 * 60 * 1000;
const CAROUSEL_REGISTER_DOCUMENT_IDS = Object.freeze({
  BURGUNDY: "346b4c0c-9aec-4454-a2b5-06210b2c88c6",
  SAGE: "458e4dc3-a1a6-4a44-ab6e-afefa1d28eba",
});

export async function handleStage(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405, {
      Allow: "POST",
    });
  }

  if (!env.DB || !env.EXECUTOR_INGEST_SECRET) {
    return json({ ok: false, error: "STAGING_NOT_CONFIGURED" }, 503);
  }

  if (env.PUBLISHING_ENABLED === "true") {
    return json(
      { ok: false, error: "STAGING_REQUIRES_PUBLISHING_DISABLED" },
      409
    );
  }

  const authorization = request.headers.get("Authorization") || "";
  const expectedAuthorization = `Bearer ${env.EXECUTOR_INGEST_SECRET}`;
  if (!(await timingSafeStringEqual(authorization, expectedAuthorization))) {
    return json({ ok: false, error: "UNAUTHORIZED" }, 401);
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "CONTENT_TYPE_REQUIRED" }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, 413);
  }

  const rawBody = await request.text();
  if (encoder.encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, 413);
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, error: "INVALID_JSON" }, 400);
  }

  const requestUrl = new URL(request.url);
  const requestedMode = requestUrl.searchParams.get("mode") || "scheduled";
  if (!["scheduled", "late-recovery"].includes(requestedMode)) {
    return json({ ok: false, error: "INVALID_STAGE_MODE" }, 400);
  }
  const maxScheduleLatenessMs = requestedMode === "late-recovery"
    ? RECOVERY_MAX_LATENESS_MS
    : NORMAL_MAX_LATENESS_MS;

  const shape = validateStagePayload(payload);
  if (!shape.ok) {
    return json({ ok: false, error: shape.error }, 400);
  }

  const snapshot = payload.authority_snapshot;
  const executionInput = payload.execution_input;
  const nowMs = Date.now();

  const registerValidation = validateSnapshotRegisterRoute(snapshot);
  if (!registerValidation.ok) {
    return json(
      { ok: false, error: registerValidation.error },
      registerValidation.status
    );
  }
  if (snapshot.destination_account !== EXPECTED_ACCOUNT) {
    return json({ ok: false, error: "DESTINATION_ACCOUNT_MISMATCH" }, 409);
  }

  const stagedIdentity = buildStagedJobIdentity(snapshot);
  const syntheticJob = {
    content_id: snapshot.content_id,
    account: snapshot.destination_account,
    scheduled_at: snapshot.scheduled_at,
    caption_revision: snapshot.caption_revision,
    governance_ref: snapshot.governance_ref,
  };

  const authorityValidation = await validateAuthoritySnapshotPayload({
    snapshot,
    job: syntheticJob,
    governanceRef: snapshot.governance_ref,
    nowMs,
    maxScheduleLatenessMs,
  });

  if (!authorityValidation.ok) {
    return json({ ok: false, error: authorityValidation.error }, 409);
  }

  const inputValidation = validateExecutionInput(executionInput);
  if (!inputValidation.ok) {
    return json({ ok: false, error: inputValidation.error }, 400);
  }

  const existing = await env.DB.prepare(
    `SELECT
       id,
       idempotency_key,
       content_id,
       linear_issue,
       platform,
       account,
       format,
       scheduled_at,
       caption_revision,
       asset_folder_id,
       state,
       governance_ref
     FROM publication_jobs
     WHERE idempotency_key = ?1
     LIMIT 1`
  ).bind(stagedIdentity.idempotency_key).first();

  if (existing) {
    const conflict = compareExistingJob({
      existing,
      identity: stagedIdentity,
      snapshot,
      executionInput,
    });
    if (conflict) {
      return json({ ok: false, error: conflict }, 409);
    }

    const mediaRows = await loadMediaRows(env.DB, existing.id);
    if (!mediaRowsMatch(mediaRows, executionInput.media)) {
      return json({ ok: false, error: "STAGED_MEDIA_CONFLICT" }, 409);
    }

    return json(
      {
        ok: true,
        status: "ALREADY_STAGED",
        job_id: existing.id,
        state: existing.state,
        media_count: mediaRows.length,
      },
      200
    );
  }

  const createdAt = new Date(nowMs).toISOString();
  const statements = [
    env.DB.prepare(
      `INSERT INTO publication_jobs (
         id,
         idempotency_key,
         content_id,
         linear_issue,
         platform,
         account,
         format,
         scheduled_at,
         caption_revision,
         asset_folder_id,
         state,
         remote_media_id,
         remote_permalink,
         claimed_at,
         published_at,
         last_error,
         created_at,
         updated_at,
         governance_ref
       ) VALUES (
         ?1, ?2, ?3, ?4, 'instagram', ?5, 'carousel',
         ?6, ?7, ?8, 'SCHEDULED',
         NULL, NULL, NULL, NULL, NULL, ?9, ?9, ?10
       )`
    ).bind(
      stagedIdentity.job_id,
      stagedIdentity.idempotency_key,
      snapshot.content_id,
      executionInput.linear_issue,
      snapshot.destination_account,
      snapshot.scheduled_at,
      snapshot.caption_revision,
      executionInput.asset_folder_id,
      createdAt,
      snapshot.governance_ref
    ),
    ...executionInput.media.map((item) =>
      env.DB.prepare(
        `INSERT INTO publication_job_media (
           job_id,
           slot,
           drive_file_id,
           mime_type,
           expected_sha256
         ) VALUES (?1, ?2, ?3, 'image/jpeg', ?4)`
      ).bind(
        stagedIdentity.job_id,
        item.slot,
        item.drive_file_id,
        item.sha256.toLowerCase()
      )
    ),
  ];

  try {
    await env.DB.batch(statements);
  } catch {
    return json({ ok: false, error: "STAGING_WRITE_FAILED" }, 409);
  }

  const storedMedia = await loadMediaRows(env.DB, stagedIdentity.job_id);
  if (!mediaRowsMatch(storedMedia, executionInput.media)) {
    return json({ ok: false, error: "STAGING_VERIFICATION_FAILED" }, 500);
  }

  return json(
    {
      ok: true,
      status: "STAGED",
      job_id: stagedIdentity.job_id,
      state: "SCHEDULED",
      media_count: storedMedia.length,
    },
    201
  );
}

function resolveCarouselRegisterForStage(contentId) {
  const normalized = String(contentId ?? "").trim();

  if (/^SDOH-BURGUNDY-CAR-\d{4}$/.test(normalized)) {
    return {
      theme: "BURGUNDY",
      format: "carousel",
      content_id: normalized,
      register_document_id: CAROUSEL_REGISTER_DOCUMENT_IDS.BURGUNDY,
    };
  }

  if (/^SDOH-SAGE-CAR-\d{4}$/.test(normalized)) {
    return {
      theme: "SAGE",
      format: "carousel",
      content_id: normalized,
      register_document_id: CAROUSEL_REGISTER_DOCUMENT_IDS.SAGE,
    };
  }

  return null;
}

export function validateSnapshotRegisterRoute(snapshot) {
  const route = resolveCarouselRegisterForStage(snapshot?.content_id);

  if (!route) {
    return {
      ok: false,
      status: 400,
      error: "UNSUPPORTED_CAROUSEL_CONTENT_ID",
    };
  }

  if (snapshot?.register_document_id !== route.register_document_id) {
    return {
      ok: false,
      status: 409,
      error: "REGISTER_DOCUMENT_ROUTE_MISMATCH",
    };
  }

  return {
    ok: true,
    status: 200,
    error: null,
    route,
  };
}

export function validateStagePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }
  if (
    !payload.authority_snapshot ||
    typeof payload.authority_snapshot !== "object" ||
    Array.isArray(payload.authority_snapshot)
  ) {
    return { ok: false, error: "AUTHORITY_SNAPSHOT_INVALID" };
  }
  if (
    !payload.execution_input ||
    typeof payload.execution_input !== "object" ||
    Array.isArray(payload.execution_input)
  ) {
    return { ok: false, error: "EXECUTION_INPUT_INVALID" };
  }
  return { ok: true };
}

export function validateExecutionInput(input) {
  if (
    typeof input.linear_issue !== "string" ||
    !/^BUS-\d+$/.test(input.linear_issue)
  ) {
    return { ok: false, error: "LINEAR_ISSUE_INVALID" };
  }

  if (
    typeof input.asset_folder_id !== "string" ||
    !/^[A-Za-z0-9_-]{10,}$/.test(input.asset_folder_id)
  ) {
    return { ok: false, error: "ASSET_FOLDER_INVALID" };
  }

  if (!Array.isArray(input.media) || input.media.length !== 5) {
    return { ok: false, error: "MEDIA_SET_INVALID" };
  }

  for (let i = 0; i < CAROUSEL_SLOTS.length; i += 1) {
    const item = input.media[i];
    if (
      !item ||
      item.slot !== CAROUSEL_SLOTS[i] ||
      typeof item.drive_file_id !== "string" ||
      !/^[A-Za-z0-9_-]{10,}$/.test(item.drive_file_id) ||
      typeof item.sha256 !== "string" ||
      !/^[0-9a-f]{64}$/i.test(item.sha256)
    ) {
      return { ok: false, error: "MEDIA_SET_INVALID" };
    }
  }

  return { ok: true };
}

export function buildStagedJobIdentity(snapshot) {
  const scheduledAtMs = Date.parse(snapshot.scheduled_at);
  if (!Number.isFinite(scheduledAtMs)) {
    throw new Error("INVALID_SCHEDULE");
  }

  const compact = new Date(scheduledAtMs)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(".000", "");

  return {
    job_id: `IG-${snapshot.content_id}-${compact}`,
    idempotency_key:
      `instagram|${snapshot.destination_account}|${snapshot.content_id}|${snapshot.scheduled_at}`,
  };
}

function compareExistingJob({ existing, identity, snapshot, executionInput }) {
  if (
    existing.id !== identity.job_id ||
    existing.content_id !== snapshot.content_id ||
    existing.linear_issue !== executionInput.linear_issue ||
    existing.platform !== "instagram" ||
    existing.account !== snapshot.destination_account ||
    existing.format !== "carousel" ||
    existing.scheduled_at !== snapshot.scheduled_at ||
    existing.caption_revision !== snapshot.caption_revision ||
    existing.asset_folder_id !== executionInput.asset_folder_id ||
    existing.governance_ref !== snapshot.governance_ref
  ) {
    return "STAGED_JOB_CONFLICT";
  }

  if (!["SCHEDULED", "CLAIMED"].includes(existing.state)) {
    return "STAGED_JOB_STATE_CONFLICT";
  }

  return null;
}

async function loadMediaRows(db, jobId) {
  const response = await db.prepare(
    `SELECT slot, drive_file_id, mime_type, expected_sha256
       FROM publication_job_media
      WHERE job_id = ?1
      ORDER BY slot ASC`
  ).bind(jobId).all();
  return response.results || [];
}

function mediaRowsMatch(rows, expected) {
  if (!Array.isArray(rows) || rows.length !== 5) return false;

  return rows.every((row, index) => {
    const item = expected[index];
    return (
      row.slot === item.slot &&
      row.drive_file_id === item.drive_file_id &&
      row.mime_type === "image/jpeg" &&
      String(row.expected_sha256).toLowerCase() === item.sha256.toLowerCase()
    );
  });
}

async function timingSafeStringEqual(provided, expected) {
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);

  return crypto.subtle.timingSafeEqual(providedHash, expectedHash);
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}
