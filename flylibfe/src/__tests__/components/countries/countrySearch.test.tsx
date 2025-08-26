import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountrySearch from '../../../components/countries/countrySearch';

describe('CountrySearch', () => {
  const defaultValues = { id: '', name: '' };

  test('renderiza los campos y botones de búsqueda', () => {
    render(
      <CountrySearch
        values={defaultValues}
        handleChange={jest.fn()}
        handleSearchById={jest.fn()}
        handleSearchByName={jest.fn()}
      />
    );
    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar por ID/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Buscar por nombre/i })).toBeInTheDocument();
  });

  test('llama a handleChange cuando se escribe en los campos', () => {
    const handleChange = jest.fn();
    render(
      <CountrySearch
        values={defaultValues}
        handleChange={handleChange}
        handleSearchById={jest.fn()}
        handleSearchByName={jest.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/ID/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Chile' } });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  test('llama a handleSearchById cuando se hace click en el botón Buscar por ID', () => {
    const handleSearchById = jest.fn();
    render(
      <CountrySearch
        values={defaultValues}
        handleChange={jest.fn()}
        handleSearchById={handleSearchById}
        handleSearchByName={jest.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Buscar por ID/i }));
    expect(handleSearchById).toHaveBeenCalled();
  });

  test('llama a handleSearchByName cuando se hace click en el botón Buscar por nombre', () => {
    const handleSearchByName = jest.fn();
    render(
      <CountrySearch
        values={defaultValues}
        handleChange={jest.fn()}
        handleSearchById={jest.fn()}
        handleSearchByName={handleSearchByName}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Buscar por nombre/i }));
    expect(handleSearchByName).toHaveBeenCalled();
  });
});