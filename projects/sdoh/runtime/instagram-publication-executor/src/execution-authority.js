const encoder = new TextEncoder();

const AUTHORITY_MAX_AGE_MS = 5 * 60 * 1000;
const AUTHORITY_MAX_REMAINING_MS = 15 * 60 * 1000;
const AUTHORITY_MIN_REMAINING_MS = 60 * 1000;
const AUTHORITY_MAX_SCHEDULE_LATENESS_MS = 30 * 60 * 1000;

export async function validateAuthoritySnapshotPayload({
  snapshot,
  job,
  governanceRef,
  nowMs = Date.now(),
}) {
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) {
    return { ok: false, error: "AUTHORITY_SNAPSHOT_INVALID" };
  }

  const required = [
    "content_id",
    "register_document_id",
    "register_updated_at",
    "publication_state",
    "material_state",
    "qa_state",
    "destination_account",
    "scheduled_at",
    "caption_revision",
    "approved_caption",
    "caption_sha256",
    "governance_ref",
    "authority_checked_at",
    "authority_expires_at",
  ];

  for (const key of required) {
    if (typeof snapshot[key] !== "string" || snapshot[key].length === 0) {
      return { ok: false, error: "AUTHORITY_SNAPSHOT_INVALID" };
    }
  }

  if (snapshot.content_id !== job.content_id) {
    return { ok: false, error: "AUTHORITY_CONTENT_ID_MISMATCH" };
  }
  if (snapshot.caption_revision !== job.caption_revision) {
    return { ok: false, error: "AUTHORITY_CAPTION_REVISION_MISMATCH" };
  }
  if (snapshot.destination_account !== job.account) {
    return { ok: false, error: "AUTHORITY_DESTINATION_MISMATCH" };
  }
  if (snapshot.scheduled_at !== job.scheduled_at) {
    return { ok: false, error: "AUTHORITY_SCHEDULE_MISMATCH" };
  }
  if (
    snapshot.governance_ref !== governanceRef ||
    snapshot.governance_ref !== job.governance_ref
  ) {
    return { ok: false, error: "AUTHORITY_GOVERNANCE_REF_MISMATCH" };
  }

  const scheduledAtMs = Date.parse(snapshot.scheduled_at);
  if (!Number.isFinite(scheduledAtMs)) {
    return { ok: false, error: "AUTHORITY_SCHEDULE_INVALID" };
  }
  if (scheduledAtMs > nowMs) {
    return { ok: false, error: "AUTHORITY_SCHEDULE_NOT_DUE" };
  }
  if (scheduledAtMs < nowMs - AUTHORITY_MAX_SCHEDULE_LATENESS_MS) {
    return { ok: false, error: "AUTHORITY_SCHEDULE_STALE" };
  }

  if (snapshot.publication_state !== "SCHEDULED") {
    return { ok: false, error: "AUTHORITY_PUBLICATION_NOT_SCHEDULED" };
  }
  if (snapshot.material_state !== "APPROVED") {
    return { ok: false, error: "AUTHORITY_MATERIAL_NOT_APPROVED" };
  }
  if (snapshot.qa_state !== "PASS") {
    return { ok: false, error: "AUTHORITY_QA_NOT_PASS" };
  }

  if (
    snapshot.approved_caption.length < 1 ||
    snapshot.approved_caption.length > 2200
  ) {
    return { ok: false, error: "AUTHORITY_CAPTION_INVALID" };
  }

  if (!/^[0-9a-f]{64}$/i.test(snapshot.caption_sha256)) {
    return { ok: false, error: "AUTHORITY_CAPTION_HASH_INVALID" };
  }

  const actualCaptionHash = await sha256Hex(snapshot.approved_caption);
  if (actualCaptionHash !== snapshot.caption_sha256.toLowerCase()) {
    return { ok: false, error: "AUTHORITY_CAPTION_HASH_MISMATCH" };
  }

  if (!/^[0-9a-f]{40}$/i.test(snapshot.governance_ref)) {
    return { ok: false, error: "AUTHORITY_GOVERNANCE_REF_INVALID" };
  }

  if (!Number.isFinite(Date.parse(snapshot.register_updated_at))) {
    return { ok: false, error: "AUTHORITY_REGISTER_TIMESTAMP_INVALID" };
  }

  const checkedAtMs = Date.parse(snapshot.authority_checked_at);
  const expiresAtMs = Date.parse(snapshot.authority_expires_at);

  if (!Number.isFinite(checkedAtMs) || !Number.isFinite(expiresAtMs)) {
    return { ok: false, error: "AUTHORITY_TIME_INVALID" };
  }

  if (
    checkedAtMs > nowMs + 60_000 ||
    checkedAtMs < nowMs - AUTHORITY_MAX_AGE_MS
  ) {
    return { ok: false, error: "AUTHORITY_CHECK_STALE" };
  }

  if (
    expiresAtMs <= nowMs + AUTHORITY_MIN_REMAINING_MS ||
    expiresAtMs > nowMs + AUTHORITY_MAX_REMAINING_MS
  ) {
    return { ok: false, error: "AUTHORITY_EXPIRY_WINDOW_INVALID" };
  }

  return { ok: true };
}

export async function storeAuthoritySnapshot({
  db,
  jobId,
  snapshot,
  createdAt,
}) {
  const result = await db.prepare(
    `INSERT OR IGNORE INTO execution_authority_snapshots (
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
  )
    .bind(
      jobId,
      snapshot.content_id,
      snapshot.register_document_id,
      snapshot.register_updated_at,
      snapshot.publication_state,
      snapshot.material_state,
      snapshot.qa_state,
      snapshot.destination_account,
      snapshot.scheduled_at,
      snapshot.caption_revision,
      snapshot.approved_caption,
      snapshot.caption_sha256.toLowerCase(),
      snapshot.governance_ref,
      snapshot.authority_checked_at,
      snapshot.authority_expires_at,
      createdAt
    )
    .run();

  return (result.meta?.changes || 0) === 1;
}

export async function deleteAuthoritySnapshot(db, jobId) {
  await db.prepare(
    `DELETE FROM execution_authority_snapshots WHERE job_id = ?1`
  ).bind(jobId).run();
}

export async function loadAndValidateStoredAuthority({
  db,
  job,
  governanceRef,
  nowMs = Date.now(),
  requireFresh = true,
}) {
  const snapshot = await db.prepare(
    `SELECT
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
     FROM execution_authority_snapshots
     WHERE job_id = ?1
     LIMIT 1`
  ).bind(job.id).first();

  if (!snapshot) {
    throw authorityError("AUTHORITY_SNAPSHOT_MISSING", 409);
  }

  if (snapshot.content_id !== job.content_id) {
    throw authorityError("AUTHORITY_CONTENT_ID_MISMATCH", 409);
  }
  if (snapshot.caption_revision !== job.caption_revision) {
    throw authorityError("AUTHORITY_CAPTION_REVISION_MISMATCH", 409);
  }
  if (snapshot.destination_account !== job.account) {
    throw authorityError("AUTHORITY_DESTINATION_MISMATCH", 409);
  }
  if (snapshot.scheduled_at !== job.scheduled_at) {
    throw authorityError("AUTHORITY_SCHEDULE_MISMATCH", 409);
  }
  if (
    snapshot.governance_ref !== governanceRef ||
    snapshot.governance_ref !== job.governance_ref
  ) {
    throw authorityError("AUTHORITY_GOVERNANCE_REF_MISMATCH", 409);
  }

  if (requireFresh) {
    const scheduledAtMs = Date.parse(snapshot.scheduled_at);
    if (!Number.isFinite(scheduledAtMs)) {
      throw authorityError("AUTHORITY_SCHEDULE_INVALID", 409);
    }
    if (scheduledAtMs > nowMs) {
      throw authorityError("AUTHORITY_SCHEDULE_NOT_DUE", 409);
    }
    if (scheduledAtMs < nowMs - AUTHORITY_MAX_SCHEDULE_LATENESS_MS) {
      throw authorityError("AUTHORITY_SCHEDULE_STALE", 409);
    }
  }

  if (
    snapshot.publication_state !== "SCHEDULED" ||
    snapshot.material_state !== "APPROVED" ||
    snapshot.qa_state !== "PASS"
  ) {
    throw authorityError("AUTHORITY_GATE_REJECTED", 409);
  }

  if (
    typeof snapshot.approved_caption !== "string" ||
    snapshot.approved_caption.length < 1 ||
    snapshot.approved_caption.length > 2200
  ) {
    throw authorityError("AUTHORITY_CAPTION_INVALID", 409);
  }

  if (!/^[0-9a-f]{64}$/i.test(String(snapshot.caption_sha256))) {
    throw authorityError("AUTHORITY_CAPTION_HASH_INVALID", 409);
  }

  const actualCaptionHash = await sha256Hex(snapshot.approved_caption);
  if (actualCaptionHash !== String(snapshot.caption_sha256).toLowerCase()) {
    throw authorityError("AUTHORITY_CAPTION_HASH_MISMATCH", 409);
  }

  if (requireFresh) {
    const expiresAtMs = Date.parse(snapshot.authority_expires_at);
    if (!Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs) {
      throw authorityError("AUTHORITY_SNAPSHOT_EXPIRED", 409);
    }
  }

  return snapshot;
}

export async function sha256Hex(value) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(String(value))
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function authorityError(code, httpStatus) {
  const error = new Error(code);
  error.code = code;
  error.httpStatus = httpStatus;
  return error;
}
