import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Services/axiosConfig';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            navigate("/DashboardAdmin");
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <Container fluid className="login-container">
            <Row className="justify-content-center align-items-center vh-100">
                <Col md={6} lg={4} className="text-center">
                    <h1 className="mb-4">Iniciar sesión</h1>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control 
                                type="email" 
                                placeholder="Correo Electrónico" 
                                value={email} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Iniciar sesión
                        </Button>
                    </Form>
                </Col>
                <Col md={6} lg={4} className="d-none d-md-block text-center">
                    <img src="/public/roomclean.png" alt="Logo" className="login-logo" />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
