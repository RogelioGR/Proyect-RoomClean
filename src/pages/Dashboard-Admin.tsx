import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Pagination, Form  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsers, getUserById, User } from '../Services/UsuarioService';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCreateUser from '../Components/Modals/Users/Modals-Create-user';
import MEditUser from '../Components/Modals/Users/Modals-Edit-User';
import MDeleteUser from '../Components/Modals/Users/Modals-Drop-user';
import { parseJwt } from '../Services/jwt';

const DashboardAdmin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('authenticated');

    if (authStatus !== 'true') {
      navigate("/login");
    } else {
      const fetchUsers = async () => {
        try {
          const usersData = await getUsers();
          setUsers(usersData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching users:', error);
          setLoading(false);
        }
        const token = localStorage.getItem('token');
        if (token) {
          const userId = parseJwt(token).id;
          localStorage.setItem('userId', userId.toString());

          const userData = await getUserById(userId);
          setUser(userData);
        }
      };

      fetchUsers();

      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setUsersPerPage(6);
        } else {
          setUsersPerPage(5);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [navigate]);

  const filteredUsers = users.filter(user => {
    return `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  enum ModalsUsers {
    NONE = 'NONE',
    CREATE_USER = 'CREATE_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
  }

  const [modalUsers, setModalUsers] = useState(ModalsUsers.NONE);
  const [selectedUserId, setSelectedUserId] = useState<number>();

  const handleCloseModal = () => setModalUsers(ModalsUsers.NONE);

  const handleOpenModal = (type: ModalsUsers, userId?: number) => {
    setModalUsers(type);
    setSelectedUserId(userId);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex vh-100 flex-column flex-md-row  viewinform-container">
          <Sidebar />
          <div className="flex-grow-1 d-flex flex-column viewinform-content ">
            <Header />
            <Container className="my-3" style={{ overflowY: 'auto' }}>
     
              <div>
                <h2 className="mb-4">Bienvenido {user ? `${user.nombre}` : 'Usuario'}!</h2>
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <Form.Control
                      type="text"
                      placeholder="Buscar usuario"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ backgroundColor: '#E2E2E2' }}
                    />
                  </div>
                  <div className="d-flex justify-content-end align-items-center mt-2">
                    <Button variant="success" className="mb-3" onClick={() => handleOpenModal(ModalsUsers.CREATE_USER)}>
                      <i className="fas fa-plus"></i> <span className='d-none d-md-inline'> Agregar Usuario</span>
                    </Button>
                  </div>
                </div>
                <Table responsive striped bordered hover>
                  <thead className="text-center">
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre completo</th>
                      <th>Correo electrónico</th>
                      <th className="d-none d-md-table-cell">Número</th>
                      <th>Núm empleado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="align-middle text-center" style={{ width: '60px' }}>
                            <img src={user.foto || "/public/usuario.png"} alt="user" className="rounded-circle" style={{ width: '50px' }} />
                          </td>
                          <td>{user.nombre} {user.apellido}</td>
                          <td>{user.correo}</td>
                          <td className="d-none d-md-table-cell">{user.número}</td>
                          <td>{user.id}</td>
                          <td>
                            <div className="d-flex justify-content-center m-1">
                              <Button variant="warning" className="me-2" onClick={() => handleOpenModal(ModalsUsers.EDIT_USER, user.id)} >
                                <i className="fas fa-pen"></i>
                              </Button>
                              <Button variant="danger" className="me-2" onClick={() => handleOpenModal(ModalsUsers.DELETE_USER, user.id)}>
                                <i className="fas fa-trash"></i>
                              </Button>
                              {user.fkRol === 1 ? (
                                <Button variant="secondary" className="me-2" disabled>
                                  <i className="fas fa-plus"></i>
                                  <span className="d-none d-md-inline"> Asignar tareas</span>
                                </Button>
                              ) : (
                                <Button variant="primary" className="me-2" onClick={() => navigate(`/AssignTasksAdmin/${user.id}`)}>
                                  <i className="fas fa-plus"></i>
                                  <span className="d-none d-md-inline"> Asignar tareas</span>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center">Sin empleados en la lista</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {users.length > 0 && (
                  <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
                      <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                )}
              </div>
            </Container>
            <Footer />
          </div>
        </div>
      )}
      {/* Modales */}
      <MEditUser show={modalUsers === ModalsUsers.EDIT_USER} handleClose={handleCloseModal} userId={selectedUserId} />
      <MCreateUser show={modalUsers === ModalsUsers.CREATE_USER} handleClose={handleCloseModal} />
      <MDeleteUser show={modalUsers === ModalsUsers.DELETE_USER} handleClose={handleCloseModal} userId={selectedUserId} />
    </>
  );
};

export default DashboardAdmin;
