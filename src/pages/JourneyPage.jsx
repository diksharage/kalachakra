import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { civilizationLevels } from '../data/civilizationLevels';
import { useBackground } from '../context/BackgroundContext';
import { 
  Map as MapIcon, Compass, Lock, CheckCircle, 
  ChevronRight, Star, PlayCircle, Info
} from 'lucide-react';

const JourneyPage = () => {
  const { t } = useLanguage();
  const { gameState, notify } = useGame();
  const { playSound } = useAudio();
  const navigate = useNavigate();
  const { setBgType } = useBackground();

  React.useEffect(() => {
    setBgType('map');
  }, [setBgType]);

  const totalLevels = civilizationLevels.length;
  const unlockedLevels = gameState.unlockedLevels || [1];
  const completedLevels = gameState.completedLevels || [];
  const currentLevel = Math.min(gameState.currentLevel || 1, 14);

  const completedCount = completedLevels.length;
  const lockedCount = totalLevels - unlockedLevels.length;
  const currentCount = 1;

  const handleLevelClick = (levelId) => {
    playSound('ui');
    if (unlockedLevels.includes(levelId)) {
      if (gameState.activeLevelId === levelId && gameState.activeLevelState) {
         navigate(`/journey/level/${levelId}/play`);
      } else {
         navigate(`/journey/level/${levelId}`);
      }
    } else {
      notify('ERROR', 'Level Locked', `Complete Level ${levelId - 1} to unlock this era.`);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6 min-h-screen text-content animate-fade-in">
      
      {/* 1. HEADER SECTION */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-gold/20 flex flex-col justify-end p-8 md:p-12 mb-8 bg-surface/50">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/dashboard.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.3
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-main via-main/90 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-main via-transparent to-transparent opacity-80 z-0" />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-4 text-gold mb-2">
              <MapIcon size={32} />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-md">
                Journey Map
              </h1>
            </div>
            <div className="text-gold font-bold tracking-widest text-sm uppercase">14 Levels • One Incredible Journey</div>
            <p className="text-white/80 text-lg leading-relaxed drop-shadow-md">
              Explore India's rich history and heritage through 14 immersive levels. Each level takes you through a different era, civilization and cultural experience.
            </p>
          </div>
          
          <div className="hidden lg:flex flex-col items-end max-w-sm text-right pt-4">
            <p className="text-xl font-serif italic text-white/90 drop-shadow-lg leading-relaxed">
              "The past is not gone,<br/>it lives in what we build today."
            </p>
            <div className="flex items-center justify-end gap-2 mt-4 opacity-50">
               <div className="w-12 h-px bg-gold"></div>
               <div className="w-2 h-2 rotate-45 border border-gold"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (9 cols) - THE MAP */}
        <div className="xl:col-span-9">
          
          <div className="glass-panel rounded-2xl border border-content/10 relative overflow-hidden flex flex-col min-h-[600px] shadow-2xl">
            
            {/* The Map Background */}
            <div 
              className="absolute inset-0 z-0"
              style={{ 
                backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/map_bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.8
              }}
            />
            {/* Dark gradient vignette for readability */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-main/80 z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-main/60 via-transparent to-main/90 z-0" />

            {/* Map Header & Legend */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-main/40 backdrop-blur-sm border-b border-gold/10">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <Compass className="text-gold" size={24} />
                <div>
                  <div className="flex justify-between text-xs font-bold text-white/80 mb-1">
                    <span>Your Progress</span>
                    <span>{completedCount} / 14 Levels</span>
                  </div>
                  <div className="w-48 h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full"
                      style={{ width: `${(completedCount / 14) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-wider text-white/80">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> Completed</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_8px_#fbbf24]" /> Current</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-surface border border-gold/50" /> Unlocked</div>
                <div className="flex items-center gap-1.5"><Lock size={12} className="text-white/40" /> Locked</div>
              </div>
            </div>

            {/* The Nodes Grid */}
            <div className="relative z-10 flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
               
               {/* Connecting Dotted Line Background */}
               <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-dashed border-gold/20 rounded-[40px] pointer-events-none hidden md:block" />
               <div className="absolute top-1/2 left-12 right-12 border-t-2 border-dashed border-gold/20 pointer-events-none hidden md:block" />

               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 relative z-10">
                 {civilizationLevels.map((level) => {
                   const isUnlocked = unlockedLevels.includes(level.id);
                   const isCompleted = completedLevels.includes(level.id);
                   const isCurrent = currentLevel === level.id && !isCompleted;
                   
                   // Dynamic styling based on state
                   let ringColor = 'border-content/10';
                   let innerBg = 'bg-surface/50';
                   if (isCurrent) {
                     ringColor = 'border-gold shadow-[0_0_30px_rgba(212,166,74,0.6)] animate-pulse-glow';
                     innerBg = 'bg-gold/20';
                   } else if (isCompleted) {
                     ringColor = 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                     innerBg = 'bg-emerald-900/30';
                   } else if (isUnlocked) {
                     ringColor = 'border-gold/50 hover:border-gold';
                     innerBg = 'bg-surface';
                   }

                   return (
                     <div 
                       key={level.id}
                       onClick={() => handleLevelClick(level.id)}
                       className={`flex flex-col items-center text-center group ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
                     >
                       {/* Node Marker */}
                       <div className="relative mb-4">
                         {/* Optional "Current" Badge */}
                         {isCurrent && (
                           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-main text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-20 shadow-md">
                             Current
                           </div>
                         )}
                         
                         {/* Main Circle */}
                         <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 ${ringColor} ${innerBg} p-1 transition-all duration-300 group-hover:scale-105 relative z-10 flex items-center justify-center`}>
                           {/* Fallback image block inside node */}
                           <div className="w-full h-full rounded-full overflow-hidden bg-main/50 relative border border-black/50">
                             <div className="absolute inset-0 flex items-center justify-center text-gold/30">
                                <span className="font-serif text-3xl font-bold opacity-30">{level.id}</span>
                             </div>
                             {/* Dark overlay for locked */}
                             {!isUnlocked && <div className="absolute inset-0 bg-main/80 backdrop-blur-sm flex items-center justify-center"><Lock className="text-white/30 w-6 h-6" /></div>}
                           </div>
                         </div>
                         
                         {/* Checkmark for completed */}
                         {isCompleted && (
                           <div className="absolute bottom-0 right-0 bg-emerald-500 text-main rounded-full p-1 z-20 shadow-lg border-2 border-main">
                             <CheckCircle size={14} className="text-white" fill="#10b981" />
                           </div>
                         )}
                         {/* Lock for locked */}
                         {!isUnlocked && (
                           <div className="absolute bottom-0 right-0 bg-surface text-content rounded-full p-1 z-20 shadow-lg border-2 border-content/10">
                             <Lock size={14} className="text-white/50" />
                           </div>
                         )}
                         {/* Play icon for unlocked/current on hover */}
                         {isUnlocked && !isCompleted && (
                           <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="bg-main/80 rounded-full p-2 backdrop-blur-sm">
                               <PlayCircle size={24} className="text-gold" />
                             </div>
                           </div>
                         )}
                       </div>
                       
                       {/* Label */}
                       <div className="w-full">
                         <div className="text-[10px] font-bold text-gold mb-1">Level {level.id}</div>
                         <h3 className={`text-xs md:text-sm font-bold leading-tight ${isCurrent || isUnlocked ? 'text-white' : 'text-white/50'}`}>
                           {t(`levels.${level.id}.title`, level.title)}
                         </h3>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (3 cols) - OVERVIEW PANELS */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* JOURNEY OVERVIEW CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <Compass className="text-gold" size={20} />
              <h2 className="text-lg font-serif font-bold text-content">Journey Overview</h2>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4 bg-surface/30 p-3 rounded-xl border border-content/5">
                <Star className="text-gold" size={20} />
                <div className="text-xl font-bold text-white w-8 text-center">{totalLevels}</div>
                <div className="text-xs text-white/60">Total Levels</div>
              </div>
              <div className="flex items-center gap-4 bg-emerald-900/10 p-3 rounded-xl border border-emerald-500/10">
                <CheckCircle className="text-emerald-500" size={20} />
                <div className="text-xl font-bold text-white w-8 text-center">{completedCount}</div>
                <div className="text-xs text-white/60">Completed</div>
              </div>
              <div className="flex items-center gap-4 bg-gold/10 p-3 rounded-xl border border-gold/20">
                <PlayCircle className="text-gold" size={20} />
                <div className="text-xl font-bold text-white w-8 text-center">{currentCount}</div>
                <div className="text-xs text-white/60">Current</div>
              </div>
              <div className="flex items-center gap-4 bg-surface/30 p-3 rounded-xl border border-content/5">
                <Lock className="text-white/30" size={20} />
                <div className="text-xl font-bold text-white/50 w-8 text-center">{lockedCount}</div>
                <div className="text-xs text-white/40">Locked</div>
              </div>
            </div>
          </div>

          {/* EXPLORE THE JOURNEY CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <MapIcon className="text-gold" size={20} />
              <h2 className="text-lg font-serif font-bold text-content">Explore the Journey</h2>
            </div>
            <p className="text-sm text-content/60 leading-relaxed mb-6 relative z-10">
              Each level brings you closer to understanding India's incredible civilization, culture and heritage.
            </p>
            <button 
              onClick={() => { playSound('ui'); document.querySelector('.custom-scrollbar')?.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="w-full px-5 py-3 rounded-xl font-bold bg-gold/10 text-gold border border-gold/30 hover:bg-gold hover:text-main transition-colors flex items-center justify-center gap-2 relative z-10"
            >
              View All Levels <ChevronRight size={16} />
            </button>
          </div>

          {/* QUOTE CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 relative overflow-hidden flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-gold/5 flex items-center justify-center border border-gold/10 shrink-0">
               <Compass className="text-gold/40" size={32} />
             </div>
             <p className="text-sm font-serif italic text-white/80 leading-relaxed">
               "Every civilization<br/>builds on the last."
             </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default JourneyPage;
