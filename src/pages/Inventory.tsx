import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Pagination, Form } from 'react-bootstrap';
import { getItems, Item } from '../Services/InventarioService';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Loader from '../Components/Loader';
import MCreateItem from '../Components/Modals/Items/Modals-Create-Item';
import MEditItem from '../Components/Modals/Items/Modals-Edit-Item';
import MDeleteItem from '../Components/Modals/Items/Modals-Drop-Item';

const Inventario: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getItems();
        setItems(itemsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    fetchItems();

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredItems = items.filter(item => {
    return item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  enum ModalsItems {
    NONE = 'NONE',
    CREATE_ITEM = 'CREATE_ITEM',
    EDIT_ITEM = 'EDIT_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
  }

  const [modalItems, setModalItems] = useState(ModalsItems.NONE);
  const [selectedItemId, setSelectedItemId] = useState<number>();

  const handleCloseModal = () => setModalItems(ModalsItems.NONE);

  const handleOpenModal = (type: ModalsItems, itemId?: number) => {
    setModalItems(type);
    setSelectedItemId(itemId);
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex vh-100 flex-column flex-md-row  vviewinform-container">
          <Sidebar />
          <div className="flex-grow-1 d-flex flex-column viewinform-content">
            <Header />
            <Container className="my-3" style={{ overflowY: 'auto' }}>
              <div>
                <h2 className="mb-4">Gestión de Inventario</h2>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <Form.Control
                      type="text"
                      placeholder="Buscar item"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ backgroundColor: '#E2E2E2' }}
                    />
                  </div>
                  <div className="d-flex justify-content-end align-items-center mt-2">
                    <Button variant="success" className="mb-3" onClick={() => handleOpenModal(ModalsItems.CREATE_ITEM)}>
                      <i className="fas fa-plus"></i> Agregar item
                    </Button>
                  </div>
                </div>

                <Table responsive striped bordered hover>
                  <thead className="text-center">
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.nombre}</td>
                          <td>{item.descripcion}</td>
                          <td>{item.cantidad}</td>
                          <td>
                            <div className="d-flex justify-content-center m-1">
                              <Button variant="warning" className="me-2" onClick={() => handleOpenModal(ModalsItems.EDIT_ITEM, item.id)}>
                                <i className="fas fa-pen"></i>
                              </Button>
                              <Button variant="danger" className="me-2" onClick={() => handleOpenModal(ModalsItems.DELETE_ITEM, item.id)}>
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">Sin items en la lista</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {items.length > 0 && (
                  <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(filteredItems.length / itemsPerPage)).keys()].map(number => (
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
      <MEditItem show={modalItems === ModalsItems.EDIT_ITEM} handleClose={handleCloseModal} itemId={selectedItemId} />
      <MCreateItem show={modalItems === ModalsItems.CREATE_ITEM} handleClose={handleCloseModal} />
      <MDeleteItem show={modalItems === ModalsItems.DELETE_ITEM} handleClose={handleCloseModal} itemId={selectedItemId} />
    </>
  );
};

export default Inventario;
