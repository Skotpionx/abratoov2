const express = require('express');
const router = express.Router();
const { serverVerifyUser } = require("../controllers/sessionControllers")
const { createReserva , getReservaByIDTatuador , getReservaByIDTatuadorAndDate} = require("../controllers/reservaController")


router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);
router.get('/getReserva/:idTatuador', getReservaByIDTatuador);

module.exports = router;
