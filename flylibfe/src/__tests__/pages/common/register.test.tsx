import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../../pages/common/register';
import * as authApi from '../../../api/auth';

jest.mock('../../../api/auth');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el formulario y el link de login', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Registro/i)).toBeInTheDocument();
    expect(screen.getAllByText(/¿Ya tienes cuenta\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  test('llama a apiRegister y navega al login si el registro es exitoso', async () => {
    (authApi.register as jest.Mock).mockResolvedValue({});
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(authApi.register).toHaveBeenCalledWith({
        email: 'test@test.com',
        displayName: 'Ignacio',
        password: '123456',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('muestra mensaje de error si el registro falla', async () => {
    (authApi.register as jest.Mock).mockRejectedValue(new Error('fail'));
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'fail@test.com' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/Error al registrar usuario/i)).toBeInTheDocument();
    });
  });
});