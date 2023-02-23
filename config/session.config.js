const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/user.model');

const MONGODB_URI = process.env.MONGODB_URI;

module.exports.session = session({
    secret: process.env.SESSION_SECRET || 'super secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.SESSION_SECURE === 'true'
    },
    store: MongoStore.create({ //para guardar cookies en el la base de datos mongo //tenemos q intalar la liberia connect-mongo//se nos tiene que crear una collecion con las cookies
      mongoUrl: MONGODB_URI,
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
  })