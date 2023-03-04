const hbs = require("hbs");

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("isSame", function (userToSee, actualUser) {
    return userToSee.toString() === actualUser.toString()
})

