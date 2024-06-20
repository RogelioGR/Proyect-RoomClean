import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Services/AuthService';

const Sidebar: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
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
        <Nav.Link as={Link} to="/Dashboardempleado" className="sidebar-link">
          <i className="fa-solid fa-house sidebar-icon me-2"></i>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/ViewPerfil" className="sidebar-link">
          <i className="fa-solid fa-user sidebar-icon me-2"></i>
          Perfil
        </Nav.Link>
        <Nav.Link as={Link} to="/Viewinform" className="sidebar-link">
          <i className="fa-solid fa-circle-info sidebar-icon me-2"></i>
          Info
        </Nav.Link>
      </Nav>

      <Nav className="mt-auto w-100">
      <button
            className="btn btn-link dropdown-item"
            onClick={handleLogout}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
            }}
        >
            <i className="fa-solid fa-power-off me-2"></i>
            Cerrar sesión
        </button>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
