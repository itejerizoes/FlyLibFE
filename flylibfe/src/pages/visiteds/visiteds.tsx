import React from 'react';
import { getVisiteds } from '../../api/visiteds';
import { Visited } from '../../types/visited';
import List from '../../components/list';
import { useFetch } from '../../hooks/useFetch';

const Visiteds: React.FC = () => {
  const { data: visiteds, loading, error } = useFetch<Visited[]>(getVisiteds);

  if (loading) return <div>Cargando registros de visitas...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Listado de Provincias Visitadas</h2>
      <List
        items={visiteds || []}
        renderItem={visited => (
          <li key={visited.id}>
            Usuario: {visited.userId} | Provincia: {visited.provinceId} | Fotos: {visited.photos?.length ?? 0}
          </li>
        )}
      />
    </div>
  );
};

export default Visiteds;