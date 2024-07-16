import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateItem, Item, getItemById } from '../../../Services/InventarioService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface MEditItemProps {
  show: boolean;
  handleClose: () => void;
  itemId?: number;
}

const MEditItem: React.FC<MEditItemProps> = ({ show, handleClose, itemId }) => {
    const MySwal = withReactContent(Swal);
  const [formData, IsetItemData] = useState<Item>({
    nombre: '',
    descripcion: '',
    cantidad: 0,
  });



  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const itemData = await getItemById(itemId);
          IsetItemData(itemData);
        } catch (error) {
          console.error('Error al cargar los datos del ítem:', error);
        }
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    IsetItemData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!itemId) {
        console.error('Task ID not provided.');
        return;
      }
    e.preventDefault();

    try {
        
      await updateItem(itemId, formData);
      MySwal.fire({
        title: "Usuario editado",
        text: "El item ha sido editado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
        MySwal.fire("Error", "Hubo un error al editar el item", "error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Ítem</Modal.Title>
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

export default MEditItem;
