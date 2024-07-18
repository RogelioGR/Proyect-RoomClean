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
            text: "El articulo ha sido eliminado.",
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
        throw new Error("El ID del articulo es indefinido");
    }
  };

  return (
    <Modal 
    show={show} 
    onHide={handleClose}  
    aria-labelledby="contained-modal-title-vcenter"
    centered>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center justify-content-center">
      <h2 className="text-center mb-4">Eliminar articulo</h2>

        <p>¿Estás seguro de que deseas eliminar este articulo?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
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
