import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteUser  } from '../../../Services/UsuarioService';


interface MDeleteUserProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  userId?: number; 
}
/* sweetalert2 */
const MySwal = withReactContent(Swal);

const MDeleteUser: React.FC<MDeleteUserProps> = ({ show, handleClose , userId}) => {

  const ValidarEliminacion = async () => {
    try {
      if (userId !== undefined) {
        await deleteUser(userId);  
        MySwal.fire({
          title: 'Eliminado',
          text: 'El usuario ha sido eliminado.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        throw new Error('El ID del usuario es indefinido');
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
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
        <p>¿Estás seguro de que deseas eliminar el usuario  ?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger" onClick={ValidarEliminacion}>
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
