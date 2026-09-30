import { routeRuntimeRequest } from "./runtime-router.js";

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
};
