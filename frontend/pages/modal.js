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
    Textarea
} from '@chakra-ui/react'

export default function Entregar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Entregar Proyecto</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Entregar Proyecto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Link del Repositorio</FormLabel>
                            <Input ref={initialRef} placeholder='Repositorio' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Subir
                        </Button>
                        <Button onClick={onClose} padding='20px'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function Verificar() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' size='lg' padding='40px' onClick={onOpen}>Verificar Proyecto</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verificar Proyecto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Link del Repositorio</FormLabel>
                            <Input ref={initialRef} placeholder='Repositorio' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Validar
                        </Button>
                        <Problema />
                        <Button onClick={onClose} padding='20px'>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function Problema() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    return (
        <>
            <Button colorScheme='green' onClick={onOpen}>Rechazar Proyecto</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verificar Proyecto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Escriba el Problema</FormLabel>
                            <Textarea placeholder='Escriba la Descripción del Problema' bg='white' h='150px' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Rechazar
                        </Button>
                        <Button onClick={onClose} padding='20px'>Regresar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export { Entregar, Verificar}