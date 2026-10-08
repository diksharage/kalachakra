const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/KalaCompanion.jsx', 'utf8');

// 1. Import askHeritageGuide
if (!content.includes('askHeritageGuide')) {
  content = content.replace(
    "import { adaptTextForAge } from '../../utils/ageAdapter';",
    "import { adaptTextForAge } from '../../utils/ageAdapter';\nimport { askHeritageGuide } from '../../services/aiService';"
  );
}

// 2. Replace handleSend
const newHandleSend = `
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    try {
      const isMissingResources = !!document.querySelector('.bg-red-900\\\\/20');
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
`;

content = content.replace(/const handleSend = \(e\) => \{[\s\S]*?\};\n/m, newHandleSend + '\n');

// 3. Render action buttons and typing state
const chatMessageRender = `
            {messages.map((m, i) => (
               <div key={i} className={\`flex flex-col \${m.role === 'user' ? 'items-end' : 'items-start'}\`}>
                  <div className={\`p-3 rounded-2xl max-w-[90%] \${m.role === 'user' ? 'bg-gold text-black rounded-tr-sm' : m.type === 'hint' ? 'bg-blue-900/40 border border-blue-400/30 text-blue-100 rounded-tl-sm' : 'bg-surface-light border border-content/10 text-content rounded-tl-sm'}\`}>
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
`;

content = content.replace(/\{messages\.map\(\(m, i\) => \([\s\S]*?\)\)\}/m, chatMessageRender);

// Also update the input button to check isTyping
content = content.replace(
  "disabled={!input.trim()} className=\"p-2",
  "disabled={!input.trim() || isTyping} className=\"p-2"
);

fs.writeFileSync('src/components/gameplay/KalaCompanion.jsx', content);
