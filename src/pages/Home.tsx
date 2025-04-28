import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
  const images = [
    require("../assets/image1.png"),
    require("../assets/image2.png"),
    require("../assets/image3.png")
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
      setTimeout(() => setFade(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div>

      <main className="min-h-screen bg-gray-800">
        <section className="w-full h-screen flex">
          {/* Metade esquerda com imagens */}
          <div className="w-1/2 h-full relative">
            <img
              src={images[prevIndex]}
              alt="Imagem anterior"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src={images[currentIndex]}
              alt="Imagem atual"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
            />
          </div>

          {/* Metade direita com textos */}
          <div className="w-1/2 h-full bg-gray-700 text-white flex flex-col items-center justify-center px-8">
            <div className="w-full max-w-6xl">
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-yellow-400">História e Impacto da FURIA</h2>
                <p className="text-lg leading-relaxed mt-4">
                  Fundada em 2017, a FURIA Esports rapidamente se tornou uma das maiores organizações de esports do Brasil
                  e do mundo. A FURIA é conhecida pela sua grande presença em jogos como CS, League of Legends,
                  Valorant, e agora na Kings League também conquistando fãs e reconhecimento internacional.
                  Seu impacto vai além das vitórias: a FURIA representa a paixão, a autenticidade e o orgulho do Brasil no cenário dos esports.
                </p>
              </div>

              <div className="mb-16">
                <h2 className="text-4xl font-bold text-yellow-400">Desafio Know Your Fans</h2>
                <p className="text-lg leading-relaxed mt-4">
                  O projeto "Know Your Fans" foi criado pela FURIA para testar a paixão, criatividade e o amor dos fãs para integrar a Furia.
                  Através desse desafio, estou tentando me tornar um Furioso de verdade (não que eu já não seja fora da org).
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-yellow-400">Sobre Mim</h2>
                <p className="text-lg leading-relaxed mt-4">
                  Olá! Eu sou o Rodrigo, estudante de Tecnologia na FATEC e apaixonado por esports e games. Desde
                  criança, sempre fui fã de jogar (seja esports ou e-sports) além de ser alucinado por competição e de torcer por grandes equipes, especialmente pela FURIA. Além
                  disso, sou também um grande entusiasta da NFL, torcendo pelo Pittsburgh Steelers e no futebol torço para o São Paulo, isso mostra
                  o quanto sou apaixonado por torcer, faz minha alma viver e celebrar (às vezes chorar também né rs😂). Este projeto foi
                  criado como uma maneira de expressar minha paixão pela FURIA e pela cultura dos esports.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
