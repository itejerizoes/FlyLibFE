import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from '../../../components/managerUserRole/userRoleList';

const mockUsers = [
  {
    id: '1',
    displayName: 'Ignacio',
    email: 'ignacio@test.com',
    roles: ['Admin', 'User'],
  },
  {
    id: '2',
    displayName: 'Maria',
    email: 'maria@test.com',
    roles: [],
  },
];

describe('UserList', () => {
  test('renderiza los nombres y correos de los usuarios', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getAllByText(/Ignacio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ignacio@test.com/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Maria/i)).toBeInTheDocument();
    expect(screen.getAllByText(/maria@test.com/i)).toBeInTheDocument();
  });

  test('renderiza los roles correctamente', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getAllByText(/Roles: Admin, User/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Roles: Sin roles/i)).toBeInTheDocument();
  });

  test('renderiza el número correcto de usuarios', () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('renderiza vacío si no hay usuarios', () => {
    render(<UserList users={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});