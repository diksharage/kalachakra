const fs = require('fs');
let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const survivalComponent = `
const SurvivalInteractive = ({ data, theme, resources, onComplete }) => {
  const [log, setLog] = React.useState(null);

  const handleChoice = (option) => {
    const costs = option.costs || {};
    let canAfford = true;
    for (let k of Object.keys(costs)) {
       if ((resources[k] || 0) < costs[k]) canAfford = false;
    }
    
    if (!canAfford) {
       setLog({ text: "You lack the resources to do this! You need: " + Object.entries(costs).map(([k,v]) => \`\${v} \${k}\`).join(', '), type: 'error' });
       setTimeout(() => setLog(null), 2000);
       return;
    }
    
    setLog({ text: option.resultText, type: option.isSuccess ? 'success' : 'error' });
    
    setTimeout(() => {
       if (option.isSuccess) {
          onComplete(true, option.reward);
       } else {
          onComplete(false, null);
       }
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {log ? (
         <div className={\`p-6 rounded-xl border-2 text-center animate-fade-in \${log.type === 'success' ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}\`}>
           <p className="text-xl font-bold">{log.text}</p>
         </div>
      ) : (
         <div className="space-y-3 animate-fade-in">
           {(data.options || []).map((opt, i) => (
             <button 
               key={i}
               onClick={() => handleChoice(opt)}
               className={"w-full p-4 border border-content/20 rounded-xl flex flex-col gap-2 transition-all text-left " + theme.bg + " hover:" + theme.border + " hover:scale-105"}
             >
               <div className="font-bold text-lg flex items-center justify-between">
                 <span>{opt.label}</span>
                 {opt.icon && <span className="text-2xl">{opt.icon}</span>}
               </div>
               {Object.keys(opt.costs || {}).length > 0 && (
                 <div className="flex gap-2 text-xs bg-surface/50 p-2 rounded">
                   <span className="opacity-60 uppercase tracking-widest">Cost:</span>
                   {Object.entries(opt.costs).map(([k, v]) => (
                     <span key={k} className={((resources[k] || 0) >= v ? "text-green-400" : "text-red-400") + " font-bold"}>
                       {v} {k}
                     </span>
                   ))}
                 </div>
               )}
             </button>
           ))}
         </div>
      )}
    </div>
  );
};
`;

// Insert the component
if (!content.includes('SurvivalInteractive')) {
   content = content.replace(
      "const InteractiveLearnNode",
      survivalComponent + "\nconst InteractiveLearnNode"
   );
}

// Modify handleChallengeAnswer signature
content = content.replace(
   /const handleChallengeAnswer = \(challenge, isCorrect, isBuild, score = 0\) => \{/,
   "const handleChallengeAnswer = (challenge, isCorrect, isBuild, score = 0, customReward = null) => {"
);

// Modify reward assignment
content = content.replace(
   /let rewardToApply = challenge\.reward;/,
   "let rewardToApply = customReward || challenge.reward;"
);

// Modify render block
const renderReplace = `} : data.format === 'ordering' ? (
                <OrderingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
              ) : data.format === 'interactive_survival' ? (
                <SurvivalInteractive data={data} theme={theme} resources={resources} onComplete={(success, reward) => handleChallengeAnswer(data, success, isBuild, 0, reward)} />
              ) : (`;

content = content.replace(
   /\} \: data\.format === 'ordering' \? \([\s\S]*?\) \: \(/,
   renderReplace
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
