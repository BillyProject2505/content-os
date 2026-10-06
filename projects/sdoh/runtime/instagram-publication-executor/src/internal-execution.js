import {
  executeCarouselPublication,
  reconcileCarouselPublication,
} from "./instagram-carousel-executor.js";

const encoder = new TextEncoder();
const MAX_BODY_BYTES = 8 * 1024;
const SCHEDULED_EXECUTION_MAX_LATENESS_MS = 30 * 60 * 1000;
const LATE_RECOVERY_MAX_LATENESS_MS = 24 * 60 * 60 * 1000;

export async function handleInternalExecute(request, env) {
  const auth = await authorizeJsonRequest(request, env);
  if (auth.response) return auth.response;

  const payload = auth.payload;
  const validation = validateExecutePayload(payload);
  if (!validation.ok) {
    return json({ ok: false, error: validation.error }, 400);
  }

  try {
    let executionEnv = env;

    if (["SCHEDULED", "LATE_RECOVERY"].includes(payload.execution_mode)) {
      const scheduledGate = await authorizeScheduledExecution({
        env,
        jobId: payload.job_id,
        governanceRef: payload.governance_ref,
        nowMs: Date.now(),
        maxLatenessMs: payload.execution_mode === "LATE_RECOVERY"
          ? LATE_RECOVERY_MAX_LATENESS_MS
          : SCHEDULED_EXECUTION_MAX_LATENESS_MS,
      });

      if (!scheduledGate.ok) {
        return json(
          { ok: false, error: scheduledGate.error },
          scheduledGate.status
        );
      }

      executionEnv = {
        ...env,
        PUBLISHING_ENABLED: "true",
      };
    }

    const result = await executeCarouselPublication({
      env: executionEnv,
      jobId: payload.job_id,
      governanceRef: payload.governance_ref,
      origin: new URL(request.url).origin,
      maxScheduleLatenessMs: payload.execution_mode === "LATE_RECOVERY"
        ? LATE_RECOVERY_MAX_LATENESS_MS
        : SCHEDULED_EXECUTION_MAX_LATENESS_MS,
    });

    if (result.status === "PUBLISHING_DISABLED") {
      return json({ ok: false, error: "PUBLISHING_DISABLED" }, 409);
    }

    const status = result.status.startsWith("WAITING_") ? 202 : 200;
    return json({ ok: true, result }, status);
  } catch (error) {
    const body = {
      ok: false,
      error: error?.code || error?.message || "EXECUTION_FAILED",
    };

    if (error?.meta && typeof error.meta === "object") {
      body.meta = {
        stage: error.meta.stage || null,
        slot: Number.isInteger(error.meta.slot) ? error.meta.slot : null,
        method: error.meta.method || null,
        path: error.meta.path || null,
        status: Number.isInteger(error.meta.status) ? error.meta.status : null,
        code: error.meta.code ?? null,
        subcode: error.meta.subcode ?? null,
        type: error.meta.type ?? null,
      };
      if (error.meta.account && typeof error.meta.account === "object") {
        body.meta.account = {
          expected_user_id: String(error.meta.account.expected_user_id ?? ""),
          resolved_user_id: error.meta.account.resolved_user_id ?? null,
          expected_username: String(error.meta.account.expected_username ?? ""),
          resolved_username: error.meta.account.resolved_username ?? null,
        };
      }
      if (typeof error.meta.sibling_job_id === "string") {
        body.meta.sibling_job_id = error.meta.sibling_job_id;
        body.meta.sibling_reason = String(error.meta.sibling_reason ?? "");
      }
    }

    return json(body, Number(error?.httpStatus) || 502);
  }
}

export async function handleInternalReconcile(request, env) {
  const auth = await authorizeJsonRequest(request, env);
  if (auth.response) return auth.response;

  const payload = auth.payload;
  const validation = validateReconcilePayload(payload);
  if (!validation.ok) {
    return json({ ok: false, error: validation.error }, 400);
  }

  try {
    const result = await reconcileCarouselPublication({
      env,
      jobId: payload.job_id,
    });
    return json({ ok: true, result }, 200);
  } catch (error) {
    return json(
      {
        ok: false,
        error: error?.code || error?.message || "RECONCILIATION_FAILED",
      },
      Number(error?.httpStatus) || 502
    );
  }
}

export function validateExecutePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }
  if (Object.prototype.hasOwnProperty.call(payload, "caption")) {
    return { ok: false, error: "CALLER_CAPTION_FORBIDDEN" };
  }
  if (
    typeof payload.job_id !== "string" ||
    typeof payload.governance_ref !== "string"
  ) {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }

  if (
    Object.prototype.hasOwnProperty.call(payload, "execution_mode") &&
    !["MANUAL", "SCHEDULED", "LATE_RECOVERY"].includes(payload.execution_mode)
  ) {
    return { ok: false, error: "INVALID_EXECUTION_MODE" };
  }

  return { ok: true };
}


export function evaluateScheduledExecutionWindow({
  scheduledAt,
  state,
  storedGovernanceRef,
  requestedGovernanceRef,
  scheduledPublishingEnabled,
  manualPublishingEnabled,
  nowMs,
  maxLatenessMs = SCHEDULED_EXECUTION_MAX_LATENESS_MS,
}) {
  if (scheduledPublishingEnabled !== "true") {
    return {
      ok: false,
      status: 409,
      error: "SCHEDULED_PUBLISHING_DISABLED",
    };
  }

  if (manualPublishingEnabled === "true") {
    return {
      ok: false,
      status: 409,
      error: "SCHEDULED_MODE_REQUIRES_MANUAL_WINDOW_CLOSED",
    };
  }

  if (storedGovernanceRef !== requestedGovernanceRef) {
    return {
      ok: false,
      status: 409,
      error: "GOVERNANCE_REF_MISMATCH",
    };
  }

  if (!["CLAIMED", "PUBLISHING"].includes(state)) {
    return {
      ok: false,
      status: 409,
      error: "JOB_STATE_REJECTED",
    };
  }

  const scheduledAtMs = Date.parse(scheduledAt);
  if (!Number.isFinite(scheduledAtMs) || !Number.isFinite(nowMs)) {
    return {
      ok: false,
      status: 409,
      error: "SCHEDULE_INVALID",
    };
  }

  if (nowMs < scheduledAtMs) {
    return {
      ok: false,
      status: 409,
      error: "SCHEDULE_NOT_DUE",
    };
  }

  if (!Number.isFinite(maxLatenessMs) || maxLatenessMs < 0 || maxLatenessMs > LATE_RECOVERY_MAX_LATENESS_MS) {
    return { ok: false, status: 409, error: "SCHEDULE_LATENESS_INVALID" };
  }

  if (nowMs > scheduledAtMs + maxLatenessMs) {
    return {
      ok: false,
      status: 409,
      error: "SCHEDULE_STALE",
    };
  }

  return {
    ok: true,
    status: 200,
    error: null,
  };
}

async function authorizeScheduledExecution({
  env,
  jobId,
  governanceRef,
  nowMs,
  maxLatenessMs = SCHEDULED_EXECUTION_MAX_LATENESS_MS,
}) {
  if (!env?.DB) {
    return {
      ok: false,
      status: 503,
      error: "DB_NOT_CONFIGURED",
    };
  }

  const job = await env.DB.prepare(
    `SELECT id, scheduled_at, state, governance_ref
       FROM publication_jobs
      WHERE id = ?1
      LIMIT 1`
  ).bind(jobId).first();

  if (!job) {
    return {
      ok: false,
      status: 404,
      error: "JOB_NOT_FOUND",
    };
  }

  return evaluateScheduledExecutionWindow({
    scheduledAt: job.scheduled_at,
    state: job.state,
    storedGovernanceRef: job.governance_ref,
    requestedGovernanceRef: governanceRef,
    scheduledPublishingEnabled: env.SCHEDULED_PUBLISHING_ENABLED,
    manualPublishingEnabled: env.PUBLISHING_ENABLED,
    nowMs,
    maxLatenessMs,
  });
}

export function validateReconcilePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }
  if (Object.prototype.hasOwnProperty.call(payload, "caption")) {
    return { ok: false, error: "CALLER_CAPTION_FORBIDDEN" };
  }
  if (typeof payload.job_id !== "string") {
    return { ok: false, error: "INVALID_PAYLOAD" };
  }
  return { ok: true };
}

async function authorizeJsonRequest(request, env) {
  if (request.method !== "POST") {
    return {
      response: json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405, {
        Allow: "POST",
      }),
    };
  }

  if (!env.EXECUTOR_INGEST_SECRET) {
    return {
      response: json({ ok: false, error: "EXECUTION_NOT_CONFIGURED" }, 503),
    };
  }

  const authorization = request.headers.get("Authorization") || "";
  const expectedAuthorization = `Bearer ${env.EXECUTOR_INGEST_SECRET}`;
  if (!(await timingSafeStringEqual(authorization, expectedAuthorization))) {
    return {
      response: json({ ok: false, error: "UNAUTHORIZED" }, 401),
    };
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return {
      response: json({ ok: false, error: "CONTENT_TYPE_REQUIRED" }, 415),
    };
  }

  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return {
      response: json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, 413),
    };
  }

  const rawBody = await request.text();
  if (encoder.encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return {
      response: json({ ok: false, error: "PAYLOAD_TOO_LARGE" }, 413),
    };
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return {
      response: json({ ok: false, error: "INVALID_JSON" }, 400),
    };
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      response: json({ ok: false, error: "INVALID_PAYLOAD" }, 400),
    };
  }

  return { payload };
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
