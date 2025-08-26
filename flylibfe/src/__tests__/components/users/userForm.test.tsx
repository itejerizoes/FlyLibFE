import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../../../components/users/userForm';

describe('UserForm', () => {
  const defaultValues = { displayName: '', authProvider: '' };

  test('renderiza los campos de nombre y proveedor', () => {
    render(
      <UserForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/Display Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Auth Provider/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear/i })).toBeInTheDocument();
  });

  test('renderiza el campo ID y botón Eliminar si isUpdate es true', () => {
    render(
      <UserForm
        initialValues={{ id: '1', displayName: 'Ignacio', authProvider: 'local' }}
        loading={false}
        isUpdate={true}
        onSubmit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Actualizar/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si los campos están vacíos y se envía el formulario', async () => {
    render(
      <UserForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/El proveedor es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <UserForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/Display Name/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Auth Provider/i), { target: { value: 'local' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        displayName: 'Ignacio',
        authProvider: 'local',
        isUpdate: false,
      })
    );
    expect(await screen.findByText(/Usuario creado/i)).toBeInTheDocument();
  });

  test('llama a onDelete cuando se hace click en el botón Eliminar', () => {
    const handleDelete = jest.fn();
    render(
      <UserForm
        initialValues={{ id: '2', displayName: 'Maria', authProvider: 'google' }}
        loading={false}
        isUpdate={true}
        onSubmit={jest.fn()}
        onDelete={handleDelete}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/i }));
    expect(handleDelete).toHaveBeenCalled();
  });

  test('muestra mensaje de error si falla el submit', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('Error'));
    render(
      <UserForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/Display Name/i), { target: { value: 'Ignacio' } });
    fireEvent.change(screen.getByLabelText(/Auth Provider/i), { target: { value: 'local' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/Error al crear usuario/i)).toBeInTheDocument();
  });
});