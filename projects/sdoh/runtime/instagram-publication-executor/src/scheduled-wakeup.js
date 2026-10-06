const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_REPOSITORY = "BillyProject2505/content-os";
const GITHUB_WORKFLOW_FILE = "sdoh-scheduled-publication-orchestrator.yml";

export async function dispatchScheduledPublicationWakeup(env, fetchImpl = fetch) {
  if (env.SCHEDULED_WAKEUP_ENABLED !== "true") {
    return { skipped: true, reason: "SCHEDULED_WAKEUP_DISABLED" };
  }

  if (!env.GITHUB_WORKFLOW_DISPATCH_TOKEN) {
    throw new Error("GITHUB_WORKFLOW_DISPATCH_TOKEN is required when scheduled wake-up is enabled");
  }

  const response = await fetchImpl(
    `${GITHUB_API_BASE}/repos/${GITHUB_REPOSITORY}/actions/workflows/${GITHUB_WORKFLOW_FILE}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GITHUB_WORKFLOW_DISPATCH_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "sdoh-instagram-publication-executor",
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          content_id: "",
          confirmation: "RUN_DUE_SCHEDULED_PUBLICATION",
          worker_base_url:
            "https://sdoh-instagram-publication-executor.billyfernando2505.workers.dev",
          wake_source: "cloudflare-cron",
        },
      }),
    }
  );

  if (response.status !== 204) {
    const body = await response.text();
    throw new Error(
      `GitHub workflow_dispatch failed with HTTP ${response.status}: ${body.slice(0, 500)}`
    );
  }

  return { dispatched: true };
}
