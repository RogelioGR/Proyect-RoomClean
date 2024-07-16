import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

/* Importar Componentes y Páginas */
import DashboardEmpleado from './pages/Dashboard-Empleado';
import DashboardAdmin from './pages/Dashboard-Admin';
import ViewPerfil from './pages/ViewPerfil';
import TaskEmpleado from './pages/ViewTaskEmpleado';
import AssignTasksAdmin from './pages/Assign-tasks';
import Viewinform from './pages/ViewInform';
import Login from './pages/Login';
import NotFound from './pages/Notfound';
import TaskAdmin from './pages/ViewTaskAdmin';
import Inventario from './pages/Inventory'; // Agregado para el dashboard de inventario

const App: React.FC = () => {
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiry = parseJwt(token).exp * 1000;
      if (Date.now() >= tokenExpiry) {
        logoutUser();
      }
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('_grecaptcha');
    MySwal.fire({
      title: 'Sesión expirada',
      text: 'Por favor, inicia sesión nuevamente.',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
  };

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

interface PrivateRouteProps {
  element: React.ReactElement;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const authStatus = localStorage.getItem('token');
  const userRole = localStorage.getItem('rol');

  if (!authStatus) {
    return <Navigate to="/login" />;
  }

  if (roles && userRole && !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return element;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboardAdmin" element={<PrivateRoute element={<DashboardAdmin />} roles={['1']} />} />
      <Route path="/dashboardEmpleado" element={<PrivateRoute element={<DashboardEmpleado />} roles={['2']} />} />
      <Route path="/viewPerfil" element={<PrivateRoute element={<ViewPerfil />} />} />
      <Route path="/taskAdmin/:taskId" element={<PrivateRoute element={<TaskAdmin />} roles={['1']} />} />
      <Route path="/taskEmpleado/:id" element={<PrivateRoute element={<TaskEmpleado />} roles={['2']} />} />
      <Route path="/assignTasksAdmin/:userId" element={<PrivateRoute element={<AssignTasksAdmin />} roles={['1']} />} />
      <Route path="/viewInform" element={<PrivateRoute element={<Viewinform />} />} />
      <Route path="/Inventario" element={<PrivateRoute element={<Inventario />} roles={['1']} />} /> 
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default App;
