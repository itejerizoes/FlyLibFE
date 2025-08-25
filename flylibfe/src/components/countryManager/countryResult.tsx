import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Country } from '../../types/country';

interface CountryResultProps {
  country: Country | null;
}

const CountryResult: React.FC<CountryResultProps> = ({ country }) => {
  if (!country) return null;
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Resultado:</Typography>
      <Typography>ID: {country.countryId}</Typography>
      <Typography>Nombre: {country.name}</Typography>
      <Typography>ISO Code: {country.isoCode}</Typography>
      <Typography>
        Provincias: {country.provinces.map(p => p.name).join(', ') || 'Sin provincias'}
      </Typography>
    </Paper>
  );
};

export default CountryResult;