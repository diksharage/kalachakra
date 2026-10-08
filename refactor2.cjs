const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const replaceStart = code.indexOf('const renderPopup =');
const replaceEnd = code.indexOf('return (', replaceStart);

const newRenderPopup = `
  const renderPopup = () => {
    if (!activePopup) return null;
    const { type, data } = activePopup;

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className={\`glass-panel p-8 rounded-2xl max-w-lg w-full border \${theme.border} shadow-2xl text-center\`}>
          
          {type === 'discover' && (
            <>
              <div className="text-6xl mb-4">{data.icon}</div>
              <h3 className={\`text-2xl font-bold mb-2 uppercase \${theme.primary}\`}>{data.label}</h3>
              <p className="text-content/80 mb-6">You discovered something new!</p>
              <button onClick={() => handleNextStage(3, 'learn', data)} className={\`px-6 py-3 font-bold rounded-xl w-full \${theme.button}\`}>
                Analyze
              </button>
            </>
          )}

          {type === 'learn' && (
            <>
              <div className="text-6xl mb-4">{data.icon}</div>
              <h3 className={\`text-xl font-bold mb-4 uppercase \${theme.primary}\`}>{data.label} Context</h3>
              <p className="text-lg text-content mb-6">{data.discoverMessage || data.description}</p>
              <button onClick={() => {
                const playChallenge = Object.values(config.challenges)[0];
                handleNextStage(4, 'challenge', playChallenge);
              }} className={\`px-6 py-3 font-bold rounded-xl w-full \${theme.button}\`}>
                Play Activity
              </button>
            </>
          )}

          {type === 'challenge' && (
            <>
              <h3 className={\`text-xl font-bold mb-4 uppercase \${theme.primary}\`}>{stage === 4 ? "Play Activity" : "Solve Challenge"}: {data.title}</h3>
              <p className="text-lg text-content mb-6">{data.getQuestion ? data.getQuestion(gameState.ageGroup) : data.question}</p>
              <div className="space-y-3">
                {data.options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleChallengeAnswer(data, opt.isCorrect)}
                    className={\`w-full p-4 border border-content/20 rounded-xl flex items-center gap-4 transition-all text-left \${theme.bg} hover:\${theme.border} hover:border\`}
                  >
                    <span className="text-3xl opacity-80">{opt.icon || '❔'}</span>
                    <span className="font-medium text-lg">{opt.label || opt.text}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {type === 'reward' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">Rewards Earned!</h3>
              <p className="text-content/80 mb-6">You have gained resources for your civilization.</p>
              <button onClick={() => {
                updateResources(data);
                handleNextStage(7, null, null);
              }} className={\`px-6 py-3 font-bold rounded-xl w-full \${theme.button}\`}>
                Collect Resources
              </button>
            </>
          )}

          {type === 'error' && (
            <>
              <h3 className="text-2xl font-bold text-red-400 mb-2">{t('common.error')}</h3>
              <p className="text-content/80 mb-6">{data}</p>
              <button onClick={() => {
                const chal = stage === 4 ? Object.values(config.challenges)[0] : Object.values(config.challenges)[1] || Object.values(config.challenges)[0];
                setLevelState(prev => ({ ...prev, activePopup: { type: 'challenge', data: chal } }));
              }} className={\`px-6 py-3 font-bold rounded-xl w-full \${theme.button}\`}>
                {t('common.back')}
              </button>
            </>
          )}

          {type === 'completion' && config.id === 14 ? (
            <FinalSequence config={config} onComplete={() => navigate('/dashboard')} />
          ) : type === 'completion' && (
            <>
              <h3 className={\`text-3xl font-serif font-bold mb-2 \${theme.primary}\`}>dYZ% LEVEL COMPLETE</h3>
              <p className="text-content/80 mb-6">{config.completionPreview ? config.completionPreview.description : "You have completed this era."}</p>
              <button onClick={handleCompleteLevel} className={\`px-6 py-4 font-bold rounded-xl w-full shadow-lg \${theme.button}\`}>
                {config.nextLevelName ? t('dashboard.continueJourney') : t('nav.dashboard')}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

`;

code = code.substring(0, replaceStart) + newRenderPopup + code.substring(replaceEnd);
fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Done phase 2");
