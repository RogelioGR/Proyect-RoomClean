import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import { getTasks, Task } from '../Services/TareaService';

const Dashboardempleado: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskData = await getTasks();
                setTasks(taskData);
            } catch (error) {
                setError('Error al cargar las tareas');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="d-flex vh-100">
                    <Sidebar  /> 
                    <div className="flex-grow-1 d-flex flex-column">
                        <Header />
                        <div>
                            <Container  className="container mt-2">
                                <h1 className="my-4">Bienvenid@, peki!</h1>
                                <h3>Habitaciones</h3>
                                <div className="scroll-container flex-grow-1">
                                        {error ? (
                                            <div className="col-12 text-center">
                                                <p>{error}</p>
                                            </div>
                                        ) : tasks.length === 0 ? (
                                            <div className="col-12 text-center">
                                                <p>Sin actividades</p>
                                            </div>
                                        ) : (

                                            <div className="card-container">
                                            {tasks.map((task, index) => (
                                                <Link to={`/TaskEmpleado/${task.id}`} style={{ textDecoration: 'none', color: '#000000' }}>

                                                <div className="card" key={index}>
                                                    <img
                                                        className="card-image"
                                                        alt="Room"
                                                        src="/public/habitacion_Sencilla_8.jpg"
                                                    />
                                                    <div className="content">
                                                        <p className="title-card">{task.nombre}</p>
                                                        <div className="desc">
                                                            <span>Estatus: <span>{task.estatus}</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            ))}
                                        </div>
                                        
                                        )}
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