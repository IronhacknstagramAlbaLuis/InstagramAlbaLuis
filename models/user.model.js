const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        name: {type: String},
        email: {type: String},
        password: {type: String}
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", schema);