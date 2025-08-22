import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRedirectIfNotAuthenticated } from '../../hooks/useRedirectIfNotAuthenticated';
import { useQueryParams } from '../../hooks/useQueryParams';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { login, logout, displayName, isAuthenticated } = useAuth();
  useRedirectIfNotAuthenticated('/login');
  const params = useQueryParams();

  useEffect(() => {
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const name = params.get('displayName');
    if (token && refreshToken) {
      login(token, refreshToken, name || undefined);
      navigate('/dashboard', { replace: true });
    }
  }, [params, navigate, login]);

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