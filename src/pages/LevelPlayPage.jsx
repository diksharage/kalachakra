import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levelConfigs } from '../data/levelConfigs';
import { levelThemes } from '../data/levelThemes';
import { useGame } from '../context/GameContext';
import LevelEngine from '../components/gameplay/LevelEngine';
import { AlertTriangle } from 'lucide-react';

const LevelPlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gameState } = useGame();
  
  const config = levelConfigs[id];
  const levelId = parseInt(id, 10);
  const unlockedLevels = gameState.unlockedLevels || [1];
  const theme = levelThemes[levelId] || levelThemes[1];

  if (!unlockedLevels.includes(levelId)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-400 mb-2">Level Locked</h2>
        <p className="text-content/70 mb-6">You must complete previous levels to access this era.</p>
        <button onClick={() => navigate('/journey')} className="px-6 py-3 bg-gold text-[#171B3A] font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface">Return to Journey</button>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertTriangle className="w-16 h-16 text-gold mb-4" />
        <h2 className="text-2xl font-bold text-content mb-2">Level {id} Under Construction</h2>
        <p className="text-content/70 mb-6">This level's gameplay is being excavated by archaeologists.</p>
        <button onClick={() => navigate('/journey')} className="px-6 py-3 bg-gold text-[#171B3A] font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-surface">Return to Journey</button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-6rem)]">
      {/* Dynamic atmospheric theme background */}
      <div className={`absolute inset-[-2rem] md:inset-[-4rem] opacity-30 dark:opacity-10 bg-gradient-to-br ${theme.gradient} pointer-events-none -z-10 mix-blend-overlay dark:mix-blend-color-burn`} style={{ maskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 40%, transparent 100%)' }} />
      <LevelEngine key={id} config={config} />
    </div>
  );
};

export default LevelPlayPage;
