#!/usr/bin/env bash
# One-time setup of a fresh Ubuntu droplet. Run ON the droplet as root:
#
#   DOMAIN=psantani.art REPO=https://github.com/ksydnor/creep.git EDITOR_PASSWORD='...' bash droplet-install.sh
#
# Installs Node 22 and Caddy, clones the repo to /opt/pari-portfolio, builds it,
# runs it as a systemd service on 127.0.0.1:3000, and puts Caddy in front with
# automatic HTTPS. /keystatic (the editor) is behind one password.
set -euo pipefail

: "${DOMAIN:?set DOMAIN, e.g. psantani.art}"
: "${REPO:?set REPO to the git clone URL}"
: "${EDITOR_PASSWORD:?set EDITOR_PASSWORD for the /keystatic login (user: pari)}"
APP_DIR=/opt/pari-portfolio

export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -y -q ca-certificates curl git ufw debian-keyring debian-archive-keyring apt-transport-https

if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y -q nodejs
fi
# The lockfile is written by npm 12; older npm rejects it under `npm ci`.
if [ "$(npm -v | cut -d. -f1)" -lt 12 ]; then
  npm install -g npm@12 --no-audit --no-fund
fi

if ! command -v caddy >/dev/null; then
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -q && apt-get install -y -q caddy
fi

HASH=$(caddy hash-password --plaintext "$EDITOR_PASSWORD")
cat > /etc/caddy/Caddyfile <<CADDY
$DOMAIN {
	basic_auth /keystatic* {
		pari $HASH
	}
	basic_auth /api/keystatic* {
		pari $HASH
	}
	# JSON access log (who hit what, incl. user_id for editor logins); Filebeat ships it.
	log {
		output file /var/log/caddy/access.log {
			roll_size 50mb
			roll_keep 5
		}
		format json
	}
	reverse_proxy 127.0.0.1:3000 {
		# The app records this in its editor audit events.
		header_up X-Auth-User {http.auth.user.id}
	}
}
www.$DOMAIN {
	redir https://$DOMAIN{uri} permanent
}
CADDY
systemctl enable --now caddy
systemctl reload caddy

ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"
git config user.name "Pari Santani"
git config user.email "editor@$DOMAIN"
# Contact-form submissions stay on this machine. Excluded here rather than in
# .gitignore because the editor hides gitignored files.
grep -qx "content/messages/" .git/info/exclude || echo "content/messages/" >> .git/info/exclude
npm ci --no-audit --no-fund
npm run build

cat > /etc/systemd/system/pari-portfolio.service <<UNIT
[Unit]
Description=Pari Santani portfolio
After=network.target

[Service]
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now pari-portfolio

# Editor saves land in this checkout; push them hourly so a dead droplet
# loses at most an hour of edits. deploy.sh does the same before a release.
cat > /etc/systemd/system/pari-portfolio-backup.service <<UNIT
[Unit]
Description=Push content edited in /keystatic to git

[Service]
Type=oneshot
WorkingDirectory=$APP_DIR
ExecStart=/bin/sh -c 'git add -- content public/assets ":!content/messages" && (git commit -qm "Content edits" || true) && git push -q'
UNIT
cat > /etc/systemd/system/pari-portfolio-backup.timer <<UNIT
[Unit]
Description=Hourly content backup

[Timer]
OnCalendar=hourly
RandomizedDelaySec=5min
Persistent=true

[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload
systemctl enable --now pari-portfolio-backup.timer

# Optional: ship the app journal (audit events as JSON lines) and the Caddy
# access log to Elasticsearch. Set ELASTIC_URL (e.g. http://10.116.0.2:9200)
# and ELASTIC_PASSWORD (user "elastic", or set ELASTIC_USER) to enable.
if [ -n "${ELASTIC_URL:-}" ]; then
  if ! command -v filebeat >/dev/null; then
    curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/9.x/apt stable main" > /etc/apt/sources.list.d/elastic-9.x.list
    apt-get update -q && apt-get install -y -q filebeat
  fi
  cat > /etc/filebeat/filebeat.yml <<FILEBEAT
filebeat.config.modules:
  path: \${path.config}/modules.d/*.yml
  reload.enabled: false
filebeat.inputs:
  # App stdout/stderr from systemd. Audit lines are JSON and land under audit.*.
  - type: journald
    id: pari-portfolio-app
    include_matches.match: ["_SYSTEMD_UNIT=pari-portfolio.service"]
    fields: { app: pari-portfolio, stream: app }
    fields_under_root: true
    processors:
      - decode_json_fields:
          fields: ["message"]
          target: "audit"
  # Caddy JSON access log: every request, with user_id for editor logins.
  - type: filestream
    id: pari-portfolio-http
    paths: ["/var/log/caddy/access.log"]
    parsers:
      - ndjson: { target: "caddy", add_error_key: true }
    fields: { app: pari-portfolio, stream: http }
    fields_under_root: true
processors:
  - add_host_metadata: ~
  - add_cloud_metadata: ~
output.elasticsearch:
  hosts: ["$ELASTIC_URL"]
  username: "${ELASTIC_USER:-elastic}"
  password: "${ELASTIC_PASSWORD:?set ELASTIC_PASSWORD when ELASTIC_URL is set}"
FILEBEAT
  chmod 600 /etc/filebeat/filebeat.yml
  systemctl enable --now filebeat
  systemctl restart filebeat
fi

echo "Done. Point $DOMAIN (and www) at this droplet. Editor: https://$DOMAIN/keystatic (user pari)."
