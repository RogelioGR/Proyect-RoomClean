import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';

const Dashboardempleado: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); 
    }, []);

    const rooms = [
         { id: 'A01-105', status: 'Por hacer' },
        { id: 'A01-105', status: 'Por hacer' },

      
      

       
    ];

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100">
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column">
                        <Header />
                        <div>
                            <Container fluid className="flex-grow-1 d-flex flex-column">
                                <h1 className="my-4">Bienvenid@, peki!</h1>
                                <h3>Habitaciones</h3>
                                <div className="scroll-container flex-grow-1">
                                    <div className="row">
                                        {rooms.length === 0 ? (
                                            <div className="col-12 text-center">
                                                <p>Sin actividades</p>
                                            </div>
                                        ) : (
                                            rooms.map((room, index) => (
                                                <div key={index} className="col-md-3 mb-3">
                                                    <div className="card">
                                                        <img src="public/habitacion_Sencilla_8.jpg" className="card-img-top" alt="Room" />
                                                        <Link to="/TaskEmpleado" style={{ textDecoration: 'none', color: '#000000' }}>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{room.id}</h5>
                                                                <p className="card-text">Estado: <strong>{room.status}</strong></p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboardempleado;
