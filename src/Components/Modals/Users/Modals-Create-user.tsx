import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createUser, User } from "../../../Services/UsuarioService";

const MySwal = withReactContent(Swal);

interface MCreateUserProps {
  show: boolean;
  handleClose: () => void;
}

const MCreateUser: React.FC<MCreateUserProps> = ({ show, handleClose }) => {
  
  const [formData, setFormData] = useState<User>({
    nombre: "",
    apellido: "",
    número: "",
    correo: "",
    contraseña: "",
    foto: "",
    fkRol: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader(); 
  
      reader.onload = (event) => {
        if (event.target?.result) {
          const photoUrl = event.target.result.toString(); 
          setFormData({ ...formData, foto: photoUrl }); 
        }
      };
  
      reader.readAsDataURL(file); 
    }
  };
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.número.length !== 10 ) {
      MySwal.fire(
        "Error",
        "Número telefónico incorrecto. Debe tener 10 dígitos.",
        "error"
      );
      return;
    }

    if (formData.contraseña.length < 8) {
      MySwal.fire(
        "Error",
        "La contraseña debe tener al menos 8 caracteres.",
        "error"
      );
      return;
    }
  
    try {
      await createUser(formData);
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
      MySwal.fire("Error", "Hubo un error al crear el usuario", "error");
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
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Crear usuario</h2>
          <Row className="justify-content-center">
            <Col className="d-flex justify-content-center align-items-center">
              <img
                src={formData.foto || "/public/agregar-usuario.png"}
                style={{ width: "180px", height: "180px" , borderRadius:"6rem"}}
                alt="Perfil del usuario"
              />
            </Col>
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
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
                        name="apellido"
                        value={formData.apellido}
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
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="contraseña"
                    value={formData.contraseña}
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
                        name="número"
                        value={formData.número}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmployeeNumber">
                      <Form.Label>ROL del usuario:</Form.Label>
                      <Form.Control
                        as="select"
                        name="fkRol"
                        value={formData.fkRol}
                        onChange={handleChange}
                      >
                         <option>Roles </option>
                        <option value={1}>Admin </option>
                        <option value={2}>Empleado</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formFoto">
                  <Form.Label>Foto de perfil:</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <div className="d-flex align-items-center mt-4">
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
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default MCreateUser;
