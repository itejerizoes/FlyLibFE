import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CountryManager from '../../pages/countries/countryManager';

// Mock API
jest.mock('../../api/countries', () => ({
  createCountry: jest.fn(),
  updateCountry: jest.fn(),
  deleteCountry: jest.fn(),
  getCountryById: jest.fn(),
  getCountryByName: jest.fn(),
}));

// Mock componentes hijos
jest.mock('../../components/countries/countryForm', () => (props: any) => (
  <button onClick={() => props.onSubmit && props.onSubmit(props.initialValues)}>
    {props.isUpdate ? 'Actualizar' : 'Crear'}
  </button>
));
jest.mock('../../components/countries/countrySearch', () => (props: any) => (
  <div>
    <button onClick={props.handleSearchById}>Buscar por ID</button>
    <button onClick={props.handleSearchByName}>Buscar por nombre</button>
  </div>
));
jest.mock('../../components/countries/countryResult', () => (props: any) => (
  <div data-testid="country-result">{props.country ? props.country.name : 'Sin país'}</div>
));
jest.mock('../../components/global/modal', () => (props: any) =>
  props.open ? <div data-testid="modal">{props.title}{props.children}</div> : null
);

const {
  createCountry,
  updateCountry,
  deleteCountry,
  getCountryById,
  getCountryByName,
} = require('../../api/countries');

describe('Integración: CountryManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los títulos de las secciones', () => {
    render(<CountryManager />);
    expect(screen.getAllByText(/Gestión de Países/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Crear país/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Actualizar\/Eliminar país/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Buscar país/i)).toBeInTheDocument();
  });

  test('crear país exitoso muestra modal de éxito', async () => {
    createCountry.mockResolvedValue({ name: 'Chile' });
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('País creado: Chile');
    });
  });

  test('crear país con error muestra modal de error', async () => {
    createCountry.mockRejectedValue(new Error('fail'));
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al crear país');
    });
  });

  test('actualizar país exitoso muestra modal de éxito', async () => {
    updateCountry.mockResolvedValue({});
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('País actualizado');
    });
  });

  test('actualizar país con error muestra modal de error', async () => {
    updateCountry.mockRejectedValue(new Error('fail'));
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al actualizar país');
    });
  });

  test('eliminar país exitoso muestra modal de éxito', async () => {
    deleteCountry.mockResolvedValue({});
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('País eliminado');
    });
  });

  test('eliminar país con error muestra modal de error', async () => {
    deleteCountry.mockRejectedValue(new Error('fail'));
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al eliminar país');
    });
  });

  test('buscar país por ID exitoso muestra el resultado', async () => {
    getCountryById.mockResolvedValue({ name: 'Argentina' });
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Buscar por ID'));
    await waitFor(() => {
      expect(screen.getByTestId('country-result')).toHaveTextContent('Argentina');
    });
  });

  test('buscar país por ID con error muestra modal de error', async () => {
    getCountryById.mockRejectedValue(new Error('fail'));
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Buscar por ID'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('País no encontrado');
    });
  });

  test('buscar país por nombre exitoso muestra el resultado', async () => {
    getCountryByName.mockResolvedValue({ name: 'Brasil' });
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Buscar por nombre'));
    await waitFor(() => {
      expect(screen.getByTestId('country-result')).toHaveTextContent('Brasil');
    });
  });

  test('buscar país por nombre con error muestra modal de error', async () => {
    getCountryByName.mockRejectedValue(new Error('fail'));
    render(<CountryManager />);
    fireEvent.click(screen.getAllByText('Buscar por nombre'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('País no encontrado');
    });
  });
});