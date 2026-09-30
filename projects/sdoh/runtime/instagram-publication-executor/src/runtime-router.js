import { handlePrepare } from "./prepare-bridge.js";
import { handleMediaRequest } from "./media-gateway.js";
import {
  handleInternalExecute,
  handleInternalReconcile,
} from "./internal-execution.js";

/**
 * Route publication-executor runtime endpoints without changing the
 * existing health/readiness behavior.
 *
 * Pass the currently deployed health/readiness handler as fallbackHandler.
 */
export async function routeRuntimeRequest(
  request,
  env,
  fallbackHandler
) {
  const url = new URL(request.url);

  if (url.pathname === "/internal/prepare") {
    return handlePrepare(request, env);
  }

  if (url.pathname === "/internal/execute") {
    return handleInternalExecute(request, env);
  }

  if (url.pathname === "/internal/reconcile") {
    return handleInternalReconcile(request, env);
  }

  if (url.pathname.startsWith("/media/")) {
    return handleMediaRequest(request, env);
  }

  if (typeof fallbackHandler !== "function") {
    return new Response(
      JSON.stringify({ ok: false, error: "NOT_FOUND" }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return fallbackHandler(request, env);
}
