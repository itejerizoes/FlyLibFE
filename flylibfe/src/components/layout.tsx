import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <nav style={{ width: 220, background: '#f0f0f0', padding: 20 }}>
      <h3>Menú</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/userrole-manager">Gestión de usuarios y roles</Link></li>
        <li><Link to="/countries">Ver países</Link></li>
        <li><Link to="/country-manager">Gestión de países</Link></li>
        <li><Link to="/provinces">Ver provincias</Link></li>
        <li><Link to="/province-manager">Gestión de provincias</Link></li>
        <li><Link to="/user-manager">Gestión de usuarios</Link></li>
        <li><Link to="/users">Ver usuarios</Link></li>
        <li><Link to="/visited-manager">Gestión de provincias visitadas</Link></li>
        <li><Link to="/visiteds">Ver provincias visitadas</Link></li>
        <li><Link to="/photo-manager">Gestión de fotos</Link></li>
        <li><Link to="/photos">Ver fotos</Link></li>
      </ul>
    </nav>
    <main style={{ flex: 1, padding: 24 }}>
      <Outlet />
    </main>
  </div>
);

export default Layout;