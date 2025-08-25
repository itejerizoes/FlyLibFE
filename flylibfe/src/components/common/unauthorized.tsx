import React from 'react';
import Typography from '@mui/material/Typography';

const UnauthorizedPage: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '40px' }}>
    <Typography variant="h4" color="error">
      No tienes permisos para acceder a esta página.
    </Typography>
  </div>
);

export default UnauthorizedPage;