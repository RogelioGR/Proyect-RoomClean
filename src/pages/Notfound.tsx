import React from 'react';
import'/src/Components/style/NotFound.css'

const NotFound : React.FC = () => {
  return (
  <>
  <div className="container">

   <div className="container-error">
    <div className="text">
      <h1> 404!</h1>
      <p>No se puede encontrar la página ...</p>
    </div>
    <div className="image">
      <img src='/public/notfound.svg' alt="404 Error" />
    </div>
    <a href="">
        <button> volver </button>
    </a>
  </div>
</div>
  

  </>
  );
};

export default NotFound;
