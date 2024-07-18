import React, { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap';
import { createTask, Task } from '../../../Services/TareaService';

const MySwal = withReactContent(Swal);

interface MCreateTasksProps {
  show: boolean;
  handleClose: () => void;
  userId: number;
}

const MCreateTasks: React.FC<MCreateTasksProps> = ({ show, handleClose, userId }) => {
  const [nombre, setNombre] = useState<string>('');
  const [descripciones, setDescripciones] = useState<string[]>(['']);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDescripcionChange = (index: number, value: string) => {
    const nuevasDescripciones = [...descripciones];
    nuevasDescripciones[index] = value;
    setDescripciones(nuevasDescripciones);
  };

  const handleAgregarDescripcion = () => {
    setDescripciones([...descripciones, '']);
  };

  const handleEliminarDescripcion = (index: number) => {
    const nuevasDescripciones = descripciones.filter((_, i) => i !== index);
    setDescripciones(nuevasDescripciones);
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData: Task = {
        nombre,
        descripcion: JSON.stringify(descripciones.filter(desc => desc !== '')),
        estatus: 'Por hacer',
        fkUsuario: userId,
      };
      await createTask(formData);
      MySwal.fire({
        title: 'Tarea creada',
        text: 'La tarea se ha creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear la tarea.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h1 className='text-center'>Crear Tarea</h1>
        <Form onSubmit={handleGuardar}>
          <Form.Group controlId="formNombre">
            <Form.Label>Habitación del hotel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la habitación"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>
          {descripciones.map((descripcion, index) => (
            <Form.Group key={index} controlId={`formDescripcion${index}`}>
              <Form.Label>Tarea {index + 1}</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Tarea por realizar"
                  value={descripcion}
                  onChange={(e) => handleDescripcionChange(index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <Button variant="danger" className='ms-2' onClick={() => handleEliminarDescripcion(index)}>
                   <i className="fas fa-trash"></i> 
                  </Button>
                )}
              </div>
            </Form.Group>
          ))}
          <Button variant="primary" className='mt-2' onClick={handleAgregarDescripcion}>
            Añadir Tarea
          </Button>
          <div className="text-center mt-4">
            <Button variant="success" className='me-2' type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button variant="secondary" className='me-2' onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MCreateTasks;
