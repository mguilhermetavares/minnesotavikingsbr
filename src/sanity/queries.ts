import { groq } from "next-sanity";

export const articlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    category,
    coverImage
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    category,
    coverImage,
    body
  }
`;

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author,
    category,
    coverImage
  }
`;

export const podcastEpisodesQuery = groq`
  *[_type == "podcastEpisode"] | order(publishedAt desc) {
    _id,
    title,
    episodeNumber,
    publishedAt,
    description,
    spotifyUrl,
    youtubeUrl,
    youtubeId,
    coverImage
  }
`;

export const latestEpisodeQuery = groq`
  *[_type == "podcastEpisode"] | order(publishedAt desc) [0] {
    _id,
    title,
    episodeNumber,
    publishedAt,
    description,
    spotifyUrl,
    youtubeUrl,
    youtubeId,
    coverImage
  }
`;
