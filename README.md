# Minnesota Vikings BR

> A principal comunidade de fãs do Minnesota Vikings no Brasil.

Site oficial da comunidade **Minnesota Vikings BR** — hub central para notícias, podcast, fantasy football e muito mais em português.

🌐 [minnesotavikingsbr.com](https://minnesotavikingsbr.com)

---

## Sobre o Projeto

O Minnesota Vikings BR é uma comunidade independente de fãs brasileiros do Minnesota Vikings, em processo de reconhecimento oficial pela franquia. Produzimos conteúdo em português sobre o time: análises, podcast, cobertura da temporada, draft, free agency e muito mais.

**Presença digital:**
- 🎙️ [Podcast no Spotify](https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD)
- 📺 [YouTube](https://www.youtube.com/@MinnesotaVikingsBrasil)
- 📸 [Instagram](https://instagram.com/minnesotavikingsbr) — @minnesotavikingsbr
- 🐦 [Twitter/X](https://twitter.com/MN_Vikings_Br) — @MN_Vikings_Br
- 💜 [Apoia.se](https://apoia.se/minnesotavikingsbrasil)

---

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router + TypeScript) | Performance, SEO e escalabilidade |
| Estilização | [Tailwind CSS](https://tailwindcss.com) | Desenvolvimento ágil, mobile-first |
| CMS | [Sanity](https://sanity.io) | Painel visual para publicação de conteúdo sem código |
| Hospedagem | [Vercel](https://vercel.com) | Deploy automático, free tier robusto |

Custo de infraestrutura: **R$ 0** — tudo no free tier.

---

## Rodando localmente

**Pré-requisitos:** Node.js 18+

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Sanity

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).
Sanity Studio em [http://localhost:3000/studio](http://localhost:3000/studio).

## Variáveis de ambiente

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Obtenha o Project ID em [sanity.io/manage](https://sanity.io/manage).

---

## Estrutura

```
src/
  app/
    page.tsx              # Home
    podcast/              # Podcast (Spotify + último vídeo do YouTube)
    noticias/             # Notícias (Sanity CMS)
    fantasy/              # Fantasy MVB
    apoie/                # Apoie o projeto
    comunidade/           # Comunidade (WhatsApp + redes sociais)
    sobre/                # Sobre + conquistas
    studio/               # Sanity Studio
  components/
    Header.tsx
    Footer.tsx
    InstagramCard.tsx
  sanity/
    client.ts             # Cliente Sanity
    queries.ts            # Queries GROQ
    schemaTypes/          # Schemas (Artigo, Episódio de Podcast)
```

---

## Mantenedor

**Guilherme Tavares** — [@mguilhermetavares](https://github.com/mguilhermetavares)

---

## Licença

Este repositório é público para fins de transparência e referência. O conteúdo, identidade visual e marca **Minnesota Vikings BR** são de propriedade da comunidade. O código pode ser usado como referência, mas não deve ser redistribuído como produto próprio.

---

**#SKOL** 🇧🇷💜
