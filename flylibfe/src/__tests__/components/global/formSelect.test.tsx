import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormSelect from '../../../components/global/formSelect';

describe('FormSelect', () => {
  const options = [
    { value: '1', label: 'Opción 1' },
    { value: '2', label: 'Opción 2' },
  ];

  test('renderiza el label y las opciones correctamente', () => {
    render(
      <FormSelect
        label="Selecciona una opción"
        value=""
        onChange={() => {}}
        options={options}
        name="opcion"
        required
      />
    );
    expect(screen.getByLabelText('Selecciona una opción')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'opcion');
    expect(screen.getByRole('combobox')).toHaveAttribute('required');
    expect(screen.getAllByText('Opción 1')).toBeInTheDocument();
    expect(screen.getAllByText('Opción 2')).toBeInTheDocument();
  });

  test('llama a onChange cuando el usuario selecciona una opción', () => {
    const handleChange = jest.fn();
    render(
      <FormSelect
        label="Selecciona una opción"
        value=""
        onChange={handleChange}
        options={options}
        name="opcion"
      />
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalled();
  });
});