import React from 'react';
import { render, screen } from '@testing-library/react';
import Countries from '../../../pages/countries/countries';
import * as useFetchHook from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');
jest.mock('../../../components/countries/countriesList', () => (props: any) => (
  <div data-testid="countries-list">{JSON.stringify(props.countries)}</div>
));

describe('Countries page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Countries />);
    expect(screen.getAllByText(/Listado de Países/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando países/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Countries />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de países si hay datos', () => {
    const mockCountries = [
      { countryId: 1, name: 'Argentina', isoCode: 'AR', provinces: [] },
      { countryId: 2, name: 'Brasil', isoCode: 'BR', provinces: [] },
    ];
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: mockCountries,
      loading: false,
      error: null,
    });
    render(<Countries />);
    expect(screen.getByTestId('countries-list')).toHaveTextContent(JSON.stringify(mockCountries));
  });
});