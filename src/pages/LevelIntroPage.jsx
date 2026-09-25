import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { civilizationLevels } from '../data/civilizationLevels';
import { levelThemes } from '../data/levelThemes';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { ArrowLeft, PlayCircle, Map, Search, BookOpen, Target, Hammer, ArrowRight } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const StageGuide = () => (
  <div className="mb-10 w-full overflow-x-auto hide-scrollbar">
    <h2 className="text-xl font-serif font-bold text-content mb-4 text-center md:text-left">Gameplay Flow</h2>
    <div className="flex items-center gap-2 min-w-[600px] bg-main/40 p-4 rounded-2xl border border-content/10">
      <div className="flex flex-col items-center flex-1 text-center opacity-80">
        <Map className="text-blue-400 mb-2" size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Explore</span>
      </div>
      <ArrowRight className="text-content/20" size={16} />
      <div className="flex flex-col items-center flex-1 text-center opacity-80">
        <Search className="text-purple-400 mb-2" size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Discover</span>
      </div>
      <ArrowRight className="text-content/20" size={16} />
      <div className="flex flex-col items-center flex-1 text-center opacity-80">
        <BookOpen className="text-green-400 mb-2" size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Learn</span>
      </div>
      <ArrowRight className="text-content/20" size={16} />
      <div className="flex flex-col items-center flex-1 text-center opacity-80">
        <Target className="text-red-400 mb-2" size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Play + Solve</span>
      </div>
      <ArrowRight className="text-content/20" size={16} />
      <div className="flex flex-col items-center flex-1 text-center opacity-80">
        <Hammer className="text-gold mb-2" size={24} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Build</span>
      </div>
    </div>
  </div>
);

const LevelIntroPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gameState } = useGame();
  const { playSound } = useAudio();
  
  const levelId = parseInt(id, 10);
  const level = civilizationLevels.find(l => l.id === levelId);

  if (!level) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-gold">Level not found</h2>
        <button onClick={() => navigate('/journey')} className="mt-4 text-content underline">Return to Journey</button>
      </div>
    );
  }

  // Check if locked
  const unlockedLevels = gameState.unlockedLevels || [1];
  if (!unlockedLevels.includes(levelId)) {
    return (
      <div className="text-center py-20 glass-panel p-12 max-w-lg mx-auto rounded-2xl border border-red-500/30">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Level Locked</h2>
        <p className="text-content/70 mb-6">You must complete the previous levels before entering this era.</p>
        <button onClick={() => navigate('/journey')} className="px-6 py-2 bg-main border border-content/20 rounded-xl hover:bg-[#F5E8CC]/10">Return to Journey</button>
      </div>
    );
  }

  // Adaptive Intro text
  const introText = level.getIntroText ? level.getIntroText(gameState.ageGroup) : `Explore the era of ${level.title}.`;

  const isResuming = gameState.activeLevelId === level.id && gameState.activeLevelState;
  const isCompleted = gameState.completedLevels?.includes(level.id);

  return (
    <div className="max-w-4xl mx-auto py-8">
      

      <div className="glass-panel rounded-3xl border border-gold/30 overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 text-9xl pointer-events-none">
          {level.icon}
        </div>
        
        <div className="p-8 md:p-12 relative z-10">
          <p className="text-gold font-bold tracking-[0.2em] uppercase mb-2">Level {level.id}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-4">
             <div className="hidden md:block"><BackButton /></div> 
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-content">{level.title}</h1>
          </div>
          <p className="text-sm font-mono text-content/60 mb-10">{level.historicalPeriod}</p>
          
          <div className="bg-main/60 border border-content/10 p-6 md:p-8 rounded-2xl mb-10 max-w-3xl">
            <h2 className="text-xl font-serif font-bold text-gold mb-4">Main Goal</h2>
            <p className="text-content text-lg leading-relaxed">{introText}</p>
          </div>

          <h2 className="text-xl font-serif font-bold text-content mb-6">Major Objectives:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 max-w-2xl">
            {level.focus.map((item, idx) => (
              <div key={idx} className="bg-surface/50 border border-gold/20 px-4 py-3 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-content font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>

          {!isResuming && <StageGuide />}

          <div className="flex flex-col sm:flex-row gap-4 border-t border-gold/20 pt-8">
            <button 
              onClick={() => navigate(`/journey/level/${level.id}/play`)}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-terracotta text-[#171B3A] font-bold text-lg rounded-xl shadow-xl shadow-gold/40 hover:shadow-[#D4A64A]/60 hover:scale-105 transition-all w-full md:w-auto"
            >
              <PlayCircle className="w-6 h-6" />
              {isResuming ? "CONTINUE LEVEL" : isCompleted ? "REPLAY LEVEL" : "START LEVEL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelIntroPage;
