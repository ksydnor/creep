#!/usr/bin/env bash
# Release the current git main to the droplet. Run from your machine after `git push`:
#
#   DROPLET=root@<ip> scripts/deploy.sh
#
# Edits made in /keystatic live in the droplet's checkout, so they are committed
# and pushed back first; git stays the single source of truth and the backup.
set -euo pipefail
: "${DROPLET:?set DROPLET, e.g. root@203.0.113.10}"

ssh "$DROPLET" bash -s <<'REMOTE'
set -euo pipefail
cd /opt/pari-portfolio
# content/messages holds contact-form submissions: never committed (public repo).
git add -- content public/assets ':!content/messages'
git commit -qm "Content edits" || true
# ponytail: one branch, no conflict handling; if a code push and a content edit collide, resolve by hand here.
git pull --rebase -q
npm ci --no-audit --no-fund
npm run build
systemctl restart pari-portfolio
git push -q
sleep 3
curl -fsS http://127.0.0.1:3000/robots.txt >/dev/null && echo "Released."
REMOTE
