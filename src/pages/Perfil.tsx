import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { FaInstagram, FaDiscord, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';

const gerarPerfil = (formData: any) => {
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

export default function Perfil() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(collection(db, 'respostasQuiz'), where('userId', '==', user.uid)); 
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUserData(doc.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Erro ao carregar os dados do usuário:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-3xl text-gray-600">Carregando...</div>;
  }

  if (!userData) {
    return <div className="text-center text-red-600">Dados do usuário não encontrados.</div>;
  }

  const perfil = gerarPerfil(userData);

  const RedeSocial = ({ icon: Icon, nome, user, url, gradient }: any) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-2 ${gradient} py-2 px-4 rounded-xl shadow-md hover:scale-105 transition`}
    >
      <Icon className="text-2xl" />
      <span className="text-white">{user}</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl shadow-2xl p-10 border border-gray-800"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={userData.perfil?.foto || 'https://via.placeholder.com/150'}
              alt="Foto de Perfil"
              className="w-40 h-40 rounded-full border-4 border-gold shadow-xl object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">{userData.perfil?.nome}</h1>
            <p className="text-lg text-gray-400">@{userData.nickname}</p>
          </div>
          <motion.div
            className="bg-gray-900 border-l-4 border-gold p-6 rounded-xl w-full text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-2">Perfil de Torcedor</h2>
            <p className="text-gray-300 text-lg">{perfil}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
            {userData.instagram && (
              <RedeSocial
                icon={FaInstagram}
                nome="Instagram"
                user={userData.instagram}
                url={`https://instagram.com/${userData.instagram}`}
                gradient="bg-gradient-to-r from-pink-500 to-yellow-500"
              />
            )}
            {userData.discord && (
              <RedeSocial
                icon={FaDiscord}
                nome="Discord"
                user={userData.discord}
                url={`https://discord.com/users/${userData.discord}`}
                gradient="bg-gradient-to-r from-indigo-500 to-blue-400"
              />
            )}
            {userData.twitter && (
              <RedeSocial
                icon={FaTwitter}
                nome="Twitter"
                user={userData.twitter}
                url={`https://twitter.com/${userData.twitter}`}
                gradient="bg-gradient-to-r from-blue-400 to-blue-600"
              />
            )}
            {userData.tiktok && (
              <RedeSocial
                icon={FaTiktok}
                nome="TikTok"
                user={userData.tiktok}
                url={`https://tiktok.com/@${userData.tiktok}`}
                gradient="bg-gradient-to-r from-purple-500 to-pink-500"
              />
            )}
            {userData.youtube && (
              <RedeSocial
                icon={FaYoutube}
                nome="YouTube"
                user={userData.youtube}
                url={`https://youtube.com/@${userData.youtube}`}
                gradient="bg-gradient-to-r from-red-500 to-orange-500"
              />
            )}
          </div>
  
          <div className="mt-10 text-center">
            <a
              href="/editarperfil"
              className="inline-block bg-gold text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-md"
            >
              Editar Perfil
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}  