const encoder = new TextEncoder();
const MAX_BODY_BYTES = 4 * 1024;

export async function handleStatus(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405, {
      Allow: "POST",
    });
  }

  if (!env.DB || !env.EXECUTOR_INGEST_SECRET) {
    return json({ ok: false, error: "STATUS_NOT_CONFIGURED" }, 503);
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

  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    typeof payload.job_id !== "string" ||
    !/^[A-Za-z0-9._:-]{1,128}$/.test(payload.job_id)
  ) {
    return json({ ok: false, error: "INVALID_JOB_ID" }, 400);
  }

  const job = await env.DB.prepare(
    `SELECT
       id,
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
       governance_ref,
       created_at,
       updated_at
     FROM publication_jobs
     WHERE id = ?1
     LIMIT 1`
  ).bind(payload.job_id).first();

  if (!job) {
    return json({ ok: false, error: "JOB_NOT_FOUND" }, 404);
  }

  const credential = await env.DB.prepare(
    `SELECT drive_token_expires_at
       FROM execution_credentials
      WHERE job_id = ?1
      LIMIT 1`
  ).bind(job.id).first();

  const authority = await env.DB.prepare(
    `SELECT
       register_document_id,
       register_updated_at,
       authority_checked_at,
       authority_expires_at,
       caption_sha256
     FROM execution_authority_snapshots
     WHERE job_id = ?1
     LIMIT 1`
  ).bind(job.id).first();

  const media = await env.DB.prepare(
    `SELECT COUNT(*) AS count
       FROM publication_job_media
      WHERE job_id = ?1`
  ).bind(job.id).first();

  const artifactResponse = await env.DB.prepare(
    `SELECT kind, slot, remote_id, state, created_at, updated_at
       FROM publication_job_remote_artifacts
      WHERE job_id = ?1
      ORDER BY kind, slot`
  ).bind(job.id).all();

  const artifacts = (artifactResponse.results || []).map((row) => ({
    kind: row.kind,
    slot: row.slot,
    remote_id: row.remote_id,
    state: row.state,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));

  return json({
    ok: true,
    publishing_enabled: env.PUBLISHING_ENABLED === "true",
    job: {
      id: job.id,
      content_id: job.content_id,
      linear_issue: job.linear_issue,
      platform: job.platform,
      account: job.account,
      format: job.format,
      scheduled_at: job.scheduled_at,
      caption_revision: job.caption_revision,
      asset_folder_id: job.asset_folder_id,
      state: job.state,
      remote_media_id: job.remote_media_id,
      remote_permalink: job.remote_permalink,
      claimed_at: job.claimed_at,
      published_at: job.published_at,
      last_error: job.last_error,
      governance_ref: job.governance_ref,
      created_at: job.created_at,
      updated_at: job.updated_at,
    },
    credential: credential
      ? { drive_token_expires_at: credential.drive_token_expires_at }
      : null,
    authority: authority
      ? {
          register_document_id: authority.register_document_id,
          register_updated_at: authority.register_updated_at,
          authority_checked_at: authority.authority_checked_at,
          authority_expires_at: authority.authority_expires_at,
          caption_sha256: authority.caption_sha256,
        }
      : null,
    media_count: Number(media?.count || 0),
    artifacts,
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
