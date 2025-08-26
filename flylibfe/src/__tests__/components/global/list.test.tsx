import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../../../components/global/list';

describe('List', () => {
  test('renderiza todos los items usando renderItem', () => {
    const items = ['uno', 'dos', 'tres'];
    render(
      <List
        items={items}
        renderItem={(item, idx) => <li key={idx}>{item}</li>}
      />
    );
    expect(screen.getAllByText('uno')).toBeInTheDocument();
    expect(screen.getAllByText('dos')).toBeInTheDocument();
    expect(screen.getAllByText('tres')).toBeInTheDocument();
  });

  test('renderiza el número correcto de elementos', () => {
    const items = [1, 2, 3, 4];
    render(
      <List
        items={items}
        renderItem={(item, idx) => <li key={idx}>{item}</li>}
      />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  test('renderiza vacío si no hay items', () => {
    render(
      <List
        items={[]}
        renderItem={(item, idx) => <li key={idx}>{item}</li>}
      />
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});