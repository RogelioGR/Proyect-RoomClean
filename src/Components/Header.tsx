// Header.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-2 border-bottom">
      <div className="d-lg-none">
        <button className="btn btn-link" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </button>
      </div>
      {/* Usuario y avatar (puedes personalizar esto según tus necesidades) */}
      <div className="d-flex justify-content-end align-items-center user-info w-100">
        <img
          src="/mujer.png"
          alt="avatar"
          className="rounded-circle"
          style={{
            width: '40px',
            height: '40px'
          }}
        />
        <div className="ms-2">
          <span className="fw-bold">peki</span>
          <br />
          <span className="text-muted">PekiDroiid@mail.com</span>
        </div>
        {/* Menú desplegable para opciones adicionales (puedes personalizar esto según tus necesidades) */}
        <div className="dropdown ms-4">
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              color: '#0f4c75'
            }}
          >
            {/* Contenido del botón del menú desplegable */}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li>
              {/* Componente de logout, puedes usar LogoutButton aquí si es necesario */}
            </li>
          </ul>
        </div>
      </div>
      {/* Renderiza el Sidebar solo si el menú está abierto */}
      {menuOpen && <Sidebar mobile closeMenu={closeMenu} />}
    </header>
  );
};

export default Header;
