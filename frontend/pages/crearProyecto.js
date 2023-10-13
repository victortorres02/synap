import { Grid, GridItem, Input, Textarea, Select } from '@chakra-ui/react'
import { NavBar } from './NavBar'

function Formulario() {
    return (
        <div>
            <h2>Titulo</h2>
            <Input placeholder='Titulo' bg='white' />
            <h2>Descripcion del Proyecto</h2>
            <Textarea placeholder='Escriba la Descripción' bg='white' h='150px' />
            <h2>Oferta</h2>
            <Input placeholder='Oferta' bg='white' />
            <h2>Categoria</h2>
            <Select placeholder='Selecciona Categoria'>
                <option value='option1'>Salud</option>
                <option value='option2'>Logistica</option>
                <option value='option3'>Agricultura</option>
            </Select>
            <br />
            <br />
            <a style={{fontSize: '20px', width:'700px'}} className="w3-button w3-dark-grey" href="https://www.w3schools.com/w3css/default.asp">
                <i className="fa fa-search w3-margin-right">Busco proyectos para desarrollar</i>
            </a>
        </div>
    )
}

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
                <GridItem rowSpan={2} colSpan={2} bg='white' style={{ padding: '20px' }}>
                    <Formulario />
                </GridItem>
                <GridItem colSpan={1} bg='papayawhip' />
                <GridItem colSpan={1} bg='papayawhip' />
                <GridItem colSpan={1} bg='tomato' />
                <GridItem colSpan={3} bg='tomato' />
            </Grid>
        </div>
    )
}
