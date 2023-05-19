'use client'
import React, { useState, useEffect } from 'react'
import Register from './register'
import { Container, Row, Col, Form, Button, Badge} from 'react-bootstrap'
import Image from 'next/image'
import '../styles/authBox.css'
import '../styles/font.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardReservaSelect from './cardReseva'
import BoxText from './textBox'

const AuthBox = () => {

    const [isRegistering, setRegistering] = useState(false);
    return ( 
        <div className="auth-container">
            <Image 
            src="/logotfg.png" 
            className="auth-logo" 
            alt="Vuelta a Home" 
            priority={true}
            width={150} 
            height={150}
            />



            <Container className="auth-form-container">
                <Row>
                    <Col xs={12} md={6}>
                        <h1> Abratoo </h1>
                        <Badge>  Tu estudio de tatuajes de confianza en granada </Badge>
                        <CardReservaSelect/>
                        {/* TO DO : OBTENER IMAGENES DE LA API (MONGODB) Y MOSTRARLAS EN CARRUSEL?*/}
                    </Col>

                    <Col xs={12} md={6}> 
                    { isRegistering ? (
                        <Register setRegistering={setRegistering}/>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label> 
                                    Email: 
                                    {/* TO DO PONER UN ICONO DE EMAIL? */}
                                </Form.Label>
                                {/* Comprobar si tiene una regexp que valide el mail */}
                                <Form.Control type="email" placeholder="Introduce aquí tu email 😜"/> 
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> 
                                    Password
                                </Form.Label>
                                {/* Comprobar si tiene una regexp que valide nada XD? */}
                                <Form.Control type="password" placeholder="Introduce aquí tu contraseña"/> 
                            </Form.Group>

                                {/* Quiza es mejor un onclick ? 100% */}
                            <Button variant="primary" type="submit" >
                                Login 
                            </Button>

                            <Button variant="secondary" onClick={() => setRegistering(true)}>
                                ¿Sin cuenta? Regístrate!
                            </Button>
                        </Form>
                    )}

                    </Col>
                </Row>
            </Container>
            { <BoxText  /> }
        </div> 
    )
}

export default AuthBox
