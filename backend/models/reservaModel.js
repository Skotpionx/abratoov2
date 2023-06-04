const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    idTatuador: { type: mongoose.Schema.Types.ObjectId, ref: 'Tatuador', required: true },
    fecha: { type: Date, required: true },
    tipo: { type: String, default: 'Valoración' },
    estadoReserva: { type: String, default: 'Pendiente de Aprobación'}
});

module.exports = mongoose.model('Reserva', reservaSchema);
