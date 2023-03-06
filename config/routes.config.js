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



router.get('/posts/:id/comments', post.comment);
router.post('/posts/:id/comments', post.docomment);

router.get('/users/:id', users.profile)
router.get('/users/me/edit', users.update)
router.post('/users/me/edit', multer.single('userimage'), users.doUpdate)
router.get('/posts/:id/detail', post.detail)
router.get('/search', post.search);

// app.get('/ab?cd', function(req, res) {
//     res.send('ab?cd');
//   });



// router.get('/posts/profile/:id', post.imgprofile);

// router.get('/update', users.update);


module.exports = router;