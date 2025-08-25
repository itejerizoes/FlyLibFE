import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Province } from '../../types/province';

interface ProvinceResultProps {
  province: Province | null;
}

const ProvinceResult: React.FC<ProvinceResultProps> = ({ province }) => {
  if (!province) return null;
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Resultado:</Typography>
      <Typography>ID: {province.provinceId}</Typography>
      <Typography>Nombre: {province.name}</Typography>
      <Typography>CountryId: {province.countryId}</Typography>
      <Typography>
        Visitados: {province.visiteds?.length ?? 0}
      </Typography>
    </Paper>
  );
};

export default ProvinceResult;