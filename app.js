require('dotenv').config();

const express = require ('express');
const hbs = require("hbs");
const app = express();

require("./config/db.config");

const { session, loadSessionUser } = require('./config/session.config');
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

const router = require("./config/routes.config");
app.use(session);
app.use(loadSessionUser)



app.use(express.urlencoded({extended:true}));
app.use(router);

hbs.registerPartials(`${__dirname}/views/partials`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.info (`App listening at port ${port}`));


