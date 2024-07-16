import React from 'react';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Services/AuthService';


interface SidebarProps {
  mobile?: boolean;
  closeMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, closeMenu }) => {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (closeMenu) {
      closeMenu();
    }
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
    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <>
      {mobile ? (
        <Offcanvas show className="sidebar-container sidebar-mobile" style={{ width: '250px' }} onHide={closeMenu}>
          <Offcanvas.Header   >
            <Offcanvas.Title className="sidebar-brand">
              <img
                src="/roomclean.png"
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="RoomClean logo"
              />
              <span className="sidebar-brand-text">RoomClean</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column">
            <Nav className="flex-column w-100 flex-grow-1">
              <Nav.Link onClick={handleDashboard} className="sidebar-link">
                <i className="fa-solid fa-house sidebar-icon me-2"></i>
                Dashboard
              </Nav.Link>
              {rol === '1' ? (
              <Nav.Link as={Link} to="/Inventario" className="sidebar-link">
               <i className="fas fa-box sidebar-icon me-2"></i>
               Inventario
              </Nav.Link>
             ) : (
              <></>
            )}
              <Nav.Link as={Link} to="/ViewPerfil" onClick={closeMenu} className="sidebar-link">
                <i className="fa-solid fa-user sidebar-icon me-2"></i>
                Perfil
              </Nav.Link>
              <Nav.Link as={Link} to="/Viewinform" onClick={closeMenu} className="sidebar-link">
                <i className="fa-solid fa-circle-info sidebar-icon me-2"></i>
                Info
              </Nav.Link>
            </Nav>
            <Nav className="mt-auto flex-column logout-section">
              <Nav.Link onClick={handleLogout} className="sidebar-link text-white text-center">
                <i className="fa-solid fa-power-off me-2"></i>
                Cerrar Sesión
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Navbar variant="dark" className="sidebar-container sidebar-desktop d-none d-lg-flex " style={{ padding: '10px' }}>
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
          <Nav className="flex-column w-100 flex-grow-1">
            <Nav.Link onClick={handleDashboard} className="sidebar-link">
              <i className="fa-solid fa-house sidebar-icon me-2"></i>
              Dashboard
            </Nav.Link>
            {rol === '1' ? (
              <Nav.Link as={Link} to="/Inventario" className="sidebar-link">
               <i className="fas fa-box sidebar-icon me-2"></i>
               Inventario
              </Nav.Link>
             ) : (
              <></>
            )}
            <Nav.Link as={Link} to="/ViewPerfil" className="sidebar-link">
              <i className="fa-solid fa-user sidebar-icon me-2"></i>
              Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/Viewinform" className="sidebar-link">
              <i className="fa-solid fa-circle-info sidebar-icon me-2"></i>
              Info
            </Nav.Link>
            
          </Nav>
          <Nav className="mt-auto">
            <Nav.Link onClick={handleLogout} className="sidebar-link text-white text-center">
              <i className="fa-solid fa-power-off me-2"></i>
              Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
    </>
  );
};

export default Sidebar;
