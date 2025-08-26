import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Users from '../../pages/users/users';

// Mockea el hook useFetch y el componente UsersList
jest.mock('../../hooks/useFetch');
jest.mock('../../components/users/usersList', () => (props: any) => (
  <div data-testid="users-list">{JSON.stringify(props.users)}</div>
));

const useFetchMock = require('../../hooks/useFetch');

describe('Integración: Users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el título y el mensaje de carga', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    render(<Users />);
    expect(screen.getAllByText(/Listado de Usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('muestra el mensaje de error si hay error', () => {
    useFetchMock.useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error al cargar',
    });
    render(<Users />);
    expect(screen.getAllByText(/Error al cargar/i)).toBeInTheDocument();
  });

  test('renderiza la lista de usuarios si hay datos', async () => {
    const mockUsers = [
      { id: '1', displayName: 'Ignacio', authProvider: 'local', visiteds: [] },
      { id: '2', displayName: 'Maria', authProvider: 'google', visiteds: [] },
    ];
    useFetchMock.useFetch.mockReturnValue({
      data: mockUsers,
      loading: false,
      error: null,
    });
    render(<Users />);
    await waitFor(() => {
      expect(screen.getByTestId('users-list')).toHaveTextContent(JSON.stringify(mockUsers));
    });
  });
});