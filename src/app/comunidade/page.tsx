import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comunidade | Minnesota Vikings BR",
  description: "Faça parte da maior comunidade de fãs do Minnesota Vikings no Brasil. Grupos no WhatsApp, redes sociais e muito mais.",
};

const socialLinks = [
  {
    name: "Instagram",
    handle: "@minnesotavikingsbr",
    desc: "Conteúdo semanal, bastidores e atualizações",
    href: "https://instagram.com/minnesotavikingsbr",
    color: "from-pink-900/40 to-purple-900/10",
    border: "border-pink-700/30 hover:border-pink-500/60",
    labelColor: "text-pink-400",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    handle: "@VikingsBrasil_",
    desc: "Notícias rápidas, reações ao vivo e debates",
    href: "https://x.com/VikingsBrasil_",
    color: "from-slate-900/40 to-slate-800/10",
    border: "border-slate-700/30 hover:border-slate-400/60",
    labelColor: "text-slate-400",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "Minnesota Vikings Brasil",
    desc: "Podcast em vídeo, melhores momentos e análises",
    href: "https://www.youtube.com/@MinnesotaVikingsBrasil",
    color: "from-red-900/40 to-red-800/10",
    border: "border-red-700/30 hover:border-red-500/60",
    labelColor: "text-red-400",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    handle: "Minnesota Vikings BR",
    desc: "Ouça o podcast onde preferir",
    href: "https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD",
    color: "from-green-900/40 to-green-800/10",
    border: "border-green-700/30 hover:border-green-500/60",
    labelColor: "text-green-400",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
];

const whatsappGroups = [
  {
    name: "Comunidade Vikings BR",
    desc: "Grupo oficial da comunidade. Anúncios, atualizações, eventos e novidades em primeira mão.",
    href: "https://chat.whatsapp.com/J1xAYYMc2FcKJ8w3UJZfVE",
    badge: "PRINCIPAL",
    badgeColor: "bg-vikings-gold text-vikings-purple",
  },
  {
    name: "Minnesota Vikings Brasil",
    desc: "Para quem não tem medo de opinar. Discussões acaloradas, análises e o caldeirão dos torcedores.",
    href: "https://chat.whatsapp.com/CZ3ehIzOFnXIVPUi1ZdlQj",
    badge: "DEBATES",
    badgeColor: "bg-white/10 text-white/70",
  },
  {
    name: "Raça Vikings 💜🇧🇷",
    desc: "Mais um espaço para conversar sobre os Vikings. Quanto mais fãs, melhor!",
    href: "https://chat.whatsapp.com/IYJfASnucNLD87DtGarsZA",
    badge: "CHAT",
    badgeColor: "bg-vikings-purple text-white",
  },
];

export default function ComunidadePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute inset-0 bg-gradient-to-br from-vikings-purple-dark/60 via-[#0a0a0f] to-[#0a0a0f]" />

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-vikings-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-brasil-green/10 rounded-full blur-[100px] animate-pulse-slow" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="inline-flex items-center gap-2 bg-vikings-gold/10 border border-vikings-gold/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-brasil-green rounded-full animate-pulse" />
            <span className="font-display text-vikings-gold text-xs tracking-[0.15em]">
              FÃNS DO BRASIL 🇧🇷
            </span>
          </div>

          <h1 className="font-display font-bold leading-none tracking-tight">
            <span className="block text-5xl sm:text-7xl text-white">NOSSA</span>
            <span className="block text-5xl sm:text-7xl text-gold-gradient">COMUNIDADE</span>
          </h1>

          <p className="mt-6 text-white/50 text-lg max-w-xl leading-relaxed">
            Fãs dos Vikings espalhados pelo Brasil — unidos pelo roxo e dourado. Entre nos grupos, siga nas redes e faça parte do movimento.
          </p>

          <p className="mt-8 text-2xl sm:text-3xl font-display font-bold text-white">
            Aproximadamente 5.000 fãs espalhados pelo Brasil 🇧🇷
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </section>

      {/* ── WHATSAPP ── */}
      <section className="bg-[#0a0a0f] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-3">GRUPOS NO WHATSAPP</p>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-bold">ENTRE NA CONVERSA</h2>
            <p className="text-white/40 mt-3 max-w-lg mx-auto">
              Temos grupos para todos os perfis de torcedor. Escolha o seu e venha debater.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whatsappGroups.map((group) => (
              <a
                key={group.name}
                href={group.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 hover:border-[#25D366]/40 p-6 card-hover transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className={`text-xs font-display font-bold tracking-wider px-3 py-1 rounded-full ${group.badgeColor}`}>
                    {group.badge}
                  </span>
                </div>

                <h3 className="font-display text-white font-bold text-lg tracking-wide group-hover:text-[#25D366] transition-colors mb-2">
                  {group.name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{group.desc}</p>

                <div className="mt-5 flex items-center gap-1 text-[#25D366]/60 group-hover:text-[#25D366] transition-colors text-sm font-display tracking-wider">
                  ENTRAR NO GRUPO
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── REDES SOCIAIS ── */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-surface to-[#0a0a0f]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-vikings-purple/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-3">REDES SOCIAIS</p>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-bold">SIGA E INTERAJA</h2>
            <p className="text-white/40 mt-3 max-w-lg mx-auto">
              Conteúdo fresh sobre os Vikings toda semana em todas as plataformas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${s.color} ${s.border} p-6 card-hover transition-all`}
              >
                <div className={`mb-4 ${s.labelColor}`}>{s.icon}</div>
                <h3 className="font-display text-white font-bold text-lg tracking-wide group-hover:text-vikings-gold transition-colors">
                  {s.name}
                </h3>
                <p className={`text-sm font-mono mt-0.5 ${s.labelColor}`}>{s.handle}</p>
                <p className="text-white/40 text-sm mt-3 leading-relaxed">{s.desc}</p>

                <div className="mt-4 flex items-center gap-1 text-vikings-gold/60 group-hover:text-vikings-gold transition-colors text-sm font-display tracking-wider">
                  SEGUIR
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA APOIE ── */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-vikings-gold/20 bg-gradient-to-br from-surface-raised to-surface p-10 lg:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-vikings-gold/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-vikings-purple/20 rounded-full blur-[60px]" />

            <div className="relative z-10">
              <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-4">VAI ALÉM</p>
              <h2 className="font-display text-3xl lg:text-4xl text-white font-bold mb-3">
                GOSTOU DA COMUNIDADE?<br />
                <span className="text-white/50">AJUDE ELA A CRESCER</span>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto mb-8">
                Somos um projeto independente feito por fãs. Seu apoio garante mais conteúdo, eventos e presença dos Vikings no Brasil.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://apoia.se/minnesotavikingsbrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display tracking-wider bg-vikings-gold text-vikings-purple font-bold px-10 py-4 rounded-full hover:brightness-110 transition-all glow-gold text-sm"
                >
                  APOIAR NO APOIA.SE
                </a>
                <Link
                  href="/sobre"
                  className="font-display tracking-wider border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:border-vikings-gold/60 hover:bg-white/5 transition-all text-sm"
                >
                  SAIBA MAIS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
