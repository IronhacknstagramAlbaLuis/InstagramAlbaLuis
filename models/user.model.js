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
        userimage: {
            type: String ,
            default: 'https://res.cloudinary.com/dp520ozjl/image/upload/v1659034965/glovo/dvyi5n3bxrymxwrrjgcf.png',
        },
        userdescription: {
            type: String,
            maxLength: [250, "max 250 chars."],
            default: 'Esta es mi presentación',
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
          
            user.password = encyptedPassword;
            next();
        })
        .catch(next);
    } else {
        next();
    }
});

schema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})

module.exports = mongoose.model("User", schema);