import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  Trash2,
  Compass,
  AlertCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import {
  askHeritageGuide,
  buildKalaContext,
  loadKalaHistory,
  saveKalaHistory,
  clearKalaHistory
} from '../services/aiService';
import { useGame } from '../context/GameContext';

const formatMessageText = (content) => {
  if (!content) return null;
  const paragraphs = String(content).split(/\n\n+/);
  return paragraphs.map((para, pIdx) => {
    const lines = para.split('\n');
    return (
      <p key={pIdx} className={pIdx > 0 ? 'mt-3' : ''}>
        {lines.map((line, lIdx) => {
          const cleanLine = line.replace(/\*\*(.*?)\*\*/g, '$1');
          return (
            <React.Fragment key={lIdx}>
              {lIdx > 0 && <br />}
              {cleanLine}
            </React.Fragment>
          );
        })}
      </p>
    );
  });
};

const AIGuidePage = () => {
  const { gameState } = useGame();
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState(() => loadKalaHistory());
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastFailedPrompt, setLastFailedPrompt] = useState(null);

  const messagesEndRef = useRef(null);
  const processedQueryRef = useRef(null);

  const liveContext = useMemo(() => buildKalaContext(gameState), [gameState]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    saveKalaHistory(messages);
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (customText) => {
    const textToSend = typeof customText === 'string' ? customText : input;
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const currentHistory = [...messages];
    const updatedWithUser = [...currentHistory, { role: 'user', content: trimmed }];
    setMessages(updatedWithUser);
    if (typeof customText !== 'string') {
      setInput('');
    }
    setIsTyping(true);
    setLastFailedPrompt(null);

    try {
      const response = await askHeritageGuide(
        trimmed,
        { gameState },
        currentHistory
      );
      const { text, actions, isError, errorCode } = response;
      if (isError) {
        setLastFailedPrompt(trimmed);
      }
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content: text,
          actions: actions || [],
          isError: Boolean(isError),
          errorCode: errorCode || null
        }
      ]);
    } catch {
      setLastFailedPrompt(trimmed);
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content:
            'My connection to the archives was interrupted. Please check your connection and try again.',
          isError: true,
          errorCode: 'NETWORK_ERROR'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query && processedQueryRef.current !== query) {
      processedQueryRef.current = query;
      handleSend(`Tell me more about ${query}`);
    }
  }, [location.search]);

  const handleClearChat = () => {
    const reset = clearKalaHistory();
    setMessages(reset);
    setLastFailedPrompt(null);
  };

  const handleActionClick = (act) => {
    if (act.route) {
      navigate(act.route);
    } else if (act.type === 'go_journey') {
      navigate('/journey');
    } else if (act.type === 'show_objective' || act.type === 'resume_level') {
      navigate(`/journey/level/${liveContext.levelId}/play`);
    } else if (act.type === 'open_builder') {
      navigate('/builder');
    } else if (act.type === 'view_quests') {
      navigate('/quests');
    } else {
      navigate(`/journey/level/${liveContext.levelId}/play`);
    }
  };

  const suggestions = useMemo(
    () => [
      'What should I do next?',
      `Tell me about ${liveContext.levelTitle} (${liveContext.historicalPeriod || 'History'})`,
      'How did ancient Indians contribute to mathematics and astronomy?',
      'Why was urban drainage in the Indus Valley so advanced?',
      'Explain how the monsoon shaped trade across the Indian Ocean.'
    ],
    [liveContext.levelTitle, liveContext.historicalPeriod]
  );

  return (
    <div className="h-[calc(100vh-88px)] flex flex-col max-w-5xl mx-auto w-full animate-fade-in relative z-10 p-3 md:p-6">
      {/* Header Profile & Live Game Context Banner */}
      <div className="bg-[#101519]/95 backdrop-blur-md border border-[#34302A] rounded-t-3xl p-4 md:p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#D9A441] to-[#B77B2E] flex items-center justify-center shadow-[0_0_20px_rgba(217,164,65,0.3)] border border-[#D9A441]/60 relative overflow-hidden shrink-0">
            <Bot size={34} className="text-[#070A0C] relative z-10" />
          </div>
          <div className="flex-1 min-w-[180px]">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl md:text-2xl font-serif font-bold text-[#D9A441] tracking-wider flex items-center gap-2">
                KALA <Sparkles size={20} className="text-[#D9A441]" />
              </h1>
              <span className="text-[11px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 font-semibold">
                Gemini AI Companion
              </span>
              {liveContext.ageGroup && (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#151B20] text-[#C5C9CC] border border-[#34302A]">
                  Age Mode: {liveContext.ageGroup}
                </span>
              )}
            </div>
            <p className="text-[#C5C9CC] text-xs md:text-sm mt-1">
              Ask about Indian history, civilizations, science, mathematics, geography, general knowledge, or your current game objectives.
            </p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => navigate(`/journey/level/${liveContext.levelId}/play`)}
              className="text-xs bg-[#151B20] hover:bg-[#D9A441]/20 text-[#D9A441] border border-[#D9A441]/40 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 font-semibold"
              title="Return to active gameplay without losing progress"
            >
              <Compass size={14} />
              <span className="hidden sm:inline">Level {liveContext.levelId}</span>
            </button>
            <button
              onClick={handleClearChat}
              className="text-xs text-[#C5C9CC] hover:text-[#D9A441] bg-[#151B20] border border-[#34302A] hover:border-[#D9A441]/50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              title="Clear conversation history"
            >
              <Trash2 size={14} />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Live Gameplay Sync Bar */}
        <div className="bg-[#151B20] border border-[#34302A] rounded-xl px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#F5F1E8]">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse shrink-0" />
            <span className="font-semibold text-[#D9A441]">
              Level {liveContext.levelId}: {liveContext.levelTitle}
            </span>
            <span className="text-[#C5C9CC]">•</span>
            <span className="text-[#C5C9CC]">
              Stage {liveContext.stage} ({liveContext.stageName})
            </span>
          </div>
          <div className="text-[#C5C9CC] truncate max-w-full md:max-w-[55%]">
            {liveContext.stageProgress}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#090C0F]/95 border-l border-r border-[#34302A] p-4 md:p-6 overflow-y-auto flex flex-col gap-5">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : ''}`}>
              {!isUser ? (
                <div className="w-9 h-9 rounded-xl bg-[#D9A441] text-[#070A0C] flex items-center justify-center shrink-0 shadow-md mt-0.5">
                  <Bot size={19} />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#151B20] text-[#F5F1E8] flex items-center justify-center shrink-0 border border-[#34302A] text-xs font-bold mt-0.5">
                  You
                </div>
              )}

              <div className={`flex flex-col gap-2 max-w-[85%] md:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-sm md:text-[15px] leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-[#D9A441] text-[#070A0C] font-medium rounded-tr-sm'
                      : msg.isError
                      ? 'bg-[#151B20] border border-amber-500/50 text-[#F5F1E8] rounded-tl-sm'
                      : 'bg-[#101519] border border-[#34302A] text-[#F5F1E8] rounded-tl-sm'
                  }`}
                >
                  {msg.isError && (
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <AlertCircle size={14} />
                      <span>Connection / Configuration Notice</span>
                    </div>
                  )}
                  {formatMessageText(msg.content)}
                </div>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-0.5">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act)}
                        className="text-xs bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/40 px-3.5 py-1.5 rounded-full hover:bg-[#D9A441] hover:text-[#070A0C] font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span>{act.label}</span>
                        <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3.5 items-start">
            <div className="w-9 h-9 rounded-xl bg-[#D9A441] text-[#070A0C] flex items-center justify-center shrink-0 shadow-md">
              <Bot size={19} />
            </div>
            <div className="px-4 py-3.5 rounded-2xl bg-[#101519] border border-[#34302A] rounded-tl-sm flex items-center gap-2.5 text-xs text-[#C5C9CC]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#D9A441] animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-[#D9A441] animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#D9A441] animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
              <span>KALA is thinking...</span>
            </div>
          </div>
        )}

        {lastFailedPrompt && !isTyping && (
          <div className="flex justify-start pl-12">
            <button
              onClick={() => handleSend(lastFailedPrompt)}
              className="text-xs flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-[#D9A441] transition-colors"
            >
              <RefreshCw size={13} />
              <span>Retry last question</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input & Suggested Prompts Area */}
      <div className="bg-[#101519]/95 backdrop-blur-md border border-[#34302A] rounded-b-3xl p-4 shadow-xl">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              disabled={isTyping}
              onClick={() => handleSend(s)}
              className="text-xs shrink-0 bg-[#151B20] border border-[#34302A] hover:border-[#D9A441]/60 hover:text-[#D9A441] text-[#C5C9CC] px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Lightbulb size={13} className="text-[#D9A441] shrink-0" />
              <span>{s}</span>
            </button>
          ))}
        </div>

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
            placeholder="Ask KALA anything — history, science, math, or 'What should I do next?'..."
            aria-label="Ask KALA a question"
            className="flex-1 bg-[#151B20] border border-[#34302A] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] transition-colors text-[#F5F1E8] placeholder-[#C5C9CC]/50 text-sm md:text-base"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 md:px-6 py-3.5 bg-[#D9A441] text-[#070A0C] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#D9A441]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shrink-0"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIGuidePage;
