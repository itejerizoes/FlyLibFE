import React from 'react';
import { render, screen } from '@testing-library/react';
import UnauthorizedPage from '../../../components/common/unauthorized';

describe('UnauthorizedPage', () => {
  test('muestra el mensaje de acceso denegado', () => {
    render(<UnauthorizedPage />);
    expect(
      screen.getAllByText(/No tienes permisos para acceder a esta página/i)
    ).toBeInTheDocument();
  });

  test('el mensaje tiene el color de error', () => {
    render(<UnauthorizedPage />);
    const message = screen.getAllByText(/No tienes permisos para acceder a esta página/i);
    expect(message).toHaveClass('MuiTypography-colorError');
  });
});