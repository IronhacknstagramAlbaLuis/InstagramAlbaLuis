const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
    userimage: { type: String },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user is required"] 
      },
    postimage: { type: String },
    likes: {type: Number, default: 0},
    coments: {
        type: String,
        // required: [true, "message is required"],
        // maxLength: [140, "max 140 chars."],
      },
    description:  {
        type: String,
    //     required: [true, "message is required"],
    //     maxLength: [140, "max 140 chars."],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", schema);