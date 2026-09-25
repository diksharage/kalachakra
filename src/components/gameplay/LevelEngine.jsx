
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { minigamesData } from '../../data/minigames';
import MiniGameManager from '../minigames/MiniGameManager';
import FinalSequence from './FinalSequence';
import { useAchievements } from '../../context/AchievementContext';
import { Star, CheckCircle, ArrowRight, Bot, Target, Lock, Play, Hammer, Trophy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { levelThemes } from '../../data/levelThemes';
import ResourceCard from './ResourceCard';
import { getBuilderDataForLevel } from '../../data/civilizationBuilder';
import { artifactInvestigations } from '../../data/artifactInvestigations';
import { Search } from 'lucide-react';
import BackButton from '../common/BackButton';
import { adaptTextForAge, adaptQuestionForAge } from '../../utils/ageAdapter';


const InteractiveLearnNode = ({ data, onComplete, theme, isYoung, playSound, ageGroup }) => {
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };
  const [step, setStep] = useState(0);
  const [orderState, setOrderState] = useState([]);

  // Fallback string extraction
  const rawText = data.discoverMessage || data.description || "Historical context missing.";
  const fullText = adaptTextForAge(rawText, ageGroup);
  
  // Split into sentences for progressive learning
  const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
  const fact = sentences[0]?.trim() || fullText;
  const significance = sentences.slice(1).join(' ').trim() || (isYoung ? "It helped them progress." : "It played a key role in their civilization.");

  // Interaction type based on data string length
  const mode = sentences.length > 1 ? 'order' : 'reveal';

  const handleOrder = (chunk) => {
    if (playSound) playSound('ui');
    if (!orderState.includes(chunk)) {
      const nextState = [...orderState, chunk];
      setOrderState(nextState);
      if (nextState.length === 2) {
        if (nextState[0] === fact && nextState[1] === significance) {
           safeSetTimeout(() => setStep(2), 500);
        } else {
           safeSetTimeout(() => setOrderState([]), 800); // reset if wrong
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
           <p className="mt-4 opacity-70 text-sm">{adaptTextForAge(data.description, ageGroup)}</p>
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


const ObjectiveTracker = ({ stage, levelState, locations, targetExplore, targetDiscover, targetLearn, targetChallenges, targetBuilds, allChallenges, buildActions, handleLocationClick, startChallenge, setBuilderPopup, theme }) => {
  const getStageHeader = () => {
    switch(stage) {
      case 1: return "EXPLORE";
      case 2: return "DISCOVER";
      case 3: return "LEARN";
      case 4: return "PLAY + SOLVE";
      case 5: return "BUILD / MANAGE";
      default: return "";
    }
  };

  const getProgress = () => {
    switch(stage) {
      case 1: return `Explore ${levelState.exploration.length}/${targetExplore}`;
      case 2: return `Discover ${levelState.discovery.length}/${targetDiscover}`;
      case 3: return `Learn ${levelState.learning.length}/${targetLearn}`;
      case 4: return `Challenges ${levelState.completedChallenges.length}/${targetChallenges}`;
      case 5: return `Build ${levelState.builtItems.length}/${targetBuilds}`;
      default: return "";
    }
  };

  const getNextInstruction = () => {
    switch(stage) {
      case 1: return "Next: Find the remaining locations.";
      case 2: return "Next: Discover the remaining artifacts.";
      case 3: return "Next: Read the remaining historical contexts.";
      case 4: return "Next: Solve the next available challenge.";
      case 5: return "Next: Construct the required era structures.";
      default: return "";
    }
  };

  let items = [];
  
  if (stage === 1) {
    items = locations.map(loc => ({
       id: loc.id,
       label: `Explore ${loc.label}`,
       isDone: levelState.exploration.includes(loc.id),
       onClick: () => handleLocationClick(loc),
       isLocked: false
    })).slice(0, targetExplore);
  } else if (stage === 2) {
    items = locations.map(loc => {
       const isExplored = levelState.exploration.includes(loc.id);
       return {
         id: loc.id,
         label: `Investigate ${loc.label}`,
         isDone: levelState.discovery.includes(loc.id),
         isLocked: !isExplored,
         lockedReason: "Requires Exploration",
         onClick: () => handleLocationClick(loc),
         reward: loc.yields ? true : false
       };
    }).filter(i => i.isDone || !i.isLocked).slice(0, targetDiscover);
  } else if (stage === 3) {
    items = locations.map(loc => {
       const isDiscovered = levelState.discovery.includes(loc.id);
       return {
         id: loc.id,
         label: `Learn about ${loc.label}`,
         isDone: levelState.learning.includes(loc.id),
         isLocked: !isDiscovered,
         lockedReason: "Requires Discovery",
         onClick: () => handleLocationClick(loc)
       };
    }).filter(i => i.isDone || !i.isLocked).slice(0, targetLearn);
  } else if (stage === 4) {
    items = levelState.activeChallengeIds.map((id, idx) => {
       const chal = allChallenges.find(c => c.id === id);
       if (!chal) return null;
       return {
         id: chal.id,
         label: chal.title || `Solve Challenge ${idx+1}`,
         isDone: levelState.completedChallenges.includes(id),
         isLocked: false,
         onClick: () => startChallenge(chal),
         reward: true
       };
    }).filter(Boolean);
  } else if (stage === 5) {
    items = buildActions.map(bAction => {
       const isBuilt = levelState.builtItems.includes(bAction.id);
       const reqs = bAction.requirements || {};
       let canAfford = true;
       Object.keys(reqs).forEach(k => {
          if ((levelState.resources[k] || 0) < reqs[k]) canAfford = false;
       });
       return {
         id: bAction.id,
         label: `Construct ${bAction.nameKey}`,
         isDone: isBuilt,
         isLocked: !isBuilt && !canAfford,
         lockedReason: "Missing Resources",
         onClick: () => setBuilderPopup(bAction)
       };
    }).slice(0, targetBuilds);
  }

  // Ensure "Next" state is tracked accurately
  let foundPending = false;

  return (
    <div className={"glass-panel p-5 rounded-2xl border " + theme.border}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={"font-bold text-sm tracking-wider uppercase " + theme.primary}>
          {getStageHeader()}
        </h3>
        <span className="text-xs font-bold bg-surface/50 px-2 py-1 rounded border border-content/10">
          {getProgress()}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {items.map(item => {
           let stateIcon = <div className="w-4 h-4 rounded-full border border-content/30 flex-shrink-0" />;
           if (item.isDone) stateIcon = <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />;
           else if (item.isLocked) stateIcon = <Lock className="w-4 h-4 text-content/40 flex-shrink-0" />;
           else if (!foundPending) {
             foundPending = true;
             stateIcon = <div className={"w-4 h-4 rounded-full border-2 animate-pulse flex-shrink-0 " + theme.border + " " + theme.primaryBg} />;
           }

           return (
             <button 
               key={item.id} 
               onClick={item.onClick}
               disabled={item.isDone || item.isLocked}
               className={"flex items-center justify-between text-left p-2 rounded-lg transition-all " + (item.isDone ? 'opacity-60' : item.isLocked ? 'opacity-40 cursor-not-allowed bg-surface/20' : 'bg-surface/40 hover:bg-surface/80 border border-transparent hover:border-content/10')}
             >
                <div className="flex items-center gap-3">
                  {stateIcon}
                  <div className="flex flex-col">
                    <span className={"text-sm font-bold " + (item.isDone ? 'line-through' : '')}>{item.label}</span>
                    {item.isLocked && <span className="text-[10px] uppercase text-red-400">{item.lockedReason}</span>}
                  </div>
                </div>
                {item.reward && !item.isDone && <span className="text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded ml-2">🎁</span>}
             </button>
           );
        })}
      </div>
      
      {stage < 6 && (
        <div className="text-xs font-bold text-content/70 p-3 bg-surface/30 rounded-lg border border-content/5">
          {getNextInstruction()}
        </div>
      )}
    </div>
  );
};

const MatchingGame = ({ data, onComplete, theme, isYoung, playSound }) => {
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [failed, setFailed] = useState(false);

  const leftItems = useMemo(() => [...data.pairs.map(p => p.left)].sort(() => Math.random() - 0.5), [data]);
  const rightItems = useMemo(() => [...data.pairs.map(p => p.right)].sort(() => Math.random() - 0.5), [data]);

  const handleRightClick = (rightItem) => {
    if (playSound) playSound('ui');
    if (!selectedLeft) return;
    const pair = data.pairs.find(p => p.left.id === selectedLeft.id);
    if (pair.right.id === rightItem.id) {
      const newMatches = { ...matches, [selectedLeft.id]: rightItem.id };
      setMatches(newMatches);
      setSelectedLeft(null);
      if (Object.keys(newMatches).length === data.pairs.length) {
        safeSetTimeout(() => onComplete(true), 500);
      }
    } else {
      setSelectedLeft(null);
      setFailed(true);
      safeSetTimeout(() => onComplete(false), 500);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {isYoung && <div className="text-left w-full text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider animate-pulse-slow">💡 Hint: Look at the icons to figure out what goes together!</div>}
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
    </div>
  );
};

const OrderingGame = ({ data, onComplete, theme, isYoung, playSound }) => {
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };
  const [selected, setSelected] = useState([]);
  const available = data.items.filter(item => !selected.includes(item.id));

  const handleSelect = (item) => {
    if (playSound) playSound('ui');
    const newSelected = [...selected, item.id];
    setSelected(newSelected);
    if (newSelected.length === data.items.length) {
      const isCorrect = newSelected.every((id, idx) => id === data.correctOrder[idx]);
      safeSetTimeout(() => onComplete(isCorrect), 500);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {isYoung && <div className="text-left w-full text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider animate-pulse-slow">💡 Hint: Think about what you must do FIRST before you can do the next step!</div>}
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
    </div>
  );
};

const LevelEngine = ({ config }) => {
  const { t } = useLanguage();
  const { gameState, updateActiveLevelState, completeLevel, unlockArtifact, completeChallenge: globalCompleteChallenge, updateResources, notify, checkQuestProgress } = useGame();
  const { triggerEventAchievement } = useAchievements();
  const ageGroup = gameState.ageGroup || '9-11';
  const isYoung = ageGroup === '6-8' || ageGroup === '9-11';
  const isAdult = ageGroup === '18+';
  const navigate = useNavigate();
  const { playSound, startAmbience, stopAmbience } = useAudio();
  const isReplay = gameState.completedLevels.includes(config.id);

  useEffect(() => {
    startAmbience(config.id);
    return () => stopAmbience();
  }, [config.id, startAmbience, stopAmbience]);

  const levelInvestigation = useMemo(() => artifactInvestigations.find(inv => inv.levelId === config.id), [config.id]);

  const [lockToast, setLockToast] = useState(null);
  const [buildChoice, setBuildChoice] = useState(null);



  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const safeSetTimeout = (cb, ms) => { const id = setTimeout(cb, ms); timers.current.push(id); return id; };

  const locations = useMemo(() => typeof config.locations === 'function' ? config.locations(1) : config.locations, [config]);
  const allChallenges = useMemo(() => Object.values(config.challenges || {}), [config]);
  
  const builderData = useMemo(() => getBuilderDataForLevel(config.id), [config]);
  const buildActions = builderData.buildings;




  const isBeginner = config.id <= 3;
  const isIntermediate = config.id >= 4 && config.id <= 7;
  const isAdvanced = config.id >= 8 && config.id <= 11;

  const maxExplore = locations.length;
  const maxChallenges = allChallenges.length || 1;
  const maxBuilds = buildActions.length || 1;

  const targetExplore = Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5, maxExplore);
  const targetDiscover = targetExplore;
  const targetLearn = targetExplore;
  
  const targetChallenges = Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 4, maxChallenges);
  const targetBuilds = Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5, maxBuilds);

  const defaultState = {
    stage: 1, 
    exploration: [],
    discovery: [],
    learning: [],
    completedChallenges: [],
    activeChallengeIds: [],
    builtItems: [],
    resources: { ...config.defaultResources },
    activePopup: null
  };

  const [levelState, setLevelState] = useState(() => {
    const saved = gameState.activeLevelId === config.id && gameState.activeLevelState 
      ? gameState.activeLevelState : null;
    if (saved) {
      return {
        ...defaultState,
        ...saved,
        exploration: saved.exploration || saved.discovered || [],
        discovery: saved.discovery || [],
        learning: saved.learning || [],
        completedChallenges: saved.completedChallenges || [],
        activeChallengeIds: saved.activeChallengeIds || [],
        builtItems: saved.builtItems || [],
      };
    }
    return defaultState;
  });

  const theme = levelThemes[config.id] || levelThemes.default;

  const { stage, exploration, discovery, learning, completedChallenges, builtItems, resources, activePopup } = levelState;

  useEffect(() => {
    if (stage > 1 && stage < 6) {
      playSound('level_unlock');
    }
  }, [stage, playSound]);

  useEffect(() => {
    if (stage === 6 && !isReplay && config.id !== 14) {
      playSound('level_complete');
    }
  }, [stage, isReplay, config.id, playSound]);

  // Track stage upgrades for notifications
  const previousStage = useRef(stage);
  useEffect(() => {
    if (stage > previousStage.current) {
      if (stage === 2) notify('SUCCESS', 'Stage Unlocked', 'DISCOVER UNLOCKED. Find historical clues.', { icon: '🔍' });
      if (stage === 3) notify('SUCCESS', 'Stage Unlocked', 'LEARN UNLOCKED. Uncover the context.', { icon: '📖' });
      if (stage === 4) notify('SUCCESS', 'Stage Unlocked', 'PLAY + SOLVE UNLOCKED. Test your knowledge.', { icon: '🎮' });
      if (stage === 5) notify('SUCCESS', 'Stage Unlocked', 'BUILD / MANAGE UNLOCKED. Expand your civilization.', { icon: '🔨' });
      previousStage.current = stage;
    }
  }, [stage, notify]);

  useEffect(() => {
    updateActiveLevelState(config.id, levelState);
  }, [levelState, config.id]);

  
  // Challenge Selection Logic
  useEffect(() => {
     if (allChallenges.length > 0 && levelState.activeChallengeIds.length === 0 && stage >= 3) {
         let available = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id)).map(c => c.id);
         const miniGameIds = allChallenges.filter(c => c.format === 'minigame').map(c => c.id);
         available = available.filter(id => !miniGameIds.includes(id));
         available.sort(() => Math.random() - 0.5);
         let selected = [...miniGameIds, ...available].slice(0, Math.max(miniGameIds.length, targetChallenges));
         
         if (selected.length < targetChallenges && levelState.completedChallenges.length > 0) {
            let recycled = [...levelState.completedChallenges];
            recycled.sort(() => Math.random() - 0.5);
            selected = [...selected, ...recycled.slice(0, targetChallenges - selected.length)];
         }
         
         if (selected.length > 0) {
            setLevelState(prev => ({ ...prev, activeChallengeIds: selected }));
         }
     }
  }, [allChallenges, targetChallenges, levelState.activeChallengeIds.length, levelState.completedChallenges, stage]);

  const checkStageProgression = (newState) => {
    let currentStage = newState.stage;
    if (currentStage === 1 && newState.exploration.length >= targetExplore) currentStage = 2;
    if (currentStage === 2 && newState.discovery.length >= targetDiscover) currentStage = 3;
    if (currentStage === 3 && newState.learning.length >= targetLearn) currentStage = 4;
    if (currentStage === 4 && newState.completedChallenges.length >= targetChallenges) currentStage = 5;
    if (currentStage === 5 && newState.builtItems.length >= targetBuilds) currentStage = 6;
    return currentStage;
  };

  const handleLocationClick = (loc) => {
    playSound('ui');
    if (stage === 1) {
      if (!exploration.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'explore', data: loc } }));
      }
    } else if (stage === 2) {
      if (exploration.includes(loc.id) && !discovery.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'discover', data: loc } }));
      }
    } else if (stage === 3) {
      if (discovery.includes(loc.id) && !learning.includes(loc.id)) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'learn', data: loc } }));
      }
    } else if (stage === 4) {
      // Find if a challenge is bound to this location
      const chalIdx = levelState.activeChallengeIds.findIndex((cId, i) => locations[i % locations.length].id === loc.id);
      if (chalIdx !== -1) {
        const chalId = levelState.activeChallengeIds[chalIdx];
        if (!levelState.completedChallenges.includes(chalId)) {
          const chal = allChallenges.find(c => c.id === chalId);
          if (chal) startChallenge(chal);
        }
      }
    } else if (stage === 5) {
      const pendingBuilds = buildActions.filter(b => !builtItems.includes(b.id)).slice(0, targetBuilds);
      const buildIdx = pendingBuilds.findIndex((b, i) => locations[i % locations.length].id === loc.id);
      if (buildIdx !== -1) {
         setLevelState(prev => ({ ...prev, activePopup: { type: 'confirm_build', data: pendingBuilds[buildIdx] } }));
      }
    }
  };

  const markExplored = (loc) => {
    playSound('ui');
    setLevelState(prev => {
      const next = { ...prev, exploration: [...prev.exploration, loc.id], activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Exploration Complete', 'You have mapped a new area.', { icon: '🗺️' });
  };

  const markDiscovered = (loc) => {
    playSound('discovery');
    unlockArtifact(loc.id);
    const newResources = { ...resources };
    let yieldStrings = [];
    if (loc.yields) {
      Object.keys(loc.yields).forEach(k => {
        newResources[k] = (newResources[k] || 0) + loc.yields[k];
        yieldStrings.push(`+${loc.yields[k]} ${k}`);
      });
      if (!isReplay) updateResources(loc.yields);
    }
    setLevelState(prev => {
      const next = { ...prev, discovery: [...prev.discovery, loc.id], resources: newResources, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Artifact Discovered', yieldStrings.length > 0 ? `Added to Inventory: ${yieldStrings.join(', ')}` : 'You uncovered a piece of history.', { icon: '🏺' });
  };

  const markLearned = (loc) => {
    playSound('ui');
    setLevelState(prev => {
      const next = { ...prev, learning: [...prev.learning, loc.id], activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Knowledge Gained', 'You understand the historical context.', { icon: '🧠' });
  };

  const startChallenge = (challenge) => {
    let dataToUse = challenge;
    if (challenge.format === 'mcq' || challenge.format === 'decision' || !challenge.format) {
       const shuffledOpts = challenge.options ? [...challenge.options].sort(() => Math.random() - 0.5) : [];
       dataToUse = { ...challenge, options: shuffledOpts };
    }
    setLevelState(prev => ({ ...prev, activePopup: { type: 'challenge', data: dataToUse, isBuild: false } }));
  };

  const handleChallengeAnswer = (challenge, isCorrect, isBuild, score = 0) => {
    if (isCorrect) {
      setLevelState(prev => {
        const next = { ...prev, activePopup: null, resources: { ...prev.resources } };
        const isAlreadyCompleted = prev.completedChallenges.includes(challenge.id);
        
        let rewardToApply = challenge.reward;
        
        if (!rewardToApply) {
           const nextBuilding = buildActions.find(b => !prev.builtItems.includes(b.id));
           if (nextBuilding && nextBuilding.requirements) {
              rewardToApply = {};
              Object.keys(nextBuilding.requirements).forEach(k => {
                 rewardToApply[k] = 1;
              });
           }
        }

        if (!isAlreadyCompleted) {
          globalCompleteChallenge(challenge.id);
            checkQuestProgress('solve', challenge.id);
          if (!isReplay) updateResources({ xp: 50 + score });
          
          if (rewardToApply) {
            if (!isReplay) updateResources(rewardToApply);
            Object.keys(rewardToApply).forEach(k => {
              next.resources[k] = (next.resources[k] || 0) + rewardToApply[k];
            });
            const rewardStrings = Object.entries(rewardToApply).map(([k, v]) => `+${v} ${k}`).join(', ');
            notify('SUCCESS', 'Challenge Completed!', `Rewards: ${rewardStrings} (Used to Build!)`, { icon: '🏆' });
          } else {
            notify('SUCCESS', 'Challenge Completed!', `Great job!`, { icon: '🏆' });
          }
          next.completedChallenges = [...next.completedChallenges, challenge.id];
        } else {
          // Retry case: No duplicate rewards, just a success message
          notify('SUCCESS', 'Challenge Replayed', `You successfully completed this challenge again.`, { icon: '🏆' });
        }
        
        next.stage = checkStageProgression(next);
        return next;
      });
    } else {
      setLevelState(prev => ({ ...prev, activePopup: { type: 'error', data: "That doesn't seem quite right. Try again!", retry: { type: 'challenge', data: challenge, isBuild } } }));
    }
  };


  const handleCompleteLevel = () => {
    if (!isReplay) {
      if (config.id === 1) triggerEventAchievement('start_journey');
      if (config.id === 14) triggerEventAchievement('preserver_of_the_legacy');
      // Global inventory is already updated during gameplay (discovery & challenges). No need to duplicate here.
      completeLevel(config.id);
    }
    // Safely unbind local active state
    updateActiveLevelState(null, null);
  };

  const showLock = (msg) => {
    setLockToast(msg);
    safeSetTimeout(() => setLockToast(null), 3000);
  };

  const stagesData = [
    { id: 1, label: "EXPLORE", current: exploration.length, max: targetExplore, reqMsg: null },
    { id: 2, label: "DISCOVER", current: discovery.length, max: targetDiscover, reqMsg: `Explore ${targetExplore}/${targetExplore}` },
    { id: 3, label: "LEARN", current: learning.length, max: targetLearn, reqMsg: `Discover ${targetDiscover}/${targetDiscover}` },
    { id: 4, label: "PLAY + SOLVE", current: completedChallenges.length, max: targetChallenges, reqMsg: `Learn ${targetLearn}/${targetLearn}` },
    { id: 5, label: "BUILD / MANAGE", current: builtItems.length, max: targetBuilds, reqMsg: `Play ${targetChallenges}/${targetChallenges}` }
  ];

  const renderPopup = () => {
    if (!activePopup) return null;
    const { type, data, isBuild, retry } = activePopup;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className={"glass-panel p-0 md:p-0 rounded-2xl w-full max-h-full overflow-y-auto border shadow-2xl text-center flex flex-col " + theme.border + (type === 'challenge' && data.format === 'minigame' ? " max-w-4xl" : " max-w-lg p-5 md:p-8")}>
          
          {type === 'explore' && (
              <>
                <div className="text-6xl mb-4 opacity-50 grayscale">{data.icon}</div>
                <h3 className={"text-2xl font-bold mb-2 uppercase " + theme.primary}>Unknown Location</h3>
                <p className="text-content/80 mb-6">Investigate this area to find clues about {config.title}.</p>
                
                {!data.exploreRole ? (
                  <div className="animate-fade-in">
                    <p className="mb-4 text-sm font-bold opacity-70">Choose your Explore approach:</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: { ...prev.activePopup, data: { ...prev.activePopup.data, exploreRole: 'Explorer' } } }))} className="p-3 bg-surface/50 border border-blue-500/30 rounded-xl hover:bg-blue-500/10 hover:border-blue-500 transition-colors">
                        <div className="font-bold text-blue-500">Explorer</div>
                        <div className="text-[10px] opacity-70 mt-1">Survey terrain</div>
                      </button>
                      <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: { ...prev.activePopup, data: { ...prev.activePopup.data, exploreRole: 'Strategist' } } }))} className="p-3 bg-surface/50 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 hover:border-purple-500 transition-colors">
                        <div className="font-bold text-purple-500">Strategist</div>
                        <div className="text-[10px] opacity-70 mt-1">Assess resources</div>
                      </button>
                      <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: { ...prev.activePopup, data: { ...prev.activePopup.data, exploreRole: 'Historian' } } }))} className="p-3 bg-surface/50 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500 transition-colors">
                        <div className="font-bold text-emerald-500">Historian</div>
                        <div className="text-[10px] opacity-70 mt-1">Seek context</div>
                      </button>
                      <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: { ...prev.activePopup, data: { ...prev.activePopup.data, exploreRole: 'Builder' } } }))} className="p-3 bg-surface/50 border border-orange-500/30 rounded-xl hover:bg-orange-500/10 hover:border-orange-500 transition-colors">
                        <div className="font-bold text-orange-500">Builder</div>
                        <div className="text-[10px] opacity-70 mt-1">Analyze structures</div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-fade-in text-left">
                    <div className="mb-6 bg-surface/50 p-5 rounded-xl border border-content/10">
                      <h4 className="font-bold text-gold mb-3 flex items-center gap-2">
                        <span>{data.exploreRole} Experience</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-gold/10 border border-gold/30">Active</span>
                      </h4>
                      <p className="text-sm text-content/90 mb-4 leading-relaxed">
                        {data.exploreRole === 'Explorer' && "You scout the terrain, mapping the physical boundaries and discovering hidden paths in the area."}
                        {data.exploreRole === 'Strategist' && "You evaluate the natural resources, trade routes, and geographical advantages of this site."}
                        {data.exploreRole === 'Historian' && "You look for traces of past events, local lore, and contextual evidence in the landscape."}
                        {data.exploreRole === 'Builder' && "You analyze the ground for its structural potential, material availability, and spatial layout."}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-green-400 font-bold mb-4">
                        <CheckCircle size={14} /> Objectives Completed
                      </div>
                      <button onClick={() => markExplored(data)} className={"px-6 py-3 font-bold rounded-xl w-full flex items-center justify-center gap-2 " + theme.button}>
                        <Search size={16} /> Mark as Explored
                      </button>
                    </div>
                  </div>
                )}
            </>
          )}

          {type === 'discover' && (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
                <h3 className={"text-2xl font-bold mb-2 uppercase " + theme.primary}>{data.label}</h3>
                <p className="text-content/90 mb-6 text-lg font-serif">
                  {data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : adaptTextForAge(data.discoverMessage || "You uncovered something significant here!", ageGroup)}
                </p>
                {data.yields && Object.keys(data.yields).length > 0 && (
                  <div className="mb-6 bg-surface/40 p-3 rounded-xl border border-content/10">
                    <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">Rewards Earned</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Object.entries(data.yields).map(([res, amt]) => (
                        <span key={res} className="bg-gold/10 text-gold px-3 py-1 rounded-lg border border-gold/30 font-bold text-sm">+{amt} {res}</span>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={() => markDiscovered(data)} className={"px-6 py-3 font-bold rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface " + theme.button}>
                  Collect Artifact & Resources
                </button>
              </>
            )}

            {type === 'learn' && (
              <InteractiveLearnNode data={data} onComplete={() => markLearned(data)} theme={theme} isYoung={isYoung} playSound={playSound} ageGroup={ageGroup} />
          )}

          {type === 'challenge' && (
            <>
              {data.format === 'minigame' ? (
                   <MiniGameManager 
                     gameConfig={minigamesData[data.id]} 
                     theme={theme} 
                     onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)} onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))} 
                   />
                ) : (
                  <>
                    <h3 className={"text-xl font-bold mb-4 uppercase " + theme.primary}>{isBuild ? "Management Crisis" : "Solve Challenge"}</h3>
              <p className="text-lg text-content mb-6">{data.getQuestion ? data.getQuestion(ageGroup) : adaptQuestionForAge(data.question, ageGroup)}</p>
              
              {data.format === 'matching' ? (
                <MatchingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
              ) : data.format === 'ordering' ? (
                <OrderingGame data={data} theme={theme} isYoung={isYoung} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
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
          )}
          </>
        )}

        {type === 'confirm_build' && (() => {
              const reqs = data.requirements || {};
              let canAfford = true;
              Object.keys(reqs).forEach(k => {
                 if ((resources[k] || 0) < reqs[k]) canAfford = false;
              });

              return (
              <>
                <div className="text-6xl mb-4">{data.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{t(data.nameKey) || data.nameKey}</h3>
                <p className="text-content/80 mb-6">{adaptTextForAge(t(data.descKey) || data.descKey, ageGroup)}</p>
                
                <div className="flex flex-col md:flex-row gap-4 mb-8 text-left w-full justify-between">
                  
                  {/* Requirements Box */}
                  <div className={"flex-1 p-4 rounded-xl border bg-surface/50 " + theme.border}>
                     <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-3 text-red-400">Required Resources</p>
                     {Object.keys(reqs).length === 0 ? <span className="text-sm opacity-60">None</span> : (
                       <div className="flex flex-col gap-2">
                         {Object.entries(reqs).map(([k, v]) => {
                           const has = resources[k] || 0;
                           const isMet = has >= v;
                           return (
                             <div key={k} className="flex justify-between items-center text-sm">
                               <span className="font-bold">{k}</span>
                               <span className={isMet ? "text-green-400" : "text-red-400 font-bold"}>{has} / {v}</span>
                             </div>
                           )
                         })}
                       </div>
                     )}
                  </div>

                  {/* Effects Box */}
                  <div className={"flex-1 p-4 rounded-xl border bg-surface/50 " + theme.border}>
                     <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-3 text-green-400">Project Outcome</p>
                     {(!data.effects || Object.keys(data.effects).length === 0) ? <span className="text-sm opacity-60">Milestone Completed</span> : (
                       <div className="flex flex-col gap-2">
                         {Object.entries(data.effects).map(([k, v]) => (
                           <div key={k} className="flex justify-between items-center text-sm">
                             <span className="font-bold">{k.replace('_', ' ')}</span>
                             <span className="text-green-400 font-bold">+{v}</span>
                           </div>
                         ))}
                       </div>
                     )}
                  </div>
                  
                </div>
                
                {!canAfford && (
                  <p className="text-red-400 text-sm font-bold mb-4 bg-red-900/20 py-2 rounded-lg border border-red-500/30">
                    You do not have enough resources! Discover artifacts or complete challenges to earn more.
                  </p>
                )}

                <div className="flex justify-between gap-4">
                  <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))} className="px-6 py-3 font-bold rounded-xl w-full border border-content/20 hover:bg-surface/50 focus:outline-none focus:ring-2 focus:ring-content">
                    Cancel
                  </button>
                  <button 
                    disabled={!canAfford}
                    onClick={() => {
                       playSound('building');
                       const newResources = { ...resources };
                       if (data.requirements) {
                          Object.keys(data.requirements).forEach(k => {
                            newResources[k] = Math.max(0, (newResources[k] || 0) - data.requirements[k]);
                          });
                       }
                       setLevelState(prev => {
                         const next = { ...prev, resources: newResources, builtItems: [...prev.builtItems, data.id], activePopup: null };
                         next.stage = checkStageProgression(next);
                         return next;
                       });
                       let effectStrings = [];
                       if (data.effects) {
                         Object.keys(data.effects).forEach(k => effectStrings.push(`+${data.effects[k]} ${k.replace('_', ' ')}`));
                       }
                       notify('BUILD', 'Building Constructed!', effectStrings.length > 0 ? `Produced: ${effectStrings.join(', ')}` : `Consumed required resources.`, { icon: 'dY""' });
                    }} 
                    className={"px-6 py-3 font-bold rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface transition-all " + (canAfford ? theme.button : "opacity-50 cursor-not-allowed bg-surface/30 border-transparent text-content/50")}
                  >
                    Confirm Build
                  </button>
                </div>
              </>
            );
          })()}

          {type === 'error' && (
            <>
              <h3 className="text-2xl font-bold text-red-400 mb-2">{t('common.error', "Incorrect")}</h3>
              <p className="text-content/80 mb-6">{data}</p>
              {retry && retry.data && retry.data.explanation && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl mb-6 text-sm text-left">
                  <strong className="text-red-400 block mb-1">What went wrong:</strong>
                  {retry.data.getExplanation ? retry.data.getExplanation(ageGroup) : adaptTextForAge(retry.data.explanation, ageGroup)}
                </div>
              )}
              <button onClick={() => setLevelState(prev => ({ ...prev, activePopup: retry }))} className={"px-6 py-3 font-bold rounded-xl w-full " + theme.button}>
                {t('common.back', "Retry Challenge")}
              </button>
            </>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] md:h-[calc(100vh-6rem)] gap-4 pb-6">
      
      {/* 1. TOP HEADER & STAGE BAR */}
      <div className={"glass-panel p-4 rounded-2xl border flex flex-col gap-4 " + theme.border}>
        
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <BackButton fallback="/journey" />
                <div>
                   <p className={"text-xs font-bold tracking-widest uppercase mb-1 " + theme.primary}>Level {config.id}</p>
                   <h2 className="text-xl font-serif font-bold text-content">{config.title}</h2>
                </div>
             </div>
           {lockToast && (
             <div className="text-sm font-bold text-red-400 animate-fade-in bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30">
               {lockToast}
             </div>
           )}
        </div>

        {/* 5-Stage Horizontal Bar */}
        <div className="flex overflow-x-auto snap-x md:overflow-visible items-stretch md:justify-between gap-2 text-xs font-bold uppercase tracking-wider pb-2 hide-scrollbar">
           {stagesData.map((s, idx) => {
              const isActive = stage === s.id;
              const isComplete = stage > s.id;
              const isLocked = stage < s.id;

              return (
                 <React.Fragment key={s.id}>
                    <button 
                       onClick={() => isLocked && showLock(`Complete ${s.reqMsg} to unlock ${s.label}.`)}
                       aria-current={isActive ? 'step' : undefined}
                       aria-label={`Stage ${s.id}: ${s.label}. ${isComplete ? 'Completed' : isLocked ? 'Locked' : 'Current active stage'}. Progress: ${s.current} of ${s.max}`}
                       className={"flex-1 shrink-0 snap-center flex flex-col md:flex-row items-center justify-center gap-2 p-2 rounded-lg border transition-all min-w-[4.5rem] md:min-w-[8rem] " + 
                       (isComplete ? 'bg-green-900/20 border-green-900/50 text-green-400 cursor-default' : 
                        isActive ? theme.bg + "/60 " + theme.border + " " + theme.primary + " ring-1 ring-gold shadow-md cursor-default" : 
                        'bg-surface/30 border-transparent text-content/40 hover:bg-surface/50 cursor-pointer')}
                    >
                       <span className="text-lg">
                         {isComplete ? <CheckCircle className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : <Target className="w-5 h-5 animate-pulse-slow" />}
                       </span>
                       <div className="flex flex-col items-center md:items-start leading-tight text-center md:text-left">
                          <span className="text-[10px] md:text-xs">{s.label}</span>
                          <span className="text-[9px] opacity-70 mt-0.5">{s.current} / {s.max}</span>
                       </div>
                    </button>
                    {idx < 4 && <ArrowRight className="hidden lg:block w-4 h-4 my-auto opacity-30 text-content shrink-0" />}
                 </React.Fragment>
              )
           })}
        </div>
      </div>

      {/* 2. MAIN LAYOUT (Sidebar + Map) */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-y-auto md:overflow-hidden">
        
        {/* SIDEBAR */}
        <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 max-h-[35vh] md:max-h-none overflow-y-auto hide-scrollbar">
          
          {stage < 6 && (
              <ObjectiveTracker 
                stage={stage} 
                levelState={levelState} 
                locations={locations} 
                targetExplore={targetExplore} 
                targetDiscover={targetDiscover} 
                targetLearn={targetLearn} 
                targetChallenges={targetChallenges} 
                targetBuilds={targetBuilds} 
                allChallenges={allChallenges} 
                buildActions={buildActions} 
                handleLocationClick={handleLocationClick} 
                startChallenge={startChallenge} 
                setBuilderPopup={(bAction) => {
                  setBuildChoice(bAction.choices ? bAction.choices[0].id : null);
                  setLevelState(prev => ({ ...prev, activePopup: { type: 'confirm_build', data: bAction } }));
                }}
                theme={theme} 
              />
            )}
            
            <div className={"glass-panel p-5 rounded-2xl border " + theme.border}>
              <p className="text-xs uppercase text-content/50 mb-3 font-bold tracking-wider">Resources Available</p>
              <div className="flex gap-2 flex-wrap">
                {(() => {
                  const unbuilt = buildActions.filter(b => !builtItems.includes(b.id));
                  const totalReqs = {};
                  unbuilt.forEach(b => {
                    if (b.requirements) {
                      Object.entries(b.requirements).forEach(([rk, rv]) => {
                        totalReqs[rk] = (totalReqs[rk] || 0) + rv;
                      });
                    }
                  });
                  return Object.entries(resources).map(([k, v]) => (
                    <ResourceCard key={k} type={k} value={v} required={totalReqs[k]} theme={theme} />
                  ));
                })()}
              </div>
            </div>

          {stage === 6 ? (
              <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 animate-fade-in text-center overflow-y-auto w-full">
                {config.id === 14 ? (
                  <FinalSequence config={config} onComplete={() => {
                     if (!isReplay) {
                        triggerEventAchievement('preserver_of_the_legacy');
                        completeLevel(14);
                     }
                     updateActiveLevelState(null, null);
                     navigate('/profile');
                  }} />
                ) : (
                  <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-10">
                    <Star className={"w-16 h-16 mb-4 animate-pulse-slow " + theme.primary} />
                    <h3 className={"flex items-center gap-4 text-3xl md:text-5xl font-serif font-bold mb-2 " + theme.primary}><CheckCircle className="w-10 h-10" /> LEVEL COMPLETE</h3>
                    <p className="text-xl font-bold text-content mb-2">Level {config.id} — {t(`levels.${config.id}.title`, config.title)}</p>
                    <p className="text-content/70 text-sm md:text-base italic mb-8">You have successfully mastered the historical challenges of this era.</p>
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
                      
                      {/* Compact Stage Summary */}
                      <div className={"p-5 rounded-2xl border bg-surface/50 flex flex-col " + theme.border}>
                         <p className={"font-bold mb-3 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Stages Cleared</p>
                         <ul className="text-sm space-y-2 font-medium text-content/90 flex-1">
                            <li className="flex items-center justify-between"><span>Explore</span> <span className="text-green-400">{levelState.exploration.length}/{targetExplore}</span></li>
                            <li className="flex items-center justify-between"><span>Discover</span> <span className="text-green-400">{levelState.discovery.length}/{targetDiscover}</span></li>
                            <li className="flex items-center justify-between"><span>Learn</span> <span className="text-green-400">{levelState.learning.length}/{targetLearn}</span></li>
                            <li className="flex items-center justify-between"><span>Solve</span> <span className="text-green-400">{levelState.completedChallenges.length}/{targetChallenges}</span></li>
                            <li className="flex items-center justify-between"><span>Build</span> <span className="text-green-400">{levelState.builtItems.length}/{targetBuilds}</span></li>
                         </ul>
                      </div>

                      {/* Important Discoveries & Buildings */}
                      <div className={"p-5 rounded-2xl border bg-surface/50 flex flex-col lg:col-span-2 " + theme.border}>
                         <p className={"font-bold mb-3 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Heritage Discovered & Built</p>
                         <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[200px] hide-scrollbar">
                           {levelState.discovery.map(id => {
                              const loc = locations.find(l => l.id === id);
                              if (!loc) return null;
                              return (
                                <div key={'d'+id} className="flex items-center gap-2 bg-surface p-2 rounded-lg border border-content/10">
                                  <span className="text-xl">{loc.icon}</span>
                                  <span className="text-xs font-bold whitespace-nowrap">{loc.label}</span>
                                </div>
                              );
                           })}
                           {levelState.builtItems.map(id => {
                              const bItem = buildActions.find(b => b.id === id);
                              if (!bItem) return null;
                              return (
                                <div key={'b'+id} className="flex items-center gap-2 bg-blue-500/10 text-content p-2 rounded-lg border border-blue-500/30">
                                  <span className="text-xl">{bItem.icon || 'Hammer'}</span>
                                  <span className="text-xs font-bold whitespace-nowrap">{t(bItem.nameKey) || bItem.nameKey}</span>
                                </div>
                              );
                           })}
                         </div>
                      </div>

                      {/* Actual Rewards Earned */}
                      <div className={"p-5 rounded-2xl border bg-surface/50 md:col-span-2 lg:col-span-3 " + theme.border}>
                         <p className={"font-bold mb-3 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>{isReplay ? 'Replay Rewards' : 'Rewards & Achievements'}</p>
                         <div className="flex flex-wrap gap-3">
                            {isReplay ? (
                               <span className="px-3 py-2 bg-blue-900/20 text-blue-300 rounded-lg border border-blue-400/20 uppercase tracking-widest text-xs font-bold">Level Already Completed (Global inventory preserved)</span>
                            ) : (
                               <>
                                  <span className="px-3 py-2 bg-gold/10 text-gold rounded-lg border border-gold/20 font-bold text-sm flex items-center gap-2"><Star className="w-4 h-4" /> +100 Legacy Points</span>
                                  <span className="px-3 py-2 bg-green-900/20 text-green-400 rounded-lg border border-green-500/20 font-bold text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Era Mastered</span>
                                  {config.id === 1 && <span className="px-3 py-2 bg-purple-900/20 text-purple-400 rounded-lg border border-purple-500/20 font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4" /> Achievement: Start Journey</span>}
                                  {config.id === 14 && <span className="px-3 py-2 bg-purple-900/20 text-purple-400 rounded-lg border border-purple-500/20 font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4" /> Achievement: Preserver of the Legacy</span>}
                               </>
                            )}
                         </div>
                      </div>

                    </div>
  
                    <p className="text-content/80 text-sm mb-6 font-bold uppercase tracking-widest text-green-400 animate-pulse-slow">
                      {isReplay ? 'Replay Concluded' : `Next Unlocked: Level ${config.id + 1}`}
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
                      <button 
                        onClick={() => {
                          handleCompleteLevel(); 
                          navigate('/journey');
                        }}
                        className="px-6 py-3 rounded-xl font-bold bg-surface border border-content/20 text-content hover:bg-surface/80 transition-colors w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-content"
                      >
                        Return to Journey Map
                      </button>
                      <button 
                        onClick={() => {
                          handleCompleteLevel(); 
                          navigate(`/journey/level/${config.id + 1}`);
                        }}
                        className={"px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 w-full md:w-auto shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-gold " + theme.button}
                      >
                        Continue to Next Level <ArrowRight className="w-5 h-5 inline ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
            <div className="relative h-full p-8 flex flex-wrap gap-6 items-center justify-center content-center z-10 overflow-y-auto">
              {locations.map(loc => {
                const isExplored = exploration.includes(loc.id);
                const isDiscovered = discovery.includes(loc.id);
                const isLearned = learning.includes(loc.id);
                
                let isClickable = false;
                if (stage === 1 && !isExplored) isClickable = true;
                if (stage === 2 && isExplored && !isDiscovered) isClickable = true;
                if (stage === 3 && isDiscovered && !isLearned) isClickable = true;

                return (
                  <button
                      key={loc.id}
                      onClick={() => handleLocationClick(loc)}
                      disabled={!isClickable}
                      aria-label={`Map Node: ${!isExplored ? 'Unknown Location' : loc.label}. ${!isClickable ? 'Unavailable' : 'Click to interact'}`}
                      className={"flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 transition-all group " + 
                      (isDiscovered ? theme.bg + "/80 " + theme.border : isExplored ? theme.bg + "/40 border-content/30" : "bg-surface/50 border-content/10") + " " +
                      (isClickable ? 'hover:border-gold hover:scale-105 shadow-lg cursor-pointer animate-pulse-slow' : 'opacity-80 cursor-default')
                    }
                  >
                    <span className={"text-4xl md:text-5xl mb-1 md:mb-2 transition-transform " + (!isDiscovered ? 'opacity-50 grayscale' : '')}>
                      {loc.icon}
                    </span>
                    <span className={"text-sm font-bold text-center px-2 " + (isDiscovered ? theme.primary : 'text-content/60')}>
                      {!isExplored ? '???' : loc.label}
                    </span>
                    {isLearned && (
                      <div className={"absolute -top-2 -right-2 rounded-full p-1 border-2 border-transparent text-[#171B3A] " + theme.primaryBg}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelEngine;
