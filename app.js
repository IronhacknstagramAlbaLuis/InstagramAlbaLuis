require('dotenv').config();

const express = require ('express');

const app = express();

require("./config/db.config");


app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

const router = require("./config/routes.config");


app.use(express.urlencoded({extended:true}));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.info (`App listening at port ${port}`));