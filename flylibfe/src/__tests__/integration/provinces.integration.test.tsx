import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Provinces from '../../pages/provinces/provinces';

// Mockea el hook useFetch y el componente ProvincesList
jest.mock('../../hooks/useFetch');
jest.mock('../../components/provinces/provincesList', () => (props: any) => (
  <div data-testid="provinces-list">{JSON.stringify(props.provinces)}</div>
));

const useFetchMock = require('../../hooks/useFetch');

describe('Integración: Provinces', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Provinces />);
    expect(screen.getAllByText(/Listado de Provincias/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando provincias/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Provinces />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de provincias si hay datos', async () => {
    const mockProvinces = [
      { provinceId: 1, name: 'Buenos Aires', countryId: 2, visiteds: [] },
      { provinceId: 2, name: 'Córdoba', countryId: 2, visiteds: [] },
    ];
    useFetchMock.useFetch.mockReturnValue({
      data: mockProvinces,
      loading: false,
      error: null,
    });
    render(<Provinces />);
    await waitFor(() => {
      expect(screen.getByTestId('provinces-list')).toHaveTextContent(JSON.stringify(mockProvinces));
    });
  });
});