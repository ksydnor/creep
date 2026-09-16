import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project, featured = false }) {
  return (
    <Link
      className={`group relative overflow-hidden bg-paper p-5 text-ink transition hover:z-10 ${
        featured ? "md:col-span-3 md:row-span-2 lg:col-span-4" : "md:col-span-3 lg:col-span-2"
      }`}
      href={`/work/${project.slug}`}
    >
      <Image
        alt={project.thumbnailAlt}
        className="object-cover opacity-[0.82] transition-opacity duration-500 ease-out group-hover:opacity-100"
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        src={project.thumbnail}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/60" />
      <div className="relative z-10 flex h-full flex-col justify-between text-paper">
        <div className="flex justify-between gap-6 text-xs font-semibold uppercase tracking-exhibit">
          <span className="tabular-nums">{project.index}</span>
          <span>{project.category}</span>
        </div>
        <div>
          <h3 className="font-display text-[clamp(1.75rem,3.2vw,3.25rem)] uppercase leading-[0.9] tracking-[-0.01em]">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-[0.08em] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
              {project.title}
            </span>
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/85">{project.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
}
