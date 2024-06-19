import React, { useState, useRef } from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { updateUser, User } from '../../../Services/UsuarioService';

interface MEditUserProps {
  show: boolean;
  handleClose: () => void;
}

const MySwal = withReactContent(Swal);

const MEditUser: React.FC<MEditUserProps> = ({ show, handleClose }) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    employeeNumber: ''
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para editar los datos del usuario
    console.log('Form data:', formData);

    // Mostrar alerta de éxito
    MySwal.fire({
      title: 'Usuario editado',
      text: 'El usuario ha sido editado correctamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Cerrar el modal después de editar
      handleClose();
    });
  };

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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
        <Modal.Title id="edit-user-modal-title"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Editar Perfil del usuario</h2>
          <Row className="justify-content-center">
            <Col md={4} className="d-flex justify-content-center align-items-center">
              <img src="/public/mujer.png" style={{ width: '150px', height: '150px' }} alt="Perfil del usuario" />
            </Col>
            <Col md={8}>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Apellido:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Apellido"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formEmail">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Teléfono:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Teléfono"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmployeeNumber">
                      <Form.Label>Número de empleado:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Número de empleado"
                        name="employeeNumber"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="success" onClick={handleSaveClick}>
          Guardar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MEditUser;
