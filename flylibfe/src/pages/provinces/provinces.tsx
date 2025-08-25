import React from 'react';
import { getProvinces } from '../../api/provinces';
import { Province } from '../../types/province';
import ProvincesList from '../../components/provinces/provincesList';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks/useFetch';
import '../../styles/provinces/provinces.css';

const Provinces: React.FC = () => {
  const { data: provinces, loading, error } = useFetch<Province[]>(getProvinces);

  return (
    <div className="provinces-container">
      <Typography variant="h5" align="center" gutterBottom>
        Listado de Provincias
      </Typography>
      {loading && <Typography>Cargando provincias...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {provinces && <ProvincesList provinces={provinces} />}
    </div>
  );
};

export default Provinces;