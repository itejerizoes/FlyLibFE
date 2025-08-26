import React from 'react';
import { render, screen } from '@testing-library/react';
import PhotosList from '../../../components/photos/photosList';

const mockPhotos = [
  {
    id: 1,
    url: 'http://test.com/photo1.jpg',
    description: 'Foto 1',
    visitedId: 10,
  },
  {
    id: 2,
    url: 'http://test.com/photo2.jpg',
    description: '',
    visitedId: 20,
  },
];

describe('PhotosList', () => {
  test('renderiza la lista de fotos con sus datos', () => {
    render(<PhotosList photos={mockPhotos} />);
    expect(screen.getByAltText('Foto 1')).toHaveAttribute('src', 'http://test.com/photo1.jpg');
    expect(screen.getAllByText(/Foto 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/VisitadoId: 10/i)).toBeInTheDocument();

    expect(screen.getByAltText('Foto')).toHaveAttribute('src', 'http://test.com/photo2.jpg');
    expect(screen.getAllByText(/Sin descripción/i)).toBeInTheDocument();
    expect(screen.getAllByText(/VisitadoId: 20/i)).toBeInTheDocument();
  });

  test('renderiza el número correcto de elementos', () => {
    render(<PhotosList photos={mockPhotos} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('renderiza vacío si no hay fotos', () => {
    render(<PhotosList photos={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});