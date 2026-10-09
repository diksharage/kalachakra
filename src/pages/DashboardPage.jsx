import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { getDashboardStats } from '../services/dashboardService';
import { levelThemes } from '../data/levelThemes';
import { useBackground } from '../context/BackgroundContext';
import { 
  Play, Map as MapIcon, Sparkles, Box, BookOpen, 
  ChevronRight, Lock, User, Heart, Zap, Landmark, Star, Trophy, Activity, Globe
} from 'lucide-react';

const DashboardPage = () => {
  const { t } = useLanguage();
  const { setBgType } = useBackground();
  
  React.useEffect(() => {
    setBgType('dashboard');
  }, [setBgType]);

  const { gameState } = useGame();
  const { playSound } = useAudio();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const stats = useMemo(() => getDashboardStats(gameState), [gameState]);
  const currentLevel = Math.min(stats.journey.currentLevel, 14);
  const pName = gameState.name || gameState.playerName || t('common.traveler', 'Traveler');
  
  // Format dynamic variables
  const isComplete = stats.journey.isComplete;
  const currentLevelData = levelThemes[currentLevel] || levelThemes.default;
  const continueRoute = isComplete ? '/profile' : (gameState.activeLevelId === currentLevel && gameState.activeLevelState ? `/journey/level/${currentLevel}/play` : `/journey/level/${currentLevel}`);
  
  // Get stage label 
  const getStageLabel = (stage) => {
    switch(stage) {
      case 1: return "EXPLORE";
      case 2: return "DISCOVER";
      case 3: return "LEARN";
      case 4: return "PLAY + SOLVE";
      case 5: return "BUILD / MANAGE";
      case 6: return "LEVEL COMPLETE";
      default: return "NOT STARTED";
    }
  };

  const getStageProgress = (state) => {
    if (!state || !state.stage) return "0 / 5 Stages Completed";
    const stage = Math.min(state.stage, 5);
    return `${stage} / 5 Stages Completed`;
  };

  const stageProgressText = (gameState.activeLevelId === currentLevel && gameState.activeLevelState) 
    ? getStageProgress(gameState.activeLevelState) 
    : "0 / 5 Stages Completed";

  const stageProgressPercent = (gameState.activeLevelId === currentLevel && gameState.activeLevelState)
    ? (Math.min(gameState.activeLevelState.stage || 0, 5) / 5) * 100
    : 0;

  // XP calculation
  const xp = gameState.legacy || 0;
  const nextLevelXp = Math.max(currentLevel * 500, xp + 100);
  const xpPercent = Math.min((xp / nextLevelXp) * 100, 100);

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
      
      {/* 1. HERO BANNER */}
      <div 
        className="w-full min-h-[300px] rounded-2xl relative overflow-hidden shadow-2xl border border-gold/20 flex flex-col justify-center p-8 md:p-12"
        style={{ 
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/temple.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-main via-main/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-main via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-xl space-y-4">
            <div className="text-gold font-bold tracking-widest text-sm uppercase">Welcome back, {pName}!</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
              Continue Your Journey
            </h1>
            <p className="text-white/80 text-lg leading-relaxed drop-shadow-md">
              Explore ancient civilizations, discover hidden treasures, solve challenges and build your own heritage.
            </p>
            <button 
              onClick={() => { playSound('ui'); navigate(continueRoute); }}
              className="mt-6 px-8 py-3.5 rounded-xl font-bold bg-gold text-main shadow-[0_0_20px_rgba(212,166,74,0.4)] hover:bg-gold/90 hover:scale-[1.02] transition-all flex items-center gap-3 text-lg"
            >
              <Play fill="currentColor" size={20} />
              Continue Journey
            </button>
          </div>
          
          <div className="hidden lg:flex flex-col items-end max-w-sm text-right pb-4">
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

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* TOP ROW: Current Level & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* CURRENT LEVEL CARD */}
            <div className="glass-panel p-6 rounded-2xl border border-content/10 relative overflow-hidden flex flex-col group">
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <Landmark className="text-gold" size={18} />
                <span className="text-sm font-bold uppercase tracking-wider text-content/80">Current Level</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 relative z-10 flex-1">
                {/* Level Image Thumbnail */}
                <div 
                  className="w-full sm:w-1/3 aspect-video sm:aspect-square rounded-xl overflow-hidden border border-gold/20 shadow-inner"
                  style={{ 
                    backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/indus.jpg')`, // fallback if dynamic not available
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-xs font-bold text-gold mb-1">Level {currentLevel}</div>
                  <h3 className="text-2xl font-serif font-bold text-content mb-2">{currentLevelData.name}</h3>
                  <p className="text-sm text-content/60 leading-relaxed mb-4 line-clamp-2">
                    {isComplete ? "You have completed your journey." : "Explore the advanced cities, trade and innovation of this civilization."}
                  </p>
                  
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs font-bold text-content/80">
                      <span>{stageProgressText}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden border border-content/5">
                      <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${stageProgressPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => { playSound('ui'); navigate(continueRoute); }}
                className="mt-6 w-full sm:w-auto self-end px-5 py-2.5 rounded-lg border border-gold/30 text-gold text-sm font-bold hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
              >
                View Details <ChevronRight size={16} />
              </button>
            </div>
            
            {/* QUICK ACTIONS GRID */}
            <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="text-gold" size={18} />
                <span className="text-sm font-bold uppercase tracking-wider text-content/80">Quick Actions</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 flex-1">
                <button onClick={() => navigate('/journey')} className="bg-surface/50 hover:bg-surface border border-content/5 hover:border-gold/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <MapIcon className="text-content/50 group-hover:text-gold mb-2 transition-colors" size={28} />
                  <div className="text-sm font-bold text-content mb-1">Journey Map</div>
                  <div className="text-[10px] text-content/50">Select a level</div>
                </button>
                
                <button onClick={() => navigate('/ai-guide')} className="bg-surface/50 hover:bg-surface border border-content/5 hover:border-gold/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <Sparkles className="text-content/50 group-hover:text-gold mb-2 transition-colors" size={28} />
                  <div className="text-sm font-bold text-content mb-1">KALA</div>
                  <div className="text-[10px] text-content/50">Ask anything</div>
                </button>
                
                <button onClick={() => navigate('/inventory')} className="bg-surface/50 hover:bg-surface border border-content/5 hover:border-gold/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <Box className="text-content/50 group-hover:text-gold mb-2 transition-colors" size={28} />
                  <div className="text-sm font-bold text-content mb-1">Inventory</div>
                  <div className="text-[10px] text-content/50">View your items</div>
                </button>
                
                <button onClick={() => navigate('/library')} className="bg-surface/50 hover:bg-surface border border-content/5 hover:border-gold/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <BookOpen className="text-content/50 group-hover:text-gold mb-2 transition-colors" size={28} />
                  <div className="text-sm font-bold text-content mb-1">Library</div>
                  <div className="text-[10px] text-content/50">Learn & explore</div>
                </button>
              </div>
            </div>
            
          </div>
          
          {/* JOURNEY OVERVIEW */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Compass className="text-gold" size={20} />
                <h2 className="text-lg font-serif font-bold text-content">Journey Overview</h2>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between px-4 pb-4 overflow-x-auto no-scrollbar scroll-smooth pt-2">
              {/* Connecting line background */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-content/10 -z-10" />
              
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((level, index) => {
                const isUnlocked = gameState.unlockedLevels?.includes(level) || currentLevel >= level;
                const isCompleted = gameState.completedLevels?.includes(level);
                const isCurrent = currentLevel === level && !isCompleted;
                
                return (
                  <div 
                    key={level} 
                    onClick={() => { if(isUnlocked) { playSound('ui'); navigate(`/journey/level/${level}`); } }}
                    className={`flex flex-col items-center min-w-[50px] shrink-0 relative z-10 group ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {/* The line fill if completed */}
                    {index > 0 && isUnlocked && (
                       <div className="absolute top-5 -left-[100%] w-full h-0.5 bg-gold/50 -z-10" />
                    )}
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl ${
                      isCurrent ? 'bg-main border-gold shadow-[0_0_15px_rgba(212,166,74,0.4)] scale-110' : 
                      isCompleted ? 'bg-surface border-gold' :
                      isUnlocked ? 'bg-surface border-gold/50' : 
                      'bg-surface/50 border-content/10'
                    }`}>
                      {isCurrent || isCompleted || isUnlocked ? (
                        <span className={`text-sm font-bold ${isCurrent ? 'text-gold' : 'text-content/80'}`}>{level}</span>
                      ) : (
                        <Lock size={14} className="text-content/30" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center mt-4 border-t border-content/5 pt-4 px-2">
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-wider text-content/60">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Completed</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gold" /> Current</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-content/30" /> Locked</div>
              </div>
              <Link to="/journey" className="text-xs font-bold text-gold hover:text-gold/80 transition-colors">
                View All Levels &rarr;
              </Link>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Activity className="text-gold" size={20} />
                <h2 className="text-lg font-serif font-bold text-content">Recent Activity</h2>
              </div>
              <button className="text-xs font-bold text-gold hover:text-gold/80 flex items-center gap-1 transition-colors">
                View All <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="space-y-2">
              {gameState.activityLog && gameState.activityLog.length > 0 ? (
                gameState.activityLog.slice(0, 3).map((act, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-surface/50 transition-colors border border-transparent hover:border-content/5 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-surface border border-gold/30 flex items-center justify-center shrink-0 text-gold shadow-sm group-hover:bg-gold/10 transition-colors">
                      <Star size={18} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-content/90 mb-1">{act.titleKey || act.type}</h3>
                      <p className="text-xs text-content/50">{formatTimeAgo(act.timestamp)}</p>
                    </div>
                    <div className="text-content/20 group-hover:text-gold/50 self-center">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex gap-4 p-4 rounded-xl hover:bg-surface/50 transition-colors border border-transparent hover:border-content/5">
                  <div className="w-10 h-10 rounded-full bg-surface border border-gold/30 flex items-center justify-center shrink-0 text-gold shadow-sm">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-content/90 mb-1">Started your journey</h3>
                    <p className="text-xs text-content/50">Welcome to Kalachakra!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* YOUR PROGRESS CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <User className="text-gold" size={18} />
              <h2 className="text-lg font-serif font-bold text-content">Your Progress</h2>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center p-1 relative">
                <div className="w-full h-full rounded-full border-2 border-gold border-t-transparent animate-spin-slow absolute inset-0" />
                <div className="w-full h-full rounded-full bg-surface/80 flex flex-col items-center justify-center">
                  <Star size={20} className="text-gold mb-1" />
                  <span className="text-[10px] font-bold text-content/80">Level {currentLevel}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-content mb-1">{gameState.playerType || 'Explorer'}</h3>
                <p className="text-xs text-content/50 mb-3">Beginner in your journey</p>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-content/5 mb-1">
                  <div className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full" style={{ width: `${xpPercent}%` }} />
                </div>
                <div className="text-[10px] font-bold text-content/60 text-right">{xp} / {nextLevelXp} XP</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 pt-6 border-t border-content/10">
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg hover:bg-surface/50 transition-colors">
                <Heart className="text-red-400 mb-2" size={20} />
                <div className="text-sm font-bold text-content">{gameState.energy || 100}</div>
                <div className="text-[9px] text-content/50 uppercase tracking-wider font-bold">Energy</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg hover:bg-surface/50 transition-colors">
                <Zap className="text-blue-400 mb-2" size={20} />
                <div className="text-sm font-bold text-content">{gameState.knowledge || 0}</div>
                <div className="text-[9px] text-content/50 uppercase tracking-wider font-bold">Knowledge</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg hover:bg-surface/50 transition-colors">
                <Landmark className="text-purple-400 mb-2" size={20} />
                <div className="text-sm font-bold text-content">{gameState.culture || 0}</div>
                <div className="text-[9px] text-content/50 uppercase tracking-wider font-bold">Culture</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg hover:bg-surface/50 transition-colors">
                <Star className="text-gold mb-2" size={20} />
                <div className="text-sm font-bold text-content">{gameState.legacy || 0}</div>
                <div className="text-[9px] text-content/50 uppercase tracking-wider font-bold">Legacy</div>
              </div>
            </div>
          </div>

          {/* EXPLORE MORE CARD */}
          <div className="glass-panel p-6 rounded-2xl border border-content/10 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="text-gold" size={18} />
              <h2 className="text-lg font-serif font-bold text-content">Explore More</h2>
            </div>
            
            <div className="space-y-3">
              <button onClick={() => navigate('/explore')} className="w-full text-left bg-surface/30 hover:bg-surface/80 border border-content/5 hover:border-gold/30 rounded-xl p-3 flex items-center gap-4 transition-all group">
                <div className="w-14 h-14 rounded-lg bg-emerald-900/20 flex items-center justify-center border border-emerald-500/20 shrink-0">
                   <Globe size={24} className="text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-content mb-0.5 group-hover:text-gold transition-colors">Heritage Map</h3>
                  <p className="text-[10px] text-content/50">Explore real historical locations</p>
                </div>
                <ChevronRight size={16} className="text-content/20 group-hover:text-gold/50 transition-colors mr-2" />
              </button>
              
              <button onClick={() => navigate('/library')} className="w-full text-left bg-surface/30 hover:bg-surface/80 border border-content/5 hover:border-gold/30 rounded-xl p-3 flex items-center gap-4 transition-all group">
                <div className="w-14 h-14 rounded-lg bg-blue-900/20 flex items-center justify-center border border-blue-500/20 shrink-0">
                   <BookOpen size={24} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-content mb-0.5 group-hover:text-gold transition-colors">Library</h3>
                  <p className="text-[10px] text-content/50">Discover India's rich knowledge</p>
                </div>
                <ChevronRight size={16} className="text-content/20 group-hover:text-gold/50 transition-colors mr-2" />
              </button>
              
              <button onClick={() => navigate('/achievements')} className="w-full text-left bg-surface/30 hover:bg-surface/80 border border-content/5 hover:border-gold/30 rounded-xl p-3 flex items-center gap-4 transition-all group">
                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/20 shrink-0">
                   <Trophy size={24} className="text-gold" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-content mb-0.5 group-hover:text-gold transition-colors">Achievements</h3>
                  <p className="text-[10px] text-content/50">Unlock badges and milestones</p>
                </div>
                <ChevronRight size={16} className="text-content/20 group-hover:text-gold/50 transition-colors mr-2" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// Compass stub
const Compass = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

export default DashboardPage;
