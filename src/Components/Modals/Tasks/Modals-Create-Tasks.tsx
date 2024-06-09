import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


interface MCreateTasksProps {
  show: boolean;
  handleClose: () => void;
}
const MySwal = withReactContent(Swal);

const MCreateTasks: React.FC<MCreateTasksProps> = ({ show, handleClose }) => {
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleGuardar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para guardar la tarea

    // Mostrar alerta de éxito
    MySwal.fire({
      title: 'Tarea creada',
      text: 'La tarea se ha creado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Cerrar el modal después de aceptar
      handleClose();
    });
  };

  const handleGuardarClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleGuardar}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <h2 className="text-center mb-4">Crear Tarea</h2>
              <Form.Label>Habitacion del hotel</Form.Label>
              <Form.Control
                type="text"
                placeholder="A01-105"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="success" type="submit" onClick={handleGuardarClick}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MCreateTasks;
