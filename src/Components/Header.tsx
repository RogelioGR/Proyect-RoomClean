import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutButton from './Logout';

const Header : React.FC = () => {
  return (
    <header className="d-flex justify-content-end align-items-center p-2 border-bottom">
      <div className="user-info d-flex align-items-center">
        <img
          src="/public/mujer.png"
          alt="avatar"
          className="rounded-circle"
          style={{
            width:'40px',
            height: '40px'
            }}
        />
        <div className="ms-2">
          <span className="fw-bold">peki</span>
          <br />
          <span className="text-muted">PekiDroiid@mail.com</span>
        </div>
        <div className="dropdown ms-4">
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              color:'#0f4c75'
            }}
          >
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton"  >
          <li>
            <LogoutButton />
          </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
