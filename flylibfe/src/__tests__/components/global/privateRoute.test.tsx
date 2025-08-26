import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from '../../../components/global/privateRoute';
import { AuthContext } from '../../../context/AuthContext';

const TestComponent = () => <div>Contenido privado</div>;

const renderWithAuth = (isAuthenticated: boolean, roles: string[], requiredRole?: string) =>
  render(
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roles,
        displayName: 'Test',
        login: jest.fn(),
        logout: jest.fn(),
      }}
    >
      <MemoryRouter initialEntries={['/private']}>
        <PrivateRoute requiredRole={requiredRole}>
          <TestComponent />
        </PrivateRoute>
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe('PrivateRoute', () => {
  test('redirige al login si no está autenticado', () => {
    renderWithAuth(false, []);
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });

  test('muestra el contenido si está autenticado y no se requiere rol', () => {
    renderWithAuth(true, ['User']);
    expect(screen.getAllByText('Contenido privado')).toBeInTheDocument();
  });

  test('muestra el contenido si está autenticado y tiene el rol requerido', () => {
    renderWithAuth(true, ['Admin'], 'Admin');
    expect(screen.getAllByText('Contenido privado')).toBeInTheDocument();
  });

  test('redirige a /unauthorized si no tiene el rol requerido', () => {
    renderWithAuth(true, ['User'], 'Admin');
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });
});