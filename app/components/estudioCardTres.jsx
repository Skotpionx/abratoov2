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
            <p className="recepcion-paragraph">
                En nuestra área de tatuajes, <span className="font-weight-bold"> tu experiencia es primordial. </span>   
                Hemos creado un espacio que combina <span className="font-weight-bold"> confort y funcionalidad, </span>   garantizando un
                ambiente relajado y agradable.
            </p>
            <p className="recepcion-paragraph">
                Nos enorgullece poder ofrecer una experiencia de <span className="font-weight-bold"> tatuaje de alta calidad  </span> 
            </p> 

            <p className="recepcion-paragraph"> 
                Nos importa profundamente la higiene y el cuidado de nuestra área de tatuajes.
                Para ello, mantenemos un alto nivel de limpieza. 
                Sabemos que un tatuaje es una decisión importante y <span className="font-weight-bold"> queremos que te sientas 
                seguro y cómodo </span> durante todo el proceso.
            </p>


            <p className="recepcion-paragraph"> 
                Nuestra área de tatuajes es un
                <span className="font-weight-bold"> espacio dedicado al arte </span> y la expresión personal.
                <span className="font-weight-bold"> Cada tatuaje es único, </span>  y nos satisface enormemente
                ser parte de esa creación.
            </p> 
            </Col>
        </Row>
      </animated.div>
    )
}

export default EstudioCardTres
