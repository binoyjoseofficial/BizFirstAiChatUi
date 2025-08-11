class HtmlQuery {
    constructor(optionsManager) {
        this.optionsManager = optionsManager;
        this.container = optionsManager.container;
    }

    query(selector) {
        return this.container.querySelector(selector);
    }

    queryAll(selector) {
        return this.container.querySelectorAll(selector);
    }
}