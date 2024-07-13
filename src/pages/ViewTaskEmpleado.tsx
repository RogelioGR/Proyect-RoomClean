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
import { uploadPhoto, getPhotos, Photo } from '../Services/FotoService';

const TaskEmpleado: React.FC = () => {
    const { id }: any = useParams();
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<Task>();
    const [comment, setComment] = useState<string>('');
    const [photos, setPhotos] = useState<File[]>([]);
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
            const newPhotos = Array.from(files);
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        }
    };

    useEffect(() => {
        return () => {
            photos.forEach(photo => URL.revokeObjectURL(URL.createObjectURL(photo)));
        };
    }, [photos]);

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

            if (photos.length > 0) {
                await Promise.all(photos.map(async (photo) => {
                    const formData = new FormData();
                    formData.append('fotoUrl', photo);
                    formData.append('fkEvidencia', evidenceId.toString());
                    await uploadPhoto(formData);
                }));
            }

            Swal.fire({
                title: 'Evidencia guardada',
                text: 'La evidencia se ha guardado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
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
                                        <Col >
                                            <h4>Instrucción</h4>
                                            <p>{task!.descripcion}</p>
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
                                            <div className="Photo-container p-2">
                                           
                                                <div className="photo-grid d-flex flex-wrap">
                                                {uploadedPhotos.map(photo => (
                                                    <img
                                                        key={photo.id}
                                                        src={photo.fotoUrl}
                                                        alt={`evidence${photo.id}`}
                                                        className="img-thumbnail me-2"
                                                    />
                                                ))}
                                                    {photos.map((photo, index) => (
                                                        <img
                                                            key={index}
                                                            src={URL.createObjectURL(photo)}
                                                            alt={`selected${index}`}
                                                            className="img-thumbnail"
                                                        />

                                                    ))}
                                                    <label  className="btn btn-secondary align-self-center mb-2" style={{ width: '150px', height: '150px', fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <i className="fa-solid fa-camera"></i></label>

                                                </div>

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
                                <div>
                                   
                                    <Row className="mt-4">
                                        <Col className="d-flex justify-content-center">
                                            <Button variant="success" onClick={handleGuardarYFinalizar}>Guardar</Button>
                                        </Col>
                                    </Row>
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

export default TaskEmpleado;
