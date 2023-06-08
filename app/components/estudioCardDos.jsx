import {  Row, Col } from 'react-bootstrap';
import { useSpring , animated} from 'react-spring';

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
            <p>
            En nuestro estudio de tatuajes, consideramos que nuestro equipo es nuestro recurso más valioso. Nos enorgullece contar con un grupo de profesionales altamente calificados, dedicados y apasionados por el arte del tatuaje, cada uno aportando su estilo y técnicas únicas.

</p> <p>Para nosotros, la competencia y la profesionalidad son esenciales. Cada miembro de nuestro equipo está comprometido con su formación continua y el perfeccionamiento de su arte, asegurando que siempre estén al día con las últimas tendencias y técnicas en el mundo del tatuaje. Sabemos que un tatuaje es una obra de arte personal y duradera, por lo que nos esforzamos por brindarte la mejor calidad y atención a los detalles.
 </p>

<p> Y no sólo eso, también sabemos cómo mantener un ambiente amigable y relajado. Nuestro equipo no sólo son excelentes artistas, sino también personas fantásticas, siempre dispuestas a conversar, reír y hacer que te sientas como en casa.
 </p> 
<p> ¡VEN A CONOCERNOS Y DESCUBRE NUESTRO INCREÍBLE EQUIPO!</p> 
            
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
