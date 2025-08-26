import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../../pages/common/dashboard';
import { AuthContext } from '../../../context/AuthContext';

const mockLogout = jest.fn();
const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?token=abc&refreshToken=def&displayName=Ignacio&roles=Admin,User',
  }),
  useNavigate: () => mockNavigate,
}));

function renderWithAuth(authProps: any) {
  return render(
    <AuthContext.Provider value={authProps}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('Dashboard page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('muestra "Cargando..." si processing es true o no autenticado', () => {
    renderWithAuth({
      isAuthenticated: false,
      displayName: '',
      login: mockLogin,
      logout: mockLogout,
      roles: [],
    });
    expect(screen.getAllByText(/Cargando/i)).toBeInTheDocument();
  });

  test('llama a login y navega si hay token en la URL y no autenticado', async () => {
    renderWithAuth({
      isAuthenticated: false,
      displayName: '',
      login: mockLogin,
      logout: mockLogout,
      roles: [],
    });
    await act(async () => {});
    expect(mockLogin).toHaveBeenCalledWith('abc', 'def', 'Ignacio', ['Admin', 'User']);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
  });

  test('renderiza el dashboard si autenticado', () => {
    renderWithAuth({
      isAuthenticated: true,
      displayName: 'Ignacio',
      login: mockLogin,
      logout: mockLogout,
      roles: ['Admin', 'User'],
    });
    expect(screen.getAllByText(/Cerrar sesión/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Bienvenido, Ignacio/i)).toBeInTheDocument();
  });

  test('al hacer click en "Cerrar sesión" llama a logout y navega', () => {
    renderWithAuth({
      isAuthenticated: true,
      displayName: 'Ignacio',
      login: mockLogin,
      logout: mockLogout,
      roles: ['Admin', 'User'],
    });
    act(() => {
      screen.getByRole('button', { name: /Cerrar sesión/i }).click();
    });
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});