// Cross-job duplicate-publication guard (BUS-140 remediation Phase 5).
//
// job_id = content_id + scheduled_at is deterministic, so a rerun of the same
// slot reuses one runtime identity. A reschedule, however, produces a new
// job_id. This guard makes every new or executing job for a content_id check
// all OTHER jobs for the same content_id and fail closed when any of them has
// evidence that a publication may have happened, or is still able to run.
//
// Allowed (non-blocking) siblings:
// - FAILED jobs whose failure is proven to precede any publish attempt
//   (no PUBLISH_ATTEMPTED / PUBLISHED parent, no PUBLISHED_MEDIA artifact,
//   no remote media id, and a last_error that is not reconciliation-class);
// - SCHEDULED / CLAIMED jobs with no publish evidence whose scheduled_at is
//   older than the 24 h late-recovery ceiling, so they can never execute again.
// Everything else blocks.

export const SIBLING_DEAD_AFTER_MS = 24 * 60 * 60 * 1000;

const RECONCILIATION_ERROR_PATTERN =
  /RECONCILIATION|AMBIGUOUS|REMOTE_ID_RECOVERY|REMOTE_MEDIA|REMOTE_CAPTION|PUBLISHED|PUBLISH_ATTEMPT/i;

const PUBLISH_EVIDENCE_PARENT_STATES = new Set(["PUBLISH_ATTEMPTED", "PUBLISHED"]);

export function classifySiblingJob(job, artifacts, nowMs) {
  const rows = Array.isArray(artifacts) ? artifacts : [];

  if (job.remote_media_id) {
    return { blocking: true, reason: "SIBLING_REMOTE_MEDIA_ID_PRESENT" };
  }
  if (rows.some((row) => row.kind === "PUBLISHED_MEDIA")) {
    return { blocking: true, reason: "SIBLING_PUBLISHED_MEDIA_ARTIFACT" };
  }
  if (
    rows.some(
      (row) => row.kind === "PARENT" && PUBLISH_EVIDENCE_PARENT_STATES.has(String(row.state))
    )
  ) {
    return { blocking: true, reason: "SIBLING_PUBLISH_ATTEMPTED" };
  }

  switch (job.state) {
    case "PUBLISHED":
      return { blocking: true, reason: "SIBLING_PUBLISHED" };
    case "PUBLISHING":
      return { blocking: true, reason: "SIBLING_PUBLISHING" };
    case "FAILED":
      if (RECONCILIATION_ERROR_PATTERN.test(String(job.last_error ?? ""))) {
        return { blocking: true, reason: "SIBLING_RECONCILIATION_REQUIRED" };
      }
      return { blocking: false, reason: "SIBLING_FAILED_BEFORE_PUBLISH_ATTEMPT" };
    case "SCHEDULED":
    case "CLAIMED": {
      const scheduledMs = Date.parse(job.scheduled_at);
      if (Number.isFinite(scheduledMs) && scheduledMs + SIBLING_DEAD_AFTER_MS < nowMs) {
        return { blocking: false, reason: "SIBLING_EXPIRED_WITHOUT_PUBLISH_EVIDENCE" };
      }
      return { blocking: true, reason: "SIBLING_STILL_EXECUTABLE" };
    }
    default:
      return { blocking: true, reason: "SIBLING_STATE_UNKNOWN" };
  }
}

export async function findBlockingSiblingJob(db, { contentId, excludeJobId, nowMs }) {
  const response = await db.prepare(
    `SELECT id, state, scheduled_at, remote_media_id, last_error
       FROM publication_jobs
      WHERE content_id = ?1
        AND id != ?2`
  ).bind(contentId, excludeJobId ?? "").all();

  for (const sibling of response.results || []) {
    const artifacts = await db.prepare(
      `SELECT kind, slot, state
         FROM publication_job_remote_artifacts
        WHERE job_id = ?1`
    ).bind(sibling.id).all();

    const verdict = classifySiblingJob(sibling, artifacts.results || [], nowMs);
    if (verdict.blocking) {
      return { job_id: sibling.id, state: sibling.state, reason: verdict.reason };
    }
  }

  return null;
}
