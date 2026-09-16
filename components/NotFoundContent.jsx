import Link from "next/link";

export function NotFoundContent() {
  return (
    <main className="pt-24">
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-exhibit text-signal">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.82] tracking-[-0.015em] text-balance [font-stretch:62%]">
          Page Not Found
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
          This address does not match anything in the portfolio. The project may have been renamed, or the link
          that brought you here was incomplete.
        </p>
      </section>
      <nav aria-label="Recovery" className="grid border-y border-white/15 md:grid-cols-2">
        <Link
          className="group border-b border-white/15 bg-charcoal/40 p-8 transition-colors duration-200 hover:bg-white/[0.04] md:border-b-0 md:border-r"
          href="/"
        >
          <p className="text-xs font-semibold uppercase tracking-exhibit text-bone/70">Start again</p>
          <p className="mt-3 font-display text-[clamp(1.75rem,3vw,3rem)] uppercase leading-[0.9] transition-colors duration-200 group-hover:text-signal">
            Home
          </p>
        </Link>
        <Link
          className="group bg-charcoal/40 p-8 text-right transition-colors duration-200 hover:bg-white/[0.04]"
          href="/work"
        >
          <p className="text-xs font-semibold uppercase tracking-exhibit text-bone/70">Browse everything</p>
          <p className="mt-3 font-display text-[clamp(1.75rem,3vw,3rem)] uppercase leading-[0.9] transition-colors duration-200 group-hover:text-signal">
            Work Index
          </p>
        </Link>
      </nav>
    </main>
  );
}
