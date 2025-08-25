import React from 'react';
import Typography from '@mui/material/Typography';

interface DashboardHeaderProps {
  displayName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ displayName }) => (
  <Typography variant="h4" align="center" sx={{ mt: 3 }}>
    Bienvenido, {displayName || 'Usuario'}
  </Typography>
);

export default DashboardHeader;