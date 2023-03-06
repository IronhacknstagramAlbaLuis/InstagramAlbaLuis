const Post = require("../models/post.model")
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const Like = require('../models/like.model')
const mongoose = require("mongoose");




module.exports.home = (req, res, next) => {
  const criteria = {};

  if (req.query.author) {
    criteria.user = req.query.author;
  }
  if (req.query.search) {
    criteria.imgpost = new RegExp(req.query.search);
    criteria.descriptionpost = new RegExp(req.query.search);
  }

  Post.find(criteria)
    .populate("author")
    .populate({
      path: 'comments',
      populate: {
        path: 'author'
      }
    })
    .sort({ createdAt: req.query.sort || "desc" })
    //.then((posts) => res.render("posts/list", { posts, query: req.query }))
    .then((posts) => res.render("home", { posts, query: req.query, user: req.user }))
    .catch(next);
}


module.exports.create = ( req, res, next) =>{
    res.render("posts/create");
}


module.exports.doCreate = (req, res, next) => {
    if (req.file) {
        req.body.postimage = req.file.path;
      }
     req.body.author = req.user.id;
      Post.create(req.body)
        .then(() => res.redirect("/"))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            res.render("posts/create", { errors: err.errors, post: req.body });
          } else {
            next(err);
          }
        });
    };

module.exports.comment = (req, res, next) => {
  res.render('posts/comments', { id: req.params.id })
}

module.exports.docomment = (req, res, next) =>{
  // create comment wirh:^
  // author: req.user._id
  // post: req.params.id
  // text: req.body.description

  Comment.create({
    author: req.user._id,
    post: req.params.id,
    text: req.body.description
  }).then(comment => {
    res.redirect(`/`)
  })
  .catch(next)
}

module.exports.imgprofile = (req, res, next) => {
  Post.find(criteria)
  .populate("author")
  .populate({
  path: 'posts',
  populate: {
    path: 'author'
  }
})

  .sort({ createdAt: req.query.sort || "desc" })
//.then((posts) => res.render("posts/list", { posts, query: req.query }))
  .then((posts) => res.render("user/profile", { posts }))
  .catch(next);
  
  //res.render('posts/comments', { id: req.params.id })
}

module.exports.search = (req, res, next)=>{
  Post.find()
  .then((posts) => {
    res.render("posts/search", {posts})
  })
}
 
module.exports.detail = (req, res, next)=>{
  Post.findById(req.params.id )
  .populate('author')
  .then((post) =>{
    res.render("posts/detail", {post})
  })
  //console.log(req.params)
  //Post.findById( req.params.id )
}


 
