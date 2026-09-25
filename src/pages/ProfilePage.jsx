import React from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { User, Activity, Map, Trophy, Hexagon, Star, PlayCircle, BookOpen, Hammer, Search, CheckCircle, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import BackButton from '../components/common/BackButton';
import { useNavigate } from 'react-router-dom';

const StatBox = ({ icon, label, value }) => (
  <div className="bg-surface/50 p-4 rounded-xl border border-content/10 text-center flex flex-col items-center justify-center">
    <div className="text-gold mb-2">{icon}</div>
    <div className="text-2xl font-bold text-content">{value}</div>
    <div className="text-[10px] text-content/50 uppercase tracking-wider text-center">{label}</div>
  </div>
);

const TimelineItem = ({ day, title, desc, icon }) => (
  <div className="flex gap-4 md:gap-6">
    <div className="w-10 h-10 rounded-full bg-surface border-2 border-gold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(212,166,74,0.3)] text-sm text-gold">
      {icon}
    </div>
    <div className="pt-1">
      <div className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{day}</div>
      <h3 className="text-content font-bold text-lg mb-1">{title}</h3>
      <p className="text-content/60 text-sm">{desc}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { gameState } = useGame();
  const { settings: audioSettings, updateSetting, toggleMute } = useAudio();
  const navigate = useNavigate();
  
  const completedLevelsCount = gameState.completedLevels.length;
  const currentLevel = Math.min(gameState.currentLevel || 1, 14);
  const isComplete = completedLevelsCount >= 14 || gameState.gameCompleted;
  
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

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto px-4 md:px-0">
      
      {/* HEADER CARD */}
      <div className="glass-panel p-8 rounded-3xl border border-gold/30 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10" />
        
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gold bg-surface flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(212,166,74,0.3)] shrink-0 text-gold">
           <User size={48} />
        </div>
        
        <div className="flex-1 text-center md:text-left z-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-2">
            <div>
              <div className="text-gold font-bold tracking-widest text-sm uppercase mb-2">
                {isComplete ? 'KALACHAKRA PRESERVER' : `Level ${currentLevel} Explorer`}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <BackButton />
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-content">{gameState.name || 'Traveler'}</h1>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs uppercase font-bold text-content/60 tracking-wider">
                <span className="px-2 py-1 bg-surface border border-content/10 rounded-md">Age: {gameState.ageGroup}</span>
                <span className="px-2 py-1 bg-surface border border-content/10 rounded-md">Style: {gameState.playerType}</span>
                <span className="px-2 py-1 bg-surface border border-content/10 rounded-md">Theme: {theme}</span>
              </div>
            </div>

            {!isComplete && (
               <button 
                 onClick={() => navigate(gameState.activeLevelId === currentLevel && gameState.activeLevelState ? `/journey/level/${currentLevel}/play` : `/journey/level/${currentLevel}`)}
                 className="px-6 py-3 bg-gradient-to-r from-gold to-terracotta text-[#171B3A] font-bold rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
               >
                 <PlayCircle size={20} />
                 {gameState.activeLevelId === currentLevel && gameState.activeLevelState ? "RESUME JOURNEY" : "CONTINUE JOURNEY"}
               </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: OVERALL PROGRESS & STATS */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10">
            <h2 className="text-2xl font-serif font-bold gold-gradient-text mb-6">Journey Progress</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-content">{completedLevelsCount} / 14 Levels Completed</span>
                <span className="text-gold font-bold">{Math.round((completedLevelsCount/14)*100)}%</span>
              </div>
              <div className="w-full h-3 bg-surface border border-content/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-green-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(completedLevelsCount/14)*100}%` }}
                />
              </div>
            </div>

            {gameState.activeLevelState && gameState.activeLevelId === currentLevel && (
               <div className="bg-surface/50 p-4 rounded-xl border border-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="text-center md:text-left">
                   <p className="text-xs uppercase text-content/60 font-bold tracking-wider mb-1">Current Objective</p>
                   <p className="font-bold text-lg text-content">Level {currentLevel}: {getStageLabel(gameState.activeLevelState.stage)}</p>
                 </div>
                 <button 
                   onClick={() => { playSound('ui'); navigate(`/journey/level/${currentLevel}/play`); }}
                   className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded-lg text-sm font-bold hover:bg-gold/20 transition-colors"
                 >
                   Jump In <ArrowRight size={16} /></button>
               </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-gradient-to-br from-gold/20 to-surface p-4 rounded-xl border border-gold/40 text-center flex flex-col items-center justify-center">
                <div className="text-gold mb-2"><Star size={28} /></div>
                <div className="text-2xl font-bold text-gold">{gameState.legacy || 0}</div>
                <div className="text-[10px] text-content/60 uppercase tracking-wider font-bold">Total Legacy</div>
             </div>
             <StatBox icon={<Search size={24} />} label="Discoveries" value={gameState.unlockedArtifacts.length} />
             <StatBox icon={<Trophy size={24} />} label="Challenges" value={gameState.completedChallenges.length} />
             <StatBox icon={<Hammer size={24} />} label="Structures" value={gameState.buildings.length} />
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Trophy className="text-gold"/> Earned Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gameState.achievements.length > 0 ? (
                gameState.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-surface/40 p-3 rounded-lg border border-content/5">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="font-bold text-sm text-content/90 capitalize">{ach.replace(/_/g, ' ')}</span>
                  </div>
                ))
              ) : (
                <p className="text-content/50 italic col-span-2">No achievements earned yet. Start exploring!</p>
              )}
            </div>
          </div>

          {/* EARNED REWARDS / INVENTORY */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Hexagon className="text-gold"/> Global Inventory</h2>
            <div className="flex flex-wrap gap-3">
              {Object.keys(gameState.inventory || {}).length > 0 ? (
                Object.entries(gameState.inventory).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 bg-surface/40 px-3 py-2 rounded-lg border border-content/10 shadow-sm">
                    <span className="font-bold text-content/90 capitalize text-sm">{k.replace('_', ' ')}</span>
                    <span className="text-gold font-bold bg-gold/10 px-2 py-0.5 rounded text-xs">{v}</span>
                  </div>
                ))
              ) : (
                <p className="text-content/50 italic">No resources gathered yet.</p>
              )}
            </div>
          </div>

          {/* AUDIO SETTINGS */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Volume2 className="text-blue-400"/> Audio Settings</h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-bold text-content mb-1">Mute All</h3>
                  <p className="text-sm text-content/60">Quickly disable all game sounds and ambience.</p>
                </div>
                <button 
                  onClick={toggleMute}
                  className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#171B3A] ${audioSettings.muted ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-surface border border-content/20 text-content'}`}
                >
                  {audioSettings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  {audioSettings.muted ? 'Muted' : 'Unmuted'}
                </button>
              </div>

              {!audioSettings.muted && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-content/10">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold opacity-80">Sound Effects (UI & Feedback)</label>
                      <span className="text-xs opacity-60">{Math.round(audioSettings.sfxVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.1" 
                      value={audioSettings.sfxVolume}
                      onChange={(e) => updateSetting('sfxVolume', parseFloat(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold opacity-80">Atmospheric Ambience</label>
                      <span className="text-xs opacity-60">{Math.round(audioSettings.ambienceVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.1" 
                      value={audioSettings.ambienceVolume}
                      onChange={(e) => updateSetting('ambienceVolume', parseFloat(e.target.value))}
                      className="w-full accent-gold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RECENT ACTIVITY */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl border border-content/10 h-full">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Activity className="text-blue-400" /> Recent Activity</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-5 before:w-0.5 before:bg-content/10">
               {isComplete && (
                 <TimelineItem 
                   day="Latest" 
                   title="Preserver of the Legacy" 
                   desc="You successfully completed the KALACHAKRA journey!"
                   icon={<Star />}
                 />
               )}
               
               {gameState.completedLevels.length > 0 && (
                 <TimelineItem 
                   day="Recent" 
                   title={`Completed Level ${gameState.completedLevels[gameState.completedLevels.length - 1]}`} 
                   desc="Conquered the historical challenges and earned Legacy."
                   icon={<CheckCircle />}
                 />
               )}
               
               {gameState.unlockedArtifacts.length > 0 && (
                 <TimelineItem 
                   day="Recent" 
                   title="Historical Discovery" 
                   desc={`Uncovered ${gameState.unlockedArtifacts.length} total ancient artifacts.`}
                   icon={<Search />}
                 />
               )}

               {gameState.buildings.length > 0 && (
                 <TimelineItem 
                   day="Recent" 
                   title="Era Architect" 
                   desc={`Constructed ${gameState.buildings.length} total monuments/structures.`}
                   icon={<Hammer />}
                 />
               )}

               <TimelineItem 
                 day="Start" 
                 title="Journey Began" 
                 desc="Registered as a new explorer of ancient heritage."
                 icon={<Map />}
               />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
