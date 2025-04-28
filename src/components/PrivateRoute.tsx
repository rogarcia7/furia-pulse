import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user ? true : false; 
};

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/login" />; 
  }

  return <>{element}</>;
};

export default PrivateRoute;
