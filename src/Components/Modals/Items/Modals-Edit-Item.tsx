import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getItemById, updateItem, Item } from '../../../Services/InventarioService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface MEditItemProps {
  show: boolean;
  handleClose: () => void;
  itemId?: number;
}

const MEditItem: React.FC<MEditItemProps> = ({ show, handleClose, itemId }) => {
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState<Item>({
    nombre: '',
    descripcion: '',
    cantidad: 0,
  });

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const itemData = await getItemById(itemId);
          setFormData(itemData);
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itemId) {
      try {
        await updateItem(itemId, formData);
        MySwal.fire({
          title: "Item editado",
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
    }
  };

  return (
    <Modal 
    show={show}
     onHide={handleClose}
     aria-labelledby="contained-modal-title-vcenter"
     centered>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Editar articulo</h2>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
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
