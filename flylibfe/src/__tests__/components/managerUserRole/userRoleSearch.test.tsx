import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserSearch from '../../../components/managerUserRole/userRoleSearch';

const mockUser = {
  id: '1',
  displayName: 'Ignacio',
  email: 'ignacio@test.com',
  roles: ['Admin', 'User'],
};

describe('UserSearch', () => {
  test('renderiza el campo de email y el botón de búsqueda', () => {
    render(
      <UserSearch
        value=""
        handleChange={jest.fn()}
        handleSearch={jest.fn()}
        userResult={null}
      />
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
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
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('llama a handleSearch cuando se hace click en el botón', () => {
    const handleSearch = jest.fn();
    render(
      <UserSearch
        value="test@test.com"
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
    expect(screen.getAllByText(/Email: ignacio@test.com/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Nombre: Ignacio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Roles: Admin, User/i)).toBeInTheDocument();
  });
});