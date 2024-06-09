import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface MCreateUserProps {
  show: boolean;
  handleClose: () => void;
}
const MySwal = withReactContent(Swal);

const MCreateUser: React.FC<MCreateUserProps> = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Crear usuario</h2>
          <Row className="justify-content-center">
            <Col md={4} className="d-flex justify-content-center align-items-center">
              <img src="/public/mujer.png" style={{ width: '150px', height: '150px' }} alt="Perfil del usuario" />
            </Col>
            <Col md={8}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control type="text" placeholder="Nombre" name="firstName" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Apellido:</Form.Label>
                      <Form.Control type="text" placeholder="Apellido" name="lastName" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formEmail">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control type="email" placeholder="Correo electrónico" name="email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" name="password" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Teléfono:</Form.Label>
                      <Form.Control type="text" placeholder="Teléfono" name="phone" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmployeeNumber">
                      <Form.Label>Número de empleado:</Form.Label>
                      <Form.Control type="text" placeholder="Número de empleado" name="employeeNumber" />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
      <Button variant="success" type="submit" >
              Guardar
            </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MCreateUser;