import React from 'react';
import { getVisiteds } from '../../api/visiteds';
import { Visited } from '../../types/visited';
import VisitedsList from '../../components/visiteds/visitedsList';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks/useFetch';
import '../../styles/visiteds/visiteds.css';

const Visiteds: React.FC = () => {
  const { data: visiteds, loading, error } = useFetch<Visited[]>(getVisiteds);

  return (
    <div className="visiteds-container">
      <Typography variant="h5" align="center" gutterBottom>
        Listado de Provincias Visitadas
      </Typography>
      {loading && <Typography>Cargando registros de visitas...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {visiteds && <VisitedsList visiteds={visiteds} />}
    </div>
  );
};

export default Visiteds;