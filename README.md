# Pari Santani Portfolio

Editorial portfolio website for **Pari Santani** at [psantani.art](https://psantani.art). Next.js 16 (App Router, plain JS) + Tailwind. Content is plain files in the repo, edited through [Keystatic](https://keystatic.com) at `/keystatic`. No database.

## How content works

- `content/projects/*.yaml`: one file per project. `content/pages/*.mdoc`: editor-made pages served at `/<slug>`. `content/site.yaml`: name, bio, contact links, hero image, section headings.
- `content/messages/*.json`: contact-form submissions written by `app/api/contact`, shown in the editor under Inbox. Never committed: the repo is public. They are kept out by the deploy/backup pathspec and `.git/info/exclude` on the droplet (not `.gitignore`, which would hide them from the editor). Add the same exclude line locally if you test the form.
- `public/assets/`: the images those files point at. Keystatic uploads land here too.
- `keystatic.config.js` defines the fields. `lib/content.js` reads them (Keystatic reader) and hands components the same objects they always used; nothing else touches the files.
- Pages revalidate every minute, so an edit saved in `/keystatic` is live within a minute, no rebuild.
- Backup = git. The deploy script commits anything edited on the server before pulling.

## Local development

```bash
npm install
npm run dev
```

Site at `/`, editor at `/keystatic` (no login locally). `npm run lint`, `npm run build`.

## Deploying (DigitalOcean droplet, plain Node)

**Once, on a fresh Ubuntu droplet** as root, copy `scripts/droplet-install.sh` up and run:

```bash
DOMAIN=psantani.art REPO=https://github.com/ksydnor/creep.git EDITOR_PASSWORD='...' bash droplet-install.sh
```

It installs Node 22 and Caddy, clones the repo to `/opt/pari-portfolio`, builds it, runs it as the `pari-portfolio` systemd service on loopback, and puts Caddy in front with automatic HTTPS. `/keystatic` is behind basic auth (user `pari`, the password you passed). Point the domain's A record (and `www`) at the droplet. The clone needs read access to the repo (public repo, or a deploy key) and push access for content commits.

**Every code release**, after `git push`:

```bash
DROPLET=root@<ip> scripts/deploy.sh
```

It commits content edited on the server, pulls, rebuilds, restarts the service and pushes the content commit back.

Logs: `journalctl -u pari-portfolio -f`. Audit events (editor saves with the files changed and the login user, contact-form outcomes) are JSON lines from `lib/audit.js` in that journal; Caddy writes a JSON access log to `/var/log/caddy/access.log`. With `ELASTIC_URL` and `ELASTIC_PASSWORD` passed to the install script, Filebeat ships both to Elasticsearch: filter on `app: pari-portfolio`, audit fields are under `audit.*`, HTTP fields under `caddy.*`. Change the editor password: rerun the install script, or edit `/etc/caddy/Caddyfile` with a new `caddy hash-password` and `systemctl reload caddy`.

## Editor documentation

`docs/editing-guide.md` is the plain-language guide for Pari.

## Repo map

- `app/(frontend)/`: the public site
- `app/keystatic/`, `app/api/keystatic/`: the editor (generated scaffold)
- `components/`: presentational components; content arrives as props
- `content/`: the content
- `lib/content.js`: the only place that reads it
- `lib/fonts.js`: the one webfont (Archivo, variable width axis)
- `keystatic.config.js`: field definitions
- `scripts/`: droplet setup and release
- `docs/`: the editing guide
