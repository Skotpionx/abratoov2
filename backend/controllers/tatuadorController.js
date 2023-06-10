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


exports.getIdTatuadorByUserId = async( req, res) => {
    try{
        const userIdParam = req.params.userId;

        const tatuador = await Tatuador.findOne({ usuarioId: userIdParam });

        if(!tatuador){
            res.status(404).json({ message: 'No se encontró ningún tatuador con ese user id.'});
            return;
        }
        res.status(200).json(tatuador._id);
    }catch(error){
        res.status(500).json({ error: err });
    }
}

exports.updateTatuador = async (req, res) => {
    const updates = req.body;
    try {
      const updatedTatuador = await Tatuador.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!updatedTatuador) return res.status(404).json({ error: 'Tatuador not found' });
      res.status(200).json(updatedTatuador);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
  
  exports.deshacerTatuador = async (req, res) => {
    try {
      // Buscar el tatuador
      const tatuador = await Tatuador.findById(req.params.id);
      if (!tatuador) return res.status(404).json({ error: 'Tatuador not found' });
  
      // Actualizar el usuario correspondiente y establecer esTatuador a false
      const user = await User.findByIdAndUpdate(tatuador.idUsuario, { esTatuador: false }, { new: true });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Eliminar el tatuador
      await Tatuador.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: 'User is no longer a tattoo artist.' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };