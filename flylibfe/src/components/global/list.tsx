import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map(renderItem)}
    </ul>
  );
}

export default List;