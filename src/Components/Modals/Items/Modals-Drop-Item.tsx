import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteItem } from '../../../Services/InventarioService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface MDeleteItemProps {
  show: boolean;
  handleClose: () => void;
  itemId?: number;
}

const MDeleteItem: React.FC<MDeleteItemProps> = ({ show, handleClose, itemId }) => {

const MySwal = withReactContent(Swal);
  const handleDelete = async () => {
    try {
      if (itemId) {
        await deleteItem(itemId);
        MySwal.fire({
            title: "Eliminado",
            text: "El item ha sido eliminado.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        handleClose();
      }
    } catch (error) {
        throw new Error("El ID del item es indefinido");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Ítem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar este ítem?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MDeleteItem;
