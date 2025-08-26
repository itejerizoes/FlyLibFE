import React from 'react';
import { render, screen } from '@testing-library/react';
import ProvincesList from '../../../components/provinces/provincesList';

const mockProvinces = [
  {
    provinceId: 1,
    name: 'Buenos Aires',
    countryId: 2,
    visiteds: [
      { id: 10, userId: 'abc', provinceId: 1, photos: [] },
      { id: 11, userId: 'def', provinceId: 1, photos: [] },
    ],
  },
  {
    provinceId: 2,
    name: 'Córdoba',
    countryId: 2,
    visiteds: [],
  },
];

describe('ProvincesList', () => {
  test('renderiza los nombres y el ID del país de cada provincia', () => {
    render(<ProvincesList provinces={mockProvinces} />);
    expect(screen.getAllByText(/Buenos Aires/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\(ID País: 2\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Córdoba/i)).toBeInTheDocument();
  });

  test('renderiza la cantidad de visitados si existen', () => {
    render(<ProvincesList provinces={mockProvinces} />);
    expect(screen.getAllByText(/Visitados: 2/i)).toBeInTheDocument();
  });

  test('no renderiza Visitados si la provincia no tiene visitados', () => {
    render(<ProvincesList provinces={mockProvinces} />);
    expect(screen.queryByText(/Visitados: 0/i)).not.toBeInTheDocument();
  });

  test('renderiza vacío si no hay provincias', () => {
    render(<ProvincesList provinces={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});