import Image from "next/image";
import Link from "next/link";

export function Hero({ site }) {
  return (
    <section className="grid-rules relative min-h-screen overflow-hidden pt-20">
      <Image
        priority
        alt={site.heroImageAlt}
        className="object-cover opacity-[0.55] grayscale contrast-[1.05]"
        fill
        sizes="100vw"
        src={site.heroImage}
        style={{ transform: "translateY(5%) scale(1.04)", transformOrigin: "center center" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,transparent,rgba(8,8,8,0.45)_32%,#080808_82%)]" />
      <div className="relative z-10 grid min-h-[calc(100vh-5rem)] content-end px-5 pb-12 sm:px-8 lg:px-12">
        <div className="animate-rise grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            {site.eyebrow ? (
              <p className="mb-5 text-xs font-semibold uppercase tracking-exhibit text-ash">{site.eyebrow}</p>
            ) : null}
            <h1 className="max-w-6xl font-display text-[clamp(3.25rem,12vw,11rem)] uppercase leading-[0.8] tracking-[-0.015em] text-paper text-balance [font-stretch:62%]">
              {site.name}
            </h1>
          </div>
          <div className="max-w-md border-l border-white/20 pl-5">
            {site.subtitle ? <p className="text-sm uppercase tracking-[0.1em] text-ash">{site.subtitle}</p> : null}
            <p className="mt-5 text-lg leading-relaxed text-bone/80">{site.description}</p>
            <Link
              className="mt-8 inline-flex border border-paper px-5 py-3 text-xs font-semibold uppercase tracking-exhibit transition-colors duration-200 hover:bg-paper hover:text-ink"
              href="/work"
            >
              View work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
