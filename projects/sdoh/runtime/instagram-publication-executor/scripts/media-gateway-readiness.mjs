import { createHmac, createHash } from "node:crypto";

function fail(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}

const workerBaseUrl = String(process.env.WORKER_BASE_URL || "").replace(/\/+$/, "");
const jobId = String(process.env.JOB_ID || "");
const slot = Number(process.env.SLOT || "1");
const secretHex = String(process.env.MEDIA_SIGNING_SECRET || "");
const expectedSha256 = String(process.env.EXPECTED_SHA256 || "").toLowerCase();
const expectedBytes = Number(process.env.EXPECTED_BYTES || "0");

if (!/^https:\/\//i.test(workerBaseUrl)) fail("WORKER_BASE_URL must use HTTPS");
if (!/^[A-Za-z0-9._:-]{1,128}$/.test(jobId)) fail("Invalid JOB_ID");
if (!Number.isInteger(slot) || slot < 1 || slot > 5) fail("Invalid SLOT");
if (!/^[0-9a-fA-F]{64}$/.test(secretHex)) fail("MEDIA_SIGNING_SECRET must be 64 hex characters");
if (!/^[0-9a-f]{64}$/.test(expectedSha256)) fail("EXPECTED_SHA256 must be 64 lowercase hex characters");
if (!Number.isSafeInteger(expectedBytes) || expectedBytes <= 0) fail("EXPECTED_BYTES must be a positive integer");

const exp = Math.floor(Date.now() / 1000) + 300;
const canonicalInput = `v1\nGET\n/media/${jobId}/${slot}\n${exp}`;
const signature = createHmac("sha256", Buffer.from(secretHex, "hex"))
  .update(canonicalInput)
  .digest("base64url");

const url = `${workerBaseUrl}/media/${encodeURIComponent(jobId)}/${slot}?exp=${exp}&sig=${encodeURIComponent(signature)}`;

const response = await fetch(url, {
  method: "GET",
  redirect: "follow",
  headers: {
    Accept: "image/jpeg",
  },
});

if (response.status !== 200) {
  let errorCode = "UNKNOWN";
  try {
    const payload = await response.json();
    if (payload && typeof payload.error === "string") errorCode = payload.error;
  } catch {
    // Keep output sanitized.
  }
  fail(`Media gateway returned HTTP ${response.status} (${errorCode})`);
}

const contentType = (response.headers.get("content-type") || "")
  .split(";", 1)[0]
  .trim()
  .toLowerCase();
const cacheControl = (response.headers.get("cache-control") || "").toLowerCase();
const nosniff = (response.headers.get("x-content-type-options") || "").toLowerCase();

if (contentType !== "image/jpeg") fail(`Unexpected Content-Type: ${contentType || "missing"}`);
if (!cacheControl.includes("no-store")) fail("Cache-Control does not include no-store");
if (nosniff !== "nosniff") fail("X-Content-Type-Options is not nosniff");

const bytes = Buffer.from(await response.arrayBuffer());
const actualSha256 = createHash("sha256").update(bytes).digest("hex");

if (bytes.length !== expectedBytes) {
  fail(`Unexpected byte length: ${bytes.length}`);
}
if (actualSha256 !== expectedSha256) {
  fail(`SHA-256 mismatch: ${actualSha256}`);
}

console.log("Signed media gateway readiness PASS");
console.log(`job_id=${jobId}`);
console.log(`slot=${slot}`);
console.log(`content_type=${contentType}`);
console.log(`byte_length=${bytes.length}`);
console.log(`sha256=${actualSha256}`);
console.log("cache_control=no-store");
console.log("x_content_type_options=nosniff");
console.log("Signed URL and signature were not printed.");
console.log("No Meta/Instagram request was made by this readiness workflow.");
