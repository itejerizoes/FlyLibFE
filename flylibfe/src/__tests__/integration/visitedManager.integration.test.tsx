import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VisitedManager from '../../pages/visiteds/visitedManager';

// Mock API
jest.mock('../../api/visiteds', () => ({
  getVisiteds: jest.fn().mockResolvedValue([
    { id: 1, userId: 'abc', provinceId: 10, photos: [] }
  ]),
  getVisitedById: jest.fn(),
  createVisited: jest.fn(),
  updateVisited: jest.fn(),
  deleteVisited: jest.fn(),
}));

// Mock componentes hijos
jest.mock('../../components/visiteds/visitedsList', () => (props: any) => (
  <div data-testid="visiteds-list">{JSON.stringify(props.visiteds)}</div>
));
jest.mock('../../components/visiteds/visitedForm', () => (props: any) => (
  <>
    <button onClick={() => props.onSubmit && props.onSubmit(props.initialValues)}>
      {props.isUpdate ? 'Actualizar' : 'Crear'}
    </button>
    {props.isUpdate && (
      <button onClick={props.onDelete}>Eliminar</button>
    )}
  </>
));
jest.mock('../../components/visiteds/visitedSearch', () => (props: any) => (
  <button onClick={props.handleSearch}>Buscar</button>
));
jest.mock('../../components/visiteds/visitedResult', () => (props: any) => (
  <div data-testid="visited-result">{props.visited ? props.visited.id : 'Sin registro'}</div>
));
jest.mock('../../components/global/modal', () => (props: any) =>
  props.open ? <div data-testid="modal">{props.title}{props.children}</div> : null
);

const {
  getVisitedById,
  createVisited,
  updateVisited,
  deleteVisited,
} = require('../../api/visiteds');

describe('Integración: VisitedManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los títulos de las secciones y la lista', async () => {
    render(<VisitedManager />);
    expect(screen.getAllByText(/Gestión de Provincias Visitadas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Crear registro/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Actualizar\/Eliminar registro/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Buscar registro por ID/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('visiteds-list')).toBeInTheDocument());
  });

  test('crear registro exitoso muestra modal de éxito y actualiza la lista', async () => {
    createVisited.mockResolvedValue({ id: 2, userId: 'def', provinceId: 20, photos: [] });
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Registro creado: 2');
      expect(createVisited).toHaveBeenCalled();
      expect(screen.getByTestId('visiteds-list')).toHaveTextContent('def');
    });
  });

  test('crear registro con error muestra modal de error', async () => {
    createVisited.mockRejectedValue(new Error('fail'));
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al crear registro');
    });
  });

  test('actualizar registro exitoso muestra modal de éxito', async () => {
    updateVisited.mockResolvedValue({});
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Registro actualizado');
      expect(updateVisited).toHaveBeenCalled();
    });
  });

  test('actualizar registro con error muestra modal de error', async () => {
    updateVisited.mockRejectedValue(new Error('fail'));
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al actualizar registro');
    });
  });

  test('eliminar registro exitoso muestra modal de éxito y actualiza la lista', async () => {
    deleteVisited.mockResolvedValue({});
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Eliminar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Registro eliminado');
      expect(deleteVisited).toHaveBeenCalled();
    });
  });

  test('eliminar registro con error muestra modal de error', async () => {
    deleteVisited.mockRejectedValue(new Error('fail'));
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Eliminar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al eliminar registro');
    });
  });

  test('buscar registro por ID exitoso muestra el resultado', async () => {
    getVisitedById.mockResolvedValue({ id: 5, userId: 'xyz', provinceId: 99, photos: [] });
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('visited-result')).toHaveTextContent('5');
    });
  });

  test('buscar registro por ID con error muestra modal de error', async () => {
    getVisitedById.mockRejectedValue(new Error('fail'));
    render(<VisitedManager />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Registro no encontrado');
    });
  });
});