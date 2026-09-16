// One JSON line per audit event on stdout. systemd captures stdout into the
// journal, Filebeat ships the journal to Elasticsearch and decodes these lines
// into `audit.*` fields (see scripts/droplet-install.sh). Never log message
// bodies or other personal data here.
export function audit(event, data = {}) {
  console.log(JSON.stringify({ audit: event, time: new Date().toISOString(), ...data }));
}

// Caddy forwards the basic-auth username; locally there is none.
export function editorUser(request) {
  return request.headers.get("x-auth-user") || "local";
}

export function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}
