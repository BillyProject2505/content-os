import {
  deleteAuthoritySnapshot,
  storeAuthoritySnapshot,
  validateAuthoritySnapshotPayload,
} from "./execution-authority.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const PREPARE_ALLOWED_STATES = new Set(["SCHEDULED", "CLAIMED"]);
const MAX_BODY_BYTES = 32 * 1024;
const MIN_TOKEN_REMAINING_MS = 60 * 1000;
const MAX_TOKEN_REMAINING_MS = 3700 * 1000;
const NORMAL_MAX_LATENESS_MS = 30 * 60 * 1000;
const RECOVERY_MAX_LATENESS_MS = 24 * 60 * 60 * 1000;

export async function handlePrepare(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405, {
      Allow: "POST",
    });
  }

  if (!env.DB || !env.EXECUTOR_INGEST_SECRET || !env.EXECUTION_CREDENTIAL_KEY) {
    return json({ ok: false, error: "PREPARE_NOT_CONFIGURED" }, 503);
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

  const validation = validatePreparePayload(payload);
  if (!validation.ok) {
    return json({ ok: false, error: validation.error }, 400);
  }

  const {
    job_id: jobId,
    drive_access_token: driveAccessToken,
    drive_token_expires_at: expiresAt,
    governance_ref: governanceRef,
    authority_snapshot: authoritySnapshot,
    execution_mode: executionMode = "SCHEDULED",
  } = payload;

  const maxScheduleLatenessMs = executionMode === "LATE_RECOVERY"
    ? RECOVERY_MAX_LATENESS_MS
    : NORMAL_MAX_LATENESS_MS;

  const now = Date.now();
  const expiresAtMs = Date.parse(expiresAt);

  if (
    expiresAtMs <= now + MIN_TOKEN_REMAINING_MS ||
    expiresAtMs > now + MAX_TOKEN_REMAINING_MS
  ) {
    return json({ ok: false, error: "INVALID_TOKEN_EXPIRY_WINDOW" }, 400);
  }

  const job = await env.DB.prepare(
    `SELECT
       id,
       content_id,
       account,
       scheduled_at,
       caption_revision,
       state,
       governance_ref
     FROM publication_jobs
     WHERE id = ?1
     LIMIT 1`
  )
    .bind(jobId)
    .first();

  if (!job) {
    return json({ ok: false, error: "JOB_NOT_FOUND" }, 404);
  }

  if (!PREPARE_ALLOWED_STATES.has(job.state)) {
    return json({ ok: false, error: "JOB_STATE_REJECTED" }, 409);
  }

  if (!job.governance_ref || job.governance_ref !== governanceRef) {
    return json({ ok: false, error: "GOVERNANCE_REF_MISMATCH" }, 409);
  }

  if (authoritySnapshot !== undefined) {
    const authorityValidation = await validateAuthoritySnapshotPayload({
      snapshot: authoritySnapshot,
      job,
      governanceRef,
      nowMs: now,
      maxScheduleLatenessMs,
    });

    if (!authorityValidation.ok) {
      return json(
        { ok: false, error: authorityValidation.error },
        409
      );
    }
  }

  let encryptedEnvelope;
  try {
    encryptedEnvelope = await encryptDriveToken({
      token: driveAccessToken,
      keyHex: env.EXECUTION_CREDENTIAL_KEY,
      jobId,
      governanceRef,
      expiresAt,
    });
  } catch {
    return json({ ok: false, error: "CREDENTIAL_ENCRYPTION_FAILED" }, 500);
  }

  const createdAt = new Date(now).toISOString();
  const insertResult = await env.DB.prepare(
    `INSERT OR IGNORE INTO execution_credentials (
       job_id,
       drive_token_ciphertext,
       drive_token_expires_at,
       created_at
     ) VALUES (?1, ?2, ?3, ?4)`
  )
    .bind(jobId, encryptedEnvelope, expiresAt, createdAt)
    .run();

  if ((insertResult.meta?.changes || 0) !== 1) {
    return json({ ok: false, error: "CREDENTIAL_ALREADY_PREPARED" }, 409);
  }

  let authorityStored = false;
  if (authoritySnapshot !== undefined) {
    try {
      authorityStored = await storeAuthoritySnapshot({
        db: env.DB,
        jobId,
        snapshot: authoritySnapshot,
        createdAt,
      });
    } catch {
      await deleteCredential(env.DB, jobId);
      await deleteAuthoritySnapshot(env.DB, jobId);
      return json({ ok: false, error: "AUTHORITY_SNAPSHOT_STORE_FAILED" }, 500);
    }

    if (!authorityStored) {
      await deleteCredential(env.DB, jobId);
      return json(
        { ok: false, error: "AUTHORITY_SNAPSHOT_ALREADY_PREPARED" },
        409
      );
    }
  }

  let finalState = job.state;
  if (job.state === "SCHEDULED" && authorityStored) {
    const transition = await env.DB.prepare(
      `UPDATE publication_jobs
          SET state = 'CLAIMED',
              claimed_at = COALESCE(claimed_at, ?2),
              updated_at = ?2,
              last_error = NULL
        WHERE id = ?1
          AND state = 'SCHEDULED'`
    ).bind(jobId, createdAt).run();

    if ((transition.meta?.changes || 0) !== 1) {
      await deleteCredential(env.DB, jobId);
      await deleteAuthoritySnapshot(env.DB, jobId);
      return json({ ok: false, error: "JOB_CLAIM_TRANSITION_FAILED" }, 409);
    }
    finalState = "CLAIMED";
  }

  return json(
    {
      ok: true,
      job_id: jobId,
      job_state: finalState,
      drive_token_expires_at: expiresAt,
      credential_stored: true,
      authority_snapshot_stored: authorityStored,
    },
    201
  );
}

export async function decryptDriveToken({
  envelope,
  keyHex,
  jobId,
  governanceRef,
  expiresAt,
}) {
  const parts = String(envelope).split(".");
  if (parts.length !== 3 || parts[0] !== "v1") {
    throw new Error("unsupported credential envelope");
  }

  const iv = fromBase64Url(parts[1]);
  const ciphertext = fromBase64Url(parts[2]);
  const key = await importAesKey(keyHex);
  const additionalData = credentialAad(jobId, governanceRef, expiresAt);

  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData,
      tagLength: 128,
    },
    key,
    ciphertext
  );

  return decoder.decode(plaintext);
}

async function encryptDriveToken({
  token,
  keyHex,
  jobId,
  governanceRef,
  expiresAt,
}) {
  const key = await importAesKey(keyHex);
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);

  const additionalData = credentialAad(jobId, governanceRef, expiresAt);
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData,
      tagLength: 128,
    },
    key,
    encoder.encode(token)
  );

  return `v1.${toBase64Url(iv)}.${toBase64Url(new Uint8Array(ciphertext))}`;
}

async function importAesKey(keyHex) {
  if (!/^[0-9a-fA-F]{64}$/.test(String(keyHex))) {
    throw new Error("invalid execution credential key");
  }

  return crypto.subtle.importKey(
    "raw",
    fromHex(keyHex),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

function credentialAad(jobId, governanceRef, expiresAt) {
  return encoder.encode(
    `job:${jobId}\ngovernance:${governanceRef}\nexpires:${expiresAt}`
  );
}

async function timingSafeStringEqual(provided, expected) {
  const [providedHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);

  return crypto.subtle.timingSafeEqual(providedHash, expectedHash);
}

function validatePreparePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }

  if (
    typeof payload.job_id !== "string" ||
    !/^[A-Za-z0-9._:-]{1,128}$/.test(payload.job_id)
  ) {
    return { ok: false, error: "INVALID_JOB_ID" };
  }

  if (
    typeof payload.drive_access_token !== "string" ||
    payload.drive_access_token.length < 32 ||
    payload.drive_access_token.length > 8192
  ) {
    return { ok: false, error: "INVALID_DRIVE_TOKEN" };
  }

  if (
    typeof payload.drive_token_expires_at !== "string" ||
    !Number.isFinite(Date.parse(payload.drive_token_expires_at))
  ) {
    return { ok: false, error: "INVALID_TOKEN_EXPIRY" };
  }

  if (
    typeof payload.governance_ref !== "string" ||
    !/^[0-9a-f]{40}$/i.test(payload.governance_ref)
  ) {
    return { ok: false, error: "INVALID_GOVERNANCE_REF" };
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, "execution_mode") &&
    !["SCHEDULED", "LATE_RECOVERY"].includes(payload.execution_mode)
  ) {
    return { ok: false, error: "INVALID_EXECUTION_MODE" };
  }

  if (
    payload.authority_snapshot !== undefined &&
    (
      !payload.authority_snapshot ||
      typeof payload.authority_snapshot !== "object" ||
      Array.isArray(payload.authority_snapshot)
    )
  ) {
    return { ok: false, error: "AUTHORITY_SNAPSHOT_INVALID" };
  }

  return { ok: true };
}

function fromHex(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const normalized = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deleteCredential(db, jobId) {
  await db.prepare(
    `DELETE FROM execution_credentials WHERE job_id = ?1`
  ).bind(jobId).run();
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
