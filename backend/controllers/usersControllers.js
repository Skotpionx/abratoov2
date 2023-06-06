const bcrypt = require('bcryptjs');
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'eu-west-3' 
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'imagenestfg',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const timestamp = new Date().getTime();
      const key = `${timestamp}_${file.originalname}`;
      cb(null, key)
    }
  })
})

exports.uploadImage = upload.single('image');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    const usersWithoutPassword = users.map(({ password, ...otherFields }) => otherFields);
    res.status(200).json(usersWithoutPassword);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};



exports.getUserByDNI = async (req, res) => {
  try {
    const { dni } = req.params;
    const user = await User.findOne({ dni });

    if (user) {
      // Ya existe un usuario con ese DNI
      return res.status(200).json({ exists: true });
    }

    // No se encontró ningún usuario con ese DNI
    res.status(200).json({ exists: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error interno del servidor' }, err);
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      // Ya existe un usuario con ese email
      return res.status(200).json({ exists: true });
    }

    // No se encontró ningún usuario con ese email
    res.status(200).json({ exists: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error interno del servidor' }, err);
  }
};


exports.createUser = async (req, res) => {
  try {

    // Verificar si ya existe un usuario con el mismo email // SE HACE EN EL CLIENTE TAMBIÉN
    const { email, dni } = req.body;

    // Verificar si ya existe un usuario con el mismo email o DNI
    const existingUser = await User.findOne({ $or: [{ email }, { dni }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese EMAIL o DNI' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword , imagenes: req.file.location});
    const savedUser = await newUser.save();

    //Protección CSRF y Clickjacking
    res.setHeader('Set-Cookie', 'SameSite=Lax; HttpOnly; Secure');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


exports.loginUser = async (req, res) => {
  try{
    
    const { dniOrEmail, password } = req.body;
    let query = (dniOrEmail === undefined) ? { dni: req.body.dni } : (dniOrEmail.includes('@') ? { email: dniOrEmail } : { dni: dniOrEmail });

    // Buscamos el usuario por DNI o EMAIL para verificar su existencia
    const user = await User.findOne(query);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    //Comprobamos las contraseñas
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).json( { message: 'Contraseña incorrecta'});
    }

    const token = jwt.sign({ userId: user._id , admin: user.admin}, process.env.JWT_SECRET)

    //Establecemos la cookie con la que vamos a controlar la sesión.
    return res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 3600000, //Una hora  // NAVEGADOR NO LA MUESTRA POR DEFECTO (EN PRODUCCIÓN) (pero si la almacena)
      secure: true,  
      sameSite: 'None',  
      path: '/',
    })
    .status(200)
    .json({ 
      userId: user._id, 
      username: user._username, 
      message: 'Inicio de sesión exitoso'})

  }catch (error){
    return res.status(500).json({ message: 'Error interno del servidor.', error: error})
  }
}

exports.logoutUser = (req, res) =>{
  try{
    res.clearCookie("access_token", { 
      httpOnly: true,
      maxAge: 0, //La terminamos en el momento del logout, EN EL NAVEGEADOR POR DEFECTO NO SALE (EN PRODUCCION)
      secure: true,  
      sameSite: 'None',  
      path: '/',
    })
    res.setHeader('Cache-Control', 'no-store');// IMPORTANTE ESTO, SI NO , NO SE BORRA LA COOKIE :( (4 horas para encontrar el error 😭))
    
    res.status(200).json( {message: 'Logout exitoso'})
    res.end();

  }catch (error ){
    res.status(500).json({ message: "Ha ocurrido un error mientras te deslogeabas." });
  }
}