import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Minnesota Vikings BR",
  description: "Conheça a história da maior comunidade de fãs do Minnesota Vikings no Brasil.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16">
      <div className="mb-10">
        <p className="text-vikings-gold font-semibold text-sm uppercase tracking-wider mb-2">Sobre nós</p>
        <h1 className="text-white text-4xl font-extrabold">Minnesota Vikings BR</h1>
        <p className="text-white/60 mt-3 text-lg">
          A principal comunidade de fãs do Minnesota Vikings no Brasil.
        </p>
      </div>

      <div className="space-y-8 text-white/80 text-lg leading-relaxed">
        <p>
          O <strong className="text-white">Minnesota Vikings BR</strong> nasceu da paixão de fãs brasileiros pelo time mais querido de Minnesota. Nossa missão é unir, informar e engajar todos os torcedores dos Vikings que vivem no Brasil — do Sul ao Norte do país.
        </p>
        <p>
          Produzimos conteúdo em português sobre o time: análises de jogos, cobertura da offseason, draft, free agency e tudo o que acontece com a franquia. Somos fãs falando para fãs, sem filtro e com muito SKOL!
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-white font-bold text-2xl mb-6">O que fazemos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🎙️", title: "Podcast semanal", desc: "Análises, debates e notícias sobre os Vikings" },
              { icon: "📱", title: "Redes sociais", desc: "Conteúdo semanal no Instagram e Twitter" },
              { icon: "🏆", title: "Liga de Fantasy", desc: "Liga anual para a comunidade" },
              { icon: "🇧🇷", title: "Comunidade", desc: "Conectando fãs de todo o Brasil" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold">{item.title}</p>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-vikings-purple/30 border border-vikings-purple rounded-2xl p-8">
          <h2 className="text-white font-bold text-2xl mb-3">Reconhecimento Oficial</h2>
          <p className="text-white/70">
            Estamos em processo de reconhecimento oficial pela franquia Minnesota Vikings — um marco histórico para toda a nossa comunidade.
          </p>
        </div>
      </div>
    </div>
  );
}
