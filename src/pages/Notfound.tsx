import React from 'react';
import'/src/Components/style/NotFound.css'

const NotFound = () => {
  return (
    <div className="error-page">
    <div className="error-message">
      <h1>Oops!</h1>
      <p>The page you are looking for can't be found.</p>
      <button className="home-button">Home</button>
    </div>
    <div className="error-image">
      <img src='/public/404.svg' alt="404 Error" />
    </div>
  </div>
  );
};

export default NotFound;
