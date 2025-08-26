import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../../../components/common/layout';
import { AuthContext } from '../../../context/AuthContext';

const renderWithAuth = (roles: string[]) =>
  render(
    <AuthContext.Provider value={{
      roles,
      isAuthenticated: true,
      displayName: 'Test',
      login: jest.fn(),
      logout: jest.fn()
    }}>
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe('Layout', () => {
  test('muestra links de administración si el usuario es admin', () => {
    renderWithAuth(['Admin']);
    expect(screen.getAllByText(/Gestión de usuarios y roles/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Gestión de países/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Gestión de provincias/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Gestión de usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Gestión de fotos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Gestión de provincias visitadas/i)).toBeInTheDocument();
  });

  test('no muestra links de administración si el usuario no es admin', () => {
    renderWithAuth(['User']);
    expect(screen.queryByText(/Gestión de usuarios y roles/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gestión de países/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gestión de provincias/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gestión de usuarios/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gestión de fotos/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Gestión de provincias visitadas/i)).not.toBeInTheDocument();
  });

  test('siempre muestra los links públicos', () => {
    renderWithAuth(['User']);
    expect(screen.getAllByText(/Ver países/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ver provincias/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ver usuarios/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ver provincias visitadas/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ver fotos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Dashboard/i)).toBeInTheDocument();
  });
});