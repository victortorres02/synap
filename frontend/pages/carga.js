import React from "react";
import { Button } from "@chakra-ui/react";

export default function Proyectos({title, description, offer}) {

    const rowStyle = {
        height: '160px',
        backgroundColor: 'burlywood',
        padding: '20px 0 0 20px',
        outline: '0px solid black',
        lineHeight: '0.5',
    };

    return (
        <div className="column">
            <div style={rowStyle} className="row">
                <div className="info">
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                    <h3>{offer}</h3>
                </div>
                <div>
                    <Button>Enviar Solicitud</Button>
                </div>
            </div>
            <br />
        </div>
    )
}

export {Proyectos};