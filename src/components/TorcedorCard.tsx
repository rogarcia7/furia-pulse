import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RedesSociais {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
}

interface TorcedorCardProps {
  nomeReal: string;
  nickname: string;
  fotoPerfil: string | null;
  redesSociais: RedesSociais;
  userId: string;
}

const TorcedorCard: React.FC<TorcedorCardProps> = ({
  nomeReal,
  nickname,
  fotoPerfil,
  redesSociais,
}) => {
  const fallbackImage = 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg';

  const navigate = useNavigate();

  const fotoUrl = fotoPerfil && fotoPerfil.startsWith('http') ? fotoPerfil : fallbackImage;

  const formatarUsername = (username: string) => {
    return username.startsWith('@') ? username.slice(1) : username;
  };
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0f0f0f] via-[#1e1e1e] to-[#121212] bg-opacity-90 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-fade-in">
      <img
        src={fotoUrl}
        alt="Foto do torcedor"
        referrerPolicy="no-referrer"
        className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-lg transition-transform duration-500 hover:scale-110 hover:border-yellow-500"
      />

      <h2 className="text-3xl font-extrabold text-yellow-400 mt-4 tracking-wide animate-slide-up">
        {nomeReal}
      </h2>
      <p className="text-lg text-gray-300 italic animate-fade-in-delay">@{nickname}</p>

      <div className="mt-6 flex gap-3 flex-wrap justify-center animate-fade-in-delay">
        {redesSociais.instagram && (
          <a
            href={`https://www.instagram.com/${formatarUsername(redesSociais.instagram)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-pink-700 hover:brightness-110 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
          >
            Instagram
          </a>
        )}
        {redesSociais.twitter && (
          <a
            href={`https://twitter.com/${formatarUsername(redesSociais.twitter)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:brightness-110 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
          >
            Twitter
          </a>
        )}
        {redesSociais.tiktok && (
          <a
            href={`https://www.tiktok.com/@${formatarUsername(redesSociais.tiktok)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-black to-gray-800 hover:brightness-110 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
          >
            TikTok
          </a>
        )}
        {redesSociais.youtube && (
          <a
            href={`https://www.youtube.com/@${formatarUsername(redesSociais.youtube)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-red-600 to-red-800 hover:brightness-110 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
          >
            YouTube
          </a>
        )}
      </div>
    </div>
  );
};
export default TorcedorCard;
