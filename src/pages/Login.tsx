import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); 

        try {
            const response = await axios.post('https://localhost:7103/api/auth/login', {
                correo: email,
                contraseña: password
            });
            alert('Login successful');
            localStorage.setItem('token', response.data.token);
            navigate("/DashboardAdmin");

            console.log(response.data);
        } catch (error) {
            Swal.fire({
                title: 'Usuario invalido',
                text: 'Correo o contraseña incorrecta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
           
        }
    };



    return (
        <>
      

        <Container fluid className="login-container" onSubmit={handleLogin}>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={10} sm={8} md={6} lg={4} className="text-center">
          <Form className="form-controls">
             <h1 className="title">Iniciar sesión</h1>
            <div className="input-field">
              <input required className="input" type="email" 
                                placeholder="Correo Electrónico" 
                                value={email} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  />
              <label className="label" htmlFor="input">Correo electrónico</label>
            </div>
            <div className="input-field">
              <input required className="input"    type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
              <label className="label" htmlFor="input">Contraseña</label>
            </div>
            <button className="submit-btn">Iniciar sesión</button>
          </Form>
        </Col>
        <Col xs={10} sm={8} md={6} lg={4} className="d-none d-lg-block text-center">
          <img src="/public/roomclean.png" alt="Logo" className="login-logo" />
        </Col>
      </Row>
    </Container>
        </>
    );
};

export default Login;
