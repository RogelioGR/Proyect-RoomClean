import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

/* View paginas del sitio */
import Dashboardempleado from './pages/Dashboard-Empleado';
import DashboardAdmin from './pages/Dashboard-Admin';
import ViewPerfil from './pages/ViewPerfil';
import TaskEmpleado from './pages/ViewTaskEmpleado';
import AssignTasksAdmin from './pages/Assign-tasks';
import Viewinform from './pages/ViewInform';
import Login from './pages/Login';
import NotFound from './pages/Notfound';
import TaskAdmin from './pages/ViewTaskAdmin';



const App: React.FC = () => {
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
  const authStatus = localStorage.getItem('authenticated');
  const userRole = localStorage.getItem('rol');

  if (authStatus !== 'true') {
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
      <Route path="/DashboardAdmin" element={<PrivateRoute element={<DashboardAdmin />} roles={['1']} />} />
      <Route path="/Dashboardempleado" element={<PrivateRoute element={<Dashboardempleado />} roles={['2']} />} />
      <Route path="/ViewPerfil/:id" element={<PrivateRoute element={<ViewPerfil />}/>} />
      <Route path="/TaskAdmin/:TaskId" element={<PrivateRoute element={<TaskAdmin />} roles={['1']} />} />
      <Route path="/TaskEmpleado" element={<PrivateRoute element={<TaskEmpleado />} roles={['2']} />} />
      <Route path="/AssignTasksAdmin/:userId" element={<PrivateRoute element={<AssignTasksAdmin />} roles={['1']} />} />
      <Route path="/Viewinform" element={<PrivateRoute element={<Viewinform />} />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
