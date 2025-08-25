import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DashboardHeader from '../../components/common/dashboardHeader';
import DashboardMenu from '../../components/common/dashboardMenu';
import DashboardContent from '../../components/common/dashboardContent';
import '../../styles/common/dashboard.css';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, login, isAuthenticated, displayName } = useAuth();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const displayName = params.get('displayName');
    const roles = params.get('roles')?.split(',') ?? [];

    // Solo llama a login si el usuario NO está autenticado y hay token en la URL
    if (!isAuthenticated && token && refreshToken) {
      login(token, refreshToken, displayName ?? undefined, roles);
      navigate('/dashboard', { replace: true });
    }
    setProcessing(false);
  }, [location, login, navigate]);

  if (processing || !isAuthenticated) {
    return <div>Cargando...</div>;
  }

  if (!processing && !isAuthenticated) {
    navigate('/login', { replace: true });
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader displayName={displayName ?? undefined} />
      <div className="dashboard-menu">
        <DashboardMenu />
      </div>
      <DashboardContent />
      <Box className="dashboard-logout">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>
    </div>
  );
};

export default Dashboard;