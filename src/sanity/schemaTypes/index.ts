import { article } from "./article";
import { fantasyStandings } from "./fantasyStandings";
import { podcastEpisode } from "./podcastEpisode";
import { vikingsSchedule } from "./vikingsSchedule";

export const schemaTypes = [article, podcastEpisode, fantasyStandings, vikingsSchedule];

export const schema = { types: schemaTypes };
