import React from 'react';
import { render, screen } from '@testing-library/react';
import Photos from '../../../pages/photos/photos';
import * as useFetchHook from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');
jest.mock('../../../components/photos/photosList', () => (props: any) => (
  <div data-testid="photos-list">{JSON.stringify(props.photos)}</div>
));

describe('Photos page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Photos />);
    expect(screen.getAllByText(/Listado de Fotos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando fotos/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Photos />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de fotos si hay datos', () => {
    const mockPhotos = [
      { id: 1, url: 'http://test.com/photo1.jpg', description: 'Foto 1', visitedId: 10 },
      { id: 2, url: 'http://test.com/photo2.jpg', description: '', visitedId: 20 },
    ];
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: mockPhotos,
      loading: false,
      error: null,
    });
    render(<Photos />);
    expect(screen.getByTestId('photos-list')).toHaveTextContent(JSON.stringify(mockPhotos));
  });
});