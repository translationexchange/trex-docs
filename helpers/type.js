var meta = require('./meta');

module.exports = function (value) {
    return meta.call(this, 'type');
};
