const express = require("express");
const secure = require('../middlewares/secure.mid')
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



 router.get('/', post.home);
 router.get('/create', secure.isAuthenticated , post.create);
 router.post('/', secure.isAuthenticated , multer.single('postimage'), post.doCreate);
 router.get('/update', users.update);
 router.get('/search', post.search);

module.exports = router;