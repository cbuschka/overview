var fetch = require('node-fetch');
var console = require('debug');

var statuses = ['ok', 'alert', 'down'];

class HttpCheck {
    constructor(opts) {
        this.opts = opts;
    }

    check() {
        var url = this.opts.url;
        return fetch(url, {timeout: 1000})
            .then(function (res) {
                return "ok";
            })
            .catch(function (err) {
                return "down";
            });
    }
}

module.exports = HttpCheck;