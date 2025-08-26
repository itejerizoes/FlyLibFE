import React from 'react';
import { render, screen } from '@testing-library/react';
import Visiteds from '../../../pages/visiteds/visiteds';
import * as useFetchHook from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');
jest.mock('../../../components/visiteds/visitedsList', () => (props: any) => (
  <div data-testid="visiteds-list">{JSON.stringify(props.visiteds)}</div>
));

describe('Visiteds page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Visiteds />);
    expect(screen.getAllByText(/Listado de Provincias Visitadas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando registros de visitas/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Visiteds />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de registros si hay datos', () => {
    const mockVisiteds = [
      { id: 1, userId: 'abc', provinceId: 10, photos: [] },
      { id: 2, userId: 'def', provinceId: 20, photos: [] },
    ];
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: mockVisiteds,
      loading: false,
      error: null,
    });
    render(<Visiteds />);
    expect(screen.getByTestId('visiteds-list')).toHaveTextContent(JSON.stringify(mockVisiteds));
  });
});