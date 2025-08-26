import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from '../../../components/global/formInput';

describe('FormInput', () => {
  test('renderiza el label y el input con los props correctos', () => {
    render(
      <FormInput
        label="Nombre"
        value="Ignacio"
        onChange={() => {}}
        name="nombre"
        required
        placeholder="Ingrese su nombre"
        type="text"
      />
    );
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese su nombre')).toHaveAttribute('name', 'nombre');
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('required');
    expect(screen.getByLabelText('Nombre')).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ignacio');
  });

  test('llama a onChange cuando el usuario escribe', () => {
    const handleChange = jest.fn();
    render(
      <FormInput
        label="Edad"
        value={30}
        onChange={handleChange}
        name="edad"
        type="number"
      />
    );
    fireEvent.change(screen.getByLabelText('Edad'), { target: { value: '31' } });
    expect(handleChange).toHaveBeenCalled();
  });
});