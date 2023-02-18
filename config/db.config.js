const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(() => console.info(`succesfully connected to the database ${MONGODB_URI}`))
    .catch((error) => console.error(`An error ocurred trying to connect to th database ${MONGODB_URI}`, error))