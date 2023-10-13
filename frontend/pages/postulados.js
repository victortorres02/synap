import { NavBar } from "./NavBar";
import candidates from '../pages/store/candidates.json';

function Desarrollador({name, rating, imagen}) {
    return (
        <div className="w3-third w3-margin-bottom">
            <img src={imagen} alt="Norway" style={{ width: '100%', height: '450px', objectFit: 'cover'}} />
            <div className="w3-container w3-white">
                <h3>{name}</h3>
                <h4 className="w3-opacity">Rating {rating}/5</h4>
                <br/>
                <p className="w3-large">
                    Especializacion: OK
                </p>
                <br/>
                <button className="w3-button w3-block w3-black w3-margin-bottom">Contratar Programador</button>
            </div>
        </div>
    )
}

function Postulados() {
    return (
        <div className="w3-row-padding w3-padding-16">
            {candidates.map((candidate, index) => (
                <Desarrollador
                name={candidate.name}
                rating={candidate.rating}
                imagen={candidate.image}
                />
            ))}
            <Desarrollador name="David Páez" rating="4.7" imagen={imagen1}/>
            <Desarrollador name="Axel Raul" rating="3.4" imagen={imagen2}/>
            <Desarrollador name="Sofia Garcia" rating="4.3" imagen={imagen3}/>
        </div>
    )
}

export default function main() {
    return (
        <div class="w3-black">
            <NavBar />
            <br/>
            <h2 style={{textAlign:'center'}}>Programadores postulados</h2>
            <br/>
            <Postulados />
            <div>
                
            </div>
        </div>
    )
}
