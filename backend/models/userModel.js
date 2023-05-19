const mongoose = require('mongoose'); 
const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dni: {
        type: String,
        required: true,
        unique: true,
    },
    telefono: String,
    direccion: String,
    imagenes: [String],
    pseudonimo: String,
    admin:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);