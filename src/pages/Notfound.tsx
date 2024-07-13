import React from 'react';
import '/src/Components/style/NotFound.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    const rol = localStorage.getItem('rol');
    if (rol === '1') {
      navigate("/DashboardAdmin");
    } else if (rol === '2') {
      navigate("/Dashboardempleado");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container-Notfound">
      <div className="infor-container">
        <div>
          <h1 className='titulo-404'>RoomClean</h1>
          <span className='text-span'>Página no encontrada</span>
          
          <p className='text-p'>Lo sentimos, la página que buscas no está disponible.</p>
          <div className='infor-button'>
            <Button variant="secondary" onClick={handleDashboard}>
            <i className="fa-solid fa-arrow-left"></i> <span> Regresar</span>
            </Button>
          </div>
        </div>
        <div className="image">
          <img src='/notfound.svg' alt="404 Error" className="bounce" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
