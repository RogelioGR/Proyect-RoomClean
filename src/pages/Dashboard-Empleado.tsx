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
                    <Sidebar />
                    <div className="flex-grow-1 d-flex flex-column">
                        <Header />
                        <div>
                            <Container fluid className="flex-grow-1 d-flex flex-column">
                                <h1 className="my-4">Bienvenid@, peki!</h1>
                                <h3>Habitaciones</h3>
                                <div className="scroll-container flex-grow-1">
                                    <div className="row">
                                        {error ? (
                                            <div className="col-12 text-center">
                                                <p>{error}</p>
                                            </div>
                                        ) : tasks.length === 0 ? (
                                            <div className="col-12 text-center">
                                                <p>Sin actividades</p>
                                            </div>
                                        ) : (
                                            tasks.map((task) => (
                                                <div key={task.id} className="col-md-3 mb-3">
                                                    <div className="card">
                                                        <img src="public/habitacion_Sencilla_8.jpg" className="card-img-top" alt="Room" />
                                                        <Link to={`/TaskEmpleado/${task.id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{task.nombre}</h5>
                                                                <p className="card-text">Estado: <strong>{task.estatus}</strong></p>
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