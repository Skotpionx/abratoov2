const express = require('express');
const router = express.Router();
const { createUser , getAllUsers , getUser , updateUser, deleteUser, getUserByDNI, getUserByEmail, loginUser} = require("../controllers/usersControllers")
const { verifyAdmin } = require("../controllers/sessionControllers")

router.get('/',verifyAdmin, getAllUsers);
router.post('/', createUser);
router.post('/login', loginUser)
router.get('/:id', getUser);
router.get('/dni/:dni', getUserByDNI);
router.get('/email/:email', getUserByEmail)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;
