import React from 'react';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Edit2, Star, Trophy, Hexagon, Clock, 
  ChevronRight, Lock, Map as MapIcon, ArrowRight, Settings, Box, Activity
} from 'lucide-react';

const ProfilePage = () => {
  const { gameState } = useGame();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const currentLevel = Math.min(gameState.currentLevel || 1, 14);
  const xp = gameState.legacy || 0;
  
  // Calculate XP threshold dynamically
  const nextLevelXp = Math.max(currentLevel * 500, xp + 100); 
  const xpPercent = Math.min((xp / nextLevelXp) * 100, 100);
  
  const masteryPercent = Math.round(((gameState.completedLevels?.length || 0) / 14) * 100) || 0;
  const achievementsCount = gameState.achievements?.length || 0;
  const artifactsCount = gameState.unlockedArtifacts?.length || 0;

  const handleLevelClick = (level) => {
    if (gameState.unlockedLevels?.includes(level)) {
      navigate(`/journey/level/${level}`);
    } else {
      navigate('/journey');
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return "Just now";
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6 min-h-screen text-content animate-fade-in">
      
      {/* HEADER BANNER */}
      <div 
        className="w-full h-[320px] rounded-2xl relative overflow-hidden shadow-2xl border border-gold/20 flex flex-col justify-end p-6 md:p-10"
        style={{ 
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/temple.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-main via-main/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-main via-transparent to-transparent opacity-80" />
        
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
          <div className="flex items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-gold shadow-[0_0_30px_rgba(212,166,74,0.4)] flex items-center justify-center shrink-0 bg-surface/80 overflow-hidden relative group">
               <User size={64} className="text-gold/50" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                 <Edit2 size={24} className="text-white" />
               </div>
            </div>
            
            {/* User Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-md">
                  {gameState.name || 'Traveler'}
                </h1>
                <button className="text-gold/70 hover:text-gold transition-colors">
                  <Edit2 size={20} />
                </button>
              </div>
              <div className="text-gold font-bold tracking-widest uppercase text-sm md:text-base drop-shadow-md">
                {gameState.playerType || 'Explorer'}
              </div>
              
              {/* Level & XP */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-surface/60 backdrop-blur-md rounded-full border border-gold/40 text-xs font-bold text-white shadow-inner">
                  <Star size={12} className="text-gold" />
                  Level {currentLevel}
                </div>
                <div className="w-32 md:w-48 flex items-center gap-3 hidden sm:flex">
                  <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden border border-white/10 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full"
                      style={{ width: `${xpPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white/80 whitespace-nowrap">
                    {xp} / {nextLevelXp} XP
                  </span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold text-white/70 tracking-wider">
                <span className="px-2 py-1 bg-black/40 rounded border border-white/10 backdrop-blur-sm">Age: {gameState.ageGroup}</span>
                <span className="px-2 py-1 bg-black/40 rounded border border-white/10 backdrop-blur-sm">Style: {gameState.playerType}</span>
                <span className="px-2 py-1 bg-black/40 rounded border border-white/10 backdrop-blur-sm">Theme: {theme}</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col items-center justify-center max-w-xs text-center pb-8 mr-12">
            <p className="text-xl font-serif italic text-white/90 drop-shadow-lg leading-relaxed">
              "Every discovery<br/>builds a better tomorrow."
            </p>
            <div className="flex items-center gap-2 mt-4 opacity-50">
               <div className="w-12 h-px bg-gold"></div>
               <div className="w-2 h-2 rotate-45 border border-gold"></div>
               <div className="w-12 h-px bg-gold"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* MY JOURNEY */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                  <MapIcon className="text-gold" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-content">My Journey</h2>
                  <p className="text-xs text-content/50 mt-0.5">Your progress across the 14 levels</p>
                </div>
              </div>
              <Link to="/journey" className="text-xs font-bold text-gold hover:text-gold/80 flex items-center gap-1 transition-colors">
                View Journey Map <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="relative flex items-center justify-between px-4 pb-2 mt-4 overflow-x-auto no-scrollbar scroll-smooth">
              {/* Connecting line background */}
              <div className="absolute top-6 left-8 right-8 h-0.5 bg-content/10 -z-10" />
              
              {[1, 2, 3, 4, 5, 14].map((level, index) => {
                const isUnlocked = gameState.unlockedLevels?.includes(level) || currentLevel >= level;
                const isCompleted = gameState.completedLevels?.includes(level);
                const isCurrent = currentLevel === level && !isCompleted;
                
                let title = "";
                if(level===1) title = "Early Human Communities";
                else if(level===2) title = "Farming Communities";
                else if(level===3) title = "Indus Civilization";
                else if(level===4) title = "Trade Networks";
                else if(level===5) title = "Mahajanapadas";
                else if(level===14) title = "Preserve the Legacy";
                
                return (
                  <div 
                    key={level} 
                    onClick={() => handleLevelClick(level)}
                    className={`flex flex-col items-center min-w-[100px] shrink-0 relative z-10 group ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {/* The line fill if completed */}
                    {index > 0 && isUnlocked && (
                       <div className="absolute top-6 -left-[50%] w-full h-0.5 bg-gold/50 -z-10" />
                    )}
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl ${
                      isCurrent ? 'bg-main border-gold shadow-[0_0_15px_rgba(212,166,74,0.4)] scale-110' : 
                      isCompleted ? 'bg-surface border-gold' :
                      isUnlocked ? 'bg-surface border-gold/50' : 
                      'bg-surface/50 border-content/10'
                    }`}>
                      {isCurrent || isCompleted || isUnlocked ? (
                        <User size={20} className={isCurrent ? 'text-gold' : 'text-gold/70'} />
                      ) : (
                        <Lock size={16} className="text-content/30" />
                      )}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <div className={`text-xs font-bold mb-1 ${isCurrent || isUnlocked ? 'text-content' : 'text-content/50'}`}>Level {level}</div>
                      <div className="text-[9px] text-content/50 w-20 leading-tight max-w-[80px] truncate-multiline text-center mx-auto whitespace-normal h-6">
                        {title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             <div className="glass-panel p-5 rounded-2xl border border-content/10 flex flex-col justify-center relative overflow-hidden group hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                   <Star className="text-gold" size={28} />
                   <div>
                     <div className="text-[10px] text-content/50 uppercase tracking-wider font-bold">Total XP</div>
                     <div className="text-2xl font-bold text-content">{xp}</div>
                   </div>
                </div>
                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden relative z-10">
                   <div className="h-full bg-gold rounded-full" style={{ width: `${xpPercent}%` }} />
                </div>
                <Star className="absolute -right-4 -bottom-4 text-gold/5 w-24 h-24 rotate-12 group-hover:scale-110 transition-transform" />
             </div>
             
             <div className="glass-panel p-5 rounded-2xl border border-content/10 flex flex-col justify-center relative overflow-hidden group hover:border-blue-400/30 transition-colors">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                   <Hexagon className="text-blue-400" size={28} />
                   <div>
                     <div className="text-[10px] text-content/50 uppercase tracking-wider font-bold">Mastery</div>
                     <div className="text-2xl font-bold text-content">{masteryPercent}<span className="text-sm text-content/50 ml-1">%</span></div>
                   </div>
                </div>
                <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden relative z-10">
                   <div className="h-full bg-blue-400 rounded-full" style={{ width: `${masteryPercent}%` }} />
                </div>
                <Hexagon className="absolute -right-4 -bottom-4 text-blue-400/5 w-24 h-24 rotate-12 group-hover:scale-110 transition-transform" />
             </div>
             
             <div className="glass-panel p-5 rounded-2xl border border-content/10 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-purple-400/30 transition-colors">
                <div className="flex items-center justify-center gap-3 relative z-10">
                   <div className="p-2 rounded-full bg-purple-500/10"><Trophy className="text-purple-400" size={24} /></div>
                   <div className="text-left">
                     <div className="text-[10px] text-content/50 uppercase tracking-wider font-bold">Achievements</div>
                     <div className="text-xl font-bold text-content">{achievementsCount} <span className="text-xs text-content/40 font-normal">/ 20</span></div>
                   </div>
                </div>
             </div>
             
             <div className="glass-panel p-5 rounded-2xl border border-content/10 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-emerald-400/30 transition-colors">
                <div className="flex items-center justify-center gap-3 relative z-10">
                   <div className="p-2 rounded-full bg-emerald-500/10"><Box className="text-emerald-400" size={24} /></div>
                   <div className="text-left">
                     <div className="text-[10px] text-content/50 uppercase tracking-wider font-bold">Artifacts Collected</div>
                     <div className="text-xl font-bold text-content">{artifactsCount} <span className="text-xs text-content/40 font-normal">/ 50</span></div>
                   </div>
                </div>
             </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                  <Clock className="text-gold" size={20} />
                </div>
                <h2 className="text-lg font-serif font-bold text-content">Recent Activity</h2>
              </div>
              <button className="text-xs font-bold text-gold hover:text-gold/80 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {gameState.activityLog && gameState.activityLog.length > 0 ? (
                gameState.activityLog.slice(0, 3).map((act, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-surface/50 transition-colors border border-transparent hover:border-content/5">
                    <div className="w-10 h-10 rounded-full bg-surface border border-gold/30 flex items-center justify-center shrink-0 text-gold shadow-sm">
                      <Activity size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-content/90 mb-1">{act.titleKey || act.type}</h3>
                      <p className="text-xs text-content/50">{formatTimeAgo(act.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex gap-4 p-4 rounded-xl hover:bg-surface/50 transition-colors border border-transparent hover:border-content/5">
                  <div className="w-10 h-10 rounded-full bg-surface border border-gold/30 flex items-center justify-center shrink-0 text-gold shadow-sm">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-content/90 mb-1">Started Level {currentLevel}</h3>
                    <p className="text-xs text-content/50">Just now</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* ACHIEVEMENTS CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col h-[280px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="text-gold" size={20} />
                <h2 className="text-lg font-bold text-content">Achievements</h2>
              </div>
              <Link to="/achievements" className="text-xs font-bold text-gold hover:text-gold/80 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            {achievementsCount > 0 ? (
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {gameState.achievements.slice(0, 4).map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 border border-content/5">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                      <CheckCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold capitalize text-content/90">{ach.replace(/_/g, ' ')}</h4>
                      <p className="text-xs text-content/50">Unlocked Badge</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-surface border border-content/10 flex items-center justify-center mb-4 relative">
                  <Trophy size={28} className="text-content/20" />
                  <div className="absolute -bottom-1 -right-1 bg-main rounded-full p-1 border border-content/10">
                     <CheckCircle className="w-3 h-3 text-content/30" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-content/80 mb-2">No achievements yet</h3>
                <p className="text-xs text-content/40 leading-relaxed max-w-[200px]">Complete levels, explore and earn badges to unlock achievements!</p>
                
                <div className="flex items-center gap-1 mt-6">
                  <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                  <div className="w-16 h-px bg-gold/30" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
                </div>
              </div>
            )}
          </div>

          {/* COLLECTION CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col h-[280px]">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Box className="text-gold" size={20} />
                <h2 className="text-lg font-bold text-content">Collection</h2>
              </div>
              <Link to="/inventory" className="text-xs font-bold text-gold hover:text-gold/80 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="flex justify-between gap-2 mb-6">
               {[0,1,2,3,4].map(idx => {
                 const hasArtifact = idx < artifactsCount;
                 return (
                   <div key={idx} className={`flex-1 aspect-square rounded-lg flex items-center justify-center shadow-inner relative overflow-hidden group transition-colors ${hasArtifact ? 'bg-gold/10 border border-gold/30' : 'bg-surface/50 border border-content/5 hover:border-gold/30'}`}>
                      <Box size={24} className={`${hasArtifact ? 'text-gold' : 'text-content/10 group-hover:text-gold/40'} transition-colors`} />
                   </div>
                 );
               })}
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-lg text-content">{artifactsCount}<span className="text-sm text-content/50 ml-1">/ 50</span></span>
                <span className="text-xs text-content/50 font-bold uppercase tracking-wider">Artifacts Collected</span>
              </div>
              <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-content/5">
                <div className="h-full bg-gold rounded-full" style={{ width: `${Math.min((artifactsCount/50)*100, 100)}%` }} />
              </div>
            </div>
          </div>

          {/* QUICK INFO (Account Settings) */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 relative overflow-hidden group hover:border-gold/30 transition-colors cursor-pointer" onClick={() => navigate('/settings')}>
             <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
               <Settings className="text-gold" size={24} />
             </div>
             
             <div className="flex items-center gap-4 relative z-10">
               <div className="p-3 bg-surface rounded-xl border border-content/10 shadow-sm text-gold">
                 <User size={24} />
               </div>
               <div>
                 <h2 className="text-sm font-bold text-content mb-1">Quick Info</h2>
                 <p className="text-xs text-content/60 flex items-center gap-1">Account Settings <ArrowRight size={12} /></p>
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const CheckCircle = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default ProfilePage;