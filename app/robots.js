import { getSiteSettings } from "@/lib/content";

export default async function robots() {
  const site = await getSiteSettings();
  const base = site.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        // Uploaded images are served under /api, so that path stays crawlable
        // while the admin and the rest of the REST surface do not.
        allow: ["/", "/api/media/file/"],
        disallow: ["/admin", "/api"]
      }
    ],
    sitemap: `${base}/sitemap.xml`
  };
}
