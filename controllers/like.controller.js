const Like = require('../models/like.model');

module.exports.like = (req, res, next) => {
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
  res.redirect('/')
}