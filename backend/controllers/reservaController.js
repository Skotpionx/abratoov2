const jwt = require('jsonwebtoken');
const Reserva = require('../models/reservaModel');

exports.createReserva = async (req , res) =>{
    try{
        //Nos saltamos verificaciones ya que tenemos el middleware de seververifyuser.
        const { access_token } = req.cookies;

        const { idTatuador, fecha, tipo } = req.body;

        if (!(idTatuador && fecha && tipo)) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

        const nuevaReserva = new Reserva({
            idTatuador,
            idUsuario: decoded.userId,
            fecha,
            tipo,
        });
        await nuevaReserva.save();

        res.status(201).json(nuevaReserva);
        }catch(error){
            res.status(500).json({ message: 'Error interno del servidor.', error: error})
        }
}

exports.getReservaByIDTatuador = async (req, res) => {
    try {
        const idTatuador = req.params.idTatuador; 
        const reservas = await Reserva.find({ idTatuador: idTatuador }, 'fecha');
        
        res.json(reservas);
    } catch(error) {
        res.status(500).json( {message: 'Error interno del servidor.', error: error})
    }
}

exports.getReservaByIDTatuadorAndDate = async (req, res, next) => {
    try {
        const { idTatuador, fecha } = req.body;
      const reserva = await Reserva.findOne({ idTatuador: idTatuador, fecha: fecha });
      if (!reserva) {
        next();
      } else {
        // Si ya existe una reserva, respondemos con un error
        res.status(400).json({ message: 'Este tatuador ya tiene reservada esa hora. Por favor recargue la página.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor.', error: error })
    }
  };