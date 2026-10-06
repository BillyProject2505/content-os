import { routeRuntimeRequest } from "./runtime-router.js";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_REPOSITORY = "BillyProject2505/content-os";
const GITHUB_WORKFLOW_FILE = "sdoh-scheduled-publication-orchestrator.yml";

async function dispatchScheduledPublicationWakeup(env) {
  if (env.SCHEDULED_WAKEUP_ENABLED !== "true") {
    return { skipped: true, reason: "SCHEDULED_WAKEUP_DISABLED" };
  }

  if (!env.GITHUB_WORKFLOW_DISPATCH_TOKEN) {
    throw new Error("GITHUB_WORKFLOW_DISPATCH_TOKEN is required when scheduled wake-up is enabled");
  }

  const response = await fetch(
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

// GitHub-connected Cloudflare build source.

async function handleExistingHealth(request, env) {
  const url = new URL(request.url);

  if (url.pathname !== "/health") {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const response = await fetch(
      "https://graph.instagram.com/me?fields=id,user_id,username,account_type",
      {
        headers: {
          Authorization: `Bearer ${env.META_ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          ok: false,
          instagram: "unavailable",
          publishing_enabled: false,
        },
        { status: 502 }
      );
    }

    const userIdMatch =
      String(data.user_id) === String(env.META_IG_USER_ID);

    const accountMatch =
      data.username === "satudosisobathati";

    const publishingEnabled =
      userIdMatch &&
      accountMatch &&
      env.PUBLISHING_ENABLED === "true";

    return Response.json({
      ok: userIdMatch && accountMatch,
      instagram: {
        username: data.username,
        user_id_match: userIdMatch,
        account_type: data.account_type,
      },
      publishing_enabled: publishingEnabled,
    });
  } catch {
    return Response.json(
      {
        ok: false,
        instagram: "unavailable",
        publishing_enabled: false,
      },
      { status: 500 }
    );
  }
}

export default {
  async fetch(request, env) {
    return routeRuntimeRequest(request, env, handleExistingHealth);
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(
      dispatchScheduledPublicationWakeup(env).catch((error) => {
        console.error("Scheduled BUS-140 wake-up failed", {
          message: error instanceof Error ? error.message : String(error),
        });
        throw error;
      })
    );
  },
};
