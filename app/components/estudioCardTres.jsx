import { Row, Col } from 'react-bootstrap';
import { useSpring , animated} from 'react-spring';


const EstudioCardTres = ( {show } ) => {
    const style = useSpring({
        from: { opacity: 0, transform: 'translateX(-50%) translateY(-50%)' },
        to: { 
            opacity: show ? 1 : 0, 
            transform: show ? 'translateX(0%) translateY(0%)' : 'translateX(-50%) translateY(-50%)' 
        },
        config: { duration : 750},
    });

    return (
        <animated.div style={style}>
            <Row className="recepcion-row">
            <Col md={6} className="recepcion-image-col">
            <img
                src="tattooArea.jpg"
                alt="Imagen de ejemplo"
                className="img-fluid img-recepcion"
            />
            </Col>
            <Col md={6} className="recepcion-content-col">
            <h1 className="recepcion-heading">Tattoo Area</h1>
            <p>
            En nuestra área de tatuajes, la experiencia del cliente es primordial. Hemos creado un espacio que combina confort y funcionalidad, garantizando un ambiente relajado y agradable en el que podrás expresar tu personalidad y creatividad con total libertad.

Nuestro estudio está equipado con las máquinas de tatuajes más avanzadas y fiables del mercado. Nos enorgullece poder ofrecer una experiencia de tatuaje de alta calidad que superará tus expectativas, tanto en términos de ejecución como de seguridad.

Nos importa profundamente la higiene y el cuidado de nuestra área de tatuajes. Para ello, mantenemos el más alto nivel de limpieza y esterilización. Sabemos que un tatuaje es una decisión importante y queremos que te sientas seguro y cómodo durante todo el proceso.

Por último, pero no menos importante, nuestra área de tatuajes es un espacio dedicado al arte y la expresión personal. En ella, nuestros expertos tatuadores trabajan mano a mano con los clientes para dar vida a sus ideas y visiones. Cada tatuaje es una pieza de arte única, y nos satisface enormemente ser parte de esa creación.

¡Te esperamos en nuestra área de tatuajes para comenzar tu viaje artístico personalizado!            </p>
            </Col>
        </Row>
      </animated.div>
    )
}

export default EstudioCardTres
