import { validateAuthoritySnapshotPayload } from "./execution-authority.js";

const encoder = new TextEncoder();

const MAX_BODY_BYTES = 32 * 1024;
const MIN_TOKEN_REMAINING_MS = 60 * 1000;
const MAX_TOKEN_REMAINING_MS = 3700 * 1000;
const REFRESH_ALLOWED_STATES = new Set(["CLAIMED", "PUBLISHING"]);

export async function handleRefresh(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405, {
      Allow: "POST",
    });
  }

  if (!env.DB || !env.EXECUTOR_INGEST_SECRET || !env.EXECUTION_CREDENTIAL_KEY) {
    return json({ ok: false, error: "REFRESH_NOT_CONFIGURED" }, 503);
  }

  const authorization = request.headers.get("Authorization") || "";
  const expectedAuthorization = `Bearer ${env.EXECUTOR_INGEST_SECRET}`;
  if (!(await timingSafeStringEqual(authorization, expectedAuthorization))) {
    return json({ ok: false, error: "UNAUTHORIZED" }, 401);
  }

  if (env.PUBLISHING_ENABLED !== "true") {
    return json({ ok: false, error: "PUBLISHING_WINDOW_NOT_OPEN" }, 409);
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

  const shape = validateRefreshPayload(payload);
  if (!shape.ok) {
    return json({ ok: false, error: shape.error }, 400);
  }

  const {
    job_id: jobId,
    drive_access_token: driveAccessToken,
    drive_token_expires_at: expiresAt,
    governance_ref: governanceRef,
    authority_snapshot: authoritySnapshot,
  } = payload;

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
       governance_ref,
       remote_media_id
     FROM publication_jobs
     WHERE id = ?1
     LIMIT 1`
  ).bind(jobId).first();

  if (!job) {
    return json({ ok: false, error: "JOB_NOT_FOUND" }, 404);
  }

  if (!REFRESH_ALLOWED_STATES.has(job.state)) {
    return json({ ok: false, error: "JOB_STATE_REJECTED" }, 409);
  }

  if (!job.governance_ref || job.governance_ref !== governanceRef) {
    return json({ ok: false, error: "GOVERNANCE_REF_MISMATCH" }, 409);
  }

  if (job.remote_media_id) {
    return json({ ok: false, error: "REFRESH_AFTER_PUBLISH_ATTEMPT_FORBIDDEN" }, 409);
  }

  const artifactResponse = await env.DB.prepare(
    `SELECT kind, slot, state
       FROM publication_job_remote_artifacts
      WHERE job_id = ?1
      ORDER BY kind, slot`
  ).bind(jobId).all();

  const artifacts = artifactResponse.results || [];
  if (
    artifacts.some(
      (row) =>
        row.kind === "PUBLISHED_MEDIA" ||
        (row.kind === "PARENT" && row.state === "PUBLISH_ATTEMPTED")
    )
  ) {
    return json({ ok: false, error: "REFRESH_AFTER_PUBLISH_ATTEMPT_FORBIDDEN" }, 409);
  }

  const authorityValidation = await validateAuthoritySnapshotPayload({
    snapshot: authoritySnapshot,
    job,
    governanceRef,
    nowMs: now,
  });
  if (!authorityValidation.ok) {
    return json({ ok: false, error: authorityValidation.error }, 409);
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

  try {
    await env.DB.batch([
      env.DB.prepare(
        `DELETE FROM execution_credentials WHERE job_id = ?1`
      ).bind(jobId),
      env.DB.prepare(
        `DELETE FROM execution_authority_snapshots WHERE job_id = ?1`
      ).bind(jobId),
      env.DB.prepare(
        `INSERT INTO execution_credentials (
           job_id,
           drive_token_ciphertext,
           drive_token_expires_at,
           created_at
         ) VALUES (?1, ?2, ?3, ?4)`
      ).bind(jobId, encryptedEnvelope, expiresAt, createdAt),
      env.DB.prepare(
        `INSERT INTO execution_authority_snapshots (
           job_id,
           content_id,
           register_document_id,
           register_updated_at,
           publication_state,
           material_state,
           qa_state,
           destination_account,
           scheduled_at,
           caption_revision,
           approved_caption,
           caption_sha256,
           governance_ref,
           authority_checked_at,
           authority_expires_at,
           created_at
         ) VALUES (
           ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8,
           ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16
         )`
      ).bind(
        jobId,
        authoritySnapshot.content_id,
        authoritySnapshot.register_document_id,
        authoritySnapshot.register_updated_at,
        authoritySnapshot.publication_state,
        authoritySnapshot.material_state,
        authoritySnapshot.qa_state,
        authoritySnapshot.destination_account,
        authoritySnapshot.scheduled_at,
        authoritySnapshot.caption_revision,
        authoritySnapshot.approved_caption,
        authoritySnapshot.caption_sha256.toLowerCase(),
        authoritySnapshot.governance_ref,
        authoritySnapshot.authority_checked_at,
        authoritySnapshot.authority_expires_at,
        createdAt
      ),
    ]);
  } catch {
    return json({ ok: false, error: "RUNTIME_REFRESH_WRITE_FAILED" }, 500);
  }

  const verifyCredential = await env.DB.prepare(
    `SELECT drive_token_expires_at
       FROM execution_credentials
      WHERE job_id = ?1
      LIMIT 1`
  ).bind(jobId).first();

  const verifyAuthority = await env.DB.prepare(
    `SELECT caption_sha256, authority_expires_at
       FROM execution_authority_snapshots
      WHERE job_id = ?1
      LIMIT 1`
  ).bind(jobId).first();

  if (
    verifyCredential?.drive_token_expires_at !== expiresAt ||
    String(verifyAuthority?.caption_sha256 || "").toLowerCase() !==
      authoritySnapshot.caption_sha256.toLowerCase() ||
    verifyAuthority?.authority_expires_at !== authoritySnapshot.authority_expires_at
  ) {
    return json({ ok: false, error: "RUNTIME_REFRESH_VERIFICATION_FAILED" }, 500);
  }

  return json({
    ok: true,
    job_id: jobId,
    job_state: job.state,
    credential_refreshed: true,
    authority_snapshot_refreshed: true,
    drive_token_expires_at: expiresAt,
    authority_expires_at: authoritySnapshot.authority_expires_at,
    prepublish_artifact_count: artifacts.length,
  });
}

export function validateRefreshPayload(payload) {
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
    !payload.authority_snapshot ||
    typeof payload.authority_snapshot !== "object" ||
    Array.isArray(payload.authority_snapshot)
  ) {
    return { ok: false, error: "AUTHORITY_SNAPSHOT_INVALID" };
  }

  return { ok: true };
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
