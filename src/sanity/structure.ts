import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Minnesota Vikings BR')
    .items([
      S.documentTypeListItem('article').title('Artigos'),
      S.documentTypeListItem('podcastEpisode').title('Episódios de Podcast'),
      S.listItem()
        .title('Classificação Fantasy')
        .id('fantasyStandings')
        .child(
          S.document()
            .schemaType('fantasyStandings')
            .documentId('fantasyStandings')
        ),
    ])
