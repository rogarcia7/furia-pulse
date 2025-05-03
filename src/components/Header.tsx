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
    <header className="bg-black text-white py-3 md:py-4 px-4 md:px-6 flex flex-col items-center justify-center relative shadow-2xl">
      <div className="flex items-center space-x-6 mb-6 animate-fade-in">
        <img
          src={furiaLogo}
          alt="FURIA Logo"
          className="furia-logo h-16 md:h-20 animate-pulseLogo"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold animate-golden-shine bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-400 to-white bg-[length:200%_auto] animate-backgroundMove">
          FURIA Pulse
        </h1>
      </div>

      <nav className="flex space-x-10 text-2xl md:text-3xl mb-6">
        <a href="/" className="text-gray-200 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105">Home</a>
        <a href="/outros-torcedores" className="text-gray-200 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105">Outros Torcedores</a>
        <a href="/descontos" className="text-gray-200 hover:text-yellow-500 transition-all duration-300 transform hover:scale-105">Descontos Furiosos</a>
      </nav>

      <div className="flex items-center justify-end w-full absolute right-6 top-1/2 -translate-y-1/2 gap-3">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleProfile}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base"
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-300 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm md:text-base"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
