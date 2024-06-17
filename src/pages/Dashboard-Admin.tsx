import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*Componentes */
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCreateUser from '../Components/Modals/Users/Modals-Create-user';
import MEditUser from '../Components/Modals/Users/Modals-Edit-User';
import MDeleteUser from '../Components/Modals/Users/Modals-Drop-user';

interface User {
  Nombre: string;
  correo: string;
  telefono: string;
  NumEmpleado: string;
  img: string;
}

const DashboardAdmin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // el número de usuarios por páginas
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  /* datos de prueba */
  const users: User[] = [
/*     { Nombre: 'Karla', correo: 'karla@gmmail.com', telefono: '7305477760', NumEmpleado: '123456', img: '/public/mujer.png' }, 
 */  
    

  ];

  // usuarios por paginas
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  enum ModalsUsers {
    NONE = 'NONE',
    CREATE_USER = 'CREATE_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
  }

  const [modalUsers, setModalUsers] = useState<ModalsUsers>(ModalsUsers.NONE);
  const handleOpenModal = (type: ModalsUsers) => setModalUsers(type);
  const handleCloseModal = () => setModalUsers(ModalsUsers.NONE);


  const handleDeleteUser = () => {
    // Lógica para eliminar el usuario
    handleCloseModal();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Container className="mt-5" >
            <h1 className="mb-4">Bienvenido, Admin!</h1>
            <div className="d-flex justify-content-end align-items-center mt-4">
              <Button variant="success" className="mb-3" onClick={() => handleOpenModal(ModalsUsers.CREATE_USER)}>
                <i className="fas fa-plus"></i> Agregar usuario
              </Button>
            </div>
            <Table striped bordered hover className="mt-4">
              <thead className="text-center">
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th className="d-none d-md-table-cell">Numero</th>
                  <th>Número de empleado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <img src={user.img} alt="user" style={{ width: '50px', borderRadius: '50%', marginRight: '10px' }} />
                        {user.Nombre}
                      </td>
                      <td>{user.correo}</td>
                      <td className="d-none d-md-table-cell">{user.telefono}</td>
                      <td>{user.NumEmpleado}</td>
                      <td>
                        <div className="d-flex justify-content-center m-1">
                          <Button variant="warning" className="me-2" onClick={() => handleOpenModal(ModalsUsers.EDIT_USER)}>
                            <i className="fas fa-pen"></i>
                          </Button>
                          <Button variant="danger" className="me-2" onClick={() => handleOpenModal(ModalsUsers.DELETE_USER)}>
                            <i className="fas fa-trash"></i>
                          </Button>
                          <Link to="/AssignTasksAdmin" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button variant="primary" className="me-2">
                              <i className="fas fa-plus"></i> 
                              <span className="d-none d-md-inline ">Asignar tareas</span>

                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">Sin empleados en la lista</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {users.length > 0 && (
              <Pagination className="justify-content-center">
                {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
                  <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Container>
          <Footer />
        </div>
      </div>
      )}
      {/* Modals */}
      <MEditUser show={modalUsers === ModalsUsers.EDIT_USER} handleClose={handleCloseModal} />
      <MCreateUser show={modalUsers === ModalsUsers.CREATE_USER} handleClose={handleCloseModal} />
      <MDeleteUser show={modalUsers === ModalsUsers.DELETE_USER} handleClose={handleCloseModal} handleDelete={handleDeleteUser} />
    </>
  );
};

export default DashboardAdmin;
