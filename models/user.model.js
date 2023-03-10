const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ADMIN_USERS = process.env.ADMIN_USERS 
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
            default: 'https://res.cloudinary.com/dfozyaoao/image/upload/v1678387216/instagram/user_ins_vx7amy.png',
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
    { 
        timestamps: true,
        toJSON: {
            virtuals: true
        }
     }
);

schema.pre("save", function(next){
    const user = this;
        if(user.email === ADMIN_USERS) {
            user.role ='admin'
        }

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
    foreignField: 'author'
})
schema.virtual('likes', {
    ref: 'Likes',
    localField: '_id',
    foreignField: 'user'
})

module.exports = mongoose.model("User", schema);