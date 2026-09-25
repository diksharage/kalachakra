import React from 'react';
import { useGame } from '../../context/GameContext';
import { Menu, Heart, Brain, Library, Star, Search, Volume2, VolumeX, CheckCircle2, Loader2, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useAudio } from '../../context/AudioContext';
import { useLanguage } from '../../context/LanguageContext';
import NotificationCenter from './NotificationCenter';

const StatusBar = ({ onMenuToggle }) => {
  const { gameState, saveStatus } = useGame();
  const { isOnline, isOffline } = useNetworkStatus();
  const { settings: audioSettings, toggleMute, playSound } = useAudio();
  const { t } = useLanguage();

  const resources = [
    { name: 'Energy', value: gameState.energy, icon: Heart, color: 'text-red-400' },
    { name: 'Knowledge', value: gameState.knowledge, icon: Brain, color: 'text-blue-400' },
    { name: 'Culture', value: gameState.culture, icon: Library, color: 'text-purple-400' },
    
    { name: 'Legacy', value: gameState.legacy, icon: Star, color: 'text-orange-400' },
  ];

  return (
    <div className="h-16 glass-panel border-b border-gold/20 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <button className="md:hidden p-2 mr-2 text-content/70 hover:text-gold" onClick={onMenuToggle}>
        <Menu size={24} />
      </button>
            <div className="flex items-center gap-4 flex-1 max-w-xl mx-4">
        <button 
          data-tutorial="global-search" onClick={() => { playSound('ui'); window.dispatchEvent(new CustomEvent('open-global-search')); }}
          className="w-full flex items-center gap-3 bg-surface/50 hover:bg-surface border border-content/10 hover:border-gold/50 px-4 py-2 rounded-xl transition-all group"
        >
          <Search size={18} className="text-content/50 group-hover:text-gold transition-colors" />
          <span className="text-sm font-medium text-content/50 group-hover:text-content hidden sm:block">
            Search KALACHAKRA...
          </span>
          <span className="text-sm font-medium text-content/50 group-hover:text-content sm:hidden">
            Search...
          </span>
          <div className="ml-auto hidden md:flex gap-1">
            <kbd className="bg-main px-2 py-0.5 rounded text-[10px] font-mono border border-content/10 text-content/40">Ctrl</kbd>
            <kbd className="bg-main px-2 py-0.5 rounded text-[10px] font-mono border border-content/10 text-content/40">K</kbd>
          </div>
        </button>
      </div>
      <div className="flex items-center gap-6 hidden xl:flex">
        {resources.map((res) => (
          <div key={res.name} className="flex items-center gap-2 bg-main/50 px-3 py-1.5 rounded-full border border-content/10 shadow-inner">
            <res.icon className={`w-4 h-4 ${res.color}`} />
            <span className="font-bold text-sm text-content">{res.value}</span>
            <span className="text-xs text-content/50 uppercase hidden md:inline-block ml-1">{res.name}</span>
          </div>
        ))}
      </div>
      
            <div className="flex items-center gap-3">
                                {gameState.isAuthenticated && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/50 border border-content/10 text-xs font-medium text-content/70">
            {saveStatus === 'saving' && <><Loader2 size={12} className="animate-spin text-gold" /> Saving...</>}
            {saveStatus === 'saved' && <><CheckCircle2 size={12} className="text-green-500" /> {isOffline ? 'Saved locally' : 'Saved'}</>}
            {saveStatus === 'error' && <><AlertCircle size={12} className="text-red-500" /> Save Error</>}
            {saveStatus === 'idle' && <><CheckCircle2 size={12} className="text-content/40" /> {isOffline ? 'Saved locally' : 'Saved'}</>}
          </div>
        )}
        {isOffline && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-medium text-red-500">
            <WifiOff size={12} /> <span className="hidden sm:inline">Offline Mode</span>
          </div>
        )}
        <button 
          onClick={toggleMute}
          className="w-10 h-10 rounded-xl bg-surface/50 border border-content/10 hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
          title={audioSettings.muted ? t('audio.sound_off', 'Sound Off') : t('audio.sound_on', 'Sound On')}
        >
          {audioSettings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <div data-tutorial="notifications"><NotificationCenter /></div>
        <div className="text-right hidden sm:block">
          <div className="text-sm font-bold text-content">{gameState.playerType || 'Guest'}</div>
          <div className="text-xs text-gold">Level {gameState.level}</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface border-2 border-gold flex items-center justify-center overflow-hidden">
          <UserIcon type={gameState.playerType} />
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ type }) => {
  switch (type) {
    case 'Explorer': return <span>ðŸ§­</span>;
    case 'Strategist': return <span>â™Ÿï¸</span>;
    case 'Historian': return <span>ðŸ“œ</span>;
    case 'Builder': return <span>ðŸ§±</span>;
    default: return <span className="text-content">U</span>;
  }
}

export default StatusBar;











