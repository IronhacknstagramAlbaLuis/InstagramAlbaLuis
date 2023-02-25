const express = require("express");
const router = express.Router();
const post = require('../controllers/posts.controller');
const users = require('../controllers/users.controller');

//storage
const multer = require('../config/multer.config');
// const { single } = require("../config/multer.config");

//Register
router.get('/users/sign-in', users.create )
router.post('/feed', users.docreate)

//login
router.get("/login", users.login);
router.post("/login", users.doLogin);


//post

 router.get('/', post.home);
 router.get('/create', post.create);
 router.post('/', multer.single('postimage'), post.doCreate);


module.exports = router;