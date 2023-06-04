import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/recepcion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCandyCane } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recepcion = () => {
  const setCookie = () => {
    fetch('/set-cookie', {
      method: 'GET',
    })
      .then(() => {
        alert('Cookie establecida!');
      })
      .catch((error) => {
        console.error('Error al establecer la cookie:', error);
      });
  };

  const removeCookieAndReload = () => {
    fetch('/remove-cookie', {
      method: 'GET',
    })
      .then(() => {
        alert('Cookie eliminada!');
        // Recargar la página para verificar que la cookie se ha eliminado
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar la cookie:', error);
      });
  };

    return (
        <Container className="recepcion-container" style={{ minHeight: '80vh' }}>
          <Row className="recepcion-row">
            <Col md={6} className="recepcion-image-col">
              <img
                src="mostradorTattoo.jpg"
                alt="Imagen de ejemplo"
                className="img-fluid"
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
          <Row className="recepcion-row">
            <Col md={6} className="recepcion-content-col">
              <h1 className="recepcion-heading">Equipo</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper enim ac tincidunt consectetur. Nullam id interdum felis. Suspendisse euismod leo vel eros rhoncus, ut consectetur dui ullamcorper.
              </p>
            </Col>
            <Col md={6} className="recepcion-image-col">
              <img
                src="tattooDesign.jpeg"
                alt="Imagen de ejemplo"
                className="img-fluid"
              />
            </Col>
          </Row>
          <Row className="recepcion-row">
            <Col md={6} className="recepcion-image-col">
              <img
                src="tattooArea.jpg"
                alt="Imagen de ejemplo"
                className="img-fluid"
              />
            </Col>
            <Col md={6} className="recepcion-content-col">
              <h1 className="recepcion-heading">Tattoo Area</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper enim ac tincidunt consectetur. Nullam id interdum felis. Suspendisse euismod leo vel eros rhoncus, ut consectetur dui ullamcorper.
              </p>
            </Col>
          </Row>
        </Container>
      );
}

export default Recepcion;
