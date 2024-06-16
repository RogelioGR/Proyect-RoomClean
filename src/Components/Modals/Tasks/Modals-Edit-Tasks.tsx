import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface MEditTasksProps {
    show: boolean;
    handleClose: () => void;
  }

const  MCEditTasks: React.FC<MEditTasksProps> = ({ show, handleClose }) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <h2 className="text-center mb-4">Editar Tarea</h2>
              <Form.Label>Habitacion del hotel</Form.Label>
              <Form.Control
                type="text"
                placeholder="A01-105"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
      <Button variant="success" type="submit" >
              Guardar
            </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
      </Modal>
    </>
  );
}

export default MCEditTasks;