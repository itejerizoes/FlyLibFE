import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginGoogleButton from '../../../components/common/loginGoogleButton';

describe('LoginGoogleButton', () => {
  test('renderiza el botón con el texto correcto', () => {
    render(<LoginGoogleButton loading={false} onClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /Iniciar sesión con Google/i })).toBeInTheDocument();
  });

  test('el botón está deshabilitado cuando loading es true', () => {
    render(<LoginGoogleButton loading={true} onClick={jest.fn()} />);
    expect(screen.getByRole('button', { name: /Iniciar sesión con Google/i })).toBeDisabled();
  });

  test('llama a onClick cuando se hace click en el botón', () => {
    const handleClick = jest.fn();
    render(<LoginGoogleButton loading={false} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión con Google/i }));
    expect(handleClick).toHaveBeenCalled();
  });
});