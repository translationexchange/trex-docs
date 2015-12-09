/**
 * Outputs raw value of the post meta title.
 * @returns {string}
 */
module.exports = function () {
    return (this.meta_description || '').trim();
};
