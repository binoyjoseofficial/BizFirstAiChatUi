class AiChatUI {
    constructor(options) {
        this.optionsManager = new OptionsManager(options);
        this.conversationManager = new ConversationManager(this.optionsManager);
        this.htmlTemplates = new HtmlTemplates();
        this.messageHandler = new MessageHandler();
        this.apiService = new ApiService(this.optionsManager);
        this.uiRenderer = new UiRenderer(
            this.htmlTemplates,
            this.optionsManager,
            this.conversationManager,
            this.messageHandler
        );
        this.htmlQuery = new HtmlQuery(this.optionsManager);
        this.eventManager = new EventManager(
            this,
            this.optionsManager,
            this.conversationManager,
            this.uiRenderer,
            this.apiService,
            this.messageHandler,
            this.htmlQuery
        );
        this.eventManager.initLifecycle();
    }

    async handleSendMessage(message) {
        try {
            let conversation = this.conversationManager.getCurrentConversation();
            if (!conversation) {
                conversation = this.conversationManager.createConversation('New Chat');
            }
            
            this.conversationManager.addUserMessage(message);
            this.uiRenderer.renderMessages(this.conversationManager.getCurrentConversation());
            const response = await this.apiService.sendMessage(this.conversationManager.getCurrentConversation());
            this.conversationManager.addAssistantMessage(response);
            this.uiRenderer.renderMessages(this.conversationManager.getCurrentConversation());
        } catch (error) {
            this.messageHandler.showError(this.optionsManager.container, error.message);
        }
    }

    openSettingsModal() {
        this.uiRenderer.renderSettingsModal();
    }
}

const app = new AiChatUI({
    api_key: '',
    source: 'openai',
    model: 'gpt-3.5-turbo',
    conversations: [],
    selected_conversation: null,
    container: '.chat-ai',
    chat_speed: 30,
    title: 'Untitled',
    max_tokens: 100,
    version: '1.0.0',
    show_tokens: true,
    available_models: [
        'gpt-4', 'gpt-4-0613', 'gpt-4-32k', 'gpt-4-32k-0613',
        'gpt-3.5-turbo', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-0613'
    ]
});