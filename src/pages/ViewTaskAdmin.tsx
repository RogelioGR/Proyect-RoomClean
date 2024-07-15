import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { updateTask, getTaskById, Task } from '../Services/TareaService';
import { getEvidences, Evidence } from '../Services/EvidenciaService';
import { getPhotos, Photo } from '../Services/FotoService';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

/* componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCEditTasks from '../Components/Modals/Tasks/Modals-Edit-Tasks';

const MySwal = withReactContent(Swal);

const TaskAdmin: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<Task>();
    const [evidence, setEvidence] = useState<Evidence>();
    const [photos, setPhotos] = useState<Photo[]>([]);


    const { TaskId }: any = useParams();

    useEffect(() => {
        const fetchTaskAndEvidence = async () => {
            try {
                const taskData = await getTaskById(TaskId);
                setTask(taskData);

                if (taskData?.id) {
                    const evidences = await getEvidences(taskData.id);
                    setEvidence(evidences?.[0]);

                    if (evidences?.[0]?.id) {
                        const fetchedPhotos = await getPhotos(evidences[0].id);
                        setPhotos(fetchedPhotos);
                    }
                }
            }
            catch (error) {
                console.error('no lo veo:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskAndEvidence();
    }, [TaskId]);

    const handleGuardarYFinalizar = async () => {
        try {
            if (task?.id) {
                const updatedTask = await updateTask(task.id, { ...task, estatus: 'Finalizado' });
                setTask(updatedTask);
                MySwal.fire({
                    icon: 'success',
                    title: 'Tarea finalizada',
                    text: 'La tarea ha sido marcada como finalizada correctamente.',
                });
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado de la tarea. Por favor, inténtalo de nuevo más tarde.',
            });
        }
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
                        <div style={{ margin: '10px' }}>
                            <Container className="flex-grow-1">
                                <React.Fragment>
                                    <Row>
                                        <Col>
                                            <h2 style={{ fontSize: '3rem' }}>Habitación: {task!.nombre}</h2>
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
                                                <p className="m-2 text-justify">{task!.descripcion}</p>
                                            </Col>
                                            <Col md={6}>
                                                <h4>Evidencia</h4>
                                                {evidence ? (
                                                    <p>{evidence.comentarios}</p>
                                                ) : (
                                                    <p style={{ color: 'gray' }}>No hay evidencia para esta tarea.</p>

                                                )}
                                                <h4>Fotos</h4>
                                                <div className="d-flex flex-wrap">
                                                    {photos.length > 0 ? (
                                                        photos.map(photo => (
                                                            <img
                                                                key={photo.id}
                                                                src={photo.fotoUrl}
                                                                className="img-thumbnail me-2 mb-2"
                                                                style={{ width: '150px', height: '150px' }}
                                                                alt={`Photo ${photo.id}`}
                                                            />
                                                        ))
                                                    ) : (
                                                        <img
                                                            src="/public/no-fotos.png"
                                                            className="img-thumbnail me-2 mb-2"
                                                            style={{ width: '150px', height: '150px' }}
                                                            alt="Foto por defecto"
                                                        />
                                                    )}
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
            <MCEditTasks show={modalType === 'EDIT_TASKS'} handleClose={handleCloseModal} taskId={TaskId} />
        </>
    );
};

export default TaskAdmin;
