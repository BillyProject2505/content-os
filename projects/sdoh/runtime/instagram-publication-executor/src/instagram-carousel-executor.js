import { createSignedMediaUrl } from "./media-gateway.js";
import { loadAndValidateStoredAuthority } from "./execution-authority.js";

const META_BASE_DEFAULT = "https://graph.instagram.com";
const EXPECTED_ACCOUNT = "@satudosisobathati";
const CAROUSEL_SLOTS = [1, 2, 3, 4, 5];
const TERMINAL_CONTAINER_STATES = new Set(["ERROR", "EXPIRED", "PUBLISHED"]);

export function createInstagramClient({ accessToken, igUserId, apiBase = META_BASE_DEFAULT, fetchImpl = fetch }) {
  if (!accessToken) throw new Error("META_ACCESS_TOKEN_MISSING");
  if (!igUserId) throw new Error("META_IG_USER_ID_MISSING");

  const base = String(apiBase || META_BASE_DEFAULT).replace(/\/+$/, "");
  if (!/^https:\/\//i.test(base)) throw new Error("INVALID_META_API_BASE");

  async function graphRequest(path, { method = "GET", params = {} } = {}) {
    const url = new URL(`${base}/${String(path).replace(/^\/+/, "")}`);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    let body;
    if (method === "GET") {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    } else {
      const form = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          form.set(key, String(value));
        }
      }
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      body = form.toString();
    }

    let response;
    try {
      response = await fetchImpl(url.toString(), { method, headers, body, redirect: "follow" });
    } catch (error) {
      const wrapped = new Error("META_NETWORK_ERROR");
      wrapped.cause = error;
      wrapped.meta = { method, path };
      throw wrapped;
    }

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const error = new Error("META_API_ERROR");
      error.meta = {
        method,
        path,
        status: response.status,
        code: payload?.error?.code ?? null,
        subcode: payload?.error?.error_subcode ?? null,
        type: payload?.error?.type ?? null,
      };
      throw error;
    }

    return payload || {};
  }

  return {
    async createCarouselChild({ imageUrl }) {
      const result = await graphRequest(`${igUserId}/media`, {
        method: "POST",
        params: {
          image_url: imageUrl,
          is_carousel_item: "true",
        },
      });
      if (!result.id) throw new Error("META_CHILD_ID_MISSING");
      return String(result.id);
    },

    async createCarouselParent({ childIds, caption }) {
      if (!Array.isArray(childIds) || childIds.length !== 5) {
        throw new Error("CAROUSEL_REQUIRES_EXACTLY_FIVE_CHILDREN");
      }
      const result = await graphRequest(`${igUserId}/media`, {
        method: "POST",
        params: {
          media_type: "CAROUSEL",
          children: childIds.join(","),
          caption,
        },
      });
      if (!result.id) throw new Error("META_PARENT_ID_MISSING");
      return String(result.id);
    },

    async getContainerStatus(containerId) {
      const result = await graphRequest(containerId, {
        method: "GET",
        params: { fields: "status_code,status" },
      });
      return {
        id: String(result.id || containerId),
        status_code: String(result.status_code || "UNKNOWN").toUpperCase(),
        status: typeof result.status === "string" ? result.status : null,
      };
    },

    async publishContainer(containerId) {
      const result = await graphRequest(`${igUserId}/media_publish`, {
        method: "POST",
        params: { creation_id: containerId },
      });
      if (!result.id) throw new Error("META_PUBLISHED_MEDIA_ID_MISSING");
      return String(result.id);
    },

    async getPublishedMedia(mediaId) {
      const result = await graphRequest(mediaId, {
        method: "GET",
        params: { fields: "id,permalink,timestamp,caption" },
      });
      return {
        id: String(result.id || ""),
        permalink: typeof result.permalink === "string" ? result.permalink : null,
        timestamp: typeof result.timestamp === "string" ? result.timestamp : null,
        caption: typeof result.caption === "string" ? result.caption : "",
      };
    },
  };
}

export async function executeCarouselPublication({
  env,
  jobId,
  governanceRef,
  origin,
  fetchImpl = fetch,
  now = () => Date.now(),
  maxScheduleLatenessMs = 30 * 60 * 1000,
}) {
  requireRuntime(env);
  validateJobId(jobId);
  validateGovernanceRef(governanceRef);

  if (env.PUBLISHING_ENABLED !== "true") {
    return result("PUBLISHING_DISABLED", {
      ok: false,
      publish_attempted: false,
      retry_safe: true,
    });
  }

  const job = await loadJob(env.DB, jobId);
  if (!job) throw executorError("JOB_NOT_FOUND", 404);

  if (job.governance_ref !== governanceRef) {
    throw executorError("GOVERNANCE_REF_MISMATCH", 409);
  }
  if (job.platform !== "instagram" || job.account !== EXPECTED_ACCOUNT || job.format !== "carousel") {
    throw executorError("JOB_DESTINATION_REJECTED", 409);
  }
  if (job.state === "PUBLISHED") {
    return result("ALREADY_PUBLISHED", {
      ok: true,
      publish_attempted: false,
      retry_safe: false,
      remote_media_id: job.remote_media_id,
      remote_permalink: job.remote_permalink,
    });
  }
  if (!["CLAIMED", "PUBLISHING", "FAILED"].includes(job.state)) {
    throw executorError("JOB_STATE_REJECTED", 409);
  }

  const nowMs = now();
  const authoritySnapshot = await loadAndValidateStoredAuthority({
    db: env.DB,
    job,
    governanceRef,
    nowMs,
    requireFresh: false,
    maxScheduleLatenessMs,
  });

  const artifacts = await loadArtifacts(env.DB, jobId);
  const parent = artifacts.find((row) => row.kind === "PARENT" && row.slot === 0);
  const published = artifacts.find((row) => row.kind === "PUBLISHED_MEDIA" && row.slot === 0);

  if (published || job.remote_media_id) {
    return reconcileCarouselPublication({ env, jobId, fetchImpl, now });
  }

  if (parent?.state === "PUBLISH_ATTEMPTED") {
    await markReconciliationRequired(env.DB, jobId, "RECONCILIATION_REQUIRED_AFTER_PUBLISH_ATTEMPT");
    return result("RECONCILIATION_REQUIRED", {
      ok: false,
      publish_attempted: true,
      retry_safe: false,
      parent_container_id: parent.remote_id,
    });
  }

  if (job.state === "FAILED") {
    return result("RECONCILIATION_REQUIRED", {
      ok: false,
      publish_attempted: Boolean(parent),
      retry_safe: false,
      parent_container_id: parent?.remote_id || null,
    });
  }

  await loadAndValidateStoredAuthority({
    db: env.DB,
    job,
    governanceRef,
    nowMs,
    requireFresh: true,
    maxScheduleLatenessMs,
  });

  const caption = authoritySnapshot.approved_caption;

  const mediaRows = await loadMediaRows(env.DB, jobId);
  assertFiveMediaRows(mediaRows);

  const credential = await loadCredential(env.DB, jobId);
  if (!credential) throw executorError("DRIVE_CREDENTIAL_MISSING", 409);
  const credentialExpiryMs = Date.parse(credential.drive_token_expires_at);
  if (!Number.isFinite(credentialExpiryMs) || credentialExpiryMs <= nowMs + 60_000) {
    throw executorError("DRIVE_CREDENTIAL_EXPIRED", 409);
  }

  if (job.state === "CLAIMED") {
    const changed = await env.DB.prepare(
      `UPDATE publication_jobs
          SET state = 'PUBLISHING',
              claimed_at = COALESCE(claimed_at, ?2),
              updated_at = ?2,
              last_error = NULL
        WHERE id = ?1
          AND state = 'CLAIMED'`
    ).bind(jobId, new Date(nowMs).toISOString()).run();

    if ((changed.meta?.changes || 0) !== 1) {
      throw executorError("JOB_CLAIM_TRANSITION_FAILED", 409);
    }
  }

  const client = createInstagramClient({
    accessToken: env.META_ACCESS_TOKEN,
    igUserId: env.META_IG_USER_ID,
    apiBase: env.META_API_BASE || META_BASE_DEFAULT,
    fetchImpl,
  });

  const signedExpiry = Math.min(
    Math.floor(credentialExpiryMs / 1000) - 30,
    Math.floor(nowMs / 1000) + 14 * 60
  );
  if (signedExpiry <= Math.floor(nowMs / 1000) + 30) {
    throw executorError("SIGNED_MEDIA_WINDOW_TOO_SHORT", 409);
  }

  const refreshedArtifacts = await loadArtifacts(env.DB, jobId);
  const childArtifacts = new Map(
    refreshedArtifacts
      .filter((row) => row.kind === "CHILD")
      .map((row) => [row.slot, row])
  );

  for (const media of mediaRows) {
    if (childArtifacts.has(media.slot)) continue;

    const imageUrl = await createSignedMediaUrl({
      origin,
      jobId,
      slot: media.slot,
      expiresAt: signedExpiry,
      secretHex: env.MEDIA_SIGNING_SECRET,
    });

    let childId;
    try {
      childId = await client.createCarouselChild({ imageUrl });
    } catch (error) {
      await failJob(env.DB, jobId, "CHILD_CONTAINER_CREATE_FAILED");
      await deleteCredential(env.DB, jobId);
      error.meta = {
        ...(error?.meta || {}),
        stage: "CREATE_CAROUSEL_CHILD",
        slot: media.slot,
      };
      throw error;
    }

    await upsertArtifact(env.DB, {
      jobId,
      kind: "CHILD",
      slot: media.slot,
      remoteId: childId,
      state: "CREATED",
      nowIso: new Date(now()).toISOString(),
    });
    childArtifacts.set(media.slot, {
      kind: "CHILD",
      slot: media.slot,
      remote_id: childId,
      state: "CREATED",
    });
  }

  const childIds = [];
  let childPending = false;
  for (const slot of CAROUSEL_SLOTS) {
    const artifact = childArtifacts.get(slot);
    if (!artifact) throw executorError("CHILD_ARTIFACT_MISSING", 500);

    const status = await client.getContainerStatus(artifact.remote_id);
    if (status.status_code === "FINISHED") {
      await setArtifactState(env.DB, jobId, "CHILD", slot, "READY", new Date(now()).toISOString());
      childIds.push(artifact.remote_id);
      continue;
    }

    if (status.status_code === "IN_PROGRESS") {
      childPending = true;
      childIds.push(artifact.remote_id);
      continue;
    }

    if (TERMINAL_CONTAINER_STATES.has(status.status_code)) {
      await setArtifactState(env.DB, jobId, "CHILD", slot, status.status_code, new Date(now()).toISOString());
      await failJob(env.DB, jobId, `CHILD_CONTAINER_${status.status_code}`);
      await deleteCredential(env.DB, jobId);
      return result("FAILED", {
        ok: false,
        publish_attempted: false,
        retry_safe: false,
        failed_slot: slot,
        container_status: status.status_code,
      });
    }

    childPending = true;
    childIds.push(artifact.remote_id);
  }

  if (childPending) {
    return result("WAITING_FOR_CHILDREN", {
      ok: true,
      publish_attempted: false,
      retry_safe: true,
    });
  }

  let parentArtifact = (await loadArtifacts(env.DB, jobId))
    .find((row) => row.kind === "PARENT" && row.slot === 0);

  if (!parentArtifact) {
    let parentId;
    try {
      parentId = await client.createCarouselParent({ childIds, caption });
    } catch (error) {
      await failJob(env.DB, jobId, "PARENT_CONTAINER_CREATE_FAILED");
      await deleteCredential(env.DB, jobId);
      error.meta = {
        ...(error?.meta || {}),
        stage: "CREATE_CAROUSEL_PARENT",
        slot: 0,
      };
      throw error;
    }

    await upsertArtifact(env.DB, {
      jobId,
      kind: "PARENT",
      slot: 0,
      remoteId: parentId,
      state: "CREATED",
      nowIso: new Date(now()).toISOString(),
    });
    parentArtifact = {
      kind: "PARENT",
      slot: 0,
      remote_id: parentId,
      state: "CREATED",
    };
  }

  const parentStatus = await client.getContainerStatus(parentArtifact.remote_id);

  if (parentStatus.status_code === "IN_PROGRESS") {
    return result("WAITING_FOR_PARENT", {
      ok: true,
      publish_attempted: false,
      retry_safe: true,
      parent_container_id: parentArtifact.remote_id,
    });
  }

  if (parentStatus.status_code !== "FINISHED") {
    await setArtifactState(
      env.DB,
      jobId,
      "PARENT",
      0,
      parentStatus.status_code,
      new Date(now()).toISOString()
    );
    await failJob(env.DB, jobId, `PARENT_CONTAINER_${parentStatus.status_code}`);
    await deleteCredential(env.DB, jobId);
    return result("FAILED", {
      ok: false,
      publish_attempted: parentStatus.status_code === "PUBLISHED",
      retry_safe: false,
      parent_container_id: parentArtifact.remote_id,
      container_status: parentStatus.status_code,
    });
  }

  await setArtifactState(env.DB, jobId, "PARENT", 0, "READY", new Date(now()).toISOString());

  // Persist the attempt marker BEFORE the non-idempotent publish call.
  await setArtifactState(
    env.DB,
    jobId,
    "PARENT",
    0,
    "PUBLISH_ATTEMPTED",
    new Date(now()).toISOString()
  );

  let mediaId;
  try {
    mediaId = await client.publishContainer(parentArtifact.remote_id);
  } catch (error) {
    await markReconciliationRequired(env.DB, jobId, "RECONCILIATION_REQUIRED_AFTER_PUBLISH_ATTEMPT");
    throw error;
  }

  await upsertArtifact(env.DB, {
    jobId,
    kind: "PUBLISHED_MEDIA",
    slot: 0,
    remoteId: mediaId,
    state: "RETURNED",
    nowIso: new Date(now()).toISOString(),
  });

  await env.DB.prepare(
    `UPDATE publication_jobs
        SET remote_media_id = ?2,
            updated_at = ?3
      WHERE id = ?1`
  ).bind(jobId, mediaId, new Date(now()).toISOString()).run();

  return finalizeKnownRemoteMedia({ env, jobId, mediaId, caption, client, now });
}

export async function reconcileCarouselPublication({
  env,
  jobId,
  fetchImpl = fetch,
  now = () => Date.now(),
}) {
  requireRuntime(env);
  validateJobId(jobId);

  const job = await loadJob(env.DB, jobId);
  if (!job) throw executorError("JOB_NOT_FOUND", 404);

  const authoritySnapshot = await loadAndValidateStoredAuthority({
    db: env.DB,
    job,
    governanceRef: job.governance_ref,
    nowMs: now(),
    requireFresh: false,
  });
  const caption = authoritySnapshot.approved_caption;

  const client = createInstagramClient({
    accessToken: env.META_ACCESS_TOKEN,
    igUserId: env.META_IG_USER_ID,
    apiBase: env.META_API_BASE || META_BASE_DEFAULT,
    fetchImpl,
  });

  if (job.remote_media_id) {
    return finalizeKnownRemoteMedia({
      env,
      jobId,
      mediaId: job.remote_media_id,
      caption,
      client,
      now,
    });
  }

  const artifacts = await loadArtifacts(env.DB, jobId);
  const published = artifacts.find((row) => row.kind === "PUBLISHED_MEDIA" && row.slot === 0);
  if (published) {
    return finalizeKnownRemoteMedia({
      env,
      jobId,
      mediaId: published.remote_id,
      caption,
      client,
      now,
    });
  }

  const parent = artifacts.find((row) => row.kind === "PARENT" && row.slot === 0);
  if (!parent) {
    return result("NO_REMOTE_PUBLISH_ARTIFACT", {
      ok: false,
      publish_attempted: false,
      retry_safe: job.state === "CLAIMED",
    });
  }

  const status = await client.getContainerStatus(parent.remote_id);

  if (status.status_code === "PUBLISHED") {
    await markReconciliationRequired(env.DB, jobId, "PUBLISHED_REMOTE_ID_RECOVERY_REQUIRED");
    return result("PUBLISHED_REMOTE_ID_RECOVERY_REQUIRED", {
      ok: false,
      publish_attempted: true,
      retry_safe: false,
      parent_container_id: parent.remote_id,
    });
  }

  if (status.status_code === "FINISHED" && parent.state === "PUBLISH_ATTEMPTED") {
    await markReconciliationRequired(env.DB, jobId, "PUBLISH_ATTEMPT_AMBIGUOUS_MANUAL_CONFIRMATION_REQUIRED");
    return result("PUBLISH_ATTEMPT_AMBIGUOUS", {
      ok: false,
      publish_attempted: true,
      retry_safe: false,
      parent_container_id: parent.remote_id,
    });
  }

  if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
    await failJob(env.DB, jobId, `PARENT_CONTAINER_${status.status_code}`);
    await deleteCredential(env.DB, jobId);
    return result("FAILED", {
      ok: false,
      publish_attempted: parent.state === "PUBLISH_ATTEMPTED",
      retry_safe: false,
      parent_container_id: parent.remote_id,
      container_status: status.status_code,
    });
  }

  return result("WAITING_FOR_RECONCILIATION", {
    ok: true,
    publish_attempted: parent.state === "PUBLISH_ATTEMPTED",
    retry_safe: false,
    parent_container_id: parent.remote_id,
    container_status: status.status_code,
  });
}

async function finalizeKnownRemoteMedia({ env, jobId, mediaId, caption, client, now }) {
  let remote;
  try {
    remote = await client.getPublishedMedia(mediaId);
  } catch (error) {
    await markReconciliationRequired(env.DB, jobId, "RECONCILIATION_REQUIRED_REMOTE_MEDIA_KNOWN");
    throw error;
  }

  if (remote.id !== String(mediaId) || !remote.permalink || !remote.timestamp) {
    await markReconciliationRequired(env.DB, jobId, "REMOTE_MEDIA_VERIFICATION_INCOMPLETE");
    return result("RECONCILIATION_REQUIRED", {
      ok: false,
      publish_attempted: true,
      retry_safe: false,
      remote_media_id: mediaId,
    });
  }

  if (normalizeLineEndings(remote.caption) !== normalizeLineEndings(caption)) {
    await markReconciliationRequired(env.DB, jobId, "REMOTE_CAPTION_MISMATCH");
    return result("REMOTE_CAPTION_MISMATCH", {
      ok: false,
      publish_attempted: true,
      retry_safe: false,
      remote_media_id: mediaId,
      remote_permalink: remote.permalink,
    });
  }

  const nowIso = new Date(now()).toISOString();
  await upsertArtifact(env.DB, {
    jobId,
    kind: "PUBLISHED_MEDIA",
    slot: 0,
    remoteId: mediaId,
    state: "VERIFIED",
    nowIso,
  });

  await env.DB.prepare(
    `UPDATE publication_jobs
        SET state = 'PUBLISHED',
            remote_media_id = ?2,
            remote_permalink = ?3,
            published_at = ?4,
            updated_at = ?5,
            last_error = NULL
      WHERE id = ?1`
  ).bind(jobId, mediaId, remote.permalink, remote.timestamp, nowIso).run();

  await deleteCredential(env.DB, jobId);

  return result("PUBLISHED", {
    ok: true,
    publish_attempted: true,
    retry_safe: false,
    remote_media_id: mediaId,
    remote_permalink: remote.permalink,
    published_at: remote.timestamp,
  });
}

async function loadJob(db, jobId) {
  return db.prepare(
    `SELECT id, content_id, platform, account, format, scheduled_at,
            caption_revision, state, governance_ref,
            remote_media_id, remote_permalink
       FROM publication_jobs
      WHERE id = ?1
      LIMIT 1`
  ).bind(jobId).first();
}

async function loadCredential(db, jobId) {
  return db.prepare(
    `SELECT drive_token_expires_at
       FROM execution_credentials
      WHERE job_id = ?1
      LIMIT 1`
  ).bind(jobId).first();
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

async function loadArtifacts(db, jobId) {
  const response = await db.prepare(
    `SELECT kind, slot, remote_id, state, created_at, updated_at
       FROM publication_job_remote_artifacts
      WHERE job_id = ?1
      ORDER BY kind, slot`
  ).bind(jobId).all();
  return response.results || [];
}

function assertFiveMediaRows(rows) {
  if (rows.length !== 5) throw executorError("MEDIA_SET_INCOMPLETE", 409);
  for (let i = 0; i < CAROUSEL_SLOTS.length; i += 1) {
    const row = rows[i];
    if (
      row.slot !== CAROUSEL_SLOTS[i] ||
      row.mime_type !== "image/jpeg" ||
      typeof row.drive_file_id !== "string" ||
      !row.drive_file_id ||
      typeof row.expected_sha256 !== "string" ||
      !/^[0-9a-f]{64}$/i.test(row.expected_sha256)
    ) {
      throw executorError("MEDIA_SET_INVALID", 409);
    }
  }
}

async function upsertArtifact(db, { jobId, kind, slot, remoteId, state, nowIso }) {
  await db.prepare(
    `INSERT INTO publication_job_remote_artifacts (
       job_id, kind, slot, remote_id, state, created_at, updated_at
     ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)
     ON CONFLICT(job_id, kind, slot) DO UPDATE SET
       remote_id = excluded.remote_id,
       state = excluded.state,
       updated_at = excluded.updated_at`
  ).bind(jobId, kind, slot, remoteId, state, nowIso).run();
}

async function setArtifactState(db, jobId, kind, slot, state, nowIso) {
  const changed = await db.prepare(
    `UPDATE publication_job_remote_artifacts
        SET state = ?4,
            updated_at = ?5
      WHERE job_id = ?1
        AND kind = ?2
        AND slot = ?3`
  ).bind(jobId, kind, slot, state, nowIso).run();
  if ((changed.meta?.changes || 0) !== 1) {
    throw executorError("REMOTE_ARTIFACT_STATE_UPDATE_FAILED", 500);
  }
}

async function failJob(db, jobId, reason) {
  await db.prepare(
    `UPDATE publication_jobs
        SET state = 'FAILED',
            last_error = ?2,
            updated_at = ?3
      WHERE id = ?1`
  ).bind(jobId, reason, new Date().toISOString()).run();
}

async function markReconciliationRequired(db, jobId, reason) {
  await db.prepare(
    `UPDATE publication_jobs
        SET state = 'FAILED',
            last_error = ?2,
            updated_at = ?3
      WHERE id = ?1`
  ).bind(jobId, reason, new Date().toISOString()).run();
}

async function deleteCredential(db, jobId) {
  await db.prepare(
    `DELETE FROM execution_credentials WHERE job_id = ?1`
  ).bind(jobId).run();
}

function normalizeLineEndings(value) {
  return String(value ?? "").replace(/\r\n/g, "\n");
}

function requireRuntime(env) {
  if (!env?.DB) throw executorError("DB_NOT_CONFIGURED", 503);
  if (!env.META_ACCESS_TOKEN) throw executorError("META_ACCESS_TOKEN_MISSING", 503);
  if (!env.META_IG_USER_ID) throw executorError("META_IG_USER_ID_MISSING", 503);
  if (!env.MEDIA_SIGNING_SECRET) throw executorError("MEDIA_SIGNING_SECRET_MISSING", 503);
}

function validateJobId(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9._:-]{1,128}$/.test(value)) {
    throw executorError("INVALID_JOB_ID", 400);
  }
}

function validateCaption(value) {
  if (typeof value !== "string" || value.length < 1 || value.length > 2200) {
    throw executorError("INVALID_CAPTION", 400);
  }
}

function validateGovernanceRef(value) {
  if (typeof value !== "string" || !/^[0-9a-f]{40}$/i.test(value)) {
    throw executorError("INVALID_GOVERNANCE_REF", 400);
  }
}

function executorError(code, httpStatus = 500) {
  const error = new Error(code);
  error.code = code;
  error.httpStatus = httpStatus;
  return error;
}

function result(status, extra = {}) {
  return { status, ...extra };
}
