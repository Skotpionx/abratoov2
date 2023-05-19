const express = require('express');
const router = express.Router();
const { createUser , getAllUsers , getUser , updateUser, deleteUser, getUserByDNI, getUserByEmail} = require("../controllers/usersControllers")

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.get('/dni/:dni', getUserByDNI);
router.get('/email/:email', getUserByEmail)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
