const mongoose = require('mongoose'); 
const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    dni: {
        type: String,
        required: false
    },
    telefono: String,
    direccion: String,
    imagenes: [String],
    pseudonimo: String,
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);