import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/common/login';
import Dashboard from './pages/common/dashboard';
import Register from './pages/common/register';
import PrivateRoute from './components/global/privateRoute';
import Layout from './components/common/layout';
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
import UnauthorizedPage from './components/common/unauthorized';

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
                <Dashboard />
            }
          />
          {/* Puedes agregar más rutas protegidas aquí */}
          <Route path="/userrole-manager"
            element={
              <PrivateRoute requiredRole="Admin">
                <ManagerUserRole />
              </PrivateRoute>
            } 
          />
          <Route path="/country-manager"
            element={
              <PrivateRoute requiredRole="Admin">
                <CountryManager />
              </PrivateRoute>
            } 
          />
          <Route path="/province-manager"
            element={
              <PrivateRoute requiredRole="Admin">
                <ProvinceManager />
              </PrivateRoute>
            }
          />
          <Route path="/user-manager"
            element={
              <PrivateRoute requiredRole="Admin">
                <ManagerUser />
              </PrivateRoute>
            }
          />
          <Route path="/visited-manager"
            element={
              <PrivateRoute requiredRole="Admin">
                <VisitedManager />
              </PrivateRoute>
            }
          />
          <Route path="/photo-manager"
          element={<PhotoManager />}
          />
          <Route path="/countries"
          element={<Countries />}
          />
          <Route path="/provinces"
          element={<Provinces />}
          />
          <Route path="/users"
          element={<Users />}
          />
          <Route path="/photos"
          element={<Photos />}
          />
          <Route path="/visiteds"
          element={<Visiteds />}
          />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default App;