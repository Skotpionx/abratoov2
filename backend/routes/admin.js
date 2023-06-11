const express = require('express');
const router = express.Router();
const {  getAllUsers , getUser , updateUser, deleteUser, getUserByDNI, getUserByEmail} = require("../controllers/usersControllers")
const {  deshacerTatuador , updateTatuador} = require("../controllers/tatuadorController")
const { verifyAdmin  } = require("../controllers/sessionControllers")
const { updateUserProfile } = require("../controllers/profileControllers")

router.get('/users',verifyAdmin, getAllUsers);
router.get('/users/:id', verifyAdmin, getUser);
router.get('/users/dni/:dni', getUserByDNI);
router.get('/users/email/:email', getUserByEmail)
router.put('/users/:id', verifyAdmin, updateUser);
router.delete('/users/:id', verifyAdmin, deleteUser);
router.delete('/eliminarTatuador/:id', verifyAdmin, deshacerTatuador);
router.put('/editUser/:userId', verifyAdmin, updateUserProfile);
router.put('/editTatuador/:_id', verifyAdmin, updateTatuador)

module.exports = router;
