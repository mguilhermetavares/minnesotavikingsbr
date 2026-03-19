import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/minnesotavikingsbr",
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
  },
  {
    label: "Twitter/X",
    href: "https://twitter.com/MN_Vikings_Br",
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MinnesotaVikingsBrasil",
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/4OCbyJKMid1YXi9rdhfPWD",
    icon: <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />,
  },
];

const navLinks = [
  { href: "/noticias", label: "Notícias" },
  { href: "/podcast", label: "Podcast" },
  { href: "/fantasy", label: "Fantasy" },
  { href: "/apoie", label: "Apoie" },
  { href: "/sobre", label: "Sobre" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-vikings-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.jpg" alt="Minnesota Vikings BR" width={44} height={44} className="rounded-full ring-2 ring-vikings-gold/20" />
              <div>
                <span className="font-display text-white font-bold text-base tracking-wide leading-none block">MINNESOTA VIKINGS</span>
                <span className="font-display text-vikings-gold text-xs tracking-[0.2em] leading-none block">BRASIL</span>
              </div>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed">
              A principal comunidade de fãs do Minnesota Vikings no Brasil. Feito por fãs, para fãs.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-display text-white/50 text-xs tracking-[0.2em] mb-4">NAVEGAÇÃO</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="font-display text-white/50 hover:text-vikings-gold transition-colors text-sm tracking-wider">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="font-display text-white/50 text-xs tracking-[0.2em] mb-4">REDES SOCIAIS</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-vikings-gold hover:border-vikings-gold/40 hover:bg-vikings-gold/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
            <a
              href="https://apoia.se/minnesotavikingsbrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-display text-xs tracking-[0.15em] bg-vikings-gold/10 border border-vikings-gold/30 text-vikings-gold px-4 py-2 rounded-full hover:bg-vikings-gold/20 transition-all"
            >
              APOIE O PROJETO
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs font-display tracking-wider">
            © {new Date().getFullYear()} MINNESOTA VIKINGS BR
          </p>
          <p className="text-white/15 text-xs">
            Fansite não oficial · Todos os direitos reservados aos Minnesota Vikings / NFL
          </p>
        </div>
      </div>
    </footer>
  );
}
