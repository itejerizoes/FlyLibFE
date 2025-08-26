import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManagerUserRole from '../../pages/managerUserRole/managerUserRole';

// Mock API
jest.mock('../../api/manageruserrole', () => ({
  getUsers: jest.fn().mockResolvedValue([
    { id: '1', displayName: 'Ignacio', email: 'ignacio@test.com', roles: ['Admin'] }
  ]),
  getUserByEmail: jest.fn(),
  getRoles: jest.fn().mockResolvedValue(['Admin', 'User']),
  assignRole: jest.fn(),
  removeRole: jest.fn(),
  createRole: jest.fn(),
  deleteRole: jest.fn(),
}));

// Mock componentes hijos
jest.mock('../../components/managerUserRole/userRoleList', () => (props: any) => (
  <div data-testid="user-list">{JSON.stringify(props.users)}</div>
));
jest.mock('../../components/managerUserRole/userRoleSearch', () => (props: any) => (
  <div>
    <button onClick={props.handleSearch}>Buscar</button>
    {props.userResult && <div data-testid="user-result">{props.userResult.displayName}</div>}
  </div>
));
jest.mock('../../components/managerUserRole/roleAssignForm', () => (props: any) => (
  <div>
    <button onClick={props.onSubmit}>Asignar rol</button>
    <button onClick={props.onRemove}>Remover rol</button>
  </div>
));
jest.mock('../../components/managerUserRole/roleManageForm', () => (props: any) => (
  <div>
    <button onClick={props.onCreate}>Crear rol</button>
    <button onClick={props.onDelete}>Eliminar rol</button>
  </div>
));
jest.mock('../../components/global/modal', () => (props: any) =>
  props.open ? <div data-testid="modal">{props.title}{props.children}</div> : null
);

const {
  getUserByEmail,
  assignRole,
  removeRole,
  createRole,
  deleteRole,
} = require('../../api/manageruserrole');

describe('Integración: ManagerUserRole', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza los títulos de las secciones y la lista', async () => {
    render(<ManagerUserRole />);
    expect(screen.getAllByText(/Gestión de Usuarios y Roles/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Buscar usuario por Email/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Asignar\/Remover rol a usuario/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Crear\/Eliminar rol/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('user-list')).toBeInTheDocument());
  });

  test('buscar usuario exitoso muestra el resultado', async () => {
    getUserByEmail.mockResolvedValue({ displayName: 'Maria' });
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('user-result')).toHaveTextContent('Maria');
    });
  });

  test('buscar usuario con error muestra modal de error', async () => {
    getUserByEmail.mockRejectedValue(new Error('fail'));
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Buscar'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Usuario no encontrado');
    });
  });

  test('asignar rol exitoso muestra modal de éxito', async () => {
    assignRole.mockResolvedValue({ message: 'Rol asignado correctamente' });
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Asignar rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Rol asignado correctamente');
    });
  });

  test('asignar rol con error muestra modal de error', async () => {
    assignRole.mockRejectedValue(new Error('fail'));
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Asignar rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al asignar rol');
    });
  });

  test('remover rol exitoso muestra modal de éxito', async () => {
    removeRole.mockResolvedValue({ message: 'Rol removido correctamente' });
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Remover rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Rol removido correctamente');
    });
  });

  test('remover rol con error muestra modal de error', async () => {
    removeRole.mockRejectedValue(new Error('fail'));
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Remover rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al remover rol');
    });
  });

  test('crear rol exitoso muestra modal de éxito', async () => {
    createRole.mockResolvedValue({ message: 'Rol creado correctamente' });
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Crear rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Rol creado correctamente');
    });
  });

  test('crear rol con error muestra modal de error', async () => {
    createRole.mockRejectedValue(new Error('fail'));
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Crear rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al crear rol');
    });
  });

  test('eliminar rol exitoso muestra modal de éxito', async () => {
    deleteRole.mockResolvedValue({ message: 'Rol eliminado correctamente' });
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Eliminar rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Éxito');
      expect(screen.getByTestId('modal')).toHaveTextContent('Rol eliminado correctamente');
    });
  });

  test('eliminar rol con error muestra modal de error', async () => {
    deleteRole.mockRejectedValue(new Error('fail'));
    render(<ManagerUserRole />);
    fireEvent.click(screen.getAllByText('Eliminar rol'));
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toHaveTextContent('Error');
      expect(screen.getByTestId('modal')).toHaveTextContent('Error al eliminar rol');
    });
  });
});