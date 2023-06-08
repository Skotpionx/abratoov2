
'use client'
import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import ReservaContainer from './reservaContainer';
import Promociones from './promociones.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'


const Header = () => {
    const [showPromociones, setShowPromociones] = useState(false);

    const promociones = [
        {
            imageUrl: "/daliArtista.jpg",
            title: "DIA DEL ARTISTA",
            description: "Por un tatuaje de algún personaje histórico, un tatuaje de 5x5 <span class='colorText'>GRATIS</span>!"
        },
        {
            imageUrl: "/tattooArtist.jfif",
            title: "MINI TATOOS 2X1",
            description: "2x1 hasta el día 30(junio), 30$ por los dos. ¡Reserva ya!"
        },
        {
            imageUrl: "/tattooDesign.jpeg",
            title: "PUERTAS ABIERTAS",
            description: "Aprovecha para preguntar todos los secretos a nuestros artistas!"
        }
    ];
    let lastScrollTop = 0;
    useEffect(() => {
        const handleScroll = () => {
          let st = window.pageYOffset || document.documentElement.scrollTop;
          if (st > lastScrollTop){
            setShowPromociones(true);
          } else {
            if (st === 0) { // Si hemos llegado a la parte superior de la página
              setShowPromociones(false);
            }
          }
          lastScrollTop = st <= 0 ? 0 : st; // Para móviles o negativos
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

    const transitions = useTransition(showPromociones, {
        from: { opacity: 0, transform: 'translateY(-20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-20px)' },
        config: { duration: 500 },
    });

    return (
        <div className="divHeader">
            <div className='divTxt'>
                <div>
                    <h1 > Soul Tattoo GRX  </h1>
                    <span> Desde 2016 tatuando más que tatuajes. Reserva una cita para el tuyo!</span>
                </div>
                <div className='promocionesContainer'>
                    <h5>¿Aún no conoces nuestras magníficas </h5>
                    <h2
                        className="promociones"
                        onClick={() => setShowPromociones(prev => !prev)}
                    > PROMOCIONES?
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </h2>
                    {transitions((style, item) => item && (
                        <animated.div style={style}>
                            {promociones.map((promocion, index) => (
                                <Promociones
                                    key={index}
                                    imageUrl={promocion.imageUrl}
                                    title={promocion.title}
                                    description={promocion.description}
                                />
                            ))}
                        </animated.div>
                    ))}
                </div>
            </div>
            <div className="neonLineContainer">
                <div className="neonLineTop"></div>
                <div className="neonContainer">
                    <FontAwesomeIcon icon={faClock} className='neon' />

                </div>
                <div className="neonIcon">
                </div>
                <div className="neonLineBottom"></div>
            </div>
            <div className='reservaContainer'>
                <ReservaContainer />
            </div>
        </div>
    )
}


export default Header;
