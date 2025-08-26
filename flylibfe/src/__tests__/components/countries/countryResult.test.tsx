import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryResult from '../../../components/countries/countryResult';

const mockCountry = {
  countryId: 1,
  name: 'Argentina',
  isoCode: 'AR',
  provinces: [
    { provinceId: 101, name: 'Buenos Aires', countryId: 1, visiteds: [] },
    { provinceId: 102, name: 'Córdoba', countryId: 1, visiteds: [] },
  ],
};

describe('CountryResult', () => {
  test('renderiza el nombre y código del país', () => {
    render(<CountryResult country={mockCountry} />);
    expect(screen.getAllByText(/Argentina/i)).toBeInTheDocument();
    expect(screen.getAllByText(/AR/i)).toBeInTheDocument();
  });

  test('renderiza las provincias del país', () => {
    render(<CountryResult country={mockCountry} />);
    expect(screen.getAllByText(/Buenos Aires/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Córdoba/i)).toBeInTheDocument();
  });

  test('renderiza correctamente si el país no tiene provincias', () => {
    const countryWithoutProvinces = { ...mockCountry, provinces: [] };
    render(<CountryResult country={countryWithoutProvinces} />);
    expect(screen.queryByText(/Buenos Aires/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Córdoba/i)).not.toBeInTheDocument();
    // Puedes agregar un mensaje en el componente si no hay provincias y testearlo aquí
  });
});