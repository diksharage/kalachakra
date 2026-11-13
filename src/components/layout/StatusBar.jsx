import React from 'react';
import { useGame } from '../../context/GameContext';
import { Menu, Heart, Brain, Library, Star, Search, Volume2, VolumeX, CheckCircle2, Loader2, AlertCircle, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useAudio } from '../../context/AudioContext';
import { useLanguage } from '../../context/LanguageContext';
import NotificationCenter from './NotificationCenter';

const StatusBar = ({ onMenuToggle }) => {
  const { gameState, saveStatus } = useGame();
  const { isOffline } = useNetworkStatus();
  const { settings: audioSettings, toggleMute, playSound } = useAudio();
  const { t } = useLanguage();

  const resources = [
    { name: 'Energy', value: gameState.energy, icon: Heart, color: 'text-red-400' },
    { name: 'Knowledge', value: gameState.knowledge, icon: Brain, color: 'text-blue-400' },
    { name: 'Culture', value: gameState.culture, icon: Library, color: 'text-purple-400' },
    { name: 'Legacy', value: gameState.legacy, icon: Star, color: 'text-orange-400' },
  ];

  return (
    <header className="h-14 sm:h-16 glass-panel border-b border-gold/20 flex items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-20 shrink-0">
      {/* Mobile Drawer Toggle */}
      <button
        type="button"
        className="md:hidden min-w-[44px] min-h-[44px] p-2 text-content/70 hover:text-gold flex items-center justify-center -ml-1 transition-colors"
        onClick={onMenuToggle}
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      {/* Global Search Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl mx-2 sm:mx-4">
        <button
          type="button"
          data-tutorial="global-search"
          onClick={() => { playSound('ui'); window.dispatchEvent(new CustomEvent('open-global-search')); }}
          className="w-full flex items-center gap-2 sm:gap-3 bg-surface/50 hover:bg-surface border border-content/10 hover:border-gold/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all group min-h-[38px] sm:min-h-[42px]"
          aria-label="Search KALACHAKRA"
        >
          <Search size={16} className="text-content/50 group-hover:text-gold transition-colors shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-content/50 group-hover:text-content hidden sm:block truncate">
            Search KALACHAKRA...
          </span>
          <span className="text-xs font-medium text-content/50 group-hover:text-content sm:hidden truncate">
            Search...
          </span>
          <div className="ml-auto hidden md:flex gap-1 shrink-0">
            <kbd className="bg-main px-1.5 py-0.5 rounded text-[10px] font-mono border border-content/10 text-content/40">Ctrl</kbd>
            <kbd className="bg-main px-1.5 py-0.5 rounded text-[10px] font-mono border border-content/10 text-content/40">K</kbd>
          </div>
        </button>
      </div>

      {/* Resources on Larger Displays */}
      <div className="items-center gap-3 lg:gap-4 hidden xl:flex">
        {resources.map((res) => (
          <div key={res.name} className="flex items-center gap-1.5 bg-main/50 px-2.5 py-1 rounded-full border border-content/10 shadow-inner">
            <res.icon className={`w-3.5 h-3.5 ${res.color}`} />
            <span className="font-bold text-xs sm:text-sm text-content">{res.value}</span>
            <span className="text-[11px] text-content/50 uppercase ml-0.5">{res.name}</span>
          </div>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {gameState.isAuthenticated && (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/50 border border-content/10 text-[11px] font-medium text-content/70">
            {saveStatus === 'saving' && <><Loader2 size={12} className="animate-spin text-gold" /> Saving...</>}
            {saveStatus === 'saved' && <><CheckCircle2 size={12} className="text-green-500" /> {isOffline ? 'Saved locally' : 'Saved'}</>}
            {saveStatus === 'error' && <><AlertCircle size={12} className="text-red-500" /> Save Error</>}
            {saveStatus === 'idle' && <><CheckCircle2 size={12} className="text-content/40" /> {isOffline ? 'Saved locally' : 'Saved'}</>}
          </div>
        )}

        {isOffline && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-medium text-red-500">
            <WifiOff size={12} /> <span className="hidden sm:inline">Offline</span>
          </div>
        )}

        {/* Mute Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface/50 border border-content/10 hover:border-gold hover:text-gold transition-colors flex items-center justify-center min-w-[36px]"
          title={audioSettings.muted ? t('audio.sound_off', 'Sound Off') : t('audio.sound_on', 'Sound On')}
          aria-label={audioSettings.muted ? 'Unmute sound' : 'Mute sound'}
        >
          {audioSettings.muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        {/* Notifications */}
        <div data-tutorial="notifications">
          <NotificationCenter />
        </div>

        {/* Player Profile & Level */}
        <div className="text-right hidden sm:block">
          <div className="text-xs sm:text-sm font-bold text-content capitalize leading-tight">
            {gameState.playerType || 'Explorer'}
          </div>
          <div className="text-[10px] sm:text-xs text-gold font-bold">
            Level {gameState.currentLevel || gameState.level || 1}
          </div>
        </div>

        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface border-2 border-gold flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
          <UserIcon type={gameState.playerType} />
        </div>
      </div>
    </header>
  );
};

const UserIcon = ({ type }) => {
  const normalized = String(type || '').toLowerCase();
  switch (normalized) {
    case 'explorer': return <span className="text-sm sm:text-base">🧭</span>;
    case 'strategist': return <span className="text-sm sm:text-base">♟️</span>;
    case 'historian': return <span className="text-sm sm:text-base">📜</span>;
    case 'builder': return <span className="text-sm sm:text-base">🧱</span>;
    default: return <span className="text-sm sm:text-base">🧭</span>;
  }
};

export default StatusBar;
