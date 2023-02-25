const Post = require("../models/post.model")

module.exports.home = (req, res, next) => {
     console.log("hola")

    // const criteria ={};

    // if (req.query.user) {
    //     criteria.user = req.query.user;
    // }
    // if (req.query.search){
    //     criteria.imgpost = new RegExp(req.query.search);
    //     criteria.descriptionpost = new RegExp(req.query.search);
    // }
    
    Post.find() 
    // .populate('user')
    .sort({ createdAt: req.query.sort || "desc" })
    // .then((posts) => res.render("posts/list", { posts, query: req.query }))
    .then((posts) => res.render("home", {posts}))
    .catch(next);
    }


module.exports.create = ( req, res, next) =>{
    //  console.log("hola")
    res.render("posts/create");
}


module.exports.doCreate = (req, res, next) => {
    console.log("hola")

    if (req.file) {
        req.body.postimage = req.file.path;
      }
    //   req.body.user = req.user.id;
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
    

 
