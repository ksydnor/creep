import { ProjectIndex } from "@/components/ProjectIndex";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

export const metadata = {
  title: "Work"
};

export default async function WorkPage() {
  const [projects, site] = await Promise.all([getProjects(), getSiteSettings()]);

  return (
    <main className="pt-24">
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.82] tracking-[-0.015em] text-balance [font-stretch:62%]">
            Work Index
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-bone/80">{site.description}</p>
        </div>
      </section>
      <section className="bg-paper py-8 text-ink">
        <div className="px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow="Selected work" title="Projects in portfolio order." dark />
        </div>
        <ProjectIndex projects={projects} />
      </section>
    </main>
  );
}
