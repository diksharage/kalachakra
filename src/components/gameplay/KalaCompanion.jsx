import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, X, Lightbulb, Sparkles, Send, Trash2, AlertCircle } from 'lucide-react';
import { askHeritageGuide, buildKalaContext } from '../../services/aiService';
import { useGame } from '../../context/GameContext';

const KalaCompanion = ({ stage, levelId, levelState, inventory, activeChallenge, ageGroup }) => {
  const { gameState } = useGame();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [dismissedBubble, setDismissedBubble] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const getContextualMessage = () => {
    const ctx = buildKalaContext(gameState, {
      stage,
      levelId,
      levelState,
      inventory,
      activeChallenge,
      ageGroup
    });
    return ctx.currentObjective || 'I am here to guide you through history. Ask me anything!';
  };

  useEffect(() => {
    setDismissedBubble(false);
    const msg = getContextualMessage();
    setMessages(prev => {
      const lastMsg = prev.length > 0 ? prev[prev.length - 1] : null;
      if (!lastMsg || lastMsg.content !== msg) {
        return [...prev, { role: 'kala', type: 'context', content: msg }];
      }
      return prev;
    });
  }, [stage, levelId, activeChallenge?.id]);

  const sendQuestion = async (questionText) => {
    const userMsg = (typeof questionText === 'string' ? questionText : input).trim();
    if (!userMsg || isTyping) return;

    const priorMessages = [...messages];
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (typeof questionText !== 'string') {
      setInput('');
    }
    setIsTyping(true);

    try {
      const isMissingResources = Boolean(document.querySelector('.bg-red-900\\/20'));
      const context = {
        gameState,
        stage,
        levelId,
        levelState,
        inventory,
        activeChallenge,
        missingResources: isMissingResources,
        ageGroup: ageGroup || gameState?.ageGroup
      };
      const response = await askHeritageGuide(userMsg, context, priorMessages);
      const { text, actions, isError } = response;
      setMessages(prev => [
        ...prev,
        { role: 'kala', type: 'chat', content: text, actions: actions || [], isError: Boolean(isError) }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'kala',
          type: 'chat',
          content: 'My connection seems to be interrupted. Please try asking again.',
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendQuestion();
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'kala',
        type: 'context',
        content: getContextualMessage()
      }
    ]);
  };

  const handleActionClick = (act) => {
    if (act.route && act.type !== 'resume_level') {
      navigate(act.route);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      {/* KALA Speech Bubble (Contextual Auto-Guidance) */}
      {!isOpen && !dismissedBubble && messages.length > 0 && (
        <div
          className="mb-3 bg-[#101519]/95 backdrop-blur-md p-3.5 rounded-2xl rounded-br-sm border border-[#D9A441]/50 shadow-2xl max-w-xs sm:max-w-sm pointer-events-auto cursor-pointer hover:border-[#D9A441] transition-all animate-fade-in"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-xs font-bold text-[#D9A441] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles size={13} /> KALA Companion
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDismissedBubble(true);
              }}
              aria-label="Dismiss KALA tip"
              className="text-[#C5C9CC]/60 hover:text-[#F5F1E8] p-0.5"
            >
              <X size={13} />
            </button>
          </div>
          <p className="text-xs text-[#F5F1E8]/90 leading-relaxed line-clamp-3">
            {messages[messages.length - 1].content}
          </p>
        </div>
      )}

      {/* KALA Chat Panel */}
      <div
        className={`bg-[#101519] border border-[#34302A] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto ${
          isOpen
            ? 'w-[330px] sm:w-[370px] h-[450px] opacity-100 scale-100 mb-3'
            : 'w-0 h-0 opacity-0 scale-95'
        }`}
      >
        <div className="bg-[#151B20] px-4 py-3 border-b border-[#34302A] flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#D9A441]">
            <Bot size={20} />
            <div>
              <span className="font-bold font-serif tracking-widest text-sm block leading-none">
                KALA
              </span>
              <span className="text-[10px] text-[#C5C9CC] block mt-0.5">
                AI Heritage & Game Companion
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClear}
              title="Clear Chat"
              className="text-[#C5C9CC]/70 hover:text-[#D9A441] p-1.5 rounded-lg hover:bg-[#101519] transition-colors"
            >
              <Trash2 size={15} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              title="Close KALA"
              className="text-[#C5C9CC]/70 hover:text-[#F5F1E8] p-1.5 rounded-lg hover:bg-[#101519] transition-colors"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-3.5 overflow-y-auto flex flex-col gap-3 text-xs sm:text-sm bg-[#090C0F]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[90%] leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#D9A441] text-[#070A0C] font-medium rounded-tr-sm'
                    : m.isError
                    ? 'bg-[#151B20] border border-amber-500/40 text-[#F5F1E8] rounded-tl-sm'
                    : 'bg-[#151B20] border border-[#34302A] text-[#F5F1E8] rounded-tl-sm'
                }`}
              >
                {m.isError && (
                  <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold mb-1">
                    <AlertCircle size={12} />
                    <span>Notice</span>
                  </div>
                )}
                {m.content}
                {m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="text-[11px] bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/40 px-2.5 py-1 rounded-full hover:bg-[#D9A441] hover:text-[#070A0C] font-semibold transition-colors"
                        onClick={() => handleActionClick(act)}
                      >
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
              <div className="p-3 rounded-2xl bg-[#151B20] border border-[#34302A] text-[#C5C9CC] rounded-tl-sm flex items-center gap-2 text-xs">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
                <span>KALA is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Context Prompts */}
        <div className="px-3 py-2 bg-[#101519] border-t border-[#34302A] flex gap-1.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            disabled={isTyping}
            onClick={() => sendQuestion('What should I do next?')}
            className="text-[11px] shrink-0 flex items-center gap-1 bg-[#151B20] text-[#D9A441] border border-[#D9A441]/30 px-2.5 py-1 rounded-full hover:bg-[#D9A441]/20 transition-colors disabled:opacity-50"
          >
            <Lightbulb size={11} /> What next?
          </button>
          {activeChallenge && (
            <button
              type="button"
              disabled={isTyping}
              onClick={() => sendQuestion('Give me a hint for this challenge.')}
              className="text-[11px] shrink-0 flex items-center gap-1 bg-[#151B20] text-[#D9A441] border border-[#D9A441]/30 px-2.5 py-1 rounded-full hover:bg-[#D9A441]/20 transition-colors disabled:opacity-50"
            >
              <Lightbulb size={11} /> Get Hint
            </button>
          )}
          <button
            type="button"
            disabled={isTyping}
            onClick={() => sendQuestion('Tell me an interesting historical fact about this era.')}
            className="text-[11px] shrink-0 flex items-center gap-1 bg-[#151B20] text-[#C5C9CC] border border-[#34302A] px-2.5 py-1 rounded-full hover:border-[#D9A441]/40 hover:text-[#F5F1E8] transition-colors disabled:opacity-50"
          >
            Era Fact
          </button>
        </div>

        <form
          onSubmit={handleSend}
          className="p-2.5 bg-[#151B20] border-t border-[#34302A] flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask KALA any question..."
            className="flex-1 bg-[#101519] border border-[#34302A] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#F5F1E8] placeholder-[#C5C9CC]/50 focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-[#D9A441] text-[#070A0C] rounded-xl disabled:opacity-50 hover:bg-[#D9A441]/90 transition-colors shrink-0"
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      {/* Persistent Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle KALA AI Companion"
        className={`p-3.5 rounded-full shadow-2xl transition-all duration-300 border-2 pointer-events-auto flex items-center justify-center ${
          isOpen
            ? 'bg-[#101519] border-[#D9A441] text-[#D9A441] scale-95'
            : 'bg-[#D9A441] border-[#D9A441] text-[#070A0C] hover:scale-105 shadow-[0_0_20px_rgba(217,164,65,0.4)]'
        }`}
      >
        <Bot size={26} />
      </button>
    </div>
  );
};

export default KalaCompanion;
