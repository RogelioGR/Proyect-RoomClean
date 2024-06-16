import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';


/*Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';


const Viewinform: React.FC = () => {
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
                        <Container className="container my-3">
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <img src="/public/empresas.jpg" className="img-fluid rounded" alt="About Us" />
                                </div>
                                <div className="col-md-6">
                                    <h2>Acerca de Nosotros</h2>
                                    <p>
                                        Somos una empresa comprometida con la excelencia y la innovación. Nuestro objetivo es brindar servicios y productos de alta calidad que satisfagan las necesidades de nuestros clientes. Contamos con un equipo de profesionales dedicados y apasionados por lo que hacen.
                                    </p>
                                    <p>
                                        Nuestra misión es crear soluciones que mejoren la vida de las personas y las empresas, mediante la utilización de tecnología de punta y prácticas sostenibles.
                                    </p>
                                    <p>
                                        ¡Gracias por confiar en nosotros!
                                    </p>
                                </div>
                            </div>

                            <div className="row mb-5">
                                <div className="col-md-5">
                                    <h2>Nuestra Información</h2>
                                    <p>
                                        Dirección: Calle Falsa 123, Ciudad, País
                                    </p>
                                    <p>
                                        Teléfono: +123 456 7890
                                    </p>
                                    <p>
                                        Email: contacto@empresa.com
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>Innovación</h5>
                                    <p>
                                        Fomentamos la creatividad y la implementación de nuevas ideas para ofrecer soluciones avanzadas.
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Compromiso</h5>
                                    <p>
                                        Nuestro equipo está dedicado a cumplir con las expectativas de nuestros clientes y superar los desafíos.
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Excelencia</h5>
                                    <p>
                                        Nos esforzamos por alcanzar la perfección en cada uno de nuestros proyectos y servicios.
                                    </p>
                                </div>
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
