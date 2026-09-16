import { ProjectIndex } from "@/components/ProjectIndex";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata() {
  const site = await getSiteSettings();
  return { title: "Work", description: site.description };
}

// Categories appear in the order their first project does, so the Order
// number still decides the sequence of the whole page.
function groupByCategory(projects) {
  const groups = new Map();
  for (const project of projects) {
    if (!groups.has(project.category)) groups.set(project.category, []);
    groups.get(project.category).push(project);
  }
  return [...groups];
}

export default async function WorkPage() {
  const [projects, site] = await Promise.all([getProjects(), getSiteSettings()]);
  const h = site.headings;

  return (
    <main className="pt-24">
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.82] tracking-[-0.015em] text-balance [font-stretch:62%]">
            {h.workTitle}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-bone/80">{site.description}</p>
        </div>
      </section>
      <section className="bg-paper py-8 text-ink">
        <div className="px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow={h.workEyebrow} title={h.workSubtitle} dark />
        </div>
        {groupByCategory(projects).map(([category, group]) => (
          <div className="mt-12" key={category}>
            <h3 className="px-5 text-xs font-semibold uppercase tracking-exhibit text-ink/70 sm:px-8 lg:px-12">{category}</h3>
            <ProjectIndex projects={group} />
          </div>
        ))}
      </section>
    </main>
  );
}
