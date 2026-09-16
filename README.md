# Pari Santani Portfolio

Editorial portfolio website for **Pari Santani** at [psantani.art](https://psantani.art). Next.js 16 (App Router, plain JS) + Tailwind, with content managed by [Payload CMS](https://payloadcms.com) (MIT-licensed, embedded in this app) so the site can be edited without touching code, and without any external content service.

## How content works

Everything runs in this one app, on one server:

- **Payload CMS is embedded**: the editing panel lives at `/admin` on the site's own domain. Content is stored in a SQLite file (`content.db`) and uploaded images in `media/`, both on the server, both gitignored.
- **`lib/content.js` is the single seam**: pages and components never import `data/*` or query Payload directly. It uses Payload's in-process local API (no HTTP), caches results, and busts the cache when anything is published (see `cms/hooks.js`). Pages also revalidate on a one-minute timer, so content written outside the app process (the seed, a restored backup) shows up without a restart.
- **Fallback**: until the database is seeded, `data/projects.js` / `data/site.js` are served so the site always builds. After go-live those files (and the fallback in `lib/content.js`) can be deleted.

Document types (defined in `cms/`): `projects` (drag-to-reorder, draft/publish versions), `media` (images and PDFs with required alt text), `users` (editor logins), and a `site-settings` global (name, bio, school, contact links, headshot, CV, hero image). The displayed "01 / 02" index is derived from the drag order at fetch time.

## Local development

```bash
npm install
cp .env.local.example .env.local  # fill in the secrets: openssl rand -base64 48
npm run seed                      # one-time: moves data/*.js content + images into the CMS
npm run dev
```

Visit `/admin` to create the first user (the form appears automatically), and the site itself at `/`. In development the database schema is pushed automatically from `cms/*.js`.

Build for production: `npm run build`, serve with `npm run start`. If the admin UI ever complains about missing components after schema changes, run `npm run generate:importmap`.

### Schema changes

Production never pushes schema; it applies the migrations in `migrations/` at boot. After changing anything in `cms/`:

```bash
npm run migrate:create -- <name>
```

Rename the generated `.ts` file to `.js`, drop its type annotations (see the existing migration for the shape), delete the regenerated `index.ts`, add the new entry to `migrations/index.js`, and commit the `.json` snapshot alongside it.

## Deploying to DigitalOcean (Docker)

The droplet never builds; it pulls a prebuilt image and runs it. Content edits after that need **no** redeploy; only code changes do.

**On the droplet, once:** install Docker + the Compose plugin, then copy `docker-compose.yml` and `.env.production.example` up, and

```bash
cp .env.production.example .env      # must be named .env, see the file's header
openssl rand -base64 48              # paste into PAYLOAD_SECRET
openssl rand -base64 48              # paste into PREVIEW_SECRET
```

**Build and push from your machine** (droplets are amd64, so pin the platform if you are on Apple silicon):

```bash
IMAGE=registry.digitalocean.com/<registry>/pari-portfolio:latest
docker build --target runner --platform linux/amd64 -t "$IMAGE" .
docker push "$IMAGE"
```

**Release:**

```bash
docker compose pull && docker compose up -d
```

**First deploy only**, in this order:

1. `docker compose up -d` (above). This creates the `portfolio-data` volume with the right ownership and applies the schema.
2. Push the builder stage as its own tag; it is the only image carrying the Payload CLI, `scripts/` and `data/`:
   ```bash
   docker build --target builder --platform linux/amd64 -t "$IMAGE_SEED" . && docker push "$IMAGE_SEED"
   ```
3. Load the `data/*.js` content into the CMS:
   ```bash
   docker compose --profile seed run --rm seed
   ```
4. Visit `https://psantani.art/admin`. The create-first-user form appears on an empty database. The seeded content is live within a minute.

If the admin UI complains about missing components after a schema change, run `npm run generate:importmap` and rebuild the image.

### Persistence, read this before your first deploy

`content.db` and `media/` are the entire site, and they live in the `portfolio-data` volume, not in the image or in git. Both paths are set by environment variables (`DATABASE_URI`, `MEDIA_DIR`) that default to `/data` inside the image; if either is pointed somewhere outside the volume, a redeploy silently discards everything Pari has written.

Back up by archiving the volume:

```bash
docker run --rm -v pari-portfolio_portfolio-data:/data -v "$PWD":/backup \
  busybox tar czf /backup/portfolio-$(date +%F).tar.gz -C /data .
```

Restore by extracting the same archive back into the volume with `app` stopped.

Never copy a `content.db` created by `npm run dev` or `npm run seed` on your machine to the server: development pushes its schema directly, so production would try to re-apply the migrations and stop at a data-loss prompt. Seed on the server instead (step 3 above).

### TLS is not part of this stack

Nothing here terminates HTTPS. `PORT_BIND` defaults to `127.0.0.1:3000`, so the app is reachable only from the droplet itself, deliberately, because publishing it on `0.0.0.0` would serve the admin login over plain HTTP. Put a reverse proxy (Caddy, nginx, a DO load balancer) in front before opening it up, and keep the droplet firewall closed to port 3000.

### Health

`GET /api/health` returns `{status, database}`. It reports `200` whenever the process is alive, including when the database is unreachable: the site falls back to `data/*.js` in that case and is still serving, so failing the check would restart-loop a healthy site. Watch the `database` field rather than the status code.

### Draft previews

The Preview button in the admin panel opens the real site showing unpublished drafts (via `/api/draft`, protected by `PREVIEW_SECRET`). `/api/disable-draft` returns to the live view.

## Editor documentation

`docs/editing-guide.md` is the plain-language guide for Pari: how to log in at `/admin`, edit, add a project, and publish. Keep it current when the collections in `cms/` change.

## Repo map

- `app/(frontend)/`: the public site (App Router)
- `app/(payload)/`: Payload's admin panel + REST routes (generated scaffold)
- `components/`: presentational components; content arrives as props
- `lib/content.js`: the only place that knows where content lives
- `lib/fonts.js`: the one webfont (Archivo, variable width axis)
- `cms/`: Payload collection/global definitions and revalidation hooks
- `migrations/`: database migrations, applied in production at boot
- `payload.config.js`: Payload setup (SQLite, sharp, admin)
- `scripts/seed.mjs`: one-off local-data → CMS migration
- `data/`: fallback content files, used until the CMS is seeded
- `Dockerfile` / `docker-compose.yml`: production image (multi-stage) and the droplet's runtime
- `docs/`: the editing guide for Pari
