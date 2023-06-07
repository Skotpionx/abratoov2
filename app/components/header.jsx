// 'use client'
// import React, { useState } from 'react';
// import { useSpring, animated, config } from 'react-spring';
// import { Container, Row, Col } from 'react-bootstrap';

// const Header = () => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const { transform, opacity } = useSpring({
//     opacity: isFlipped ? 1 : 0,
//     transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
//     config: config.gentle,
//   });

//   const handleHeaderClick = () => setIsFlipped(!isFlipped);

//   return (
//     <header onClick={handleHeaderClick}>
//       <Container fluid className="h-100">
//         <Row className="h-100">
//           <Col className="h-100 position-relative overflow-hidden">
//             <animated.div
//               style={{
//                 opacity: opacity.interpolate(o => 1 - o),
//                 transform,
//                 backfaceVisibility: 'hidden',
//                 position: 'absolute',
//                 width: '100%',
//                 height: '100%'
//               }}
//             >
//               <img
//                 src="/tattooArtist.jpg"
//                 alt="Tattoo Artist"
//                 style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//               />
//             </animated.div>
//             <animated.div
//               style={{
//                 opacity,
//                 transform: transform.interpolate(t => `${t} rotateY(180deg)`),
//                 position: 'absolute',
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backfaceVisibility: 'hidden'
//               }}
//             >
//               <p>Test</p>
//             </animated.div>
//           </Col>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Header;
'use client'
import React, { useState } from 'react';
import { useTransition, animated} from 'react-spring';
import ReservaContainer from './reservaContainer';
import Promociones from './promociones.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import '../styles/header.css'


const Header = () => {
    const [showPromociones, setShowPromociones] = useState(false);

    const promociones = [
        {
            imageUrl: "/daliArtista.jfif",
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
                    onClick={ () => setShowPromociones( prev=> !prev)}
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
                <FontAwesomeIcon icon={faClock} className='neon'/>

                </div>
                <div className="neonIcon">
                </div>
                <div className="neonLineBottom"></div>
            </div>
            <div className='reservaContainer'>
                <ReservaContainer/> 
            </div>
        </div>
    )
}


export default Header;
