import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';

 const CardReservaSelect = () => {
    return (
      <Container fluid className="p-0">
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={6}>
            <Card className="border-0">
              <div className="position-relative">
                <Image src="/tatoo.jpeg" alt="Tatoo" layout="responsive" width={800} height={600} />
              </div>
              <Card.Body>
                <Card.Title className="text-center">Haz tu reserva</Card.Title>
                <div className="text-center">
                  <Link href="/confirmar-reserva" className="btn btn-primary btn-custom">
                    Confirmar Reserva
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  


export default CardReservaSelect;
