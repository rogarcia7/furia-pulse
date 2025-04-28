import React from 'react';

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
}

const TorcedorCard: React.FC<TorcedorCardProps> = ({
  nomeReal,
  nickname,
  fotoPerfil,
  redesSociais,
}) => {
  const fallbackImage = 'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-user-icon-png-image_1796659.jpg';

  const fotoUrl = fotoPerfil && fotoPerfil.startsWith('http') ? fotoPerfil : fallbackImage;

  const formatarUsername = (username: string) => {
    return username.startsWith('@') ? username.slice(1) : username;
  };

  return (
    <div className="w-full h-full bg-white bg-opacity-90 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
      <img
        src={fotoUrl}
        alt="Foto do torcedor"
        referrerPolicy="no-referrer"
        className="w-40 h-40 rounded-full object-cover border-4 border-black mb-4"
      />

      <h2 className="text-2xl font-bold">{nomeReal}</h2>
      <p className="text-lg text-gray-600">@{nickname}</p>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        {redesSociais.instagram && (
          <a
            href={`https://www.instagram.com/${formatarUsername(redesSociais.instagram)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
          >
            Instagram
          </a>
        )}
        {redesSociais.twitter && (
          <a
            href={`https://twitter.com/${formatarUsername(redesSociais.twitter)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Twitter
          </a>
        )}
        {redesSociais.tiktok && (
          <a
            href={`https://www.tiktok.com/@${formatarUsername(redesSociais.tiktok)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full"
          >
            TikTok
          </a>
        )}
        {redesSociais.youtube && (
          <a
            href={`https://www.youtube.com/@${formatarUsername(redesSociais.youtube)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
          >
            YouTube
          </a>
        )}
      </div>
    </div>
  );
};

export default TorcedorCard;
