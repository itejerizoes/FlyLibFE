import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const DashboardContent: React.FC = () => (
  <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
    <Typography variant="body1">
      Selecciona una opción del menú para gestionar los datos de FlyLib.
    </Typography>
  </Paper>
);

export default DashboardContent;