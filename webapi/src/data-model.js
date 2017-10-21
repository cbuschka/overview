var HttpCheck = require('./http-check');
var RandomCheck = require('./random-check');
var ModelWalker = require('./model-walker');
var ConstCheck = require('./const-check');
var getInitialData = require('./get-initial-data');

class DataModel {
    constructor() {
        this.listeners = [];
        this.data = getInitialData();
    }

    addListener(l) {
        this.listeners.push(l);
    }

    getData() {
        return this.data;
    }

    fireChanged() {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i]();
        }
    }
}

module.exports = new DataModel();