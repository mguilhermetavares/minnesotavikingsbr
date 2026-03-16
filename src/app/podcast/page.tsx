import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Minnesota Vikings BR",
  description: "Ouça o podcast da maior comunidade Vikings do Brasil no Spotify e YouTube.",
};

const PLAYLIST_ID = "PL4KnlJ6oPBJl7XaxeQ5_HoIGXzCUtRnX5";

export default function PodcastPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16">
      <div className="mb-10">
        <p className="text-vikings-gold font-semibold text-sm uppercase tracking-wider mb-2">Podcast</p>
        <h1 className="text-white text-4xl font-extrabold">Ouça o Podcast</h1>
        <p className="text-white/60 mt-3 text-lg">
          Análises, debates e tudo sobre os Vikings — em português, toda semana.
        </p>
      </div>

      {/* YouTube playlist embed */}
      <div className="mb-8">
        <h2 className="text-white font-bold text-xl mb-4">Episódios no YouTube</h2>
        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          <iframe
            src={`https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}`}
            title="Minnesota Vikings BR — Episódios"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Spotify embed */}
      <div className="mb-8">
        <h2 className="text-white font-bold text-xl mb-4">Ouça no Spotify</h2>
        <iframe
          src="https://open.spotify.com/embed/show/4OCbyJKMid1YXi9rdhfPWD?utm_source=generator&theme=0"
          width="100%"
          height="232"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl"
        />
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4 mt-8">
        <a
          href="https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1DB954] text-white font-bold px-6 py-3 rounded-full hover:brightness-110 transition"
        >
          Seguir no Spotify
        </a>
        <a
          href="https://www.youtube.com/@MinnesotaVikingsBrasil"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#FF0000] text-white font-bold px-6 py-3 rounded-full hover:brightness-110 transition"
        >
          Inscrever no YouTube
        </a>
      </div>
    </div>
  );
}
