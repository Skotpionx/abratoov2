import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCandyCane } from '@fortawesome/free-solid-svg-icons';
import { useSpring , animated} from 'react-spring';


const EstudioCardUno = ( {show} ) => {

    const style = useSpring({
        from: { opacity: 0, transform: 'scale(0)'},
        to: { opacity: show ? 1 : 0 , transform: show ? 'scale(1)' : 'scale(0)'},
        config: { duration : 500},
    })
    return (
        <animated.div style={style}> 
            <Row className="recepcion-row">
            <Col md={6} className="recepcion-image-col">
            <img
                src="mostradorTattoo.jpg"
                alt="Imagen de ejemplo"
                className="img-fluid img-recepcion"
            />
            </Col>
            <Col md={6} className="recepcion-content-col">
                <h1 className="recepcion-heading">Recepción</h1>
                
                <p className="recepcion-paragraph"> 
                    En nuestro estudio de tatuajes, la acogida que damos a nuestros clientes es fundamental. 
                    Nos enorgullece ofrecer una <span className="font-weight-bold" > atención personalizada </span>, entendiendo y respetando las ideas únicas de cada persona que entra por nuestra puerta.
                </p>

                <p className="recepcion-paragraph">
                    Para nosotros, la transparencia es esencial. 
                    Por ello, proporcionamos  <span className="font-weight-bold" > presupuestos sin compromiso </span>, permitiéndote conocer de antemano el costo de tu idea sin sentirte presionado a tomar una decisión inmediata.
                    Sabemos que un tatuaje es una decisión importante, por lo que, <span className="font-weight-bold" > tómate el tiempo necesario</span>  para sentirte completamente seguro y cómodo.
                </p>
                <h1 className='recepcion-heading'> Y TENEMOS CARAMELOS GRATIS!! <FontAwesomeIcon icon={faCandyCane}  color="red" style={{width:'50px'}} /></h1>
            </Col>
            </Row>
        </animated.div>
    )
}

export default EstudioCardUno
