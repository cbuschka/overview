function trueOp() {
    return true;
};

class ModelWalker {
    walk(model, cbOpts) {
        model.customers.forEach(function (group) {
            if ((cbOpts.group || trueOp)(group, group.name)) {
                group.envs.forEach(function (env) {
                    if ((cbOpts.env || trueOp)(env, group.name + "." + env.name)) {
                        env.services.forEach(function (service) {
                            if ((cbOpts.service || trueOp)(service, group.name + "." + env.name + "." + service.name)) {
                                service.instances.forEach(function (instance) {
                                    (cbOpts.instance || trueOp)(instance, group.name + "." + env.name + "." + service.name + "." + instance.name);
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

module.exports = ModelWalker;