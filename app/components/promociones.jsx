import React from 'react';
import { Card, Image, Col, Row } from 'react-bootstrap';
import '../styles/font.css';
import '../styles/promociones.css';

const Promociones = ({ imageUrl, title, description }) => {
  return (
    <Card className="card-container">
      <Card.Body>
        <Row>
          <Col xs={12} md={12} lg={4} >
            <div className="image-container">
              <Image src={imageUrl} alt="Mini Tattoos" fluid />
            </div>
          </Col>
          <Col xs={12} md={12} lg={8} >
            <Card.Title>{title}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{ __html: description }}></Card.Text>          
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Promociones;
