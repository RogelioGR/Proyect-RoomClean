
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface MDeleteUserProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const MySwal = withReactContent(Swal);

const MDeleteUser: React.FC<MDeleteUserProps> = ({ show, handleClose, handleDelete }) => {

  const handleDeleteAndNotify = () => {
    handleDelete();
    MySwal.fire({
      title: 'Eliminado',
      text: 'El usuario ha sido eliminado.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      handleClose();
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="delete-user-modal-title"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center justify-content-center">
        <h2>Eliminar Usuario</h2>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={handleDeleteAndNotify}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MDeleteUser;
