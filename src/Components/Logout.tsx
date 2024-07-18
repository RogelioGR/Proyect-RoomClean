import React from 'react';
import { logout } from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const handleLogout = () => {
        MySwal.fire({
            title: "Cerrar Sesión",
            text: "¿Seguro que quieres cerrar tu sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
            logout();
            navigate('/login');
            }
          });
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


