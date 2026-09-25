import React, { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { levelThemes } from '../../data/levelThemes';

const ToastManager = () => {
  const { gameState, markNotificationRead } = useGame();
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const [activeToasts, setActiveToasts] = useState([]);
  
  // Watch for new unread notifications that haven't been shown yet
  useEffect(() => {
    const unread = (gameState.notifications || []).filter(n => !n.read && !n.toastShown);
    
    if (unread.length > 0) {
      // Add up to 3 to the toast queue
      const toShow = unread.slice(0, 3);
      
      setActiveToasts(prev => {
        // Filter out duplicates based on id
        const existingIds = new Set(prev.map(t => t.id));
        const newUnique = toShow.filter(t => !existingIds.has(t.id));
        return [...prev, ...newUnique].slice(0, 3); // Max 3 visible
      });
      
      // Mark them as toastShown locally in state to prevent re-triggering.
      // We don't mark as READ here, just that the toast was shown.
      // Modifying GameContext here would cause re-renders, so we just track them.
      // Alternatively, the best practice is to let them timeout.
    }
  }, [gameState.notifications]);

  // Handle timeout removal
  useEffect(() => {
    if (activeToasts.length > 0) {
      const timers = activeToasts.map(toast => {
        return setTimeout(() => {
          removeToast(toast.id);
        }, 5000); // 5 seconds
      });
      
      return () => timers.forEach(clearTimeout);
    }
  }, [activeToasts]);

  const removeToast = (id) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleToastClick = (toast) => {
    markNotificationRead(toast.id);
    removeToast(toast.id);
    if (toast.metadata?.route) {
      // Small delay if routing is needed? React Router handles it.
      window.location.hash = toast.metadata.route; // Assuming HashRouter or standard Link
    }
  };

  if (activeToasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 items-end pointer-events-none">
      {activeToasts.map(toast => {
        const lTheme = toast.metadata?.levelId ? levelThemes[toast.metadata.levelId] || levelThemes.default : null;
        const isAchievement = toast.type === 'ACHIEVEMENT';
        
        return (
          <div 
            key={toast.id}
            className={`pointer-events-auto transform transition-all duration-300 ${isAchievement ? 'animate-pop-in border-gold/40 shadow-[0_0_20px_rgba(212,166,74,0.3)]' : 'animate-slide-up border-content/10'}
              p-4 rounded-xl shadow-2xl flex items-start gap-4 max-w-sm w-full border
              ${theme === 'light' ? 'bg-surface' : 'bg-surface glass-panel'}
              
            `}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 
              ${isAchievement ? 'bg-gradient-to-br from-gold to-terracotta' : (lTheme ? `${lTheme.bg} ${lTheme.border}` : 'bg-main')}
            `}>
              {toast.metadata?.icon || 'ðŸ””'}
            </div>
            
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isAchievement ? 'text-gold' : 'text-content/50'}`}>
                  {isAchievement ? t('notif.achievement', 'Achievement Unlocked') : t(`notif.type.${toast.type}`, 'Notification')}
                </span>
              </div>
              <h4 className="font-bold text-content text-sm truncate">{t(`notif.title.${toast.titleKey}`, toast.titleKey)}</h4>
              <p className="text-xs text-content/70 line-clamp-2 mt-0.5">{t(`notif.msg.${toast.messageKey}`, toast.messageKey)}</p>
              
              {toast.metadata?.reward && (
                <div className="mt-2 text-[10px] font-bold text-gold flex items-center gap-1">
                  +{toast.metadata.reward} {t('common.legacy', 'Legacy')}
                </div>
              )}
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}
              className="text-content/40 hover:text-content p-1 -mt-1 -mr-1"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastManager;

