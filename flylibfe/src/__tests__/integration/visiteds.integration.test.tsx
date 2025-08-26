import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Visiteds from '../../pages/visiteds/visiteds';

// Mockea el hook useFetch y el componente VisitedList
jest.mock('../../hooks/useFetch');
jest.mock('../../components/visiteds/visitedsList', () => (props: any) => (
  <div data-testid="visiteds-list">{JSON.stringify(props.visiteds)}</div>
));

const useFetchMock = require('../../hooks/useFetch');

describe('Integración: Visiteds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Visiteds />);
    expect(screen.getAllByText(/Listado de Provincias Visitadas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando registros de visitas/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Visiteds />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de registros si hay datos', async () => {
    const mockVisiteds = [
      { id: 1, userId: 'abc', provinceId: 10, photos: [] },
      { id: 2, userId: 'def', provinceId: 20, photos: [] },
    ];
    useFetchMock.useFetch.mockReturnValue({
      data: mockVisiteds,
      loading: false,
      error: null,
    });
    render(<Visiteds />);
    await waitFor(() => {
      expect(screen.getByTestId('visiteds-list')).toHaveTextContent(JSON.stringify(mockVisiteds));
    });
  });
});