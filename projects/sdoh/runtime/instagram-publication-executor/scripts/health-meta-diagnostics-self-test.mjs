import assert from "node:assert/strict";
import { handleExistingHealth } from "../src/worker.js";

const originalFetch = globalThis.fetch;
const request = new Request("https://sdoh.example.workers.dev/health");
const env = {
  META_ACCESS_TOKEN: "HIGHLY_SENSITIVE_TOKEN",
  META_IG_USER_ID: "123456",
  PUBLISHING_ENABLED: "true",
  SCHEDULED_WAKEUP_ENABLED: "true",
};
const test = async (mockFetch, expectedStatus) => {
  globalThis.fetch = mockFetch;
  try {
    const response = await handleExistingHealth(request, env);
    assert.equal(response.status, expectedStatus);
    return response.json();
  } finally {
    globalThis.fetch = originalFetch;
  }
};

const denied = await test(async () => Response.json({
  error: { code: 190, error_subcode: 463, type: "OAuthException",
    message: "Access token HIGHLY_SENSITIVE_TOKEN expired", trace_id: "private" },
}, { status: 401 }), 502);
assert.deepEqual(denied.upstream, {
  http_status: 401, code: 190, subcode: 463, type: "OAuthException",
});
assert.equal(denied.ok, false);
assert.equal(denied.publishing_enabled, false);
assert.equal(JSON.stringify(denied).includes("HIGHLY_SENSITIVE_TOKEN"), false);
assert.equal(JSON.stringify(denied).includes("private"), false);

const unknown = await test(async () => Response.json({
  error: { code: 999, error_subcode: 5, type: "SomePrivateError",
    message: "NEVER_LOG_ME" },
}, { status: 429 }), 502);
assert.equal(unknown.upstream.http_status, 429);
assert.equal(unknown.upstream.type, null);
assert.equal(JSON.stringify(unknown).includes("NEVER_LOG_ME"), false);

const network = await test(async () => { throw new Error("do not expose"); }, 500);
assert.equal(network.instagram, "unavailable");
assert.equal(network.upstream, undefined);

const healthy = await test(async () => Response.json({
  user_id: "123456", username: "satudosisobathati", account_type: "BUSINESS",
}), 200);
assert.equal(healthy.ok, true);
assert.equal(healthy.publishing_enabled, true);
assert.equal(healthy.upstream, undefined);

const mismatch = await test(async () => Response.json({
  user_id: "different", username: "satudosisobathati", account_type: "BUSINESS",
}), 200);
assert.equal(mismatch.ok, false);
assert.equal(mismatch.publishing_enabled, false);
console.log("Health Meta diagnostics PASS: upstream allowlist, no credentials/messages, network + account mismatch guards.");
