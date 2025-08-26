import React from 'react';
import { render, screen } from '@testing-library/react';
import Users from '../../../pages/users/users';
import * as useFetchHook from '../../../hooks/useFetch';

jest.mock('../../../hooks/useFetch');
jest.mock('../../../components/users/usersList', () => (props: any) => (
  <div data-testid="users-list">{JSON.stringify(props.users)}</div>
));

describe('Users page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Users />);
    expect(screen.getAllByText(/Listado de Usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Users />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de usuarios si hay datos', () => {
    const mockUsers = [
      { id: '1', displayName: 'Ignacio', authProvider: 'local' },
      { id: '2', displayName: 'Maria', authProvider: 'google' },
    ];
    (useFetchHook.useFetch as jest.Mock).mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
    });
    render(<Users />);
    expect(screen.getByTestId('users-list')).toHaveTextContent(JSON.stringify(mockUsers));
  });
});