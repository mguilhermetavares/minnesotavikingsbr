import { defineArrayMember, defineField, defineType } from "sanity";

const statusLabels: Record<string, string> = {
  scheduled: "Agendado",
  live: "Ao vivo",
  final: "Encerrado",
  bye: "Bye week",
  tbd: "A definir",
};

export const vikingsSchedule = defineType({
  name: "vikingsSchedule",
  title: "Calendário",
  type: "document",
  fields: [
    defineField({
      name: "season",
      title: "Temporada",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: "team",
      title: "Time",
      type: "string",
      initialValue: "Minnesota Vikings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Fonte oficial",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Nome", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Última verificação",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "games",
      title: "Jogos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "scheduleGame",
          fields: [
            defineField({
              name: "gameId",
              title: "ID do jogo",
              type: "string",
              description: "Ex.: 2026-pre-01, 2026-reg-05, 2026-reg-06-bye",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "sequence", title: "Ordem", type: "number", validation: (Rule) => Rule.required().integer().positive() }),
            defineField({
              name: "seasonType",
              title: "Fase",
              type: "string",
              options: {
                list: [
                  { title: "Pré-temporada", value: "preseason" },
                  { title: "Temporada regular", value: "regular" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "week", title: "Semana", type: "number", validation: (Rule) => Rule.required().integer().min(1).max(18) }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: Object.entries(statusLabels).map(([value, title]) => ({ title, value })),
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "location",
              title: "Mando",
              type: "string",
              description: "Deixe vazio na bye week",
              options: {
                list: [
                  { title: "Casa", value: "home" },
                  { title: "Fora", value: "away" },
                ],
                layout: "radio",
              },
            }),
            defineField({
              name: "opponent",
              title: "Adversário",
              type: "object",
              description: "Deixe vazio na bye week",
              fields: [
                defineField({
                  name: "code",
                  title: "Sigla",
                  type: "string",
                  description: "Sigla da ESPN, ex.: GB, DET, WAS",
                  validation: (Rule) => Rule.required().regex(/^[A-Z]{2,4}$/),
                }),
                defineField({ name: "name", title: "Nome completo", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "shortName", title: "Nome curto", type: "string", validation: (Rule) => Rule.required() }),
              ],
            }),
            defineField({
              name: "kickoffAt",
              title: "Kickoff",
              type: "datetime",
              description: "Deixe vazio se o horário ainda não foi definido",
            }),
            defineField({ name: "venue", title: "Estádio", type: "string" }),
            defineField({ name: "vikingsScore", title: "Placar Vikings", type: "number", validation: (Rule) => Rule.integer().min(0) }),
            defineField({ name: "opponentScore", title: "Placar adversário", type: "number", validation: (Rule) => Rule.integer().min(0) }),
          ],
          preview: {
            select: {
              seasonType: "seasonType",
              week: "week",
              opponent: "opponent.shortName",
              location: "location",
              status: "status",
              vikingsScore: "vikingsScore",
              opponentScore: "opponentScore",
            },
            prepare({ seasonType, week, opponent, location, status, vikingsScore, opponentScore }) {
              const phase = seasonType === "preseason" ? "Pré" : "Semana";
              const matchup = opponent ? `${location === "away" ? "@" : "vs"} ${opponent}` : "Bye";
              const score =
                status === "final" && vikingsScore != null && opponentScore != null
                  ? ` · ${vikingsScore}-${opponentScore}`
                  : "";
              return {
                title: `${phase} ${week} · ${matchup}`,
                subtitle: `${statusLabels[status] ?? status}${score}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    { title: "Temporada (mais recente)", name: "seasonDesc", by: [{ field: "season", direction: "desc" }] },
  ],
  preview: {
    select: { season: "season", lastVerifiedAt: "lastVerifiedAt" },
    prepare({ season, lastVerifiedAt }) {
      return {
        title: `Calendário ${season ?? ""}`.trim(),
        subtitle: lastVerifiedAt ? `Verificado em ${lastVerifiedAt}` : undefined,
      };
    },
  },
});
