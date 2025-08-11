class ApiService {
    constructor(optionsManager) {
        this.optionsManager = optionsManager;
    }
    
    //todo - a provider model here.
    //use MVC client proxy here
    //make a facade for the API calls
    async sendMessage(conversation) {
        if (!conversation || !conversation.messages) {
            throw new Error('Invalid conversation provided');
        }
        
        try {
            const messages = [{ role: 'system', content: 'You are a helpful assistant.' }, ...conversation.messages];
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.optionsManager.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.optionsManager.model,
                    messages: messages,
                    max_tokens: this.optionsManager.maxTokens
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid API response format');
            }
            
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error sending message to API:', error);
            throw error;
        }
    }
}