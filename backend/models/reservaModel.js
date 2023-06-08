const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    idTatuador: { type: mongoose.Schema.Types.ObjectId, ref: 'Tatuador', required: true },
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    fecha: { type: Date, required: true },
    tipo: { type: String,  required: true },
    estadoReserva: { type: String, default: 'Pendiente de Aprobación'},
    
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
