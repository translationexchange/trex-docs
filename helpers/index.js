var hbs = require('express-hbs');

module.exports.register = function () {
    hbs.registerHelper('meta', require('./meta'));
    hbs.registerHelper('meta_title_attr', require('./meta_title_attr'));
    hbs.registerHelper('meta_description_attr', require('./meta_description_attr'));
    hbs.registerHelper('type', require('./type'));
};
