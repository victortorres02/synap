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
    Wrap
} from '@chakra-ui/react'
function CrearProyecto() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Crear Proyecto</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear Proyecto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nombre del Proyecto</FormLabel>
                            <Input ref={initialRef} placeholder='Nombre' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Financiamiento</FormLabel>
                            <Input placeholder='$0.00' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link Imagen</FormLabel>
                            <Input placeholder='Link' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} padding='20px'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function ConfigurarProyecto() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' margin='40px' onClick={onOpen}>Configurar Proyecto</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear Proyecto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nombre del Proyecto</FormLabel>
                            <Input ref={initialRef} placeholder='Nombre' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Financiamiento</FormLabel>
                            <Input placeholder='$0.00' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link Imagen</FormLabel>
                            <Input placeholder='Link' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Guardar
                        </Button>
                        <Button onClick={onClose} padding='20px'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function AgregarActividad() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Agregar Actividad</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Actividad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Actividad</FormLabel>
                            <Input ref={initialRef} placeholder='Actividad' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Porcentaje de Trabajo</FormLabel>
                            <Input placeholder='0%' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} padding='20px'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function Configurar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Configurar</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Configurar los Parametros de tu Cuenta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input ref={initialRef} placeholder='Nombre' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input placeholder='Correo' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Telefóno</FormLabel>
                            <Input placeholder='Telefóno' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


function Actividad() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Actividad</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Entregar Actividad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Descripción</FormLabel>
                            <Input placeholder='Actividad' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function ConfirmarActividad() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Revisar</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmar Actividad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Breve Descripción</FormLabel>
                            <Input placeholder='Actividad' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}



export { CrearProyecto, Configurar, Actividad, ConfirmarActividad, ConfigurarProyecto, AgregarActividad}