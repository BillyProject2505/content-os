import {
  loadAndValidateStoredAuthority,
  sha256Hex,
  validateAuthoritySnapshotPayload,
} from "../src/execution-authority.js";
import {
  validateExecutePayload,
  validateReconcilePayload,
} from "../src/internal-execution.js";

const NOW_MS = Date.parse("2026-09-30T06:00:00Z");
const GOVERNANCE_REF = "e358ab9cf8e5be0d7d2a520f9303b8e8b7540b2e";
const CAPTION = "approved locked caption";
const CAPTION_HASH = await sha256Hex(CAPTION);

const job = {
  id: "TEST-AUTHORITY-001",
  content_id: "SDOH-BURGUNDY-CAR-0099",
  account: "@satudosisobathati",
  scheduled_at: "2026-09-30T14:00:00+08:00",
  caption_revision: "v1.0",
  governance_ref: GOVERNANCE_REF,
};

function makeSnapshot() {
  return {
    content_id: job.content_id,
    register_document_id: "346b4c0c-9aec-4454-a2b5-06210b2c88c6",
    register_updated_at: "2026-09-30T05:57:00Z",
    publication_state: "SCHEDULED",
    material_state: "APPROVED",
    qa_state: "PASS",
    destination_account: job.account,
    scheduled_at: job.scheduled_at,
    caption_revision: job.caption_revision,
    approved_caption: CAPTION,
    caption_sha256: CAPTION_HASH,
    governance_ref: GOVERNANCE_REF,
    authority_checked_at: "2026-09-30T05:58:00Z",
    authority_expires_at: "2026-09-30T06:10:00Z",
    created_at: "2026-09-30T05:58:00Z",
  };
}

{
  const result = await validateAuthoritySnapshotPayload({
    snapshot: makeSnapshot(),
    job,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
  });
  if (!result.ok) {
    throw new Error(`valid authority snapshot rejected: ${result.error}`);
  }
}

{
  const tampered = makeSnapshot();
  tampered.approved_caption = "caller changed caption";
  const result = await validateAuthoritySnapshotPayload({
    snapshot: tampered,
    job,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
  });
  if (result.ok || result.error !== "AUTHORITY_CAPTION_HASH_MISMATCH") {
    throw new Error("caption tampering did not fail closed");
  }
}

{
  const notScheduled = makeSnapshot();
  notScheduled.publication_state = "PLANNED";
  const result = await validateAuthoritySnapshotPayload({
    snapshot: notScheduled,
    job,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
  });
  if (result.ok || result.error !== "AUTHORITY_PUBLICATION_NOT_SCHEDULED") {
    throw new Error("non-SCHEDULED authority did not fail closed");
  }
}

{
  const staleJob = {
    ...job,
    scheduled_at: "2026-09-30T13:20:00+08:00",
  };
  const stale = {
    ...makeSnapshot(),
    scheduled_at: staleJob.scheduled_at,
  };
  const result = await validateAuthoritySnapshotPayload({
    snapshot: stale,
    job: staleJob,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
  });
  if (result.ok || result.error !== "AUTHORITY_SCHEDULE_STALE") {
    throw new Error("stale schedule window did not fail closed");
  }
}

{
  const expired = makeSnapshot();
  expired.authority_expires_at = "2026-09-30T05:59:59Z";
  const result = await validateAuthoritySnapshotPayload({
    snapshot: expired,
    job,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
  });
  if (result.ok || result.error !== "AUTHORITY_EXPIRY_WINDOW_INVALID") {
    throw new Error("expired authority snapshot did not fail closed");
  }
}

{
  const snapshot = makeSnapshot();
  const db = {
    prepare() {
      return {
        bind() {
          return this;
        },
        async first() {
          return { ...snapshot };
        },
      };
    },
  };

  const loaded = await loadAndValidateStoredAuthority({
    db,
    job,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
    requireFresh: true,
  });

  if (loaded.approved_caption !== CAPTION) {
    throw new Error("stored immutable caption not returned");
  }

  snapshot.authority_expires_at = "2026-09-30T05:59:00Z";
  let expiredError = null;
  try {
    await loadAndValidateStoredAuthority({
      db,
      job,
      governanceRef: GOVERNANCE_REF,
      nowMs: NOW_MS,
      requireFresh: true,
    });
  } catch (error) {
    expiredError = error;
  }

  if (expiredError?.code !== "AUTHORITY_SNAPSHOT_EXPIRED") {
    throw new Error("stored expired authority snapshot was not rejected");
  }

  const historical = await loadAndValidateStoredAuthority({
    db,
    job,
    governanceRef: GOVERNANCE_REF,
    nowMs: NOW_MS,
    requireFresh: false,
  });
  if (historical.approved_caption !== CAPTION) {
    throw new Error("expired immutable snapshot unavailable for reconciliation");
  }
}

{
  const execute = validateExecutePayload({
    job_id: "TEST-AUTHORITY-001",
    governance_ref: GOVERNANCE_REF,
    caption: "caller override",
  });
  if (execute.ok || execute.error !== "CALLER_CAPTION_FORBIDDEN") {
    throw new Error("execute route still accepts caller caption");
  }

  const reconcile = validateReconcilePayload({
    job_id: "TEST-AUTHORITY-001",
    caption: "caller override",
  });
  if (reconcile.ok || reconcile.error !== "CALLER_CAPTION_FORBIDDEN") {
    throw new Error("reconcile route still accepts caller caption");
  }

  if (!validateExecutePayload({
    job_id: "TEST-AUTHORITY-001",
    governance_ref: GOVERNANCE_REF,
  }).ok) {
    throw new Error("execute payload without caption should be valid");
  }

  if (!validateReconcilePayload({
    job_id: "TEST-AUTHORITY-001",
  }).ok) {
    throw new Error("reconcile payload without caption should be valid");
  }
}

console.log("immutable execution authority self-test PASS");
console.log("caption source: stored authority snapshot only");
console.log("caller caption override: rejected");
console.log("fresh SCHEDULED + APPROVED + PASS snapshot: required for new publish writes");
console.log("schedule older than 30 minutes: rejected for new writes");
console.log("expired snapshot: allowed only for reconciliation verification");
