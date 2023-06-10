const express = require('express');
const router = express.Router();
const { getOwnProfile, updateOwnProfile} = require("../controllers/profileControllers.js")
const { serverVerifyUser , verifyAdmin} = require("../controllers/sessionControllers")
const { createTatuador, getAllTattooArtists , getIdTatuadorByUserIdAll} = require("../controllers/tatuadorController")
const {getAllUsersName} = require("../controllers/usersControllers")

router.get('/profile',serverVerifyUser, getOwnProfile);
router.put('/updateProfile', serverVerifyUser, updateOwnProfile);
router.post('/tatuadores/:idUsuario', verifyAdmin, createTatuador );
router.get('/tatuadores', getAllTattooArtists);
router.get('/usersName', serverVerifyUser, getAllUsersName);
router.get('/getTatuadorInfo', serverVerifyUser, getIdTatuadorByUserIdAll)



module.exports = router;
