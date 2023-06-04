const express = require('express');
const router = express.Router();
const { isLogged  } = require("../controllers/sessionControllers")
const { createPost, editPost, deletePost, getPost, getPosts} = require("../controllers/postControllers.js")


// router.get('/post', isLogged,isLogged );
// router.get('/posts', isLogged,getPosts );
// router.post('/post', isLogged, isLogged);
// router.put('/post', isLogged, isLogged);
// router.delete('/post', isLogged, isLogged);

module.exports = router;
