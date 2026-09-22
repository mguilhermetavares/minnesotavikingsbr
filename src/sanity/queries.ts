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

export const fantasyStandingsQuery = groq`
  *[_type == "fantasyStandings"][0] {
    updatedAt,
    entries[] | order(rank asc) {
      rank,
      teamName,
      ownerName,
      leagueId,
      avatarUrl,
      totalPoints
    },
    bestSingleWeek {
      teamName,
      ownerName,
      leagueId,
      avatarUrl,
      week,
      points
    }
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

export const scheduleSeasonsQuery = groq`
  *[_type == "vikingsSchedule" && defined(season)] | order(season desc).season
`;

export const scheduleBySeasonQuery = groq`
  *[_type == "vikingsSchedule" && season == $season][0] {
    season,
    team,
    source { name, url },
    lastVerifiedAt,
    "games": games[] | order(sequence asc) {
      "id": gameId,
      sequence,
      seasonType,
      week,
      status,
      location,
      "opponent": select(defined(opponent.code) => opponent { code, name, shortName }, null),
      kickoffAt,
      venue,
      vikingsScore,
      opponentScore
    }
  }
`;
