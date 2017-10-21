class ConstCheck {
    constructor(opts) {
        this.opts = opts;
    }

    check() {
        return Promise.resolve(this.opts.status);
    }
}

module.exports = ConstCheck;