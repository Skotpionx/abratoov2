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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper enim ac tincidunt consectetur. Nullam id interdum felis. Suspendisse euismod leo vel eros rhoncus, ut consectetur dui ullamcorper.
            </p>
            </Col>
        </Row>
      </animated.div>
    )
}

export default EstudioCardTres
