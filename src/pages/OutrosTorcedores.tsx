import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import TorcedorCard from '../components/TorcedorCard';

const OutrosTorcedores = () => {
  const [torcedores, setTorcedores] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTorcedores = async () => {
      const querySnapshot = await getDocs(collection(db, 'respostasQuiz'));
      const torcedoresData: any[] = [];
      querySnapshot.forEach((doc) => {
        torcedoresData.push(doc.data());
      });
      setTorcedores(torcedoresData);
    };

    fetchTorcedores();
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % torcedores.length); // Navegação infinita
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + torcedores.length) % torcedores.length); // Navegação infinita
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      {torcedores.length > 0 ? (
        <div className="relative w-[80vw] h-[80vh] flex items-center justify-center bg-black/70 rounded-xl shadow-xl">
          {/* Botão de Voltar */}
          <button
            onClick={goToPrev}
            className="absolute left-4 text-white text-4xl font-bold hover:scale-110 transition"
          >
            &#60;
          </button>

          {/* Card com animação */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[600px] h-full flex items-center justify-center"
          >
            <TorcedorCard
              nomeReal={torcedores[currentIndex]?.nome}
              nickname={torcedores[currentIndex]?.nickname}
              fotoPerfil={torcedores[currentIndex]?.foto}
              redesSociais={{
                instagram: torcedores[currentIndex]?.instagram,
                twitter: torcedores[currentIndex]?.twitter,
                tiktok: torcedores[currentIndex]?.tiktok,
                youtube: torcedores[currentIndex]?.youtube,
              }}
            />
          </motion.div>

          {/* Botão de Avançar */}
          <button
            onClick={goToNext}
            className="absolute right-4 text-white text-4xl font-bold hover:scale-110 transition"
          >
            &#62;
          </button>
        </div>
      ) : (
        <div className="text-white">Carregando torcedores...</div>
      )}
    </div>
  );
};

export default OutrosTorcedores;
