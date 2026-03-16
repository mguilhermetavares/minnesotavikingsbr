# Minnesota Vikings BR

> A principal comunidade de fãs do Minnesota Vikings no Brasil.

Site oficial da comunidade **Minnesota Vikings BR** — hub central para notícias, podcast, fantasy football e muito mais em português.

## Sobre o Projeto

O Minnesota Vikings BR é uma comunidade independente fundada em 2017, em processo de reconhecimento oficial pela franquia Minnesota Vikings. Produzimos conteúdo em português para fãs brasileiros do time.

**Presença digital:**
- 🎙️ [Podcast no Spotify](https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD)
- 📺 [YouTube](https://www.youtube.com/@MinnesotaVikingsBrasil)
- 📸 Instagram: [@minnesotavikingsbr](https://instagram.com/minnesotavikingsbr)
- 🐦 Twitter/X: [@MN_Vikings_Br](https://twitter.com/MN_Vikings_Br)
- 💜 [Apoia.se](https://apoia.se/minnesotavikingsbrasil)

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router + TypeScript) |
| Estilização | [Tailwind CSS](https://tailwindcss.com) |
| CMS | [Sanity](https://sanity.io) |
| Hospedagem | [Vercel](https://vercel.com) |

## Rodando localmente

**Pré-requisitos:** Node.js 18+

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local com seu Project ID do Sanity

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

O Sanity Studio fica em [http://localhost:3000/studio](http://localhost:3000/studio).

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Obtenha o Project ID em [sanity.io/manage](https://sanity.io/manage).

## Estrutura

```
src/
  app/
    page.tsx              # Home
    podcast/              # Podcast (Spotify + YouTube)
    noticias/             # Notícias (Sanity CMS)
    fantasy/              # Fantasy MVB
    apoie/                # Apoie o projeto
    sobre/                # Sobre a comunidade
    studio/               # Sanity Studio
  components/
    Header.tsx
    Footer.tsx
  sanity/
    client.ts             # Cliente Sanity
    queries.ts            # Queries GROQ
    schemaTypes/          # Schemas (Artigo, Podcast)
```

## Deploy

O projeto é hospedado na Vercel. Push para `main` faz deploy automático.

---

**#SKOL** 🇧🇷💜
