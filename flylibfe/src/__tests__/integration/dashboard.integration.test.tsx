import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../pages/common/dashboard';
import { AuthContext } from '../../context/AuthContext';

// Mock componentes hijos para integración
jest.mock('../../components/common/dashboardHeader', () => ({ displayName }: any) => (
  <div data-testid="dashboard-header">{displayName}</div>
));
jest.mock('../../components/common/dashboardMenu', () => () => (
  <div data-testid="dashboard-menu">Menu</div>
));
jest.mock('../../components/common/dashboardContent', () => () => (
  <div data-testid="dashboard-content">Content</div>
));

const mockLogin = jest.fn();
const mockLogout = jest.fn();
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

describe('Integración: Dashboard', () => {
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
    expect(screen.getByTestId('dashboard-header')).toHaveTextContent('Ignacio');
    expect(screen.getByTestId('dashboard-menu')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cerrar sesión/i })).toBeInTheDocument();
  });

  test('al hacer click en "Cerrar sesión" llama a logout y navega', () => {
    renderWithAuth({
      isAuthenticated: true,
      displayName: 'Ignacio',
      login: mockLogin,
      logout: mockLogout,
      roles: ['Admin', 'User'],
    });
    fireEvent.click(screen.getByRole('button', { name: /Cerrar sesión/i }));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});