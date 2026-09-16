import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import sharp from "sharp";
import { Media } from "./cms/Media.js";
import { Projects } from "./cms/Projects.js";
import { Users } from "./cms/Users.js";
import { SiteSettings } from "./cms/SiteSettings.js";
import { migrations } from "./migrations/index.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// This value is public; it lives in the repo. It exists only so `next dev`, a
// local `next build` and the Payload CLI work without an env file.
const DEV_SECRET = "insecure-dev-secret-change-me";

// `next build` also runs with NODE_ENV=production but never signs a session, so
// the build keeps the fallback; a real server must not.
const isProductionServer =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE !== "phase-production-build";

// Deployment is manual env-var entry with no validation step, so a missed field
// would otherwise sign admin sessions with a constant anyone can read. Refuse to
// boot instead.
if (isProductionServer && (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET === DEV_SECRET)) {
  throw new Error(
    "PAYLOAD_SECRET is missing or still set to the development default. Set it to a long random string in the server's .env file and restart; the site will not start without it."
  );
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || DEV_SECRET,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${path.resolve(dirname, "content.db")}`
    },
    // The adapter only pushes schema changes in development. A real server
    // applies the committed migrations at boot instead; `next build` also runs
    // with NODE_ENV=production but against a throwaway database, so it is
    // excluded by the same check as the secret.
    ...(isProductionServer ? { prodMigrations: migrations } : {})
  }),
  sharp,
  collections: [Projects, Media, Users],
  globals: [SiteSettings],
  admin: {
    user: "users",
    meta: {
      titleSuffix: " · Pari Santani Portfolio"
    }
  },
  telemetry: false
});
