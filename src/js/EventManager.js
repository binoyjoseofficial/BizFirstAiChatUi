class EventManager {
    constructor(app, optionsManager, conversationManager, uiRenderer, apiService, messageHandler, htmlQuery) {
        this.app = app;
        this.optionsManager = optionsManager;
        this.conversationManager = conversationManager;
        this.uiRenderer = uiRenderer;
        this.apiService = apiService;
        this.messageHandler = messageHandler;
        this.htmlQuery = htmlQuery;
    }

    initLifecycle() {
        this.uiRenderer.renderInitialUI();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        const container = this.optionsManager.container;
        container.querySelector('.message-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = container.querySelector('.message-form input');
            const message = input.value;
            input.value = '';
            await this.app.handleSendMessage(message);
        });

        container.querySelector('.settings').addEventListener('click', () => {
            this.app.openSettingsModal();
        });
    }
}