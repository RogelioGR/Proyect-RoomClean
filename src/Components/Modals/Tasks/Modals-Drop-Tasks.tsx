import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { deleteTask } from '../../../Services/TareaService';



interface MDeleteTasksProps {
  show: boolean;
  handleClose: () => void;
  TaskId?: number;
}

const MySwal = withReactContent(Swal);



const MDeleteTasks: React.FC<MDeleteTasksProps> = ({ show, handleClose, TaskId }) => {
  const ValidarEliminacion = async () => {
    try {
      if (TaskId !== undefined) {
        await deleteTask(TaskId);
        MySwal.fire({
          title: "Eliminado",
          text: "La Tarea  ha sido eliminado.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        throw new Error("El ID de la Tarea es indefinido");
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "No se pudo eliminar la tarea.",
        icon: "error",
        confirmButtonText: "OK",
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
        <h2>Eliminar Tarea</h2>
        <p>¿Estás seguro de que deseas eliminar esta Tarea ?</p>
        

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

export default MDeleteTasks;
