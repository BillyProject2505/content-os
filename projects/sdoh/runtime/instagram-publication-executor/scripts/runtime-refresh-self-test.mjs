import { validateRefreshPayload } from "../src/refresh-bridge.js";

const valid = {
  job_id: "TEST-JOB-001",
  drive_access_token: "x".repeat(64),
  drive_token_expires_at: "2026-10-01T14:30:00Z",
  governance_ref: "a".repeat(40),
  authority_snapshot: { content_id: "SDOH-BURGUNDY-CAR-0099" },
};

if (!validateRefreshPayload(valid).ok) {
  throw new Error("valid refresh payload rejected");
}

const bad = { ...valid, governance_ref: "invalid" };
const result = validateRefreshPayload(bad);
if (result.ok || result.error !== "INVALID_GOVERNANCE_REF") {
  throw new Error("invalid governance ref did not fail closed");
}

console.log("runtime refresh payload self-test PASS");
