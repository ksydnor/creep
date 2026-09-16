export function SectionHeading({ eyebrow, title, body, dark = false }) {
  return (
    <div className="max-w-4xl">
      {eyebrow ? (
        <p className={`text-xs font-semibold uppercase tracking-exhibit ${dark ? "text-ink/70" : "text-ash"}`}>{eyebrow}</p>
      ) : null}
      {title ? (
        <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4.5rem)] uppercase leading-[0.86] tracking-[-0.01em] text-balance">
          {title}
        </h2>
      ) : null}
      {body ? (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-ink/80" : "text-bone/80"}`}>{body}</p>
      ) : null}
    </div>
  );
}
