require('dotenv').config();
const logger = require('morgan') 
const express = require ('express');
const app = express();

require("./config/db.config");
require("./config/hbs.config");

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({extended:false}));

const { session, loadSessionUser } = require('./config/session.config');

app.use(session);
app.use(loadSessionUser)
app.use(logger('dev'))

const router = require("./config/routes.config");

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.info (`App listening at port ${port}`));


