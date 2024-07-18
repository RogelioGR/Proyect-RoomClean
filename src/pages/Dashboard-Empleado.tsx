import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import { getTasks, Task } from '../Services/TareaService';
import { getUserById, User } from '../Services/UsuarioService';
import { parseJwt } from '../Services/jwt';


const Dashboardempleado: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasksAndUser = async () => {
            try {
                const taskData = await getTasks();
                setTasks(taskData);

                const token = localStorage.getItem('token');
                if (token) {
                    const userId = parseJwt(token).id;
                    localStorage.setItem('userId', userId.toString());

                    const userData = await getUserById(userId);
                    setUser(userData);
                }


            } catch (error) {
                setError('Error al cargar las tareas o el usuario');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasksAndUser();
    }, []);
    const getEstatusStyle = (estatus: string) => {
        switch (estatus) {
          case "Por hacer":
            return { color: 'red' };
          case "Finalizado":
            return { color: 'green' };
          default:
            return {};
        }
      };


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100 flex-column flex-md-row vviewinform-container" >
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column  viewinform-content">
                        <Header />
                        <Container className="my-3" style={{ overflowY: 'auto' }}>
                            <div>
                                <h1 className="my-4">Bienvenid@, {user ? `${user.nombre}` : 'Usuario'}!</h1>

                                <h3>Habitaciones</h3>
                                <div className="scroll-container flex-grow-1">
                                    {error ? (
                                        <div className="col-12 text-center">
                                            <p>{error}</p>
                                        </div>
                                    ) : tasks.length === 0 ? (
                                        <div className=" d-flex flex-column align-items-center justify-content-center text-center m-5">
                                            <img src="/public/limpieza.png" alt="Sin actividades" className="img-fluid mb-3" style={{ width: '200px', height: 'auto' }} />
                                            <p style={{ color: '#9E9E9E', fontSize: '1.2rem' }}>Sin actividades</p>
                                        </div>
                                    ) : (
                                        <div className="card-container">
                                            {tasks.map((task, index) => (
                                                <Link to={`/TaskEmpleado/${task.id}`} style={{ textDecoration: 'none', color: '#000000' }} key={index}>
                                                    <div className="card">
                                                        <img
                                                            className="card-image"
                                                            alt="Room"
                                                            src="/public/habitacion_Sencilla_8.jpg"
                                                        />
                                                        <div className="content">
                                                            <p className="title-card">{task.nombre}</p>
                                                            <div className="desc-status">
                                                            <span>Estatus: <span style={getEstatusStyle(task.estatus)}>{task.estatus}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
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
        </>
    );
};

export default Dashboardempleado;
