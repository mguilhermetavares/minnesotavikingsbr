import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Minnesota Vikings BR",
  description: "Ouça o podcast da maior comunidade Vikings do Brasil no Spotify e YouTube.",
};

export const revalidate = 3600; // atualiza a cada 1 hora

const CHANNEL_ID = "UCUeHvZorRnk2xGNjO3NsmbQ";

async function getLatestVideoId(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 }, signal: controller.signal }
    );

    clearTimeout(timeout);

    if (!res.ok) return null;

    const xml = await res.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export default async function PodcastPage() {
  const latestVideoId = await getLatestVideoId();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16">
      <div className="mb-10">
        <p className="text-vikings-gold font-semibold text-sm uppercase tracking-wider mb-2">Podcast</p>
        <h1 className="text-white text-4xl font-extrabold">Ouça o Podcast</h1>
        <p className="text-white/60 mt-3 text-lg">
          Análises, debates e tudo sobre os Vikings — em português, toda semana.
        </p>
      </div>

      {/* Spotify embed */}
      <div className="mb-10">
        <h2 className="text-white font-bold text-xl mb-4">Ouça no Spotify</h2>
        <iframe
          src="https://open.spotify.com/embed/show/4OCbyJKMid1YXi9rdhfPWD?utm_source=generator&theme=0"
          width="100%"
          height="232"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
          loading="lazy"
          className="rounded-2xl"
        />
      </div>

      {/* Último vídeo do canal */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold text-xl">Último vídeo do canal</h2>
          </div>
          <a
            href="https://www.youtube.com/@MinnesotaVikingsBrasil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#FF0000] text-sm font-display tracking-wider hover:brightness-125 transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            VER CANAL
          </a>
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          {latestVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${latestVideoId}`}
              title="Último vídeo — Minnesota Vikings BR"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40">
              <a
                href="https://www.youtube.com/@MinnesotaVikingsBrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-vikings-gold transition"
              >
                Ver canal no YouTube →
              </a>
            </div>
          )}
        </div>
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
