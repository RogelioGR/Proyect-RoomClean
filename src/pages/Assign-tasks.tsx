import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
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
                    if (userData.fkRol !== 1) {
                        setUser(userData);
                    } else {
                        navigate('/DashboardAdmin');
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchTasks();
        fetchUser();
    }, [UserAssignId, navigate]);

    enum ModalsTasks {
        NONE = 'NONE',
        CREATE_TASKS = 'CREATE_TASKS',
        DELETE_TASKS = 'DELETE_TASKS',
    }
    const [modalType, setModalType] = useState<ModalsTasks>(ModalsTasks.NONE);
    const handleCloseModal = () => setModalType(ModalsTasks.NONE);
    const handleOpenModal = (type: ModalsTasks, taskId?: number) => {
        setModalType(type);
        setTaskId(taskId);
    };
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100 flex-column flex-md-row">
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column">
                        <Header />
                        <Container className="my-3" style={{ overflowY: 'auto' }}>
                            <div className=' '>
                                <h2>Tareas Asignadas</h2>
                                <p>Empleado: {user ? `${user.nombre} ${user.apellido}` : 'Cargando...'}</p>
                                <div className="d-flex justify-content-end align-items-center mt-4">
                                    <Button variant="success" className="mb-2" onClick={() => handleOpenModal(ModalsTasks.CREATE_TASKS)}>Crear Tarea</Button>
                                </div>
                                <div className="scroll-container flex-grow-1">
                                    {tasks.length === 0 ? (
                                        <div className=" d-flex flex-column align-items-center justify-content-center text-center m-5 viewPages-fade-in " >
                                            <img src="/public/limpieza.png" alt="Sin actividades" className="img-fluid mb-3" style={{ width: '200px', height: 'auto' }} />
                                            <p style={{ color: '#9E9E9E', fontSize: '1.2rem' }}>Sin actividades</p>
                                        </div>
                                    ) : (
                                        <div className="card-container">
                                            {tasks.map((task, index) => (
                                                <div className="card viewPages-fade-in " key={index}>
                                                    <img
                                                        className="card-image"
                                                        alt="Room"
                                                        src="/public/habitacion_Sencilla_8.jpg"
                                                    />
                                                    <div className="content">
                                                        <p className="title-card">{task.nombre}</p>
                                                        <div className="desc-status">
                                                            <span>Estatus: <span>{task.estatus}</span></span>
                                                        </div>
                                                        <div className="actions-btns">
                                                            <Button variant="primary" onClick={() => navigate(`/TaskAdmin/${task.id}`)} style={{ width: '50px' }}><i className="fa-solid fa-eye" ></i></Button>
                                                            <Button variant="danger" onClick={() => handleOpenModal(ModalsTasks.DELETE_TASKS, task.id)} style={{ width: '50px' }}><i className="fa-solid fa-trash" ></i></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
