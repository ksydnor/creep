# syntax=docker/dockerfile:1

# Debian slim rather than Alpine: sharp ships prebuilt glibc binaries for
# linux-x64, and it is load-bearing here for both uploads and next/image.
ARG NODE_IMAGE=node:22-bookworm-slim

# ---------------------------------------------------------------- dependencies
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# --------------------------------------------------------------------- builder
# Also the image used to run the one-off seed: it is the only stage that has the
# Payload CLI, scripts/ and data/ in it.
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
# Payload touches the SQLite file during the build. Send it to /tmp so a 0-byte
# content.db is not traced into .next/standalone and baked into the image at
# /app/content.db, where a missing DATABASE_URI would silently open it and serve
# the data/*.js fallback while the real volume sat unused.
ENV NEXT_TELEMETRY_DISABLED=1 \
    DATABASE_URI=file:/tmp/build-throwaway.db
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NODE_ENV is deliberately not "production" here: next build sets its own phase,
# and payload.config.js only refuses to boot without PAYLOAD_SECRET on a real
# server, so the build needs no secret baked in.
RUN npm run build

# ---------------------------------------------------------------------- runner
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_URI=file:/data/content.db \
    MEDIA_DIR=/data/media

# /data is the only writable path the app needs; it is a mount point at runtime.
RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs \
 && mkdir -p /data/media \
 && chown -R nextjs:nodejs /data

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Emitted by next build with output:"standalone".
CMD ["node", "server.js"]
