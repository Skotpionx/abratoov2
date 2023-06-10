const express = require('express');
const router = express.Router();
const { createUser , loginUser , uploadImage , logoutUser } = require("../controllers/usersControllers")
const { clientVerifyUser, serverVerifyUser} = require("../controllers/sessionControllers")


router.get('/status', clientVerifyUser);
router.post('/register', uploadImage,  createUser);
router.post('/login',  loginUser);
router.post('/logout', serverVerifyUser,  logoutUser);

module.exports = router;
