import React from 'react';
import { render, screen } from '@testing-library/react';
import CountriesList from '../../../components/countries/countriesList';

const mockCountries = [
  {
    countryId: 1,
    name: 'Argentina',
    isoCode: 'AR',
    provinces: [
      { provinceId: 101, name: 'Buenos Aires', countryId: 1, visiteds: [] },
      { provinceId: 102, name: 'Córdoba', countryId: 1, visiteds: [] },
    ],
  },
  {
    countryId: 2,
    name: 'Brasil',
    isoCode: 'BR',
    provinces: [],
  },
];

describe('CountriesList', () => {
  test('renderiza los nombres de los países y sus códigos', () => {
    render(<CountriesList countries={mockCountries} />);
    expect(screen.getAllByText(/Argentina/i)).toBeInTheDocument();
    expect(screen.getAllByText(/AR/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Brasil/i)).toBeInTheDocument();
    expect(screen.getAllByText(/BR/i)).toBeInTheDocument();
  });

  test('renderiza las provincias de cada país si existen', () => {
    render(<CountriesList countries={mockCountries} />);
    expect(screen.getAllByText(/Buenos Aires/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Córdoba/i)).toBeInTheDocument();
  });

  test('no renderiza provincias si el país no tiene provincias', () => {
    render(<CountriesList countries={mockCountries} />);
    expect(screen.queryByText(/No hay provincias/i)).not.toBeInTheDocument();
  });

  test('renderiza correctamente si la lista de países está vacía', () => {
    render(<CountriesList countries={[]} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});