import Image from "next/image";

function ProjectMetaItem({ label, value, wide = false }) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="text-xs font-semibold uppercase tracking-exhibit text-ash">{label}</dt>
      <dd className="mt-2 text-[0.9375rem] leading-[1.35] text-bone tabular-nums">{value}</dd>
    </div>
  );
}

const linkClass = "underline decoration-bone/40 underline-offset-4 transition-colors duration-200 hover:decoration-bone";

function ProjectLinks({ links, pdf }) {
  const all = [...links, pdf && { label: "Download PDF", url: pdf }].filter(Boolean);
  return (
    <span className="flex flex-wrap gap-x-4 gap-y-1">
      {all.map((link) => (
        <a className={linkClass} href={link.url} key={link.url} rel="noopener">
          {link.label}
        </a>
      ))}
    </span>
  );
}

export function ProjectHero({ project }) {
  const hasLinks = project.links.length > 0 || project.pdf;
  const meta = [
    project.year && { label: "Year", value: project.year },
    project.course && { label: "Course", value: project.course },
    project.tools.length > 0 && { label: "Tools", value: project.tools.join(", "), wide: true },
    hasLinks && { label: "Links", value: <ProjectLinks links={project.links} pdf={project.pdf} />, wide: true }
  ].filter(Boolean);

  return (
    <section className="relative min-h-[88vh] overflow-hidden pt-24">
      <Image
        priority
        alt={project.coverImageAlt}
        className="object-cover opacity-75"
        fill
        sizes="100vw"
        src={project.coverImage}
        style={{
          objectPosition: project.heroObjectPosition ?? "center center",
          transform: project.heroImageTransform,
          transformOrigin: "center center"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/20" />
      <div className="relative z-10 grid min-h-[calc(88vh-6rem)] content-end px-5 pb-12 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="flex items-center text-xs font-semibold uppercase tracking-exhibit text-bone/75">
              <span aria-hidden="true" className="mr-3 inline-block h-[2px] w-8 bg-[color:var(--accent)]" />
              <span className="tabular-nums">{project.index}</span>
              <span className="mx-2">/</span>
              {project.category}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.75rem,9vw,10rem)] uppercase leading-[0.82] tracking-[-0.01em] text-balance [font-stretch:62%]">
              {project.title}
            </h1>
          </div>
          {meta.length > 0 ? (
            <dl className="grid grid-cols-2 gap-5 border-l-2 border-[color:var(--accent)] pl-5 text-sm">
              {meta.map((item) => (
                <ProjectMetaItem key={item.label} {...item} />
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
