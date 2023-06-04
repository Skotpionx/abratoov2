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
import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import axios from 'axios';
import { useRouter } from 'next/router';


const Header = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: config.gentle,
  });
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const handleLogoutClick = async() => {
        try{
          const response= await axios.post(`${API_URL}/auth/logout`, {withCredentials: true, headers: { 'Custom-Header': 'logout' }} );
          if(response.status === 200){
              console.log(response.data)// Redirigimos a la home para forzar la correcta limpieza de cookies
          }
        }catch (error ){
          console.error(error);
        }
        }

    

  return (
    <div 
      style={{maxHeight: "700px", height:"700px", overflow: "hidden", position: "relative"}} 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <animated.img 
        src="/tattooArtist.jpg" 
        alt="Responsive image" 
        style={{
          cursor: "pointer",
          height: "100%", 
          width: "100%", 
          position: "absolute",
          opacity: opacity.interpolate(o => 1 - o),
          transform,
          backfaceVisibility: 'hidden',
        }} 
      />
      <animated.div 
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateY(180deg)`),
          position: 'absolute',
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backfaceVisibility: 'hidden'
        }}
      >
        <p>Aquí va el componente {'>'} Reserva </p>

    <button  onClick={handleLogoutClick}> Cerrar sesión </button>
      </animated.div>
    </div>
  );
};

export default Header;
