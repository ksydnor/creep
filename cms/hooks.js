import { CONTENT_TAG } from "../lib/content-tag.js";

// Fires after any content change so the statically generated pages refresh.
// next/cache is imported lazily: the Payload CLI (seed, generate:importmap)
// loads this config outside the Next.js runtime, where that module either
// can't resolve or has no cache to bust; both cases are safely ignored.
export const revalidateContent = async () => {
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag(CONTENT_TAG, "max");
  } catch {
    /* not running inside Next */
  }
};
