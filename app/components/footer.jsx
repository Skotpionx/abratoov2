'use client'
import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/footer.css'


const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Información Legal</h5>
                        <ListGroup> 
                            <ListGroupItem>
                                <Link href="#legal"> Aviso Legal</Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link href="#privacy"> Política de Privacidad</Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link href="#cookies">Política de Cookies</Link>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <h5>Soul Tattoo</h5>
                        <ListGroup> 
                            <ListGroupItem>
                                Soul Tattoo
                            </ListGroupItem>
                            <ListGroupItem>
                                Teléfono: +34 123 456 789 
                            </ListGroupItem>
                            <ListGroupItem>
                                Dirección: Calle de la Paz, 5, Granada
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <h5>Redes Sociales</h5>
                        <ListGroup> 
                            <ListGroupItem className="footericons">
                                <Link href="https://instagram.com/soultattoogrx"> 
                                <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', width: '20px', height: '20px' }} />soultattoogrx
                                </Link>
                            </ListGroupItem>
                            <ListGroupItem className="footericons">
                                <Link href="https://instagram.com/abratoo"> 
                                <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', width: '20px', height: '20px' }} />Abra_Tattoo
                                </Link>
                            </ListGroupItem>
                            <ListGroupItem className="footericons">
                                <Link href="https://instagram.com/ju4nm1._"> 
                                <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', width: '20px', height: '20px' }} /> ©Skt.
                                </Link>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
