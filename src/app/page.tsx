import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: "🎙️",
    title: "Podcast",
    desc: "Análises e debates toda semana",
    href: "/podcast",
    color: "from-purple-900/40 to-purple-800/10",
    border: "border-purple-700/30 hover:border-vikings-gold/60",
  },
  {
    icon: "📰",
    title: "Notícias",
    desc: "Cobertura em português",
    href: "/noticias",
    color: "from-blue-900/40 to-blue-800/10",
    border: "border-blue-700/30 hover:border-vikings-gold/60",
  },
  {
    icon: "🏆",
    title: "Fantasy",
    desc: "Liga anual da comunidade",
    href: "/fantasy",
    color: "from-yellow-900/40 to-yellow-800/10",
    border: "border-yellow-700/30 hover:border-vikings-gold/60",
  },
  {
    icon: "💜",
    title: "Apoie",
    desc: "Ajude o projeto a crescer",
    href: "/apoie",
    color: "from-vikings-purple/40 to-vikings-purple/10",
    border: "border-vikings-purple/30 hover:border-vikings-gold/60",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Minnesota Vikings BR",
  url: "https://minnesotavikingsbr.com",
  logo: "https://minnesotavikingsbr.com/logo.jpg",
  description:
    "A principal comunidade de fãs do Minnesota Vikings no Brasil. Notícias, podcast, Fantasy MVB e muito mais em português.",
  sport: "American Football",
  areaServed: {
    "@type": "Country",
    name: "Brazil",
  },
  sameAs: [
    "https://www.instagram.com/minnesotavikingsbr",
    "https://twitter.com/MN_Vikings_Br",
    "https://www.youtube.com/@MinnesotaVikingsBrasil",
    "https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-br from-vikings-purple-dark/80 via-[#0a0a0f] to-[#0a0a0f]" />

        {/* Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-vikings-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-vikings-gold/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vikings-purple/5 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-vikings-gold/10 border border-vikings-gold/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-brasil-green rounded-full animate-pulse" />
                <span className="font-display text-vikings-gold text-xs tracking-[0.15em]">
                  COMUNIDADE OFICIAL · BRASIL 🇧🇷
                </span>
              </div>

              <h1 className="font-display font-bold leading-none tracking-tight">
                <span className="block text-5xl sm:text-7xl lg:text-8xl text-white">
                  MINNESOTA
                </span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl text-gold-gradient">
                  VIKINGS
                </span>
                <span className="block text-3xl sm:text-5xl lg:text-6xl text-white/60 mt-2">
                  NO BRASIL
                </span>
              </h1>

              <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Notícias, podcast, análises e uma comunidade apaixonada —
                tudo sobre os Vikings em português.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/podcast"
                  className="font-display tracking-wider bg-vikings-gold text-vikings-purple font-bold px-8 py-4 rounded-full hover:brightness-110 transition-all glow-gold text-sm"
                >
                  OUÇA O PODCAST
                </Link>
                <a
                  href="https://apoia.se/minnesotavikingsbrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display tracking-wider border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:border-vikings-gold/60 hover:bg-white/5 transition-all text-sm"
                >
                  APOIE O PROJETO
                </a>
              </div>

              {/* Social links */}
              <div className="mt-10 flex items-center gap-5 justify-center lg:justify-start">
                <span className="text-white/30 text-sm font-display tracking-wider">SIGA NAS REDES</span>
                <div className="h-px flex-1 max-w-[60px] bg-white/10" />
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://instagram.com/minnesotavikingsbr", label: "Instagram", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                    { href: "https://twitter.com/MN_Vikings_Br", label: "Twitter", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                    { href: "https://www.youtube.com/@MinnesotaVikingsBrasil", label: "YouTube", icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
                    { href: "https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD", label: "Spotify", icon: <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /> },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-vikings-gold hover:border-vikings-gold/50 hover:bg-vikings-gold/10 transition-all"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="hidden md:flex flex-shrink-0 relative">
              <div className="absolute inset-0 bg-vikings-purple/30 rounded-full blur-[60px] scale-110" />
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <Image
                  src="/logo.jpg"
                  alt="Minnesota Vikings BR"
                  fill
                  className="object-cover rounded-full ring-4 ring-vikings-gold/20 drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* ── FEATURES ── */}
      <section className="relative bg-[#0a0a0f] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-3">O QUE TEMOS PARA VOCÊ</p>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-bold">SKOL, VIKINGS!</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${f.color} ${f.border} p-6 card-hover`}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-display text-white font-bold text-xl tracking-wide group-hover:text-vikings-gold transition-colors">
                  {f.title}
                </h3>
                <p className="text-white/40 text-sm mt-1">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-vikings-gold/60 group-hover:text-vikings-gold transition-colors text-sm font-display tracking-wider">
                  ACESSAR
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PODCAST BANNER ── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-vikings-purple via-vikings-purple-dark to-[#0a0a0f]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #FFC62F 0, #FFC62F 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-vikings-gold/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-3">PODCAST SEMANAL</p>
              <h2 className="font-display text-4xl lg:text-5xl text-white font-bold leading-tight">
                OUÇA O PODCAST<br />
                <span className="text-gold-gradient">DOS VIKINGS BR</span>
              </h2>
              <p className="text-white/50 mt-4 max-w-md">
                Análises, debates e tudo sobre os Vikings — disponível toda semana no Spotify e YouTube.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#1DB954] text-white font-display font-bold px-6 py-4 rounded-xl hover:brightness-110 transition text-sm tracking-wider"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                SPOTIFY
              </a>
              <a
                href="https://www.youtube.com/@MinnesotaVikingsBrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#FF0000] text-white font-display font-bold px-6 py-4 rounded-xl hover:brightness-110 transition text-sm tracking-wider"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YOUTUBE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── APOIE BANNER ── */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-vikings-gold/20 bg-gradient-to-br from-surface-raised to-surface p-10 lg:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 bg-vikings-gold/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-vikings-purple/20 rounded-full blur-[60px]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 justify-between">
              <div>
                <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-3">FAÇA PARTE</p>
                <h2 className="font-display text-3xl lg:text-4xl text-white font-bold">
                  AJUDE A COMUNIDADE<br />
                  <span className="text-white/50">A CRESCER</span>
                </h2>
                <p className="text-white/40 mt-3 max-w-lg">
                  Somos um projeto independente feito por fãs. Cada contribuição vai direto para o podcast, o site e os eventos da comunidade.
                </p>
              </div>
              <a
                href="https://apoia.se/minnesotavikingsbrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 font-display tracking-wider bg-vikings-gold text-vikings-purple font-bold px-10 py-4 rounded-full hover:brightness-110 transition-all glow-gold text-sm whitespace-nowrap"
              >
                APOIE O PROJETO
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
