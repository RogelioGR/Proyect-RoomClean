import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getTasks, Task } from '../Services/TareaService';

/* Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCreateTasks from '../Components/Modals/Tasks/Modals-Create-Tasks';
import MCEditTasks from '../Components/Modals/Tasks/Modals-Edit-Tasks';
import MDeleteTasks from '../Components/Modals/Tasks/Modals-Drop-Tasks';

const AssignTasksAdmin: React.FC = () => {
    const { userId, nombre, apellido } = useParams<{ userId: string, nombre: string, apellido: string }>();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const allTasks = await getTasks();
                if (userId) {
                    const userTasks = allTasks.filter(task => task.fkUsuario === parseInt(userId));
                    setTasks(userTasks || []);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);

    enum ModalsTasks {
        NONE = 'NONE',
        CREATE_TASKS = 'CREATE_TASKS',
        EDIT_TASKS = 'EDIT_TASKS',
        DELETE_TASKS = 'DELETE_TASKS',
    }

    const [modalType, setModalType] = useState<ModalsTasks>(ModalsTasks.NONE);
    const handleOpenModal = (type: ModalsTasks) => setModalType(type);
    const handleCloseModal = () => setModalType(ModalsTasks.NONE);

    const handleDeleteTasks = () => {
        handleCloseModal();
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
                        <Container className="container mt-2">
                            <h2>Habitaciones</h2>
                            <p>Empleado: {nombre} {apellido}</p>
                            <div className="d-flex justify-content-end align-items-center mt-4">
                                <Button variant="success" className="mb-2" onClick={() => handleOpenModal(ModalsTasks.CREATE_TASKS)}>Crear Tarea</Button>
                            </div>
                            <div className="scroll-container flex-grow-1">
                                {tasks.length === 0 ? (
                                    <p>Sin tareas asignadas</p>
                                ) : (
                                    <Row>
                                        {tasks.map((task, index) => (
                                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                                <div className="task-card">
                                                <Card.Img variant="top" src="/public/habitacion_Sencilla_8.jpg" alt="Room" className="room-image" />

                                                    <Card.Body className="task-body">
                                                        <Card.Title>{task.nombre}</Card.Title>
                                                        <Card.Text>Descripción: <span className="text-muted">{task.descripcion}</span></Card.Text>
                                                        <Card.Text>Estatus: <span className="text-muted">{task.estatus}</span></Card.Text>
                                                        <div className="card-buttons">
                                                            <Button variant="primary" className="mr-2" onClick={() => handleOpenModal(ModalsTasks.EDIT_TASKS)}>Editar</Button>
                                                            <Button variant="danger" onClick={() => handleOpenModal(ModalsTasks.DELETE_TASKS)}>Eliminar</Button>
                                                        </div>
                                                    </Card.Body>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </div>
                        </Container>
                        <Footer />
                    </div>
                </div>
            )}
            <MCreateTasks
                show={modalType === ModalsTasks.CREATE_TASKS} handleClose={handleCloseModal}
            />
            <MCEditTasks
                show={modalType === ModalsTasks.EDIT_TASKS} handleClose={handleCloseModal}
            />
            <MDeleteTasks
                show={modalType === ModalsTasks.DELETE_TASKS} handleClose={handleCloseModal} handleDelete={handleDeleteTasks}
            />
        </>
    );
};

export default AssignTasksAdmin;
