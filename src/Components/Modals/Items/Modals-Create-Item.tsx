import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createItem, Item } from '../../../Services/InventarioService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface MCreateItemProps {
  show: boolean;
  handleClose: () => void;
}

const MCreateItem: React.FC<MCreateItemProps> = ({ show, handleClose }) => {
const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState<Item>({
    nombre: '',
    descripcion: '',
    cantidad: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createItem(formData);
      MySwal.fire({
        title: "Usuario creado",
        text: "El usuario ha sido creado exitosamente",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
        MySwal.fire("Error", "Hubo un error al añadir el item", "error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Ítem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del ítem"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción del ítem"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCantidad">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad del ítem"
              name="cantidad"
              value={formData.cantidad}
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
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MCreateItem;
