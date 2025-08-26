import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersList from '../../../components/users/usersList';

const mockUsers = [
  {
    id: '1',
    displayName: 'Ignacio',
    authProvider: 'local',
    visiteds: [],
  },
  {
    id: '2',
    displayName: 'Maria',
    authProvider: 'google',
    visiteds: [],
  },
];

describe('UsersList', () => {
  test('renderiza el título y los usuarios', () => {
    render(<UsersList users={mockUsers} loading={false} />);
    expect(screen.getAllByText(/Listado de usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ignacio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Maria/i)).toBeInTheDocument();
    expect(screen.getAllByText(/local/i)).toBeInTheDocument();
    expect(screen.getAllByText(/google/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ID: 1/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ID: 2/i)).toBeInTheDocument();
  });

  test('renderiza el mensaje de carga cuando loading es true', () => {
    render(<UsersList users={[]} loading={true} />);
    expect(screen.getAllByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('renderiza el número correcto de elementos', () => {
    render(<UsersList users={mockUsers} loading={false} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('renderiza vacío si no hay usuarios y loading es false', () => {
    render(<UsersList users={[]} loading={false} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});