const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// I will find the MatchingGame and OrderingGame functions entirely and replace them.
// They are at the very top of the file.

const updatedTop = `import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import FinalSequence from './FinalSequence';
import { useAchievements } from '../../context/AchievementContext';
import { Star, CheckCircle, ArrowRight, Bot, Target, Lock, Play, Hammer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { levelThemes } from '../../data/levelThemes';
import ResourceCard from './ResourceCard';
import { getBuilderDataForLevel } from '../../data/civilizationBuilder';

const MatchingGame = ({ data, onComplete, theme, isYoung }) => {
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

const OrderingGame = ({ data, onComplete, theme, isYoung }) => {
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

const LevelEngine = ({ config }) => {`;

const matchStart = code.indexOf('const MatchingGame =');
const matchEnd = code.indexOf('const LevelEngine = ({ config }) => {');
const updatedCode = code.slice(0, matchStart) + updatedTop + code.slice(matchEnd + 'const LevelEngine = ({ config }) => {'.length);

// Also I need to remove that dangling `    </>` at the end of the file which my previous script probably added randomly.
const fixedTail = updatedCode.replace(/<\/div>\n    <\/>\n  \);\n\};/g, '</div>\n  );\n};');

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', fixedTail);
console.log("Completely repaired components!");
