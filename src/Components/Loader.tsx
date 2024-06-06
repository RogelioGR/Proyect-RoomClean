import React from 'react';
import'./style/Loaderc.css'

const Loader: React.FC = () => {
  return (
    <>
    <div className="loading-wave">
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
  <div className="loading-bar"></div>
</div>


    </>
  );
};

export default Loader;
