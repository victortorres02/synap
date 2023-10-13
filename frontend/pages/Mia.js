import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  WrapItem,
  Center,
  Wrap,
  Box,
  Image,
  Progress
} from '@chakra-ui/react'
import { CrearProyecto, Configurar, Actividad, ConfirmarActividad, ConfigurarProyecto, AgregarActividad } from './Ventanas';

function Proyectos() {

  return (
    <GridItem className='Cuadro' h='100%' w='100%' border='2px' color='gray.600'   bgGradient='linear(to-r, teal.500, green.500)'
    _hover={{
      bgGradient: 'linear(to-r, red.500, yellow.500)',
    }}>
        <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2,1fr)' gap={6} color='white'>
          <GridItem rowSpan={2} colSpan={1}>
            <Image src='https://images.vexels.com/media/users/3/142887/isolated/preview/fc58c5ffb8c2e33fc3e15a2453189825-logotipo-de-empresa-logistica-en-crecimiento.png' alt='Dan Abramov' width='120px' />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            Nombre del Proyecto
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            $15000.00
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            Descripcion del Proyecto
          </GridItem>
        </Grid>
    </GridItem>
  )
}

function Actividades() {

  return (
    <GridItem rowSpan={1} colSpan={1} h='100%' w='100%'>
      <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2,1fr)' gap={6}>
        <GridItem rowSpan={1} colSpan={1}>
          Actividad
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          $750 P
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <Actividad />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          Estado: No entregado
        </GridItem>
      </Grid>
    </GridItem>
  )
}


function Confirmar() {

  return (
    <GridItem rowSpan={1} colSpan={1} h='100%' w='100%'>
      <Grid templateColumns='repeat(3, 1fr)' templateRows='repeat(2,1fr)' gap={6}>
        <GridItem rowSpan={1} colSpan={1}>
          Actividad
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          $750 P
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <ConfirmarActividad />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          Estado: En Revision
        </GridItem>
      </Grid>
    </GridItem>
  )
}


export default function Home() {

  const proyectosArray = Array.from({ length: 4 }, (_, index) => index + 1);

  let Nombre = "";
  Nombre = "David Páez";

  let Correo = "";
  Correo = "paezdavid@gmail.com";

  let Telefono = 0;
  Telefono = 6641234567;

  return (

    <Grid
      h='800px'
      templateRows='repeat(5, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={4}

      color='white' fontWeight='bold'
    >
      <GridItem rowSpan={1} colSpan={4} bgGradient='linear(to-l, #380036, #0CBABA)' color='white' fontWeight='bold'>
        <Wrap spacing='30px' padding='40px'>
          <WrapItem>
            <Center w='80px' h='80px'>
              <Image src='https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo-180x180.jpg?resize=180%2C180' alt='foto' h='100%' />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w='180px' h='80px'>
              Nombre: {Nombre}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w='240px' h='80px'>
              Correo: {Correo}
            </Center>
          </WrapItem>
          <WrapItem>
            <Center w='180px' h='80px'>
              Telefono: {Telefono}
            </Center>
          </WrapItem>
        </Wrap>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} bgGradient='linear(to-l, #0CBABA ,#380036)' padding='40px'>
        <Center>
          <Configurar />
        </Center>
      </GridItem>
      <GridItem rowSpan={4} colSpan={2} bgGradient='linear(to-l, #5F0A87 ,#A4508B)'>
        <Grid templateRows='repeat(5, 1fr)' gap={6}>
          <Proyectos />
          <Proyectos />
          <Proyectos />
          <GridItem h='80px' w='100%'>
            <Center>
              <CrearProyecto />
            </Center>
          </GridItem>
        </Grid>
      </GridItem >
      <GridItem rowSpan={3} colSpan={3} bgGradient='linear(to-l, #5F0A87 ,#A4508B)' color='white'>
        <Grid
          h='250px'
          w="100%"
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(6, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={2} >
            <Center><Image src='https://images.vexels.com/media/users/3/142887/isolated/preview/fc58c5ffb8c2e33fc3e15a2453189825-logotipo-de-empresa-logistica-en-crecimiento.png' alt='Dan Abramov' h='160px' /></Center>
          </GridItem>
          <GridItem colSpan={2}>
            Nombre: Proyecto1
          </GridItem>
          <GridItem colSpan={2}>
            Financiamiento: $0.00
          </GridItem>
          <GridItem colSpan={4}>
            Descripción del Proyecto:
          </GridItem>
          <GridItem colSpan={6}>
            <Progress colorScheme='green' height='32px' value={80} margin='20px' />
          </GridItem>
        </Grid>
        <Grid templateRows='repeat(3, 1fr)' templateColumns='repeat(2,1fr)' gap={6} padding='20px'>
          <Actividades />
          <Confirmar />
        </Grid>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} bgGradient='linear(to-l, #0CBABA ,#380036)'>
        <ConfigurarProyecto />
        <AgregarActividad />
      </GridItem>
    </Grid >
  )
}