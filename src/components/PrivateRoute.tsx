import React from 'react';
import { Navigate } from 'react-router-dom';

// Verifica se o usuário está autenticado
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user ? true : false;  // Se o usuário estiver no localStorage, considera como autenticado
};

interface PrivateRouteProps {
  element: React.ReactNode; // Espera que o `element` seja do tipo React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuth = isAuthenticated();  // Verificar se o usuário está autenticado

  if (!isAuth) {
    return <Navigate to="/login" />;  // Se não estiver autenticado, redireciona para o login
  }

  return <>{element}</>;  // Se estiver autenticado, renderiza o componente
};

export default PrivateRoute;
