import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../../components/common/loginForm';

describe('LoginForm', () => {
  test('renderiza los campos de correo y contraseña', () => {
    render(<LoginForm loading={false} error={null} onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si los campos están vacíos y se envía el formulario', async () => {
    render(<LoginForm loading={false} error={null} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(await screen.findByText(/El correo es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(<LoginForm loading={false} error={null} onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' }));
  });

  test('muestra mensaje de error si el login falla', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('Error al iniciar sesión'));
    render(<LoginForm loading={false} error={'Credenciales inválidas'} onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(await screen.findByText(/Credenciales inválidas/i)).toBeInTheDocument();
  });
});