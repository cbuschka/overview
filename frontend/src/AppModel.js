class AppModel {
    constructor() {
        this.listeners = []
    }

    on(l) {
        this.listeners.push(l)
    }
}