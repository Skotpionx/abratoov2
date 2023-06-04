const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  idTatuador: { type: mongoose.Schema.Types.ObjectId, ref: 'Tatuador', required: true },
  timestamp: { type: Date, default: Date.now },
  imagenes: [{ type: String }],
  body: { type: String },
  titulo: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
