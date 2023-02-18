const express = require ('express')

const app = express();




app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`)

const router = require("./config/routes.config");
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.info (`App listening at port ${port}`));