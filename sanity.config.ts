import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Minnesota Vikings BR")
          .items([
            S.listItem()
              .title("Artigos")
              .child(S.documentTypeList("article").title("Artigos")),
            S.listItem()
              .title("Episódios de Podcast")
              .child(S.documentTypeList("podcastEpisode").title("Episódios")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
