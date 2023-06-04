const jwt = require('jsonwebtoken')
const Tatuador = require('../models/tatuadorModel')

exports.createTatuador = async (req, res) => {
    try {
        const { access_token } = req.cookies;
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

        const tatuador = new Tatuador({
            idUsuario: decoded.userId,
            ...req.body
        });

        await tatuador.save();

        res.status(201).json(tatuador)

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};