const express = require("express");

const router = express.Router();
const post = require('../controllers/posts.controller');
const users = require('../controllers/users.controller');


//Registro
router.get('/users/sing-in', users.create )
router.post('/feed', users.docreate)

//login




// router.get('/', post.home)


module.exports = router;