import { execSync } from "node:child_process";

// Baked into every log line so errors in Elasticsearch can be tied to a release.
function commit() {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "unknown";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stops `next dev` from writing editor-assistant markdown files into the repo.
  agentRules: false,
  env: { APP_COMMIT: commit() },
  experimental: {
    // app/global-not-found.jsx renders its own document instead of being
    // wrapped in a default root layout (which would nest a second <html>).
    globalNotFound: true
  },
  images: {
    // dangerouslyAllowSVG stays off, so an uploaded SVG never reaches the optimizer.
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;
