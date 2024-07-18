import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/AuthService';
import Swal from 'sweetalert2';

const NewLogin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const inputs = document.querySelectorAll(".input-field") as NodeListOf<HTMLInputElement>;

        inputs.forEach((inp) => {
            inp.addEventListener("focus", () => {
                inp.classList.add("active");
            });
            inp.addEventListener("blur", () => {
                if (inp.value !== "") return;
                inp.classList.remove("active");
            });
        });
    }, []);

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
                setCaptchaError('Por favor completa el captcha.');
                setLoading(false);
                return;
            }

            setCaptchaError(null);

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
        <>
            <Container fluid className="login-container ">
                <div className='box-login'>
                    <div className="inner-box">
                        <div className="forms-wrap">
                            <form autoComplete="off" className="sign-in-form" onSubmit={handleLogin}>
                                <div className="logo">
                                    <h4>Room<span>Clean</span></h4>
                                </div>
                                <div className="heading">
                                    <h2>Iniciar sesion</h2>
                                </div>
                                <div className="actual-form">
                                    <div className="input-wrap">
                                        <input
                                            type="email"
                                            minLength={4}
                                            className="input-field"
                                            autoComplete="off"
                                            required
                                            value={email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        />
                                        <label className='label-login'>Correo Electrónico</label>
                                    </div>

                                    <div className="input-wrap">
                                        <input
                                            type="password"
                                            minLength={4}
                                            className="input-field"
                                            autoComplete="off"
                                            required
                                            value={password}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        />
                                        <label className='label-login'>Contraseña</label>
                                    </div>
                                    <div>
                                        <ReCAPTCHA
                                            sitekey="6LeT5w8qAAAAAL7kKO3u9_Fpjbr9PiLWbsl-Hcky"
                                            onChange={onCaptchaChange}
                                        />
                                        {captchaError && <p style={{ color: 'red', fontSize: '0.9em' }}>{captchaError}</p>}
                                    </div>
                                    <button type="submit" className="sign-btn" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </>
                                        ) : (
                                            'Iniciar sesión'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="logo-container">
                            <div className="images-wrapper">
                                <img src="/public/roomclean.png" className='image ' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default NewLogin;
