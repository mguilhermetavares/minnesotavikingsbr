import { article } from "./article";
import { fantasyStandings } from "./fantasyStandings";
import { podcastEpisode } from "./podcastEpisode";

export const schemaTypes = [article, podcastEpisode, fantasyStandings];

export const schema = { types: schemaTypes };
