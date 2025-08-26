import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoleAssignForm from '../../../components/managerUserRole/roleAssignForm';

describe('RoleAssignForm', () => {
  const roles = ['Admin', 'User'];

  test('renderiza los campos y botones', () => {
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/Email de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rol/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Asignar rol/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remover rol/i })).toBeInTheDocument();
  });

  test('muestra errores de validación si los campos están vacíos y se envía el formulario', async () => {
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={jest.fn()}
        onRemove={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Asignar rol/i }));
    expect(await screen.findByText(/El correo es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/El rol es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={handleSubmit}
        onRemove={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/Email de usuario/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'Admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Asignar rol/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({ userEmail: 'test@test.com', role: 'Admin' })
    );
  });

  test('llama a onRemove con los valores correctos', async () => {
    const handleRemove = jest.fn().mockResolvedValue(undefined);
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={jest.fn()}
        onRemove={handleRemove}
      />
    );
    fireEvent.change(screen.getByLabelText(/Email de usuario/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'User' } });
    fireEvent.click(screen.getByRole('button', { name: /Remover rol/i }));
    await waitFor(() =>
      expect(handleRemove).toHaveBeenCalledWith({ userEmail: 'user@test.com', role: 'User' })
    );
  });

  test('muestra mensaje de éxito al asignar rol', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={handleSubmit}
        onRemove={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/Email de usuario/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'Admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Asignar rol/i }));
    expect(await screen.findByText(/Rol asignado correctamente/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error al fallar la asignación de rol', async () => {
    const handleSubmit = jest.fn().mockRejectedValue(new Error('Error'));
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={handleSubmit}
        onRemove={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/Email de usuario/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'Admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Asignar rol/i }));
    expect(await screen.findByText(/Error al asignar rol/i)).toBeInTheDocument();
  });

  test('muestra mensaje de éxito al remover rol', async () => {
    const handleRemove = jest.fn().mockResolvedValue(undefined);
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={jest.fn()}
        onRemove={handleRemove}
      />
    );
    fireEvent.change(screen.getByLabelText(/Email de usuario/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'User' } });
    fireEvent.click(screen.getByRole('button', { name: /Remover rol/i }));
    expect(await screen.findByText(/Rol removido correctamente/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error al fallar la remoción de rol', async () => {
    const handleRemove = jest.fn().mockRejectedValue(new Error('Error'));
    render(
      <RoleAssignForm
        roles={roles}
        loading={false}
        onSubmit={jest.fn()}
        onRemove={handleRemove}
      />
    );
    fireEvent.change(screen.getByLabelText(/Email de usuario/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByLabelText(/Rol/i), { target: { value: 'User' } });
    fireEvent.click(screen.getByRole('button', { name: /Remover rol/i }));
    expect(await screen.findByText(/Error al remover rol/i)).toBeInTheDocument();
  });
});