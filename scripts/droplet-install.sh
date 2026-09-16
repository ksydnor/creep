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
	reverse_proxy 127.0.0.1:3000
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

echo "Done. Point $DOMAIN (and www) at this droplet. Editor: https://$DOMAIN/keystatic (user pari)."
