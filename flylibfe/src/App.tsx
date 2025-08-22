import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/common/login';
import Dashboard from './pages/common/dashboard';
import Register from './pages/common/register';
import PrivateRoute from './components/privateRoute';
import Layout from './components/layout';
import CountryManager from './pages/countries/countryManager';
import Countries from './pages/countries/countries';
import ManagerUserRole from './pages/managerUserRole/managerUserRole';
import ProvinceManager from './pages/provinces/provinceManager';
import Provinces from './pages/provinces/provinces';
import ManagerUser from './pages/users/managerUser';
import Users from './pages/users/users';
import VisitedManager from './pages/visiteds/visitedManager';
import Visiteds from './pages/visiteds/visiteds';
import PhotoManager from './pages/photos/photoManager';
import Photos from './pages/photos/photos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Puedes agregar más rutas protegidas aquí */}
          <Route path="/userrole-manager" element={<ManagerUserRole />} />
          <Route path="/country-manager" element={<CountryManager />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/provinces" element={<Provinces />} />
          <Route path="/province-manager" element={<ProvinceManager />} />
          <Route path="/user-manager" element={<ManagerUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/visited-manager" element={<VisitedManager />} />
          <Route path="/visiteds" element={<Visiteds />} />
          <Route path="/photo-manager" element={<PhotoManager />} />
          <Route path="/photos" element={<Photos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;