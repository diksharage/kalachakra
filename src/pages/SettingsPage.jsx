import React from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { Settings, Sun, Moon, Volume2, VolumeX, LogOut } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { logoutUser } = useGame();
  const { settings: audioSettings, updateSetting, toggleMute } = useAudio();

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto px-4 md:px-0 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <BackButton />
        <h1 className="text-3xl font-serif font-bold text-content flex items-center gap-3">
          <Settings className="text-blue-400 w-8 h-8" /> 
          App Settings
        </h1>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-content/10 space-y-10">
        
        {/* THEME TOGGLE */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-content text-lg">Visual Theme</h3>
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
        <div className="border-t border-content/10 pt-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-content text-lg">Audio Settings</h3>
              <p className="text-sm text-content/60">Game sounds & ambience.</p>
            </div>
            <button 
              onClick={toggleMute}
              className={`p-3 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-gold ${audioSettings.muted ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'bg-surface border border-content/20 text-content'}`}
              title={audioSettings.muted ? 'Unmute' : 'Mute All'}
            >
              {audioSettings.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {!audioSettings.muted && (
            <div className="space-y-6 bg-surface/30 p-6 rounded-xl border border-content/10">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-bold opacity-80">Sound Effects</label>
                  <span className="text-xs opacity-60 font-mono">{Math.round(audioSettings.sfxVolume * 100)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={audioSettings.sfxVolume}
                  onChange={(e) => updateSetting('sfxVolume', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full custom-slider cursor-pointer"
                  style={{ background: `linear-gradient(to right, #D4A64A ${audioSettings.sfxVolume * 100}%, rgba(255,255,255,0.2) ${audioSettings.sfxVolume * 100}%)` }}
                />
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-bold opacity-80">Ambience</label>
                  <span className="text-xs opacity-60 font-mono">{Math.round(audioSettings.ambienceVolume * 100)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={audioSettings.ambienceVolume}
                  onChange={(e) => updateSetting('ambienceVolume', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full custom-slider cursor-pointer"
                  style={{ background: `linear-gradient(to right, #D4A64A ${audioSettings.ambienceVolume * 100}%, rgba(255,255,255,0.2) ${audioSettings.ambienceVolume * 100}%)` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* LOGOUT SETTING */}
        <div className="border-t border-content/10 pt-8 mt-8">
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
  );
};

export default SettingsPage;
