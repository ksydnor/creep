"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/Lightbox";

const galleryTheme = {
  dark: { card: "border-white/15 bg-charcoal text-paper hover:border-paper/60", caption: "text-bone/70" },
  light: { card: "border-ink/15 bg-paper text-ink hover:border-ink/60", caption: "text-ink/70" }
};

function GalleryItem({ item, onOpen, tone }) {
  const theme = galleryTheme[tone] ?? galleryTheme.dark;
  // caption is optional in the CMS, so the label degrades to alt text then a generic phrase
  const label = item.caption || item.alt || "gallery image";

  return (
    <button
      aria-label={`Open ${label}`}
      className={`group mb-5 block w-full break-inside-avoid border text-left transition-colors duration-300 ${theme.card}`}
      onClick={onOpen}
      type="button"
    >
      <span className="relative block aspect-[4/3] overflow-hidden">
        <Image
          alt={item.alt}
          className="object-cover opacity-90 transition-opacity duration-500 ease-out group-hover:opacity-100"
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={item.src}
        />
      </span>
      {item.caption ? (
        <span className={`block p-4 text-xs font-semibold uppercase tracking-exhibit ${theme.caption}`}>{item.caption}</span>
      ) : null}
    </button>
  );
}

export function EditorialGallery({ media, tone }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="mt-12 columns-1 gap-5 md:columns-2 xl:columns-3">
        {media.map((item, index) => (
          <GalleryItem item={item} key={index} onOpen={() => setActiveIndex(index)} tone={tone} />
        ))}
      </div>
      {activeIndex !== null ? (
        <Lightbox media={media} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onChange={setActiveIndex} />
      ) : null}
    </>
  );
}
