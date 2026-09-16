import Link from "next/link";

function ProjectNavLink({ label, project, align = "left" }) {
  const alignClass = align === "right" ? "text-right" : "";
  const borderClass = align === "left" ? "border-b border-white/15 md:border-b-0 md:border-r" : "";

  return (
    <Link
      className={`group p-8 transition-colors duration-200 hover:bg-white/[0.04] ${borderClass} ${alignClass}`}
      href={`/work/${project.slug}`}
    >
      <p className="text-xs font-semibold uppercase tracking-exhibit text-bone/70">{label}</p>
      <p className="mt-3 font-display text-[clamp(1.75rem,3vw,3rem)] uppercase leading-[0.9] transition-colors duration-200 group-hover:text-[color:var(--accent)]">
        {project.title}
      </p>
    </Link>
  );
}

export function PrevNextNavigation({ previous, next }) {
  return (
    <nav aria-label="Project" className="grid border-y border-white/15 md:grid-cols-2">
      <ProjectNavLink label="Previous" project={previous} />
      <ProjectNavLink align="right" label="Next" project={next} />
    </nav>
  );
}
