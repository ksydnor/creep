// Runs once at server start. The check lives in a separate file so the edge
// bundle never sees the Node-only exit call.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { checkConfig } = await import("./instrumentation-node.js");
    await checkConfig();
  }
}
