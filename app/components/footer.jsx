'use client'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/footer.css'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Información Legal</h5>
                        <ul>
                            <li><a href="#legal">Aviso Legal</a></li>
                            <li><a href="#privacy">Política de Privacidad</a></li>
                            <li><a href="#cookies">Política de Cookies</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Soul Tattoo</h5>
                        <p>
                            Soul Tattoo <br />
                            Teléfono: +34 123 456 789 <br />
                            Dirección: Calle de la Paz, 5, Granada
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Instagram</h5>
                        <ul>
                            <li><a href="https://instagram.com/soultattoogrx"><img src="instagram_icon.png" alt="Instagram" width="20" height="20" /> soultattoogrx</a></li>
                            <li><a href="https://instagram.com/abratoo"><img src="instagram_icon.png" alt="Instagram" width="20" height="20" /> abratoo</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
