import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskId, Task } from '../Services/TareaService';
import { getUserById, User } from '../Services/UsuarioService';

/* Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCreateTasks from '../Components/Modals/Tasks/Modals-Create-Tasks';
import MDeleteTasks from '../Components/Modals/Tasks/Modals-Drop-Tasks';

const AssignTasksAdmin: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const UserAssignId = userId ? parseInt(userId) : null;
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [TaskAssignId, setTaskId] = useState<number | undefined>(undefined);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const allTasks = await getTaskId(UserAssignId!);
                if (UserAssignId) {
                    setTasks(allTasks || []);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            try {
                if (UserAssignId) {
                    const userData = await getUserById(UserAssignId);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchTasks();
        fetchUser();
    }, [UserAssignId]);

    enum ModalsTasks {
        NONE = 'NONE',
        CREATE_TASKS = 'CREATE_TASKS',
        DELETE_TASKS = 'DELETE_TASKS',
    }

    const [modalType, setModalType] = useState<ModalsTasks>(ModalsTasks.NONE);
    const handleCloseModal = () => setModalType(ModalsTasks.NONE);

    const handleOpenModal = (type: ModalsTasks, taskId? :number) => {
        setModalType(type);
        setTaskId(taskId);
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
                            <p>Empleado: {user ? `${user.nombre} ${user.apellido}` : 'Cargando...'}</p>
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
                                                        <Card.Text>Estatus: <span className="text-muted">{task.estatus}</span></Card.Text>
                                                        <div className="card-buttons">
                                                        <Button variant="primary" className="mr-2" onClick={() => navigate(`/TaskAdmin/${task.id}`)}>Vista</Button>
                                                            <Button variant="danger" onClick={() => handleOpenModal(ModalsTasks.DELETE_TASKS , task.id)}>Eliminar</Button>
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
            {UserAssignId && (
                <MCreateTasks
                    show={modalType === ModalsTasks.CREATE_TASKS}
                    handleClose={handleCloseModal}
                    userId={UserAssignId} 
                />
            )}
            <MDeleteTasks
                show={modalType === ModalsTasks.DELETE_TASKS}
                handleClose={handleCloseModal}
                TaskId={TaskAssignId} 
            />
            
        </>
    );
};

export default AssignTasksAdmin;
