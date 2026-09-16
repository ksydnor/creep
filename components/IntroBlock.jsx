export function IntroBlock({ eyebrow, title, children }) {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="grid gap-10 border-y border-white/15 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-exhibit text-ash">{eyebrow}</p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.25rem,5vw,4.5rem)] uppercase leading-[0.86] tracking-[-0.01em] text-balance">
            {title}
          </h2>
        </div>
        <div className="max-w-3xl text-xl leading-relaxed text-bone/80">{children}</div>
      </div>
    </section>
  );
}
