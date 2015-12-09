/**
 * Looks for meta tags inside post content by name and returns it's content
 * @param name - meta tag name
 * @returns {*} - content of the meta tag
 */
module.exports = function (name) {
    if (!this.html) return '';

    var rx = new RegExp('<meta\\s+name=["\']{0,1}' + name + '["\']{0,1}\\s+content=["\']{0,1}([a-z\\-\\:/\\s#\\,\\.\\(\\)]+)', 'i'),
        matches = this.html.match(rx);

    if (!matches) return '';

    return matches[1] || '';
};
