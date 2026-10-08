const fs = require('fs');
let content = fs.readFileSync('src/pages/AIGuidePage.jsx', 'utf8');

content = content.replace(
  "const response = await askHeritageGuide(textToSend);",
  "const response = await askHeritageGuide(textToSend, {}, messages);\n      const { text, actions } = response;"
);

content = content.replace(
  "setMessages(prev => [...prev, { role: 'ai', content: response }]);",
  "setMessages(prev => [...prev, { role: 'ai', content: text, actions }]);"
);

content = content.replace(
  "<div className={`p-4 md:p-5 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm ${",
  `{/* Add action buttons inside AI messages if they exist */}
            <div className="flex flex-col gap-2 max-w-[85%] md:max-w-[75%]">
            <div className={\`p-4 md:p-5 rounded-2xl shadow-sm \${`
);

content = content.replace(
  "{msg.content}\n            </div>\n          </div>",
  `{msg.content}
            </div>
            {msg.actions && msg.actions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1 pl-2">
                 {msg.actions.map((act, i) => (
                    <button key={i} className="text-xs bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors">
                       {act.label}
                    </button>
                 ))}
              </div>
            )}
            </div>
          </div>`
);

// We need a clear conversation action
content = content.replace(
  "Your Persistent AI Heritage Companion</p>\n        </div>\n      </div>",
  `Your Persistent AI Heritage Companion</p>
        </div>
        <button onClick={() => setMessages([{ role: 'ai', content: "Namaste! History cleared. How can I assist you?" }])} className="ml-auto text-xs text-content/50 hover:text-gold border border-content/20 hover:border-gold/50 px-3 py-1.5 rounded-lg transition-colors">
           Clear Chat
        </button>
      </div>`
);


fs.writeFileSync('src/pages/AIGuidePage.jsx', content);
