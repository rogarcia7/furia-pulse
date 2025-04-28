import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  if (user) {
    return <Navigate to="/quiz" />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">
      <div className="bg-zinc-800 bg-opacity-60 p-10 rounded-2xl shadow-2xl text-center w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4 animate-pulse">Bem-vindo ao FURIA Pulse</h1>
        <p className="text-md text-zinc-300 mb-8">
          Junte-se à comunidade mais feroz do Brasil! <br />
          Para encontrar outros torcedores que vibram como você! Faça login com sua conta Google e faça novas amizades e até econtre seu novo DUO FURIOSO!
        </p>
        <button
          onClick={loginWithGoogle}
          className="bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-all shadow-md w-full"
        >
          Entrar com Google
        </button>
        <p className="text-sm text-zinc-400 mt-4">
          Você será redirecionado para autorizar o login com sua conta Google.
        </p>
      </div>
    </div>
  );
};

export default Login;
