import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OutrosTorcedores from './pages/OutrosTorcedores';
import ChatTorcedores from './pages/ChatTorcedores';
import Login from './pages/Login';
import Quiz from './components/Quiz';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil'; 
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
         
        <Route
          path="/outros-torcedores"
          element={<PrivateRoute element={<OutrosTorcedores />} />}
        />
        
        <Route path="/chat" element={<ChatTorcedores />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/perfil" element={<Perfil />} />

        <Route path="/editarperfil" element={<EditarPerfil />} />


      </Routes>
      <Footer />
    </Router>
  );
}
