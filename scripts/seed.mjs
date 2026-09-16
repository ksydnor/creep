// One-off seed: pushes the content in data/projects.js and data/site.js (plus
// every image they reference under public/) into the Payload database.
//
// Usage:  npm run seed        (wraps: payload run scripts/seed.mjs)
//
// Safe by default: refuses to run if projects already exist in the database.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getPayload } from "payload";
import configModule from "@payload-config";

// Under `payload run` the typeless-CJS config file arrives as { default: config }
// instead of the config itself; unwrap so both runtimes work.
const config = configModule?.default ?? configModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const importDataModule = (relPath) => import(pathToFileURL(path.join(root, relPath)).href);

const uploadCache = new Map();
let payload;

async function uploadMedia(publicPath, alt) {
  if (!publicPath) return null;
  if (uploadCache.has(publicPath)) return uploadCache.get(publicPath);
  // Same list as cms/Media.js; checked here so the failure names the file
  // instead of surfacing as a generic validation error from Payload.
  if (!/\.(jpe?g|png|webp|avif|gif|pdf)$/i.test(publicPath)) {
    throw new Error(`Cannot seed ${publicPath}: the media library accepts JPG, PNG, WebP, AVIF, GIF and PDF only.`);
  }

  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  process.stdout.write(`  uploading ${path.basename(filePath)} ... `);
  const doc = await payload.create({
    collection: "media",
    data: { alt: alt || path.basename(filePath) },
    filePath
  });
  console.log("done");
  uploadCache.set(publicPath, doc.id);
  return doc.id;
}

// Top-level await (this file is .mjs so the runner treats it as ESM) keeps
// `payload run` alive until the seeding finishes; an async main() returns at
// module load and the runner exits before any work happens.
async function main() {
  payload = await getPayload({ config });

  const existing = await payload.count({ collection: "projects" });
  if (existing.totalDocs > 0) {
    console.error(`Database already has ${existing.totalDocs} projects, refusing to seed twice.`);
    process.exit(1);
  }

  const { projects } = await importDataModule("data/projects.js");
  const { site } = await importDataModule("data/site.js");

  for (const p of projects) {
    console.log(`Project ${p.slug}`);

    const gallery = [];
    for (const m of p.media || []) {
      const image = await uploadMedia(m.src, m.alt);
      if (image) gallery.push({ image, caption: m.caption });
    }

    const sections = [];
    for (const s of p.sections || []) {
      sections.push({ title: s.title, body: s.body, image: await uploadMedia(s.image, s.alt) });
    }

    await payload.create({
      collection: "projects",
      draft: false,
      data: {
        _status: "published",
        title: p.title,
        slug: p.slug,
        category: p.category,
        course: p.course,
        year: p.year,
        tools: (p.tools || []).map((tool) => ({ tool })),
        featured: Boolean(p.featured),
        accent: p.accent,
        shortDescription: p.shortDescription,
        longDescription: p.longDescription,
        moduleEyebrow: p.moduleEyebrow,
        moduleTitle: p.moduleTitle,
        moduleBody: p.moduleBody,
        coverImage: await uploadMedia(p.coverImage, p.coverImageAlt || p.thumbnailAlt || p.title),
        thumbnail:
          p.thumbnail && p.thumbnail !== p.coverImage
            ? await uploadMedia(p.thumbnail, p.thumbnailAlt || p.title)
            : null,
        gallery,
        sections,
        tone: p.tone || "dark",
        layout: p.layout || "grid",
        heroObjectPosition: p.heroObjectPosition,
        heroImageTransform: p.heroImageTransform
      }
    });
    console.log("  saved");
  }

  console.log("Site settings");
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: site.name,
      url: site.url,
      title: site.title,
      subtitle: site.subtitle,
      eyebrow: site.eyebrow,
      description: site.description,
      statement: site.statement,
      bio: site.bio,
      school: site.school || undefined,
      email: site.email || undefined,
      instagram: site.socials?.instagram || undefined,
      headshot: site.headshot ? await uploadMedia(site.headshot, site.headshotAlt || site.name) : null,
      cv: site.cv ? await uploadMedia(site.cv, `${site.name} CV`) : null,
      heroImage: await uploadMedia(site.heroImage, site.heroImageAlt || `${site.name} hero image`)
    }
  });

  console.log(`\nSeeded ${projects.length} projects + site settings. Published content appears on the site within a minute.`);
  process.exit(0);
}

await main().catch((err) => {
  console.error(err);
  // Payload validation errors hide the field details one level down.
  if (err?.data?.errors) console.error(JSON.stringify(err.data.errors, null, 2));
  process.exit(1);
});
