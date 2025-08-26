import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VisitedForm from '../../../components/visiteds/visitedForm';

describe('VisitedForm', () => {
  const defaultValues = { userId: '', provinceId: 0 };

  test('renderiza los campos de UserId y ProvinceId', () => {
    render(
      <VisitedForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/UserId/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ProvinceId/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear/i })).toBeInTheDocument();
  });

  test('renderiza el campo ID y botón Eliminar si isUpdate es true', () => {
    render(
      <VisitedForm
        initialValues={{ id: 1, userId: 'abc', provinceId: 2 }}
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
      <VisitedForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/El UserId es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/El ProvinceId es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <VisitedForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/UserId/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/ProvinceId/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        userId: 'abc',
        provinceId: 2,
      })
    );
    expect(await screen.findByText(/Registro creado/i)).toBeInTheDocument();
  });

  test('llama a onDelete cuando se hace click en el botón Eliminar', () => {
    const handleDelete = jest.fn();
    render(
      <VisitedForm
        initialValues={{ id: 2, userId: 'def', provinceId: 3 }}
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
      <VisitedForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/UserId/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/ProvinceId/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/Error al crear registro/i)).toBeInTheDocument();
  });
});