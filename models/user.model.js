const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        name: {type: String, required: [true, "Tell us your name"] },
        email: {
            type: String,
            require: [true, "Tell us your email"],
            matdh: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Tell us your password"],
            minLength: [6, "must have 6 character"]
        },
        role: {
            type: String, 
            enum: ['admin', 'guest'],
            default:'guest'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", schema);