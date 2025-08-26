import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardContent from '../../../components/common/dashboardContent';

describe('DashboardContent', () => {
  test('muestra el mensaje principal', () => {
    render(<DashboardContent />);
    expect(
      screen.getAllByText(/Selecciona una opción del menú para gestionar los datos de FlyLib/i)
    ).toBeInTheDocument();
  });

  test('renderiza el componente Paper', () => {
    render(<DashboardContent />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});