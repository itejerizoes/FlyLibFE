import React from 'react';
import { render, screen } from '@testing-library/react';
import VisitedResult from '../../../components/visiteds/visitedResult';

const mockVisited = {
  id: 10,
  userId: 'abc',
  provinceId: 5,
  photos: [
    { id: 1, url: 'http://test.com/1.jpg', visitedId: 10, description: '' },
    { id: 2, url: 'http://test.com/2.jpg', visitedId: 10, description: '' },
  ],
};

describe('VisitedResult', () => {
  test('renderiza los datos del registro visitado', () => {
    render(<VisitedResult visited={mockVisited} />);
    expect(screen.getAllByText(/ID: 10/i)).toBeInTheDocument();
    expect(screen.getAllByText(/UserId: abc/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ProvinceId: 5/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Fotos: 2/i)).toBeInTheDocument();
  });

  test('renderiza Fotos: 0 si no hay fotos', () => {
    const visitedWithoutPhotos = { ...mockVisited, photos: [] };
    render(<VisitedResult visited={visitedWithoutPhotos} />);
    expect(screen.getAllByText(/Fotos: 0/i)).toBeInTheDocument();
  });

  test('no renderiza nada si visited es null', () => {
    const { container } = render(<VisitedResult visited={null} />);
    expect(container.firstChild).toBeNull();
  });
});