import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { articlesQuery } from "@/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notícias | Minnesota Vikings BR",
  description: "As últimas notícias sobre o Minnesota Vikings em português.",
};

const builder = createImageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const categoryLabels: Record<string, string> = {
  noticias: "Notícias",
  analise: "Análise",
  opiniao: "Opinião",
  draft: "Draft",
  "free-agency": "Free Agency",
  temporada: "Temporada",
};

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  author?: string;
  category?: string;
  coverImage?: SanityImageSource;
}

export default async function NoticiasPage() {
  let articles: Article[] = [];
  try {
    articles = await client.fetch(articlesQuery);
  } catch {
    // Sanity ainda não configurado ou sem conexão
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16">
      <div className="mb-10">
        <p className="text-vikings-gold font-semibold text-sm uppercase tracking-wider mb-2">Notícias</p>
        <h1 className="text-white text-4xl font-extrabold">Últimas Notícias</h1>
        <p className="text-white/60 mt-3 text-lg">Tudo sobre o Minnesota Vikings em português.</p>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📰</div>
          <h2 className="text-white text-2xl font-bold mb-2">Em breve</h2>
          <p className="text-white/50 max-w-md">
            Os primeiros artigos chegam em breve. Acompanhe nossas redes sociais para não perder nenhuma novidade.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article._id}
              href={`/noticias/${article.slug.current}`}
              className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-vikings-gold transition-all"
            >
              {article.coverImage && (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={urlFor(article.coverImage).width(600).height(338).url()}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                {article.category && (
                  <span className="text-vikings-gold text-xs font-bold uppercase tracking-wider">
                    {categoryLabels[article.category] ?? article.category}
                  </span>
                )}
                <h2 className="text-white font-bold text-lg mt-1 group-hover:text-vikings-gold transition-colors line-clamp-2">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-white/50 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-2 mt-4 text-white/40 text-xs">
                  {article.author && <span>{article.author}</span>}
                  {article.author && <span>·</span>}
                  <span>{new Date(article.publishedAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
