/**
 * Outputs raw value of the post meta title.
 * Note: default Ghost implementation is async and
 * doesn't work when nested in a different get request.
 * @returns {string}
 */
module.exports = function () {
    return (this.meta_description || '').trim();
};
