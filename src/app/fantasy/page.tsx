import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fantasy MVB | Minnesota Vikings BR",
  description:
    "O Fantasy da torcida mais fanática do Brasil. Participe da liga anual de Fantasy Football da comunidade Minnesota Vikings BR.",
};

const prizes = [
  { place: "🥇 Campeão", value: "R$ 100", color: "from-yellow-500/20 to-yellow-600/5", border: "border-yellow-500/30" },
  { place: "🥈 Vice-campeão", value: "R$ 60", color: "from-gray-400/20 to-gray-500/5", border: "border-gray-400/30" },
  { place: "📊 Melhor campanha geral", value: "R$ 20 × ligas", color: "from-vikings-purple/20 to-vikings-purple/5", border: "border-vikings-purple/30" },
  { place: "⚡ Melhor rodada (todas as ligas)", value: "Brinde a definir", color: "from-vikings-gold/20 to-vikings-gold/5", border: "border-vikings-gold/30" },
];

const roster = [
  { pos: "QB", qty: "1", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  { pos: "RB", qty: "2", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  { pos: "WR", qty: "2", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { pos: "TE", qty: "1", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { pos: "FLEX", qty: "2", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { pos: "K", qty: "1", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  { pos: "DEF", qty: "1", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
  { pos: "BN", qty: "5", color: "bg-white/5 text-white/40 border-white/10" },
  { pos: "IR", qty: "2", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
];

export default function FantasyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 lg:pt-36 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-vikings-purple-dark/60 via-[#0a0a0f] to-[#0a0a0f]" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-vikings-purple/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-vikings-gold/10 rounded-full blur-[80px] animate-pulse-slow" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-vikings-gold/10 border border-vikings-gold/20 rounded-full px-4 py-1.5 mb-6">
            <span className="font-display text-vikings-gold text-xs tracking-[0.15em]">TEMPORADA 2026</span>
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-7xl text-white leading-none tracking-tight">
            FANTASY <span className="text-gold-gradient">MVB</span>
          </h1>
          <p className="font-display text-white/40 text-lg tracking-widest mt-3">
            O FANTASY DA TORCIDA MAIS FANÁTICA DO BRASIL
          </p>
          <p className="mt-6 text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
            Uma liga exclusiva para torcedores do Minnesota Vikings, criada para unir a comunidade e financiar a produção de conteúdo em português.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6">

        {/* Transparência financeira */}
        <div className="relative overflow-hidden rounded-2xl border border-vikings-gold/20 bg-gradient-to-br from-vikings-gold/10 to-vikings-gold/5 p-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-vikings-gold/10 rounded-full blur-[60px]" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-5xl">💰</div>
            <div>
              <p className="font-display text-vikings-gold text-sm tracking-[0.15em] mb-1">TRANSPARÊNCIA TOTAL</p>
              <h2 className="font-display text-white text-2xl font-bold mb-2">Inscrição: R$ 30,00</h2>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-vikings-gold flex-shrink-0" />
                  <span><strong className="text-white">R$ 15,00</strong> → Premiação da liga</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-vikings-purple-light flex-shrink-0" />
                  <span><strong className="text-white">R$ 15,00</strong> → Projeto MVB (produção de conteúdo)</span>
                </span>
              </div>
              <p className="text-white/30 text-xs mt-3">
                100% do dinheiro vai para premiação e para o projeto. Nenhum centavo fica com os comissários.
              </p>
            </div>
          </div>
        </div>

        {/* Premiação */}
        <div className="bg-surface-raised border border-white/5 rounded-2xl p-8">
          <h2 className="font-display text-white text-3xl font-bold mb-6">PREMIAÇÃO</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prizes.map((p) => (
              <div
                key={p.place}
                className={`rounded-xl border bg-gradient-to-br ${p.color} ${p.border} p-5`}
              >
                <p className="text-white/60 text-sm mb-1">{p.place}</p>
                <p className="font-display text-white text-2xl font-bold">{p.value}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4">
            * Mesmo eliminado, vale continuar escalando — a melhor rodada individual de todas as ligas ganha um brinde especial (a definir).
          </p>
        </div>

        {/* Formato e elenco */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formato */}
          <div className="bg-surface-raised border border-white/5 rounded-2xl p-8">
            <h2 className="font-display text-white text-2xl font-bold mb-5">FORMATO</h2>
            <ul className="space-y-3 text-white/60 text-sm">
              {[
                ["Plataforma", "Sleeper"],
                ["Formato", "Redraft (sem remanescências)"],
                ["Times", "12 desafiantes"],
                ["Confronto", "Head-to-head"],
                ["Temporada regular", "14 rodadas"],
                ["Playoffs", "Top 6 classificados"],
                ["Pontuação", "HPR (Half Point Per Reception)"],
                ["Draft", "14 de agosto de 2026 às 10h — Snake"],
                ["Waivers", "Processados às quartas-feiras"],
                ["Trades", "Permitidas até a semana 9"],
              ].map(([label, value]) => (
                <li key={label} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white font-medium text-right">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elenco + Regulamento */}
          <div className="flex flex-col gap-6">
            {/* Elenco */}
            <div className="flex-1 bg-surface-raised border border-white/5 rounded-2xl p-8">
              <h2 className="font-display text-white text-2xl font-bold mb-5">ELENCO</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {roster.map((r) => (
                  <div
                    key={r.pos}
                    className={`flex items-center gap-1.5 border rounded-lg px-3 py-2 text-sm font-display ${r.color}`}
                  >
                    <span className="font-bold">{r.pos}</span>
                    <span className="text-xs opacity-70">×{r.qty}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm text-white/50">
                <p className="flex items-start gap-2">
                  <span className="text-vikings-gold mt-0.5">→</span>
                  Draft Snake com ordem aleatória. Cada pick dura 4 horas (pausado das 22h às 8h).
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-vikings-gold mt-0.5">→</span>
                  Trades desbalanceadas podem ser denunciadas e votadas pelo grupo no WhatsApp.
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-vikings-gold mt-0.5">→</span>
                  Inscrições a partir de <strong className="text-white">30 de agosto de 2025</strong> via PIX, com os comissários.
                </p>
              </div>
            </div>

            {/* Regulamento */}
            <div className="flex-1 bg-surface-raised border border-white/5 rounded-2xl p-8 flex flex-col justify-center">
              <h2 className="font-display text-white text-2xl font-bold mb-3">REGULAMENTO</h2>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                O documento oficial com todas as regras, pontuações e critérios de desempate da liga Fantasy MVB 2026.
              </p>
              <a
                href="/fantasy_mvb_2026.pdf"
                download
                className="inline-flex items-center gap-3 self-start font-display tracking-wider bg-vikings-gold text-vikings-purple font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                BAIXAR REGULAMENTO
              </a>
            </div>
          </div>
        </div>

        {/* Playoffs */}
        <div className="bg-surface-raised border border-white/5 rounded-2xl p-8">
          <p className="font-display text-vikings-gold text-xs tracking-[0.2em] mb-2">PÓS-TEMPORADA</p>
          <h2 className="font-display text-white text-2xl font-bold mb-6">FORMATO DOS PLAYOFFS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="font-display text-white/40 text-xs tracking-widest mb-2">QUARTAS (WILD CARD)</p>
              <p className="text-white/70 leading-relaxed">
                <span className="text-vikings-gold font-bold">#1 e #2</span> folgam<br />
                <span className="text-white font-bold">#3 vs #6</span><br />
                <span className="text-white font-bold">#4 vs #5</span>
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="font-display text-white/40 text-xs tracking-widest mb-2">SEMIFINAIS</p>
              <p className="text-white/70 leading-relaxed">
                Re-seeding:<br />
                melhor campanha vs<br />
                pior campanha restante
              </p>
            </div>
            <div className="bg-vikings-gold/10 border border-vikings-gold/30 rounded-xl p-5">
              <p className="font-display text-vikings-gold text-xs tracking-widest mb-2">FINAL</p>
              <p className="text-white/70 leading-relaxed">
                Campeão 🏆<br />
                Vice-campeão 🥈<br />
                <span className="text-white/30 text-xs">3º lugar disputado na mesma semana</span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA inscrição */}
        <div className="relative overflow-hidden rounded-2xl border border-vikings-purple/30 bg-gradient-to-br from-vikings-purple/20 to-vikings-purple/5 p-10 text-center">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: `repeating-linear-gradient(45deg, #FFC62F 0, #FFC62F 1px, transparent 0, transparent 50%)`, backgroundSize: "20px 20px" }}
          />
          <div className="relative z-10">
            <p className="font-display text-vikings-gold text-sm tracking-[0.2em] mb-3">EXCLUSIVO PARA TORCEDORES DO MINNESOTA VIKINGS</p>
            <h2 className="font-display text-white text-3xl font-bold mb-3">QUER PARTICIPAR?</h2>
            <p className="text-white/50 max-w-md mx-auto mb-8 text-sm">
              As inscrições abrem em 30 de agosto de 2026. Fique ligado nas nossas redes sociais para não perder o prazo.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://instagram.com/minnesotavikingsbr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display tracking-wider bg-vikings-gold text-vikings-purple font-bold px-8 py-3 rounded-full hover:brightness-110 transition-all text-sm"
              >
                SEGUIR NO INSTAGRAM
              </a>
              <a
                href="https://x.com/VikingsBrasil_"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display tracking-wider border border-white/20 text-white font-semibold px-8 py-3 rounded-full hover:border-vikings-gold/60 hover:bg-white/5 transition-all text-sm"
              >
                SEGUIR NO TWITTER
              </a>
            </div>
            <p className="text-white/20 text-xs mt-6">
              Comissários: João Otávio (@OtavioJP) e Guilherme Tavares (@_instaguido)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
