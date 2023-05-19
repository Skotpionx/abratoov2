import React , { useState , handleChange , handleSubmit } from 'react'
import { Container, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.css'
import { validateForm } from "../js/validation"
import axios from 'axios';

const Register = ({ setRegistering }) => {

    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        email: '',
        telefono: '',
        direccion: '',
        imagenes: [],
        dni: '',
        password: '',
        password2: '',
        pseudonimo: '',
    });



    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
    
        Object.keys(errors).length === 0
        ? submitForm()
        : setErrors(errors);
    };

    const submitForm = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            setErrors({}); // Restablecer los errores a un objeto vacío

            const emailResponse = await axios.get(`${API_URL}/auth/email/${formData.email}`);
            if (emailResponse.data.exists) {
                // Usuario con ese DNI ya existe, mostrar error
                setErrors({ email: 'Ya existe un usuario con ese EMAIL' });
                return;
            }

            const dniResponse = await axios.get(`${API_URL}/auth/dni/${formData.dni}`);
            if (dniResponse.data.exists) {
            // Usuario con ese DNI ya existe, mostrar error
            setErrors({ dni: 'Ya existe un usuario con ese DNI' });
            return;
            }

            const response = await axios.post(`${API_URL}/auth`, formData);
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    


    const [errors, setErrors ] = useState({})

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="row">
                    <Form.Label className="col-md-2">Nombre</Form.Label>
                    <div className="col-md-4">
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            isInvalid={errors.nombre} 

                        />
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                    </div>
                    <Form.Label className="col-md-2">Edad</Form.Label>
                    <div className="col-md-4">
                        <Form.Control
                            type="number"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            required
                            isInvalid={errors.edad} 
                        />
                    <Form.Control.Feedback type="invalid">{errors.edad}</Form.Control.Feedback> 
                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        isInvalid={errors.email} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

                    <Form.Label> DNI </Form.Label>
                    <Form.Control
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                        isInvalid={errors.dni} 
                    />
                        <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>

                    <Form.Label> Password </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Form.Label> Confirmar Password </Form.Label>
                    <Form.Control
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                        isInvalid={errors.password2} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        isInvalid={errors.telefono} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        rows={1}
                    />
                    
                </Form.Group>

                <Form.Group>
                    <Form.Label>Pseudónimo</Form.Label>
                    <Form.Control
                        type="text"
                        name="pseudonimo"
                        value={formData.pseudonimo}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>
            <Button variant="secondary" onClick={() => setRegistering(false)}>
                ¿Ya tienes una cuenta? Logeate!
            </Button>
        </div>
    )
}

export default Register
