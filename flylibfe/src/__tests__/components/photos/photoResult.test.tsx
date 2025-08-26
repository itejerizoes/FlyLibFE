import React from 'react';
import { render, screen } from '@testing-library/react';
import PhotoResult from '../../../components/photos/photoResult';

const mockPhoto = {
  id: 10,
  url: 'http://test.com/photo.jpg',
  description: 'Foto de prueba',
  visitedId: 5,
};

describe('PhotoResult', () => {
  test('renderiza los datos de la foto', () => {
    render(<PhotoResult photo={mockPhoto} />);
    expect(screen.getAllByText(/ID: 10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Descripción: Foto de prueba/i)).toBeInTheDocument();
    expect(screen.getAllByText(/VisitedId: 5/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Foto de prueba/i)).toHaveAttribute('src', 'http://test.com/photo.jpg');
  });

  test('no renderiza nada si photo es null', () => {
    const { container } = render(<PhotoResult photo={null} />);
    expect(container.firstChild).toBeNull();
  });
});