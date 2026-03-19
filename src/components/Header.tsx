"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/noticias", label: "Notícias" },
  { href: "/podcast", label: "Podcast" },
  { href: "/fantasy", label: "Fantasy" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/logo.jpg"
                alt="Minnesota Vikings BR"
                fill
                className="rounded-full object-cover ring-2 ring-vikings-gold/30 group-hover:ring-vikings-gold/80 transition-all"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-white font-bold text-lg lg:text-xl tracking-wide leading-none block">
                MINNESOTA VIKINGS
              </span>
              <span className="font-display text-vikings-gold text-sm tracking-[0.2em] leading-none block">
                BRASIL
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display px-4 py-2 rounded-lg text-sm tracking-wider transition-all ${
                  pathname === link.href
                    ? "text-vikings-gold bg-vikings-gold/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://apoia.se/minnesotavikingsbrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden font-display text-sm tracking-wider px-5 py-2.5 rounded-full bg-vikings-gold text-vikings-purple font-bold hover:brightness-110 transition-all glow-gold"
            >
              APOIE O PROJETO
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#0a0a0f]/98 backdrop-blur-md border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display block px-4 py-3 rounded-lg text-sm tracking-wider transition-all ${
                pathname === link.href
                  ? "text-vikings-gold bg-vikings-gold/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="https://apoia.se/minnesotavikingsbrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display block text-center text-sm tracking-wider px-5 py-3 rounded-full bg-vikings-gold text-vikings-purple font-bold"
            >
              APOIE O PROJETO
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
