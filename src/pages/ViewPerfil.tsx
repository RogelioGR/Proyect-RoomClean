import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

/*Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';

const ViewPerfil: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: 'karla',
        Apellidos: 'Diaz',
        email: 'karla@gmail.com',
        contraseña: 'karla12345',
        telefono: '992288222',
        numEmpleado: '9282782'
    });

    const handleChange = () => {
        setFormData({
            ...formData,

        });
    };
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 3000); // el tiempo de carga real
    }, []);

    return (
        <>

            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100">
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column">
                        <Header />
                        <Container className="flex-grow-1 my-5" style={{ padding: '60px' }}>
                            <h2 className="text-center mb-4">Perfil del  usuario</h2>
                            <Row className="justify-content-center">
                                <Col md={4} className="d-flex justify-content-center align-items-center">
                                    <img src="/public/mujer.png" style={{ width: '150px', height: '150px' }} />
                                </Col>
                                <Col md={8}>
                                    <Form >
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formFirstName">
                                                    <Form.Label>Nombre:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nombre"
                                                        name="firstName"
                                                        value={formData.nombre}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formLastName">
                                                    <Form.Label>Apellido:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Apellido"
                                                        name="lastName"
                                                        value={formData.Apellidos}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Correo electrónico:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Correo electrónico"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Contraseña:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Contraseña"
                                                name="password"
                                                value={formData.contraseña}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formPhone">
                                                    <Form.Label>Teléfono:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Teléfono"
                                                        name="phone"
                                                        value={formData.telefono}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formEmployeeNumber">
                                                    <Form.Label>Número de empleado:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Número de empleado"
                                                        name="employeeNumber"
                                                        value={formData.numEmpleado}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                    </Form>
                                </Col>
                            </Row>
                            <div className='d-flex justify-content-center align-items-center mt-4'>
                                <Button variant="primary" type="submit" className="mt-3 ">
                                    Guardar
                                </Button>
                            </div>
                        </Container>
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPerfil;



