// One JSON line per event on stdout. systemd captures stdout into the journal,
// Filebeat ships the journal to Elasticsearch and decodes these lines into
// `app.*` fields (see scripts/droplet-install.sh). Never log message bodies or
// other personal data.
//
// Every line: level, event, time, commit (the deployed build), plus event data.
const commit = process.env.APP_COMMIT || "dev";

export function log(level, event, data = {}) {
  const line = JSON.stringify({ level, event, time: new Date().toISOString(), commit, ...data });
  (level === "error" ? console.error : console.log)(line);
}

// Audit events: something a person did (editor saves, contact submissions).
export const audit = (event, data) => log("info", event, data);

// Caddy forwards the basic-auth username; locally there is none.
export function editorUser(request) {
  return request.headers.get("x-auth-user") || "local";
}

export function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}
