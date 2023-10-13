import { NavBar } from "./NavBar"
import { Grid, GridItem, Input, Textarea, Select } from '@chakra-ui/react'
import logo from './images/logo.png';

function Header() {
    return (
        <div style={{ padding: '20px' }}>
            <div>
                <br />
                <br />
                <br />
                <br />
                <h2 style={{ fontWeight: 'bold' }}>Un punto para que empleadores y desarrolladores hagan tratos seguros</h2>
                <br />
                <br />
                <h3>Con Synap utiliza la tecnología blockchain para que tus tratos siempre se cumplan bajo las conficiones que se establezcan</h3>
                <br />
            </div><br />
            <div style={{ margin: '20px 0', fontSize: '20px', textAlign: 'center' }}>
                <a className="w3-button w3-dark-grey" href="./encuentra">
                    <i className="fa fa-search w3-margin-right">Busco desarrolladores para Proyectos</i>
                </a>
                <br />
                <br />
                <a className="w3-button w3-dark-grey" href="https://www.w3schools.com/w3css/default.asp">
                    <i className="fa fa-search w3-margin-right">Busco proyectos para desarrollar</i>
                </a>
            </div>
        </div>
    )
}

function Footer() {
    return (
        <footer className="w3-padding-32 w3-black w3-center w3-margin-top">
            <h5>Si quieres contactarnos directamente aquí.</h5>
            <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" rel="noopener noreferrer" className="w3-hover-text-green">w3.css</a></p>
        </footer>
    )
}

export default function Main() {
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

                <GridItem colSpan={3} rowSpan={2} bg='black'>
                    <img src={logo} alt="Norway" style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#81E6D9' style={{ padding: '20px' }}>
                    <Header />
                </GridItem>
            </Grid>
            <Footer />
        </div>
    )
}