import React from 'react';
import { render, screen } from '@testing-library/react';
import Provinces from '../../../pages/provinces/provinces';
import * as useFetchHook from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');
jest.mock('../../../components/provinces/provincesList', () => (props: any) => (
  <div data-testid="provinces-list">{JSON.stringify(props.provinces)}</div>
));

describe('Provinces page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Provinces />);
    expect(screen.getAllByText(/Listado de Provincias/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando provincias/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Provinces />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de provincias si hay datos', () => {
    const mockProvinces = [
      { provinceId: 1, name: 'Buenos Aires', countryId: 2, visiteds: [] },
      { provinceId: 2, name: 'Córdoba', countryId: 2, visiteds: [] },
    ];
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: mockProvinces,
      loading: false,
      error: null,
    });
    render(<Provinces />);
    expect(screen.getByTestId('provinces-list')).toHaveTextContent(JSON.stringify(mockProvinces));
  });
});