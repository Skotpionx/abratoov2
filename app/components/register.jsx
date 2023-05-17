import React , { useState , handleChange , handleSubmit } from 'react'
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import  {createUser}  from "../../backend/controllers/usersControllers.js"


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
        pseudonimo: '',
    });
    
    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };
    var handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createUser(formData);
            console.log("Ha funcionado");
        }catch (e) {
            console.log("No ha funcionado" + e);
        }
    };


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
                        />
                    </div>
                    <Form.Label className="col-md-2">Edad</Form.Label>
                    <div className="col-md-4">
                        <Form.Control
                            type="number"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            required
                        />
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
                    />

                    <Form.Label> DNI </Form.Label>
                    <Form.Control
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        required
                    />

                    <Form.Label> Password </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        rows={3}
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
