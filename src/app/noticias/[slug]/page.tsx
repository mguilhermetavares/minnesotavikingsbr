import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { articleBySlugQuery, articlesQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;
import { notFound } from "next/navigation";

export const revalidate = 60;

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  author?: string;
  category?: string;
  coverImage?: SanityImageSource;
  body?: unknown[];
}

export async function generateStaticParams() {
  try {
    const articles: Article[] = await client.fetch(articlesQuery);
    return articles.map((a) => ({ slug: a.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article: Article | null = await client.fetch(articleBySlugQuery, { slug });
  if (!article) return { title: "Artigo não encontrado | Minnesota Vikings BR" };
  const ogImage = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(630).url()
    : "/opengraph-image";

  return {
    title: `${article.title} | Minnesota Vikings BR`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!/^[a-z0-9-]+$/.test(slug)) notFound();

  const article: Article | null = await client.fetch(articleBySlugQuery, { slug });

  if (!article) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16">
      {article.category && (
        <span className="text-vikings-gold text-xs font-bold uppercase tracking-wider">
          {article.category}
        </span>
      )}
      <h1 className="text-white text-4xl font-extrabold mt-2 leading-tight">
        {article.title}
      </h1>
      <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
        {article.author && <span>{article.author}</span>}
        {article.author && <span>·</span>}
        <span>{new Date(article.publishedAt).toLocaleDateString("pt-BR")}</span>
      </div>

      {article.coverImage && (
        <div className="mt-8 aspect-video relative rounded-2xl overflow-hidden">
          <Image
            src={urlFor(article.coverImage).width(900).height(506).url()}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {article.body && (
        <div className="mt-10 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-p:mb-6 prose-strong:text-white prose-a:text-vikings-gold [&_p]:text-justify">
          <PortableText value={article.body as Parameters<typeof PortableText>[0]["value"]} />
        </div>
      )}
    </article>
  );
}
