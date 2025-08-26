import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardHeader from '../../../components/common/dashboardHeader';

describe('DashboardHeader', () => {
  test('muestra el nombre del usuario si se proporciona', () => {
    render(<DashboardHeader displayName="Ignacio" />);
    expect(screen.getAllByText(/Bienvenido, Ignacio/i)).toBeInTheDocument();
  });

  test('muestra "Usuario" si no se proporciona displayName', () => {
    render(<DashboardHeader />);
    expect(screen.getAllByText(/Bienvenido, Usuario/i)).toBeInTheDocument();
  });
});