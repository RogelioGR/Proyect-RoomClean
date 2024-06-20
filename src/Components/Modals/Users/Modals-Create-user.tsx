import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createUser, User } from '../../../Services/UsuarioService';

const MySwal = withReactContent(Swal);

interface MCreateUserProps {
  show: boolean;
  handleClose: () => void;
}

const MCreateUser: React.FC<MCreateUserProps> = ({ show, handleClose }) => {

const [formData, setFormData] = useState<User>({
    nombre: '',
    apellido: '',
    número: '',
    correo: '',
    contraseña: '',
    foto: null,
    fkRol: 0,
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      MySwal.fire({
        title: 'Usuario creado',
        text: 'El usuario ha sido creado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      handleClose();
    } catch (error) {
      MySwal.fire('Error', 'Hubo un error al crear el usuario', 'error');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text" placeholder="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control type="text" placeholder="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formEmail">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control type="email" placeholder="Correo electrónico" name="correo" value={formData.correo} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" name="contraseña" value={formData.contraseña} onChange={handleChange} />
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPhone">
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control type="text" placeholder="Teléfono" name="número" value={formData.número} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmployeeNumber">
                <Form.Label>ROL del usuario:</Form.Label>
                <Form.Control type="text" placeholder="Número de empleado" name="fkRol" value={formData.fkRol} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MCreateUser;
