import { NavBar } from "./NavBar"
import { Grid, GridItem, Input, Textarea, Select } from '@chakra-ui/react'
import { Footer } from "./footer"

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
                <a className="w3-button w3-dark-grey" href="./proyectos">
                    <i className="fa fa-search w3-margin-right">Busco proyectos para desarrollar</i>
                </a>
            </div>
        </div>
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
                    <div style={{ position: 'relative', width: '800px', height: '400px', margin: 'auto' }}>
                        <img
                            src="https://i.postimg.cc/mDbd0Pq8/logo.png"
                            alt="Norway"
                            style={{objectFit: 'cover', position: 'absolute', top: '150px', left: '0' }}
                        />
                    </div>
                </GridItem>
                <GridItem rowSpan={2} colSpan={2} bg='#81E6D9' style={{ padding: '20px' }}>
                    <Header />
                </GridItem>
            </Grid>
            <Footer />
        </div>
    )
}