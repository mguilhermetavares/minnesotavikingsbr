import { article } from "./article";
import { podcastEpisode } from "./podcastEpisode";

export const schemaTypes = [article, podcastEpisode];

export const schema = { types: schemaTypes };
