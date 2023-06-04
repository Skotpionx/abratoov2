const express = require('express');
const router = express.Router();
const { createUser , loginUser , uploadImage , logoutUser } = require("../controllers/usersControllers")
const { isLogged  , verifyUser, clientVerifyUser, serverVerifyUser} = require("../controllers/sessionControllers")


router.get('/status', clientVerifyUser);
router.post('/register', uploadImage,  createUser);
router.post('/login',  loginUser);
router.post('/logout', logoutUser);

module.exports = router;