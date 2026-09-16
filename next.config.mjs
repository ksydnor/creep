import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits .next/standalone with only the traced server dependencies, so the
  // runtime image does not need node_modules or a package install.
  output: "standalone",
  // Stops `next dev` from writing editor-assistant markdown files into the repo.
  agentRules: false,
  experimental: {
    // app/global-not-found.jsx renders its own document instead of being
    // wrapped in a default root layout (which would nest a second <html>).
    globalNotFound: true
  },
  images: {
    // dangerouslyAllowSVG stays off and cms/Media.js rejects SVG uploads, so
    // user-supplied SVG never reaches the optimizer.
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default withPayload(nextConfig);
