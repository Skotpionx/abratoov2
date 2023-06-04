const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    idPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    contenido: { type: String },
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
