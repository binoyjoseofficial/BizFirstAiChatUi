class ConversationManager {
    constructor(optionsManager) {
        this.optionsManager = optionsManager;
        this.conversations = this.optionsManager.options.conversations || [];
        this.selectedIndex = this.optionsManager.options.selected_conversation || 0;
    }

    getCurrentConversation() {
        if (this.selectedIndex >= 0 && this.selectedIndex < this.conversations.length) {
            return this.conversations[this.selectedIndex];
        }
        return null;
    }

    addUserMessage(message) {
        const conversation = this.getCurrentConversation();
        if (conversation) {
            conversation.messages.push({ role: 'user', content: message });
        }
    }

    addAssistantMessage(message) {
        const conversation = this.getCurrentConversation();
        if (conversation) {
            conversation.messages.push({ role: 'assistant', content: message });
        }
    }

    createConversation(title) {
        const conv = { name: title, messages: [] };
        this.conversations.push(conv);
        this.selectedIndex = this.conversations.length - 1;
        return conv;
    }

    selectConversation(index) {
        if (index >= 0 && index < this.conversations.length) {
            this.selectedIndex = index;
        }
    }
}