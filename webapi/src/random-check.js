var anyOf = require('./any-of');

var statuses = ['ok', 'alert', 'down'];

class RandomCheck {
    check() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(anyOf(statuses));
            }, 300);
        });
    }
}

module.exports = RandomCheck;