import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Navbar variant="dark" className="sidebar-container">
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
        <Nav.Link as={Link} to="/login" className="sidebar-link">
          <i className="fa-solid fa-power-off sidebar-icon me-2"></i>
          Cerrar sesión
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
