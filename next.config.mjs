/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stops `next dev` from writing editor-assistant markdown files into the repo.
  agentRules: false,
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
