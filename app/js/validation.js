export const validateForm = (formData) => {
    const { nombre, edad, email, dni, password, password2, telefono } = formData;
    const errors = {};
    


    
        // Validar nombre
        // if (nombre.trim().length < 3) {
        //     errors.nombre = 'El nombre debe tener al menos 3 caracteres';
        // }
        
        nombre.trim().length < 3 ? errors.nombre = 'El nombre debe tener al menos 3 carácteres' : ''

        // Validar edad (mayor a 15)
        edad < 15 ? errors.edad = 'Debes tener más de 15 años para registrate.' : ''
    
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        !emailRegex.test(email) ? errors.email = 'Introduce un email correcto, por favor.' : ''

        // Validar DNI
        const verificarDNICorrecto = (dnie) => {
            const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const numero = parseInt(dni.substr(0, 8), 10);
            const letra = dni.substr(8, 1).toUpperCase();
            const resto = numero % 23;
            const letraCorrecta = letras.charAt(resto);
            
            return letra === letraCorrecta;
        };
        const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/i;
        if (!dniRegex.test(formData.dni) || !verificarDNICorrecto(formData.dni)) {
            errors.dni = 'Introduce un DNI correcto';
        }
        
        // Validar coincidencia de contraseñas
        //Validar que tenga una mayuscula, una minuscula, 1 numero y un caracter raro longitu dminima 8 caracteres 
        password !== password2 ? errors.password2 = 'Las contraseñas no coinciden' : ''
    
        // Validar teléfono (9 o 10 caracteres)
        const telefonoRegex = /^(?:\+34)?[67]\d{8}$/;
        !telefonoRegex.test(telefono) ? errors.telefono = 'El teléfono no es válido' : ''


    return errors;
};