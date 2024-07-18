import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';

const Viewinform: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className=" d-flex vh-100" >
                    <Sidebar />
                    <div className=" flex-grow-1 d-flex flex-column">
                        <Header />
                        <Container className="my-3" style={{ overflowY: 'auto' }}>
                            <div className="viewPages-fade-in">
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="/public/empresas.jpg"
                                            alt="Second slide"
                                            style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '15px' }}
                                        />
                                        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '15px' }}>
                                            <h3>Somos una empresa comprometida con la excelencia y la innovación.</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="/public/habitacion_Sencilla_8.jpg"
                                            alt="First slide"
                                            style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '15px' }}
                                        />
                                        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '15px' }}>
                                            <h3>"Servicio impecable y atención personalizada te esperan aquí."</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src="/public/cama.jpg"
                                            alt="First slide"
                                            style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '15px' }}
                                        />
                                        <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '15px' }}>
                                            <h3>"Tu hogar lejos de casa, diseñado para tu bienestar."</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                                <Row className="mb-4 mt-4">
                                    <Col md={4} className="text-center viewinform-fade-in">
                                        <div className="mb-3">
                                            <img
                                                src="/public/innova.jpg"
                                                alt="Innovación"
                                                className="rounded-circle"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="info-box">
                                            <h5>Innovación</h5>
                                            <p className="text-justify">
                                                Fomentamos la creatividad y la implementación de nuevas ideas para ofrecer soluciones avanzadas.
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={4} className="text-center viewinform-fade-in">
                                        <div className="mb-3">
                                            <img
                                                src="/public/compromiso.jpg"
                                                alt="Compromiso"
                                                className="rounded-circle"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="info-box">
                                            <h5>Compromiso</h5>
                                            <p className="text-justify">
                                                Nuestro equipo está dedicado a cumplir con las expectativas de nuestros clientes y superar los desafíos.
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={4} className="text-center viewinform-fade-in">
                                        <div className="mb-3">
                                            <img
                                                src="/public/excelencia.jpg"
                                                alt="Excelencia"
                                                className="rounded-circle"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="info-box">
                                            <h5>Excelencia</h5>
                                            <p className="text-justify">
                                                Nos esforzamos por alcanzar la perfección en cada uno de nuestros proyectos y servicios.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={6} className="d-flex align-items-center viewinform-fade-in">
                                        <div>
                                            <h2 className="text-center mb-4" style={{ fontSize: '2.5rem' }}>Acerca de Nosotros</h2>
                                            <p style={{ textAlign: 'justify' }}>
                                                Somos una empresa comprometida con la excelencia y la innovación. Nuestro objetivo es brindar servicios y productos de alta calidad que satisfagan las necesidades de nuestros clientes. Contamos con un equipo de profesionales dedicados y apasionados por lo que hacen. Nuestra misión es crear soluciones que mejoren la vida de las personas y las empresas, mediante la utilización de tecnología de punta y prácticas sostenibles. ¡Gracias por confiar en nosotros!
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={6} className="d-flex justify-content-center align-items-center viewinform-fade-in">
                                        <img
                                            src="/public/empresas.jpg"
                                            alt="Acerca de Nosotros"
                                            style={{ maxHeight: '300px', width: '100%', objectFit: 'cover', borderRadius: '15px' }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={6} className="d-flex align-items-center viewinform-fade-in">
                                        <img
                                            src="/public/contacto.jpg"
                                            alt="Contacto"
                                            style={{ maxHeight: '300px', width: '100%', objectFit: 'cover', borderRadius: '15px' }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <div>
                                            <h2 className="text-center mb-4">Contacto</h2>
                                            <p>
                                                Dirección: Calle Tamarindo, Cancún, Quintana Roo
                                            </p>
                                            <p>
                                                Teléfono: +52 998 103 1550
                                            </p>
                                            <p>
                                                Correo: roomclean@empresa.com
                                            </p>
                                            <p>
                                                Horarios de atención: Lunes a Viernes de 8:00 AM a 6:00 PM
                                            </p>
                                            <p>
                                                ¡Esperamos tu visita para disfrutar de una experiencia única en nuestro hotel!
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

export default Viewinform;
