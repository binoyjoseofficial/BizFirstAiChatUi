class HtmlTemplates {
    getSidebar(options) {
        return `
            <nav class="conversations">
                <a class="new-conversation" href="#"><i class="fa-solid fa-plus"></i>New Conversation</a>
                <div class="list"></div>
                <div class="footer">
                    <a class="save" href="#" title="Save"><i class="fa-solid fa-floppy-disk"></i></a>
                    <a class="settings" href="#"><i class="fa-solid fa-cog"></i></a>
                </div>
            </nav>
        `;
    }

    getWelcomePage(version) {
        return `
            <div class="welcome">
                <h1>www.BizFirstAI.com</h1>
            </div>
        `;
    }

    getSettingsModal(optionsManager) {
        return `
            <div class="chat-ai-modal">
                <div class="content">
                    <h3 class="heading">Settings<span class="modal-close">&times;</span></h3>
                    <div class="body">
                        <form class="settings-form" action="">
                            <label for="api_key">API Key</label>
                            <input type="text" name="api_key" id="api_key" value="${optionsManager.apiKey}">
                            <label for="source">Source</label>
                            <select name="source" id="source">
                                <option value="openai" selected>OpenAI</option>
                            </select>
                            <label for="model">Model</label>
                            <select name="model" id="model">
                                ${optionsManager.availableModels.map(m => `<option value="${m}"${optionsManager.model==m?' selected':''}>${m}</option>`).join('')}
                            </select>
                            <label for="max_tokens">Max Tokens</label>
                            <input type="number" name="max_tokens" id="max_tokens" value="${optionsManager.maxTokens}">
                            <div class="msg"></div>
                        </form>
                    </div>
                    <div class="footer">
                        <a href="#" class="btn modal-close save">Save</a>
                        <a href="#" class="btn modal-close reset right alt">Reset</a>
                    </div>
                </div>
            </div>
        `;
    }
}