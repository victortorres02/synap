import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './footer';
import { Button } from '@chakra-ui/button';

//En esta función de dibujan verticalmente todos los datos de un proyecto, desde su nombre, descripción hasta del financiamiento.
const Proyectos = () => {
    const rowStyle = {
        height: '160px',
        backgroundColor: 'burlywood',
        padding: '20px 0 0 20px',
        outline: '0px solid black',
        lineHeight: '0.5',
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
        <div>
            <NavBar />
            <div className="column">
                <div style={rowStyle} className="row">
                    <div className="info">
                        <h1>Backend para aplicación de blockchain Solana</h1>
                        <h2>Se busca a un desarrollador experimentado en Rust y en la red Solana</h2>
                        <h3>$20</h3>
                    </div>
                    <Button>Enviar Solicitud</Button>
                </div>
                <br />
                <div style={rowStyle} className="row">
                    <div className="info">
                        <h1>Videojuego de plataformas 2D</h1>
                        <h2>Se busca un desarrollador capacitado en Unity para hacer un juego en plataformas 2D</h2>
                        <h3>$60</h3>
                    </div>
                        <Button>Enviar Solicitud</Button>
                </div>
                <br />
                <div style={rowStyle} className="row">
                    <div className="info">
                        <h1>Aplicación iOS</h1>
                        <h2>Necesito una aplicación en iOS para negocio de frutas y verduras</h2>
                        <h3>$100</h3>
                    </div>
                    <div>
                        <Button>Enviar Solicitud</Button>
                    </div>
                </div>
                {jsonData.map((project, index) => (
                    <div style={rowStyle} className="row">
                        <div className="info">
                            <h1>{project.title}</h1>
                            <h2>{project.description}</h2>
                            <h3>${project.offer}</h3>
                        </div>
                        <Button>Enviar Solicitud</Button>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Proyectos;