import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import furiaLogo from '../assets/furia.png';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfile = () => {
    navigate('/perfil');
  };

  return (
    <header className="bg-black text-white p-4 flex flex-col items-center justify-center relative">
      <div className="flex items-center space-x-4 mb-4">
        <img src={furiaLogo} alt="FURIA Logo" className="h-14 pulse-logo" />
        <h1 className="text-5xl font-bold animate-textHighlight">FURIA Pulse</h1>
      </div>
      <nav className="flex space-x-8 text-3xl">
        <a href="/" className="hover:text-yellow-400 transition">Home</a>
        <a href="/outros-torcedores" className="hover:text-yellow-400 transition">Outros Torcedores</a>
        <a href="/giro-furioso" className="hover:text-yellow-400 transition">Giro Furioso</a>
      </nav>
      <div className="absolute right-4 top-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition mr-4"
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
