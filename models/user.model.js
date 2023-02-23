const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

schema.pre("save", function(next){
    const user = this;

    if (user.isModified("password")) {
        bcrypt
        .hash(user.password, 10)
        .then((encyptedPassword) => {
            // console.log(encyptedPassword)
            user.password = encyptedPassword;
            next();
        })
        .catch(next);
    } else {
        next();
    }
});

module.exports = mongoose.model("User", schema);