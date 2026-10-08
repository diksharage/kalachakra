const fs = require('fs');

let content = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Convert ExplorePanel buttons to "Hold to Investigate" mechanic
content = content.replace(
  `onClick={() => handleDiscovery(disc)}`,
  `onMouseDown={() => startInvestigate(disc)}
   onMouseUp={stopInvestigate}
   onMouseLeave={stopInvestigate}
   onTouchStart={() => startInvestigate(disc)}
   onTouchEnd={stopInvestigate}`
);

// We need to inject the startInvestigate logic into ExplorePanel
const exploreLogic = `
  const [investigating, setInvestigating] = useState(null);
  const investigateTimer = useRef(null);

  const startInvestigate = (disc) => {
    if (found.includes(disc.id)) return;
    setInvestigating(disc.id);
    playSound('ui');
    investigateTimer.current = setTimeout(() => {
       handleDiscovery(disc);
       setInvestigating(null);
    }, 800);
  };
  
  const stopInvestigate = () => {
    setInvestigating(null);
    if (investigateTimer.current) clearTimeout(investigateTimer.current);
  };
`;
content = content.replace(
  `const handleDiscovery = (disc) => {`,
  `${exploreLogic}\n  const handleDiscovery = (disc) => {`
);

// Update ExplorePanel button rendering to show the hold progress
content = content.replace(
  /className={\`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 \$\{([^\}]+)\}\`}/g,
  `className={\`relative overflow-hidden w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 \${$1}\`}
   style={{ transform: investigating === disc.id ? 'scale(0.98)' : 'scale(1)' }}`
);

content = content.replace(
  `{isFound`,
  `{investigating === disc.id && (
      <div className="absolute left-0 bottom-0 h-1 bg-gold transition-all duration-[800ms] ease-linear w-full" style={{ width: '100%', animation: 'fillBar 0.8s linear forwards' }} />
   )}
   {isFound`
);


// 2. Add Stage 6 (REWARD) and Stage 7 (COMPLETE) logic
// Replace checkStageProgression
content = content.replace(
  /if \(currentStage === 5 && newState\.builtItems\.length >= targetBuilds\) currentStage = 6;/g,
  `if (currentStage === 5 && newState.builtItems.length >= targetBuilds) currentStage = 6;
    // Stage 6 is REWARD (manual click to claim)
    // Stage 7 is COMPLETE`
);

// Add the REWARD screen logic
const rewardScreen = `
          {stage === 6 && activePopup?.type !== 'reward' ? (
             <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 animate-fade-in text-center overflow-y-auto w-full">
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center py-10 bg-surface/80 p-8 rounded-3xl border border-gold/30 shadow-2xl backdrop-blur-md">
                   <Trophy className="w-20 h-20 mb-6 text-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-pulse-slow" />
                   <h3 className="text-4xl font-serif font-bold mb-4 text-gold">Level Objectives Met</h3>
                   <p className="text-lg text-content/80 mb-8">You have successfully Explored, Discovered, Learned, Solved, and Built your civilization.</p>
                   <button 
                     onClick={() => {
                        playSound('success');
                        setLevelState(prev => ({ ...prev, stage: 7 }));
                        updateResources({ knowledge: 200, culture: 150, legacy: 100 });
                     }}
                     className="px-8 py-4 bg-gold text-black font-extrabold text-xl rounded-xl hover:scale-105 transition-transform"
                   >
                     Claim Level Rewards
                   </button>
                </div>
             </div>
          ) : stage === 7 ? (
`;

content = content.replace(
  /\{stage === 6 \? \(/g,
  rewardScreen
);

// 3. Convert MCQ to Interactive "Drag / Match" format 
// Inside the challenge rendering, we can replace the MCQ buttons with an interactive format.
const interactiveMcq = `
                {data.format === 'matching' ? (
                  <MatchingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
                ) : data.format === 'ordering' ? (
                  <OrderingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
                ) : (
                  <div className="w-full flex flex-col items-center gap-6 bg-surface/30 p-6 rounded-2xl border border-content/10">
                    <div className="text-xs font-bold text-gold tracking-widest uppercase mb-2">Interactive Challenge</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {(data.options || []).map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                           if (opt.isCorrect) {
                              playSound('success');
                           } else {
                              playSound('error');
                           }
                           handleChallengeAnswer(data, opt.isCorrect, isBuild);
                        }}
                        className={"group relative flex flex-col items-center justify-center gap-4 p-6 border-2 border-content/20 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer " + theme.bg + " hover:" + theme.border}
                      >
                        <div className="absolute inset-0 bg-gold/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                        {opt.icon && <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform">{opt.icon}</span>}
                        <span className="font-bold text-lg text-center z-10">{opt.label || opt.text}</span>
                      </button>
                    ))}
                    </div>
                  </div>
                )}
`;

// regex to match the old MCQ render block
const regexMCQ = /\{data\.format === 'matching' \? \([\s\S]*?<\/div>\n\s*\)\}/;
content = content.replace(regexMCQ, interactiveMcq);

// 4. Update ObjectiveTracker instructions
content = content.replace(
  /case 5: return "Next: Construct the required era structures.";/,
  `case 5: return "Next: Construct the required era structures.";
      case 6: return "Next: Claim your rewards.";
      case 7: return "Next: Complete the level.";`
);

content = content.replace(
  /case 5: return \`Build \$\{levelState\.builtItems\.length\}\/\\$\{targetBuilds\}\`;/,
  `case 5: return \`Build \${levelState.builtItems.length}/\${targetBuilds}\`;
      case 6: return "Rewards Ready";
      case 7: return "Level Complete";`
);

content = content.replace(
  /case 5: return "BUILD \/ MANAGE";/,
  `case 5: return "BUILD / MANAGE";
      case 6: return "REWARD";
      case 7: return "COMPLETE";`
);


// 5. Enhance global CSS for fillBar animation if needed
// Instead of messing with CSS files, we can inject a style tag.
const styleInject = `
  useEffect(() => {
    if (!document.getElementById('explore-styles')) {
      const style = document.createElement('style');
      style.id = 'explore-styles';
      style.innerHTML = \`
        @keyframes fillBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      \`;
      document.head.appendChild(style);
    }
  }, []);
`;
content = content.replace(
  /const ExplorePanel = \(\{[^\}]+\}\) => \{/,
  `const ExplorePanel = ({ data, theme, ageGroup, isYoung, isReplay, playSound, updateResources, setLevelState, markExplored }) => {
  ${styleInject}`
);


fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', content);
console.log('Successfully upgraded LevelEngine.jsx loop!');
