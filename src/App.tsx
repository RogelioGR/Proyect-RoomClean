import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css'

/* View paginas del sitio */
import Dashboardempleado from './pages/Dashboard-Empleado';
import DashboardAdmin from './pages/Dashboard-Admin';
import AssignTasksAdmin from './pages/Assign-tasks';
import Login from './pages/Login';
import ViewPerfil from './pages/ViewPerfil';
import TaskEmpleado from './pages/ViewTaskEmpleado';
import Viewinform from './pages/ViewInform';
import NotFound from './pages/Notfound';



const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/Dashboardempleado" element={<Dashboardempleado />} />
          <Route path="/ViewPerfil" element={<ViewPerfil/>} />
          <Route path="/TaskEmpleado" element={<TaskEmpleado />} />
          <Route path="/AssignTasksAdmin" element={<AssignTasksAdmin />} />
          <Route path="/Viewinform" element={<Viewinform/>} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          
        </Routes>
      </div>
    </Router>
  );
};

export default App;






