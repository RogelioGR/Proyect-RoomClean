import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import { Task, getTaskById } from '../Services/TareaService';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createEvidence, getEvidences, Evidence, updateEvidence } from '../Services/EvidenciaService';
import { uploadPhoto, getPhotos, Photo, deletePhoto } from '../Services/FotoService';

const TaskEmpleado: React.FC = () => {
    const { id }: any = useParams();
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<Task>();
    const [comment, setComment] = useState<string>('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchTaskAndEvidence = async () => {
            try {
                const taskData = await getTaskById(id!);
                setTask(taskData);

                const evidences = await getEvidences(taskData.id!);
                if (evidences.length > 0) {
                    setComment(evidences[0].comentarios);
                    const evidencePhotos = await getPhotos(evidences[0].id!);
                    setUploadedPhotos(evidencePhotos);
                }
            } catch (error) {
                console.error('Error al cargar las tareas', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskAndEvidence();
    }, [id]);

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setPhotos(prevPhotos => [...prevPhotos, e.target.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDeletePhoto = async (photoId: number | undefined, index: number) => {
        try {
            if (photoId !== undefined) {
                // Eliminar la foto de la base de datos
                await deletePhoto(photoId); // Asegúrate de implementar esta función en FotoService
            }

            // Actualizar el estado local quitando la foto eliminada
            const newPhotos = [...photos];
            newPhotos.splice(index, 1);
            setPhotos(newPhotos);

            // Actualizar también las fotos subidas si se está eliminando una foto ya guardada
            if (photoId !== undefined) {
                const updatedUploadedPhotos = [...uploadedPhotos];
                updatedUploadedPhotos.splice(updatedUploadedPhotos.findIndex(p => p.id === photoId), 1);
                setUploadedPhotos(updatedUploadedPhotos);
            }
        } catch (error) {
            console.error('Error al eliminar la foto', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar la foto. Por favor, inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleGuardarYFinalizar = async () => {
        try {
            let evidenceId;
            const evidences = await getEvidences(task!.id!);
            if (evidences.length > 0) {
                const updatedEvidence: Evidence = {
                    ...evidences[0],
                    comentarios: comment
                };
                await updateEvidence(updatedEvidence.id!, updatedEvidence);
                evidenceId = updatedEvidence.id!;
            } else {
                const newEvidence: Evidence = {
                    comentarios: comment,
                    fkTarea: task!.id
                };
                const createdEvidence = await createEvidence(newEvidence);
                evidenceId = createdEvidence.id!;
            }

            // Subir nuevas fotos
            if (photos.length > 0) {
                await Promise.all(photos.map(async (photoUrl) => {
                    const formData = new FormData();
                    formData.append('fotoUrl', photoUrl);
                    formData.append('fkEvidencia', evidenceId.toString());
                    await uploadPhoto(formData);
                }));
            }

            Swal.fire({
                title: 'Evidencia guardada',
                text: 'La evidencia se ha guardado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Recargar la página después de cerrar la alerta
                window.location.reload();
            });
        } catch (error) {
            console.error('Error al guardar la evidencia', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al guardar la evidencia. Por favor, inténtalo de nuevo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
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
                                <Row>
                                    <Col>
                                        <h2 style={{ fontSize: '3rem' }}>Habitación {task!.nombre}</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h4>Instrucción</h4>
                                        <p className="m-2 text-justify">{task!.descripcion}</p>
                                        </Col>
                                    <Col md={6}>
                                        <h4>Evidencia</h4>
                                        <TextField
                                            label="Comentarios"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            fullWidth
                                            value={comment}
                                            onChange={(e: any) => setComment(e.target.value)}
                                            className="mt-3"
                                        />
                                        <div className="d-flex flex-wrap p-2">
                                            {uploadedPhotos.map((photo, index) => (
                                                <div key={photo.id} className="position-relative">
                                                    <img
                                                        src={photo.fotoUrl}
                                                        alt={`evidence${photo.id}`}
                                                        className="img-thumbnail "
                                                    />
                                                    <button
                                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 "
                                                        onClick={() => handleDeletePhoto(photo.id, index)}
                                                    >
                                                <i className="fa-solid fa-x "></i>

                                                    </button>
                                                </div>
                                            ))}
                                            {photos.map((photo, index) => (
                                                <div key={index} className="position-relative">
                                                    <img
                                                        src={photo}
                                                        alt={`selected${index}`}
                                                        className="img-thumbnail"
                                                    />
                                                    <button
                                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 "
                                                        onClick={() => handleDeletePhoto(undefined, index)}
                                                    >
                                                        <i className="fa-solid fa-x "></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <label htmlFor="file-input" className="btn btn-secondary align-self-center mb-2" style={{ width: '150px', height: '150px', fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <i className="fa-solid fa-camera"></i>
                                            </label>
                                            <input
                                                id="file-input"
                                                type="file"
                                                multiple
                                                onChange={handlePhotoChange}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="success" onClick={handleGuardarYFinalizar}>Guardar</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskEmpleado;