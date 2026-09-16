"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({ site }) {
  const pathname = usePathname();
  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    site.email ? { label: "Contact", href: `mailto:${site.email}`, external: true } : null
  ].filter(Boolean);
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur">
      <nav aria-label="Primary" className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link className="font-display text-lg uppercase tracking-[0.06em] [font-stretch:85%]" href="/">
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-xs font-semibold uppercase tracking-exhibit text-bone/70">
          {navLinks.map((link) =>
            link.external ? (
              <a className="transition-colors duration-200 hover:text-paper" href={link.href} key={link.label}>
                {link.label}
              </a>
            ) : (
              <Link
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`transition-colors duration-200 hover:text-paper ${
                  isActive(link.href) ? "text-paper underline decoration-1 underline-offset-[6px]" : ""
                }`}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
