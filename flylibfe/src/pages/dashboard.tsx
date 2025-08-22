import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, logout, displayName, isAuthenticated } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const name = params.get('displayName');
    if (token && refreshToken) {
      login(token, refreshToken, name || undefined);
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate, login]);

  if (!isAuthenticated) {
    return <div>Cargando...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Bienvenido, {displayName || 'Usuario'}</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;