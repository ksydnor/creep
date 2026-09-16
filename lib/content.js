// The single seam between the site and its content. Components and pages
// import from here, never from the content files directly.
import { createReader } from "@keystatic/core/reader";
import config, { headingDefaults } from "../keystatic.config";
import { embedUrl } from "./embed.mjs";

const reader = createReader(process.cwd(), config);

// Reproduces the object shape every component was written against.
function mapProject(slug, entry) {
  const cover = entry.coverImage;
  const thumb = entry.thumbnail ? { image: entry.thumbnail, alt: entry.thumbnailAlt } : cover;
  return {
    slug,
    title: entry.title,
    order: entry.order,
    category: entry.category,
    course: entry.course || undefined,
    year: entry.year || undefined,
    tools: entry.tools.filter(Boolean),
    shortDescription: entry.shortDescription,
    longDescription: entry.longDescription,
    coverImage: cover.image,
    coverImageAlt: cover.alt || entry.title,
    thumbnail: thumb.image,
    thumbnailAlt: thumb.alt || entry.title,
    featured: entry.featured,
    accent: entry.accent,
    tone: entry.tone,
    layout: entry.layout,
    moduleEyebrow: entry.moduleEyebrow || undefined,
    moduleTitle: entry.moduleTitle || undefined,
    moduleBody: entry.moduleBody || undefined,
    heroObjectPosition: entry.heroObjectPosition || undefined,
    heroImageTransform: entry.heroImageTransform || undefined,
    videoEmbed: embedUrl(entry.videoUrl),
    links: (entry.links || []).filter((l) => l.url),
    pdf: entry.pdf || undefined,
    media: entry.gallery
      .filter((g) => g.image)
      .map((g) => ({ src: g.image, alt: g.alt || "", caption: g.caption || undefined, type: "image" })),
    sections: entry.sections.map((s) => ({
      title: s.title,
      body: s.body || undefined,
      image: s.image || undefined,
      alt: s.image ? s.alt || s.title : undefined
    }))
  };
}

export async function getProjects() {
  const entries = await reader.collections.projects.all();
  return entries
    .filter(({ entry }) => !entry.draft)
    .map(({ slug, entry }) => mapProject(slug, entry))
    .filter((p) => p.coverImage)
    .sort((a, b) => a.order - b.order)
    .map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));
}

export async function getPages() {
  const entries = await reader.collections.pages.all();
  return entries
    .map(({ slug, entry }) => ({ slug, title: entry.title, description: entry.description || undefined, showInNav: entry.showInNav, navOrder: entry.navOrder ?? 1 }))
    .sort((a, b) => a.navOrder - b.navOrder || a.title.localeCompare(b.title));
}

export async function getNavPages() {
  return (await getPages()).filter((p) => p.showInNav);
}

// Returns the page plus its Markdoc node; the route turns that into React.
export async function getPageBySlug(slug) {
  const entry = await reader.collections.pages.read(slug);
  if (!entry) return undefined;
  const { node } = await entry.body();
  return { slug, title: entry.title, description: entry.description || undefined, node };
}

export async function getSiteSettings() {
  const s = await reader.singletons.site.read({ resolveLinkedFiles: true });
  return {
    name: s.name,
    url: s.url,
    title: s.title,
    subtitle: s.subtitle || undefined,
    eyebrow: s.eyebrow || undefined,
    description: s.description,
    statement: s.statement || undefined,
    bio: s.bio || undefined,
    school: s.school || undefined,
    email: s.email || undefined,
    socials: { instagram: s.instagram || undefined },
    headshot: s.headshot || undefined,
    headshotAlt: s.headshotAlt || s.name,
    cv: s.cv || undefined,
    heroImage: s.heroImage.image,
    heroImageAlt: s.heroImage.alt || s.name,
    headings: Object.fromEntries(Object.entries(headingDefaults).map(([key, fallback]) => [key, s.headings?.[key] || fallback]))
  };
}

export async function getProjectBySlug(slug) {
  return (await getProjects()).find((project) => project.slug === slug);
}

export async function getPreviousProject(slug) {
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index - 1 + projects.length) % projects.length];
}

export async function getNextProject(slug) {
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
