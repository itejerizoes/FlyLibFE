import React from 'react';
import { render, screen } from '@testing-library/react';
import ProvinceResult from '../../../components/provinces/provinceResult';

const mockProvince = {
  provinceId: 1,
  name: 'Buenos Aires',
  countryId: 2,
  visiteds: [
    { id: 10, userId: 'abc', provinceId: 1, photos: [] },
    { id: 11, userId: 'def', provinceId: 1, photos: [] },
  ],
};

describe('ProvinceResult', () => {
  test('renderiza los datos de la provincia', () => {
    render(<ProvinceResult province={mockProvince} />);
    expect(screen.getAllByText(/ID: 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Nombre: Buenos Aires/i)).toBeInTheDocument();
    expect(screen.getAllByText(/CountryId: 2/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Visitados: 2/i)).toBeInTheDocument();
  });

  test('renderiza Visitados: 0 si no hay visiteds', () => {
    const provinceWithoutVisiteds = { ...mockProvince, visiteds: [] };
    render(<ProvinceResult province={provinceWithoutVisiteds} />);
    expect(screen.getAllByText(/Visitados: 0/i)).toBeInTheDocument();
  });

  test('no renderiza nada si province es null', () => {
    const { container } = render(<ProvinceResult province={null} />);
    expect(container.firstChild).toBeNull();
  });
});