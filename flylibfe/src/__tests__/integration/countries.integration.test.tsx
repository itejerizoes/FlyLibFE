import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Countries from '../../pages/countries/countries';

// Mockea el hook useFetch y el componente CountriesList
jest.mock('../../hooks/useFetch');
jest.mock('../../components/countries/countriesList', () => (props: any) => (
  <div data-testid="countries-list">{JSON.stringify(props.countries)}</div>
));

const useFetchMock = require('../../hooks/useFetch');

describe('Integración: Countries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Countries />);
    expect(screen.getAllByText(/Listado de Países/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando países/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Countries />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de países si hay datos', async () => {
    const mockCountries = [
      { countryId: 1, name: 'Argentina', isoCode: 'AR', provinces: [] },
      { countryId: 2, name: 'Brasil', isoCode: 'BR', provinces: [] },
    ];
    useFetchMock.useFetch.mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
    });
    render(<Countries />);
    await waitFor(() => {
      expect(screen.getByTestId('countries-list')).toHaveTextContent(JSON.stringify(mockCountries));
    });
  });
});