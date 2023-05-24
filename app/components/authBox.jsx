'use client'
import React, { useState } from 'react'
import Register from './register'
import CardReservaSelect from './cardReseva'
import BoxText from './textBox'
import Footer from './footer'
import axios from 'axios';
import Image from 'next/image'
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap'
import '../styles/authBox.css'
import '../styles/font.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetUsersComponent from './getUsers'



const AuthBox = () => {

    const [isRegistering, setRegistering] = useState(false);
    const [dniEmailError, setDniEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailOrDNI, setEmailOrDNI] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emailOrDNI') {
            setEmailOrDNI(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realiza las acciones de autenticación aquí, utilizando los valores de emailOrDNI y password
        // Puedes realizar una llamada a la API, enviar una solicitud POST, etc.

        // Ejemplo:
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.post(`${API_URL}/auth/login`, { dni: emailOrDNI, password });
            console.log(response);
            // Realiza acciones adicionales después de iniciar sesión exitosamente
        } catch (error) {
            console.error(`No se ha podido iniciar sesión debido al siguiente error: ${error}`);
            // Maneja el error de inicio de sesión
            if (error.response.status === 404) {
                // Usuario no encontrado (DNI/email incorrecto)
                setDniEmailError(true);
            } else if (error.response.status === 400) {
                // Contraseña incorrecta
                setPasswordError(true);
            }
        }

        // Restablece los campos de email y contraseña después de enviar el formulario
        setEmailOrDNI('');
        setPassword('');
    };





    return (
        <div className="parent-container">

            <div className="img-container">
                <Image
                    src="/logotfg.png"
                    className="auth-logo"
                    alt="Vuelta a Home"
                    priority={true}
                    width={150}
                    height={150}
                />
            </div>
            <div className="auth-container">

                <Container className="auth-form-container">
                    <Row>
                        <Col xs={12} md={6}>
                            <h1> Abratoo </h1>
                            <Badge>  Tu estudio de tatuajes de confianza en granada </Badge>
                            <CardReservaSelect />
                        </Col>

                        <Col xs={12} md={6}>
                            {isRegistering ? (
                                <Register setRegistering={setRegistering} />
                            ) : (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email/DNI</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="emailOrDNI"
                                            placeholder="Introduce aquí tu email o DNI"
                                            value={emailOrDNI}
                                            onChange={handleChange}
                                            required
                                            isInvalid={dniEmailError}
                                        />
                                        {dniEmailError && (
                                            <Form.Control.Feedback type="invalid">DNI o Email incorrecto</Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Introduce aquí tu contraseña"
                                            value={password}
                                            onChange={handleChange}
                                            required
                                            isInvalid={passwordError}
                                        />
                                        {passwordError && (
                                            <Form.Control.Feedback type="invalid">Contraseña incorrecta</Form.Control.Feedback>
                                        )}
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
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



            </div>
            <BoxText />
            <Footer />
            <GetUsersComponent/>
        </div>
    )
}

export default AuthBox
