import { revalidateContent } from "./hooks.js";

// Drafts are only visible to logged-in editors (and to the site's draft
// preview mode, which queries with overrideAccess through the local API).
const publishedOrLoggedIn = ({ req }) => (req.user ? true : { _status: { equals: "published" } });

export const Projects = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  orderable: true,
  versions: { drafts: true },
  access: {
    read: publishedOrLoggedIn
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured"],
    description: "Drag projects to reorder them; the site follows this order everywhere.",
    preview: (doc) =>
      process.env.PREVIEW_SECRET && doc?.slug
        ? `/api/draft?secret=${process.env.PREVIEW_SECRET}&path=/work/${doc.slug}`
        : null
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent]
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Basics",
          fields: [
            { name: "title", label: "Project title", type: "text", required: true },
            {
              name: "slug",
              label: "Web address",
              type: "text",
              required: true,
              unique: true,
              admin: {
                description: "The end of the project's URL: \"type-specimen\" becomes /work/type-specimen. Lowercase letters, numbers, and hyphens."
              },
              validate: (value) =>
                /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value || "") ||
                "Use lowercase letters, numbers, and hyphens only (like: my-new-project)"
            },
            {
              name: "category",
              label: "Category",
              type: "text",
              required: true,
              admin: { description: "Shown under the title, e.g. \"Typography\" or \"Editorial / Print\"." }
            },
            {
              name: "course",
              label: "Course",
              type: "text",
              admin: { description: "The class this was made for, e.g. \"Typography + Info\". Optional." }
            },
            { name: "year", label: "Year", type: "text", admin: { description: "e.g. 2026. Optional." } },
            {
              name: "tools",
              label: "Tools & techniques",
              type: "array",
              labels: { singular: "Tool", plural: "Tools" },
              admin: { description: "Short tags like \"Book design\" or \"Frame animation\"." },
              fields: [{ name: "tool", label: "Tool", type: "text", required: true }]
            },
            { name: "featured", label: "Show on the homepage", type: "checkbox", defaultValue: false },
            {
              name: "accent",
              label: "Accent color",
              type: "text",
              required: true,
              admin: { description: "Hex color for this project's highlights, e.g. #e42525." },
              validate: (value) =>
                /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value || "") || "Enter a hex color like #e42525"
            }
          ]
        },
        {
          label: "Copy",
          fields: [
            {
              name: "shortDescription",
              label: "Short description",
              type: "textarea",
              required: true,
              admin: { description: "One or two sentences shown in lists and link previews." }
            },
            {
              name: "longDescription",
              label: "Project note",
              type: "textarea",
              required: true,
              admin: { description: "The main paragraph on the project page, under \"Context and intention\"." }
            },
            { name: "moduleEyebrow", label: "Highlight label", type: "text", admin: { description: "Small label above the highlight block, e.g. \"Print to web\"." } },
            { name: "moduleTitle", label: "Highlight title", type: "text", admin: { description: "One punchy line, e.g. \"Spreads as scenes.\"" } },
            { name: "moduleBody", label: "Highlight text", type: "textarea" },
            {
              name: "sections",
              label: "Story sections",
              type: "array",
              admin: { description: "Optional titled blocks that tell the project's story. The image is optional; a section with just a title and text still appears on the page." },
              fields: [
                { name: "title", label: "Section title", type: "text", required: true },
                { name: "body", label: "Section text", type: "textarea" },
                {
                  name: "image",
                  label: "Section image",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "Optional. Leave empty for a text-only section." }
                }
              ]
            }
          ]
        },
        {
          label: "Images",
          fields: [
            {
              name: "coverImage",
              label: "Cover image",
              type: "upload",
              relationTo: "media",
              required: true,
              admin: { description: "The big image on the project page and homepage cards." }
            },
            {
              name: "thumbnail",
              label: "Thumbnail",
              type: "upload",
              relationTo: "media",
              admin: { description: "Smaller image for scrolling rows. If empty, the cover image is used." }
            },
            {
              name: "gallery",
              label: "Gallery",
              type: "array",
              admin: { description: "Images shown in the \"Selected visuals\" gallery, in order." },
              fields: [
                { name: "image", label: "Image", type: "upload", relationTo: "media", required: true },
                { name: "caption", label: "Caption", type: "text", admin: { description: "Small label shown with the image, e.g. \"Type Specimen / spread 02\". Optional." } }
              ]
            }
          ]
        },
        {
          label: "Advanced",
          fields: [
            {
              name: "tone",
              label: "Tone",
              type: "select",
              options: ["dark", "light"],
              defaultValue: "dark",
              admin: { description: "Leave on \"dark\" unless the gallery should render for a light background." }
            },
            {
              name: "layout",
              label: "Layout",
              type: "select",
              options: ["grid", "progression", "object", "poster"],
              defaultValue: "grid",
              admin: { description: "Which gallery arrangement the project page uses." }
            },
            {
              name: "heroObjectPosition",
              label: "Hero crop position",
              type: "text",
              admin: { description: "CSS object-position for the hero image, e.g. \"center 28%\". Leave empty for default." }
            },
            {
              name: "heroImageTransform",
              label: "Hero transform",
              type: "text",
              admin: { description: "CSS transform for the hero image, e.g. \"translateY(5%) scale(1.08)\". Leave empty for default." }
            }
          ]
        }
      ]
    }
  ]
};
