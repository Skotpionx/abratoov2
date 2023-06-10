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

//Este se usa para obtener las reservas
exports.getReservaByIDTatuador = async (req, res) => {
    try {
        const idTatuador = req.params.idTatuador; 
        const reservas = await Reserva.find({ idTatuador: idTatuador }, 'fecha');
        
        res.json(reservas);
    } catch(error) {
        res.status(500).json( {message: 'Error interno del servidor.', error: error})
    }
}

exports.getReservaByIDTatuadorCompleta = async (req, res) => {
  try {
    const idTatuador = req.params.idTatuador; 
    const currentDate = new Date();
    const reservas = await Reserva.find({ 
      idTatuador: idTatuador,
      fecha: { $gt: currentDate } // Las pasadas no.
    })
    .sort({ fecha: 1 }); // Ordenar por fecha de más antigua a más nueva
      
      res.json(reservas);
  } catch(error) {
      res.status(500).json( {message: 'Error interno del servidor.', error: error})
  }
}

//Este lo usamos para devolver un next y se usa de middleware
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


exports.getReservaByUser = async (req , res) =>{
  try{
    //Nos saltamos la verificación de access_token debido a que lo valida serververifyuser.
    const { access_token } = req.cookies;
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

    const { userId } =  decoded;

    const reservasPorUser = await Reserva.find( { idUsuario: userId }).sort({ fecha: -1}).select('estadoReserva fecha idTatuador tipo');

    res.status(200).json( reservasPorUser)
  }catch(error){
    res.status(500).json( { message: 'Error interno del servidor', error: error})
  }
}

exports.MoveReserva = async (req , res ) => {
  try{
    const updateReserva = await Reserva.updateOne(
      { _id: req.params.idReserva },
      { $set: { estadoReserva: req.body.estado } }
    );

    // Verifica si la actualización fue exitosa
    if (updateReserva.nModified == 0) {
      res.status(400).json({ message: 'No se pudo actualizar la reserva' });
    } else {
      res.status(200).json({ message: 'Reserva actualizada exitosamente' });
    }

  } catch(error) {
    res.status(500).json( { message: 'Error interno del servidor', error: error });
  }
}

exports.editReserva = async (req, res) => {
  try {
    // Obtener el ID de la reserva desde el parámetro de la URL
    const idReserva = req.params.idReserva;

    // Obtener los campos actualizados desde el cuerpo de la solicitud
    const updatedFields = req.body;

    // Buscar la reserva en la base de datos por su ID
    let reserva = await Reserva.findById(idReserva);

    // Si la reserva no se encuentra, devolver un error
    if (!reserva) {
      return res.status(404).json({ message: 'No se encontró la reserva.' });
    }

    // Actualizar los campos de la reserva con los valores proporcionados
    for (let field in updatedFields) {
      reserva[field] = updatedFields[field];
    }

    // Guardar la reserva actualizada en la base de datos
    await reserva.save();

    // Devolver una respuesta exitosa
    res.status(200).json({ message: 'Reserva actualizada con éxito.' });
  } catch (error) {
    // Si ocurre algún error, devolver una respuesta de error
    res.status(500).json({ message: 'Error interno del servidor', error: error });
  }
};