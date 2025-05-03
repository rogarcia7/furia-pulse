import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import TorcedorCard from '../components/TorcedorCard';
import bgFuria from '../assets/bg-furia.png';


const OutrosTorcedores = () => {
  const [torcedores, setTorcedores] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTorcedores = async () => {
      const querySnapshot = await getDocs(collection(db, 'respostasQuiz'));
      const torcedoresData: any[] = [];
      querySnapshot.forEach((doc) => {
        torcedoresData.push({ ...doc.data(), userId: doc.id });
      });
      setTorcedores(torcedoresData);
    };

    fetchTorcedores();
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % torcedores.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + torcedores.length) % torcedores.length);
  };

  return (
    <div
      className="w-full h-screen bg-black flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgFuria})` 
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0" />

      {torcedores.length > 0 ? (
        <div className="relative w-[90vw] max-w-[1200px] h-[85vh] z-10 flex items-center justify-center rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-lg border border-yellow-400 border-opacity-20">
          <button
            onClick={goToPrev}
            className="absolute left-6 text-yellow-400 text-5xl font-bold hover:scale-125 hover:text-yellow-500 transition duration-300"
          >
            &#60;
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, x: -80 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 80 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[700px] h-full flex items-center justify-center px-4"
            >
              <TorcedorCard
                nomeReal={torcedores[currentIndex]?.perfil.nome}
                nickname={torcedores[currentIndex]?.nickname}
                fotoPerfil={torcedores[currentIndex]?.perfil.foto}
                userId={torcedores[currentIndex]?.userId}
                redesSociais={{
                  instagram: torcedores[currentIndex]?.instagram,
                  twitter: torcedores[currentIndex]?.twitter,
                  tiktok: torcedores[currentIndex]?.tiktok,
                  youtube: torcedores[currentIndex]?.youtube,
                }}
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={goToNext}
            className="absolute right-6 text-yellow-400 text-5xl font-bold hover:scale-125 hover:text-yellow-500 transition duration-300"
          >
            &#62;
          </button>
        </div>
      ) : (
        <div className="text-white text-xl z-10">Carregando torcedores...</div>
      )}
    </div>
  );
};

export default OutrosTorcedores;
