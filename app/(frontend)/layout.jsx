import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteSettings } from "@/lib/content";
import { archivo } from "@/lib/fonts";

export async function generateMetadata() {
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s | ${site.name}`
    },
    description: site.description,
    openGraph: {
      title: site.title,
      description: site.description,
      images: [site.heroImage]
    }
  };
}

export default async function RootLayout({ children }) {
  const site = await getSiteSettings();

  return (
    <html className={archivo.variable} lang="en">
      <body>
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-exhibit focus:text-ink"
          href="#main"
        >
          Skip to content
        </a>
        <SiteHeader site={site} />
        <div id="main" tabIndex={-1}>
          {children}
        </div>
        <SiteFooter site={site} />
      </body>
    </html>
  );
}
