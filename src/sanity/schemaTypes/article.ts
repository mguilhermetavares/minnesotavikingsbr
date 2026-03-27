import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Notícias", value: "noticias" },
          { title: "Análise", value: "analise" },
          { title: "Opinião", value: "opiniao" },
          { title: "Draft", value: "draft" },
          { title: "Free Agency", value: "free-agency" },
          { title: "Temporada", value: "temporada" },
          { title: "Podcast", value: "podcast" },
          { title: "História", value: "historia" },
        ],
      },
    }),
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      return {
        title,
        subtitle: `${author ? author + " · " : ""}${publishedAt ? new Date(publishedAt).toLocaleDateString("pt-BR") : ""}`,
        media,
      };
    },
  },
});
