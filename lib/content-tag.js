// In its own module (rather than lib/content.js) because the Payload config's
// hooks need it too, and content.js imports the Payload config; a shared
// constant avoids the circular import.
export const CONTENT_TAG = "cms-content";
