const express = require('express');
const router = express.Router();
const { createUser , getAllUsers , getUser , updateUser, deleteUser} = require("../controllers/usersControllers")

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
