import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../../../components/global/registerForm';

describe('RegisterForm', () => {
  test('renderiza los campos de correo, nombre y contraseña', () => {
    render(<RegisterForm loading={false} error={null} onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si los campos están vacíos y se envía el formulario', async () => {
    render(<RegisterForm loading={false} error={null} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(await screen.findByText(/El correo es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/La contraseña es obligatoria/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(<RegisterForm loading={false} error={null} onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@test.com',
        displayName: 'Ignacio',
        password: '123456',
      })
    );
  });

  test('muestra mensaje de error si el registro falla', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('Error al registrar usuario'));
    render(<RegisterForm loading={false} error={'Correo ya registrado'} onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(await screen.findByText(/Correo ya registrado/i)).toBeInTheDocument();
  });

  test('muestra mensaje de éxito si el registro es exitoso', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(<RegisterForm loading={false} error={null} onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText(/Correo/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    expect(await screen.findByText(/¡Registro exitoso!/i)).toBeInTheDocument();
  });
});