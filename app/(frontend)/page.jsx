import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { IntroBlock } from "@/components/IntroBlock";
import { ProjectIndex } from "@/components/ProjectIndex";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects, getSiteSettings } from "@/lib/content";

export const revalidate = 60;

const featuredGridClasses = {
  tall: "md:col-span-3 md:row-span-2",
  wide: "md:col-span-3",
  standard: "md:col-span-3 lg:col-span-2"
};

// The hand-tuned layout was a five-card cycle (tall on the first beat, wide on
// the third); deriving it from the position keeps that rhythm at any count.
const featuredRhythm = 5;

function getFeaturedGridClass(index) {
  const beat = index % featuredRhythm;
  if (beat === 0) return featuredGridClasses.tall;
  if (beat === 2) return featuredGridClasses.wide;
  return featuredGridClasses.standard;
}

// `featured` is the CMS "Show on the homepage" checkbox. Falling back to every
// project keeps the homepage populated when none of them are ticked.
function selectFeatured(projects) {
  const flagged = projects.filter((project) => project.featured);
  return flagged.length > 0 ? flagged : projects;
}

function FeaturedWorkCard({ project, index }) {
  return (
    <Link
      className={`group relative overflow-hidden border border-white/15 bg-charcoal transition-colors duration-300 hover:border-paper/60 ${getFeaturedGridClass(index)}`}
      href={`/work/${project.slug}`}
    >
      <Image
        alt={project.coverImageAlt}
        className="object-cover opacity-[0.82] transition-opacity duration-500 ease-out group-hover:opacity-100"
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        src={project.coverImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-exhibit text-bone/75">{project.category}</p>
        <h3 className="mt-2 font-display text-[clamp(1.75rem,3.2vw,3.25rem)] uppercase leading-[0.9] tracking-[-0.01em]">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

function SpreadCard({ project }) {
  return (
    <Link
      className="group relative h-[24rem] min-w-[18rem] overflow-hidden border border-white/15 bg-charcoal transition-colors duration-300 hover:border-paper/60 md:min-w-[26rem]"
      href={`/work/${project.slug}`}
    >
      <Image
        alt={project.thumbnailAlt}
        className="object-cover opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100"
        fill
        sizes="420px"
        src={project.thumbnail}
      />
      <span className="absolute left-4 top-4 bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-exhibit text-paper tabular-nums">
        {project.index}
      </span>
      <span className="sr-only">{project.title}</span>
    </Link>
  );
}

export default async function HomePage() {
  const [projects, site] = await Promise.all([getProjects(), getSiteSettings()]);
  const featuredProjects = selectFeatured(projects);
  const bioExcerpt = (site.bio || "").split(/\n\s*\n/)[0].trim();
  const count = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"][projects.length - 1] || projects.length;
  const years = [...new Set(projects.map((project) => project.year).filter(Boolean))].sort().join(" to ");

  return (
    <main>
      <Hero site={site} />
      {site.statement ? (
        <IntroBlock eyebrow="Portfolio statement" title={`${count} projects${years ? ` from ${years}` : ""}.`}>
          <p>{site.statement}</p>
        </IntroBlock>
      ) : null}

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Featured work" title="Recent works" />
        <div className="mt-12 grid auto-rows-[18rem] gap-5 md:grid-cols-6">
          {featuredProjects.map((project, index) => (
            <FeaturedWorkCard index={index} key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/15 bg-paper py-20 text-ink">
        <div className="px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow="Index" title="Portfolio index." body={`All ${count} projects, in portfolio order.`} dark />
        </div>
        <ProjectIndex projects={projects} />
      </section>

      <section className="overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Visual rhythm" title="Selected spreads and objects." />
          <Link
            className="hidden text-sm uppercase tracking-[0.1em] text-bone/70 transition-colors duration-200 hover:text-paper md:block"
            href="/work"
          >
            View all work
          </Link>
        </div>
        <div className="portfolio-scrollbar mt-10 flex gap-5 overflow-x-auto pb-6">
          {projects.map((project) => (
            <SpreadCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {bioExcerpt ? (
        <IntroBlock eyebrow="About" title={`About ${site.name}.`}>
          <p>{bioExcerpt}</p>
          <Link
            className="mt-8 inline-flex border border-paper px-5 py-3 text-xs font-semibold uppercase tracking-exhibit transition-colors duration-200 hover:bg-paper hover:text-ink"
            href="/about"
          >
            More about {site.name.split(" ")[0]}
          </Link>
        </IntroBlock>
      ) : null}
    </main>
  );
}
