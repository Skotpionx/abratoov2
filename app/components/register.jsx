import React , { useState , handleChange , handleSubmit } from 'react'
import { Container, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap'
import { useRouter } from 'next/router';
import { validateForm } from "../js/validation"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/register.css'

const Register = ({ setRegistering }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        email: '',
        telefono: '',
        direccion: '',
        image: null,
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

    const handleImageChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files[0],  
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

            const emailResponse = await axios.get(`${API_URL}/admin/users/email/${formData.email}`);
            if (emailResponse.data.exists) {
                // Usuario con ese EMAIL ya existe, mostrar error
                setErrors({ email: 'Ya existe un usuario con ese EMAIL' });
                return;
            }

            const dniResponse = await axios.get(`${API_URL}/admin/users/dni/${formData.dni}`);
            if (dniResponse.data.exists) {
                // Usuario con ese DNI ya existe, mostrar error
                setErrors({ dni: 'Ya existe un usuario con ese DNI' });
                return;
            }

            const form = new FormData();
            for (const key in formData) {
                form.append(key, formData[key]);
            }

            const response = await axios.post(`${API_URL}/auth/register`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            });

            if( response.status === 201 ){
                const responseLogin = await axios.post(`${API_URL}/auth/login`, { dni: `${formData.dni}`, password: `${formData.password}` }, {withCredentials: true});
                if (responseLogin.status === 200){
                    router.push('/');
                }
            }
        } catch (error) {
            if(error.response && error.response.data){
                return { error: error.response.data };
            }
            else{
                return { error: "Unexpected error"};
            }
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
                            autocomplete="off"
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
                            autocomplete="off"
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
                        autocomplete="off"
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
                        autocomplete="off"
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
                        autocomplete="off"
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
                        autocomplete="off"
                        rows={1}
                    />
                    
                </Form.Group>

                <Form.Group>
                    <Form.Label>Pseudónimo</Form.Label>
                    <Form.Control
                        type="text"
                        name="pseudonimo"
                        autocomplete="off"
                        value={formData.pseudonimo}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label > Imagen de perfil PNG O JPG*</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            required
                            isInvalid={errors.image} 
                        />
                    <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="row mt-4 mb-4" >
                    <div className="col-md-4">
                        <Button variant="primary" type="submit"  className="loginButton">
                            Registrarse
                        </Button>
                    </div>
                    <div className="col-md-8">
                        <Button variant="secondary" onClick={() => setRegistering(false)} className="registerButton">
                        ¿Ya tienes una cuenta? Logeate!
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Register
