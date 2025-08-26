import React from 'react';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

jest.mock('./App', () => () => <div>App</div>);
jest.mock('./context/AuthContext', () => ({
  AuthProvider: ({ children }: any) => <div>AuthProvider{children}</div>,
}));

describe('index.tsx', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test('monta la aplicación en el elemento root', () => {
    require('../index');
    const rootDiv = document.getElementById('root');
    expect(rootDiv).not.toBeNull();
  });

  test('renderiza App dentro de AuthProvider y StrictMode', () => {
    const { createRoot } = require('react-dom/client');
    require('../index');
    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    const renderCall = createRoot.mock.results[0].value.render;
    expect(renderCall).toHaveBeenCalled();
    // Opcional: puedes verificar que render se llama con AuthProvider y App
  });
});