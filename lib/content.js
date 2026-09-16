// The single seam between the site and its content source.
// Components and pages must import content from here, never from data/* directly.
//
// Content lives in Payload CMS (embedded in this app, SQLite on disk), queried
// through the in-process local API, no HTTP. Until the database is seeded
// (npm run seed), the data/*.js files are served so the site always builds and
// renders.
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { projects as localProjects } from "@/data/projects";
import { site as localSite } from "@/data/site";
import { CONTENT_TAG } from "./content-tag";

export { CONTENT_TAG };

// draftMode() is only available while rendering a page; generateStaticParams
// and the seed script reach this layer too, so treat "unavailable" as "off".
async function isDraft() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

const mediaUrl = (m) => (m && typeof m === "object" ? m.url : undefined);
const mediaAlt = (m) => (m && typeof m === "object" ? m.alt : undefined);

// Reproduces the exact object shape in data/projects.js so no component
// needs to know where content comes from.
function mapProject(doc) {
  return {
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    course: doc.course,
    year: doc.year,
    tools: (doc.tools || []).map((t) => t.tool).filter(Boolean),
    shortDescription: doc.shortDescription,
    longDescription: doc.longDescription,
    coverImage: mediaUrl(doc.coverImage),
    coverImageAlt: mediaAlt(doc.coverImage) || doc.title,
    thumbnail: mediaUrl(doc.thumbnail) || mediaUrl(doc.coverImage),
    thumbnailAlt: mediaAlt(doc.thumbnail) || mediaAlt(doc.coverImage) || doc.title,
    featured: Boolean(doc.featured),
    accent: doc.accent,
    tone: doc.tone || "dark",
    layout: doc.layout || "grid",
    moduleEyebrow: doc.moduleEyebrow,
    moduleTitle: doc.moduleTitle,
    moduleBody: doc.moduleBody,
    heroObjectPosition: doc.heroObjectPosition || undefined,
    heroImageTransform: doc.heroImageTransform || undefined,
    media: (doc.gallery || [])
      .map((g) => ({
        src: mediaUrl(g.image),
        alt: mediaAlt(g.image) || "",
        caption: g.caption || undefined,
        type: "image"
      }))
      .filter((m) => m.src),
    // A story section may be text-only, so it is never filtered out on a
    // missing image; dropping it would silently delete an editor's copy.
    sections: (doc.sections || []).map((s) => {
      const image = mediaUrl(s.image);
      return {
        title: s.title,
        body: s.body,
        image,
        alt: image ? mediaAlt(s.image) || s.title : undefined
      };
    })
  };
}

function mapSite(doc) {
  return {
    name: doc.name,
    url: doc.url,
    title: doc.title,
    subtitle: doc.subtitle,
    eyebrow: doc.eyebrow,
    description: doc.description,
    statement: doc.statement,
    bio: doc.bio,
    school: doc.school,
    email: doc.email,
    socials: { instagram: doc.instagram || undefined },
    headshot: mediaUrl(doc.headshot),
    headshotAlt: mediaAlt(doc.headshot) || doc.name,
    cv: mediaUrl(doc.cv),
    // The hero is required in the CMS, but the upload behind it can still be
    // deleted; the site keeps its own picture rather than rendering nothing.
    heroImage: mediaUrl(doc.heroImage) || localSite.heroImage,
    heroImageAlt: mediaAlt(doc.heroImage) || localSite.heroImageAlt
  };
}

const withIndex = (projects) =>
  projects.map((project, i) => ({ ...project, index: String(i + 1).padStart(2, "0") }));

async function queryProjects({ draft }) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "projects",
    sort: "_order",
    depth: 1,
    limit: 200,
    draft,
    ...(draft ? {} : { where: { _status: { equals: "published" } } })
  });
  // Every card, hero and link preview renders the cover, so a project whose
  // cover upload was deleted (or a draft saved without one) is left out here
  // rather than crashing each of those places.
  return withIndex(result.docs.map(mapProject).filter((project) => project.coverImage));
}

async function querySite({ draft }) {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({ slug: "site-settings", depth: 1, draft });
  return doc?.name ? mapSite(doc) : null;
}

const logFallback = (what) => (err) => {
  console.error(`[content] ${what} query failed, serving data/*.js instead:`, err?.message || err);
  return null;
};

// Publishing from the admin busts the tag immediately; the timed revalidation
// covers writes made outside this process (the seed, a restored backup).
const cacheOptions = { tags: [CONTENT_TAG], revalidate: 60 };

const getCachedProjects = unstable_cache(
  () => queryProjects({ draft: false }).catch(logFallback("projects")),
  ["cms-projects"],
  cacheOptions
);

const getCachedSite = unstable_cache(
  () => querySite({ draft: false }).catch(logFallback("site settings")),
  ["cms-site"],
  cacheOptions
);

export async function getProjects() {
  const projects = (await isDraft()) ? await queryProjects({ draft: true }) : await getCachedProjects();
  return projects?.length ? projects : localProjects; // empty/unreachable DB → local files
}

export async function getSiteSettings() {
  const site = (await isDraft()) ? await querySite({ draft: true }) : await getCachedSite();
  return site || localSite; // unseeded DB → local files
}

export async function getProjectBySlug(slug) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
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
