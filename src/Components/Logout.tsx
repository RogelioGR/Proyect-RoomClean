import React from 'react';
import { logout } from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button
            className="btn btn-link dropdown-item"
            onClick={handleLogout}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'red',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
            }}
        >
            <i className="fa-solid fa-power-off me-2"></i>
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;


