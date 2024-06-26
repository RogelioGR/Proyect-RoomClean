import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Services/AuthService';


const Sidebar: React.FC<{ rol?: string; userId?: string }> = ({  userId }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  const handleDashboard = () => {

    const rol = localStorage.getItem('rol');

    if (rol === '1') {
      navigate("/DashboardAdmin");
    } else if (rol === '2') {
        navigate("/Dashboardempleado");
      } else {
          navigate("/login");
        }
    
    
  };

  return (
    <Navbar variant="dark" className="sidebar-container" style={{ padding: '10px' }}>
      <Navbar.Brand className="sidebar-brand">
        <img
          src="/roomclean.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="RoomClean logo"
        />
        <span className="sidebar-brand-text">RoomClean</span>
      </Navbar.Brand>

      <Nav className="flex-column w-100 ">
        <Nav.Link onClick={handleDashboard} className="sidebar-link">
          <i className="fa-solid fa-house sidebar-icon me-2"></i>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to={`/ViewPerfil/${userId}`} className="sidebar-link">
          <i className="fa-solid fa-user sidebar-icon me-2"></i>
          Perfil
        </Nav.Link>
        <Nav.Link as={Link} to="/Viewinform" className="sidebar-link">
          <i className="fa-solid fa-circle-info sidebar-icon me-2"></i>
          Info
        </Nav.Link>
      </Nav>

      <Nav className="mt-auto w-100" style={{justifyContent:'center'}}>
      <Nav.Link onClick={handleLogout} className="sidebar-link">
      <i className="fa-solid fa-power-off me-2"></i>
          Cerrar Sesion
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
