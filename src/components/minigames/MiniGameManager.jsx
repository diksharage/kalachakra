import React, { useState, useEffect, useMemo } from 'react';
import { Star, CheckCircle, XCircle, X, Clock, MapPin, Navigation, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { adaptTextForAge } from '../../utils/ageAdapter';
import { useLanguage } from '../../context/LanguageContext';

const getBand = (ageGroup) => {
  if (ageGroup === '6-8' || ageGroup === '9-11') return 'younger';
  if (ageGroup === '12-14' || ageGroup === '15-17') return 'middle';
  return 'older';
};

const MiniGameShell = ({ levelId, title, instructions, progressText, onClose, children, theme }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full flex flex-col min-h-[50vh] md:min-h-[60vh] max-h-[85vh] text-left relative">
      <div className={`w-full flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-content/10 ${theme?.bg || 'bg-surface/20'}`}>
         <div className="flex flex-col flex-1 pr-4">
            <span className={`text-[10px] uppercase font-bold tracking-widest ${theme?.primary || 'text-gold'} opacity-80`}>Level ${levelId}</span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-content leading-tight">{title}</h3>
         </div>
         <button onClick={onClose} className="absolute md:relative top-2 md:top-0 right-2 md:right-0 p-2 md:p-3 rounded-full hover:bg-surface/50 text-content/60 hover:text-content transition-colors focus:outline-none focus:ring-2 focus:ring-gold" aria-label="Close Mini-Game">
           <X size={24} />
         </button>
      </div>
      
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between p-4 bg-surface/30 border-b border-content/5 gap-3 md:gap-4 shrink-0">
         <p className="text-sm md:text-base font-medium text-content/80 flex-1 leading-relaxed">{instructions}</p>
         {progressText && (
           <div className="px-3 py-1.5 rounded-lg bg-surface/50 border border-content/10 text-xs font-bold whitespace-nowrap text-content shrink-0" aria-live="polite">
             {progressText}
           </div>
         )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col">
         {children}
      </div>
    </div>
  );
};

const ArtifactMatch = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const band = getBand(ageGroup);
  const [matches, setMatches] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [errors, setErrors] = useState(0);
  const [feedback, setFeedback] = useState(null);
  
  const activePairs = useMemo(() => {
    let pairs = config.pairs;
    if (band === 'younger' && pairs.length > 3) pairs = pairs.slice(0, 3);
    return pairs;
  }, [config, band]);

  const leftItems = useMemo(() => [...activePairs].sort(() => Math.random() - 0.5), [activePairs]);
  const rightItems = useMemo(() => [...activePairs].sort(() => Math.random() - 0.5), [activePairs]);

  useEffect(() => {
    setProgress(`${Object.keys(matches).length} / ${activePairs.length} Matched`);
  }, [matches, activePairs, setProgress]);

  const handleLeftClick = (id) => {
    if (!matches[id]) { setSelectedLeft(id); setFeedback(null); }
  };

  const handleRightClick = (rightId) => {
    if (!selectedLeft) return;
    const pair = leftItems.find(p => p.id === selectedLeft);
    if (pair.id === rightId) {
      setMatches(prev => ({ ...prev, [selectedLeft]: rightId }));
      setFeedback({ id: rightId, type: 'correct' });
      setSelectedLeft(null);
    } else {
      setErrors(e => e + 1);
      setFeedback({ id: rightId, type: 'incorrect' });
      setSelectedLeft(null);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  useEffect(() => {
    if (Object.keys(matches).length === activePairs.length) {
      const margin = band === 'older' ? 0 : 2; 
      const stars = errors === 0 ? 3 : errors <= margin ? 2 : 1;
      const score = Math.max(10, config.maxScore - (errors * (band === 'older' ? 20 : 10)));
      setTimeout(() => onComplete(true, score, stars), 800);
    }
  }, [matches, activePairs.length, config, onComplete, errors, band]);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto motion-safe:animate-fade-in">
      <div className="flex-1 space-y-3">
        {band === 'younger' && <div className="text-sm font-bold text-blue-400 mb-2 bg-blue-900/20 p-3 rounded-xl">{t('minigame.hint_match', "Hint: Look at the pictures to find the right match!")}</div>}
        {leftItems.map(item => {
          const isMatched = matches[item.id];
          const isSelected = selectedLeft === item.id;
          return (
            <button
              key={'l-'+item.id}
              onClick={() => handleLeftClick(item.id)}
              disabled={isMatched}
              className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all text-left focus:outline-none focus:ring-2 focus:ring-gold
                ${isMatched ? 'opacity-50 bg-green-900/20 border-green-500/30' : 
                  isSelected ? 'border-gold bg-gold/10 scale-[1.02] shadow-md' : 'bg-surface border-content/20 hover:border-gold/50 hover:bg-surface/50'}`}
            >
              {band !== 'older' && <div className="text-3xl shrink-0">{item.icon}</div>}
              <div className="font-bold flex-1 text-sm md:text-base">{adaptTextForAge(item.left, ageGroup)}</div>
              {isMatched && <CheckCircle className="text-green-500 shrink-0" size={20} />}
            </button>
          );
        })}
      </div>
      <div className="flex-1 space-y-3">
        {band === 'older' && <div className="text-sm font-bold text-red-400 mb-2 bg-red-900/20 p-3 rounded-xl border border-red-500/30 flex items-center gap-2"><AlertCircle size={16}/> {t('minigame.hard_mode', "Challenge Mode: Visual hints disabled. High accuracy required.")}</div>}
        {rightItems.map(item => {
          const isMatched = Object.values(matches).includes(item.id);
          const isErr = feedback?.id === item.id && feedback.type === 'incorrect';
          const isCorr = feedback?.id === item.id && feedback.type === 'correct';
          return (
            <button
              key={'r-'+item.id}
              onClick={() => handleRightClick(item.id)}
              disabled={isMatched}
              className={`w-full p-4 rounded-xl border transition-all text-sm md:text-base flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gold
                ${isMatched ? 'opacity-50 bg-green-900/20 border-green-500/30' : 
                  isErr ? 'bg-red-900/20 border-red-500/50 motion-safe:animate-shake' :
                  selectedLeft ? 'bg-surface border-content/40 hover:border-gold hover:bg-gold/10 cursor-pointer shadow-sm' : 
                  'bg-surface/50 border-content/10 cursor-default opacity-80'}`}
            >
              <span className="flex-1 text-left">{adaptTextForAge(item.right, ageGroup)}</span>
              {isErr && <XCircle className="text-red-400 shrink-0 ml-3" size={18} />}
              {isCorr && <CheckCircle className="text-green-400 shrink-0 ml-3" size={18} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TimelineGame = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const band = getBand(ageGroup);
  const [items, setItems] = useState([]);
  const [moves, setMoves] = useState(0);
  
  const activeEvents = useMemo(() => {
    let evts = config.events;
    if (band === 'younger' && evts.length > 3) evts = evts.slice(0, 3);
    return evts;
  }, [config, band]);

  useEffect(() => {
    setItems([...activeEvents].sort(() => Math.random() - 0.5));
  }, [activeEvents]);

  useEffect(() => {
    setProgress(`${moves} Moves Made`);
  }, [moves, setProgress]);

  const moveItem = (index, direction) => {
    const newItems = [...items];
    if (direction === 'up' && index > 0) {
      [newItems[index-1], newItems[index]] = [newItems[index], newItems[index-1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index+1], newItems[index]] = [newItems[index], newItems[index+1]];
    }
    setItems(newItems);
    setMoves(m => m + 1);
  };

  const checkOrder = () => {
    let isCorrect = true;
    for (let i = 0; i < items.length; i++) {
      if (items[i].order !== i + 1) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect && items.length > 0) {
      const optimalMoves = activeEvents.length;
      const margin = band === 'older' ? 0 : 3;
      const stars = moves <= optimalMoves ? 3 : moves <= optimalMoves + margin ? 2 : 1;
      const score = Math.max(10, config.maxScore - (Math.max(0, moves - optimalMoves) * (band === 'older' ? 15 : 5)));
      onComplete(true, score, stars);
    }
  };

  useEffect(() => {
    checkOrder();
  }, [items]);

  return (
    <div className="w-full space-y-3 motion-safe:animate-fade-in max-w-2xl mx-auto">
      {band === 'younger' && <div className="text-sm font-bold text-blue-400 bg-blue-900/20 p-3 rounded-xl text-center mb-4">{t('minigame.hint_timeline', "Hint: Move the oldest event to the very top!")}</div>}
      {items.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-4 bg-surface border border-content/20 p-3 md:p-4 rounded-xl hover:border-content/40 transition-colors">
          <div className="flex flex-col gap-1 text-content/40">
            <button aria-label="Move Up" disabled={idx === 0} onClick={() => moveItem(idx, 'up')} className="hover:text-gold disabled:opacity-30 p-1 focus:outline-none focus:text-gold">▲</button>
            <button aria-label="Move Down" disabled={idx === items.length - 1} onClick={() => moveItem(idx, 'down')} className="hover:text-gold disabled:opacity-30 p-1 focus:outline-none focus:text-gold">▼</button>
          </div>
          <div className="flex-1 font-medium text-sm md:text-base leading-snug">{adaptTextForAge(item.label, ageGroup)}</div>
        </div>
      ))}
    </div>
  );
};

const BuildFromMemory = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const band = getBand(ageGroup);
  
  const eventTimeBonus = useMemo(() => {
    let bonus = 0;
    if (gameState.activeLevelId === 3 && gameState.completedEvents?.['evt_l3_water']) bonus += 3;
    if (gameState.activeLevelId === 6 && gameState.completedEvents?.['evt_l6_road']) bonus += 3;
    return bonus;
  }, [gameState.activeLevelId, gameState.completedEvents]);

  const initialTime = useMemo(() => {
    let base = config.memorizeTime || 5;
    if (band === 'younger') base += 5;
    if (band === 'older') base = Math.max(2, base - 2);
    return base + eventTimeBonus;
  }, [config, band, eventTimeBonus]);

  const activeComponents = useMemo(() => {
    let comps = [...config.components];
    if (band === 'younger') {
      const required = comps.filter(c => c.required);
      const distractors = comps.filter(c => !c.required).slice(0, 1);
      return [...required, ...distractors];
    }
    return comps;
  }, [config, band]);

  const [phase, setPhase] = useState('memorize');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (phase === 'memorize') {
      setProgress(`Time remaining: ${timeLeft}s`);
      if (timeLeft <= 0) {
        setPhase('build');
        return;
      }
      const tId = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(tId);
    } else {
       const reqs = activeComponents.filter(c => c.required).length;
       setProgress(`${selected.length} / ${reqs} Selected`);
    }
  }, [phase, timeLeft, selected.length, activeComponents, setProgress]);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setErrorMsg('');
  };

  const verifyBuild = () => {
    const requiredIds = activeComponents.filter(c => c.required).map(c => c.id);
    const hasAllRequired = requiredIds.every(id => selected.includes(id));
    const hasNoExtra = selected.every(id => activeComponents.find(c => c.id === id)?.required);
    
    if (hasAllRequired && hasNoExtra) {
      const stars = attempts === 1 ? 3 : attempts === 2 ? 2 : 1;
      const penalty = band === 'older' ? 30 : 20;
      const score = Math.max(10, config.maxScore - ((attempts - 1) * penalty));
      onComplete(true, score, stars);
    } else {
      setAttempts(a => a + 1);
      setErrorMsg(t('minigame.build_fail', "Incorrect blueprint! The structure collapsed."));
      setSelected([]);
    }
  };

  if (phase === 'memorize') {
    return (
      <div className="text-center motion-safe:animate-fade-in w-full flex flex-col items-center justify-center flex-1">
        {band === 'younger' && <div className="text-sm font-bold text-blue-400 bg-blue-900/20 p-3 rounded-xl text-center max-w-md mx-auto mb-4">{t('minigame.hint_memorize', "Study the pieces carefully! You will have to remember them.")}</div>}
        {band === 'older' && <div className="text-sm font-bold text-red-400 mb-4 flex items-center justify-center gap-2 bg-red-900/20 px-4 py-2 rounded-xl"><AlertCircle size={16}/> {t('minigame.hard_memory', "Efficiency constraint active: Time reduced.")}</div>}
        {eventTimeBonus > 0 && <div className="text-sm font-bold text-green-400 mb-4 flex items-center justify-center gap-2 bg-green-900/20 px-4 py-2 rounded-xl"><CheckCircle size={16}/> World Event Bonus: +{eventTimeBonus}s Memory Time!</div>}
        <h4 className="text-xl md:text-2xl font-bold mb-4">{t('minigame.memorize', "Memorize the Required Components!")}</h4>
        <div className="text-5xl md:text-7xl font-mono text-gold mb-10 drop-shadow-[0_0_15px_rgba(212,166,74,0.5)]">{timeLeft}s</div>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {activeComponents.filter(c => c.required).map(c => (
            <div key={c.id} className="w-28 h-28 md:w-32 md:h-32 bg-main border border-gold/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center shadow-[0_0_20px_rgba(212,166,74,0.15)]">
              <span className="text-4xl mb-2">{c.icon}</span>
              <span className="text-xs font-bold text-content/80 leading-tight">{adaptTextForAge(c.label, ageGroup)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="motion-safe:animate-fade-in text-center flex flex-col items-center w-full max-w-4xl mx-auto">
      {errorMsg && <div className="text-red-400 font-bold mb-6 bg-red-900/20 border border-red-500/30 py-3 rounded-xl inline-flex items-center gap-2 px-6 motion-safe:animate-shake"><XCircle size={20} /> {errorMsg}</div>}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
        {[...activeComponents].sort(() => Math.random() - 0.5).map(c => (
          <button
            key={c.id}
            onClick={() => toggleSelect(c.id)}
            className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center transition-all border focus:outline-none focus:ring-2 focus:ring-gold
              ${selected.includes(c.id) ? 'bg-gold/20 border-gold shadow-[0_0_15px_rgba(212,166,74,0.3)] scale-105' : 'bg-surface border-content/20 hover:border-gold/50 hover:bg-surface/60'}`}
          >
            <span className="text-4xl mb-3">{c.icon}</span>
            <span className="text-xs md:text-sm font-bold text-content/80 leading-tight">{adaptTextForAge(c.label, ageGroup)}</span>
          </button>
        ))}
      </div>
      <button onClick={verifyBuild} className="px-8 py-4 bg-gold text-main font-bold rounded-xl shadow-[0_0_20px_rgba(212,166,74,0.4)] hover:scale-105 transition-transform text-lg">
        {t('common.confirm', "Confirm Build")}
      </button>
    </div>
  );
};

const HistoricalDecision = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const band = getBand(ageGroup);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
     setProgress(`Scenario ${currentIndex + 1} of ${config.scenarios.length}`);
  }, [currentIndex, config.scenarios.length, setProgress]);

  const currentScenario = config.scenarios[currentIndex];
  
  const activeOptions = useMemo(() => {
    let opts = currentScenario.options;
    if (band === 'younger' && opts.length > 2) opts = opts.slice(0, 2);
    return opts;
  }, [currentScenario, band]);

  const handleChoice = (option) => {
    setScore(s => s + (option.score || 0));
    setFeedback({ text: adaptTextForAge(option.response, ageGroup), isGood: (option.score || 0) > 0 });
    
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < config.scenarios.length) {
        setCurrentIndex(i => i + 1);
      } else {
        const finalScore = score + (option.score || 0);
        const maxPossible = config.scenarios.length * 10;
        const stars = finalScore >= maxPossible ? 3 : finalScore > 0 ? 2 : 1;
        onComplete(true, Math.max(10, finalScore), stars);
      }
    }, 2500);
  };

  if (feedback) {
    return (
      <div className="w-full text-center motion-safe:animate-fade-in py-12 px-4 flex flex-col items-center justify-center h-full">
        <div className={`text-6xl md:text-8xl mb-6 ${feedback.isGood ? 'text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]'}`}>
          {feedback.isGood ? <CheckCircle size={80} className="mx-auto" /> : <XCircle size={80} className="mx-auto" />}
        </div>
        <p className="text-xl md:text-2xl font-bold mb-4 max-w-lg leading-relaxed">{feedback.text}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto motion-safe:animate-fade-in flex flex-col items-center text-center px-2">
      {band === 'older' && <div className="bg-red-900/20 text-red-400 px-4 py-2 rounded-xl border border-red-500/30 mb-6 text-sm font-bold flex items-center gap-2"><AlertCircle size={16}/> {t('minigame.strategic_mode', "Strategic Mode Active")}</div>}
      
      <h4 className="text-xl md:text-3xl font-serif mb-8 leading-relaxed text-content/90">{adaptTextForAge(currentScenario.text, ageGroup)}</h4>
      
      {band === 'younger' && (
        <div className="bg-blue-900/20 border border-blue-500/30 text-blue-400 p-4 rounded-xl mb-8 text-sm md:text-base font-bold text-left flex items-start gap-3 w-full">
          <AlertCircle size={20} className="shrink-0 mt-0.5" /> 
          <span>{t('minigame.hint_decision', "Think carefully about what helps your community survive and grow!")}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        {activeOptions.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleChoice(opt)}
            className="p-5 md:p-6 rounded-2xl border border-content/20 bg-surface hover:border-gold hover:bg-gold/5 transition-all text-base md:text-lg font-medium flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <span className="text-left flex-1 leading-snug pr-4">{adaptTextForAge(opt.label, ageGroup)}</span>
            <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

const TradeRoute = ({ config, onComplete, theme, ageGroup, setProgress }) => {
  const { t } = useLanguage();
  const band = getBand(ageGroup);
  const [currentLeg, setCurrentLeg] = useState(0);
  const [failures, setFailures] = useState(0);
  const [failedMsg, setFailedMsg] = useState('');
  
  const leg = config.legs[currentLeg];

  useEffect(() => {
     setProgress(`Route Progress: ${currentLeg} / ${config.legs.length}`);
  }, [currentLeg, config.legs.length, setProgress]);

  const handleSelect = (isCorrect) => {
    if (isCorrect) {
      if (currentLeg + 1 < config.legs.length) {
        setCurrentLeg(l => l + 1);
        setFailedMsg('');
      } else {
        const stars = failures === 0 ? 3 : failures === 1 ? 2 : 1;
        const score = Math.max(10, config.maxScore - (failures * 20));
        onComplete(true, score, stars);
      }
    } else {
      setFailures(f => f + 1);
      if (band === 'older') {
         setFailedMsg(t('minigame.route_reset', 'Incorrect route! A storm destroyed your cargo. The journey restarts.'));
         setTimeout(() => {
           setCurrentLeg(0);
           setFailedMsg('');
         }, 3000);
      } else {
         setFailedMsg(t('minigame.route_delay', 'Incorrect route! The caravan lost time. Try again.'));
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto motion-safe:animate-fade-in px-2 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-6 px-2 shrink-0 hide-scrollbar">
        {config.legs.map((l, i) => (
          <React.Fragment key={i}>
            <div className={`flex flex-col items-center gap-2 ${i <= currentLeg ? 'text-gold' : 'text-content/30'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors
                ${i < currentLeg ? 'bg-gold text-main border-gold shadow-[0_0_15px_rgba(212,166,74,0.4)]' : i === currentLeg ? 'border-gold motion-safe:animate-pulse bg-gold/10' : 'border-content/20 bg-surface'}`}>
                {i < currentLeg ? <CheckCircle size={24} /> : <MapPin size={24} />}
              </div>
              <span className="text-xs md:text-sm font-bold whitespace-nowrap hidden md:block max-w-[100px] truncate text-center">{adaptTextForAge(l.start, ageGroup)}</span>
            </div>
            <div className={`flex-1 h-1.5 mx-2 rounded-full shrink-0 transition-colors ${i < currentLeg ? 'bg-gold shadow-[0_0_10px_rgba(212,166,74,0.4)]' : 'bg-content/10'}`}></div>
          </React.Fragment>
        ))}
        <div className="flex flex-col items-center gap-2 text-content/30">
          <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-content/20 shrink-0 bg-surface">
            <Star size={24} />
          </div>
          <span className="text-xs md:text-sm font-bold whitespace-nowrap hidden md:block">{t('minigame.destination', "Destination")}</span>
        </div>
      </div>

      <div className="bg-surface/50 p-6 md:p-8 rounded-2xl border border-content/10 text-center relative flex-1 flex flex-col justify-center">
        <h4 className="text-xl md:text-2xl font-bold mb-3">{t('minigame.departing', "Departing from")} {adaptTextForAge(leg.start, ageGroup)}</h4>
        <p className="text-base md:text-lg text-content/80 mb-8 max-w-2xl mx-auto leading-relaxed">{adaptTextForAge(leg.context, ageGroup)}</p>
        
        {band === 'younger' && <div className="bg-blue-900/20 text-blue-400 p-3 rounded-xl mb-6 text-sm md:text-base font-bold border border-blue-500/30">{t('minigame.hint_route', "Review the map visually to pick the most logical next step.")}</div>}
        {band === 'older' && <div className="bg-red-900/20 text-red-400 p-3 rounded-xl mb-6 text-sm font-bold border border-red-500/30 flex items-center justify-center gap-2"><AlertCircle size={18}/> {t('minigame.hard_route', "Any incorrect path resets the entire expedition.")}</div>}

        {failedMsg && <div className="bg-red-900/30 border border-red-500/40 text-red-400 p-4 mb-6 text-sm md:text-base font-bold rounded-xl flex items-center justify-center gap-3 motion-safe:animate-shake"><XCircle size={20}/> {failedMsg}</div>}

        <div className="grid md:grid-cols-2 gap-4 w-full">
          {leg.options.map((opt, i) => (
            <button
              key={i}
              disabled={!!failedMsg}
              onClick={() => handleSelect(opt.isCorrect)}
              className="p-5 md:p-6 rounded-xl border border-content/20 bg-surface hover:border-gold hover:bg-gold/10 transition-all text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <span className="font-medium text-base md:text-lg pr-4">{adaptTextForAge(opt.label, ageGroup)}</span>
              <Navigation size={24} className="text-gold/50 group-hover:text-gold transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MiniGameManager = ({ gameConfig, challengeData, theme, ageGroup, onComplete, onClose }) => {
  const { t } = useLanguage();
  const [gameStateStage, setGameStateStage] = useState('intro');
  const [activeVariation, setActiveVariation] = useState(null);
  const [result, setResult] = useState(null);
  const [progressText, setProgressText] = useState("");
  const { gameState, saveMiniGameResult, updateResources, unlockArtifact, unlockAchievement } = useGame();

  useEffect(() => {
    if (gameConfig?.variations && !activeVariation) {
       const previous = gameState.miniGameResults?.[gameConfig.id] || {};
       const lastVar = previous.lastVariation;
       let available = gameConfig.variations.filter(v => v.variationId !== lastVar);
       if (available.length === 0) available = gameConfig.variations;
       const picked = available[Math.floor(Math.random() * available.length)];
       setActiveVariation(picked);
    }
  }, [gameConfig, gameState, activeVariation]);

  const activeConfig = activeVariation || gameConfig;
  
  if (!activeConfig) return null;

  const previousBest = gameState.miniGameResults?.[gameConfig.id];
  const isReplay = !!previousBest;

  const handleSubGameComplete = (success, score, stars) => {
    setResult({ success, score, stars });
    setGameStateStage('result');
    if (success) {
      saveMiniGameResult(gameConfig.id, score, stars, activeVariation?.variationId);
      
      if (!isReplay && activeVariation?.rewards) {
        activeVariation.rewards.forEach(r => {
          // Add to inventory counts so it appears in the Inventory Page
          if (['resource', 'artifact', 'knowledge'].includes(r.type)) {
            updateResources({ [r.id]: r.amount || 1 });
          }
          // Unlock in Library / Heritage pages
          if (['artifact', 'knowledge'].includes(r.type)) {
            unlockArtifact(r.id);
          }
          // Unlock Profile Badges
          if (r.type === 'achievement') {
            unlockAchievement(r.id);
          }
          // Core currencies
          if (r.type === 'legacy') {
            updateResources({ legacy: r.amount });
          }
        });
      }
    }
  };

  const handleFinalContinue = () => {
    onComplete(true, result.score);
  };
  
  const levelTitle = t(`levels.${gameState.activeLevelId}.title`) || `Level ${gameState.activeLevelId}`;

  if (gameStateStage === 'intro') {
    return (
      <MiniGameShell 
         levelId={gameState.activeLevelId}
         title={adaptTextForAge(activeConfig.title, ageGroup)}
         instructions={t('minigame.ready', "Read the details below before starting the objective.")}
         onClose={onClose}
         theme={theme}
      >
        <div className="w-full text-center motion-safe:animate-fade-in flex flex-col items-center justify-center flex-1 py-8 px-4">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gold/10 rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,166,74,0.15)]">
            <Star className="text-gold w-10 h-10 md:w-12 md:h-12" />
          </div>
          <p className="text-lg md:text-xl text-content/80 mb-10 max-w-2xl mx-auto leading-relaxed">{adaptTextForAge(activeConfig.description, ageGroup)}</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            <div className="bg-surface/50 border border-content/10 px-5 py-3 rounded-2xl flex flex-col items-center gap-1 shadow-sm">
              <span className="text-content/50 uppercase text-[10px] md:text-xs font-bold tracking-widest">{t('common.difficulty', 'Difficulty')}</span>
              <span className="font-bold capitalize text-content text-sm md:text-base">{getBand(ageGroup)}</span>
            </div>
            {activeConfig.timeLimit && (
              <div className="bg-surface/50 border border-content/10 px-5 py-3 rounded-2xl flex flex-col items-center gap-1 shadow-sm">
                <span className="text-content/50 uppercase text-[10px] md:text-xs font-bold tracking-widest">{t('common.time', 'Time Limit')}</span>
                <span className="font-bold text-red-400 text-sm md:text-base flex items-center gap-1"><Clock size={16}/> {activeConfig.timeLimit}s</span>
              </div>
            )}
            {isReplay && previousBest && (
              <div className="bg-surface/50 border border-content/10 px-5 py-3 rounded-2xl flex flex-col items-center gap-1 shadow-sm">
                <span className="text-content/50 uppercase text-[10px] md:text-xs font-bold tracking-widest">{t('minigame.best_score', 'Best Score')}</span>
                <span className="font-bold text-gold flex items-center gap-1.5 text-sm md:text-base">
                  {previousBest.score} 
                  <span className="flex text-xs ml-0.5">
                    {[1,2,3].map(s => <Star key={s} size={12} className={s <= previousBest.stars ? "fill-gold text-gold" : "text-content/30"} />)}
                  </span>
                </span>
              </div>
            )}
          </div>

          <button 
            onClick={() => setGameStateStage('playing')}
            className="px-10 py-4 bg-gold text-main font-bold rounded-2xl shadow-[0_0_20px_rgba(212,166,74,0.4)] hover:scale-105 transition-all text-lg md:text-xl w-full md:w-auto focus:outline-none focus:ring-4 focus:ring-gold/50"
          >
            {isReplay ? (t('minigame.replay', 'Replay Mini-Game')) : (t('minigame.start', 'Start Mini-Game'))}
          </button>
        </div>
      </MiniGameShell>
    );
  }

  if (gameStateStage === 'result' && result) {
    return (
      <MiniGameShell 
         levelId={gameState.activeLevelId}
         title={t('minigame.complete', 'Scenario Complete!')}
         instructions={t('minigame.result_desc', "Review your performance and rewards below.")}
         onClose={onClose}
         theme={theme}
      >
        <div className="w-full text-center motion-safe:animate-fade-in flex flex-col items-center justify-center flex-1 py-6 px-2">
          
          <div className="flex justify-center gap-3 mb-10">
            {[1,2,3].map(s => (
              <Star 
                key={s} 
                size={56} 
                className={`transition-all duration-700 delay-${s * 150} ${s <= result.stars ? 'fill-gold text-gold scale-110 drop-shadow-[0_0_25px_rgba(212,166,74,0.6)]' : 'text-content/10 scale-90'}`} 
              />
            ))}
          </div>

          <div className="bg-surface/80 border border-content/10 p-6 md:p-8 rounded-3xl max-w-md w-full mx-auto mb-10 flex flex-col gap-4 text-left shadow-xl">
            <div className="flex justify-between items-center text-lg md:text-xl">
              <span className="text-content/60 font-bold uppercase tracking-widest text-sm">{t('minigame.final_score', 'Final Score')}</span>
              <span className="font-bold font-mono text-3xl text-gold drop-shadow-md">{result.score}</span>
            </div>
            
            {previousBest && (
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-content/40 font-bold uppercase tracking-wider">{t('minigame.prev_best', 'Previous Best')}</span>
                <span className="font-bold font-mono text-content/60 text-base">{previousBest.score}</span>
              </div>
            )}

            <div className="pt-5 mt-3 border-t border-content/10 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm md:text-base">
                <span className="text-content/60 font-bold uppercase tracking-wider">{t('minigame.mastery_earned', 'Mastery Earned')}</span>
                <span className="font-bold text-blue-400 bg-blue-900/20 px-2 py-1 rounded-md">+{result.score}</span>
              </div>
              {!isReplay && activeConfig.rewards && activeConfig.rewards.length > 0 && (
                <div className="mt-2 flex flex-col gap-2 pt-2">
                   <h5 className="text-xs uppercase font-bold text-content/50 mb-1">{t('minigame.rewards', 'Rewards Earned')}</h5>
                   {activeConfig.rewards.map((r, i) => (
                     <div key={i} className="flex flex-col p-3 bg-surface/60 rounded-xl border border-content/10">
                        <div className="flex justify-between items-center mb-1">
                           <span className="font-bold text-gold text-sm">{r.amount > 1 ? `+${r.amount} ` : ''}{adaptTextForAge(r.label, ageGroup)}</span>
                           <span className="text-[10px] uppercase bg-green-900/30 text-green-400 px-2 py-0.5 rounded font-bold border border-green-500/20 shadow-sm">{r.destination}</span>
                        </div>
                        <span className="text-xs text-content/60 font-medium">{r.usage}</span>
                     </div>
                   ))}
                </div>
              )}
              {isReplay && (
                 <div className="text-xs text-center text-content/40 mt-3 italic bg-surface p-2 rounded-lg">
                   {t('minigame.no_farm', 'Resource rewards are only granted on first completion.')}
                 </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-md mx-auto">
            <button 
              onClick={() => { setResult(null); setActiveVariation(null); setGameStateStage('intro'); }}
              className="px-6 py-4 border-2 border-content/20 hover:border-content/50 hover:bg-surface/50 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 w-full flex-1 focus:outline-none focus:ring-2 focus:ring-content/50"
            >
              <RotateCcw size={20} /> {t('common.replay', 'Replay')}
            </button>
            <button 
              onClick={handleFinalContinue}
              className="px-8 py-4 bg-gold text-main font-bold rounded-2xl shadow-[0_0_20px_rgba(212,166,74,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2 w-full flex-1 focus:outline-none focus:ring-4 focus:ring-gold/50 text-lg"
            >
              {t('common.continue', 'Continue')} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </MiniGameShell>
    );
  }

  return (
    <MiniGameShell
      levelId={gameState.activeLevelId}
      title={adaptTextForAge(activeConfig.title, ageGroup)}
      instructions={adaptTextForAge(activeConfig.description, ageGroup)}
      progressText={progressText}
      onClose={onClose}
      theme={theme}
    >
      {activeConfig.type === 'artifactMatch' && <ArtifactMatch config={activeConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} setProgress={setProgressText} />}
      {activeConfig.type === 'timeline' && <TimelineGame config={activeConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} setProgress={setProgressText} />}
      {activeConfig.type === 'buildFromMemory' && <BuildFromMemory config={activeConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} setProgress={setProgressText} />}
      {activeConfig.type === 'historicalDecision' && <HistoricalDecision config={activeConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} setProgress={setProgressText} />}
      {activeConfig.type === 'tradeRoute' && <TradeRoute config={activeConfig} onComplete={handleSubGameComplete} theme={theme} ageGroup={ageGroup} setProgress={setProgressText} />}
    </MiniGameShell>
  );
};

export default MiniGameManager;
