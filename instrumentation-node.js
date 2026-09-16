// payload.config.js refuses to load on a production server without
// PAYLOAD_SECRET, but route modules load lazily, so without this the process
// would stay up serving the data/*.js fallback with a dead admin.
export async function checkConfig() {
  try {
    await import("./payload.config.js");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
