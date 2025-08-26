import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../components/global/modal';

describe('Modal', () => {
  test('no renderiza nada si open es false', () => {
    render(
      <Modal open={false} onClose={jest.fn()} title="Título">
        <div>Contenido</div>
      </Modal>
    );
    expect(screen.queryByText('Título')).not.toBeInTheDocument();
    expect(screen.queryByText('Contenido')).not.toBeInTheDocument();
  });

  test('renderiza el título, contenido y botón si open es true', () => {
    render(
      <Modal open={true} onClose={jest.fn()} title="Título">
        <div>Contenido</div>
      </Modal>
    );
    expect(screen.getAllByText('Título')).toBeInTheDocument();
    expect(screen.getAllByText('Contenido')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cerrar/i })).toBeInTheDocument();
  });

  test('llama a onClose cuando se hace click en el botón Cerrar', () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose} title="Título">
        <div>Contenido</div>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: /Cerrar/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});