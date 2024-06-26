import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCEditTasks from '../Components/Modals/Tasks/Modals-Edit-Tasks';

const TaskAdmin: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    const Data = [
        { id: 'A01-105', Descripcion: 'Hacer la cama, Cambiar sábanas y toallas, Limpiar el baño, Aspirar y limpiar suelos, Quitar el polvo.', img1: 'public/habitacion_Sencilla_8.jpg', img2: 'public/habitacion_Sencilla_8.jpg', img3: 'public/habitacion_Sencilla_8.jpg' },
    ];

    const handleGuardarYFinalizar = () => {
        navigate("/AssignTasksAdmin");
    };

    enum ModalsTasks {
        NONE = 'NONE',
        CREATE_TASKS = 'CREATE_TASKS',
        EDIT_TASKS = 'EDIT_TASKS',
        DELETE_TASKS = 'DELETE_TASKS',
      }
      
      const [modalType, setModalType] = useState<ModalsTasks>(ModalsTasks.NONE);
      const handleOpenModal = (type: ModalsTasks) => setModalType(type);
      const handleCloseModal = () => setModalType(ModalsTasks.NONE);
      

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100">
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column">
                        <Header />
                        <div style={{ margin: '50px' }}>
                            <Container className="flex-grow-1">
                                {Data.map((habitacion, index) => (
                                    <React.Fragment key={index}>
                                        <Row>
                                            <Col>
                                                <h2 style={{ fontSize: '3rem' }}>Habitación {habitacion.id}</h2>
                                            </Col>
                                        </Row>
                                        <div>
                                               <Row>
                                            <Col md={6}>
                                                <h4>Instrucción</h4>
                                                <p>{habitacion.Descripcion}</p>
                                                <Button variant="warning" className="mr-2" onClick={() => handleOpenModal(ModalsTasks.EDIT_TASKS)}><i className="fas fa-pen"></i></Button>
                                            </Col>
                                            <Col md={6}>
                                                <h4>Evidencia</h4>
                                                <p>Todo bien en la habitación.</p>
                                                <div className="d-flex flex-wrap">
                                                    <img src={habitacion.img1} alt="evidence1" className="img-thumbnail me-2 mb-2" style={{ width: '150px', height: '150px' }} />
                                                    <img src={habitacion.img2} alt="evidence2" className="img-thumbnail me-2 mb-2" style={{ width: '150px', height: '150px' }} /> 
                                                </div>
                                            </Col>
                                        </Row>
                                         <Row className="mt-4">
                                            <Col className="d-flex justify-content-center">
                                                <Button variant="primary" onClick={handleGuardarYFinalizar}>Aceptar </Button>
                                            </Col>
                                        </Row>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
            <MCEditTasks
            show={modalType === ModalsTasks.EDIT_TASKS} handleClose={handleCloseModal}
            />
        </>
    );
};

export default TaskAdmin;
