const jwt = require('jsonwebtoken')
const Tatuador = require('../models/tatuadorModel')
const User = require("../models/userModel")

exports.createTatuador = async (req, res) => {
    try {
        const { access_token } = req.cookies;
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

        const tatuador = new Tatuador({
            idUsuario: decoded.userId,
            ...req.body
        });

        await tatuador.save();

        res.status(201).json(tatuador)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.getAllTattooArtists = async (req, res) => {
    try {
      // Obtener todos los tatuadores de la base de datos
    const tattooArtists = await Tatuador.find().lean();

      // Obtener información adicional de los usuarios asociados a cada tatuador
    const tattooArtistsWithUserInfo = await Promise.all(
        tattooArtists.map(async (tattooArtist) => {
            const { idUsuario, experiencia } = tattooArtist;
            const user = await User.findById(idUsuario).lean();
            const { _id, pseudonimo, imagenes, nombre } = user;
        return {
            idTatuador: tattooArtist._id,
            idUsuario: _id,
            experiencia,
            pseudonimo,
            nombre,
            imagenes,
        };
        })
    );

      // Devolver la respuesta con los tatuadores y su información adicional de usuario
        res.status(200).json(tattooArtistsWithUserInfo);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.getFreeTimeTattoArtist = async (req ,res ) =>{
    try{
        
    }catch(error){
        res.status(500).json( {error: err});
    }
}