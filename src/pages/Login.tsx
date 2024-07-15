import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/AuthService';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        const rol = localStorage.getItem('rol');

        if (isAuthenticated) {
            if (rol === '1') {
                navigate("/DashboardAdmin");
            } else if (rol === '2') {
                navigate("/Dashboardempleado");
            } else {
                alert('Acceso no autorizado');
            }
        }
    }, [navigate]);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (!recaptchaToken) {
                Swal.fire({
                    title: 'Captcha no completado',
                    text: 'Por favor completa el captcha.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                setLoading(false);
                return;
            }

            await login({ correo: email, contraseña: password });
            localStorage.setItem('authenticated', 'true');
            const rol = localStorage.getItem('rol');

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

    const onCaptchaChange = (value: string | null) => {
        setRecaptchaToken(value);
    };

    return (
        <Container fluid className="login-container">
            <div className="form-container">
                <Form className="form-controls " onSubmit={handleLogin}>
                    <h1 className="title-login">Iniciar sesión</h1>
                    <div>
                        <Form.Group controlId="formBasicEmail ">
                            <Form.Control
                                type="email"
                                placeholder="Correo Electrónico"
                                className="input"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                className="input"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className='Recaptcha-container'>
                            <div className='Recaptcha'>
                                <ReCAPTCHA
                                    sitekey="6LeT5w8qAAAAAL7kKO3u9_Fpjbr9PiLWbsl-Hcky"
                                    onChange={onCaptchaChange}
                                />
                            </div>
                        </div>
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
                <div className="login-img d-none d-lg-block">
                    <img src='/public/roomclean.png' alt="404 Error" className="bounce" />
                </div>
            </div>
        </Container>
    );
};

export default Login;
