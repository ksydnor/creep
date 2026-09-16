import { notFound } from "next/navigation";
import { EditorialGallery } from "@/components/EditorialGallery";
import { PrevNextNavigation } from "@/components/PrevNextNavigation";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectModules } from "@/components/ProjectModules";
import { SectionHeading } from "@/components/SectionHeading";
import { getNextProject, getPreviousProject, getProjectBySlug, getProjects, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.coverImage, alt: project.coverImageAlt }]
    },
    twitter: { card: "summary_large_image" }
  };
}

function ProjectTools({ tools }) {
  return (
    <div className="flex flex-wrap gap-2 pt-4">
      {tools.map((tool) => (
        <span className="border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-exhibit text-bone/75" key={tool}>
          {tool}
        </span>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [previous, next, site] = await Promise.all([
    getPreviousProject(project.slug),
    getNextProject(project.slug),
    getSiteSettings()
  ]);
  const h = site.headings;

  return (
    <main style={{ "--accent": project.accent }}>
      <ProjectHero project={project} />
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading eyebrow={h.noteEyebrow} title={h.noteTitle} />
          <div className="max-w-3xl space-y-6 text-xl leading-relaxed text-bone/80">
            <p>{project.longDescription}</p>
            <ProjectTools tools={project.tools} />
          </div>
        </div>
      </section>
      <ProjectModules project={project} />
      {project.videoEmbed ? (
        <section className="px-5 py-20 sm:px-8 lg:px-12">
          <iframe
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full border border-white/15 bg-charcoal"
            loading="lazy"
            src={project.videoEmbed}
            title={`${project.title} video`}
          />
        </section>
      ) : null}
      {project.media.length > 0 ? (
        <section className="px-5 py-20 sm:px-8 lg:px-12">
          <SectionHeading eyebrow={h.galleryEyebrow} title={h.galleryTitle} />
          <EditorialGallery media={project.media} tone={project.tone} />
        </section>
      ) : null}
      <PrevNextNavigation previous={previous} next={next} />
    </main>
  );
}
