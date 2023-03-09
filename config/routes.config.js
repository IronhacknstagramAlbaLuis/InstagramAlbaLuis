const express = require("express");
const secure = require('../middlewares/secure.mid')
const router = express.Router();
const post = require('../controllers/posts.controller');
const users = require('../controllers/users.controller');
const Like = require('../models/like.model')
//storage
const multer = require('../config/multer.config');
// const { single } = require("../config/multer.config");

//Register
router.get('/users/sign-in', users.create )
router.post('/feed', users.docreate)

//login
router.get("/login", users.login);
router.post("/login", users.doLogin);



router.get('/', secure.isAuthenticated , post.home);
router.get('/create', secure.isAuthenticated , post.create);
router.post('/', secure.isAuthenticated , multer.single('postimage'), post.doCreate);



router.get('/posts/:id/comments', secure.isAuthenticated , post.comment);
router.post('/posts/:id/comments', secure.isAuthenticated , post.docomment);

router.get('/users/:id', secure.isAuthenticated , users.profile)
router.get('/users/me/edit', secure.isAuthenticated , users.update)
router.post('/users/me/edit', secure.isAuthenticated , multer.single('userimage'), users.doUpdate)
router.get('/posts/:id/detail', secure.isAuthenticated , post.detail)
router.get('/search', secure.isAuthenticated , post.search);
router.post('/like/post/:id', (req, res, next) => {
    const criterial = {};
    criterial.user = req.user.id;
    criterial.post = req.params.id;

    Like
        .find(criterial)
        .then((like) => {
            if (like.length) {
                return Like
                    .deleteOne(like[0]._id)
                    .then(() => {
                        
                    })
            } else {
                return Like
                    .create(criterial)
                    .then(() => {

                    })
            }
        })
        .catch(next)
    console.log("he llegado")
    res.redirect('/')
})

// app.get('/ab?cd', function(req, res) {
//     res.send('ab?cd');
//   });



// router.get('/posts/profile/:id', post.imgprofile);

// router.get('/update', users.update);


module.exports = router;