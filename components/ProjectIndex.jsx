import { ProjectCard } from "@/components/ProjectCard";

// Emphasis is capped to every third featured project. "Show on the homepage"
// reads like a toggle that may well be ticked on everything, and emphasising all
// of them would collapse the index into a uniform wall of double-height cards.
const emphasisRhythm = 3;

export function ProjectIndex({ projects }) {
  let featuredSeen = 0;
  const cards = projects.map((project) => {
    const emphasized = Boolean(project.featured) && featuredSeen++ % emphasisRhythm === 0;
    return { project, emphasized };
  });

  return (
    <div className="mt-8 grid auto-rows-[minmax(18rem,auto)] grid-cols-1 gap-px border-y border-ink/15 bg-ink/15 md:grid-cols-6">
      {cards.map(({ project, emphasized }) => (
        <ProjectCard key={project.slug} project={project} featured={emphasized} />
      ))}
    </div>
  );
}
