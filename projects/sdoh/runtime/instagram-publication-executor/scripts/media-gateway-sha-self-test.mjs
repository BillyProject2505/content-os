// BUS-140 remediation Phase 6 — media gateway SHA-256 verification tests.
import { fetchVerifiedDriveMedia } from "../src/media-gateway.js";
import { createHash } from "node:crypto";

const BYTES = new TextEncoder().encode("exact approved jpeg bytes");
const GOOD_SHA = createHash("sha256").update(BYTES).digest("hex");

function driveReply(body, { status = 200, type = "image/jpeg" } = {}) {
  return async () =>
    new Response(body, { status, headers: type ? { "Content-Type": type } : {} });
}

const base = {
  fileId: "drive-file-1",
  accessToken: "drive-token",
  mimeType: "image/jpeg",
  expectedSha256: GOOD_SHA,
};

const checks = [];

{
  const result = await fetchVerifiedDriveMedia({ ...base, fetchImpl: driveReply(BYTES) });
  if (!result.ok || Buffer.compare(Buffer.from(result.bytes), Buffer.from(BYTES)) !== 0) {
    throw new Error("valid SHA must serve the exact bytes");
  }
  checks.push("valid SHA → exact bytes served");
}

{
  const result = await fetchVerifiedDriveMedia({
    ...base,
    fetchImpl: driveReply(new TextEncoder().encode("replaced bytes")),
  });
  if (result.ok || result.status !== 409 || result.error !== "MEDIA_SHA_MISMATCH" || result.bytes) {
    throw new Error("wrong SHA must fail closed with no bytes");
  }
  checks.push("wrong SHA → 409 MEDIA_SHA_MISMATCH, no bytes served");
}

{
  const result = await fetchVerifiedDriveMedia({
    ...base,
    fetchImpl: driveReply(JSON.stringify({ error: "notFound" }), { status: 404, type: "application/json" }),
  });
  if (result.ok || result.error !== "DRIVE_MEDIA_FETCH_FAILED") {
    throw new Error("missing file must fail closed");
  }
  checks.push("missing file (404) → DRIVE_MEDIA_FETCH_FAILED");
}

{
  const result = await fetchVerifiedDriveMedia({
    ...base,
    fetchImpl: driveReply(JSON.stringify({ error: "forbidden" }), { status: 403, type: "application/json" }),
  });
  if (result.ok || result.error !== "DRIVE_MEDIA_FETCH_FAILED") {
    throw new Error("permission missing must fail closed");
  }
  checks.push("Drive permission missing (403) → DRIVE_MEDIA_FETCH_FAILED");
}

{
  const hanging = (url, { signal }) =>
    new Promise((_, reject) => {
      signal.addEventListener("abort", () => reject(new Error("aborted")));
    });
  const result = await fetchVerifiedDriveMedia({ ...base, fetchImpl: hanging, timeoutMs: 50 });
  if (result.ok || result.status !== 504 || result.error !== "DRIVE_MEDIA_TIMEOUT") {
    throw new Error("Drive timeout must fail closed with 504");
  }
  checks.push("Drive timeout → 504 DRIVE_MEDIA_TIMEOUT");
}

{
  const result = await fetchVerifiedDriveMedia({
    ...base,
    fetchImpl: driveReply(BYTES, { type: "image/png" }),
  });
  if (result.ok || result.error !== "DRIVE_MEDIA_TYPE_MISMATCH") {
    throw new Error("content-type mismatch must fail closed");
  }
  checks.push("content-type mismatch → DRIVE_MEDIA_TYPE_MISMATCH");
}

{
  const result = await fetchVerifiedDriveMedia({
    ...base,
    maxBytes: 4,
    fetchImpl: driveReply(BYTES),
  });
  if (result.ok) throw new Error("oversized media must fail closed");
  checks.push("oversized media → fail closed");
}

console.log("media gateway SHA-256 verification self-test PASS");
for (const line of checks) console.log(`  ${line}`);
