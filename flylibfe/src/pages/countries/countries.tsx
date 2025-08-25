import React from 'react';
import { getCountries } from '../../api/countries';
import { Country } from '../../types/country';
import CountriesList from '../../components/countries/countriesList';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks/useFetch';
import '../../styles/countries/countries.css';

const Countries: React.FC = () => {
  const { data: countries, loading, error } = useFetch<Country[]>(getCountries);

  return (
    <div className="countries-container">
      <Typography variant="h5" align="center" gutterBottom>
        Listado de Países
      </Typography>
      {loading && <Typography>Cargando países...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {countries && <CountriesList countries={countries} />}
    </div>
  );
};

export default Countries;