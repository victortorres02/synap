import { Grid, GridItem, Input, Textarea, Select } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import { useState } from 'react';
import {promises as fs} from 'fs';

async function Formulario() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        offer: '',
        category: 'option1', // Valor predeterminado para la categoría
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes hacer lo que quieras con el objeto formData
        console.log(formData);

        const file = await fs.readFile("../pages/store/proyectos.json");

        const jsonFile = fs.readFileSync("../pages/store/proyectos.json");
        const jsonData = JSON.parse(jsonFile);
        jsonData.proyectos.push({
            title: formData.title,
            description: formData.description,
            offer: formData.offer,
            category: formData.category
        });

        // Convert the JavaScript object back into a JSON string
        const jsonString = JSON.stringify(jsonData);

        fs.writeFileSync('../pages/store/proyectos.json', jsonString, 'utf-8', (err) => {
            if (err) throw err;
            console.log('Data added to file');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Titulo</h2>
                <Input name='title' placeholder='Titulo' bg='white' value={formData.title} onChange={handleChange} />
                <h2>Descripcion del Proyecto</h2>
                <Textarea name='description' placeholder='Escriba la Descripción' bg='white' h='150px' value={formData.description} onChange={handleChange} />
                <h2>Oferta</h2>
                <Input name='offer' placeholder='Oferta' bg='white' value={formData.offer} onChange={handleChange} />
                <h2>Categoria</h2>
                <Select name='category' placeholder='Selecciona Categoria' value={formData.category} onChange={handleChange}>
                    <option value='option1'>Salud</option>
                    <option value='option2'>Logistica</option>
                    <option value='option3'>Agricultura</option>
                </Select>
                <br />
                <br />
            </div>
            <button type='submit' style={{ fontSize: '20px', width: '100%' }} className="w3-button w3-dark-grey">
                <i className="fa fa-search w3-margin-right">Busco proyectos para desarrollar</i>
            </button>
        </form>
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
                <GridItem colSpan={1} bg='papayawhip'>
                    <img src="https://png.pngtree.com/background/20210710/original/pngtree-programming-color-code-character-background-picture-image_990509.jpg" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
                </GridItem>
                <GridItem colSpan={1} bg='papayawhip'>
                    <img src="https://www.researchgate.net/publication/346050021/figure/fig5/AS:960198013378560@1605940454104/FIGURA-8-PlANO-Y-PERFIlES-qUE-DEMUESTRAN-El-PROYECTO-PARA-UNA-bATERIA-qUE-CONTENGA-4.png" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
                </GridItem>
                <GridItem colSpan={1} bg='tomato'>
                    <img src="https://i.pinimg.com/550x/e9/6f/d4/e96fd4f4ac2d53d5a0c95d2814a53416.jpg" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
                </GridItem>
                <GridItem colSpan={3} bg='tomato'>
                    <img src="https://www.mchmaster.com/es/archivos/noticias/763/norman-foster2-100.jpg" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
                </GridItem>
            </Grid>
        </div>
    )
}
