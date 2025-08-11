class UiRenderer {
    constructor(htmlTemplates, optionsManager, conversationManager, messageHandler) {
        this.htmlTemplates = htmlTemplates;
        this.optionsManager = optionsManager;
        this.conversationManager = conversationManager;
        this.messageHandler = messageHandler;
        this.container = this.optionsManager.container;
    }

    renderInitialUI() {
        this.container.innerHTML = `
            ${this.htmlTemplates.getSidebar(this.optionsManager.options)}
            <main class="content">
                ${this.htmlTemplates.getWelcomePage(this.optionsManager.options.version)}
                <form class="message-form">
                    <input type="text" placeholder="Type a message..." required>
                    <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </main>
        `;
    }

    renderMessages(conversation) {
        if (!conversation || !conversation.messages) {
            return;
        }
        const contentElement = this.container.querySelector('.content');
        contentElement.innerHTML = '';
        
        conversation.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', msg.role);
            messageDiv.textContent = msg.content; // Safe text content instead of innerHTML
            contentElement.appendChild(messageDiv);
        });
    }

    renderSettingsModal() {
        this.container.insertAdjacentHTML('beforeend', this.htmlTemplates.getSettingsModal(this.optionsManager));
    }
}