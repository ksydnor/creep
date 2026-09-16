import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

const sectionTheme = {
  dark: {
    section: "bg-charcoal text-paper",
    card: "border-white/15 bg-ink/25",
    meta: "text-bone/70",
    body: "text-bone/80"
  },
  light: {
    section: "bg-paper text-ink",
    card: "border-ink/15 bg-white/35",
    meta: "text-ink/70",
    body: "text-ink/80"
  }
};

function ProjectSectionCard({ section, index, isPoster, theme }) {
  return (
    <article className={`border ${theme.card} ${isPoster ? "p-3" : "p-5"}`}>
      {section.image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          <Image
            alt={section.alt ?? section.title}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={section.image}
          />
        </div>
      ) : null}
      <div className={section.image ? "mt-5" : undefined}>
        <p className={`text-xs font-semibold uppercase tracking-exhibit tabular-nums ${theme.meta}`}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 font-display text-[clamp(1.5rem,2.2vw,2.25rem)] uppercase leading-[0.9]">{section.title}</h3>
        {section.body ? <p className={`mt-3 text-sm leading-relaxed ${theme.body}`}>{section.body}</p> : null}
      </div>
    </article>
  );
}

export function ProjectModules({ project }) {
  const isLight = project.tone === "light";
  const isPoster = project.layout === "poster";
  const theme = sectionTheme[project.tone] ?? sectionTheme.dark;
  const gridClass = project.layout === "progression" ? "lg:grid-cols-3" : "lg:grid-cols-2";
  const sections = project.sections ?? [];
  // Highlight label / title / text are three independent optional fields in the
  // CMS, so gating on the title alone silently dropped the other two.
  const hasHeading = Boolean(project.moduleTitle || project.moduleEyebrow || project.moduleBody);

  // An editor who fills in neither the module heading nor any section would
  // otherwise get a tall band of empty headings on the live page.
  if (!hasHeading && sections.length === 0) {
    return null;
  }

  return (
    <section className={`${theme.section} py-20`}>
      <div className="px-5 sm:px-8 lg:px-12">
        {hasHeading ? (
          <SectionHeading
            eyebrow={project.moduleEyebrow}
            title={project.moduleTitle}
            body={project.moduleBody}
            dark={isLight}
          />
        ) : null}
        {sections.length > 0 ? (
          <div className={`grid gap-5 ${gridClass} ${hasHeading ? "mt-12" : ""}`}>
            {sections.map((section, index) => (
              <ProjectSectionCard
                index={index}
                isPoster={isPoster}
                key={`${section.title}-${index}`}
                section={section}
                theme={theme}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
