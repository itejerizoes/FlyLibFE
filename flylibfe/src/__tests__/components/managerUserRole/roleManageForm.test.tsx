import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoleManageForm from '../../../components/managerUserRole/roleManageForm';

describe('RoleManageForm', () => {
  test('renderiza el campo y los botones', () => {
    render(
      <RoleManageForm
        loading={false}
        onCreate={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/Nombre del rol/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear rol/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eliminar rol/i })).toBeInTheDocument();
  });

  test('muestra error de validación si el campo está vacío y se envía el formulario', async () => {
    render(
      <RoleManageForm
        loading={false}
        onCreate={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Crear rol/i }));
    expect(await screen.findByText(/El nombre del rol es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onCreate con el valor correcto', async () => {
    const handleCreate = jest.fn().mockResolvedValue(undefined);
    render(
      <RoleManageForm
        loading={false}
        onCreate={handleCreate}
        onDelete={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre del rol/i), { target: { value: 'Editor' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear rol/i }));
    await waitFor(() =>
      expect(handleCreate).toHaveBeenCalledWith({ roleName: 'Editor' })
    );
    expect(await screen.findByText(/Rol creado correctamente/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error si falla la creación', async () => {
    const handleCreate = jest.fn().mockRejectedValue(new Error('Error'));
    render(
      <RoleManageForm
        loading={false}
        onCreate={handleCreate}
        onDelete={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre del rol/i), { target: { value: 'Editor' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear rol/i }));
    expect(await screen.findByText(/Error al crear rol/i)).toBeInTheDocument();
  });

  test('llama a onDelete con el valor correcto', async () => {
    const handleDelete = jest.fn().mockResolvedValue(undefined);
    render(
      <RoleManageForm
        loading={false}
        onCreate={jest.fn()}
        onDelete={handleDelete}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre del rol/i), { target: { value: 'Admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Eliminar rol/i }));
    await waitFor(() =>
      expect(handleDelete).toHaveBeenCalledWith({ roleName: 'Admin' })
    );
    expect(await screen.findByText(/Rol eliminado correctamente/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error si falla la eliminación', async () => {
    const handleDelete = jest.fn().mockRejectedValue(new Error('Error'));
    render(
      <RoleManageForm
        loading={false}
        onCreate={jest.fn()}
        onDelete={handleDelete}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre del rol/i), { target: { value: 'Admin' } });
    fireEvent.click(screen.getByRole('button', { name: /Eliminar rol/i }));
    expect(await screen.findByText(/Error al eliminar rol/i)).toBeInTheDocument();
  });
});