const fs = require('fs');

let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

const additionalComponents = `
const MatchingGame = ({ data, onComplete, theme }) => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [failed, setFailed] = useState(false);

  const leftItems = useMemo(() => [...data.pairs.map(p => p.left)].sort(() => Math.random() - 0.5), [data]);
  const rightItems = useMemo(() => [...data.pairs.map(p => p.right)].sort(() => Math.random() - 0.5), [data]);

  const handleRightClick = (rightItem) => {
    if (!selectedLeft) return;
    const pair = data.pairs.find(p => p.left.id === selectedLeft.id);
    if (pair.right.id === rightItem.id) {
      const newMatches = { ...matches, [selectedLeft.id]: rightItem.id };
      setMatches(newMatches);
      setSelectedLeft(null);
      if (Object.keys(newMatches).length === data.pairs.length) {
        setTimeout(() => onComplete(true), 500);
      }
    } else {
      setSelectedLeft(null);
      setFailed(true);
      setTimeout(() => onComplete(false), 500);
    }
  };

  return (
    <div className="flex gap-4 w-full text-sm">
      <div className="flex-1 flex flex-col gap-2">
        {leftItems.map(item => (
          <button 
            key={item.id} 
            onClick={() => !matches[item.id] && setSelectedLeft(item)}
            disabled={!!matches[item.id] || failed}
            className={"p-3 rounded-lg border text-left transition-all " + (matches[item.id] ? 'bg-green-900/40 border-green-500 opacity-50' : selectedLeft?.id === item.id ? theme.bg + " " + theme.border + " ring-2 ring-gold" : 'bg-surface/40 hover:bg-surface/80')}
          >
            <span className="text-xl mr-2">{item.icon}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {rightItems.map(item => {
          const isMatched = Object.values(matches).includes(item.id);
          return (
            <button 
              key={item.id} 
              onClick={() => handleRightClick(item)}
              disabled={!selectedLeft || isMatched || failed}
              className={"p-3 rounded-lg border text-left transition-all " + (isMatched ? 'bg-green-900/40 border-green-500 opacity-50' : selectedLeft && !isMatched ? 'bg-surface hover:bg-surface/80 ring-1 ring-gold/50 cursor-pointer animate-pulse-slow' : 'bg-surface/20 opacity-70 cursor-not-allowed')}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const OrderingGame = ({ data, onComplete, theme }) => {
  const [selected, setSelected] = useState([]);
  const available = data.items.filter(item => !selected.includes(item.id));

  const handleSelect = (item) => {
    const newSelected = [...selected, item.id];
    setSelected(newSelected);
    if (newSelected.length === data.items.length) {
      const isCorrect = newSelected.every((id, idx) => id === data.correctOrder[idx]);
      setTimeout(() => onComplete(isCorrect), 500);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 min-h-[6rem] p-4 border border-dashed rounded-lg bg-surface/20">
        {selected.length === 0 && <span className="text-content/40 text-sm m-auto">Select items in correct sequence...</span>}
        {selected.map((id, idx) => {
          const item = data.items.find(i => i.id === id);
          return (
            <div key={id} className={"p-3 bg-surface border rounded-lg flex gap-3 text-left shadow-sm " + theme.border}>
              <span className={"font-bold opacity-60 " + theme.primary}>{idx + 1}.</span> 
              <span className="text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {available.map(item => (
          <button key={item.id} onClick={() => handleSelect(item)} className="p-3 border rounded-lg hover:bg-surface/80 bg-surface/40 text-sm">
            {item.label}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <button onClick={() => setSelected([])} className="text-xs opacity-50 mt-2 hover:opacity-100 uppercase tracking-widest font-bold">Reset Order</button>
      )}
    </div>
  );
};

`;

code = code.replace('const LevelEngine = ({ config }) => {', additionalComponents + '\nconst LevelEngine = ({ config }) => {');

const challengeBlockReplacement = `{type === 'challenge' && (
            <>
              <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>
              <p className="text-lg text-content mb-6">{data.getQuestion ? data.getQuestion(gameState.ageGroup) : data.question}</p>
              
              {data.format === 'matching' ? (
                <MatchingGame data={data} theme={theme} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
              ) : data.format === 'ordering' ? (
                <OrderingGame data={data} theme={theme} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
              ) : (
                <div className="space-y-3">
                  {(data.options || []).map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => handleChallengeAnswer(data, opt.isCorrect, isBuild)}
                      className={"w-full p-4 border border-content/20 rounded-xl flex items-center gap-4 transition-all text-left " + theme.bg + " hover:" + theme.border + " hover:border"}
                    >
                      {opt.icon && <span className="text-3xl opacity-80">{opt.icon}</span>}
                      <span className="font-medium text-lg">{opt.label || opt.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}`;

code = code.replace(
  /\{type === 'challenge' && \([\s\S]*?\)\s*\}/,
  challengeBlockReplacement
);

// We should also replace the error popup to show the explanation from the challenge!
const errorBlockReplacement = `{type === 'error' && (
            <>
              <h3 className="text-2xl font-bold text-red-400 mb-2">{t('common.error') || "Incorrect"}</h3>
              <p className="text-content/80 mb-6">{data}</p>
              {retry && retry.data && retry.data.explanation && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl mb-6 text-sm text-left">
                  <strong className="text-red-400 block mb-1">Feedback:</strong>
                  {retry.data.explanation}
                </div>
              )}
              <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: retry }))} className={"px-6 py-3 font-bold rounded-xl w-full " + theme.button}>
                {t('common.back') || "Retry Challenge"}
              </button>
            </>
          )}`;

code = code.replace(
  /\{type === 'error' && \([\s\S]*?\)\s*\}/,
  errorBlockReplacement
);

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Updated LevelEngine.jsx with mini-games and feedback!");
