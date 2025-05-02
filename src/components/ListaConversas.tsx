import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Certifique-se de ter configurado o Firebase corretamente
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface Conversa {
  userId: string;
  nome: string;
  foto: string;
  ultimaMensagem: string;
  timestamp: any;
}

const ListaConversas: React.FC = () => {
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const navigate = useNavigate();
  const userIdAtual = 'userIdAtual'; // Substitua com o ID do usuário logado

  useEffect(() => {
    const getConversas = async () => {
      const conversasRef = collection(db, 'conversas');
      const q = query(conversasRef, where('usuarios', 'array-contains', userIdAtual));
      const querySnapshot = await getDocs(q);
      const conversasList: Conversa[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const outroUsuario = data.usuarios.filter((id: string) => id !== userIdAtual)[0]; // Obtém o outro torcedor
        conversasList.push({
          userId: outroUsuario,
          nome: outroUsuario, // Pode pegar o nome do Firestore depois
          foto: outroUsuario, // Pode pegar a foto do Firestore depois
          ultimaMensagem: data.mensagens[data.mensagens.length - 1]?.message || 'Nenhuma mensagem',
          timestamp: data.timestamp,
        });
      });

      setConversas(conversasList);
    };

    getConversas();
  }, [userIdAtual]);

  const abrirConversa = (conversa: Conversa) => {
    navigate('/chat', {
      state: { destinatario: conversa },
    });
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Conversas</h2>
      <div className="space-y-4">
        {conversas.map((conversa, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => abrirConversa(conversa)}
          >
            <img src={conversa.foto} alt="Foto do Torcedor" className="w-12 h-12 rounded-full" />
            <div className="ml-4">
              <p className="font-semibold">{conversa.nome}</p>
              <p className="text-sm text-gray-600">{conversa.ultimaMensagem}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaConversas;
