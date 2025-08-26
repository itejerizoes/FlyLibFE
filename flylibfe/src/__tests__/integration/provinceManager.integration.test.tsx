import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProvinceManager from '../../pages/provinces/provinceManager';

// Mock API
jest.mock('../../api/provinces', () => ({
  createProvince: jest.fn(),
  updateProvince: jest.fn(),
  deleteProvince: jest.fn(),
  getProvinceById: jest.fn(),
  getProvinceByName: jest.fn(),
}));

// Mock componentes hijos
jest.mock('../../components/provinces/provinceForm', () => (props: any) => (
  <button onClick={() => props.onSubmit && props.onSubmit(props.initialValues)}>
    {props.isUpdate ? 'Actualizar' : 'Crear'}
  </button>
));
jest.mock('../../components/provinces/provinceSearch', () => (props: any) => (
  <div>
    <button onClick={props.handleSearchById}>Buscar por ID</button>
    <button onClick={props.handleSearchByName}>Buscar por nombre</button>
  </div>
));
jest.mock('../../components/provinces/provinceResult', () => (props: any) => (
  <div data-testid="province-result">{props.province ? props.province.name : 'Sin provincia'}</div>
));
jest.mock('../../components/global/modal', () => (props: any) =>
  props.open ? <div data-testid="modal">{props.title}{props.children}</div> : null
);

const {
  createProvince,
  updateProvince,
  deleteProvince,
  getProvinceById,
  getProvinceByName,
} = require('../../api/provinces');

describe('Integración: ProvinceManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los títulos de las secciones', () => {
    render(<ProvinceManager />);
    expect(screen.getAllByText(/Gestión de Provincias/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Crear provincia/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Actualizar\/Eliminar provincia/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Buscar provincia/i)).toBeInTheDocument();
  });

  test('crear provincia exitoso muestra modal de éxito', async () => {
    createProvince.mockResolvedValue({ name: 'Salta' });
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Provincia creada: Salta');
    });
  });

  test('crear provincia con error muestra modal de error', async () => {
    createProvince.mockRejectedValue(new Error('fail'));
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al crear provincia');
    });
  });

  test('actualizar provincia exitoso muestra modal de éxito', async () => {
    updateProvince.mockResolvedValue({});
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Provincia actualizada');
    });
  });

  test('actualizar provincia con error muestra modal de error', async () => {
    updateProvince.mockRejectedValue(new Error('fail'));
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al actualizar provincia');
    });
  });

  test('eliminar provincia exitoso muestra modal de éxito', async () => {
    deleteProvince.mockResolvedValue({});
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Provincia eliminada');
    });
  });

  test('eliminar provincia con error muestra modal de error', async () => {
    deleteProvince.mockRejectedValue(new Error('fail'));
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al eliminar provincia');
    });
  });

  test('buscar provincia por ID exitoso muestra el resultado', async () => {
    getProvinceById.mockResolvedValue({ name: 'Buenos Aires' });
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Buscar por ID'));
    await waitFor(() => {
      expect(screen.getByTestId('province-result')).toHaveTextContent('Buenos Aires');
    });
  });

  test('buscar provincia por ID con error muestra modal de error', async () => {
    getProvinceById.mockRejectedValue(new Error('fail'));
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Buscar por ID'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Provincia no encontrada');
    });
  });

  test('buscar provincia por nombre exitoso muestra el resultado', async () => {
    getProvinceByName.mockResolvedValue({ name: 'Córdoba' });
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Buscar por nombre'));
    await waitFor(() => {
      expect(screen.getByTestId('province-result')).toHaveTextContent('Córdoba');
    });
  });

  test('buscar provincia por nombre con error muestra modal de error', async () => {
    getProvinceByName.mockRejectedValue(new Error('fail'));
    render(<ProvinceManager />);
    fireEvent.click(screen.getAllByText('Buscar por nombre'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Provincia no encontrada');
    });
  });
});