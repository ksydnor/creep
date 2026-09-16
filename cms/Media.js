import path from "node:path";
import { fileURLToPath } from "node:url";
import { revalidateContent } from "./hooks.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media = {
  slug: "media",
  labels: { singular: "Image", plural: "Images" },
  access: {
    read: () => true
  },
  admin: {
    description: "Images and PDFs used on the site. Upload once, reuse anywhere."
  },
  upload: {
    // MEDIA_DIR points this at a mounted volume in production. The path-relative
    // default is for local dev only: inside a container it would resolve onto the
    // image's own ephemeral layer, so every redeploy would discard the uploads.
    staticDir: process.env.MEDIA_DIR || path.resolve(dirname, "..", "media"),
    // Listed one by one rather than "image/*" on purpose: that wildcard admits
    // image/svg+xml, and uploads are served same-origin without the image
    // optimizer's CSP, so a stored SVG would run script against /admin.
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "application/pdf"]
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent]
  },
  fields: [
    {
      name: "alt",
      label: "Describe this image",
      type: "text",
      required: true,
      admin: {
        description: "A short sentence describing what is in the image, for screen readers and search engines. For a PDF, just name it."
      }
    }
  ]
};
