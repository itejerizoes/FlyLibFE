import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhotoForm from '../../../components/photos/photoForm';

describe('PhotoForm', () => {
  const defaultValues = { url: '', description: '', visitedId: 1 };

  test('renderiza los campos de URL, descripción y VisitedId', () => {
    render(
      <PhotoForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/VisitedId/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear/i })).toBeInTheDocument();
  });

  test('renderiza el campo ID y botón Eliminar si isUpdate es true', () => {
    render(
      <PhotoForm
        initialValues={{ photoId: 5, url: 'http://test.com', description: 'desc', visitedId: 2 }}
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
      <PhotoForm
        initialValues={{ url: '', description: '', visitedId: '' as any }}
        loading={false}
        isUpdate={false}
        onSubmit={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/La URL es obligatoria/i)).toBeInTheDocument();
    expect(await screen.findByText(/El VisitedId es obligatorio/i)).toBeInTheDocument();
  });

  test('llama a onSubmit con los valores correctos', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(
      <PhotoForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/URL/i), { target: { value: 'http://test.com' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'desc' } });
    fireEvent.change(screen.getByLabelText(/VisitedId/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        url: 'http://test.com',
        description: 'desc',
        visitedId: 2,
      })
    );
    expect(await screen.findByText(/Foto creada/i)).toBeInTheDocument();
  });

  test('llama a onDelete cuando se hace click en el botón Eliminar', () => {
    const handleDelete = jest.fn();
    render(
      <PhotoForm
        initialValues={{ photoId: 5, url: 'http://test.com', description: 'desc', visitedId: 2 }}
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
      <PhotoForm
        initialValues={defaultValues}
        loading={false}
        isUpdate={false}
        onSubmit={handleSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/URL/i), { target: { value: 'http://test.com' } });
    fireEvent.change(screen.getByLabelText(/VisitedId/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: /Crear/i }));
    expect(await screen.findByText(/Error al crear foto/i)).toBeInTheDocument();
  });
});