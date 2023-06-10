const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getOwnProfile = async (req, res) => {
    try {
        // Extraemos el token de la cookie
        const token = req.cookies.access_token;

        // Decodificamos el token para obtener el userId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Buscamos el usuario por id
        const user = await User.findOne({ _id: decodedToken.userId })
            .select('nombre edad email dni telefono direccion pseudonimo imagenes esTatuador admin');

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolvemos la información del usuario
        return res.status(200).json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

exports.updateOwnProfile = async (req ,res ) => {
    try{
        //No hacemos comprobación de si viene el access_token ya que precedida a esta función está isLogged que ya hace esto.
        //Extraemos el id del token
        const token = req.cookies.access_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        //Buscamos el usuario por la id que recibimos de parámetro
        let user = await User.findOne({ _id: decodedToken.userId});

        //Nunca deberia pasar esto, pero por controlar errores (nunca digas nunca)
        if(!user){
            return res.status(404).json( { message: 'Este usuario no consta en nuestra base de datos'})
        }

        //Establecemos qué campos permitimos que se actualicen
        const updatableFields = ['nombre','pseudonimo','edad','direccion','telefono','email']

        //Si vienen los campos de contraseña debemos comprobar que vienen los dos
        if( req.body.passwordActual && req.body.passwordNueva){
            const match = await bcrypt.compare( req.body.passwordActual, user.password)
            if(match){
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = await bcrypt.hash(req.body.passwordNueva, salt)
                user.password = hashedPassword;
            }
            else{
                return res.status(403).json( { message: 'La contraseña actual no coincide con la almacenada en la base de datos'})
            }
        }

        //Actualizamos los campos de updatableFields
        for(let field of updatableFields){
            if(req.body[field]){
                user[field] = req.body[field]
            }
        }

        user = await user.save();

        let userObject = user.toObject();
        delete userObject.password;
        return res.status(200).json(userObject)
        
    }catch ( error ){
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor'});
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.nombre = updatedData.nombre || user.nombre;
      user.pseudonimo = updatedData.pseudonimo || user.pseudonimo;
      user.direccion = updatedData.direccion || user.direccion;
      user.dni = updatedData.dni || user.dni;
      user.edad = updatedData.edad || user.edad;
      user.email = updatedData.email || user.email;
      user.telefono = updatedData.telefono || user.telefono;
  
      const updatedUser = await user.save();
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  