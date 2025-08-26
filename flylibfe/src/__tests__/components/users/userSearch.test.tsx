import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSearch from '../../../components/users/userSearch';

const mockUser = {
  id: '1',
  displayName: 'Ignacio',
  authProvider: 'local',
  visiteds: [
    { id: 10, userId: '1', provinceId: 5, photos: [] },
    { id: 11, userId: '1', provinceId: 6, photos: [] },
  ],
};

describe('UserSearch', () => {
  test('renderiza el campo de ID y el botón de búsqueda', () => {
    render(
      <UserSearch
        value=""
        handleChange={jest.fn()}
        handleSearch={jest.fn()}
        userResult={null}
      />
    );
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
  });

  test('llama a handleChange cuando el usuario escribe en el campo', () => {
    const handleChange = jest.fn();
    render(
      <UserSearch
        value=""
        handleChange={handleChange}
        handleSearch={jest.fn()}
        userResult={null}
      />
    );
    fireEvent.change(screen.getByLabelText(/ID/i), { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('llama a handleSearch cuando se hace click en el botón', () => {
    const handleSearch = jest.fn();
    render(
      <UserSearch
        value="2"
        handleChange={jest.fn()}
        handleSearch={handleSearch}
        userResult={null}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Buscar/i }));
    expect(handleSearch).toHaveBeenCalled();
  });

  test('muestra los datos del usuario si userResult está presente', () => {
    render(
      <UserSearch
        value=""
        handleChange={jest.fn()}
        handleSearch={jest.fn()}
        userResult={mockUser}
      />
    );
    expect(screen.getAllByText(/ID: 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Nombre: Ignacio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/AuthProvider: local/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Visitados: 2/i)).toBeInTheDocument();
  });
});