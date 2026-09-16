import { revalidateContent } from "./hooks.js";

const validUrl = (value) => {
  try {
    return new URL(value).protocol === "https:" || "Use the full https:// address, e.g. https://psantani.art";
  } catch {
    return "Enter the full address, e.g. https://psantani.art";
  }
};

export const SiteSettings = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true
  },
  admin: {
    description: "Your name, bio, contact links, and the homepage hero image."
  },
  hooks: {
    afterChange: [revalidateContent]
  },
  fields: [
    { name: "name", label: "Your name", type: "text", required: true, admin: { description: "Shown in the header, footer, and browser tab." } },
    {
      name: "url",
      label: "Site address",
      type: "text",
      required: true,
      admin: { description: "The full address of the live site, e.g. https://psantani.art" },
      validate: validUrl
    },
    { name: "title", label: "Browser tab title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text", admin: { description: "Short line under your name on the homepage." } },
    { name: "eyebrow", label: "Header eyebrow", type: "text", admin: { description: "Small label above your name on the homepage. Keep it different from your name." } },
    { name: "description", label: "Site description", type: "textarea", required: true, admin: { description: "One or two sentences used on the homepage and in search results." } },
    { name: "statement", label: "Portfolio statement", type: "textarea", admin: { description: "The paragraph under \"Portfolio statement\" on the homepage." } },
    { name: "bio", label: "About text", type: "textarea", admin: { description: "Your bio, shown on the About page (the first paragraph also appears on the homepage). Leave a blank line between paragraphs." } },
    { name: "school", label: "School / program", type: "text", admin: { description: "Optional, e.g. \"BFA Graphic Design, class of 2028\"." } },
    { name: "email", label: "Contact email", type: "email", admin: { description: "Optional. When set, a Contact link appears in the header and footer." } },
    { name: "instagram", label: "Instagram link", type: "text", admin: { description: "Optional. Full address, e.g. https://www.instagram.com/yourhandle" } },
    {
      name: "headshot",
      label: "Photo of you",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional. Shown on the About page." }
    },
    {
      name: "cv",
      label: "CV (PDF)",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional. Upload a PDF and a download link appears on the About page." }
    },
    {
      name: "heroImage",
      label: "Homepage hero image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "The large background image at the top of the homepage." }
    }
  ]
};
