/**
 * Outputs raw value of the post meta description.
 * @returns {string}
 */
module.exports = function () {
    return (this.meta_description || '').trim();
};
