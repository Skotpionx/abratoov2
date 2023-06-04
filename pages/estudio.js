import React from 'react'
import '../app/styles/estudio.css'
import '../app/styles/font.css'
import NavBar from '@/app/components/navBar';
import Footer from '@/app/components/footer';
import Recepcion from '@/app/components/Recepcion';


const Estudio = () => {
    return (
        <div className="estudio-container">
            <NavBar/>
            <main className="estudio-main">
                <Recepcion/>
            </main>
            <Footer />
        </div>
    )
}

export default Estudio;