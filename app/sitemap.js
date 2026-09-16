import { getPages, getProjects, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

// URLs come from the same content seam the pages render from, so a slug
// added or renamed in the CMS cannot drift out of the sitemap.
export default async function sitemap() {
  const [site, projects, pages] = await Promise.all([getSiteSettings(), getProjects(), getPages()]);
  const base = site.url.replace(/\/+$/, "");
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    ...pages.map((page) => ({ url: `${base}/${page.slug}`, lastModified, changeFrequency: "monthly", priority: 0.6 })),
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7
    }))
  ];
}
