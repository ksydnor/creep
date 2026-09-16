import { getSiteSettings } from "@/lib/content";

export default async function robots() {
  const site = await getSiteSettings();
  const base = site.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/keystatic", "/api"]
      }
    ],
    sitemap: `${base}/sitemap.xml`
  };
}
