import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const images = [
    require("../assets/image1.png"),
    require("../assets/image2.png"),
    require("../assets/image3.png"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen w-full">
      <main className="min-h-screen w-full">
        <section className="flex flex-col md:flex-row w-full h-screen">
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagem ${index}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/50 z-20" />
          </div>

          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-6 py-10 md:px-12">
            <div className="max-w-3xl space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
                  História e Impacto da FURIA
                </h2>
                <p className="text-lg md:text-xl mt-4 text-gray-200">
                  Fundada em 2017, a FURIA Esports rapidamente se tornou uma das maiores organizações do Brasil e do mundo. Conhecida por sua presença em CS, LoL, Valorant e agora na Kings League, a FURIA representa a paixão e o orgulho nacional no cenário competitivo.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
                  Desafio Know Your Fans
                </h2>
                <p className="text-lg md:text-xl mt-4 text-gray-200">
                  O "Know Your Fans" foi criado para testar a paixão, criatividade e o amor dos fãs pela FURIA. Aqui, eu dou tudo de mim pra mostrar que já sou Furioso, só falta entrar oficialmente pra matilha.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
                  Sobre Mim
                </h2>
                <p className="text-lg md:text-xl mt-4 text-gray-200">
                  Fala, eu sou o Rodrigo! Estudante de ADS na FATEC, viciado em games, NFL, e apaixonado por torcer. Steelers no futebol americano, São Paulo no brasileiro, e claro... FURIA no coração! Esse projeto é minha forma de mostrar o quanto tudo isso me move.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center mt-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: 1 }}
              >
                <a
                  href="/outros-torcedores"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition"
                >
                  Conheça os Torcedores
                </a>

                <a
                  href="/descontos"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition"
                >
                  Descontos Furiosos
                </a>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
