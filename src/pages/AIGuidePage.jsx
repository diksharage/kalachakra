import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Send, Sparkles } from 'lucide-react';
import { askHeritageGuide } from '../services/aiService';

const AIGuidePage = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Namaste, Explorer! I'm Kala, your AI Heritage Guide. Ask me anything about the civilizations, artifacts, or history you discover." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Check if we came here from an artifact discovery link
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      handleSend(`Tell me more about the ${query}`);
    }
  }, []);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askHeritageGuide(text);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble accessing my historical archives right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface border-2 border-gold flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent"></div>
          <Bot className="w-6 h-6 text-gold z-10" />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold gold-gradient-text">KALA</h1>
          <p className="text-content/50 text-sm">AI Heritage Guide</p>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border border-gold/30 overflow-hidden flex flex-col relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Sparkles className="w-64 h-64" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar z-10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-gold text-[#171B3A] rounded-tr-none shadow-md' 
                    : 'bg-surface/80 border border-gold/20 text-content rounded-tl-none shadow-md'
                }`}
              >
                <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-surface/80 border border-gold/20 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="text-xs text-gold ml-2">Kala is studying ancient records...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-main/80 border-t border-gold/20 z-10">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about artifacts, history, or civilizations..."
              className="flex-1 bg-surface border border-content/10 rounded-xl px-4 py-3 text-content placeholder:text-content/30 focus:outline-none focus:border-gold transition-colors"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="bg-gold text-[#171B3A] p-3 rounded-xl hover:bg-terracotta disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-4 flex gap-2 overflow-x-auto custom-scrollbar pb-2">
            {["What was the Great Bath used for?", "Tell me about Nalanda.", "Why is Ashoka important?"].map((q) => (
              <button 
                key={q}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap text-xs bg-surface border border-gold/30 text-gold px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGuidePage;



