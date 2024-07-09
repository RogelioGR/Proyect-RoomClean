import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getTaskById, Task } from '../Services/TareaService';
import {  getEvidenceById, Evidence } from '../Services/EvidenciaService';


/* componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCEditTasks from '../Components/Modals/Tasks/Modals-Edit-Tasks';

const TaskAdmin: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { TaskId } = useParams<{ TaskId: string | undefined }>();

    const [taskData, setTaskData] = useState<Task>({
        nombre: "",
        descripcion: "",
        estatus: "",
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                if (TaskId) {
                    const task = await getTaskById(parseInt(TaskId));
                    setTaskData(task);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching task:', error);
                setLoading(false);
            }
        };

        fetchTask();
    }, [TaskId]);

    const handleGuardarYFinalizar = async () => {
      
    };
    


    const [modalType, setModalType] = useState('');

    const handleOpenModal = (type: string) => {
        setModalType(type);
    };

    const handleCloseModal = () => {
        setModalType('');
    };

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
                                <React.Fragment>
                                    <Row>
                                        <Col>
                                            <h2 style={{ fontSize: '3rem' }}>Habitación: {taskData.nombre}</h2>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Row>
                                            <Col md={6}>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <h4 className="mb-0">Instrucción</h4>
                                                    <Button variant="warning" onClick={() => handleOpenModal('EDIT_TASKS')}>
                                                        <i className="fas fa-pen"></i> Editar
                                                    </Button>
                                                </div>
                                                <p>{taskData.descripcion}</p>
                                            </Col>
                                            <Col md={6}>
                                                <h4>Evidencia</h4>
                                                <p>Todo bien en la habitación.</p>
                                                <div className="d-flex flex-wrap">
                                                    <img src="" alt="evidence1" className="img-thumbnail me-2 mb-2" style={{ width: '150px', height: '150px' }} />
                                                    <img src="" alt="evidence2" className="img-thumbnail me-2 mb-2" style={{ width: '150px', height: '150px' }} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mt-4">
                                            <Col className="d-flex justify-content-center">
                                                <Button variant="primary" onClick={handleGuardarYFinalizar}>
                                                    Aceptar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </React.Fragment>
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
            <MCEditTasks show={modalType === 'EDIT_TASKS'} handleClose={handleCloseModal} taskId={TaskId}/>
        </>
    );
};

export default TaskAdmin;
