const Post = require("../models/post.model")

module.exports.home = (req, res, next) => {
    // console.log("hola")
    res.render('home')
   
}

module.exports.create = ( req, res, next) =>{
    console.log("hola")
}