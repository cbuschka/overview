const HttpCheck = require('./http-check');
const RandomCheck = require('./random-check');
const ModelWalker = require('./model-walker');
const ConstCheck = require('./const-check');
const RESCHEDULE_TIMEOUT = 1000;

function runCheck(dataModel, instance) {
    var check;
    switch (instance.check.type) {
        case 'http':
            check = new HttpCheck(instance.check.opts);
            break;
        case 'random':
            check = new RandomCheck(instance.check.opts);
            break;
        default:
            check = new ConstCheck({status: instance.status || "down"});
            break;
    }

    check.check()
        .then(function (status) {
            instance.status = status;
            dataModel.fireChanged();

            setTimeout(function () {
                runCheck(dataModel, instance);
            }, RESCHEDULE_TIMEOUT);
        })
        .catch(function (err) {
            instance.status = "down";
            dataModel.fireChanged();

            setTimeout(function () {
                runCheck(dataModel, instance);
            }, RESCHEDULE_TIMEOUT);
        });
}

class CheckProcessor {
    constructor(dataModel) {
        this.dataModel = dataModel;
    }

    start() {
        var dataModel = this.dataModel;
        var data = dataModel.getData();
        var walker = new ModelWalker();
        walker.walk(data, {
            instance: function (instance, instanceId) {
                instance.id = instance.id || instanceId;
                instance.check = instance.check || {};
                instance.check.type = instance.check.type || 'random';
                instance.check.opts = instance.check.opts || {};

                runCheck(dataModel, instance);
            }
        });
    }
}

module.exports = CheckProcessor;