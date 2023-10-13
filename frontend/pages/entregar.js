import { NavBar } from "./NavBar"
import proyectos from '../pages/store/proyectos.json';
import { Grid, GridItem, Input, Textarea, Select } from '@chakra-ui/react'
import { Entregar, Verificar } from "./modal"
import { Proyectos } from "./carga";
import { Footer } from "./footer";

// Carga los datos de los proyectos para después entregarlos y así pasar la actividad por Link
function Descripcion() {
    return (
        <div>
            <h2 style={{ fontWeight: 'bold' }}>Titulo</h2>
            <h2>Equisde</h2>
            <h2 style={{ fontWeight: 'bold' }}>Descripcion del Proyecto</h2>
            <Textarea placeholder='Escriba la Descripción' bg='white' h='150px' />
            <h2 style={{ fontWeight: 'bold' }}>Oferta</h2>
            <h2>0.015</h2>
            <h2 style={{ fontWeight: 'bold' }}>Categoria</h2>
            <h2>Salud</h2>
            <br />
            <br />
            <Entregar />
        </div>
    )
}

// La función Main dibuja lo principal, siendo una columna de Proyectos y una columna de la descripción del proyecto donde lo puedes subir.
export default function main() {
    return (
        <div class="w3-black">
            <NavBar />
            <Grid
                h='900px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
                padding='30px'
                color='black'
            >

                <GridItem colSpan={3} rowSpan={2} bg='gray'>
                    <div className="w3-row-padding w3-padding-16">
                        {proyectos.Proyectos.map((proyecto, index) => (
                            <Proyectos
                                title={proyecto.title}
                                description={proyecto.description}
                                offer={proyecto.offer}
                            />
                        ))}
                    </div>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#81E6D9' style={{ padding: '20px' }}>
                    <Descripcion />
                </GridItem>
            </Grid>
            <Footer />
        </div>
    )
}