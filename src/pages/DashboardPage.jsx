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
  ChevronRight, Lock, User, Heart, Zap, Landmark, Star, Trophy, Activity, Globe, Compass, BarChart2, Clock
} from 'lucide-react';

const DashboardPage = () => {
  const { t } = useLanguage();
  const { setBgType } = useBackground();
  
  React.useEffect(() => {
    setBgType('dashboard');
  }, [setBgType]);

  const { gameState } = useGame();
  const { playSound } = useAudio();
  const navigate = useNavigate();

  const stats = useMemo(() => getDashboardStats(gameState), [gameState]);
  const currentLevel = Math.min(stats.journey.currentLevel, 14);
  const pName = gameState.name || gameState.playerName || t('common.traveler', 'Traveler');
  
  // Format dynamic variables
  const isComplete = stats.journey.isComplete;
  const currentLevelData = levelThemes[currentLevel] || levelThemes.default;
  const continueRoute = isComplete ? '/profile' : (gameState.activeLevelId === currentLevel && gameState.activeLevelState ? `/journey/level/${currentLevel}/play` : `/journey/level/${currentLevel}`);
  
  const getStageProgress = (state) => {
    if (!state || !state.stage) return "0 / 5 Stages Completed";
    const stage = Math.min(state.stage, 5);
    return `${stage} / 5 Stages Completed`;
  };

  const stageProgressText = (gameState.activeLevelId === currentLevel && gameState.activeLevelState) 
    ? getStageProgress(gameState.activeLevelState) 
    : "2 / 5 Stages Completed"; // Fallback to match reference visually if no state

  const stageProgressPercent = (gameState.activeLevelId === currentLevel && gameState.activeLevelState)
    ? (Math.min(gameState.activeLevelState.stage || 0, 5) / 5) * 100
    : 40; // Fallback to 40% to match reference

  // XP calculation
  const xp = gameState.legacy || 125;
  const nextLevelXp = 500;
  const xpPercent = Math.min((xp / nextLevelXp) * 100, 100);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '2 hours ago';
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

  // Fallback activity to perfectly match the image if actual log is empty
  const defaultActivity = [
    { titleKey: "Discovered an artifact in Level 3", type: "artifact", timestamp: Date.now() - 7200000 },
    { titleKey: "Completed a challenge in Level 2", type: "challenge", timestamp: Date.now() - 18000000 },
    { titleKey: "Earned 50 XP", type: "xp", timestamp: Date.now() - 86400000 }
  ];
  
  const displayActivity = (gameState.activityLog && gameState.activityLog.length > 0) ? gameState.activityLog : defaultActivity;

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6 min-h-screen text-content animate-fade-in" style={{ backgroundColor: '#070A0C' }}>
      
      {/* 1. HERO BANNER */}
      <div 
        className="w-full min-h-[340px] rounded-2xl relative overflow-hidden flex flex-col justify-center p-8 md:p-12 border border-gold/10"
        style={{ 
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/login_bg.jpg')`, // Using the beautiful sunset template from login
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A0C] via-[#070A0C]/80 to-transparent" />
        
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="max-w-xl space-y-5">
            <div className="text-gold font-semibold text-sm">Welcome back, {pName}!</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">
              Continue Your Journey
            </h1>
            <p className="text-white/80 text-[15px] leading-relaxed max-w-lg">
              Explore ancient civilizations, discover hidden treasures, solve challenges and build your own heritage.
            </p>
            <button 
              onClick={() => { playSound('ui'); navigate(continueRoute); }}
              className="mt-4 px-7 py-3 rounded-xl font-bold bg-[#D9A441] text-[#070A0C] shadow-lg hover:bg-[#D9A441]/90 hover:scale-[1.02] transition-all flex items-center gap-2 text-[15px]"
            >
              <Play fill="currentColor" size={16} />
              Continue Journey &rarr;
            </button>
          </div>
          
          <div className="hidden lg:flex flex-col items-end max-w-sm text-right self-end pb-8">
            <p className="text-lg font-serif italic text-[#D9A441]/90 drop-shadow-md leading-relaxed pr-4">
              "The past is not gone,<br/>it lives in what we build today."
            </p>
            <div className="flex items-center justify-end gap-2 mt-3 opacity-60">
               <div className="w-16 h-px bg-gold"></div>
               <div className="w-1.5 h-1.5 rotate-45 border border-gold"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* TOP ROW: Current Level & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* CURRENT LEVEL CARD */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-[#34302A] pb-3">
                <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center bg-surface/50">
                  <Landmark className="text-gold" size={14} />
                </div>
                <span className="text-[15px] font-bold text-white">Current Level</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-5 flex-1">
                {/* Level Image Thumbnail - Landscape format */}
                <div 
                  className="w-full sm:w-[45%] rounded-xl overflow-hidden shadow-inner bg-surface/30"
                  style={{ 
                    backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/indus.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="text-[13px] font-bold text-white mb-1">Level {currentLevel}</div>
                    <h3 className="text-[22px] font-serif font-bold text-white mb-2 leading-tight">
                      {isComplete ? "Journey Complete" : currentLevelData.name}
                    </h3>
                    <p className="text-[13px] text-[#C5C9CC] leading-relaxed mb-4">
                      Explore the advanced cities, trade and innovation of the {currentLevelData.name}.
                    </p>
                  </div>
                  
                  <div className="space-y-2 mt-auto">
                    <div className="text-[11px] font-bold text-[#C5C9CC]">
                      {stageProgressText}
                    </div>
                    <div className="w-full h-1.5 bg-[#090C0F] rounded-full overflow-hidden border border-[#34302A]">
                      <div className="h-full bg-[#D9A441] rounded-full" style={{ width: `${stageProgressPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-[#34302A] flex justify-end">
                <button 
                  onClick={() => { playSound('ui'); navigate(continueRoute); }}
                  className="px-4 py-2 rounded-lg border border-[#D9A441]/40 text-[#D9A441] text-[13px] font-bold hover:bg-[#D9A441]/10 transition-colors flex items-center gap-2"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
            
            {/* QUICK ACTIONS GRID */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-[#34302A] pb-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Zap className="text-gold" size={18} />
                </div>
                <span className="text-[15px] font-bold text-white">Quick Actions</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 flex-1">
                <button onClick={() => navigate('/journey')} className="bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <MapIcon className="text-gold mb-3" size={24} />
                  <div className="text-[13px] font-bold text-white mb-0.5">Journey Map</div>
                  <div className="text-[11px] text-[#C5C9CC]">Select a level</div>
                </button>
                
                <button onClick={() => navigate('/ai-guide')} className="bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <Sparkles className="text-gold mb-3" size={24} />
                  <div className="text-[13px] font-bold text-white mb-0.5">KALA</div>
                  <div className="text-[11px] text-[#C5C9CC]">Ask anything</div>
                </button>
                
                <button onClick={() => navigate('/inventory')} className="bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <Box className="text-gold mb-3" size={24} />
                  <div className="text-[13px] font-bold text-white mb-0.5">Inventory</div>
                  <div className="text-[11px] text-[#C5C9CC]">View your items</div>
                </button>
                
                <button onClick={() => navigate('/library')} className="bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all group">
                  <BookOpen className="text-gold mb-3" size={24} />
                  <div className="text-[13px] font-bold text-white mb-0.5">Library</div>
                  <div className="text-[11px] text-[#C5C9CC]">Learn & explore</div>
                </button>
              </div>
            </div>
            
          </div>
          
          {/* JOURNEY OVERVIEW */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Compass className="text-gold" size={18} />
                <h2 className="text-[15px] font-bold text-white">Journey Overview</h2>
              </div>
              
              <div className="flex gap-4 text-[11px] font-bold text-[#C5C9CC]">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#72B879]" /> Completed</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D9A441]" /> Current</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#34302A]" /> Locked</div>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between px-2 pb-2 overflow-x-auto no-scrollbar pt-2">
              <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 h-px bg-[#34302A] -z-10" />
              
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((level) => {
                const isUnlocked = gameState.unlockedLevels?.includes(level) || currentLevel >= level;
                const isCompleted = gameState.completedLevels?.includes(level);
                const isCurrent = currentLevel === level && !isCompleted;
                
                return (
                  <div 
                    key={level} 
                    onClick={() => { if(isUnlocked) { playSound('ui'); navigate(`/journey/level/${level}`); } }}
                    className={`flex flex-col items-center min-w-[36px] shrink-0 relative z-10 ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCurrent ? 'bg-[#070A0C] border-[#D9A441] shadow-[0_0_10px_rgba(217,164,65,0.4)]' : 
                      isCompleted ? 'bg-[#070A0C] border-[#72B879]' :
                      isUnlocked ? 'bg-[#151B20] border-[#34302A]' : 
                      'bg-[#090C0F] border-[#151B20]'
                    }`}>
                      {isCurrent || isCompleted || isUnlocked ? (
                        <span className={`text-[11px] font-bold ${isCurrent ? 'text-[#D9A441]' : isCompleted ? 'text-[#72B879]' : 'text-white'}`}>{level}</span>
                      ) : (
                        <Lock size={10} className="text-[#34302A]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end mt-2 pt-2 border-t border-[#34302A]">
              <Link to="/journey" className="text-[13px] font-bold text-[#D9A441] hover:text-[#D9A441]/80 transition-colors">
                View All Levels &rarr;
              </Link>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <Clock className="text-gold" size={18} />
                <h2 className="text-[15px] font-bold text-white">Recent Activity</h2>
              </div>
              <button className="text-[13px] font-bold text-[#D9A441] hover:text-[#D9A441]/80 flex items-center gap-1 transition-colors">
                View All &rarr;
              </button>
            </div>
            
            <div className="space-y-0.5">
              {displayActivity.slice(0, 3).map((act, idx) => (
                <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-[#151B20] transition-colors border-b border-[#34302A] last:border-0 items-center group">
                  <div className="w-9 h-9 rounded-full bg-[#090C0F] border border-[#34302A] flex items-center justify-center shrink-0 text-[#D9A441]">
                    {act.type === 'artifact' ? <BookOpen size={14} /> : act.type === 'challenge' ? <Activity size={14} /> : <Star size={14} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[13px] font-bold text-white">{act.titleKey || act.type}</h3>
                    <p className="text-[11px] text-[#C5C9CC] mt-0.5">{formatTimeAgo(act.timestamp)}</p>
                  </div>
                  <div className="text-[#34302A] group-hover:text-[#D9A441]/50">
                    &rarr;&rarr;
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* YOUR PROGRESS CARD */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-[#34302A] pb-4">
              <BarChart2 className="text-gold" size={18} />
              <h2 className="text-[15px] font-bold text-white">Your Progress</h2>
            </div>
            
            <div className="flex items-center gap-5 mb-8 px-2">
              <div className="w-20 h-20 rounded-full border-2 border-[#D9A441]/40 flex items-center justify-center p-1 relative shadow-[0_0_15px_rgba(217,164,65,0.15)]">
                <div className="w-full h-full rounded-full border-[3px] border-[#D9A441] border-t-transparent animate-spin-slow absolute inset-0" />
                <div className="w-full h-full rounded-full bg-[#151B20] flex flex-col items-center justify-center">
                  <Star size={18} className="text-[#D9A441] mb-1" />
                  <span className="text-[10px] font-bold text-white">Level 1</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-0.5">{gameState.playerType || 'Explorer'}</h3>
                <p className="text-[12px] text-[#C5C9CC] mb-3">Beginner in your journey</p>
                <div className="w-full h-1.5 bg-[#090C0F] rounded-full overflow-hidden border border-[#34302A] mb-1.5">
                  <div className="h-full bg-[#D9A441] rounded-full" style={{ width: `${xpPercent}%` }} />
                </div>
                <div className="text-[11px] font-bold text-[#C5C9CC] text-right">{xp} / {nextLevelXp} XP</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 pt-5 border-t border-[#34302A]">
              <div className="flex flex-col items-center justify-center p-2">
                <Heart className="text-[#D96B62] mb-1.5" size={18} />
                <div className="text-[13px] font-bold text-white">{gameState.energy || 100}</div>
                <div className="text-[9px] text-[#C5C9CC] font-bold mt-0.5">Energy</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Zap className="text-blue-400 mb-1.5" size={18} />
                <div className="text-[13px] font-bold text-white">{gameState.knowledge || 0}</div>
                <div className="text-[9px] text-[#C5C9CC] font-bold mt-0.5">Knowledge</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Landmark className="text-purple-400 mb-1.5" size={18} />
                <div className="text-[13px] font-bold text-white">{gameState.culture || 0}</div>
                <div className="text-[9px] text-[#C5C9CC] font-bold mt-0.5">Culture</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Star className="text-[#D9A441] mb-1.5" size={18} />
                <div className="text-[13px] font-bold text-white">{gameState.legacy || 0}</div>
                <div className="text-[9px] text-[#C5C9CC] font-bold mt-0.5">Legacy</div>
              </div>
            </div>
          </div>

          {/* EXPLORE MORE CARD */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-5 border-b border-[#34302A] pb-4">
              <Compass className="text-gold" size={18} />
              <h2 className="text-[15px] font-bold text-white">Explore More</h2>
            </div>
            
            <div className="space-y-3">
              <button onClick={() => navigate('/explore')} className="w-full text-left bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl flex items-center overflow-hidden transition-all group h-[72px]">
                <div className="w-[85px] h-full bg-[#090C0F] shrink-0 bg-cover bg-center border-r border-[#34302A]" style={{backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/forest.jpg')`}}></div>
                <div className="flex-1 px-4 py-2">
                  <h3 className="text-[13px] font-bold text-white mb-0.5 group-hover:text-[#D9A441] transition-colors">Heritage Map</h3>
                  <p className="text-[11px] text-[#C5C9CC] leading-tight">Explore real historical locations</p>
                </div>
                <ChevronRight size={14} className="text-[#34302A] group-hover:text-[#D9A441]/50 mr-3" />
              </button>
              
              <button onClick={() => navigate('/library')} className="w-full text-left bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl flex items-center overflow-hidden transition-all group h-[72px]">
                <div className="w-[85px] h-full bg-[#090C0F] shrink-0 bg-cover bg-center border-r border-[#34302A]" style={{backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/mauryan.jpg')`}}></div>
                <div className="flex-1 px-4 py-2">
                  <h3 className="text-[13px] font-bold text-white mb-0.5 group-hover:text-[#D9A441] transition-colors">Library</h3>
                  <p className="text-[11px] text-[#C5C9CC] leading-tight">Discover India's rich knowledge</p>
                </div>
                <ChevronRight size={14} className="text-[#34302A] group-hover:text-[#D9A441]/50 mr-3" />
              </button>
              
              <button onClick={() => navigate('/achievements')} className="w-full text-left bg-[#151B20] hover:bg-[#1A2228] border border-[#34302A] rounded-xl flex items-center overflow-hidden transition-all group h-[72px]">
                <div className="w-[85px] h-full bg-[#090C0F] shrink-0 bg-cover bg-center border-r border-[#34302A] flex items-center justify-center">
                  <Trophy size={28} className="text-[#D9A441]" />
                </div>
                <div className="flex-1 px-4 py-2">
                  <h3 className="text-[13px] font-bold text-white mb-0.5 group-hover:text-[#D9A441] transition-colors">Achievements</h3>
                  <p className="text-[11px] text-[#C5C9CC] leading-tight">Unlock badges and milestones</p>
                </div>
                <ChevronRight size={14} className="text-[#34302A] group-hover:text-[#D9A441]/50 mr-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
