// text:^String
// author:^ObjectId ref:^User
// post:^ObjectId ref:^Post
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    // userimage: { type: String },
    text: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", schema);