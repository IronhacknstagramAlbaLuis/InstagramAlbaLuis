const User = require('../models/user.model');
const Like = require('../models/like.model');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");



module.exports.create = (req, res) => {
  
    res.render('users/sign-in');
}
module.exports.docreate = (req, res) =>{
    function renderWithErrors(errors){
        res.render('users/sign-in', { errors, user: req.body });
      }
    
      User.findOne({ email: req.body.email })
    .then(user => {
        
      
      if (user) {
        renderWithErrors({ email: 'email already registered' })
      } else {

        return User.create(req.body)
          .then(() => res.redirect('/login'))
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error);
      }
    })
};
      

module.exports.login = (req, res) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
    
    User.findOne({ email: req.body.email })
        .then((user) => {
       
            bcrypt
            .compare(req.body.password, user.password) 
            .then((ok) => {
                if (ok) {
                 
                     req.session.userId = user.id;
                   
                    res.redirect('/') 
                }
            })
            .catch(next);
        })
        .catch(next);
};



module.exports.profile = (req, res, next) =>{
  // console.log("hola")
  // console.log(req.user.id)
  User.findById(req.params.id)
    .populate('posts')
    .then((user)=>{
      res.render("users/profile", { user, userLogged: req.user._id });
     })
    .catch((next))
}

module.exports.update = (req, res, next) => {

  User.findById(req.user.id)
  .then((user)=>{
    res.render('users/update', {user})
  })
}

module.exports.doUpdate = (req, res, next) => {
  if (req.file) {
    req.body.userimage = req.file.path;
  }
   User.findByIdAndUpdate(req.user._id, req.body)
   .then((user)=>{
    res.redirect(`/users/${user._id}`)
   })
}



