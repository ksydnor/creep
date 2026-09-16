import Link from "next/link";

export function SiteFooter({ site, pages = [] }) {
  const domain = site.url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const links = [
    { label: "Work", href: "/work", internal: true },
    { label: "About", href: "/about", internal: true },
    ...pages.map((page) => ({ label: page.title, href: `/${page.slug}`, internal: true })),
    { label: "Contact", href: "/contact", internal: true },
    site.email ? { label: site.email, href: `mailto:${site.email}`, plain: true } : null,
    site.socials?.instagram ? { label: "Instagram", href: site.socials.instagram } : null
  ].filter(Boolean);

  return (
    <footer className="border-t border-white/15 px-5 pb-10 pt-16 sm:px-8 lg:px-12">
      <p className="font-display text-[clamp(3rem,12vw,11rem)] uppercase leading-[0.78] tracking-[-0.015em] text-paper [font-stretch:62%]">
        {site.name}
      </p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-exhibit text-bone/70">
        {links.map((link) =>
          link.internal ? (
            <Link className="transition-colors duration-200 hover:text-paper" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ) : (
            <a
              className={`transition-colors duration-200 hover:text-paper ${link.plain ? "normal-case tracking-normal" : ""}`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          )
        )}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-exhibit text-bone/70">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="normal-case tracking-normal">{domain}</p>
      </div>
    </footer>
  );
}
