import { Grid, GridItem, Input, Textarea, Select } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import React, { useState, useEffect } from "react";
import { Footer } from './footer';
import toast, { Toaster } from "react-hot-toast";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    SendTransactionError,
} from "@solana/web3.js";

const SOLANA_NETWORK = "devnet";

function Formulario() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        offer: '',
        category: 'option1', // Valor predeterminado para la categoría
    });

    const [publicKey, setPublicKey] = useState(null);
    const [balance, setBalance] = useState(0);
    const [receiver, setReceiver] = useState("5kHiGeCXizCGdmaj6pvXFxfsT5KyVZwXRWNCZcpAzDNx");
    const [amount, setAmount] = useState(0);
    const [explorerLink, setExplorerLink] = useState(null);

    useEffect(() => {
        let key = window.localStorage.getItem("publicKey"); //obtiene la publicKey del localStorage
        setPublicKey(key);
        if (key) getBalances(key);
        if (explorerLink) setExplorerLink(null);
    }, []);

    const handleAmountChange = (event) => {
        handleChange(event);
        setAmount(formData.offer);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes hacer lo que quieras con el objeto formData

        let new_project = {
            title: formData.title,
            description: formData.description,
            offer: formData.offer,
            category: formData.category
        };

        setAmount(formData.offer);

        let jsonData = [];

        // Fallback to sessionStorage if localStorage is not supported
        let storageObject = sessionStorage["projects"];

        if (storageObject != null) {
            jsonData = JSON.parse(storageObject);
            sessionStorage.removeItem("projects");
        }

        jsonData.push(new_project);
        console.log(jsonData);

        sessionStorage.setItem("projects", JSON.stringify(jsonData));
    };

    const handleSubmitTransaction = async (e) => {
        handleSubmit(e);
        console.log("Este es el receptor", receiver);
        console.log("Este es el monto", amount);
        sendTransaction();
    };

    const getBalances = async (publicKey) => {
        try {
            const connection = new Connection(
                clusterApiUrl(SOLANA_NETWORK),
                "confirmed"
            );

            const balance = await connection.getBalance(
                new PublicKey(publicKey)
            );

            const balancenew = balance / LAMPORTS_PER_SOL;
            setBalance(balancenew);
        } catch (error) {
            console.error("ERROR GET BALANCE", error);
            toast.error("Something went wrong getting the balance");
        }
    };

    //Funcion para enviar una transaccion
    const sendTransaction = async () => {
        try {
            //Consultar el balance de la wallet
            getBalances(publicKey);
            console.log("Este es el balance", balance);

            //Si el balance es menor al monto a enviar
            if (balance < amount) {
                toast.error("No tienes suficiente balance");
                return;
            }

            const provider = window?.phantom?.solana;
            const connection = new Connection(
                clusterApiUrl(SOLANA_NETWORK),
                "confirmed"
            );

            //Llaves

            const fromPubkey = new PublicKey(publicKey);
            const toPubkey = new PublicKey(receiver);

            //Creamos la transaccion
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey,
                    toPubkey,
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );
            console.log("Esta es la transaccion", transaction);

            //Traemos el ultimo blocke de hash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = fromPubkey;

            //Firmamos la transaccion
            const transactionsignature = await provider.signTransaction(
                transaction
            );

            //Enviamos la transaccion
            const txid = await connection.sendRawTransaction(
                transactionsignature.serialize()
            );
            console.info(`Transaccion con numero de id ${txid} enviada`);

            //Esperamos a que se confirme la transaccion
            const confirmation = await connection.confirmTransaction(txid, {
                commitment: "singleGossip",
            });

            const { slot } = confirmation.value;

            console.info(
                `Transaccion con numero de id ${txid} confirmado en el bloque ${slot}`
            );

            const solanaExplorerLink = `https://explorer.solana.com/tx/${txid}?cluster=${SOLANA_NETWORK}`;
            setExplorerLink(solanaExplorerLink);

            toast.success("Transaccion enviada con exito :D ");

            //Actualizamos el balance
            getBalances(publicKey);
            setAmount(null);
            //setReceiver("5kHiGeCXizCGdmaj6pvXFxfsT5KyVZwXRWNCZcpAzDNx");

            return solanaExplorerLink;
        } catch (error) {
            console.error("ERROR SEND TRANSACTION", error);
            toast.error("Error al enviar la transaccion");
        }
    };

    return (
        <form onSubmit={handleSubmitTransaction}>
            <div>
                <h2>Titulo</h2>
                <Input name='title' placeholder='Titulo' bg='white' value={formData.title} onChange={handleChange} />
                <h2>Descripcion del Proyecto</h2>
                <Textarea name='description' placeholder='Escriba la Descripción' bg='white' h='150px' value={formData.description} onChange={handleAmountChange} />
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
            <Footer />
        </div>
    )
}
