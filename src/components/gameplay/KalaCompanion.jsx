import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, HelpCircle, Lightbulb, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { adaptTextForAge } from '../../utils/ageAdapter';
import { askHeritageGuide } from '../../services/aiService';

const KalaCompanion = ({ stage, levelId, inventory, activeChallenge, ageGroup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Contextual Guide Logic
  
  const getContextualMessage = () => {
    if (activeChallenge) {
      return "You are currently facing a challenge! Review the options carefully. If you need a hint, just ask.";
    }
    
    // Missing resources check
    const isMissingResources = document.querySelector('.bg-red-900\\/20');
    if (isMissingResources) {
      return "You need more resources for this structure. You can gather them by completing challenges or exploring more locations in this era.";
    }

    switch(stage) {
      case 1: return "We're exploring the area. Click on the highlighted locations to see what resources and clues we can find.";
      case 2: return "This object may tell us something about the people in this civilization. Let's investigate to uncover artifacts.";
      case 3: return "Great discoveries! Now let's decode the history behind what we found.";
      case 4: return "Time to test our knowledge. Complete the challenges to advance the civilization.";
      case 5: return "We have enough resources to start building. Let's expand our settlement!";
      case 6: return "Excellent progress. We should claim our rewards before we move on.";
      case 7: return "Your decisions improved the settlement! Here's what that tells us historically... The next era awaits.";
      default: return "I am here to guide you through history. Where should we go next?";
    }
  };


  useEffect(() => {
    // Auto-update context when stage changes or a challenge opens
    const msg = getContextualMessage();
    // check if the last context message is the same to prevent spam
    const lastMsg = messages.length > 0 ? messages[messages.length - 1] : null;
    if (!lastMsg || lastMsg.content !== msg) {
        setMessages(prev => [...prev, { role: 'kala', type: 'context', content: msg }]);
    }
  }, [stage, activeChallenge]);

  
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    try {
      const isMissingResources = !!document.querySelector('.bg-red-900\\/20');
      const context = { stage, levelId, inventory, activeChallenge, missingResources: isMissingResources, ageGroup };
      const response = await askHeritageGuide(userMsg, context, messages);
      const { text, actions } = response;
      setMessages(prev => [...prev, { role: 'kala', type: 'chat', content: text, actions }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'kala', type: 'chat', content: "My connection seems to be interrupted." }]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      
      {/* KALA Speech Bubble (Contextual Auto-Guidance) */}
      {!isOpen && messages.length > 0 && (
        <div className="mb-4 bg-surface/90 backdrop-blur-md p-4 rounded-2xl rounded-br-sm border border-gold/40 shadow-2xl max-w-sm pointer-events-auto cursor-pointer hover:scale-105 transition-transform animate-fade-in" onClick={() => setIsOpen(true)}>
           <p className="text-sm font-bold text-gold mb-1 flex items-center gap-2"><Sparkles size={14}/> KALA Guide</p>
           <p className="text-sm text-content/90 leading-relaxed">{messages[messages.length-1].content}</p>
        </div>
      )}

      {/* KALA Chat Panel */}
      <div className={`bg-surface border border-content/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto ${isOpen ? 'w-80 h-96 opacity-100 scale-100 mb-4' : 'w-0 h-0 opacity-0 scale-95'}`}>
         
         <div className="bg-surface-light p-3 border-b border-content/10 flex justify-between items-center">
            <div className="flex items-center gap-2 text-gold">
               <Bot size={20} />
               <span className="font-bold font-serif tracking-widest">KALA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-content/50 hover:text-content p-1 rounded-md hover:bg-content/10 transition-colors">
               <X size={18} />
            </button>
         </div>
         
         <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-sm">
            
            {messages.map((m, i) => (
               <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[90%] ${m.role === 'user' ? 'bg-gold text-black rounded-tr-sm' : m.type === 'hint' ? 'bg-blue-900/40 border border-blue-400/30 text-blue-100 rounded-tl-sm' : 'bg-surface-light border border-content/10 text-content rounded-tl-sm'}`}>
                     {m.content}
                     {m.actions && m.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                           {m.actions.map((act, idx) => (
                              <button key={idx} className="text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1 rounded hover:bg-gold/20 transition-colors" onClick={() => setIsOpen(false)}>
                                {act.label}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            ))}
            {isTyping && (
               <div className="flex flex-col items-start">
                  <div className="p-3 rounded-2xl bg-surface-light border border-content/10 text-content rounded-tl-sm flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-bounce"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
               </div>
            )}

            <div ref={messagesEndRef} />
            {activeChallenge && (
              <button 
                onClick={() => {
                   setMessages(prev => [...prev, { role: 'user', content: "I need a hint for this challenge." }]);
                   setTimeout(() => {
                      setMessages(prev => [...prev, { role: 'kala', type: 'hint', content: adaptTextForAge("Consider the civilization's primary needs. Which resource is scarce here?", ageGroup) }]);
                   }, 800);
                }}
                className="self-start text-xs flex items-center gap-1 bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors mt-2"
              >
                <Lightbulb size={12} /> Get Hint
              </button>
            )}
         </div>
         
         <form onSubmit={handleSend} className="p-3 border-t border-content/10 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask KALA..." 
              className="flex-1 bg-surface-light border border-content/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            />
            <button type="submit" disabled={!input.trim() || isTyping} className="p-2 bg-gold text-black rounded-xl disabled:opacity-50 hover:bg-gold-light transition-colors">
               <Send size={16} />
            </button>
         </form>
         
      </div>

      {/* Persistent Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 border-2 pointer-events-auto flex items-center justify-center ${isOpen ? 'bg-surface border-gold/50 text-gold scale-90' : 'bg-gold border-gold text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]'}`}
      >
        <Bot size={28} />
      </button>

    </div>
  );
};

export default KalaCompanion;
