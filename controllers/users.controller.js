const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


module.exports.create = (req, res) => {
  // console.log("hola")
    res.render('users/sign-in');
}
module.exports.docreate = (req, res) =>{
    function renderWithErrors(errors){
        res.render('users/sign-in', { errors, user: req.body });
      }
    //   console.log(req.body.email)
      User.findOne({ email: req.body.email })
    .then(user => {
        
        // console.log(req.body)
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
          // console.log(user.id)
            bcrypt
            .compare(req.body.password, user.password) //aqui falta algo
            .then((ok) => {
                if (ok) {
                  //console.log(req.session)
                  //console.log(req.headers)
                  //console.log(user.id)
                     req.session.userId = user.id;
                   
                    res.redirect('/') 
                }
            })
            .catch(next);
        })
        .catch(next);
};


module.exports.update = (req, res, next) => {
  
  res.render('users/profile')
  // Tweet.findById(req.params.id)
    // .then((posts) => {
    //   res.render("", { posts });
    // })
    // .catch(next);
};