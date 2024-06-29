import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTask, Task } from '../../../Services/TareaService';

const MySwal = withReactContent(Swal);

interface MCreateTasksProps {
  show: boolean;
  handleClose: () => void;
  userId: number; 
}

const MCreateTasks: React.FC<MCreateTasksProps> = ({ show, handleClose, userId }) => {
  const [formData, setFormData] = useState<Task>({
    nombre: "",
    descripcion: "",
    estatus: "",
    fkUsuario: userId, 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(formData);
      MySwal.fire({
        title: 'Tarea creada',
        text: 'La tarea se ha creado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if(result.isConfirmed){
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
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGuardar}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Habitación del hotel</Form.Label>
              <Form.Control
                type="text"
                placeholder="A01-105"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
              type="text"
                 placeholder="terminado sin"
                name="estatus"
                value={formData.estatus}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex align-items-center mt-4">
                  <Button variant="success" className="me-2" type="submit">
                    Guardar
                  </Button>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </div>

          </Form>
        </Modal.Body>
        <Modal.Footer >
         
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MCreateTasks;
