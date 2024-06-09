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



const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Dashboardempleado" element={<Dashboardempleado />} />
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/AssignTasksAdmin" element={<AssignTasksAdmin />} />
          <Route path="/" element={<Dashboardempleado />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;






