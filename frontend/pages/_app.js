import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import './demo.css';

import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

const activeChainId = ChainId.SolanaDevnet;

export default function App({ Component, pageProps }) {
    return (
        <>
            <ChakraProvider>
                <ThirdwebProvider desiredChainId={activeChainId}>
                    <Component {...pageProps} />
                </ThirdwebProvider>
            </ChakraProvider>
        </>
    );
}
