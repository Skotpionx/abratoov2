import React , { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/recepcion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EstudioCardUno from './estudioCardUno';
import EstudioCardDos from './estudioCardDos';
import EstudioCardTres from './estudioCardTres';

const Recepcion = () => {
    const [showEstudioCardUno, setShowEstudioCardUno] = useState(true);
    const [showEstudioCardDos, setShowEstudioCardDos] = useState(false);
    const [showEstudioCardTres, setShowEstudioCardTres] = useState(false);

    let lastScrollTop = 0;

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPosition = window.pageYOffset; 

        if(currentScrollPosition > 100){
          setShowEstudioCardDos(true);
        }
        else{
          setShowEstudioCardDos(false);
        }
        if( currentScrollPosition > 600){
          setShowEstudioCardTres(true);
        }else{
          setShowEstudioCardTres(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  

    return (
        <Container className="recepcion-container" style={{ minHeight: '80vh' }}>
          <EstudioCardUno show={showEstudioCardUno}/>
          <EstudioCardDos show={showEstudioCardDos}/>
          <EstudioCardTres show={showEstudioCardTres}/>

        </Container>
      );
}

export default Recepcion;
