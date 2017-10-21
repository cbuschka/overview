module.exports = function anyOf(array) {
    if (!array || array.length === 0) {
        return {};
    }

    var index = Math.min((Math.random() * array.length) | 0, array.length - 1);

    return array[index];
};