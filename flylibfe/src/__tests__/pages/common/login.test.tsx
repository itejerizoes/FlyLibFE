import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../pages/common/login';
import { AuthContext } from '../../../context/AuthContext';
import * as useLoginHook from '../../../hooks/useLogin';
import * as useRedirectIfAuthenticatedHook from '../../../hooks/useRedirectIfAuthenticated';

jest.mock('../../../hooks/useLogin');
jest.mock('../../../hooks/useRedirectIfAuthenticated');

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLoginHook.useLogin as jest.Mock).mockReturnValue({
      loginUser: jest.fn(),
      loading: false,
      error: null,
    });
    (useRedirectIfAuthenticatedHook.useRedirectIfAuthenticated as jest.Mock).mockImplementation(() => {});
  });

  test('renderiza el formulario y el botón de Google', () => {
    renderWithAuth();
    expect(screen.getAllByText(/Iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión con Google/i })).toBeInTheDocument();
    expect(screen.getAllByText(/¿No tienes cuenta\?/i)).toBeInTheDocument();
  });

  test('llama a login y navega al dashboard si el login es exitoso', async () => {
    const mockLoginUser = jest.fn().mockResolvedValue({
      token: 'abc',
      refreshToken: 'def',
      displayName: 'Ignacio',
      roles: ['Admin', 'User'],
    });
    (useLoginHook.useLogin as jest.Mock).mockReturnValue({
      loginUser: mockLoginUser,
      loading: false,
      error: null,
    });

    renderWithAuth();

    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith('test@test.com', '123456');
      expect(mockLogin).toHaveBeenCalledWith('abc', 'def', 'Ignacio', ['Admin', 'User']);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('muestra mensaje de error si el login falla', async () => {
    const mockLoginUser = jest.fn().mockResolvedValue(null);
    (useLoginHook.useLogin as jest.Mock).mockReturnValue({
      loginUser: mockLoginUser,
      loading: false,
      error: 'Credenciales inválidas',
    });

    renderWithAuth();

    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'fail@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  test('redirige a Google login externo al hacer click en el botón', () => {
    renderWithAuth();
    const hrefSpy = jest.spyOn(window.location, 'href', 'set');
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión con Google/i }));
    expect(hrefSpy).toHaveBeenCalledWith(expect.stringContaining('external-login?provider=Google'));
    hrefSpy.mockRestore();
  });
});