const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user is required"] 
      },
    postimage: { type: String },
    description:  {
        type: String,
        required: [true, "message is required"],
        maxLength: [140, "max 140 chars."],
        },
    },
    { 
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

schema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false
})



module.exports = mongoose.model("Post", schema);