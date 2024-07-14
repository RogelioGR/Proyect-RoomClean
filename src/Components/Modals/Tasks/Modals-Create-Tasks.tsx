import React, { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Modal, Button , Form} from 'react-bootstrap';
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
    estatus: "Por hacer",
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
      <Modal show={show} onHide={handleClose}    
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className='text-center'>Crear Tarea</h1>
          <Form onSubmit={handleGuardar}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Habitación del hotel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Habitacion"
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
                placeholder="Descripcion de la habitacion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center mt-4">
                  <Button variant="success" className="me-2" type="submit">
                    Guardar
                  </Button>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={handleClose}>
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
