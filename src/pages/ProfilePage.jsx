import React from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { User, Activity, Map, Trophy, Hexagon, Star, PlayCircle, BookOpen, Hammer, Search, CheckCircle, Volume2, VolumeX, ArrowRight, Settings, Moon, Sun, LogOut } from 'lucide-react';
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
  const { theme, toggleTheme } = useTheme();
  const { gameState, logoutUser } = useGame();
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
                <button 
                  onClick={toggleTheme}
                  className="px-2 py-1 bg-surface border border-content/30 rounded-md hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  title="Click to toggle theme"
                >
                  Theme: {theme}
                </button>
              </div>
            </div>

            
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

        </div>

        {/* RIGHT COLUMN: SETTINGS */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="glass-panel p-6 rounded-2xl border border-content/10">
            <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-3"><Settings className="text-blue-400" /> App Settings</h2>
            
            {/* THEME TOGGLE */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-content">Visual Theme</h3>
                  <p className="text-sm text-content/60">Switch between light and dark mode.</p>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-content/20 bg-surface/50 hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <div className="flex items-center gap-3 font-bold text-content">
                  {theme === 'light' ? <Sun className="text-orange-400" /> : <Moon className="text-blue-300" />}
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${theme === 'light' ? 'bg-gold' : 'bg-content/20'}`}>
                  <div className={`w-4 h-4 rounded-full bg-main transition-transform ${theme === 'light' ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </button>
            </div>

            {/* AUDIO SETTINGS */}
            <div className="border-t border-content/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-content">Audio Settings</h3>
                  <p className="text-sm text-content/60">Game sounds & ambience.</p>
                </div>
                <button 
                  onClick={toggleMute}
                  className={`p-2 rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-gold ${audioSettings.muted ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-surface border border-content/20 text-content'}`}
                  title={audioSettings.muted ? 'Unmute' : 'Mute All'}
                >
                  {audioSettings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {!audioSettings.muted && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold opacity-80">Sound Effects</label>
                      <span className="text-xs opacity-60">{Math.round(audioSettings.sfxVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.01" 
                      value={audioSettings.sfxVolume}
                      onChange={(e) => updateSetting('sfxVolume', parseFloat(e.target.value))}
                      className="w-full h-2 rounded-full custom-slider"
                      style={{ background: `linear-gradient(to right, #D4A64A ${audioSettings.sfxVolume * 100}%, rgba(255,255,255,0.2) ${audioSettings.sfxVolume * 100}%)` }}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold opacity-80">Ambience</label>
                      <span className="text-xs opacity-60">{Math.round(audioSettings.ambienceVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.01" 
                      value={audioSettings.ambienceVolume}
                      onChange={(e) => updateSetting('ambienceVolume', parseFloat(e.target.value))}
                      className="w-full h-2 rounded-full custom-slider"
                      style={{ background: `linear-gradient(to right, #D4A64A ${audioSettings.ambienceVolume * 100}%, rgba(255,255,255,0.2) ${audioSettings.ambienceVolume * 100}%)` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* LOGOUT SETTING */}
            <div className="border-t border-content/10 pt-6 mt-6">
              <button 
                onClick={() => logoutUser()}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-900/10 text-red-400 hover:bg-red-900/30 hover:border-red-500/50 transition-colors font-bold"
              >
                <LogOut size={20} />
                Log Out
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
