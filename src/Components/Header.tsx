import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import LogoutButton from './Logout';
import { getUserById, User } from '../Services/UsuarioService';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userIdStr = localStorage.getItem('userId');
                if (userIdStr) {
                    const userId = parseInt(userIdStr, 10); 
                    const userData = await getUserById(userId);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error al cargar la información del usuario', error);
            }
        };

        fetchUser();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <div className="menu-toggle-btn d-lg-none">
                <button className="btn btn-link" onClick={toggleMenu}>
                    <i className="fa fa-bars"></i>
                </button>
            </div>
            <div className="d-flex justify-content-end align-items-center user-info w-100">
                {user ? (
                    <>
                        <img
                            src={user.foto}
                            alt="avatar"
                            className="rounded-circle"
                            style={{
                                width: '40px',
                                height: '40px'
                            }}
                        />
                        <div className="ms-2">
                            <span className="fw-bold">{user.nombre} {user.apellido}</span>
                            <br />
                            <span className="text-muted">{user.correo}</span>
                        </div>
                    </>
                ) : (
                    <div>Cargando usuario...</div>
                )}
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
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        <li>
                        <LogoutButton />
                        </li>
                    </ul>
                </div>
            </div>
            {menuOpen && <Sidebar mobile closeMenu={closeMenu} />}
        </header>
    );
};

export default Header;
