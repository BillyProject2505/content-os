import {
  executeCarouselPublication,
  reconcileCarouselPublication,
} from "./instagram-carousel-executor.js";

const encoder = new TextEncoder();
const MAX_BODY_BYTES = 8 * 1024;

export async function handleInternalExecute(request, env) {
  const auth = await authorizeJsonRequest(request, env);
  if (auth.response) return auth.response;

  const payload = auth.payload;
  const validation = validateExecutePayload(payload);
  if (!validation.ok) {
    return json({ ok: false, error: validation.error }, 400);
  }

  try {
    const result = await executeCarouselPublication({
      env,
      jobId: payload.job_id,
      governanceRef: payload.governance_ref,
      origin: new URL(request.url).origin,
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
  return { ok: true };
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
