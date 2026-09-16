import Markdoc from "@markdoc/markdoc";
import { notFound } from "next/navigation";
import React from "react";
import { getPageBySlug, getPages } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getPages()).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function EditorPage({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const content = Markdoc.transform(page.node);

  return (
    <main className="min-h-screen pt-24">
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <h1 className="font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.015em] text-balance [font-stretch:62%]">
          {page.title}
        </h1>
      </section>
      <section className="page-body max-w-[68ch] px-5 pb-24 sm:px-8 lg:px-12">{Markdoc.renderers.react(content, React)}</section>
    </main>
  );
}
