import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apoie | Minnesota Vikings BR",
  description: "Ajude a manter a maior comunidade Vikings do Brasil. Apoie o projeto via Apoia.se ou participando da nossa liga de Fantasy.",
};

export default function ApoiePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16">
      <div className="mb-12">
        <p className="text-vikings-gold font-semibold text-sm uppercase tracking-wider mb-2">Apoie o Projeto</p>
        <h1 className="text-white text-4xl font-extrabold">Feito por fãs, para fãs</h1>
        <p className="text-white/60 mt-3 text-lg max-w-2xl">
          O Minnesota Vikings BR é um projeto independente, mantido com amor e dedicação pela comunidade. Cada apoio nos ajuda a crescer e trazer mais conteúdo em português.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Apoia.se */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="text-4xl mb-4">💜</div>
          <h2 className="text-white font-bold text-2xl mb-3">Apoia.se</h2>
          <p className="text-white/60 mb-6">
            Contribua mensalmente ou com um valor único. Qualquer quantia ajuda a manter o podcast, o site e a comunidade no ar.
          </p>
          <a
            href="https://apoia.se/minnesotavikingsbrasil"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-vikings-gold text-vikings-purple font-bold px-6 py-3 rounded-full hover:brightness-110 transition"
          >
            Apoiar no Apoia.se
          </a>
        </div>

        {/* Fantasy */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-white font-bold text-2xl mb-3">Liga de Fantasy</h2>
          <p className="text-white/60 mb-6">
            Participe da nossa liga anual de Fantasy Football. Além de ser muito divertido, parte da arrecadação vai direto para o projeto.
          </p>
          <a
            href="/fantasy"
            className="block text-center border border-vikings-gold text-vikings-gold font-bold px-6 py-3 rounded-full hover:bg-vikings-gold hover:text-vikings-purple transition"
          >
            Saiba mais sobre a Liga
          </a>
        </div>
      </div>

      {/* Transparência */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-white font-bold text-xl mb-4">Para onde vai o dinheiro?</h2>
        <p className="text-white/70 leading-relaxed">
          Todo o valor arrecadado é investido diretamente na manutenção do site, domínio, ferramentas de criação de conteúdo e equipamentos para o podcast. Mesmo com o apoio de vocês, ainda bancamos parte dos custos do próprio bolso — porque acreditamos nesse projeto e na nossa comunidade.
        </p>
      </div>
    </div>
  );
}
