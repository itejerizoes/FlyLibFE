import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardMenu from '../../../components/common/dashboardMenu';
import { MemoryRouter } from 'react-router-dom';

describe('DashboardMenu', () => {
  test('muestra todos los items del menú', () => {
    render(
      <MemoryRouter>
        <DashboardMenu />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Países')).toBeInTheDocument();
    expect(screen.getAllByText('Provincias')).toBeInTheDocument();
    expect(screen.getAllByText('Usuarios')).toBeInTheDocument();
    expect(screen.getAllByText('Fotos')).toBeInTheDocument();
    expect(screen.getAllByText('Visitados')).toBeInTheDocument();
  });

  test('los botones existen y son clickeables', () => {
    render(
      <MemoryRouter>
        <DashboardMenu />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
    buttons.forEach(btn => expect(btn).toBeEnabled());
  });
});