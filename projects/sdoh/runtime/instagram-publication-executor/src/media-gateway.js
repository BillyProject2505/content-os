import { decryptDriveToken } from "./prepare-bridge.js";

const encoder = new TextEncoder();
const MAX_SIGNED_URL_TTL_SECONDS = 15 * 60;
const MEDIA_ALLOWED_STATES = new Set(["CLAIMED", "PUBLISHING"]);
const ALLOWED_MIME_TYPES = new Set(["image/jpeg"]);
const MAX_MEDIA_BYTES = 10 * 1024 * 1024;
const DRIVE_FETCH_TIMEOUT_MS = 20_000;

export async function handleMediaRequest(request, env) {
  if (request.method !== "GET") {
    return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405, {
      Allow: "GET",
    });
  }

  if (!env.DB || !env.MEDIA_SIGNING_SECRET || !env.EXECUTION_CREDENTIAL_KEY) {
    return json({ ok: false, error: "MEDIA_GATEWAY_NOT_CONFIGURED" }, 503);
  }

  const url = new URL(request.url);
  const route = parseMediaPath(url.pathname);

  if (!route) {
    return json({ ok: false, error: "NOT_FOUND" }, 404);
  }

  const expRaw = url.searchParams.get("exp");
  const sigRaw = url.searchParams.get("sig");
  const exp = Number(expRaw);

  if (
    !expRaw ||
    !sigRaw ||
    !Number.isSafeInteger(exp) ||
    exp <= 0
  ) {
    return json({ ok: false, error: "INVALID_MEDIA_SIGNATURE" }, 403);
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  if (
    exp <= nowSeconds ||
    exp > nowSeconds + MAX_SIGNED_URL_TTL_SECONDS
  ) {
    return json({ ok: false, error: "MEDIA_URL_EXPIRED" }, 403);
  }

  const signatureValid = await verifyMediaSignature({
    jobId: route.jobId,
    slot: route.slot,
    exp,
    providedSignature: sigRaw,
    secretHex: env.MEDIA_SIGNING_SECRET,
  });

  if (!signatureValid) {
    return json({ ok: false, error: "INVALID_MEDIA_SIGNATURE" }, 403);
  }

  const row = await env.DB.prepare(
    `SELECT
       p.state,
       p.governance_ref,
       m.drive_file_id,
       m.mime_type,
       m.expected_sha256,
       e.drive_token_ciphertext,
       e.drive_token_expires_at
     FROM publication_jobs p
     JOIN publication_job_media m
       ON m.job_id = p.id
     JOIN execution_credentials e
       ON e.job_id = p.id
     WHERE p.id = ?1
       AND m.slot = ?2
     LIMIT 1`
  )
    .bind(route.jobId, route.slot)
    .first();

  if (!row) {
    return json({ ok: false, error: "MEDIA_NOT_AVAILABLE" }, 404);
  }

  if (!MEDIA_ALLOWED_STATES.has(row.state)) {
    return json({ ok: false, error: "MEDIA_STATE_REJECTED" }, 409);
  }

  if (
    typeof row.governance_ref !== "string" ||
    !/^[0-9a-f]{40}$/i.test(row.governance_ref)
  ) {
    return json({ ok: false, error: "INVALID_GOVERNANCE_REF" }, 409);
  }

  if (!ALLOWED_MIME_TYPES.has(row.mime_type)) {
    return json({ ok: false, error: "MEDIA_TYPE_REJECTED" }, 415);
  }

  const credentialExpiryMs = Date.parse(row.drive_token_expires_at);
  if (!Number.isFinite(credentialExpiryMs) || credentialExpiryMs <= Date.now()) {
    return json({ ok: false, error: "DRIVE_CREDENTIAL_EXPIRED" }, 401);
  }

  let driveAccessToken;
  try {
    driveAccessToken = await decryptDriveToken({
      envelope: row.drive_token_ciphertext,
      keyHex: env.EXECUTION_CREDENTIAL_KEY,
      jobId: route.jobId,
      governanceRef: row.governance_ref,
      expiresAt: row.drive_token_expires_at,
    });
  } catch {
    return json({ ok: false, error: "DRIVE_CREDENTIAL_UNAVAILABLE" }, 500);
  }

  if (
    typeof row.expected_sha256 !== "string" ||
    !/^[0-9a-f]{64}$/i.test(row.expected_sha256)
  ) {
    driveAccessToken = undefined;
    return json({ ok: false, error: "MEDIA_AUTHORITY_SHA_MISSING" }, 409);
  }

  // Phase 6: fetch the exact Drive bytes, hash them, and serve only when the
  // SHA-256 equals the execution authority. No byte is sent before the hash
  // check passes.
  let verified;
  try {
    verified = await fetchVerifiedDriveMedia({
      fileId: row.drive_file_id,
      accessToken: driveAccessToken,
      mimeType: row.mime_type,
      expectedSha256: row.expected_sha256,
    });
  } finally {
    driveAccessToken = undefined;
  }

  if (!verified.ok) {
    return json({ ok: false, error: verified.error }, verified.status);
  }

  return new Response(verified.bytes, {
    status: 200,
    headers: {
      "Content-Type": row.mime_type,
      "Content-Length": String(verified.bytes.byteLength),
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function fetchVerifiedDriveMedia({
  fileId,
  accessToken,
  mimeType,
  expectedSha256,
  fetchImpl = fetch,
  timeoutMs = DRIVE_FETCH_TIMEOUT_MS,
  maxBytes = MAX_MEDIA_BYTES,
}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let upstream;
  let bytes;
  try {
    upstream = await fetchImpl(
      `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: mimeType,
        },
        redirect: "follow",
        signal: controller.signal,
      }
    );

    if (!upstream.ok || !upstream.body) {
      return { ok: false, status: 502, error: "DRIVE_MEDIA_FETCH_FAILED" };
    }

    const upstreamType = normalizeContentType(upstream.headers.get("Content-Type"));
    if (upstreamType && upstreamType !== mimeType) {
      try {
        await upstream.body.cancel();
      } catch {
        // Best-effort cancellation only.
      }
      return { ok: false, status: 502, error: "DRIVE_MEDIA_TYPE_MISMATCH" };
    }

    const declared = Number(upstream.headers.get("Content-Length") || "0");
    if (Number.isFinite(declared) && declared > maxBytes) {
      try {
        await upstream.body.cancel();
      } catch {
        // Best-effort cancellation only.
      }
      return { ok: false, status: 413, error: "DRIVE_MEDIA_TOO_LARGE" };
    }

    bytes = await upstream.arrayBuffer();
  } catch {
    return {
      ok: false,
      status: controller.signal.aborted ? 504 : 502,
      error: controller.signal.aborted ? "DRIVE_MEDIA_TIMEOUT" : "DRIVE_MEDIA_FETCH_FAILED",
    };
  } finally {
    clearTimeout(timer);
  }

  if (bytes.byteLength === 0 || bytes.byteLength > maxBytes) {
    return { ok: false, status: 502, error: "DRIVE_MEDIA_SIZE_INVALID" };
  }

  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const actual = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  if (actual !== String(expectedSha256).toLowerCase()) {
    return { ok: false, status: 409, error: "MEDIA_SHA_MISMATCH" };
  }

  return { ok: true, bytes };
}

export async function createSignedMediaUrl({
  origin,
  jobId,
  slot,
  expiresAt,
  secretHex,
}) {
  if (!/^https:\/\//i.test(origin)) {
    throw new Error("media origin must use HTTPS");
  }

  if (!isValidJobId(jobId) || !isValidSlot(slot)) {
    throw new Error("invalid media route");
  }

  const exp = Number(expiresAt);
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (
    !Number.isSafeInteger(exp) ||
    exp <= nowSeconds ||
    exp > nowSeconds + MAX_SIGNED_URL_TTL_SECONDS
  ) {
    throw new Error("invalid media expiry");
  }

  const signature = await signMediaRoute({
    jobId,
    slot,
    exp,
    secretHex,
  });

  const base = origin.replace(/\/+$/, "");
  return `${base}/media/${encodeURIComponent(jobId)}/${slot}?exp=${exp}&sig=${encodeURIComponent(signature)}`;
}

function parseMediaPath(pathname) {
  const match = /^\/media\/([^/]+)\/(\d+)$/.exec(pathname);
  if (!match) return null;

  let jobId;
  try {
    jobId = decodeURIComponent(match[1]);
  } catch {
    return null;
  }

  const slot = Number(match[2]);

  if (!isValidJobId(jobId) || !isValidSlot(slot)) {
    return null;
  }

  return { jobId, slot };
}

function isValidJobId(value) {
  return (
    typeof value === "string" &&
    /^[A-Za-z0-9._:-]{1,128}$/.test(value)
  );
}

function isValidSlot(value) {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

async function verifyMediaSignature({
  jobId,
  slot,
  exp,
  providedSignature,
  secretHex,
}) {
  let providedBytes;
  try {
    providedBytes = fromBase64Url(providedSignature);
  } catch {
    return false;
  }

  const expectedBytes = await signMediaRouteBytes({
    jobId,
    slot,
    exp,
    secretHex,
  });

  if (providedBytes.byteLength !== expectedBytes.byteLength) {
    return false;
  }

  return crypto.subtle.timingSafeEqual(providedBytes, expectedBytes);
}

async function signMediaRoute({ jobId, slot, exp, secretHex }) {
  const signature = await signMediaRouteBytes({
    jobId,
    slot,
    exp,
    secretHex,
  });
  return toBase64Url(signature);
}

async function signMediaRouteBytes({ jobId, slot, exp, secretHex }) {
  const key = await importHmacKey(secretHex);
  const input = encoder.encode(
    `v1\nGET\n/media/${jobId}/${slot}\n${exp}`
  );

  const signature = await crypto.subtle.sign("HMAC", key, input);
  return new Uint8Array(signature);
}

async function importHmacKey(keyHex) {
  if (!/^[0-9a-fA-F]{64}$/.test(String(keyHex))) {
    throw new Error("invalid media signing key");
  }

  return crypto.subtle.importKey(
    "raw",
    fromHex(keyHex),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign", "verify"]
  );
}

function normalizeContentType(value) {
  if (!value) return null;
  return value.split(";", 1)[0].trim().toLowerCase();
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
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error("invalid base64url");
  }

  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const normalized = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
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
