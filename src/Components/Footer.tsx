import React from 'react';
import { Container } from 'react-bootstrap';


const Footer: React.FC = () => {
  return (
    <footer className={`bg-white text-black mt-auto py-2 `}>
      <Container fluid className="text-start">
        © 2024 RoomClean. Derechos reservados.
      </Container>
    </footer>
  );
};

export default Footer;
