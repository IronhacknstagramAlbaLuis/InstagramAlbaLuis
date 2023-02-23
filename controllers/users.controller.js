const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

module.exports.create = (req, res) => {
    res.render('users/sing-in');
}
module.exports.docreate = (req, res) =>{
    function renderWithErrors(errors){
        res.render('users/sing-in', { errors, user: req.body });
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
    // console.log("hola")
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt
            .compare(req.body.password, user.password)
            .then((ok) => {
                // console.log(ok)
                if (ok) {
                   console.log(req.session)
                  // console.log(req.session.userId)
                     req.session.userId = user.id;
                     console.log(user.id)
                    res.redirect('/') 
                }
            })
            .catch(next);
        })
        .catch(next);
};