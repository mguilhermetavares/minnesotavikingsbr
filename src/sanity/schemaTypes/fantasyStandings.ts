import { defineArrayMember, defineField, defineType } from "sanity";

export const fantasyStandings = defineType({
  name: "fantasyStandings",
  title: "Classificação Fantasy",
  type: "document",
  fields: [
    defineField({
      name: "updatedAt",
      title: "Última atualização",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "entries",
      title: "Top 10",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "standingEntry",
          fields: [
            defineField({ name: "rank", title: "Posição", type: "number", validation: (Rule) => Rule.required().integer().positive() }),
            defineField({ name: "teamName", title: "Nome do time", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "ownerName", title: "Dono do time", type: "string" }),
            defineField({ name: "leagueId", title: "ID da liga (Sleeper)", type: "string" }),
            defineField({ name: "avatarUrl", title: "URL do avatar (Sleeper)", type: "url" }),
            defineField({ name: "totalPoints", title: "Pontos acumulados", type: "number", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "teamName", subtitle: "totalPoints", rank: "rank" },
            prepare({ title, subtitle, rank }) {
              return {
                title: `#${rank} — ${title}`,
                subtitle: `${subtitle} pts`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "bestSingleWeek",
      title: "Maior pontuação em uma rodada",
      type: "object",
      fields: [
        defineField({ name: "teamName", title: "Nome do time", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "ownerName", title: "Dono do time", type: "string" }),
        defineField({ name: "leagueId", title: "ID da liga (Sleeper)", type: "string" }),
        defineField({ name: "avatarUrl", title: "URL do avatar (Sleeper)", type: "url" }),
        defineField({ name: "week", title: "Rodada", type: "number", validation: (Rule) => Rule.required().integer().positive() }),
        defineField({ name: "points", title: "Pontos na rodada", type: "number", validation: (Rule) => Rule.required() }),
      ],
      preview: {
        select: { title: "teamName", subtitle: "points", week: "week" },
        prepare({ title, subtitle, week }) {
          return {
            title: `${title} — rodada ${week}`,
            subtitle: `${subtitle} pts`,
          };
        },
      },
    }),
  ],
  preview: {
    select: { updatedAt: "updatedAt" },
    prepare({ updatedAt }) {
      return {
        title: "Classificação Fantasy",
        subtitle: updatedAt ? `Atualizado em ${new Date(updatedAt).toLocaleDateString("pt-BR")}` : "Sem dados ainda",
      };
    },
  },
});
