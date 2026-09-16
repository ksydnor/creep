import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

export const revalidate = 60;

const paragraphsOf = (text) =>
  (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export async function generateMetadata() {
  const site = await getSiteSettings();
  return { title: "About", description: paragraphsOf(site.bio)[0] || site.description };
}

export default async function AboutPage() {
  const site = await getSiteSettings();
  const paragraphs = paragraphsOf(site.bio);
  const instagram = site.socials?.instagram;
  // Every row is optional; the page shows only what has been filled in.
  const details = [
    site.school && { label: "School", value: site.school },
    site.email && { label: "Email", value: site.email, href: `mailto:${site.email}` },
    instagram && { label: "Instagram", value: instagram.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, ""), href: instagram },
    site.cv && { label: "CV", value: "Download PDF", href: site.cv }
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-paper pt-24 text-ink">
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-exhibit text-ink/70">About</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.015em] text-balance [font-stretch:62%]">
          {site.name}
        </h1>
      </section>
      <section className={`grid gap-12 px-5 pb-24 sm:px-8 lg:px-12 ${site.headshot ? "lg:grid-cols-[0.8fr_1.2fr]" : ""}`}>
        {site.headshot ? (
          <figure className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-ink/15 bg-bone">
            <Image
              alt={site.headshotAlt}
              className="object-cover grayscale contrast-[1.05]"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              src={site.headshot}
            />
          </figure>
        ) : null}
        <div className="max-w-[68ch]">
          {paragraphs.length > 0 ? (
            <div className="space-y-5 text-[1.0625rem] leading-[1.65] text-ink/85">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {details.length > 0 ? (
            <dl className={`grid gap-x-10 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-2 ${paragraphs.length > 0 ? "mt-12" : ""}`}>
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-exhibit text-ink/70">{item.label}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-[1.35] text-ink">
                    {item.href ? (
                      <a
                        className="underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
                        href={item.href}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>
      <div className="border-t border-ink/15 px-5 py-8 sm:px-8 lg:px-12">
        <Link className="text-xs font-semibold uppercase tracking-exhibit text-ink/70 transition-colors duration-200 hover:text-ink" href="/work">
          Work index
        </Link>
      </div>
    </main>
  );
}
