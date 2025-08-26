import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/common/login';
import { AuthContext } from '../../context/AuthContext';

// Mock componentes hijos
jest.mock('../../components/common/loginForm', () => (props: any) => (
  <form onSubmit={e => { e.preventDefault(); props.onSubmit({ email: 'test@test.com', password: '123456' }); }}>
    <button type="submit" disabled={props.loading}>Entrar</button>
    {props.error && <div>{props.error}</div>}
  </form>
));
jest.mock('../../components/common/loginGoogleButton', () => (props: any) => (
  <button onClick={props.onClick} disabled={props.loading}>Iniciar sesión con Google</button>
));

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../hooks/useLogin', () => ({
  useLogin: () => ({
    loginUser: jest.fn(async (email, password) => ({
      token: 'abc',
      refreshToken: 'def',
      displayName: 'Ignacio',
      roles: ['Admin', 'User'],
    })),
    loading: false,
    error: null,
  }),
}));

jest.mock('../../hooks/useRedirectIfAuthenticated', () => ({
  useRedirectIfAuthenticated: jest.fn(),
}));

function renderWithAuth() {
  return render(
    <AuthContext.Provider
      value={{
        login: mockLogin,
        logout: jest.fn(),
        isAuthenticated: false,
        displayName: '',
        roles: [],
      }}
    >
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('Integración: Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el formulario y el botón de Google', () => {
    renderWithAuth();
    expect(screen.getAllByText(/Iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión con Google/i })).toBeInTheDocument();
    expect(screen.getAllByText(/¿No tienes cuenta\?/i)).toBeInTheDocument();
  });

  test('login exitoso actualiza contexto y navega', async () => {
    renderWithAuth();
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('abc', 'def', 'Ignacio', ['Admin', 'User']);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('redirige a Google login externo al hacer click en el botón', () => {
    renderWithAuth();
    const hrefSpy = jest.spyOn(window.location, 'href', 'set');
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión con Google/i }));
    expect(hrefSpy).toHaveBeenCalledWith(expect.stringContaining('external-login?provider=Google'));
    hrefSpy.mockRestore();
  });

  test('muestra mensaje de error si el login falla', async () => {
    jest.mock('../../hooks/useLogin', () => ({
      useLogin: () => ({
        loginUser: jest.fn(async () => null),
        loading: false,
        error: 'Credenciales inválidas',
      }),
    }));
    renderWithAuth();
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});