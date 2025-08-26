import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const TestComponent = () => {
  const { isAuthenticated, displayName, roles, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="auth">{isAuthenticated ? 'Autenticado' : 'No autenticado'}</span>
      <span data-testid="displayName">{displayName}</span>
      <span data-testid="roles">{roles.join(',')}</span>
      <button onClick={() => login('token', 'refresh', 'TestUser', ['Admin', 'User'])}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('Integración: AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('por defecto no está autenticado', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('auth')).toHaveTextContent('No autenticado');
    expect(screen.getByTestId('displayName')).toHaveTextContent('');
    expect(screen.getByTestId('roles')).toHaveTextContent('');
  });

  test('login actualiza el contexto y localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getAllByText('Login').click();
    });
    expect(screen.getByTestId('auth')).toHaveTextContent('Autenticado');
    expect(screen.getByTestId('displayName')).toHaveTextContent('TestUser');
    expect(screen.getByTestId('roles')).toHaveTextContent('Admin,User');
    expect(localStorage.getItem('token')).toBe('token');
    expect(localStorage.getItem('displayName')).toBe('TestUser');
    expect(localStorage.getItem('roles')).toBe(JSON.stringify(['Admin', 'User']));
  });

  test('logout limpia el contexto y localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getAllByText('Login').click();
    });
    act(() => {
      screen.getAllByText('Logout').click();
    });
    expect(screen.getByTestId('auth')).toHaveTextContent('No autenticado');
    expect(screen.getByTestId('displayName')).toHaveTextContent('');
    expect(screen.getByTestId('roles')).toHaveTextContent('');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('displayName')).toBeNull();
    expect(localStorage.getItem('roles')).toBeNull();
  });

  test('useAuth lanza error si no está dentro de AuthProvider', () => {
    const Broken = () => {
      useAuth();
      return null;
    };
    expect(() => render(<Broken />)).toThrow('useAuth must be used within AuthProvider');
  });
});