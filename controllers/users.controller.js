const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

module.exports.create = (req, res) => {
    res.render('users/sing-in');
}
module.exports.docreate = (req, res) =>{
    console.log("hola")
    console.log(req.body)
    function renderWithErrors(errors){
        res.render('user/sing-in', { errors, user: req.body });
    }

}
