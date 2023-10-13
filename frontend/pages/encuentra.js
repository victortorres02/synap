import { NavBar } from "./NavBar"

function Desarrollador({ name, rating, imagen }) {
    return (
        <div className="w3-third w3-margin-bottom">
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
    var imagen1 = "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    var imagen2 = "https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp"
    var imagen3 = "https://pymstatic.com/5844/conversions/personas-emocionales-wide_webp.webp"
    return (
        <div className="w3-row-padding w3-padding-16">
            <Desarrollador name="David Páez" rating="4.7" imagen={imagen1} />
            <Desarrollador name="Axel Raul" rating="3.4" imagen={imagen2} />
            <Desarrollador name="Sofia Garcia" rating="4.3" imagen={imagen3} />
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
                <div style={{ margin: '20px 0 0 80px', fontSize: '20px' }}>
                    <h3>Publica tu Proyecto</h3>
                    <a style={{ margin: '0 0 0 100px', fontSize: '20px' }} className="w3-button w3-dark-grey" href="https://www.w3schools.com/w3css/default.asp">
                        <i className="fa fa-search w3-margin-right">Busco proyectos para desarrollar</i>
                    </a>
                </div>
            </div>
        </div>
    )
}
