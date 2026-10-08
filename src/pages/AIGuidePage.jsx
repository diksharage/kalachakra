import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Send, Sparkles, BookOpen, Compass, Lightbulb } from 'lucide-react';
import { askHeritageGuide } from '../services/aiService';

const AIGuidePage = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Namaste, Explorer! I am KALA (Knowledge & AI Learning Assistant). I am your persistent companion throughout your journey. Ask me anything about the civilizations, artifacts, or history you discover." }
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
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      handleSend(`Tell me more about the ${query}`);
    }
  }, []);

  const handleSend = async (customText) => {
    const textToSend = typeof customText === 'string' ? customText : input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askHeritageGuide(textToSend);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "My connection to the archives was interrupted. Please ask again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    "What did early humans use for tools?",
    "Tell me about the Indus Valley civilization.",
    "Why was trade important for ancient empires?"
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:h-full max-w-5xl mx-auto w-full animate-fade-in relative z-10 p-4 md:p-6">
      
      {/* Header Profile */}
      <div className="bg-surface/80 backdrop-blur-md border border-gold/30 rounded-t-3xl p-6 flex items-center gap-6 shadow-sm">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gold to-terracotta flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] border-2 border-gold/50 relative overflow-hidden shrink-0">
           <Bot size={40} className="text-black relative z-10" />
           <div className="absolute inset-0 bg-gold opacity-20 animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-widest flex items-center gap-3">KALA <Sparkles size={24} className="text-gold/80" /></h1>
          <p className="text-content/80 text-sm md:text-base mt-1">Your Persistent AI Heritage Companion</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-surface-light border-l border-r border-content/10 p-4 md:p-6 overflow-y-auto flex flex-col gap-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            
            {msg.role === 'ai' ? (
              <div className="w-10 h-10 rounded-xl bg-gold text-black flex items-center justify-center shrink-0 shadow-md">
                <Bot size={20} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-content/10 text-content flex items-center justify-center shrink-0 border border-content/20">
                <span className="font-bold">You</span>
              </div>
            )}

            <div className={`p-4 md:p-5 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm ${
              msg.role === 'user' 
                ? 'bg-content/5 border border-content/10 text-content rounded-tr-sm' 
                : 'bg-surface border border-gold/30 text-content leading-relaxed rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-xl bg-gold text-black flex items-center justify-center shrink-0 shadow-md">
                <Bot size={20} />
             </div>
             <div className="p-5 rounded-2xl bg-surface border border-gold/30 rounded-tl-sm flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-gold/50 animate-bounce"></div>
               <div className="w-2 h-2 rounded-full bg-gold/50 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-2 h-2 rounded-full bg-gold/50 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-surface/80 backdrop-blur-md border border-content/20 rounded-b-3xl p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        
        {messages.length === 1 && (
           <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
             {suggestions.map((s, i) => (
               <button key={i} onClick={() => handleSend(s)} className="text-xs md:text-sm bg-surface-light border border-content/10 hover:border-gold/50 hover:text-gold text-content/70 px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                 <Lightbulb size={14} /> {s}
               </button>
             ))}
           </div>
        )}

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }} 
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask KALA a question..."
            className="flex-1 bg-surface-light border border-content/20 rounded-2xl px-5 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-content"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-6 py-4 bg-gold text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <Send size={20} className="hidden md:block" />
            <span>Send</span>
          </button>
        </form>
      </div>

    </div>
  );
};

export default AIGuidePage;
