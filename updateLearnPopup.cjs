const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const oldLearnBlock = `{type === 'learn' && (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
              <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{data.label} Context</h3>
              {isYoung && <p className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest animate-pulse-slow">dY' Did you know?</p>}
              <p className="text-lg text-content mb-6">{data.getLearnMessage ? data.getLearnMessage(ageGroup) : (data.discoverMessage || data.description)}</p>
              <button onClick={() => markLearned(data)} className={"px-6 py-3 font-bold rounded-xl w-full " + theme.button}>
                Mark as Learned
              </button>
            </>
          )}`;

// It might have focus rings injected from earlier steps:
const flexibleOldLearnBlock = /\{type === 'learn' && \([\s\S]*?Mark as Learned[\s\S]*?<\/button>\s*<\/>\s*\)\}/;

const newLearnBlock = `{type === 'learn' && (
              <InteractiveLearnNode data={data} onComplete={() => markLearned(data)} theme={theme} isYoung={isYoung} playSound={playSound} />
          )}`;

code = code.replace(flexibleOldLearnBlock, newLearnBlock);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Replaced Learn popup with InteractiveLearnNode!");
