import { defineField, defineType } from "sanity";

export const podcastEpisode = defineType({
  name: "podcastEpisode",
  title: "Episódio de Podcast",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título do episódio",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "episodeNumber",
      title: "Número do episódio",
      type: "number",
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "spotifyUrl",
      title: "Link do Spotify",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "Link do YouTube",
      type: "url",
    }),
    defineField({
      name: "youtubeId",
      title: "ID do vídeo no YouTube",
      type: "string",
      description: "Apenas o ID (ex: dQw4w9WgXcQ) — não a URL completa",
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
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
      episodeNumber: "episodeNumber",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, episodeNumber, media, publishedAt }) {
      return {
        title: episodeNumber ? `#${episodeNumber} — ${title}` : title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString("pt-BR") : "",
        media,
      };
    },
  },
});
