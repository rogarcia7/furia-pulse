import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import furinaLogo from '../assets/furia.png';

const Quiz: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    modalidade: '',
    tipoTorcedor: '',
    diaDeJogo: '',
    conteudoFavorito: '',
    redeFavorita: '',
    nickname: '',
    instagram: '',
    discord: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    fotoPersonalizada: '', // NOVO campo para imagem
  });

  const [perfil, setPerfil] = useState<string>('');

  useEffect(() => {
    const checkIfAnswered = async () => {
      if (!user) return;

      const q = query(collection(db, 'respostasQuiz'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setHasAnswered(true);
        navigate('/outros-torcedores');
      }
    };

    checkIfAnswered();
  }, [user, navigate]);

  const gerarPerfil = () => {
    if (formData.tipoTorcedor === 'Fiel desde o começo' && formData.diaDeJogo === 'Assiste tudo com os amigos') {
      return 'Você é o torcedor clássico, que sempre acompanha e se diverte com os amigos. Fiel desde sempre, mas também sabe curtir a vibe do jogo!';
    } else if (formData.tipoTorcedor === 'Só nos jogos decisivos' && formData.diaDeJogo === 'Grita no chat como se estivesse no palco') {
      return 'Você é o torcedor que aparece apenas nos momentos mais tensos, com emoção e entusiasmo, como se estivesse no palco do jogo!';
    } else if (formData.tipoTorcedor === 'Vejo quando está ganhando' && formData.redeFavorita === 'Instagram') {
      return 'Você é aquele torcedor que só aparece quando as vitórias estão rolando, mas sempre curte as postagens mais icônicas no Instagram!';
    } else if (formData.tipoTorcedor === 'Torcedor analítico' && formData.diaDeJogo === 'Assiste tudo com os amigos') {
      return 'Você é o torcedor que analisa cada jogada enquanto curte o jogo com os amigos. Crítico, mas sempre ao lado da FURIA!';
    } else if (formData.tipoTorcedor === 'Dou rage quando perde' && formData.diaDeJogo === 'Grita no chat como se estivesse no palco') {
      return 'Você vive intensamente cada derrota, mas com uma energia imensa para se recuperar nas vitórias!';
    } else if (formData.diaDeJogo === 'Faço meu próprio react do jogo') {
      return 'Você é o torcedor criativo e sempre compartilha sua reação com os amigos enquanto assiste ao jogo!';
    } else if (formData.tipoTorcedor === 'Fiel desde o começo' && formData.diaDeJogo === 'Fica de boa só no celular') {
      return 'Sempre fiel à FURIA, você prefere acompanhar os jogos de maneira tranquila, no seu celular, mas nunca perde uma vitória!';
    } else if (formData.tipoTorcedor === 'Vejo quando está ganhando' && formData.diaDeJogo === 'Grita no chat como se estivesse no palco') {
      return 'Você curte as vitórias e não tem medo de mostrar sua atitude, gritando e vibrando como se estivesse no palco!';
    } else if (formData.tipoTorcedor === 'Torcedor analítico' && formData.conteudoFavorito === 'Streamers') {
      return 'Você é o torcedor que observa e analisa cada detalhe do jogo, mas também adora acompanhar seus streamers favoritos!';
    } else if (formData.tipoTorcedor === 'Vejo quando está ganhando' && formData.redeFavorita === 'Instagram') {
      return 'Você curte apenas as vitórias, mas sempre está atento ao Instagram para ver os posts mais legais!';
    } else if (formData.tipoTorcedor === 'Dou rage quando perde' && formData.redeFavorita === 'Discord') {
      return 'Você não esconde sua raiva nas derrotas, mas sempre compartilha suas emoções no Discord, com os amigos!';
    } else if (formData.tipoTorcedor === 'Torcedor analítico' && formData.redeFavorita === 'TikTok') {
      return 'Você está sempre analisando os jogos, mas também adora compartilhar suas reações e análises no TikTok!';
    } else if (formData.tipoTorcedor === 'Fiel desde o começo' && formData.diaDeJogo === 'Assiste tudo com os amigos' && formData.redeFavorita === 'YouTube') {
      return 'Você lembra dos primeiros dias, mas não perde as novidades no YouTube, sempre assistindo aos melhores conteúdos da FURIA!';
    } else if (formData.tipoTorcedor === 'Só nos jogos decisivos' && formData.diaDeJogo === 'Faço meu próprio react do jogo') {
      return 'Você está lá apenas nos momentos decisivos, mas garante que sua reação seja registrada para todos no seu próprio canal!';
    } else if (formData.tipoTorcedor === 'Vejo quando está ganhando' && formData.redeFavorita === 'Discord') {
      return 'Você não perde nenhuma vitória e está sempre interagindo no Discord com outros torcedores, compartilhando vitórias e memes!';
    } else {
      return 'Cada torcedor tem sua essência. E você é único no seu apoio à FURIA!';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.instagram || !user) {
      alert('Instagram é obrigatório e o usuário precisa estar logado.');
      return;
    }

    try {
      await addDoc(collection(db, 'respostasQuiz'), {
        ...formData,
        userId: user.uid,
        email: user.email,
        timestamp: new Date(),
        perfil: {
          nome: user.displayName || 'Desconhecido',
          foto: formData.fotoPersonalizada || user.photoURL || '', // Foto personalizada primeiro
        },
      });

      const perfil = gerarPerfil();
      setPerfil(perfil);
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar o quiz.');
    }
  };

  if (hasAnswered) return <div>Você já respondeu ao quiz!</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }} 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-yellow-900 p-4"
    >
      <form 
        onSubmit={handleSubmit}
        className="bg-black/80 border border-yellow-700 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-6 text-white"
      >
        <div className="flex items-center justify-center mb-4">
          <img src={furinaLogo} alt="FURIA Logo" className="h-16 w-16 object-contain" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center tracking-wide text-yellow-400">
          Para encontrar outros FURIOSOS, monte seu perfil de torcedor
        </h1>

        {[ 
          { name: 'modalidade', label: 'Modalidade que você mais acompanha', options: ['CS2', 'League of Legends', 'Valorant', 'Kings League', 'Tudo sobre a FURIA', 'Vejo Tudo'] },
          { name: 'tipoTorcedor', label: 'Tipo de torcedor', options: ['Fiel desde o começo', 'Só nos jogos decisivos', 'Vejo quando está ganhando', 'Torcedor analítico', 'Dou rage quando perde'] },
          { name: 'diaDeJogo', label: 'Em dias de jogo, você...', options: ['Pega o manto e faz o F', 'Assiste tudo com os amigos', 'Grita no chat como se estivesse no palco', 'Fica de boa só no celular', 'Faço meu próprio react do jogo'] },
          { name: 'conteudoFavorito', label: 'Conteúdo favorito da FURIA', options: ['Streamers', 'Campeonatos', 'Descontos nas lojas', 'Tudo mais um pouco sobre a FURIA'] },
          { name: 'redeFavorita', label: 'Rede social favorita', options: ['Instagram', 'Twitter', 'Discord', 'TikTok', 'YouTube'] },
        ].map(({ name, label, options }) => (
          <select
            key={name}
            name={name}
            required
            onChange={handleChange}
            className="w-full bg-gray-900 border border-yellow-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          >
            <option value="">{label}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}

        {[ 
          { name: 'nickname', placeholder: 'Seu Nickname' },
          { name: 'instagram', placeholder: '@ do Instagram (obrigatório)', required: true },
          { name: 'discord', placeholder: '@ do Discord (opcional)' },
          { name: 'twitter', placeholder: '@ do Twitter (opcional)' },
          { name: 'tiktok', placeholder: '@ do TikTok (opcional)' },
          { name: 'youtube', placeholder: '@ do YouTube (opcional)' },
          { name: 'fotoPersonalizada', placeholder: 'URL da sua foto de perfil (opcional)' }, // NOVO input
        ].map(({ name, placeholder, required }) => (
          <input
            key={name}
            name={name}
            type="text"
            required={required}
            placeholder={placeholder}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-yellow-700 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-white"
          />
        ))}

        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="bg-yellow-700 hover:bg-yellow-600 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-lg w-full shadow-md"
        >
          Enviar Quiz
        </motion.button>
      </form>

      {perfil && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 p-8"
        >
          <div className="bg-black/80 backdrop-blur-md border border-yellow-700 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Seu Perfil de Torcedor</h2>
            <p className="text-xl text-yellow-300">{perfil}</p>

            <div className="flex space-x-4 mt-6">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => navigate('/perfil')} 
                className="bg-yellow-700 hover:bg-yellow-600 transition-all duration-300 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Ver Meu Perfil Completo
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }} 
                onClick={() => navigate('/outros-torcedores')} 
                className="bg-yellow-700 hover:bg-yellow-600 transition-all duration-300 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Encontrar Outros Torcedores
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Quiz;
