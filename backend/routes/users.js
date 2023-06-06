const express = require('express');
const router = express.Router();
const { getOwnProfile, updateOwnProfile} = require("../controllers/profileControllers.js")
const { serverVerifyUser , verifyAdmin} = require("../controllers/sessionControllers")
const { createTatuador } = require("../controllers/tatuadorController")


router.get('/profile',serverVerifyUser, getOwnProfile);
router.put('/updateProfile', serverVerifyUser, updateOwnProfile);
// router.delete('/profile', verifyUser, getUser);
router.post('/tatuadores', verifyAdmin, createTatuador );



module.exports = router;
