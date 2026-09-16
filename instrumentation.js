// Next calls these hooks in the server runtime. Both log JSON lines through
// lib/log.js, so startup and every server-side request error reach
// Elasticsearch as structured documents instead of plain stack traces.
import { log } from "./lib/log";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    log("info", "app.start", { node: process.version, env: process.env.NODE_ENV });
  }
}

export async function onRequestError(error, request, context) {
  log("error", "request.error", {
    message: error?.message ?? String(error),
    // The first frames are enough to find the site of the throw.
    stack: error?.stack?.split("\n").slice(0, 6).join("\n"),
    digest: error?.digest,
    method: request.method,
    path: request.path,
    route: context.routePath,
    routeType: context.routeType,
    routerKind: context.routerKind,
    renderSource: context.renderSource
  });
}
