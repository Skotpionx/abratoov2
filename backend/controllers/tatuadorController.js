const jwt = require('jsonwebtoken')
const Tatuador = require('../models/tatuadorModel')
const User = require("../models/userModel")

exports.createTatuador = async (req, res) => {
    try {
          const userId = req.params.idUsuario;

        const tatuador = new Tatuador({
            idUsuario: userId,
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

        const tatuador = await Tatuador.findOne({ userId : userIdParam });

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
      if (!updatedTatuador) return res.status(404).json({ error: 'No se ha encontrado el tatuador' });
      res.status(200).json(updatedTatuador);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
  
  exports.deshacerTatuador = async (req, res) => {
    try {
      const idUsuarioDelete = req.params.id;
      // Buscar el tatuador
      const tatuador = await Tatuador.findOne({idUsuario: idUsuarioDelete});

      if (!tatuador) return res.status(404).json({ error: 'No se ha encontrado el tatuador' });
  
      // Actualizar el usuario correspondiente y establecer esTatuador a false
      const user = await User.findByIdAndUpdate(idUsuarioDelete, { esTatuador: false }, { new: true });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Eliminar el tatuador
      await Tatuador.findByIdAndDelete(tatuador._id);
  
      res.status(200).json({ message: 'Ya no eres un artista :( ' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  


  exports.getIdTatuadorByUserIdAll = async (req, res) => {
    try {
      const { access_token } = req.cookies;
      if (!access_token) return res.status(401).json({ message: 'No está autenticado', isAuthenticated: false });
  
      const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: 'No está autenticado', isAuthenticated: false });
      }
      const tatuador = await Tatuador.findOne({ idUsuario: decoded.userId });
  
      if (!tatuador) {
        res.status(404).json({ message: 'No se encontró ningún tatuador con ese user id.' });
        return;
      }
  
      res.status(200).json(tatuador);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  