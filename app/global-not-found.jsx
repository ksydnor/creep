import { NotFoundContent } from "@/components/NotFoundContent";
import { archivo } from "@/lib/fonts";
import "./(frontend)/globals.css";

export const metadata = { title: "Page not found" };

// The document for URLs that match no route at all. Both real layouts live in
// route groups, so this file owns its own <html>.
export default function GlobalNotFound() {
  return (
    <html className={archivo.variable} lang="en">
      <body>
        <NotFoundContent />
      </body>
    </html>
  );
}
