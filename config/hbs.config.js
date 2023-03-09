const hbs = require("hbs");

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("isSame", function (userToSee, actualUser) {
    return userToSee.toString() === actualUser.toString()
})

hbs.registerHelper('date', (date) => {
    const minDiff = (Date.now() - date.getTime()) / 1000 / 60;

    if (minDiff > (60 * 24)) {
        return `${Math.round(minDiff / 60 / 24 )}d ago`
    }

        if (minDiff > 60) {
            return `${Math.round(minDiff / 60 )}h ago`
        }
     return  `${minDiff}m ago`
})
