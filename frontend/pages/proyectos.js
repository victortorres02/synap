import React from 'react';

const Proyectos = () => {
  const rowStyle = {
    height: '140px',
    backgroundColor: 'burlywood',
    paddingLeft: '20px',
    outline: '1px solid black',
    lineHeight: '0.5',
  };

  const infoStyle = {
    float: 'left',
    width: '80%',
  };

  const bodyStyle = {
    backgroundColor: 'white',
  };

  let jsonData = [];

    // Fallback to sessionStorage if localStorage is not supported
    let storageObject = null; //sessionStorage["projects"]; seems like the dev env doesn't have access to localStorage nor sessionStorage

    if (storageObject != null) {
        jsonData = JSON.parse(storageObject);
    }

  return (
    <div className="column">
      <div style={rowStyle} className="row">
        <div style={infoStyle} className="info">
          <h1>Backend para aplicación de blockchain Solana</h1>
          <h2>Se busca a un desarrollador experimentado en Rust y en la red Solana</h2>
          <h3>$20</h3>
        </div>
        <div>
          <a href="https://www.google.com">Botón</a>
        </div>
      </div>
      <br />
      <div style={rowStyle} className="row">
        <div style={infoStyle} className="info">
          <h1>Videojuego de plataformas 2D</h1>
          <h2>Se busca un desarrollador capacitado en Unity para hacer un juego en plataformas 2D</h2>
          <h3>$60</h3>
        </div>
        <div>
          <a href="https://www.google.com">Botón</a>
        </div>
      </div>
      <br />
      <div style={rowStyle} className="row">
        <div style={infoStyle} className="info">
          <h1>Aplicación iOS</h1>
          <h2>Necesito una aplicación en iOS para negocio de frutas y verduras</h2>
          <h3>$100</h3>
        </div>
        <div>
          <a href="https://www.google.com">Botón</a>
        </div>
      </div>
      {jsonData.map((project, index) => (
        <div style={rowStyle} className="row">
          <div style={infoStyle} className="info">
            <h1>{project.title}</h1>
            <h2>{project.description}</h2>
            <h3>${project.offer}</h3>
          </div>
          <div>
            <a href="https://www.google.com">Botón</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Proyectos;