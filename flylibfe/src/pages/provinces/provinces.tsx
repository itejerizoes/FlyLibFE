import React from 'react';
import { getProvinces } from '../../api/provinces';
import { Province } from '../../types/province';
import List from '../../components/list';
import { useFetch } from '../../hooks/useFetch';

const Provinces: React.FC = () => {
  const { data: provinces, loading, error } = useFetch<Province[]>(getProvinces);

  if (loading) return <div>Cargando provincias...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Listado de Provincias</h2>
      <List
        items={provinces || []}
        renderItem={province => (
          <li key={province.provinceId}>
            <strong>{province.name}</strong> (ID País: {province.countryId})
            {province.visiteds && province.visiteds.length > 0 && (
              <ul>
                {province.visiteds.map((visited, idx) => (
                  <li key={idx}>Visitado</li>
                ))}
              </ul>
            )}
          </li>
        )}
      />
    </div>
  );
};

export default Provinces;