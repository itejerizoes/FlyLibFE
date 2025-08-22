import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const refreshToken = params.get('refreshToken');

  // Permite el acceso si hay tokens en la URL (login externo)
  if (isAuthenticated || (token && refreshToken)) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;