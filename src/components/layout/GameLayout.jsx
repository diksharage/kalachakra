import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import { useGame } from '../../context/GameContext';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useLanguage } from '../../context/LanguageContext';
import ToastManager from './ToastManager';
import TutorialOverlay from '../tutorial/TutorialOverlay';


import GlobalSearch from './GlobalSearch';

const GameLayout = () => {
  const { t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isOffline, isOnline } = useNetworkStatus();
  const { gameState, notify } = useGame();

  React.useEffect(() => {
    const wasOffline = sessionStorage.getItem('kc_offline_flag');
    if (isOffline && !wasOffline) {
      sessionStorage.setItem('kc_offline_flag', 'true');
      notify('INFO', 'notif.offline_title', 'notif.offline_desc', { fallbackTitle: 'Offline Mode', fallbackMessage: 'Your progress is being saved locally on this device.' });
    } else if (isOnline && wasOffline === 'true') {
      sessionStorage.removeItem('kc_offline_flag');
      notify('SUCCESS', 'notif.online_title', 'notif.online_desc', { fallbackTitle: 'Back Online', fallbackMessage: 'Connection restored.' });
    }
  }, [isOffline, isOnline, notify]);

  React.useEffect(() => {
    const handleOpen = () => setIsSearchOpen(true);
    window.addEventListener('open-global-search', handleOpen);
    
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('open-global-search', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="flex h-screen bg-main text-content overflow-hidden">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ToastManager />
        <TutorialOverlay />
        
        
        <StatusBar onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-main to-surface">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameLayout;















