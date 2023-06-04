import React, { useState } from 'react'
import Register from './register'
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap'
import '../styles/authBox.css'
import '../styles/font.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            const response = await axios.post(`${API_URL}/auth/login`, { dni: emailOrDNI, password }, { withCredentials: true });
            if (response.status === 200) {
                router.push('/');
            }
        } catch (error) {
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
            <div className="auth-container">
                <Container className="auth-form-container">
                    <Row>
                        <Col xs={12} md={6}>
                            <h1> Abratoo </h1>
                            <Badge>  Tu estudio de tatuajes de confianza en granada </Badge>
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
                                            isInvalid={passwordError}
                                        />
                                        {passwordError && (
                                            <Form.Control.Feedback type="invalid">Contraseña incorrecta.</Form.Control.Feedback>
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

    )
}

export default Login
