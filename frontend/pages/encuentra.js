import { NavBar } from "./NavBar"
import candidates from '../pages/store/candidates.json';
import { Footer } from "./footer";

function Desarrollador({ name, rating, imagen }) {
    return (
        <div className="w3-third w3-margin-bottom" style={{borderRadius:'100px'}}>
            <img src={imagen} alt="Norway" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
            <div className="w3-container w3-white">
                <h3>{name}</h3>
                <h4 className="w3-opacity">Rating {rating}/5</h4>
                <br />
                <p className="w3-large">
                    Especializacion: OK
                </p>
                <br />
                <button className="w3-button w3-block w3-black w3-margin-bottom">Contratar Programador</button>
            </div>
        </div>
    )
}

function Encuentra() {
    return (
        <div className="w3-row-padding w3-padding-16">
            {candidates.map((candidate, index) => (
                <Desarrollador
                name={candidate.name}
                rating={candidate.rating}
                imagen={candidate.image}
                />
            ))}
        </div>
    )
}

export default function main() {
    return (
        <div class="w3-black">
            <NavBar />
            <br />
            <h2 style={{ textAlign: 'center' }}>Programadores postulados</h2>
            <br />
            <Encuentra />
            <div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 0 80px', fontSize: '20px' }}>
                    <h3 style={{ marginRight: '20px' }}>Publica tu Proyecto</h3>
                    <a className="w3-button w3-dark-grey" href="./crearProyecto">
                        <i className="fa fa-search w3-margin-right"></i> Crear Proyecto
                    </a>
                </div>
            </div>
            <br />
            <Footer/>
        </div>
    )
}
