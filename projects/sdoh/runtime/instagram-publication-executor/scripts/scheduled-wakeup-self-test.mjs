import assert from "node:assert/strict";
import { dispatchScheduledPublicationWakeup } from "../src/scheduled-wakeup.js";

async function run() {
  let calls = 0;
  const disabledFetch = async () => {
    calls += 1;
    return new Response(null, { status: 204 });
  };
  const disabled = await dispatchScheduledPublicationWakeup(
    { SCHEDULED_WAKEUP_ENABLED: "false", GITHUB_WORKFLOW_DISPATCH_TOKEN: "token" },
    disabledFetch
  );
  assert.equal(disabled.skipped, true);
  assert.equal(calls, 0);

  await assert.rejects(
    () => dispatchScheduledPublicationWakeup({ SCHEDULED_WAKEUP_ENABLED: "true" }, disabledFetch),
    /GITHUB_WORKFLOW_DISPATCH_TOKEN is required/
  );

  let captured;
  const okFetch = async (url, options) => {
    captured = { url, options };
    return new Response(null, { status: 204 });
  };
  const ok = await dispatchScheduledPublicationWakeup(
    { SCHEDULED_WAKEUP_ENABLED: "true", GITHUB_WORKFLOW_DISPATCH_TOKEN: "secret-token" },
    okFetch
  );
  assert.equal(ok.dispatched, true);
  assert.equal(
    captured.url,
    "https://api.github.com/repos/BillyProject2505/content-os/actions/workflows/sdoh-scheduled-publication-orchestrator.yml/dispatches"
  );
  assert.equal(captured.options.method, "POST");
  assert.equal(captured.options.headers.Authorization, "Bearer secret-token");
  const payload = JSON.parse(captured.options.body);
  assert.deepEqual(payload, {
    ref: "main",
    inputs: {
      content_id: "",
      confirmation: "RUN_DUE_SCHEDULED_PUBLICATION",
      worker_base_url: "https://sdoh-instagram-publication-executor.billyfernando2505.workers.dev",
      wake_source: "cloudflare-cron",
    },
  });

  const failFetch = async () => new Response("denied", { status: 403 });
  await assert.rejects(
    () =>
      dispatchScheduledPublicationWakeup(
        { SCHEDULED_WAKEUP_ENABLED: "true", GITHUB_WORKFLOW_DISPATCH_TOKEN: "token" },
        failFetch
      ),
    /HTTP 403/
  );

  console.log("scheduled wake-up self-test PASS");
  console.log("disabled wake-up makes no network call PASS");
  console.log("enabled wake-up dispatches BUS-140 without content authority PASS");
  console.log("GitHub dispatch failure is fail-closed PASS");
}

run();
