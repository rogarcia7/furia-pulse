import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas do seu aplicativo
import Home from './pages/Home';
import OutrosTorcedores from './pages/OutrosTorcedores';
import GiroFurioso from './pages/GiroFurioso';
import Login from './pages/Login';
import Quiz from './components/Quiz';
import Perfil from './pages/Perfil'; // Adicionando a importação da página Perfil
import EditarPerfil from './pages/EditarPerfil'; // Adicionando a importação do componente EditarPerfil


// Importando o PrivateRoute
import PrivateRoute from './components/PrivateRoute';

// Importando o Header e Footer para usá-los nas páginas
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Header /> {/* Aqui o Header sempre estará visível */}
      <Routes>
        {/* Página Home */}
        <Route path="/" element={<Home />} />
        
        {/* Usando PrivateRoute para proteger a página de outros torcedores */}
        <Route
          path="/outros-torcedores"
          element={<PrivateRoute element={<OutrosTorcedores />} />}
        />
        
        {/* Outras rotas públicas */}
        <Route path="/giro-furioso" element={<GiroFurioso />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* Adicionando a rota de perfil */}
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/editarperfil" element={<EditarPerfil />} />


      </Routes>
      <Footer /> {/* Aqui o Footer sempre estará visível */}
    </Router>
  );
}
