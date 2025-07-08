import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Rate limiting: prevent requests faster than 3 seconds apart
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 3000) {
      const waitTime = Math.ceil((3000 - timeSinceLastRequest) / 1000);
      alert(`Please wait ${waitTime} more second(s) before sending another message.`);
      return;
    }

    // Check if API key is configured
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      alert("OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.");
      return;
    }

    setLastRequestTime(now);

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const aiMessage = res.data.choices[0].message;
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);

      // Create error message to display in chat
      let errorMessage = "Sorry, I encountered an error. ";
      if (error.response?.status === 401) {
        errorMessage += "Invalid API key. Please check your OpenAI API key configuration.";
      } else if (error.response?.status === 429) {
        errorMessage += "Rate limit exceeded. Please wait a moment and try again. Consider upgrading your OpenAI plan for higher limits.";
      } else if (error.response?.status === 403) {
        errorMessage += "API key doesn't have permission to access this model.";
      } else {
        errorMessage += error.response?.data?.error?.message || error.message;
      }

      // Add error message to chat
      const errorMsg = { role: 'assistant', content: errorMessage };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h1 className="text-3xl font-bold text-center">🤖 AI Chatboat</h1>
          <p className="text-center text-blue-100 mt-2">Your intelligent conversation partner</p>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg">Start a conversation with your AI assistant!</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-md rounded-bl-sm border border-gray-200'
                    }`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-semibold opacity-75">
                      {msg.role === 'user' ? '👤 You' : '🤖 AI'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-md rounded-2xl rounded-bl-sm border border-gray-200 px-4 py-3 max-w-xs">
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold opacity-75">🤖 AI</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Send</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;