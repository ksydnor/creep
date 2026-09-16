import { NotFoundContent } from "@/components/NotFoundContent";

// notFound() from /work/[slug] resolves here, so a mistyped project slug lands
// on a 404 that still carries the site header and footer.
export default function NotFound() {
  return <NotFoundContent />;
}
