import React from 'react';

//Navegación principal de la página aperece en el lado superior de la misma.
export default function NavBar() {
    return (
        <div class="w3-bar w3-white w3-large">
            <a href="./main" class="w3-bar-item w3-button w3-blue w3-mobile"><i class="fa fa-bed w3-margin-right"></i>Logo</a>
            <a href="./encuentra" class="w3-bar-item w3-button w3-mobile">Encontrar Desarrollador</a>
            <a href="./proyectos" class="w3-bar-item w3-button w3-mobile">Buscar Proyecto</a>
            <a href="./validar" class="w3-bar-item w3-button w3-mobile">Validar Proyectos</a>
            <a href="#contact" class="w3-bar-item w3-button w3-right w3-light-grey w3-mobile">Contact Us</a>
        </div>
    )
}

export {NavBar}