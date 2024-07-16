import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { getUserById, User } from '../Services/UsuarioService';

/* Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';

const ViewPerfil: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User>({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        número: '',
        foto: '',
        fkRol: 0,

    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        
        if (userId) {
            getUserData(parseInt(userId));
        } else {
            setLoading(false); 
        }
    }, []);

    const getUserData = async (userId: number) => {
        try {
            const user = await getUserById(userId);
            setUserData(user);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false); 
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100  vviewinform-container">
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column  viewinform-content">
                        <Header />
                        <Container className="flex-grow-1 my-5" style={{ padding: '60px' }}>
                            <h2 className="text-center mb-4">Perfil del usuario</h2>
                            <Row className="justify-content-center">
                                <Col md={4} className="d-flex justify-content-center align-items-center">
                                    <img src={userData.foto || "/public/usuario.png"}  alt="Avatar"  className="rounded-circle" style={{ width: '200px', height: '200px' }} />
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
                                                        name="nombre"
                                                        value={userData.nombre}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formLastName">
                                                    <Form.Label>Apellido:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Apellido"
                                                        name="Apellidos"
                                                        value={userData.apellido}
                                                        disabled
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
                                                value={userData.correo}
                                                disabled
                                            />
                                        </Form.Group>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formPhone">
                                                    <Form.Label>Teléfono:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Teléfono"
                                                        name="telefono"
                                                        value={userData.número}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formPhone">
                                                    <Form.Label>Rol del empleado:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Rol del empleaod"
                                                        name="telefono"
                                                        value={userData.fkRol === 1 ? 'Eres administrador' : userData.fkRol === 2 ? 'Eres Camarista' : ''}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            </Col>
                               
                                        </Row>

                                   {/*      <div className='d-flex justify-content-center align-items-center mt-4'>
                                            <Button variant="primary" type="submit" className="mt-3">
                                                Guardar
                                            </Button>
                                        </div> */}
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPerfil;
