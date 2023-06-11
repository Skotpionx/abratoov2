import React from 'react'
import '../app/styles/estudio.css'
import '../app/styles/font.css'
import NavBar from '../app/components/navBar';
import Footer from '../app/components/footer';
import Recepcion from "../app/components/recepcion"
import Head from 'next/head'
import Tatuajes from '@/app/components/tatuajes';

const Estudio = () => {
    return (
        <div className="estudio-container">
            <Head>
            <title> Tatuajes </title>
            <meta name='description' content='Your Tattoo Shop'/>
            <link rel="icon" href="/favicon.png" />        
            </Head>
            <NavBar/>
            <main className="estudio-main" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', backgroundColor: 'black' , minHeight: '90vh'}}>
                <Tatuajes/>
            </main>
            <Footer />
        </div>
    )
}

export default Estudio;