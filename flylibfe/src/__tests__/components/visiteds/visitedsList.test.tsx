import React from 'react';
import { render, screen } from '@testing-library/react';
import VisitedList from '../../../components/visiteds/visitedsList';

const mockVisiteds = [
  {
    id: 1,
    userId: 'abc',
    provinceId: 10,
    photos: [
      { id: 1, url: 'http://test.com/1.jpg', visitedId: 1, description: '' },
      { id: 2, url: 'http://test.com/2.jpg', visitedId: 1, description: '' },
    ],
  },
  {
    id: 2,
    userId: 'def',
    provinceId: 20,
    photos: [],
  },
];

describe('VisitedList', () => {
  test('renderiza el título y los registros', () => {
    render(<VisitedList visiteds={mockVisiteds} loading={false} />);
    expect(screen.getAllByText(/Listado de registros/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Usuario: abc/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Provincia: 10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Fotos: 2/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Usuario: def/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Provincia: 20/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Fotos: 0/i)).toBeInTheDocument();
  });

  test('renderiza el mensaje de carga cuando loading es true', () => {
    render(<VisitedList visiteds={[]} loading={true} />);
    expect(screen.getAllByText(/Cargando registros/i)).toBeInTheDocument();
  });

  test('renderiza el número correcto de elementos', () => {
    render(<VisitedList visiteds={mockVisiteds} loading={false} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('renderiza vacío si no hay registros y loading es false', () => {
    render(<VisitedList visiteds={[]} loading={false} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});