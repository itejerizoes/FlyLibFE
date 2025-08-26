import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManagerUser from '../../../pages/users/managerUser';

jest.mock('../../../api/users', () => ({
  getUsers: jest.fn().mockResolvedValue([
    { id: '1', displayName: 'Ignacio', authProvider: 'local' }
  ]),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock('../../../components/users/usersList', () => (props: any) => (
  <div data-testid="users-list">{JSON.stringify(props.users)}</div>
));
jest.mock('../../../components/users/userForm', () => (props: any) => (
  <button onClick={() => props.onSubmit && props.onSubmit(props.initialValues)}>
    {props.isUpdate ? 'Actualizar' : 'Crear'}
  </button>
));
jest.mock('../../../components/users/userSearch', () => (props: any) => (
  <div>
    <button onClick={props.handleSearch}>Buscar</button>
    {props.userResult && <div data-testid="user-result">{props.userResult.displayName}</div>}
  </div>
));
jest.mock('../../../components/global/modal', () => (props: any) =>
  props.open ? <div data-testid="modal">{props.title}{props.children}</div> : null
);

const {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../../api/users');

describe('ManagerUser page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los títulos de las secciones', async () => {
    render(<ManagerUser />);
    expect(screen.getAllByText(/Gestión de Usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Crear usuario/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Actualizar\/Eliminar usuario/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Buscar usuario por ID/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('users-list')).toBeInTheDocument());
  });

  test('crear usuario exitoso muestra modal de éxito', async () => {
    createUser.mockResolvedValue({ id: '2', displayName: 'Maria', authProvider: 'google' });
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Usuario creado: Maria');
    });
  });

  test('crear usuario con error muestra modal de error', async () => {
    createUser.mockRejectedValue(new Error('fail'));
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Crear'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al crear usuario');
    });
  });

  test('actualizar usuario exitoso muestra modal de éxito', async () => {
    updateUser.mockResolvedValue({});
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Usuario actualizado');
    });
  });

  test('actualizar usuario con error muestra modal de error', async () => {
    updateUser.mockRejectedValue(new Error('fail'));
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al actualizar usuario');
    });
  });

  test('eliminar usuario exitoso muestra modal de éxito', async () => {
    deleteUser.mockResolvedValue({});
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Usuario eliminado');
    });
  });

  test('eliminar usuario con error muestra modal de error', async () => {
    deleteUser.mockRejectedValue(new Error('fail'));
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Actualizar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al eliminar usuario');
    });
  });

  test('buscar usuario por ID exitoso muestra el resultado', async () => {
    getUserById.mockResolvedValue({ id: '3', displayName: 'Pedro', authProvider: 'local' });
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('user-result')).toHaveTextContent('Pedro');
    });
  });

  test('buscar usuario por ID con error muestra modal de error', async () => {
    getUserById.mockRejectedValue(new Error('fail'));
    render(<ManagerUser />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Usuario no encontrado');
    });
  });
});