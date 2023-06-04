const express = require('express');
const router = express.Router();
const {  getAllUsers , getUser , updateUser, deleteUser, getUserByDNI, getUserByEmail} = require("../controllers/usersControllers")
const { verifyAdmin  } = require("../controllers/sessionControllers")

router.get('/users',verifyAdmin, getAllUsers);
router.get('/users/:id', verifyAdmin, getUser);
router.get('/users/dni/:dni', getUserByDNI);
router.get('/users/email/:email', getUserByEmail)
router.put('/users/:id', verifyAdmin, updateUser);
router.delete('/users/:id', verifyAdmin, deleteUser);



module.exports = router;
