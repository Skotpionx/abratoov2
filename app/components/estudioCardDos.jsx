import {  Row, Col } from 'react-bootstrap';
import { useSpring , animated} from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const EstudioCardDos = ( {show }) => {
    const style = useSpring({
        from: { opacity: 0, transform: 'translateX(+50%) translateY(-50%)' },
        to: { 
            opacity: show ? 1 : 0, 
            transform: show ? 'translateX(0%) translateY(0%)' : 'translateX(+50%) translateY(-50%)' 
        },
        config: { duration : 750},
    });

    return (
        <animated.div style={style}>
            <Row className="recepcion-row">
            <Col md={6} className="recepcion-content-col">
            <h1 className="recepcion-heading">Equipo</h1>
            <p className="recepcion-paragraph">
            En nuestro estudio de tatuajes,consideramos que <span className="font-weight-bold"> nuestro equipo es nuestro recurso más valioso.</span> 
            Nos enorgullece contar con un profesional altamente calificado,
            dedicado y apasionado por el arte del tatuaje, aportando su <span className="font-weight-bold"> estilo </span>
            y <span className="font-weight-bold"> técnicas únicas. </span> 
            </p> 
            <p className="recepcion-paragraph">Para nosotros, <span class="font-weight-bold">  la competencia y la profesionalidad son esenciales. </span> 
                Cada miembro de nuestro equipo está <span className="font-weight-bold">comprometido </span>  con su formación continua 
                y el perfeccionamiento de su arte, asegurando que siempre estén al día con
                las últimas tendencias y técnicas en el mundo del tatuaje. 
                Sabemos que un tatuaje es una obra de <span className="font-weight-bold" > arte personal </span>  y duradera, 
                por lo que nos esforzamos por brindarte la <span className="font-weight-bold"> mejor calidad </span> y atención a los 
                detalles.
            </p>
            
            <p className="recepcion-paragraph"> ¡VEN A CONOCERNOS Y DISFRUTA NUESTRA MÚSICA <FontAwesomeIcon icon={faHeadphones}  color="white" style={{width:'50px'}} /></p> 
            
            </Col>
            <Col md={6} className="recepcion-image-col">
            <img
                src="tattooDesign.jpeg"
                alt="Imagen de ejemplo"
                className="img-fluid img-recepcion" 
            />
            </Col>
        </Row>
      </animated.div>
    )
}

export default EstudioCardDos
