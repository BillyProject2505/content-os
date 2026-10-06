import { routeRuntimeRequest } from "./runtime-router.js";

import { dispatchScheduledPublicationWakeup } from "./scheduled-wakeup.js";
import { deploymentInfo } from "./deployment-info.js";

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
          deployment: deploymentInfo(env),
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
      scheduled_wakeup_enabled: env.SCHEDULED_WAKEUP_ENABLED === "true",
      deployment: deploymentInfo(env),
    });
  } catch {
    return Response.json(
      {
        ok: false,
        instagram: "unavailable",
        publishing_enabled: false,
        deployment: deploymentInfo(env),
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
