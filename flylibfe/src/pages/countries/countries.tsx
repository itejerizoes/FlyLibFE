import React from 'react';
import { getCountries } from '../../api/countries';
import { Country } from '../../types/country';
import List from '../../components/list';
import { useFetch } from '../../hooks/useFetch';

const Countries: React.FC = () => {
  const { data: countries, loading, error } = useFetch<Country[]>(getCountries);

  if (loading) return <div>Cargando países...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Listado de Países</h2>
      <List
        items={countries || []}
        renderItem={country => (
          <li key={country.countryId}>
            <strong>{country.name}</strong> ({country.isoCode})
            {country.provinces && country.provinces.length > 0 && (
              <ul>
                {country.provinces.map(province => (
                  <li key={province.provinceId}>{province.name}</li>
                ))}
              </ul>
            )}
          </li>
        )}
      />
    </div>
  );
};

export default Countries;