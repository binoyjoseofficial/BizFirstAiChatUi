class OptionsManager {
    constructor(options) {
        this.defaults = {
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
        };
        this.options = Object.assign({}, this.defaults, options);
    }

    get apiKey() { return this.options.api_key; }
    set apiKey(value) { this.options.api_key = value; }

    get model() { return this.options.model; }
    set model(value) { this.options.model = value; }

    get source() { return this.options.source; }
    set source(value) { this.options.source = value; }

    get maxTokens() { return this.options.max_tokens; }
    set maxTokens(value) { this.options.max_tokens = value; }

    get container() { return document.querySelector(this.options.container); }

    get availableModels() { return this.options.available_models; }

    saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.options));
    }

    loadSettings() {
        try {
            const settings = localStorage.getItem('settings');
            if (settings) {
                this.options = Object.assign(this.options, JSON.parse(settings));
            }
        } catch (error) {
            console.error('Error loading settings from localStorage:', error);
            // Continue with default options if parsing fails
        }
    }
}