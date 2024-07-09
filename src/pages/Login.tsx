import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/AuthService';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            await login({ correo: email, contraseña: password });
            localStorage.setItem('authenticated', 'true'); 
            const rol = localStorage.getItem('rol');
            const userId = localStorage.getItem('userId'); 

            console.log('ID del usuario:', userId);

            if (rol === '1') {
                navigate("/DashboardAdmin");
            } else if (rol === '2') {
                navigate("/Dashboardempleado");
            } else {
                alert('Acceso no autorizado');
            }
        } catch (error) {
            Swal.fire({
                title: 'Usuario Invalido',
                text: 'Correo o contraseña incorrecto.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="login-container">
         
            <Row className="justify-content-center align-items-center vh-100">
                <Col  lg={4} className="text-center">
                    <Form className="form-controls" onSubmit={handleLogin}>
                        <h1 className="title-login">Iniciar sesión</h1>
                        <div className="input-field">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    className="input"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </div>

                        <div className="input-field">
                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    className="input"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <Button variant="primary" type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  
                                </>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </Button>
                    </Form>
                </Col>
                <Col xs={10} sm={8} md={6} lg={4} className="d-none d-lg-block text-center">
                    <img src="/public/roomclean.png" alt="Logo" className="login-logo" />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
