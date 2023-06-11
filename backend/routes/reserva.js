const express = require('express');
const router = express.Router();
const { serverVerifyUser, verifyAdmin , verifyTatuador } = require("../controllers/sessionControllers")
const { createReserva , editReserva ,getReservaByIDTatuador , getReservaByIDTatuadorAndDate , getReservaByUser, getReservaByIDTatuadorCompleta, MoveReserva , getAllReservas} = require("../controllers/reservaController")
const { getIdTatuadorByUserId } = require("../controllers/tatuadorController")

router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);

//GetAll
router.get('/getAllReservas', verifyAdmin, getAllReservas);

//GetAllByOwnUser
router.get('/obtenerReservaPorUsuario/:idUsuario', serverVerifyUser, getReservaByUser);

//GetAllByTatuador > esta se usa para coger las horas de las reservas (solo fecha) para no poner dos reservas en la misma hora
router.get('/getReserva/:idTatuador', getReservaByIDTatuador);

//Esta la usamos para mostrarle las cards a los tatuadores, por eso mostramos que seas un tatuador. 
router.get('/getReservas/:idTatuador', verifyTatuador, getReservaByIDTatuadorCompleta ) 

//Obtener la reserva entera por un tatuador dada su id de usuario
router.get('/getIDTatuador/:idUsuario', verifyTatuador, getIdTatuadorByUserId)
//Mover por un tatuador 
router.put('/moverReserva/:idReserva', verifyTatuador, MoveReserva);
//Mover por un usuario a cancelada
router.put('/moverReservaCancelada/:idReserva', serverVerifyUser, MoveReserva);
//Editarla por un administrador 
router.put('/editAdminReserva/:_id', verifyAdmin, editReserva);
//Editarla por un usuario
router.put('/editReserva/:idReserva', verifyTatuador, editReserva);
module.exports = router;
