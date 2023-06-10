const express = require('express');
const router = express.Router();
const { serverVerifyUser, verifyTatuador } = require("../controllers/sessionControllers")
const { createReserva , editReserva ,getReservaByIDTatuador , getReservaByIDTatuadorAndDate , getReservaByUser, getReservaByIDTatuadorCompleta, MoveReserva} = require("../controllers/reservaController")
const { getIdTatuadorByUserId } = require("../controllers/tatuadorController")

router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);
//Delete
// router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);
//Update
// router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);
//GetAll
// router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);
//GetOne
// router.post('/createReserva', serverVerifyUser,getReservaByIDTatuadorAndDate, createReserva);
//GetAllByOwnUser
router.get('/obtenerReservaPorUsuario/:idUsuario', serverVerifyUser, getReservaByUser);

//GetAllByTatuador > esta se usa para coger las horas de las reservas (solo fecha) para no poner dos reservas en la misma hora
router.get('/getReserva/:idTatuador', getReservaByIDTatuador);

//Esta la usamos para mostrarle las cards a los tatuadores, pore so mostramos que seas un tatuador. 
router.get('/getReservas/:idTatuador', verifyTatuador, getReservaByIDTatuadorCompleta ) 

router.get('/getIDTatuador/:idUsuario', verifyTatuador, getIdTatuadorByUserId)

router.put('/moverReserva/:idReserva', verifyTatuador, MoveReserva);

router.put('/moverReservaCancelada/:idReserva', serverVerifyUser, MoveReserva);





router.put('/editReserva/:idReserva', verifyTatuador, editReserva);
module.exports = router;
