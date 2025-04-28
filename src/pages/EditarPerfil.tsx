import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { getDocs, query, where, collection, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function EditarPerfil() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [youtube, setYoutube] = useState('');
  const [discord, setDiscord] = useState('');
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log('Usuário logado:', user.uid); // Debug
          const q = query(collection(db, 'respostasQuiz'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            const data = docSnap.data();
            setUserData({ ...data, docId: docSnap.id });
            setInstagram(data.instagram || '');
            setTwitter(data.twitter || '');
            setTiktok(data.tiktok || '');
            setYoutube(data.youtube || '');
            setDiscord(data.discord || '');
            setFoto(data.perfil?.foto || '');
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Erro ao carregar os dados do usuário:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('Nenhum usuário logado');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSalvar = async () => {
    if (!userData) return;

    const docRef = doc(db, 'respostasQuiz', userData.docId);
    const novosDados = {
      instagram,
      twitter,
      tiktok,
      youtube,
      discord,
      perfil: {
        ...userData.perfil,
        foto,
      },
    };

    try {
      await updateDoc(docRef, novosDados);
      alert('Perfil atualizado com sucesso!');
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      alert('Erro ao salvar as alterações. Tente novamente.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl text-gray-400">Carregando...</div>;
  }

  if (!userData) {
    return <div className="text-center text-red-500">Dados do usuário não encontrados.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-gold">Editar Perfil</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-white">Foto de Perfil (URL):</label>
            <input
              type="text"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Instagram:</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Twitter:</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">TikTok:</label>
            <input
              type="text"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">YouTube:</label>
            <input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Discord:</label>
            <input
              type="text"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSalvar}
            className="px-6 py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-400 transition duration-300"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
