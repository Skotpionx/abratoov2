const express = require('express');
const router = express.Router();
const { serverVerifyUser } = require("../controllers/sessionControllers")
const { createReserva } = require("../controllers/reservaController")


router.post('/createReserva', serverVerifyUser, createReserva);


module.exports = router;
