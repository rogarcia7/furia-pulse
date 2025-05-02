import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc, serverTimestamp, arrayUnion, onSnapshot } from 'firebase/firestore';

interface Mensagem {
  senderId: string;
  message: string;
  timestamp: any;
}

const ChatTorcedores = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destinatario } = location.state;

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState<string>('');
  const [usuarioAtual] = useState<string>('userIdAtual'); // Substitua com o ID do usuário logado

  const conversaId = [usuarioAtual, destinatario.userId].sort().join('_');

  useEffect(() => {
    const conversaRef = doc(db, 'conversas', conversaId);

    const unsubscribe = onSnapshot(conversaRef, (docSnapshot) => {
      const data = docSnapshot.data();
      setMensagens(data?.mensagens || []);
    });

    return () => unsubscribe();
  }, [conversaId]);

  const enviarMensagem = async () => {
    if (novaMensagem.trim() === '') return;

    const conversaRef = doc(db, 'conversas', conversaId);

    try {
      await updateDoc(conversaRef, {
        mensagens: arrayUnion({
          senderId: usuarioAtual,
          message: novaMensagem,
          timestamp: serverTimestamp(),
        }),
      });

      setNovaMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem: ', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex items-center justify-between bg-blue-600 text-white p-4">
        <button onClick={() => navigate(-1)} className="text-lg">Voltar</button>
        <h1 className="text-xl font-bold">Conversando com {destinatario.nome}</h1>
        <img src={destinatario.foto} alt="Foto do Torcedor" className="w-10 h-10 rounded-full" />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {mensagens.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === usuarioAtual ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${msg.senderId === usuarioAtual ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              <p>{msg.message}</p>
              <small className="text-xs text-gray-500">{new Date(msg.timestamp.seconds * 1000).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Digite sua mensagem..."
        />
        <button
          onClick={enviarMensagem}
          className="mt-2 w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatTorcedores;
