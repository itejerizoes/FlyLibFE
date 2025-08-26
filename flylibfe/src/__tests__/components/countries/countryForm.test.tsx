import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CountryForm from '../../../components/countries/countryForm';

describe('CountryForm', () => {
  const defaultValues = { name: '', isoCode: '' };

  test('renderiza los campos de nombre e ISO Code', () => {
    render(
      <CountryForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ISO Code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear/i })).toBeInTheDocument();
  });

  test('renderiza el campo ID y botón Eliminar si isUpdate es true', () => {
    render(
      <CountryForm
        initialValues={{ countryId: 1, name: 'Argentina', isoCode: 'AR' }}
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
      <CountryForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/El código ISO es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <CountryForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Chile' } });
    fireEvent.change(screen.getByLabelText(/ISO Code/i), { target: { value: 'CL' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'Chile',
        isoCode: 'CL',
        isUpdate: false,
      })
    );
  });

  test('llama a onDelete cuando se hace click en el botón Eliminar', () => {
    const handleDelete = jest.fn();
    render(
      <CountryForm
        initialValues={{ countryId: 2, name: 'Uruguay', isoCode: 'UY' }}
        loading={false}
        isUpdate={true}
        onSubmit={jest.fn()}
        onDelete={handleDelete}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/i }));
    expect(handleDelete).toHaveBeenCalled();
  });
});