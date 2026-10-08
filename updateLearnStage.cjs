const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const componentInjection = `
const InteractiveLearnNode = ({ data, onComplete, theme, isYoung }) => {
  const [step, setStep] = useState(0);
  const [orderState, setOrderState] = useState([]);

  // Fallback string extraction
  const fullText = data.discoverMessage || data.description || "Historical context missing.";
  
  // Split into sentences for progressive learning
  const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
  const fact = sentences[0]?.trim() || fullText;
  const significance = sentences.slice(1).join(' ').trim() || (isYoung ? "It helped them progress." : "It played a key role in their civilization.");

  // Interaction type based on data string length
  const mode = sentences.length > 1 ? 'order' : 'reveal';

  const handleOrder = (chunk) => {
    if (!orderState.includes(chunk)) {
      const nextState = [...orderState, chunk];
      setOrderState(nextState);
      if (nextState.length === 2) {
        if (nextState[0] === fact && nextState[1] === significance) {
           setTimeout(() => setStep(2), 500);
        } else {
           setTimeout(() => setOrderState([]), 800); // reset if wrong
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {step === 0 && (
         <div className="text-center animate-fade-in w-full">
           <p className="text-sm opacity-70 mb-2 uppercase tracking-widest">Step 1: Identify Location</p>
           <button onClick={() => setStep(1)} className={"p-6 rounded-xl border-2 w-full flex flex-col items-center hover:scale-105 transition-all " + theme.border + " " + theme.bg}>
             <span className="text-6xl block mb-4">{data.icon}</span>
             <span className="font-bold text-lg">Tap to Analyze {data.label}</span>
           </button>
           <p className="mt-4 opacity-70 text-sm">{data.description}</p>
         </div>
      )}
      
      {step === 1 && mode === 'reveal' && (
         <div className="text-center animate-fade-in w-full">
           <p className="text-sm opacity-70 mb-2 uppercase tracking-widest">Step 2: Key Fact</p>
           <div className={"p-6 rounded-xl border mb-4 text-left " + theme.border + " " + theme.bg + "/50"}>
             <p className="text-lg font-bold">{fact}</p>
           </div>
           <button onClick={() => setStep(2)} className={"px-6 py-3 font-bold rounded-xl w-full flex items-center justify-center gap-2 " + theme.button}>
             Why did this matter? <ArrowRight size={16} />
           </button>
         </div>
      )}

      {step === 1 && mode === 'order' && (
         <div className="text-center animate-fade-in w-full">
           <p className="text-sm opacity-70 mb-2 uppercase tracking-widest text-blue-400">Step 2: Assemble the Fact</p>
           <p className="text-xs opacity-60 mb-4">Tap the sentences in the correct historical order (Fact → Significance).</p>
           
           <div className="flex flex-col gap-2 min-h-[6rem] p-4 border border-dashed rounded-lg bg-surface/20 mb-4">
              {orderState.length === 0 && <span className="text-content/40 text-sm m-auto">Select the first fact...</span>}
              {orderState.map((txt, i) => (
                <div key={i} className={"p-3 bg-surface border rounded-lg text-left shadow-sm " + theme.border}>
                  <span className="text-sm font-bold">{txt}</span>
                </div>
              ))}
           </div>

           <div className="flex flex-col gap-2">
             {[significance, fact].map((txt, i) => (
               <button 
                 key={i} 
                 onClick={() => handleOrder(txt)}
                 disabled={orderState.includes(txt)}
                 className={"p-3 border rounded-lg text-left text-sm transition-all " + (orderState.includes(txt) ? 'opacity-0 h-0 p-0 overflow-hidden border-none' : 'hover:bg-surface/80 bg-surface/40')}
               >
                 {txt}
               </button>
             ))}
           </div>
         </div>
      )}

      {step === 2 && (
         <div className="text-center animate-fade-in w-full">
           <p className="text-sm opacity-70 mb-2 uppercase tracking-widest text-green-400">Step 3: Significance Learned</p>
           <div className={"p-6 rounded-xl border mb-4 text-left " + theme.border + " " + theme.bg + "/50"}>
             <p className="text-sm opacity-60 mb-2">{fact}</p>
             <p className="text-xl font-bold text-gold">{significance}</p>
           </div>
           {isYoung && <p className="text-xs font-bold text-blue-400 mb-4 uppercase tracking-wider animate-pulse-slow">💡 Great Job!</p>}
           
           <button onClick={onComplete} className={"px-6 py-3 font-bold rounded-xl w-full " + theme.button}>
             Complete Learning
           </button>
         </div>
      )}
    </div>
  );
};
`;

if (!code.includes('InteractiveLearnNode')) {
   code = code.replace("const MatchingGame = ", componentInjection + "\nconst MatchingGame = ");
}

// Now replace the old learn popup with the InteractiveLearnNode!
const learnPopupOrig = /\{type === 'learn' && \(\s*<>\s*<div className="text-6xl mb-4">\{data\.icon\}<\/div>\s*<h3 className=\{"text-xl font-bold mb-4 uppercase " \+ theme\.primary\}>\{data\.label\} Context<\/h3>\s*\{isYoung && <p className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest animate-pulse-slow">💡 Did you know\?<\/p>\}\s*<p className="text-lg text-content mb-6">\{data\.getLearnMessage \? data\.getLearnMessage\(ageGroup\) : \(data\.discoverMessage \|\| data\.description\)\}<\/p>\s*<button onClick=\{\(\) => markLearned\(data\)\} className=\{"px-6 py-3 font-bold rounded-xl w-full " \+ theme\.button\}>\s*Mark as Learned\s*<\/button>\s*\{levelInvestigation && \(\s*<button onClick=\{\(\) => navigate\(`\/investigations\/\$\{levelInvestigation\.id\}\?returnTo=\/journey\/level\/\$\{config\.id\}\/play`\)\} className=\{"mt-3 px-6 py-3 font-bold rounded-xl w-full border flex items-center justify-center gap-2 transition-all hover:scale-105 " \+ theme\.primary \+ " border-current"\}>\s*<Search size=\{18\} \/> Investigate Evidence\s*<\/button>\s*\)\}\s*<\/>\s*\)\}/;

const learnPopupNew = `{type === 'learn' && (
              <>
                <InteractiveLearnNode data={data} onComplete={() => markLearned(data)} theme={theme} isYoung={isYoung} />
                {levelInvestigation && (
                  <button onClick={() => navigate(\`/investigations/\${levelInvestigation.id}?returnTo=/journey/level/\${config.id}/play\`)} className={"mt-4 px-6 py-3 font-bold rounded-xl w-full border flex items-center justify-center gap-2 transition-all hover:scale-105 " + theme.primary + " border-current"}>
                    <Search size={18} /> Investigate Evidence Detail
                  </button>
                )}
              </>
            )}`;

code = code.replace(learnPopupOrig, learnPopupNew);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected Interactive Learning Stage!");
