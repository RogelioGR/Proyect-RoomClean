import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getUserById, updateUser, User } from "../../../Services/UsuarioService";

interface MEditUserProps {
  show: boolean;
  handleClose: () => void;
  userId?: number;
}

const MySwal = withReactContent(Swal);

const MEditUser: React.FC<MEditUserProps> = ({ show, handleClose, userId }) => {
  const [formData, setFormData] = useState<User>({
    nombre: "",
    apellido: "",
    número: "",
    correo: "",
    contraseña: "", 
    foto: null,
    fkRol: 0,
  });

  const [tempPassword, setTempPassword] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId !== undefined) {
        try {
          const userData = await getUserById(userId);
          console.log("userData:", userData);
          setFormData(userData);
        } catch (error) {
          MySwal.fire("Error", "Hubo un error al cargar los datos del usuario", "error");
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "contraseña") {
      setTempPassword(value); // Actualiza el estado temporal de la contraseña
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === undefined) {
      MySwal.fire("Error", "ID de usuario no proporcionado", "error");
      return;
    }

    try {
      // Actualiza formData.contraseña con el valor de tempPassword
      await updateUser(userId, { ...formData, contraseña: tempPassword });
      MySwal.fire({
        title: "Usuario editado",
        text: "El usuario ha sido editado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); 
        }
      });
      handleClose();
    } catch (error) {
      MySwal.fire("Error", "Hubo un error al editar el usuario", "error");
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
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="flex-grow-1 my-5">
          <h2 className="text-center mb-4">Editar Perfil del usuario</h2>
          <Row className="justify-content-center">
            <Col
              md={4}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src="/public/agregar-usuario.png"
                style={{ width: "150px", height: "150px" }}
                alt="Perfil del usuario"
              />
            </Col>
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
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
                    <Form.Group>
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
                <Form.Group>
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password" // Tipo password para ocultar el texto
                    placeholder="Contraseña"
                    name="contraseña"
                    value={tempPassword} // Usa tempPassword para el campo de entrada
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group>
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
                    <Form.Group>
                      <Form.Label>Rol del usuario:</Form.Label>
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

export default MEditUser;
