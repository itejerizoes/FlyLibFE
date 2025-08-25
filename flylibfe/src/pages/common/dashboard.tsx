import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRedirectIfNotAuthenticated } from '../../hooks/useRedirectIfNotAuthenticated';
import { useQueryParams } from '../../hooks/useQueryParams';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DashboardHeader from '../../components/common/dashboardHeader';
import DashboardMenu from '../../components/common/dashboardMenu';
import DashboardContent from '../../components/common/dashboardContent';
import '../../styles/common/dashboard.css';

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