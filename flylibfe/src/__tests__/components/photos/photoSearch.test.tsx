import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotoSearch from '../../../components/photos/photoSearch';

describe('PhotoSearch', () => {
  test('renderiza el campo de ID y el botón de búsqueda', () => {
    render(
      <PhotoSearch
        value=""
        handleChange={jest.fn()}
        handleSearch={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
  });

  test('llama a handleChange cuando el usuario escribe en el campo', () => {
    const handleChange = jest.fn();
    render(
      <PhotoSearch
        value=""
        handleChange={handleChange}
        handleSearch={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/ID/i), { target: { value: '12' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('llama a handleSearch cuando se hace click en el botón', () => {
    const handleSearch = jest.fn();
    render(
      <PhotoSearch
        value="12"
        handleChange={jest.fn()}
        handleSearch={handleSearch}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }));
    expect(handleSearch).toHaveBeenCalled();
  });
});