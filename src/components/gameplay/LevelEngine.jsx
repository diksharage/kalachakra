
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useBackground } from '../../context/BackgroundContext';
import { useAudio } from '../../context/AudioContext';
import { minigamesData } from '../../data/minigames';
import MiniGameManager from '../minigames/MiniGameManager';
import FinalSequence from './FinalSequence';
import ArtifactInvestigation from './ArtifactInvestigation';
import WorldEvent from './WorldEvent';
import NPCInteraction from './NPCInteraction';
import { useAchievements } from '../../context/AchievementContext';
import { Star, CheckCircle, AlertTriangle, BookOpen, ImageIcon, ArrowRight, Bot, Target, Lock, Play, Hammer, Trophy, Search, Sparkles, RotateCcw, Compass, Eye, Flame, Layers, Shovel, Brush, Pickaxe, Info, Grid } from 'lucide-react';
import { questData } from '../../data/quests';
import QuestGameplay from '../quests/QuestGameplay';
import { useLanguage } from '../../context/LanguageContext';
import { levelThemes } from '../../data/levelThemes';
import ResourceCard from './ResourceCard';
import { getBuilderDataForLevel } from '../../data/civilizationBuilder';
import { artifactInvestigations } from '../../data/artifactInvestigations';
import BackButton from '../common/BackButton';
import KalaCompanion from './KalaCompanion';
import { adaptTextForAge, adaptQuestionForAge } from '../../utils/ageAdapter';



const getResourceHint = (resKey) => {
  const hints = {
    wood: 'Gathered from Riverbank Groves & Forest Borders',
    plants: 'Gathered in Meadow Stands & Grasslands',
    stone: 'Collected at River Cobble Beds & Rocky Outcrops',
    water: 'Channeled from Perennial River & Inundation Cuts',
    flint: 'Knapped for harvesting sickles & ground celts',
    food: 'Earned through harvesting, grinding & cooking',
    grain: 'Harvested from Cultivated Plots & River Terraces',
    seeds: 'Gathered from Ancestral Grasses & Silt Meadows',
    clay: 'Dug from Clay Riverbanks & Silt Beds',
    mud: 'Mixed from Alluvial Silt, Straw & Mudbrick Yards',
    tools: 'Crafted from Polished Stone, Wood & Sickle Blades',
    brick: 'Formed in Kilns & Settlement Tasks'
  };
  return hints[resKey] || 'Earned by exploring habitats and solving challenges';
};

const SurvivalInteractive = ({ data, theme, resources, onComplete }) => {
  const [log, setLog] = React.useState(null);

  const handleChoice = (option) => {
    const costs = option.costs || {};
    const missing = [];
    for (const k of Object.keys(costs)) {
      if ((resources[k] || 0) < costs[k]) {
        missing.push(`${costs[k]} ${k} (have ${resources[k] || 0})`);
      }
    }

    if (missing.length > 0 && option.isSuccess) {
      setLog({
        text: `You need ${missing.join(', ')} for this survival action. You can forage the needed materials right now to execute this plan!`,
        type: 'missing',
        option
      });
      return;
    }

    setLog({
      text: option.resultText,
      type: option.isSuccess ? 'success' : 'error',
      option
    });
  };

  return (
    <div className="space-y-4 text-left">
      {log ? (
        <div className={`p-6 rounded-2xl border-2 text-center animate-fade-in ${log.type === 'success' ? 'bg-green-900/20 border-green-500/60 text-green-300' : log.type === 'missing' ? 'bg-amber-900/20 border-amber-500/60 text-amber-200' : 'bg-red-900/20 border-red-500/60 text-red-300'}`}>
          <p className="text-lg font-bold mb-4 leading-relaxed">{log.text}</p>
          {log.type === 'success' ? (
            <button
              onClick={() => onComplete(true, log.option.reward, log.option.costs)}
              className="px-6 py-3 bg-[#D9A441] text-[#070A0C] font-bold rounded-xl hover:bg-[#D9A441]/90 transition-all shadow-lg"
            >
              Continue & Claim Rewards →
            </button>
          ) : log.type === 'missing' ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onComplete(true, log.option.reward, {})}
                className="px-5 py-2.5 bg-[#D9A441] text-[#070A0C] font-bold rounded-xl hover:bg-[#D9A441]/90 transition-all text-sm shadow-md"
              >
                Forage Needed Materials & Execute Plan →
              </button>
              <button
                onClick={() => setLog(null)}
                className="px-5 py-2.5 bg-surface border border-content/20 text-content font-bold rounded-xl hover:bg-surface/80 transition-all text-sm"
              >
                Back to Options
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLog(null)}
              className="px-6 py-2.5 bg-surface border border-red-500/40 text-red-200 font-bold rounded-xl hover:bg-red-900/30 transition-all"
            >
              Try Another Survival Strategy
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {(data.options || []).map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoice(opt)}
              className="w-full p-4 border border-content/20 rounded-xl flex flex-col gap-2 transition-all text-left bg-surface/60 hover:border-gold hover:bg-surface shadow-md"
            >
              <div className="font-bold text-base md:text-lg flex items-center justify-between gap-3 text-content">
                <span>{opt.label}</span>
                {opt.icon && <span className="text-2xl shrink-0">{opt.icon}</span>}
              </div>
              {Object.keys(opt.costs || {}).length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs bg-black/30 p-2 rounded-lg border border-content/10">
                  <span className="opacity-70 uppercase tracking-widest font-bold">Requires:</span>
                  {Object.entries(opt.costs).map(([k, v]) => (
                    <span key={k} className={((resources[k] || 0) >= v ? "text-green-400" : "text-amber-400") + " font-bold capitalize"}>
                      {v} {k} (Have: {resources[k] || 0})
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

// Cave Art Handprint Sequence Puzzle (Inspired by User Image 4)
const CaveArtPuzzle = ({ data, theme, onComplete, playSound }) => {
  const symbols = data.symbols || [
    { id: 'water', icon: '💧', label: 'River Spring', order: 1, hint: 'First: Locate fresh water' },
    { id: 'stone', icon: '🪨', label: 'Knapped Tools', order: 2, hint: 'Second: Flake sharp stone tools' },
    { id: 'fire', icon: '🔥', label: 'Communal Hearth', order: 3, hint: 'Third: Kindle hearth fire' },
    { id: 'animal', icon: '🦣', label: 'Migrating Game', order: 4, hint: 'Fourth: Track wild game' },
    { id: 'shelter', icon: '🛖', label: 'Cave Shelter', order: 5, hint: 'Fifth: Return to shelter' }
  ];

  const [tappedSequence, setTappedSequence] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [solved, setSolved] = useState(false);

  const handleTap = (sym) => {
    if (solved) return;
    playSound?.('ui');
    const nextExpectedOrder = tappedSequence.length + 1;

    if (sym.order === nextExpectedOrder) {
      const nextSeq = [...tappedSequence, sym.id];
      setTappedSequence(nextSeq);
      setErrorMsg(null);
      playSound?.('discovery');

      if (nextSeq.length === symbols.length) {
        setSolved(true);
        playSound?.('quest');
      }
    } else {
      playSound?.('error');
      setErrorMsg(`The ancient survival cycle was broken! Look closely: ${symbols[tappedSequence.length]?.hint || 'Start with finding water.'}`);
      setTappedSequence([]);
    }
  };

  const handleReset = () => {
    setTappedSequence([]);
    setErrorMsg(null);
    setSolved(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-5 p-4 text-center animate-fade-in">
      <div className="bg-surface/80 border border-gold/30 rounded-2xl p-4 w-full text-left">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-1.5">
            <Flame size={14} className="text-amber-400" /> Sacred Prehistoric Rock Art
          </span>
          <button
            onClick={handleReset}
            className="text-xs flex items-center gap-1 text-content/60 hover:text-gold transition-colors"
          >
            <RotateCcw size={12} /> Reset Wall
          </button>
        </div>
        <h3 className="text-lg md:text-xl font-serif font-bold text-[#F5F1E8] mb-1">
          {data.title || 'Cave Art Sequence: Ancient Survival Cycle'}
        </h3>
        <p className="text-xs md:text-sm text-content/80 leading-relaxed">
          {data.question || 'Decipher the prehistoric survival cycle painted on the stone wall. Tap the sacred ochre symbols in their seasonal order of survival.'}
        </p>
      </div>

      {/* Cave Stone Slab (Matches User Image 4) */}
      <div className="relative w-full rounded-3xl p-6 md:p-8 border-4 border-[#34302A] shadow-2xl bg-gradient-to-b from-[#1C1611] via-[#14100D] to-[#0D0907] overflow-hidden">
        {/* Stone Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(217,164,65,0.15),transparent_70%)]" />
        
        {/* Handprints & Symbols Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 relative z-10">
          {symbols.map((sym) => {
            const isActivated = tappedSequence.includes(sym.id);
            const stepNum = tappedSequence.indexOf(sym.id) + 1;

            return (
              <button
                key={sym.id}
                type="button"
                onClick={() => handleTap(sym)}
                disabled={isActivated || solved}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 group ${
                  isActivated
                    ? 'bg-amber-900/40 border-amber-400 shadow-[0_0_20px_rgba(217,164,65,0.5)] scale-105'
                    : 'bg-[#241A14]/70 border-[#4A382A] hover:border-[#D9A441] hover:scale-102 hover:bg-[#2C2018]'
                }`}
              >
                {/* Ancient Handprint / Symbol Display */}
                <div className="relative mb-2">
                  <span className={`text-4xl transition-all duration-300 ${isActivated ? 'scale-110 drop-shadow-[0_0_12px_#D9A441]' : 'opacity-70 group-hover:opacity-100'}`}>
                    {sym.icon}
                  </span>
                  {isActivated && (
                    <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-gold text-[#070A0C] font-extrabold text-xs flex items-center justify-center shadow-md">
                      {stepNum}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-bold leading-tight line-clamp-1 ${isActivated ? 'text-amber-300' : 'text-content/70'}`}>
                  {sym.label}
                </span>
                <span className="text-[10px] opacity-50 mt-1 uppercase tracking-wider">
                  {isActivated ? 'Activated' : 'Tap Rock'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clue Hint Bar */}
        <div className="mt-6 pt-4 border-t border-content/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="text-xs text-content/75 flex items-center gap-2">
            <span className="font-bold text-gold uppercase tracking-wider">Next Step:</span>
            <span>{symbols[tappedSequence.length]?.hint || 'Sequence fully unlocked!'}</span>
          </div>
          <span className="text-xs font-bold text-gold/90 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
            Progress: {tappedSequence.length} / {symbols.length}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-900/30 border border-red-500/40 rounded-xl text-red-200 text-xs md:text-sm animate-fade-in w-full text-left flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {solved && (
        <div className="bg-green-900/30 border border-green-500/50 rounded-2xl p-5 text-center w-full animate-fade-in space-y-3">
          <div className="text-green-300 font-serif font-bold text-lg flex items-center justify-center gap-2">
            <Sparkles size={20} className="text-gold" /> Sacred Prehistoric Sequence Deciphered!
          </div>
          <p className="text-xs md:text-sm text-green-100/90 leading-relaxed max-w-xl mx-auto">
            You reconstructed the seasonal survival cycle recorded by early humans. By honoring the flow of water, stone knapping, fire warmth, herd migration, and shelter, the community thrived.
          </p>
          <button
            onClick={() => onComplete(true)}
            className="px-8 py-3.5 bg-gradient-to-r from-gold to-amber-500 text-[#070A0C] font-extrabold text-sm rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            Claim Challenge Rewards →
          </button>
        </div>
      )}
    </div>
  );
};

// Interactive Archaeological Excavation Grid (Inspired by User Image 2)
const ArtifactDiscoverer = ({ data, theme, ageGroup, onComplete, playSound }) => {
  // 3x3 Excavation Trench (9 Quadrants: A1 through C3)
  const TOTAL_QUADRANTS = 9;
  const [excavatedCells, setExcavatedCells] = useState([]);
  const [activeTool, setActiveTool] = useState('trowel'); // 'trowel' or 'brush'
  const [selectedUseIdx, setSelectedUseIdx] = useState(null);

  const progress = Math.round((excavatedCells.length / TOTAL_QUADRANTS) * 100);
  const isFullyUncovered = excavatedCells.length >= TOTAL_QUADRANTS;

  const hasUseIdentification = Array.isArray(data.useOptions) && data.useOptions.length > 0;
  const selectedOpt = selectedUseIdx !== null && hasUseIdentification ? data.useOptions[selectedUseIdx] : null;
  const canCollect = isFullyUncovered && (!hasUseIdentification || Boolean(selectedOpt?.isCorrect));

  const handleDigCell = (idx) => {
    if (excavatedCells.includes(idx)) return;
    playSound?.('ui');
    const nextCells = [...excavatedCells, idx];
    setExcavatedCells(nextCells);
    if (nextCells.length === TOTAL_QUADRANTS) {
      playSound?.('discovery');
    }
  };

  const handleUncoverAll = () => {
    const all = Array.from({ length: TOTAL_QUADRANTS }, (_, i) => i);
    setExcavatedCells(all);
    playSound?.('discovery');
  };

  const quadrantLabels = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col p-2 text-center animate-fade-in space-y-4">
      {/* Header */}
      <div className="text-left bg-surface/70 p-4 rounded-2xl border border-content/15">
        <div className="flex items-center justify-between gap-3 mb-1">
          <span className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-1.5">
            <Shovel size={14} className="text-gold" /> Stage 2: Archaeological Excavation
          </span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
            {progress}% Excavated
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-[#F5F1E8]">
          {isFullyUncovered ? (data.discoveryTitle || data.label) : `Excavate Trench at ${data.label}`}
        </h3>
        <p className="text-xs md:text-sm text-content/80 mt-1 leading-relaxed">
          {isFullyUncovered
            ? 'The artifact has been lifted from the sediment! Inspect its physical diagnostic traits and identify its historical use.'
            : 'Select an archaeological tool and clear away the silt and gravel layers to uncover the hidden artifact.'}
        </p>
      </div>

      {!isFullyUncovered ? (
        <div className="flex flex-col items-center gap-4">
          {/* Tool Selector Bar */}
          <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-content/10">
            <button
              type="button"
              onClick={() => setActiveTool('trowel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTool === 'trowel'
                  ? 'bg-gold text-[#070A0C] shadow-md'
                  : 'text-content/70 hover:text-content'
              }`}
            >
              <Shovel size={14} /> ⛏️ Archaeological Trowel
            </button>
            <button
              type="button"
              onClick={() => setActiveTool('brush')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTool === 'brush'
                  ? 'bg-gold text-[#070A0C] shadow-md'
                  : 'text-content/70 hover:text-content'
              }`}
            >
              <Brush size={14} /> 🖌️ Fine Excavation Brush
            </button>
          </div>

          {/* 3x3 Dig Trench Canvas (Inspired by User Image 2) */}
          <div className="relative w-full max-w-sm aspect-square p-4 rounded-3xl border-4 border-[#3A2B1D] bg-gradient-to-b from-[#241A13] to-[#120D09] shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            {/* Underlying Revealed Artifact in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <span className="text-7xl md:text-8xl filter drop-shadow-[0_0_20px_rgba(217,164,65,0.4)] transition-all duration-700 animate-float">
                {data.icon}
              </span>
              <span className="text-sm font-bold text-gold mt-2 uppercase tracking-wider">
                {data.discoveryTitle || data.label}
              </span>
            </div>

            {/* Sediment Quadrant Tiles */}
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-2 relative z-10">
              {Array.from({ length: TOTAL_QUADRANTS }, (_, idx) => {
                const isCleared = excavatedCells.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDigCell(idx)}
                    disabled={isCleared}
                    className={`rounded-xl border transition-all duration-500 relative flex items-center justify-center ${
                      isCleared
                        ? 'opacity-0 scale-90 pointer-events-none'
                        : 'bg-gradient-to-br from-[#4A3728] via-[#38281B] to-[#261A10] border-[#664C36] hover:border-gold hover:scale-102 shadow-md cursor-pointer'
                    }`}
                  >
                    {!isCleared && (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-amber-200/60 font-mono">
                          {quadrantLabels[idx]}
                        </span>
                        <span className="text-[10px] text-amber-300/40 uppercase tracking-tighter">
                          {activeTool === 'trowel' ? 'Dig' : 'Brush'}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between w-full max-w-sm text-xs font-bold text-content/70">
            <span>Tap each quadrant to excavate ({excavatedCells.length}/9)</span>
            <button
              onClick={handleUncoverAll}
              className="text-gold hover:underline uppercase tracking-wider"
            >
              Clear Entire Trench →
            </button>
          </div>
        </div>
      ) : (
        /* Field Examination Table & Diagnostic Clue Identification */
        <div className="text-left space-y-4 animate-in fade-in duration-300">
          <div className="bg-surface/80 border border-content/15 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-24 h-24 rounded-2xl bg-black/40 border border-gold/30 flex items-center justify-center text-5xl shrink-0 shadow-lg">
              {data.icon}
            </div>
            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-widest text-gold font-bold mb-1">
                Field Laboratory Analysis • Authenticated Artifact
              </div>
              <h4 className="text-lg md:text-xl font-serif font-bold text-content mb-1">
                {data.discoveryTitle || data.label}
              </h4>
              <p className="text-xs md:text-sm text-content/85 leading-relaxed">
                {data.examinationNotes || (data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : (data.discoverMessage || 'You uncovered significant prehistoric evidence here.'))}
              </p>
            </div>
          </div>

          {hasUseIdentification && (
            <div className="bg-black/35 border border-gold/25 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Compass size={14} /> Clue Interpretation: Identify Object Use
              </div>
              <p className="text-sm font-medium text-content/90">
                {data.usePrompt || 'How did early human communities primarily use this discovery?'}
              </p>
              <div className="space-y-2">
                {data.useOptions.map((opt, idx) => {
                  const isChosen = selectedUseIdx === idx;
                  let btnStyle = 'bg-surface/70 border-content/15 text-content hover:border-gold/50';
                  if (isChosen) {
                    btnStyle = opt.isCorrect
                      ? 'bg-green-900/30 border-green-500 text-green-200'
                      : 'bg-red-900/30 border-red-500 text-red-200';
                  }
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedUseIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-semibold transition-all ${btnStyle}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {selectedOpt && (
                <div className={`p-3 rounded-xl text-xs md:text-sm font-medium border ${selectedOpt.isCorrect ? 'bg-green-900/20 border-green-500/40 text-green-300' : 'bg-amber-900/20 border-amber-500/40 text-amber-200'}`}>
                  {selectedOpt.feedback}
                </div>
              )}
            </div>
          )}

          {data.yields && Object.keys(data.yields).length > 0 && (
            <div className="bg-surface/40 p-3 rounded-xl border border-content/10 text-center">
              <p className="text-xs uppercase tracking-widest font-bold opacity-70 mb-2">Prehistoric Evidence & Resources Gained</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.entries(data.yields).map(([res, amt]) => (
                  <span key={res} className="bg-gold/15 text-gold px-3 py-1 rounded-lg border border-gold/30 font-bold text-xs capitalize">
                    +{amt} {res}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onComplete}
            disabled={!canCollect}
            className={`px-6 py-3.5 font-bold rounded-xl w-full transition-all ${canCollect ? theme.button : 'bg-surface/40 text-content/40 border border-content/10 cursor-not-allowed'}`}
          >
            {canCollect ? 'Authenticate & Add to Collection →' : 'Select Correct Historical Use Above to Complete'}
          </button>
        </div>
      )}
    </div>
  );
};

// Interactive Environmental Landscape Exploration Arena (Inspired by User Images 1 & 3)
const ExplorePanel = ({ data, theme, ageGroup, isYoung, isReplay, playSound, updateResources, setLevelState, markExplored, levelState }) => {
  const getDiscoveries = (loc) => {
    if (Array.isArray(loc.exploreItems) && loc.exploreItems.length > 0) {
      return loc.exploreItems;
    }
    const base = [];
    const yieldSource = loc.exploreYields || loc.yields;
    if (yieldSource) {
      Object.entries(yieldSource).forEach(([res, amt]) => {
        base.push({
          id: `yield_${res}`,
          icon: res === 'wood' ? '🪵' : res === 'stone' ? '🪨' : res === 'plants' ? '🌿' : res === 'food' ? '🌾' : res === 'water' ? '💧' : res === 'flint' ? '🔪' : res === 'grain' ? '🌾' : res === 'seeds' ? '🌱' : res === 'clay' ? '🏺' : res === 'mud' ? '🧱' : res === 'tools' ? '⛏️' : '📜',
          label: `Find ${res.charAt(0).toUpperCase() + res.slice(1)}`,
          resourceName: res.charAt(0).toUpperCase() + res.slice(1),
          examineTitle: `Inspect ${res.charAt(0).toUpperCase() + res.slice(1)} Source`,
          whyUseful: `Essential resource (${res}) used by early communities for survival, shelter, and settlement.`,
          feedback: `You gathered ${amt} ${res} — added to your inventory supplies.`,
          reward: { [res]: amt },
        });
      });
    }
    base.push({
      id: 'context',
      icon: '🔍',
      label: 'Survey the Habitat Environment',
      resourceName: 'Environmental Clue',
      examineTitle: `Environmental Survey: ${loc.label}`,
      whyUseful: adaptTextForAge(loc.discoverMessage || 'Reveals how early human communities adapted to this landscape.', ageGroup),
      feedback: adaptTextForAge(loc.discoverMessage || 'You mapped key environmental features at this location.', ageGroup),
      reward: {},
    });
    const max = isYoung ? 2 : 3;
    return base.slice(0, max);
  };

  const discoveries = getDiscoveries(data);
  const savedLocDetails = levelState?.exploredDetails?.[data.id] || {};
  const found = data.foundDiscoveries || savedLocDetails.found || [];
  const examined = data.examinedDiscoveries || savedLocDetails.examined || [];
  const allFound = found.length >= discoveries.length;

  const [activeHotspot, setActiveHotspot] = useState(null);

  // Distribute hotspot positions across the visual environment landscape
  const hotspotCoords = [
    { x: '24%', y: '42%' },
    { x: '62%', y: '68%' },
    { x: '78%', y: '32%' },
    { x: '45%', y: '26%' }
  ];

  const handleInspectHotspot = (disc) => {
    playSound?.('ui');
    setActiveHotspot(disc);
    if (!examined.includes(disc.id)) {
      const nextExamined = [...examined, disc.id];
      setLevelState(prev => ({
        ...prev,
        exploredDetails: {
          ...(prev.exploredDetails || {}),
          [data.id]: {
            found: prev.exploredDetails?.[data.id]?.found || found,
            examined: nextExamined
          }
        }
      }));
    }
  };

  const handleHarvest = (disc) => {
    if (found.includes(disc.id)) return;
    const reward = disc.reward || {};
    if (Object.keys(reward).length > 0 && !isReplay) {
      updateResources(reward);
    }
    playSound?.('discovery');
    const nextFound = [...found, disc.id];
    const nextExamined = examined.includes(disc.id) ? examined : [...examined, disc.id];

    setLevelState(prev => {
      const nextResources = { ...(prev.resources || {}) };
      Object.entries(reward).forEach(([k, v]) => {
        nextResources[k] = (nextResources[k] || 0) + v;
      });
      return {
        ...prev,
        resources: nextResources,
        exploredDetails: {
          ...(prev.exploredDetails || {}),
          [data.id]: {
            found: nextFound,
            examined: nextExamined
          }
        }
      };
    });
  };

  return (
    <div className="relative h-full w-full max-w-4xl mx-auto flex flex-col p-3 md:p-6 overflow-y-auto animate-in fade-in duration-300 space-y-4">
      {/* Habitat Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface/80 p-4 rounded-2xl border border-content/15 shadow-md">
        <div className="flex items-center gap-3.5">
          <span className="text-4xl md:text-5xl">{data.icon}</span>
          <div className="text-left">
            <div className="text-xs uppercase tracking-widest text-gold font-bold">
              Stage 1: Environmental Exploration
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#F5F1E8]">
              {data.label}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gold/15 text-gold border border-gold/30">
            {found.length} / {discoveries.length} Areas Surveyed
          </span>
          <button
            type="button"
            onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
            className="px-3.5 py-1.5 rounded-xl bg-surface border border-content/20 text-xs font-bold text-content/80 hover:text-gold transition-colors"
          >
            ← Map View
          </button>
        </div>
      </div>

      {/* Atmospheric Visual Environment Scene (Images 1 & 3) */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl bg-gradient-to-b from-[#182026] via-[#10161C] to-[#0A0E12] flex items-center justify-center">
        {/* Layered landscape background elements */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(217,164,65,0.25),transparent_60%)] pointer-events-none" />
        
        {/* Environmental Horizon & Terrain Ambience */}
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-content/15 text-xs text-content/90 flex items-center gap-2">
          <Eye size={13} className="text-gold animate-pulse" />
          <span>Tap environmental beacons across the landscape to investigate and gather resources</span>
        </div>

        {/* Environmental Hotspot Beacons placed across the landscape */}
        {discoveries.map((disc, idx) => {
          const coords = hotspotCoords[idx % hotspotCoords.length];
          const isFound = found.includes(disc.id);
          const isSelected = activeHotspot?.id === disc.id;

          return (
            <button
              key={disc.id}
              type="button"
              onClick={() => handleInspectHotspot(disc)}
              style={{ left: coords.x, top: coords.y }}
              aria-label={`Inspect ${disc.label}`}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-115'
              }`}
            >
              <div className="relative flex flex-col items-center">
                {/* Radar Ring */}
                {!isFound && (
                  <span className="absolute -inset-2 rounded-full border-2 border-gold/60 animate-ping opacity-75 pointer-events-none" />
                )}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-2xl border-2 transition-all ${
                  isFound
                    ? 'bg-green-950/80 border-green-500/80 text-green-300'
                    : isSelected
                    ? 'bg-gold/90 border-white text-[#070A0C] ring-4 ring-gold/40'
                    : 'bg-surface/90 border-gold/70 text-content hover:border-gold'
                }`}>
                  {isFound ? '✓' : disc.icon}
                </div>
                <span className={`mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md ${
                  isFound
                    ? 'bg-green-900/80 text-green-300 border border-green-500/40'
                    : 'bg-black/80 text-content border border-content/20 group-hover:border-gold'
                }`}>
                  {disc.resourceName || disc.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Hotspot Inspection Window */}
      {activeHotspot && (() => {
        const disc = activeHotspot;
        const isFound = found.includes(disc.id);
        const hasReward = disc.reward && Object.keys(disc.reward).length > 0;
        const rewardLabel = hasReward
          ? Object.entries(disc.reward).map(([k, v]) => `+${v} ${k}`).join(', ')
          : 'Environmental Observation';

        return (
          <div className="bg-surface/90 border-2 border-gold/40 rounded-2xl p-4 md:p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 text-left space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 rounded-xl bg-black/40 border border-content/10">
                  {disc.icon}
                </span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold">
                    {disc.examineTitle || 'Field Inspection'}
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-[#F5F1E8]">
                    {disc.label}
                  </h4>
                </div>
              </div>
              {isFound ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-900/30 border border-green-500/30 px-3 py-1.5 rounded-xl">
                  <CheckCircle size={14} /> Collected ✓
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleHarvest(disc)}
                  className="px-5 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-extrabold text-xs md:text-sm hover:bg-[#D9A441]/90 transition-all shadow-lg shrink-0"
                >
                  Harvest & Gather ({rewardLabel}) →
                </button>
              )}
            </div>

            <p className="text-xs md:text-sm text-content/90 leading-relaxed bg-black/30 p-3 rounded-xl border border-content/10">
              <strong className="text-gold">Survival & Historical Insight: </strong>
              {disc.whyUseful || disc.feedback}
            </p>
          </div>
        );
      })()}

      {/* All Hotspots Complete */}
      {allFound && (
        <div className="bg-gold/10 border-2 border-gold/40 rounded-2xl p-5 text-left shadow-2xl animate-fade-in space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-gold font-bold text-lg">
              <CheckCircle size={22} /> Habitat Survey Complete!
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-900/40 px-3 py-1 rounded-full border border-green-500/30">
              All Resources Mapped
            </span>
          </div>
          <p className="text-xs md:text-sm text-content/90 leading-relaxed">
            {adaptTextForAge(data.discoverMessage || 'You surveyed all environmental features in this habitat, gathering essential resources for survival and construction.', ageGroup)}
          </p>
          <button
            onClick={() => markExplored(data)}
            className={`px-8 py-3.5 font-bold rounded-xl w-full flex items-center justify-center gap-2.5 text-base shadow-xl transition-all hover:scale-[1.01] ${theme.button}`}
          >
            <CheckCircle size={18} /> Complete Exploration & Map Location
          </button>
        </div>
      )}
    </div>
  );
};

// Interactive Learn Node with Integrated Era Quests
const VisualStoryViewer = ({ story, theme, onComplete, playSound }) => {
  const [currentIndex, React_useState] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  const slide = story[currentIndex];
  const isLast = currentIndex === story.length - 1;

  const handleNext = () => {
    if (playSound) playSound('ui');
    if (isLast) {
      onComplete();
    } else {
      React_useState(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (playSound) playSound('ui');
    if (currentIndex > 0) React_useState(i => i - 1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start h-full max-w-5xl mx-auto overflow-y-auto hide-scrollbar p-2">
      <div className="w-full flex justify-between items-center mb-6">
        <h4 className="text-sm font-bold uppercase tracking-widest text-gold">Visual Learning</h4>
        <div className="flex gap-2">
          {story.map((_, idx) => (
            <div key={idx} className={"w-3 h-3 rounded-full transition-colors " + (idx === currentIndex ? 'bg-gold' : idx < currentIndex ? 'bg-gold/50' : 'bg-surface border border-content/20')} />
          ))}
        </div>
      </div>

      <div className={"w-full bg-surface border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-500 " + (theme?.border || 'border-content/10')}>
        <div className="w-full md:w-1/2 relative bg-black/40 min-h-[300px] flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-content/10">
          {slide.image ? (
            <>
              {!imageLoaded && <div className="absolute inset-0 flex items-center justify-center animate-pulse"><div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" /></div>}
              <img 
                src={slide.image} 
                alt={slide.title}
                onLoad={() => setImageLoaded(true)}
                className={"w-full h-full object-contain max-h-[400px] transition-opacity duration-500 " + (imageLoaded ? 'opacity-100' : 'opacity-0')}
              />
              {slide.focusPoint && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-gold/30 text-xs text-content/90 flex gap-2 items-start shadow-xl animate-fade-in delay-500">
                  <div className="w-4 h-4 text-gold shrink-0 mt-0.5">🔍</div>
                  <p>{slide.focusPoint}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-8xl md:text-9xl animate-float opacity-80 filter drop-shadow-2xl">
              {slide.icon || '🏛️'}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-light rounded-full text-xs font-bold uppercase tracking-wider text-content/70 mb-4 self-start">
            <span className="w-3 h-3">📖</span> {slide.type || 'History'}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight text-content">{slide.title}</h3>
          <p className="text-base md:text-lg text-content/90 leading-relaxed mb-6 flex-1">{slide.text}</p>
          
          <div className="space-y-3 mb-8">
            {slide.evidence && (
              <div className="flex gap-3 items-start bg-green-900/20 border border-green-500/30 p-3 rounded-xl text-sm">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-green-300 block mb-0.5">Evidence:</span>
                  <span className="text-green-100/80">{slide.evidence}</span>
                </div>
              </div>
            )}
            
            {slide.uncertainty && (
              <div className="flex gap-3 items-start bg-amber-900/20 border border-amber-500/30 p-3 rounded-xl text-sm">
                <span className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 font-bold text-lg leading-none">⚠</span>
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5">Uncertainty:</span>
                  <span className="text-amber-100/80">{slide.uncertainty}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-auto">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-4 rounded-xl border border-content/10 hover:bg-surface/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              {'<'}
            </button>
            <button 
              onClick={handleNext}
              className={"flex-1 p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all " + (isLast ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-gold text-black hover:bg-gold-light')}
            >
              {isLast ? 'Complete Learning' : 'Next Insight'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



const InteractiveLearnNode = ({ data, onComplete, theme, isYoung, playSound, ageGroup, levelId }) => {
  const { gameState, startQuest, completeQuestDirectly } = useGame();
  const [activeTab, setActiveTab] = useState('story'); // 'story' or 'quests'
  const [activeQuestForGameplay, setActiveQuestForGameplay] = useState(null);

  // Relevant quests for this level from questData
  const levelQuests = useMemo(() => {
    return (questData || []).filter(q => q.levelId === levelId);
  }, [levelId]);

  const userQuests = gameState?.quests || {};

  const handleCompleteQuest = (q, result) => {
    if (completeQuestDirectly) {
      completeQuestDirectly(q.id);
    }
    setActiveQuestForGameplay(null);
    playSound?.('quest');
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col p-2 text-center animate-fade-in space-y-4">
      {/* Header with Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface/80 p-4 rounded-2xl border border-content/15 text-left">
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-1.5">
            <BookOpen size={14} className="text-gold" /> Stage 3: Learn & Quests
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#F5F1E8]">
            {data.label}: Knowledge & Community Quests
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-content/10">
          <button
            type="button"
            onClick={() => { setActiveTab('story'); setActiveQuestForGameplay(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'story'
                ? 'bg-gold text-[#070A0C] shadow-md'
                : 'text-content/70 hover:text-content'
            }`}
          >
            📖 Visual Story Insights
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('quests'); setActiveQuestForGameplay(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quests'
                ? 'bg-gold text-[#070A0C] shadow-md'
                : 'text-content/70 hover:text-content'
            }`}
          >
            <Target size={13} /> Era Quests ({levelQuests.length})
          </button>
        </div>
      </div>

      {/* Quest Gameplay Modal if active */}
      {activeQuestForGameplay ? (
        <div className="bg-surface/90 border border-gold/30 rounded-2xl p-4 animate-fade-in">
          <QuestGameplay
            quest={activeQuestForGameplay}
            onComplete={(res) => handleCompleteQuest(activeQuestForGameplay, res)}
            onClose={() => setActiveQuestForGameplay(null)}
          />
        </div>
      ) : activeTab === 'story' ? (
        /* Visual Story Tab */
        <div className="w-full">
          {data.visualStory && data.visualStory.length > 0 ? (
            <VisualStoryViewer
              story={data.visualStory}
              theme={theme}
              onComplete={onComplete}
              playSound={playSound}
            />
          ) : (
            <div className="p-6 bg-surface/60 rounded-2xl border border-content/15 text-left space-y-4">
              <p className="text-base text-content/90 leading-relaxed">
                {adaptTextForAge(data.discoverMessage || data.description || 'Prehistoric communities adapted to their environment through cooperative learning and stone tool engineering.', ageGroup)}
              </p>
              <button
                onClick={onComplete}
                className={`px-6 py-3 font-bold rounded-xl w-full ${theme.button}`}
              >
                Complete Knowledge Milestone →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quests Tab (Integrated from Sidebar Quests) */
        <div className="space-y-4 text-left animate-fade-in">
          <p className="text-xs text-content/70">
            Era Heritage Quests challenge you to apply your historical knowledge. Complete quest missions to earn Legacy XP and rare rewards!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levelQuests.map((q) => {
              const qState = userQuests[q.id]?.status || 'available';
              const isDone = qState === 'completed';

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isDone
                      ? 'bg-green-950/20 border-green-500/40 text-green-200'
                      : 'bg-surface/70 border-gold/25 text-content hover:border-gold/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-gold flex items-center gap-1">
                        <Target size={12} /> Era Quest
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-green-900/50 text-green-300 border border-green-500/30'
                          : 'bg-gold/20 text-gold border border-gold/30'
                      }`}>
                        {isDone ? 'Completed ✓' : 'Available'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#F5F1E8] mb-1">
                      {q.title}
                    </h4>
                    <p className="text-xs text-content/80 leading-relaxed line-clamp-2">
                      {q.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-content/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-gold">
                      Reward: +{q.rewards?.legacy || 50} Legacy XP
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveQuestForGameplay(q)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-surface border border-content/20 text-content/70 hover:border-gold'
                          : 'bg-gold text-[#070A0C] font-extrabold hover:bg-gold/90 shadow-md'
                      }`}
                    >
                      {isDone ? 'Replay Quest Mission' : 'Engage Quest Mission →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-content/15 flex justify-end">
            <button
              onClick={onComplete}
              className={`px-8 py-3.5 font-bold rounded-xl text-sm ${theme.button}`}
            >
              Finish Stage 3 Learning & Advance →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Stage 5 Settlement Builder & Construction Grid (Integrated from Sidebar Builder)
const Stage5Builder = ({ config, theme, levelState, setLevelState, resources, updateResources, playSound, notify, checkQuestProgress }) => {
  const levelId = config.id;
  const builderConfig = useMemo(() => getBuilderDataForLevel(levelId), [levelId]);
  const availableBuildings = builderConfig.buildings || [];

  const [selectedBuildingId, setSelectedBuildingId] = useState(
    availableBuildings[0]?.id || null
  );
  const [feedback, setFeedback] = useState(null);

  const selectedBuilding = availableBuildings.find(b => b.id === selectedBuildingId);
  const currentBuilt = levelState.builtItems || [];

  const canAfford = (reqs = {}) => {
    for (const [k, v] of Object.entries(reqs)) {
      if ((resources[k] || 0) < v) return false;
    }
    return true;
  };

  const handleConstruct = (building) => {
    if (!building) return;
    const reqs = building.requirements || {};

    if (!canAfford(reqs)) {
      const missing = Object.entries(reqs)
        .filter(([k, v]) => (resources[k] || 0) < v)
        .map(([k, v]) => `${v - (resources[k] || 0)} more ${k}`)
        .join(', ');
      setFeedback({
        type: 'error',
        text: `Missing resources for ${building.name || building.label}: need ${missing}. Click "Forage Supplies" below to gather materials immediately!`
      });
      playSound?.('error');
      return;
    }

    playSound?.('building');
    const newResources = { ...resources };
    Object.entries(reqs).forEach(([k, v]) => {
      newResources[k] = Math.max(0, (newResources[k] || 0) - v);
    });

    if (building.effects) {
      Object.entries(building.effects).forEach(([k, v]) => {
        if (['food', 'wood', 'stone', 'water', 'plants', 'flint', 'grain', 'seeds', 'clay', 'mud', 'tools'].includes(k)) {
          newResources[k] = (newResources[k] || 0) + v;
        }
      });
      updateResources(building.effects);
    }

    const nextBuilt = [...currentBuilt, building.id];
    setLevelState(prev => {
      const next = { ...prev, resources: newResources, builtItems: nextBuilt };
      if (next.builtItems.length >= 2) next.stage = 6;
      return next;
    });

    if (checkQuestProgress) checkQuestProgress('build', building.id);
    setFeedback({
      type: 'success',
      text: `Constructed ${building.name || building.label}! Consequence: ${building.consequence || 'Enhanced settlement survival & stability.'}`
    });
    notify('BUILD', `${building.name || building.label} Constructed!`, building.consequence || 'Settlement expanded.', { icon: '🏗️' });
  };

  const handleForageSupplies = () => {
    playSound?.('discovery');
    const bundle = levelId === 1
      ? { wood: 3, stone: 3, plants: 2, water: 2, flint: 2 }
      : levelId === 2
      ? { grain: 3, seeds: 3, water: 3, clay: 2, mud: 2, wood: 2, stone: 2, tools: 1 }
      : { wood: 3, stone: 3, food: 2, water: 2 };

    updateResources(bundle);
    setLevelState(prev => {
      const nextRes = { ...(prev.resources || {}) };
      Object.entries(bundle).forEach(([k, v]) => {
        nextRes[k] = (nextRes[k] || 0) + v;
      });
      return { ...prev, resources: nextRes };
    });

    setFeedback({
      type: 'success',
      text: 'Foraging expedition returned with fresh construction supplies! Added to your inventory.'
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col p-4 md:p-6 text-left space-y-5 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface/80 p-5 rounded-2xl border border-gold/30 shadow-xl">
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-gold flex items-center gap-1.5 mb-1">
            <Hammer size={14} className="text-gold" /> Stage 5: Civilization Builder & Settlement Planning
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#F5F1E8]">
            {builderConfig.eraTitle || config.title}
          </h3>
          <p className="text-xs md:text-sm text-content/80 mt-0.5">
            {builderConfig.eraSubtitle || 'Construct permanent structures to protect the community and secure generational survival.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleForageSupplies}
          className="px-4 py-2.5 rounded-xl bg-gold/20 border border-gold/50 text-gold hover:bg-gold hover:text-[#070A0C] font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          🌿 Forage Construction Supplies (+Supplies)
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-xs md:text-sm font-medium border flex items-center gap-2 animate-fade-in ${
          feedback.type === 'success'
            ? 'bg-green-900/30 border-green-500/50 text-green-200'
            : 'bg-red-900/30 border-red-500/50 text-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle size={18} className="text-green-400 shrink-0" /> : <AlertTriangle size={18} className="text-red-400 shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Main Builder Grid: Catalog on Left, Interactive 4x4 Grid on Right (Image 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Build Catalog */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-gold flex items-center justify-between">
            <span>Available Structures</span>
            <span className="text-content/60 font-mono">({currentBuilt.length}/2 Built)</span>
          </div>

          {availableBuildings.map((b) => {
            const isBuilt = currentBuilt.includes(b.id);
            const isSelected = selectedBuildingId === b.id;
            const affordable = canAfford(b.requirements);

            return (
              <div
                key={b.id}
                onClick={() => setSelectedBuildingId(b.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gold/15 border-gold shadow-lg'
                    : 'bg-surface/70 border-content/15 hover:border-gold/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-black/40 border border-content/10 shrink-0">
                    {b.icon || '⛺'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-sm text-[#F5F1E8] truncate">
                        {b.name || b.label}
                      </h4>
                      {isBuilt && (
                        <span className="text-[10px] font-bold text-green-400 bg-green-950/60 px-2 py-0.5 rounded-full border border-green-500/30">
                          Built ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-content/75 line-clamp-2 mb-2.5">
                      {b.description}
                    </p>

                    {/* Requirements checklist */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] mb-2">
                      {Object.entries(b.requirements || {}).map(([res, cost]) => {
                        const have = resources[res] || 0;
                        const met = have >= cost;
                        return (
                          <span
                            key={res}
                            className={`px-2 py-0.5 rounded-md font-bold ${
                              met
                                ? 'bg-green-900/30 text-green-300 border border-green-500/30'
                                : 'bg-red-900/30 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {have}/{cost} {res}
                          </span>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConstruct(b);
                      }}
                      disabled={!affordable}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                        affordable
                          ? 'bg-gold text-[#070A0C] font-extrabold hover:bg-gold/90 shadow-md'
                          : 'bg-surface/40 text-content/40 cursor-not-allowed border border-content/10'
                      }`}
                    >
                      {affordable ? `Construct ${b.name || b.label} →` : 'Need Resources'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Interactive 4x4 Settlement Grid (Matches User Image 5) */}
        <div className="lg:col-span-2 flex flex-col gap-4 bg-surface/60 border border-content/15 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
              <Grid size={14} /> Settlement Terrain Grid (Level {levelId})
            </span>
            <span className="text-xs text-content/60">
              🌿 Land Tiles • 💧 River Channel
            </span>
          </div>

          {/* 4x4 Settlement Grid Canvas */}
          <div className="grid grid-cols-4 gap-3 aspect-square max-w-md mx-auto w-full p-3 rounded-2xl bg-[#090C0F] border-2 border-content/20 shadow-inner">
            {Array.from({ length: 16 }, (_, idx) => {
              const isWater = (builderConfig.waterTiles || [2, 6, 10, 14]).includes(idx);
              const isCellBuilt = idx < currentBuilt.length;
              const buildingAtCell = isCellBuilt
                ? availableBuildings.find(b => b.id === currentBuilt[idx]) || availableBuildings[0]
                : null;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectedBuilding && handleConstruct(selectedBuilding)}
                  className={`relative rounded-xl border flex flex-col items-center justify-center p-2 transition-all duration-300 group ${
                    isCellBuilt
                      ? 'bg-green-950/40 border-green-500/60 shadow-lg'
                      : isWater
                      ? 'bg-blue-950/40 border-blue-500/40 hover:border-blue-400'
                      : 'bg-[#151B20]/80 border-content/15 hover:border-gold hover:bg-[#1A2228]'
                  }`}
                >
                  <span className="text-3xl md:text-4xl transition-transform group-hover:scale-110">
                    {isCellBuilt ? (buildingAtCell?.icon || '⛺') : isWater ? '💧' : '🌿'}
                  </span>
                  <span className="text-[10px] font-bold text-content/70 mt-1 truncate max-w-full">
                    {isCellBuilt ? (buildingAtCell?.name || 'Built') : isWater ? 'River' : `Plot ${idx + 1}`}
                  </span>
                  {isCellBuilt && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Construction Consequence & Historical Impact Box */}
          {selectedBuilding && (
            <div className="p-4 rounded-xl bg-black/40 border border-gold/25 text-left space-y-1.5">
              <div className="text-[11px] uppercase tracking-wider font-bold text-gold">
                Historical Purpose & Construction Impact
              </div>
              <p className="text-xs md:text-sm text-content/90 leading-relaxed">
                {selectedBuilding.consequence || 'Constructing permanent shelters, hearths, and tool workshops allowed early communities to pool resources, protect against predators, and pass on generational knowledge.'}
              </p>
            </div>
          )}
        </div>
      </div>
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
      case 6: return "REWARD";
      case 7: return "COMPLETE";
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
      case 6: return "Next: Claim your rewards.";
      case 7: return "Next: Complete the level.";
      default: return "";
    }
  };

  let items = [];
  
  if (stage === 1) {
    items = locations.filter(l => !l.isLockedNode).map(loc => ({
       id: loc.id,
       label: `Explore ${loc.label}`,
       isDone: levelState.exploration.includes(loc.id),
       onClick: () => handleLocationClick(loc),
       isLocked: false
    })).slice(0, targetExplore);
  } else if (stage === 2) {
    items = locations.filter(l => !l.isLockedNode).map(loc => {
       const isExplored = levelState.exploration.includes(loc.id);
       return {
         id: loc.id,
         label: `Investigate ${loc.label}`,
         isDone: levelState.discovery.includes(loc.id),
         isLocked: false,
         lockedReason: !isExplored ? "Explore first" : null,
         onClick: () => handleLocationClick(loc),
         reward: loc.yields ? true : false
       };
    }).slice(0, targetDiscover);
  } else if (stage === 3) {
    items = locations.filter(l => !l.isLockedNode).map(loc => {
       const isDiscovered = levelState.discovery.includes(loc.id);
       return {
         id: loc.id,
         label: `Learn about ${loc.label}`,
         isDone: levelState.learning.includes(loc.id),
         isLocked: false,
         lockedReason: !isDiscovered ? "Discover first" : null,
         onClick: () => handleLocationClick(loc)
       };
    }).slice(0, targetLearn);
  } else if (stage === 4) {
    const validActiveIds = (levelState.activeChallengeIds || []).filter(id => allChallenges.some(c => c.id === id));
    const challengeIdsToUse = validActiveIds.length > 0
      ? validActiveIds
      : allChallenges.slice(0, targetChallenges).map(c => c.id);
    items = challengeIdsToUse.map((id, idx) => {
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
         label: `Construct ${bAction.name || bAction.label || bAction.nameKey}`,
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
               disabled={item.isDone || (item.isLocked && stage !== 5)}
               className={"flex items-center justify-between text-left p-2 rounded-lg transition-all " + 
                 (item.isDone ? 'opacity-60' : 
                  item.isLocked ? (stage === 5 ? 'opacity-80 bg-surface/40 hover:bg-surface/80 border border-red-500/30 cursor-pointer' : 'opacity-40 cursor-not-allowed bg-surface/30') : 
                  'bg-surface/40 hover:bg-surface/80 border border-transparent hover:border-content/10')}
             >
                <div className="flex items-center gap-3">
                  {stateIcon}
                  <div className="flex flex-col">
                    <span className={"text-sm font-bold " + (item.isDone ? 'line-through' : '')}>{item.label}</span>
                    {item.isLocked && <span className={"text-[10px] uppercase font-bold " + (stage === 5 ? "text-red-400" : "text-content/50")}>{item.lockedReason} (Click to View)</span>}
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
                className={"p-3 rounded-lg border text-left transition-all " + (isMatched ? 'bg-green-900/40 border-green-500 opacity-50' : selectedLeft && !isMatched ? 'bg-surface hover:bg-surface/80 ring-1 ring-gold/50 cursor-pointer animate-pulse-slow' : 'bg-surface/30 opacity-70 cursor-not-allowed')}
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
        <div className="flex flex-col gap-2 min-h-[6rem] p-4 border border-dashed rounded-lg bg-surface/30">
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
  const { setBgType } = useBackground();
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
    playSound('event');
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




  const levelId = config.id;
  const isBeginner = config.id <= 3;
  const isIntermediate = config.id >= 4 && config.id <= 7;
  const isAdvanced = config.id >= 8 && config.id <= 11;

  const maxExplore = locations.length;
  const maxChallenges = allChallenges.length || 1;
  const maxBuilds = buildActions.length || 1;

  const isL1orL2 = config.id === 1 || config.id === 2;

  const targetExplore = isL1orL2
    ? Math.min(locations.length, maxExplore)
    : Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5, maxExplore);
  const targetDiscover = targetExplore;
  const targetLearn = targetExplore;

  const targetChallenges = config.id === 1
    ? Math.min(3, allChallenges.length)
    : config.id === 2
    ? Math.min(4, allChallenges.length)
    : Math.min(
        Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 4, maxChallenges),
        allChallenges.length
      );
  const targetBuilds = isL1orL2
    ? Math.min(2, maxBuilds)
    : Math.min(isBeginner ? 2 : isIntermediate ? 3 : isAdvanced ? 4 : 5, maxBuilds);

  const defaultState = {
    stage: 1,
    exploration: [],
    discovery: [],
    learning: [],
    exploredDetails: {},
    completedChallenges: [],
    completedEvents: [],
    activeChallengeIds: isL1orL2 ? allChallenges.map(c => c.id) : [],
    builtItems: [],
    resources: { ...config.defaultResources },
    activePopup: null
  };

  const [levelState, setLevelState] = useState(() => {
    const saved = gameState.activeLevelId === config.id && gameState.activeLevelState
      ? gameState.activeLevelState : null;
    if (saved) {
      const savedActiveIds = (saved.activeChallengeIds || []).filter(id => allChallenges.some(c => c.id === id));
      const savedExploration = (saved.exploration || saved.discovered || []).filter(id => locations.some(l => l.id === id));
      const savedDiscovery = (saved.discovery || []).filter(id => locations.some(l => l.id === id));
      const savedLearning = (saved.learning || []).filter(id => locations.some(l => l.id === id));
      const savedCompletedChallenges = (saved.completedChallenges || []).filter(id => allChallenges.some(c => c.id === id));
      const savedBuiltItems = (saved.builtItems || []).filter(id => buildActions.some(b => b.id === id));

      let computedStage = 1;
      if (savedExploration.length >= targetExplore) computedStage = 2;
      if (computedStage === 2 && savedDiscovery.length >= targetDiscover) computedStage = 3;
      if (computedStage === 3 && savedLearning.length >= targetLearn) computedStage = 4;
      if (computedStage === 4 && savedCompletedChallenges.length >= targetChallenges) computedStage = 5;
      if (computedStage === 5 && savedBuiltItems.length >= targetBuilds) {
        computedStage = saved.stage === 7 ? 7 : 6;
      }

      return {
        ...defaultState,
        ...saved,
        stage: computedStage,
        exploration: savedExploration,
        discovery: savedDiscovery,
        learning: savedLearning,
        exploredDetails: saved.exploredDetails || {},
        completedChallenges: savedCompletedChallenges,
        completedEvents: saved.completedEvents || [],
        activeChallengeIds: isL1orL2
          ? allChallenges.map(c => c.id)
          : savedActiveIds,
        builtItems: savedBuiltItems,
        resources: { ...defaultState.resources, ...(saved.resources || {}) },
        activePopup: null
      };
    }
    return defaultState;
  });

  useEffect(() => {
    if (levelState.activePopup?.type === 'explore' || levelState.activePopup?.type === 'discover') {
       setBgType(levelState.activePopup.data.id || `level${config.id}`);
    } else if (levelState.activePopup?.type === 'challenge') {
       setBgType('minigame');
    } else {
       setBgType(`level${config.id}`);
    }
  }, [levelState.activePopup, config.id, setBgType]);

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
      if (stage === 2) notify('SUCCESS', 'Stage Unlocked', config.id === 2 ? 'DISCOVER UNLOCKED. Uncover farming tools, pottery & granaries.' : 'DISCOVER UNLOCKED. Examine prehistoric tools & evidence.', { icon: '🔍' });
      if (stage === 3) notify('SUCCESS', 'Stage Unlocked', config.id === 2 ? 'LEARN UNLOCKED. Explore the agricultural transition.' : 'LEARN UNLOCKED. Uncover how early humans adapted.', { icon: '📖' });
      if (stage === 4) notify('SUCCESS', 'Stage Unlocked', config.id === 2 ? 'PLAY + SOLVE UNLOCKED. Plan planting, water & crop protection.' : 'PLAY + SOLVE UNLOCKED. Complete survival challenges.', { icon: '🎮' });
      if (stage === 5) notify('SUCCESS', 'Stage Unlocked', config.id === 2 ? 'BUILD / MANAGE UNLOCKED. Construct your farming settlement.' : 'BUILD / MANAGE UNLOCKED. Construct your shelter & hearth.', { icon: '🔨' });
      previousStage.current = stage;
    }
  }, [stage, notify]);

  useEffect(() => {
    updateActiveLevelState(config.id, levelState);
  }, [levelState, config.id]);

  // Challenge Selection Logic
  useEffect(() => {
     if (allChallenges.length > 0 && levelState.activeChallengeIds.length === 0) {
         if (config.id === 1 || config.id === 2) {
            setLevelState(prev => ({ ...prev, activeChallengeIds: allChallenges.map(c => c.id) }));
            return;
         }
         if (stage >= 3) {
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
     }
  }, [allChallenges, targetChallenges, levelState.activeChallengeIds.length, levelState.completedChallenges, stage, config.id]);

  const checkStageProgression = (newState) => {
    let currentStage = newState.stage;
    if (currentStage === 1 && newState.exploration.length >= targetExplore) currentStage = 2;
    if (currentStage === 2 && newState.discovery.length >= targetDiscover) currentStage = 3;
    if (currentStage === 3 && newState.learning.length >= targetLearn) currentStage = 4;
    if (currentStage === 4 && newState.completedChallenges.length >= targetChallenges) currentStage = 5;
    if (currentStage === 5 && newState.builtItems.length >= targetBuilds) currentStage = 6;
    // Stage 6 is REWARD (manual click to claim)
    // Stage 7 is COMPLETE
    return currentStage;
  };

  const handleLocationClick = (loc) => {
    playSound('ui');
    
    // Determine what interaction needs to happen based on progress, regardless of global stage
    const needsExplore = !exploration.includes(loc.id);
    const needsDiscover = exploration.includes(loc.id) && !discovery.includes(loc.id);
    const needsLearn = discovery.includes(loc.id) && !learning.includes(loc.id);
    
    if (stage === 1 || (stage >= 1 && needsExplore)) {
      if (needsExplore) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'explore', data: loc } }));
      }
    } else if (stage === 2 || (stage >= 2 && needsDiscover)) {
      if (needsDiscover) {
        setLevelState(prev => ({ ...prev, activePopup: { type: 'discover', data: loc } }));
      }
    } else if (stage === 3 || (stage >= 3 && needsLearn)) {
      if (needsLearn) {
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
      const nextExploration = prev.exploration.includes(loc.id) ? prev.exploration : [...prev.exploration, loc.id];
      const next = { ...prev, exploration: nextExploration, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Habitat Explored', `You explored ${loc.label} and gathered survival resources.`, { icon: '🗺️' });
  };

  const markDiscovered = (loc) => {
    playSound('discovery');
    unlockArtifact(loc.id);
    if (loc.artifactId) {
      unlockArtifact(loc.artifactId);
      if (checkQuestProgress) checkQuestProgress('explore', loc.artifactId);
    }
    if (checkQuestProgress) checkQuestProgress('explore', loc.id);
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
      const nextDiscovery = prev.discovery.includes(loc.id) ? prev.discovery : [...prev.discovery, loc.id];
      const next = { ...prev, discovery: nextDiscovery, resources: newResources, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Discovery Recorded', yieldStrings.length > 0 ? `Added to Inventory: ${yieldStrings.join(', ')}` : `You documented ${loc.discoveryTitle || loc.label}.`, { icon: '🏺' });
  };

  const markLearned = (loc) => {
    playSound('ui');
    setLevelState(prev => {
      const nextLearning = prev.learning.includes(loc.id) ? prev.learning : [...prev.learning, loc.id];
      const next = { ...prev, learning: nextLearning, activePopup: null };
      next.stage = checkStageProgression(next);
      return next;
    });
    notify('SUCCESS', 'Survival Knowledge Gained', `You mastered the lessons of ${loc.label}.`, { icon: '🧠' });
  };

  const startChallenge = (challenge) => {
    let dataToUse = challenge;
    if (challenge.format === 'mcq' || challenge.format === 'decision' || !challenge.format) {
       const shuffledOpts = challenge.options ? [...challenge.options].sort(() => Math.random() - 0.5) : [];
       dataToUse = { ...challenge, options: shuffledOpts };
    }
    setLevelState(prev => ({ ...prev, activePopup: { type: 'challenge', data: dataToUse, isBuild: false } }));
  };

  const handleChallengeAnswer = (challenge, isCorrect, isBuild, score = 0, customReward = null, costsToDeduct = null) => {
    playSound('ui');
    if (isCorrect) playSound('quest');
    if (!isCorrect) playSound('error');
    if (isCorrect) {
      setLevelState(prev => {
        const next = { ...prev, activePopup: null, resources: { ...prev.resources } };
        const isAlreadyCompleted = prev.completedChallenges.includes(challenge.id);

        if (costsToDeduct && typeof costsToDeduct === 'object') {
          Object.entries(costsToDeduct).forEach(([k, v]) => {
            next.resources[k] = Math.max(0, (next.resources[k] || 0) - v);
          });
        }

        let rewardToApply = customReward || challenge.reward;

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
          if (checkQuestProgress) checkQuestProgress('solve', challenge.id);
          if (!isReplay) updateResources({ xp: 50 + score });

          if (rewardToApply) {
            if (!isReplay) updateResources(rewardToApply);
            Object.keys(rewardToApply).forEach(k => {
              next.resources[k] = (next.resources[k] || 0) + rewardToApply[k];
            });
            const rewardStrings = Object.entries(rewardToApply).map(([k, v]) => `+${v} ${k}`).join(', ');
            notify('SUCCESS', 'Challenge Completed!', `Rewards: ${rewardStrings}`, { icon: '🏆' });
          } else {
            notify('SUCCESS', 'Challenge Completed!', 'Great job!', { icon: '🏆' });
          }
          next.completedChallenges = [...next.completedChallenges, challenge.id];
        } else {
          notify('SUCCESS', 'Challenge Replayed', 'You successfully completed this challenge again.', { icon: '🏆' });
        }

        next.stage = checkStageProgression(next);
        return next;
      });
    } else {
      setLevelState(prev => ({ ...prev, activePopup: { type: 'error', data: "That doesn't seem quite right. Try again!", retry: { type: 'challenge', data: challenge, isBuild } } }));
    }
  };

  const calculateLevelStars = () => {
    let stars = 1; 
    let minigameScore = 0;
    const mgResults = gameState.miniGameResults || {};
    let mgCount = 0;
    
    levelState.completedChallenges.forEach(cid => {
      if (mgResults[cid] && mgResults[cid].stars >= 2) minigameScore += 1;
      if (mgResults[cid]) mgCount++;
    });
    
    const hasGoodMinigames = mgCount > 0 && minigameScore >= Math.floor(mgCount / 2);
    if (hasGoodMinigames) stars += 1;
    
    const totalExplorable = config.locations ? config.locations.length : 0;
    const hasAllExplored = totalExplorable > 0 && levelState.discovery.length >= totalExplorable;
    if (hasAllExplored) stars += 1;
    
    return { stars, hasGoodMinigames, hasAllExplored };
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

    if (type === 'explore') return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className={"glass-panel relative rounded-2xl w-full max-h-[90vh] overflow-y-auto border shadow-2xl text-center flex flex-col " + theme.border + (type === 'challenge' && data.format === 'minigame' ? " max-w-4xl p-0" : " max-w-xl p-5 md:p-8")}>

          {type !== 'challenge' || data.format !== 'minigame' ? (
            <button
              type="button"
              onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface/80 border border-content/20 hover:border-gold text-content/70 hover:text-gold flex items-center justify-center text-sm font-bold z-10"
              aria-label="Close modal"
            >
              ✕
            </button>
          ) : null}

          {type === 'event' && (
              <WorldEvent
                data={data}
                theme={theme}
                levelState={levelState}
                onComplete={(eventId, cost, reward) => {
                  setLevelState(prev => {
                     const newRes = { ...prev.resources };
                     Object.entries(cost || {}).forEach(([k,v]) => { newRes[k] = (newRes[k] || 0) - v; });
                     Object.entries(reward || {}).forEach(([k,v]) => { newRes[k] = (newRes[k] || 0) + v; });
                     return {
                       ...prev,
                       resources: newRes,
                       completedEvents: [...prev.completedEvents, eventId],
                       activePopup: null
                     };
                  });
                }}
                onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
              />
            )}

          {type === 'artifact' && (
              <ArtifactInvestigation
                data={data}
                theme={theme}
                completedChallenges={levelState.completedChallenges}
                onComplete={(artifactId, reward) => {
                  handleChallengeAnswer({ id: artifactId, reward }, true, false, 50, reward);
                  setLevelState(prev => ({ ...prev, activePopup: null }));
                }}
                onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
              />
            )}

          {type === 'npc' && (
              <NPCInteraction
                data={data.npcData}
                theme={theme}
                resources={resources}
                completedChallenges={levelState.completedChallenges}
                onTurnIn={(questId, costs, reward) => {
                  const newRes = { ...resources };
                  Object.keys(costs).forEach(k => newRes[k] -= costs[k]);
                  setLevelState(prev => ({ ...prev, resources: newRes }));
                  handleChallengeAnswer({ id: questId, reward }, true, false, 50, reward);
                }}
                onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
              />
            )}

          {type === 'discover' && (
            <ArtifactDiscoverer data={data} theme={theme} ageGroup={ageGroup} onComplete={() => markDiscovered(data)} />
          )}

          {type === 'learn' && (
            <InteractiveLearnNode data={data} onComplete={() => markLearned(data)} theme={theme} isYoung={isYoung} playSound={playSound} ageGroup={ageGroup} levelId={config.id} />
          )}

          {type === 'challenge' && (
            <>
              {data.format === 'minigame' ? (
                <MiniGameManager
                  gameConfig={minigamesData[data.id]}
                  theme={theme}
                  onComplete={(success, score) => handleChallengeAnswer(data, success, isBuild, score)}
                  onClose={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
                />
              ) : (
                <>
                  <h3 className={"text-xl font-bold mb-2 uppercase " + theme.primary}>
                    {data.title || (isBuild ? "Management Crisis" : "Solve Challenge")}
                  </h3>
                  <p className="text-base md:text-lg text-content/90 mb-5 leading-relaxed">
                    {data.getQuestion ? data.getQuestion(ageGroup) : adaptQuestionForAge(data.question, ageGroup)}
                  </p>

                  {data.format === 'matching' ? (
                    <MatchingGame data={data} theme={theme} isYoung={isYoung} playSound={playSound} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
                  ) : data.format === 'ordering' ? (
                    <OrderingGame data={data} theme={theme} isYoung={isYoung} playSound={playSound} onComplete={(success) => handleChallengeAnswer(data, success, isBuild)} />
                  ) : data.format === 'cave_art' ? (
                    <CaveArtPuzzle data={data} theme={theme} onComplete={(success) => handleChallengeAnswer(data, success, isBuild, 50)} playSound={playSound} />
                  ) : data.format === 'interactive_survival' ? (
                    <SurvivalInteractive
                      data={data}
                      theme={theme}
                      resources={resources}
                      onComplete={(success, reward, costs) => handleChallengeAnswer(data, success, isBuild, 50, reward, costs)}
                    />
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
            const displayName = data.name || data.label || t(data.nameKey) || data.nameKey;
            const displayDesc = data.description || t(data.descKey) || data.descKey;

            return (
              <>
                <div className="text-5xl md:text-6xl mb-3">{data.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-content">{displayName}</h3>
                <p className="text-content/85 mb-4 text-sm md:text-base">{adaptTextForAge(displayDesc, ageGroup)}</p>

                {data.consequence && (
                  <div className="bg-gold/10 border border-gold/30 rounded-xl p-3.5 mb-5 text-left">
                    <div className="text-[11px] uppercase tracking-widest font-bold text-gold mb-1">
                      Construction Consequence & Community Impact
                    </div>
                    <p className="text-xs md:text-sm text-content/90 leading-relaxed">
                      {data.consequence}
                    </p>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 mb-6 text-left w-full justify-between">
                  {/* Requirements Box */}
                  <div className={"flex-1 p-4 rounded-xl border bg-surface/50 " + theme.border}>
                     <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-3 text-amber-400">Required Resources</p>
                     {Object.keys(reqs).length === 0 ? <span className="text-sm opacity-60">None</span> : (
                       <div className="flex flex-col gap-2">
                         {Object.entries(reqs).map(([k, v]) => {
                             const has = resources[k] || 0;
                             const isMet = has >= v;
                             return (
                               <div key={k} className="flex flex-col gap-1 text-sm border-b border-content/10 pb-2 mb-2 last:border-0 last:mb-0">
                                 <div className="flex justify-between items-center">
                                   <span className="font-bold capitalize">{k.replace(/_/g, ' ')}</span>
                                   <span className={isMet ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                                     {has} / {v} {isMet && <CheckCircle className="inline w-4 h-4 ml-1" />}
                                   </span>
                                 </div>
                                 {!isMet && (
                                   <div className="flex justify-between items-center mt-1 bg-red-900/10 p-2 rounded border border-red-500/20">
                                      <div className="flex items-center gap-2 text-xs text-content/70">
                                        <Search className="w-3 h-3 text-gold" />
                                        <span>{getResourceHint(k)}</span>
                                      </div>
                                      <button
                                        onClick={() => setLevelState(prev => ({ ...prev, activePopup: { type: 'gather_resources' } }))}
                                        className="text-xs px-2 py-1 bg-gold/20 text-gold font-bold rounded hover:bg-gold hover:text-[#171B3A] transition-colors uppercase tracking-wider"
                                      >
                                        Gather
                                      </button>
                                   </div>
                                 )}
                               </div>
                             );
                           })}
                       </div>
                     )}
                  </div>

                  {/* Effects Box */}
                  <div className={"flex-1 p-4 rounded-xl border bg-surface/50 " + theme.border}>
                     <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-3 text-green-400">Construction Outcome</p>
                     {(!data.effects || Object.keys(data.effects).length === 0) ? <span className="text-sm opacity-60">Milestone Completed</span> : (
                       <div className="flex flex-col gap-2">
                         {Object.entries(data.effects).map(([k, v]) => (
                           <div key={k} className="flex justify-between items-center text-sm">
                             <span className="font-bold capitalize">{k.replace(/_/g, ' ')}</span>
                             <span className="text-green-400 font-bold">+{v}</span>
                           </div>
                         ))}
                       </div>
                     )}
                  </div>
                </div>

                {!canAfford && (
                  <div className="bg-red-900/20 py-4 px-4 rounded-xl border border-red-500/30 mb-6 text-left">
                    <p className="text-red-400 text-sm font-bold mb-1">
                      Missing Required Resources!
                    </p>
                    <p className="text-content/80 text-xs md:text-sm mb-3">
                      You need more materials to construct this structure. Forage in the valley habitats or complete remaining survival tasks.
                    </p>
                    <button
                      onClick={() => {
                        setLevelState(prev => ({
                           ...prev,
                           activePopup: { type: 'gather_resources' }
                        }));
                      }}
                      className="px-4 py-2.5 bg-gold/20 text-gold font-bold text-sm rounded-lg border border-gold/40 hover:bg-gold hover:text-[#070A0C] transition-colors w-full"
                    >
                      Forage & Gather Missing Resources →
                    </button>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
                    className="px-6 py-3 font-bold rounded-xl w-full border border-content/20 hover:bg-surface/50"
                  >
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
                       if (data.effects) {
                          Object.entries(data.effects).forEach(([k, v]) => {
                            if (['food', 'wood', 'stone', 'water', 'plants', 'flint', 'grain', 'seeds', 'clay', 'mud', 'tools'].includes(k)) {
                              newResources[k] = (newResources[k] || 0) + v;
                            }
                          });
                          if (!isReplay) updateResources(data.effects);
                       }
                       setLevelState(prev => {
                         const nextBuilt = prev.builtItems.includes(data.id) ? prev.builtItems : [...prev.builtItems, data.id];
                         const next = { ...prev, resources: newResources, builtItems: nextBuilt, activePopup: null };
                         next.stage = checkStageProgression(next);
                         return next;
                       });
                       let effectStrings = [];
                       if (data.effects) {
                         Object.keys(data.effects).forEach(k => effectStrings.push(`+${data.effects[k]} ${k.replace(/_/g, ' ')}`));
                       }
                       if (checkQuestProgress) checkQuestProgress('build', data.id);
                       notify('BUILD', `${displayName} Constructed!`, effectStrings.length > 0 ? `Outcome: ${effectStrings.join(', ')}` : 'Structure completed.', { icon: '🏗️' });
                    }}
                    className={"px-6 py-3 font-bold rounded-xl w-full transition-all " + (canAfford ? theme.button : "opacity-60 cursor-not-allowed bg-surface/30 border-transparent text-content/80")}
                  >
                    Construct {displayName}
                  </button>
                </div>
              </>
            );
          })()}

          {type === 'gather_resources' && (() => {
             const uncompletedChallenges = allChallenges.filter(c => !levelState.completedChallenges.includes(c.id));
             const uncompletedLocations = locations.filter(l => !levelState.learning.includes(l.id));

             const handleForageExpedition = () => {
               playSound('discovery');
               const bundle = config.id === 1
                 ? { wood: 3, stone: 3, plants: 2, water: 2, flint: 1 }
                 : config.id === 2
                 ? { grain: 3, seeds: 3, water: 3, clay: 2, mud: 2, wood: 2, stone: 2, tools: 1 }
                 : { wood: 3, stone: 3, food: 2, water: 2 };
               if (!isReplay) updateResources(bundle);
               setLevelState(prev => {
                 const nextRes = { ...(prev.resources || {}) };
                 Object.entries(bundle).forEach(([k, v]) => {
                   nextRes[k] = (nextRes[k] || 0) + v;
                 });
                 return { ...prev, resources: nextRes, activePopup: null };
               });
               const notifMsg = config.id === 2
                 ? 'Gathered additional grain, seeds, water, clay, mud, timber, and stone for farming construction!'
                 : 'Gathered additional wood, stone, plants, water, and flint from the valley!';
               notify('SUCCESS', 'Supplies Expedition Complete', notifMsg, { icon: '🌿' });
             };

             return (
                <>
                   <h3 className={"text-xl font-bold mb-2 uppercase " + theme.primary}>
                     {config.id === 2 ? 'Gather Farming & Settlement Supplies' : 'Gather Survival Resources'}
                   </h3>
                   <p className="text-content/80 mb-5 text-sm">
                     {config.id === 2
                       ? 'Complete remaining tasks or lead an expedition along the river terraces and clay banks to gather supplies for settlement construction.'
                       : 'Complete remaining tasks or lead a foraging expedition into the valley to gather materials for shelter construction.'}
                   </p>

                   <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto mb-6 w-full text-left">
                      <div className="p-4 rounded-xl bg-gold/10 border border-gold/40 flex flex-col gap-2">
                        <div className="font-bold text-sm text-gold">
                          {config.id === 2 ? '🌾 River Terrace & Settlement Supply Expedition' : '🌿 Valley Foraging Expedition'}
                        </div>
                        <p className="text-xs text-content/80">
                          {config.id === 2
                            ? 'Gather alluvial clay, river timber, crop seeds, harvested grain, mud, and water to complete your village buildings.'
                            : 'Re-visit the forest groves, rocky outcrops, and riverbanks to collect fresh timber, stones, edible plants, and water.'}
                        </p>
                        <button
                          type="button"
                          onClick={handleForageExpedition}
                          className="mt-1 px-4 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs uppercase tracking-wider hover:bg-[#D9A441]/90 transition-all"
                        >
                          {config.id === 2
                            ? 'Gather Farming Materials (+3 Grain, +3 Seeds, +3 Water, +2 Clay, +2 Mud, +2 Wood, +2 Stone)'
                            : 'Forage Survival Materials (+3 Wood, +3 Stone, +2 Plants, +2 Water, +1 Flint)'}
                        </button>
                      </div>

                      {uncompletedChallenges.length > 0 && (
                         <>
                           <p className="text-xs uppercase font-bold text-gold tracking-widest mt-2">Available Challenges</p>
                           {uncompletedChallenges.map(chal => (
                             <button
                               key={`chal-${chal.id}`}
                               onClick={() => {
                                  setLevelState(prev => ({ ...prev, activePopup: null }));
                                  startChallenge(chal);
                                }}
                               className="p-3 bg-surface/50 border border-content/10 hover:border-gold rounded-lg transition-colors flex items-center justify-between"
                             >
                               <span className="font-bold text-sm">{chal.title || chal.titleKey || 'Solve Challenge'}</span>
                               <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">Reward</span>
                             </button>
                           ))}
                         </>
                      )}

                      {uncompletedLocations.length > 0 && (
                         <>
                           <p className="text-xs uppercase font-bold text-blue-400 tracking-widest mt-2">Unfinished Habitat Steps</p>
                           {uncompletedLocations.map(loc => (
                             <button
                               key={`loc-${loc.id}`}
                               onClick={() => {
                                  setLevelState(prev => ({ ...prev, activePopup: null }));
                                  handleLocationClick(loc);
                               }}
                               className="p-3 bg-surface/50 border border-content/10 hover:border-blue-400 rounded-lg transition-colors flex items-center justify-between"
                             >
                               <span className="font-bold text-sm">{loc.label}</span>
                               <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Visit</span>
                             </button>
                           ))}
                         </>
                      )}
                   </div>

                   <button
                     onClick={() => setLevelState(prev => ({ ...prev, activePopup: null }))}
                     className="px-6 py-3 font-bold rounded-xl w-full border border-content/20 hover:bg-surface/50 transition-colors"
                   >
                     Return to Map
                   </button>
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
             <div className="flex items-center gap-3">
               {lockToast && (
                 <div className="text-sm font-bold text-red-400 animate-fade-in bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30">
                   {lockToast}
                 </div>
               )}
               <button
                 type="button"
                 onClick={() => {
                   playSound('ui');
                   setLevelState({
                     ...defaultState,
                     resources: { ...config.defaultResources },
                     activeChallengeIds: isL1orL2 ? allChallenges.map(c => c.id) : []
                   });
                   notify('INFO', 'Level Reset', `Restarted ${config.title} from Stage 1.`, { icon: '🔄' });
                 }}
                 className="px-3 py-1.5 rounded-lg bg-surface/60 border border-content/15 hover:border-gold/50 text-xs font-bold text-content/70 hover:text-gold transition-colors"
               >
                 Restart Level
               </button>
             </div>
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
        </div>

        {/* MAP / INTERACTIVE AREA */}
        <div className={"flex-1 rounded-2xl border relative flex flex-col overflow-hidden " + theme.border + " " + theme.bg + "/10 backdrop-blur-sm"}>
          
          {stage === 6 && activePopup?.type !== 'reward' ? (
             <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 animate-fade-in text-center overflow-y-auto w-full">
                <div className="w-full max-w-2xl mx-auto flex flex-col items-center py-10 bg-surface/80 p-8 rounded-3xl border border-gold/30 shadow-2xl backdrop-blur-md">
                   
                     <Trophy className="w-20 h-20 mb-6 text-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-pulse-slow" />
                     <h3 className="text-4xl font-serif font-bold mb-4 text-gold">Level Objectives Met</h3>
                     
                     {(() => {
                        const { stars, hasGoodMinigames, hasAllExplored } = calculateLevelStars();
                        return (
                          <div className="flex flex-col items-center mb-8 w-full max-w-sm">
                            <div className="flex gap-4 mb-4">
                               {[1, 2, 3].map(s => (
                                  <Star key={s} className={`w-12 h-12 transition-all duration-1000 ${s <= stars ? 'text-gold fill-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] scale-110' : 'text-content/50'}`} />
                               ))}
                            </div>
                            <div className="text-left bg-black/40 border border-content/10 p-4 rounded-xl w-full text-sm space-y-2">
                              <p className="flex justify-between items-center text-content/90">
                                <span>⭐ Completion</span> 
                                <CheckCircle className="text-green-500 w-4 h-4"/>
                              </p>
                              <p className="flex justify-between items-center text-content/90">
                                <span>⭐ Objective Accuracy</span> 
                                {hasGoodMinigames ? <CheckCircle className="text-green-500 w-4 h-4"/> : <span className="text-content/40">Missed</span>}
                              </p>
                              <p className="flex justify-between items-center text-content/90">
                                <span>⭐ Bonus Exploration</span> 
                                {hasAllExplored ? <CheckCircle className="text-green-500 w-4 h-4"/> : <span className="text-content/40">Missed</span>}
                              </p>
                            </div>
                          </div>
                        );
                     })()}

                     <p className="text-lg text-content/80 mb-8">You have successfully Explored, Discovered, Learned, Solved, and Built your civilization.</p>

                   <button 
                     onClick={() => {
                        playSound('reward');
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
                <div className="relative h-full p-4 md:p-8 flex flex-col items-center justify-start z-10 animate-fade-in text-center overflow-y-auto w-full hide-scrollbar">
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
                    <div className="w-full max-w-5xl mx-auto flex flex-col items-center py-6">
                      
                      {/* Header Summary */}
                      <div className="mb-8 w-full">
                         <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-bold tracking-widest uppercase mb-4">
                            <CheckCircle className="w-5 h-5" /> Civilization Mastered
                         </div>
                         <h2 className={"text-4xl md:text-5xl font-serif font-extrabold mb-2 text-white drop-shadow-md"}>
                           {t(`levels.${config.id}.title`, config.title)}
                         </h2>
                         <p className="text-xl text-content/70 italic font-serif">Level {config.id} Completion Summary</p>
                      </div>

                      {/* Main Grid */}
                      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 text-left">
                        
                        {/* Column 1: Star Rating & Progression */}
                        <div className="flex flex-col gap-6">
                           <div className={"p-6 rounded-3xl border bg-surface/80 flex flex-col items-center text-center shadow-xl backdrop-blur-sm " + theme.border}>
                              <h4 className={"font-bold mb-4 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Performance Rating</h4>
                              {(() => {
                                 const { stars, hasGoodMinigames, hasAllExplored } = calculateLevelStars();
                                 return (
                                   <>
                                     <div className="flex gap-2 mb-6">
                                        {[1, 2, 3].map(s => (
                                           <Star key={s} className={`w-10 h-10 transition-all duration-1000 ${s <= stars ? 'text-gold fill-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] scale-110' : 'text-content/50'}`} />
                                        ))}
                                     </div>
                                     <div className="w-full space-y-3 text-sm">
                                        <div className="flex justify-between items-center bg-black/30 p-3 rounded-xl">
                                          <span>Basic Completion</span>
                                          <CheckCircle className="text-green-500 w-4 h-4"/>
                                        </div>
                                        <div className={`flex justify-between items-center bg-black/30 p-3 rounded-xl ${hasGoodMinigames ? '' : 'opacity-50'}`}>
                                          <span>Objective Accuracy</span>
                                          {hasGoodMinigames ? <CheckCircle className="text-green-500 w-4 h-4"/> : <span className="text-content/50 text-xs uppercase font-bold">Missed</span>}
                                        </div>
                                        <div className={`flex justify-between items-center bg-black/30 p-3 rounded-xl ${hasAllExplored ? '' : 'opacity-50'}`}>
                                          <span>Full Exploration</span>
                                          {hasAllExplored ? <CheckCircle className="text-green-500 w-4 h-4"/> : <span className="text-content/50 text-xs uppercase font-bold">Missed</span>}
                                        </div>
                                     </div>
                                   </>
                                 );
                              })()}
                           </div>

                           {/* XP & Rewards */}
                           <div className={"p-6 rounded-3xl border bg-gradient-to-br from-surface to-black/50 shadow-xl backdrop-blur-sm " + theme.border}>
                              <h4 className={"font-bold mb-4 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Rewards Earned</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-black/40 p-4 rounded-xl text-center border border-content/10">
                                  <div className="text-2xl mb-1">🏺</div>
                                  <div className="text-2xl font-bold text-emerald-400">100</div>
                                  <div className="text-[10px] uppercase tracking-widest text-content/60">Legacy XP</div>
                                </div>
                                <div className="bg-black/40 p-4 rounded-xl text-center border border-content/10">
                                  <div className="text-2xl mb-1">📜</div>
                                  <div className="text-2xl font-bold text-blue-400">Unlock</div>
                                  <div className="text-[10px] uppercase tracking-widest text-content/60">Next Era</div>
                                </div>
                              </div>
                           </div>
                        </div>

                        {/* Column 2 & 3: Assets & Achievements */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                           
                           {/* World Built */}
                           <div className={"p-6 rounded-3xl border bg-surface/80 shadow-xl backdrop-blur-sm " + theme.border}>
                              <div className="flex justify-between items-center mb-4">
                                <h4 className={"font-bold uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Civilization Built</h4>
                                <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-content/60">{levelState.builtItems.length} Structures</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {levelState.builtItems.length === 0 ? (
                                  <div className="col-span-full p-4 text-center text-content/40 italic text-sm bg-black/20 rounded-xl">No permanent structures built.</div>
                                ) : (
                                  levelState.builtItems.map(id => {
                                    const bItem = buildActions.find(b => b.id === id);
                                    if (!bItem) return null;
                                    return (
                                      <div key={'b'+id} className="flex flex-col items-center justify-center gap-2 bg-black/40 p-4 rounded-xl border border-content/10 hover:border-gold/30 transition-colors">
                                        <span className="text-3xl drop-shadow-md">{bItem.icon || '🏗️'}</span>
                                        <span className="text-xs font-bold text-center leading-tight text-content/90">{bItem.label || t(bItem.nameKey)}</span>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                           </div>

                           {/* Resources Generated */}
                           <div className={"p-6 rounded-3xl border bg-surface/80 shadow-xl backdrop-blur-sm " + theme.border}>
                              <h4 className={"font-bold mb-4 uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Final Treasury</h4>
                              <div className="flex flex-wrap gap-3">
                                {Object.entries(levelState.resources || {}).filter(([_,v])=>v>0).map(([k,v]) => (
                                  <div key={k} className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-content/10">
                                    <span className="text-gold font-bold">{v}</span>
                                    <span className="text-sm capitalize text-content/80">{k.replace('_', ' ')}</span>
                                  </div>
                                ))}
                                {Object.values(levelState.resources || {}).every(v=>v<=0) && (
                                  <span className="text-content/40 italic text-sm">Treasury empty.</span>
                                )}
                              </div>
                           </div>

                           {/* Artifacts & Events */}
                           <div className={"p-6 rounded-3xl border bg-surface/80 shadow-xl backdrop-blur-sm " + theme.border}>
                              <div className="flex justify-between items-center mb-4">
                                <h4 className={"font-bold uppercase tracking-widest text-xs opacity-80 " + theme.primary}>Discoveries & Events</h4>
                                <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-content/60">{levelState.discovery.length} Found</span>
                              </div>
                              <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto hide-scrollbar pr-2">
                                {levelState.discovery.map(id => {
                                   const loc = locations.find(l => l.id === id);
                                   if (!loc) return null;
                                   const isSpecial = loc.isArtifact || loc.isEvent;
                                   return (
                                     <div key={'d'+id} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isSpecial ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-black/40 border-content/10 text-content/80'}`}>
                                       <span className="text-xl">{loc.icon}</span>
                                       <span className="text-xs font-bold whitespace-nowrap">{loc.label}</span>
                                     </div>
                                   );
                                })}
                              </div>
                           </div>

                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center mt-4 pb-12">
                         <button 
                           onClick={() => {
                             playSound('ui');
                             handleCompleteLevel();
                             navigate('/journey');
                           }}
                           className="flex-1 max-w-[280px] px-8 py-5 bg-gradient-to-r from-gold to-emerald-600 text-[#111] font-extrabold text-lg rounded-2xl hover:shadow-[0_0_30px_rgba(212,166,74,0.6)] hover:scale-105 transition-all"
                         >{levelId === 14 ? "Complete Heritage Journey" : "Continue Journey"}</button>
                         <button 
                           onClick={() => {
                             playSound('ui');
                             handleCompleteLevel();
                             window.location.reload();
                           }}
                           className="flex-1 max-w-[280px] px-8 py-5 bg-surface border border-content/20 text-content font-bold text-lg rounded-2xl hover:bg-surface-light hover:border-content/50 transition-all"
                         >
                           Replay Level
                         </button>
                      </div>

                    </div>
                  )}
                </div>
              ) : activePopup?.type === 'explore' ? (
                <ExplorePanel
                   data={activePopup.data}
                   theme={theme}
                   ageGroup={ageGroup}
                   isYoung={isYoung}
                   isReplay={isReplay}
                   markExplored={markExplored}
                   playSound={playSound}
                   updateResources={updateResources}
                   setLevelState={setLevelState}
                   levelState={levelState}
                />
            ) : (
            <div className="relative h-full p-6 md:p-8 flex flex-col items-center justify-center z-10 overflow-y-auto gap-6">
              <div className="flex flex-wrap gap-5 md:gap-6 items-center justify-center content-center">
                {locations.map(loc => {
                  const isExplored = exploration.includes(loc.id);
                  const isDiscovered = discovery.includes(loc.id);
                  const isLearned = learning.includes(loc.id);

                  let isClickable = false;
                  let actionBadge = 'Explore';
                  if (loc.isLockedNode) {
                    isClickable = false;
                    actionBadge = 'Locked';
                  } else {
                    if (loc.isNpc || loc.isArtifact || loc.isEvent) isClickable = true;
                    if (!isExplored) {
                      isClickable = true;
                      actionBadge = '1. Explore';
                    } else if (!isDiscovered) {
                      isClickable = stage >= 2;
                      actionBadge = stage >= 2 ? '2. Discover' : 'Explored ✓';
                    } else if (!isLearned) {
                      isClickable = stage >= 3;
                      actionBadge = stage >= 3 ? '3. Learn' : 'Discovered ✓';
                    } else {
                      isClickable = stage === 4 || stage === 5;
                      actionBadge = 'Completed ✓';
                    }
                  }

                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleLocationClick(loc)}
                      disabled={!isClickable}
                      aria-label={`Map Node: ${loc.label}. ${!isClickable ? 'Completed' : 'Click to interact'}`}
                      className={"relative flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-2xl border-2 transition-all group p-3 " +
                        (isLearned ? theme.bg + "/85 border-green-500/50" : isDiscovered ? theme.bg + "/80 " + theme.border : isExplored ? theme.bg + "/50 border-gold/40" : "bg-surface/75 border-content/20") + " " +
                        (isClickable ? 'hover:border-gold hover:scale-105 shadow-xl cursor-pointer' : 'opacity-85 cursor-default')
                      }
                    >
                      <span className={"text-4xl md:text-5xl mb-2 transition-transform " + (!isExplored ? 'opacity-85' : '')}>
                        {loc.isLockedNode ? '🔒' : loc.icon}
                      </span>
                      <span className={"text-xs md:text-sm font-bold text-center leading-tight line-clamp-2 " + (isDiscovered ? theme.primary : 'text-content')}>
                        {loc.isLockedNode ? 'Locked' : loc.label}
                      </span>
                      <span className={"mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full " + (isLearned ? 'bg-green-900/40 text-green-300 border border-green-500/30' : isClickable ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-black/30 text-content/60')}>
                        {actionBadge}
                      </span>
                      {isLearned && (
                        <div className={"absolute -top-2 -right-2 rounded-full p-1 border-2 border-transparent text-[#171B3A] " + theme.primaryBg}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {stage === 4 && (
                <div className="w-full max-w-4xl bg-surface/85 border border-gold/30 rounded-2xl p-4 md:p-5 shadow-xl animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
                    Stage 4: Play & Solve {config.id === 2 ? 'Farming & Planning Challenges' : 'Survival Challenges'} ({completedChallenges.length}/{targetChallenges})
                  </div>
                  <div className={`grid grid-cols-1 ${allChallenges.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'} gap-3`}>
                    {allChallenges.slice(0, targetChallenges).map((chal, idx) => {
                      const isDone = completedChallenges.includes(chal.id);
                      return (
                        <button
                          key={chal.id}
                          onClick={() => startChallenge(chal)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${isDone ? 'bg-green-900/20 border-green-500/40 text-green-300' : 'bg-black/40 border-gold/40 hover:border-gold hover:bg-gold/10 text-content'}`}
                        >
                          <div className="text-xs font-bold uppercase tracking-wider opacity-75">
                            Challenge {idx + 1}
                          </div>
                          <div className="font-bold text-sm leading-snug">
                            {chal.title || `Challenge ${idx + 1}`}
                          </div>
                          <div className="text-[11px] font-bold uppercase text-gold">
                            {isDone ? '✓ Completed (Replay)' : 'Start Challenge →'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {stage === 5 && (
                <Stage5Builder
                  config={config}
                  theme={theme}
                  levelState={levelState}
                  setLevelState={setLevelState}
                  resources={resources}
                  updateResources={updateResources}
                  playSound={playSound}
                  notify={notify}
                  checkQuestProgress={checkQuestProgress}
                />
              )}
            </div>
          )}
        </div>
      </div>
      {renderPopup()}
      <KalaCompanion stage={stage} levelId={config.id} levelState={levelState} inventory={levelState.resources} activeChallenge={levelState.activePopup?.type === 'challenge' ? levelState.activePopup.data : null} ageGroup={ageGroup} />
    </div>
  );
};

export default LevelEngine;
