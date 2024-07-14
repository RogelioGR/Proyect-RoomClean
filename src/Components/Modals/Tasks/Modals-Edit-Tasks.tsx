import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateTask, getTaskById, Task } from '../../../Services/TareaService';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface MEditTasksProps {
  show: boolean;
  handleClose: () => void;
  taskId: string | undefined;
}
const MySwal = withReactContent(Swal);

const MEditTasks: React.FC<MEditTasksProps> = ({ show, handleClose, taskId }) => {
  const [taskData, setTaskData] = useState<Task>({
    nombre: '',
    descripcion: '',
    estatus: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const taskData = await getTaskById(parseInt(taskId));
          setTaskData(taskData);
        } catch (error) {
          MySwal.fire("Error", "Hubo un error al cargar los datos del usuario", "error");
        }
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) {
      console.error('Task ID not provided.');
      return;
    }

    try {
      await updateTask(parseInt(taskId), taskData);
      MySwal.fire({
        title: "Tarea editado",
        text: "La Tarea ha sido editado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); 
        }
      });
      handleClose();
    } catch (error) {
      MySwal.fire("Error", "Hubo un error al editar la Tarea", "error");

    }
  };

  return (
    <Modal show={show} onHide={handleClose}    
    aria-labelledby="contained-modal-title-vcenter"
    centered>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h2 className="text-center ">Editar Tarea</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicHabitacion">
            <Form.Label>Habitación del hotel</Form.Label>
            <Form.Control
              type="text"
              placeholder="A01-105"
              name="nombre"
              value={taskData.nombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción de la tarea"
              name="descripcion"
              value={taskData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <div className='text-center mt-4'>
          <Button variant="success" className='me-2' type="submit">
            Guardar
          </Button>
          <Button variant="secondary " onClick={handleClose}>
            Cancelar
          </Button>

          </div>
       
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MEditTasks;
