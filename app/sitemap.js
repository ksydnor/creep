import { getProjects, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

// Project URLs come from the same content seam the pages render from, so a slug
// added or renamed in the CMS cannot drift out of the sitemap.
export default async function sitemap() {
  const [site, projects] = await Promise.all([getSiteSettings(), getProjects()]);
  const base = site.url.replace(/\/+$/, "");
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7
    }))
  ];
}
