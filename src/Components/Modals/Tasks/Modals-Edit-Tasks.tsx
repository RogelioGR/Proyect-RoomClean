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
  const [descripciones, setDescripciones] = useState<string[]>(['']);

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        try {
          const taskData = await getTaskById(parseInt(taskId));
          setTaskData(taskData);
          setDescripciones(JSON.parse(taskData.descripcion) || ['']);
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

  const handleDescripcionChange = (index: number, value: string) => {
    const nuevasDescripciones = [...descripciones];
    nuevasDescripciones[index] = value;
    setDescripciones(nuevasDescripciones);
  };

  const handleAgregarDescripcion = () => {
    setDescripciones([...descripciones, '']);
  };

  const handleEliminarDescripcion = (index: number) => {
    const nuevasDescripciones = descripciones.filter((_, i) => i !== index);
    setDescripciones(nuevasDescripciones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) {
      console.error('Task ID not provided.');
      return;
    }

    try {
      const updatedTaskData = {
        ...taskData,
        descripcion: JSON.stringify(descripciones.filter(desc => desc !== ''))
      };

      await updateTask(parseInt(taskId), updatedTaskData);
      MySwal.fire({
        title: "Tarea editada",
        text: "La Tarea ha sido editada correctamente.",
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
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="text-center">Editar Tarea</h2>
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
          {descripciones.map((descripcion, index) => (
            <Form.Group key={index} controlId={`formDescripcion${index}`}>
              <Form.Label>Descripción {index + 1}</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Tarea por realizar"
                  value={descripcion}
                  onChange={(e) => handleDescripcionChange(index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <Button variant="danger" className='ms-2' onClick={() => handleEliminarDescripcion(index)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </Form.Group>
          ))}
          <Button variant="secondary" className='mt-2' onClick={handleAgregarDescripcion}>
            Añadir Tarea
          </Button>
          <div className='text-center mt-4'>
            <Button variant="success" className='me-2' type="submit">
              Guardar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MEditTasks;
