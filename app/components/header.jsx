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
import React from 'react';
import '../styles/header.css'
import ReservaContainer from './reservaContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className="divHeader">
            <div className='divTxt'>
                <div>
                    <h1 > Soul Tattoo GRX  </h1>        
                    <span> Desde 2016 tatuando más que tatuajes. Reserva una cita para el tuyo!</span>
                </div> 
                <div className='promociones'>
                    <h5> Conoce ya nuestras magníficas </h5>
                    <h2 className="promociones"> PROMOCIONES
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                    </h2> 
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
                <ReservaContainer> </ReservaContainer>
            </div>
        </div>
    )
}


export default Header;
