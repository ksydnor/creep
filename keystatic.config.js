import { createElement } from "react";
import { collection, config, fields, singleton } from "@keystatic/core";

const image = (label, directory, publicPath) =>
  fields.object({
    image: fields.image({ label, directory, publicPath, validation: { isRequired: true } }),
    alt: fields.text({ label: "Describe this image", validation: { isRequired: true } })
  });

const projectImage = (label) => image(label, "public/assets/projects", "/assets/projects/");

// The work index groups by these. Add one here to offer it in the editor.
const categories = ["Typography", "Editorial / Print", "Posters / Exhibition", "Animation / 3D", "Animated GIFs", "Currency / Illustration", "Playing cards"];

// Every section eyebrow and title an editor might want to reword, with the
// wording the site uses when the field is left empty (applied in lib/content.js).
export const headingDefaults = {
  featuredEyebrow: "Featured work",
  featuredTitle: "Recent works",
  indexEyebrow: "Index",
  indexTitle: "Portfolio index.",
  rhythmEyebrow: "Visual rhythm",
  rhythmTitle: "Selected spreads and objects.",
  aboutEyebrow: "About",
  workTitle: "Work Index",
  workEyebrow: "Selected work",
  workSubtitle: "Projects by category.",
  noteEyebrow: "Project note",
  noteTitle: "Context and intention.",
  galleryEyebrow: "Gallery",
  galleryTitle: "Selected visuals."
};

const headingLabel = (key) => key.replace(/([A-Z])/g, " $1").toLowerCase().replace(/^./, (c) => c.toUpperCase());
const headings = fields.object(
  Object.fromEntries(
    Object.entries(headingDefaults).map(([key, fallback]) => [key, fields.text({ label: headingLabel(key), description: `Default: ${fallback}` })])
  ),
  { label: "Section headings", description: "Leave a field empty to keep the default wording." }
);

export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "Pari Santani", mark: () => createElement("img", { src: "/icon.svg", alt: "", width: 24, height: 24 }) } },
  collections: {
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["order", "category", "draft"],
      previewUrl: "/work/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Project title" }, slug: { label: "Web address", description: "The end of the URL: type-specimen becomes /work/type-specimen." } }),
        order: fields.integer({ label: "Order", description: "1 is first. The site follows this order everywhere.", validation: { isRequired: true, min: 1 } }),
        draft: fields.checkbox({ label: "Hide from the site", description: "Tick while a project is unfinished. Untick to publish." }),
        category: fields.select({ label: "Category", options: categories.map((c) => ({ label: c, value: c })), defaultValue: categories[0] }),
        course: fields.text({ label: "Course" }),
        year: fields.text({ label: "Year", validation: { pattern: { regex: /^(\d{4})?$/, message: "Four digits, like 2026" } } }),
        tools: fields.array(fields.text({ label: "Tool" }), { label: "Tools & techniques", itemLabel: (p) => p.value, validation: { length: { min: 1 } } }),
        featured: fields.checkbox({ label: "Show on the homepage" }),
        videoUrl: fields.url({ label: "Video link", description: "A YouTube or Vimeo page address. Shown as a player above the gallery." }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label", validation: { isRequired: true } }),
            url: fields.url({ label: "Address", validation: { isRequired: true } })
          }),
          { label: "Links", description: "Live site, Instagram post, shop...", itemLabel: (p) => p.fields.label.value }
        ),
        pdf: fields.file({ label: "PDF (optional)", description: "Offered as a download on the project page.", directory: "public/assets/projects", publicPath: "/assets/projects/" }),
        accent: fields.text({ label: "Accent colour", description: "Hex code like #e42525.", validation: { isRequired: true, pattern: { regex: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, message: "Enter a hex colour like #e42525" } } }),
        shortDescription: fields.text({ label: "Short description", multiline: true, validation: { isRequired: true } }),
        longDescription: fields.text({ label: "Project note", multiline: true, validation: { isRequired: true } }),
        moduleEyebrow: fields.text({ label: "Highlight label" }),
        moduleTitle: fields.text({ label: "Highlight title" }),
        moduleBody: fields.text({ label: "Highlight text", multiline: true }),
        coverImage: projectImage("Cover image"),
        thumbnail: fields.image({ label: "Thumbnail (optional, the cover is used if empty)", directory: "public/assets/projects", publicPath: "/assets/projects/" }),
        thumbnailAlt: fields.text({ label: "Describe the thumbnail" }),
        gallery: fields.array(
          fields.object({
            image: fields.image({ label: "Image", directory: "public/assets/projects", publicPath: "/assets/projects/", validation: { isRequired: true } }),
            alt: fields.text({ label: "Describe this image", validation: { isRequired: true } }),
            caption: fields.text({ label: "Caption" })
          }),
          { label: "Gallery", itemLabel: (p) => p.fields.caption.value || p.fields.alt.value }
        ),
        sections: fields.array(
          fields.object({
            title: fields.text({ label: "Section title", validation: { isRequired: true } }),
            body: fields.text({ label: "Section text", multiline: true }),
            image: fields.image({ label: "Section image (optional)", directory: "public/assets/projects", publicPath: "/assets/projects/" }),
            alt: fields.text({ label: "Describe this image" })
          }),
          { label: "Story sections", itemLabel: (p) => p.fields.title.value }
        ),
        tone: fields.select({ label: "Tone", options: [{ label: "Dark", value: "dark" }, { label: "Light", value: "light" }], defaultValue: "dark" }),
        layout: fields.select({ label: "Layout", options: ["grid", "progression", "object", "poster"].map((v) => ({ label: v, value: v })), defaultValue: "grid" }),
        heroObjectPosition: fields.text({ label: "Hero crop position", description: "CSS object-position, e.g. center 28%. Leave empty for default." }),
        heroImageTransform: fields.text({ label: "Hero transform", description: "CSS transform, e.g. translateY(5%) scale(1.08). Leave empty for default." })
      }
    })
  },
  singletons: {
    site: singleton({
      label: "Site",
      path: "content/site",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Your name", validation: { isRequired: true } }),
        url: fields.url({ label: "Site address", validation: { isRequired: true } }),
        title: fields.text({ label: "Browser tab title", validation: { isRequired: true } }),
        subtitle: fields.text({ label: "Subtitle" }),
        eyebrow: fields.text({ label: "Header eyebrow" }),
        description: fields.text({ label: "Site description", multiline: true, validation: { isRequired: true } }),
        statement: fields.text({ label: "Portfolio statement", multiline: true }),
        bio: fields.text({ label: "About text", multiline: true, description: "Leave a blank line between paragraphs." }),
        school: fields.text({ label: "School / program" }),
        email: fields.text({ label: "Contact email", validation: { pattern: { regex: /^([^\s@]+@[^\s@]+\.[^\s@]+)?$/, message: "Enter an email address" } } }),
        instagram: fields.url({ label: "Instagram link" }),
        headshot: fields.image({ label: "Photo of you (optional)", directory: "public/assets/site", publicPath: "/assets/site/" }),
        headshotAlt: fields.text({ label: "Describe the photo" }),
        cv: fields.file({ label: "CV (PDF, optional)", directory: "public/assets/site", publicPath: "/assets/site/" }),
        heroImage: image("Homepage hero image", "public/assets/site", "/assets/site/"),
        headings
      }
    })
  }
});
