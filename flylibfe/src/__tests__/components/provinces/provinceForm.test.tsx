import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProvinceForm from '../../../components/provinces/provinceForm';

describe('ProvinceForm', () => {
  const defaultValues = { name: '', countryId: 0 };

  test('renderiza los campos de nombre y countryId', () => {
    render(
      <ProvinceForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CountryId/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear/i })).toBeInTheDocument();
  });

  test('renderiza el campo ID y botón Eliminar si isUpdate es true', () => {
    render(
      <ProvinceForm
        initialValues={{ provinceId: 1, name: 'Buenos Aires', countryId: 2 }}
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
      <ProvinceForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/El CountryId es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <ProvinceForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Salta' } });
    fireEvent.change(screen.getByLabelText(/CountryId/i), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'Salta',
        countryId: 3,
      })
    );
    expect(await screen.findByText(/Provincia creada/i)).toBeInTheDocument();
  });

  test('llama a onDelete cuando se hace click en el botón Eliminar', () => {
    const handleDelete = jest.fn();
    render(
      <ProvinceForm
        initialValues={{ provinceId: 2, name: 'Córdoba', countryId: 1 }}
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
      <ProvinceForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Salta' } });
    fireEvent.change(screen.getByLabelText(/CountryId/i), { target: { value: '3' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/Error al crear provincia/i)).toBeInTheDocument();
  });
});