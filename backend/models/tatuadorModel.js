const mongoose = require('mongoose');

const tatuadorSchema = new mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    experiencia: {type: Number},
    ubicacion: { type: String, default: 'Granada'},
},{
    timestamps: true,
    collection: 'tatuadores'
}
)

module.exports = mongoose.model("Tatuador", tatuadorSchema);