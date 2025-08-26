import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../../pages/common/register';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../api/auth', () => ({
  register: jest.fn(),
}));

jest.mock('../../components/global/registerForm', () => (props: any) => (
  <form onSubmit={e => { e.preventDefault(); props.onSubmit({ email: 'test@test.com', displayName: 'Ignacio', password: '123456' }); }}>
    <button type="submit" disabled={props.loading}>Registrarse</button>
    {props.error && <div>{props.error}</div>}
  </form>
));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const { register: apiRegister } = require('../../api/auth');

describe('Integración: Register', () => {
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

  test('registro exitoso navega al login', async () => {
    apiRegister.mockResolvedValue({});
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    await waitFor(() => {
      expect(apiRegister).toHaveBeenCalledWith({
        email: 'test@test.com',
        displayName: 'Ignacio',
        password: '123456',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('registro con error muestra mensaje de error', async () => {
    apiRegister.mockRejectedValue(new Error('fail'));
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/Error al registrar usuario/i)).toBeInTheDocument();
    });
  });
});