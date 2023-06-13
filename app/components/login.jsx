import React, { useState } from 'react'
import Register from './register'
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap'
import '../styles/authBox.css'
import '../styles/font.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css'

const Login = () => {
    const router = useRouter();
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
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.post(`${API_URL}/auth/login`, { dniOrEmail: emailOrDNI, password }, { withCredentials: true });
            if (response.status === 200) {
                router.push('/');
            }
        } catch (error) {
            if (error.response.status === 404) {
                //No hemos encontrado un usuario con ese Email o DNI
                setDniEmailError(true);
            } else if (error.response.status === 400) {
                // Devolvemos esto si la contraseña es incorrecta
                setPasswordError(true);
            }
        }

        // Restablece los campos de email y contraseña después de enviar el formulario
        setEmailOrDNI('');
        setPassword('');
    };

    return (
            <div className="auth-container">
                <Container className="auth-form-container">
                    <Row>
                        <Col xs={12} md={6}>
                            <h2> Soul Tatoo Grx </h2>
                            <Badge>  Tu estudio de tatuajes de confianza en Granada </Badge>

                            <div className="registerReasons">
                                <h1> ¿Qué ofrecemos? </h1>
                                <Badge>  + 8 años de experiencia </Badge> 
                                <Badge>  + 300 clientes satisfechos</Badge>
                                <Badge>  Precios competitivos</Badge>
                                <h1 style={{ marginBottom: '15%'}}> ¿A  qué esperas? ¿Te nos unes 😜? </h1>
                            </div> 
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
                                            className="inputWhite"
                                            autoComplete="off"
                                            isInvalid={dniEmailError}
                                        />
                                        {dniEmailError && (
                                            <Form.Control.Feedback type="invalid"> Este DNI/Email no es válido o no existe</Form.Control.Feedback>
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
                                            className="inputWhite"
                                            isInvalid={passwordError}
                                        />
                                        {passwordError && (
                                            <Form.Control.Feedback type="invalid">Contraseña incorrecta.</Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                    <div className="buttonContainer">
                                        <Button variant="primary" type="submit" className="loginButton ">
                                            Login
                                        </Button>

                                        <Button variant="secondary" onClick={() => setRegistering(true)} className="registerButton">
                                            ¿Sin cuenta? ¡Regístrate!
                                        </Button>
                                    </div>  
                                    <span className="problema"> ¿Algún problema con tu cuenta? Contáctanos  <a href="mailto:juanmitfg@gmail.com">aquí</a></span>
                                </Form>
                            )}

                        </Col>
                    </Row>
                </Container>

            </div>

    )
}

export default Login
