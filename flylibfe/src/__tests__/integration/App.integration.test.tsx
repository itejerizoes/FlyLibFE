import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

// Mockea todas las páginas y componentes principales
jest.mock('../../pages/common/login', () => () => <div>Login Page</div>);
jest.mock('../../pages/common/register', () => () => <div>Register Page</div>);
jest.mock('../../pages/common/dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('../../components/common/layout', () => ({ children }: any) => <div>Layout {children}</div>);
jest.mock('../../pages/countries/countryManager', () => () => <div>CountryManager Page</div>);
jest.mock('../../pages/countries/countries', () => () => <div>Countries Page</div>);
jest.mock('../../pages/managerUserRole/managerUserRole', () => () => <div>ManagerUserRole Page</div>);
jest.mock('../../pages/provinces/provinceManager', () => () => <div>ProvinceManager Page</div>);
jest.mock('../../pages/provinces/provinces', () => () => <div>Provinces Page</div>);
jest.mock('../../pages/users/managerUser', () => () => <div>ManagerUser Page</div>);
jest.mock('../../pages/users/users', () => () => <div>Users Page</div>);
jest.mock('../../pages/visiteds/visitedManager', () => () => <div>VisitedManager Page</div>);
jest.mock('../../pages/visiteds/visiteds', () => () => <div>Visiteds Page</div>);
jest.mock('../../pages/photos/photoManager', () => () => <div>PhotoManager Page</div>);
jest.mock('../../pages/photos/photos', () => () => <div>Photos Page</div>);
jest.mock('../../components/common/unauthorized', () => () => <div>Unauthorized Page</div>);
jest.mock('../../components/global/privateRoute', () => ({ children }: any) => <>{children}</>);

describe('Integración: App routing', () => {
  test('renderiza Login en /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Login Page/i)).toBeInTheDocument();
  });

  test('renderiza Register en /register', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Register Page/i)).toBeInTheDocument();
  });

  test('renderiza Dashboard en /dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Dashboard Page/i)).toBeInTheDocument();
  });

  test('renderiza CountryManager en /country-manager', () => {
    render(
      <MemoryRouter initialEntries={['/country-manager']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/CountryManager Page/i)).toBeInTheDocument();
  });

  test('renderiza Countries en /countries', () => {
    render(
      <MemoryRouter initialEntries={['/countries']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Countries Page/i)).toBeInTheDocument();
  });

  test('renderiza ManagerUserRole en /userrole-manager', () => {
    render(
      <MemoryRouter initialEntries={['/userrole-manager']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/ManagerUserRole Page/i)).toBeInTheDocument();
  });

  test('renderiza ProvinceManager en /province-manager', () => {
    render(
      <MemoryRouter initialEntries={['/province-manager']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/ProvinceManager Page/i)).toBeInTheDocument();
  });

  test('renderiza Provinces en /provinces', () => {
    render(
      <MemoryRouter initialEntries={['/provinces']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Provinces Page/i)).toBeInTheDocument();
  });

  test('renderiza ManagerUser en /user-manager', () => {
    render(
      <MemoryRouter initialEntries={['/user-manager']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/ManagerUser Page/i)).toBeInTheDocument();
  });

  test('renderiza Users en /users', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Users Page/i)).toBeInTheDocument();
  });

  test('renderiza VisitedManager en /visited-manager', () => {
    render(
      <MemoryRouter initialEntries={['/visited-manager']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/VisitedManager Page/i)).toBeInTheDocument();
  });

  test('renderiza Visiteds en /visiteds', () => {
    render(
      <MemoryRouter initialEntries={['/visiteds']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Visiteds Page/i)).toBeInTheDocument();
  });

  test('renderiza PhotoManager en /photo-manager', () => {
    render(
      <MemoryRouter initialEntries={['/photo-manager']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/PhotoManager Page/i)).toBeInTheDocument();
  });

  test('renderiza Photos en /photos', () => {
    render(
      <MemoryRouter initialEntries={['/photos']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Photos Page/i)).toBeInTheDocument();
  });

  test('renderiza UnauthorizedPage en /unauthorized', () => {
    render(
      <MemoryRouter initialEntries={['/unauthorized']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Unauthorized Page/i)).toBeInTheDocument();
  });
});