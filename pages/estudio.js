import React from 'react'
import '../app/styles/estudio.css'
import '../app/styles/font.css'
import NavBar from '../app/components/navBar';
import Footer from '../app/components/footer';
import Recepcion from "../app/components/recepcion"
import Head from 'next/head'

const Estudio = () => {
    return (
        <div className="estudio-container">
            <Head>
            <title> Estudio </title>
            <meta name='description' content='Your Tattoo Shop'/>
            <link rel="icon" href="/favicon.png" />        
            </Head>
            <NavBar/>
            <main className="estudio-main">
                <Recepcion/>
            </main>
            <Footer />
        </div>
    )
}

export default Estudio;