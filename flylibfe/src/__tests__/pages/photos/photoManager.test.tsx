import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhotoManager from '../../../pages/photos/photoManager';

jest.mock('../../../api/photos', () => ({
  createPhoto: jest.fn(),
  updatePhoto: jest.fn(),
  deletePhoto: jest.fn(),
  getPhotoById: jest.fn(),
}));

jest.mock('../../../components/photos/photoForm', () => (props: any) => (
  <button onClick={() => props.onSubmit && props.onSubmit(props.initialValues)}>
    {props.isUpdate ? 'Actualizar' : 'Crear'}
  </button>
));
jest.mock('../../../components/photos/photoSearch', () => (props: any) => (
  <button onClick={props.handleSearch}>Buscar</button>
));
jest.mock('../../../components/photos/photoResult', () => (props: any) => (
  <div data-testid="photo-result">{props.photo ? props.photo.id : 'Sin foto'}</div>
));
jest.mock('../../../components/global/modal', () => (props: any) =>
  props.open ? <div data-testid="modal">{props.title}{props.children}</div> : null
);

const {
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoById,
} = require('../../../api/photos');

describe('PhotoManager page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los títulos de las secciones', () => {
    render(<PhotoManager />);
    expect(screen.getAllByText(/Gestión de Fotos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Crear foto/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Actualizar\/Eliminar foto/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Buscar foto por ID/i)).toBeInTheDocument();
  });

  test('crear foto exitoso muestra modal de éxito', async () => {
    createPhoto.mockResolvedValue({ id: 123 });
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Foto creada: 123');
    });
  });

  test('crear foto con error muestra modal de error', async () => {
    createPhoto.mockRejectedValue(new Error('fail'));
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al crear foto');
    });
  });

  test('actualizar foto exitoso muestra modal de éxito', async () => {
    updatePhoto.mockResolvedValue({});
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Foto actualizada');
    });
  });

  test('actualizar foto con error muestra modal de error', async () => {
    updatePhoto.mockRejectedValue(new Error('fail'));
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al actualizar foto');
    });
  });

  test('eliminar foto exitoso muestra modal de éxito', async () => {
    deletePhoto.mockResolvedValue({});
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Foto eliminada');
    });
  });

  test('eliminar foto con error muestra modal de error', async () => {
    deletePhoto.mockRejectedValue(new Error('fail'));
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al eliminar foto');
    });
  });

  test('buscar foto por ID exitoso muestra el resultado', async () => {
    getPhotoById.mockResolvedValue({ id: 555 });
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('photo-result')).toHaveTextContent('555');
    });
  });

  test('buscar foto por ID con error muestra modal de error', async () => {
    getPhotoById.mockRejectedValue(new Error('fail'));
    render(<PhotoManager />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Foto no encontrada');
    });
  });
});