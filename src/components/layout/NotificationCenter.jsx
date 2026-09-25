import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { Bell, Check, Trash2, X, ChevronRight, Trophy, Search, Map, Hammer, Target, BookOpen } from 'lucide-react';
import { levelThemes } from '../../data/levelThemes';

const NotificationCenter = () => {
  const { t } = useLanguage();
  const { gameState, markNotificationRead, markAllNotificationsRead, clearNotifications } = useGame();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

    useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-notifications', handleOpen);
    return () => window.removeEventListener('open-notifications', handleOpen);
  }, []);
  const notifications = gameState.notifications || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNotificationClick = (n) => {
    markNotificationRead(n.id);
    if (n.metadata?.route) {
      navigate(n.metadata.route);
      setIsOpen(false);
    }
  };

  const getRelativeTime = (isoString) => {
    if (!isoString) return '';
    const diff = Date.now() - new Date(isoString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return t('time.just_now', 'Just now');
    if (minutes < 60) return `${minutes} ${t('time.min_ago', 'min ago')}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${t('time.hours_ago', 'hours ago')}`;
    return t('time.yesterday', 'Yesterday');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-surface/50 border border-content/10 hover:border-gold hover:text-gold transition-colors flex items-center justify-center relative"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg border border-main">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown / Drawer */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 sm:w-96 max-h-[80vh] bg-surface border border-content/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col z-[100] animate-slide-up origin-top-right">
          
          {/* Header */}
          <div className="p-4 border-b border-content/10 bg-main/50 flex items-center justify-between">
            <h3 className="font-bold font-serif text-lg">{t('nav.notifications', 'Notifications')}</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllNotificationsRead}
                  className="p-1.5 rounded-lg text-content/50 hover:text-gold hover:bg-gold/10 transition-colors"
                  title={t('notif.mark_all_read', 'Mark all read')}
                >
                  <Check size={16} />
                </button>
              )}
              {notifications.length > 0 && (
                <button 
                  onClick={clearNotifications}
                  className="p-1.5 rounded-lg text-content/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  title={t('notif.clear_all', 'Clear all')}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 no-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center opacity-60">
                <Bell size={32} className="mx-auto mb-3 opacity-20" />
                <p className="font-bold">{t('notif.empty', "You're all caught up.")}</p>
                <p className="text-xs mt-1">{t('notif.empty_desc', "Important discoveries and milestones will appear here.")}</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map(n => {
                  const isUnread = !n.read;
                  const lTheme = n.metadata?.levelId ? levelThemes[n.metadata.levelId] || levelThemes.default : null;
                  
                  return (
                    <div 
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${isUnread ? 'bg-main shadow-md border-l-2 border-l-gold' : 'hover:bg-main/50 border-l-2 border-transparent opacity-80'}`}
                    >
                      <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-lg ${lTheme ? `${lTheme.bg} ${lTheme.border}` : 'bg-surface border border-content/10'}`}>
                        {n.metadata?.icon || <Bell size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-0.5">
                          <span className={`font-bold text-sm truncate ${isUnread ? 'text-content' : 'text-content/80'}`}>
                            {t(`notif.title.${n.titleKey}`, n.titleKey)}
                          </span>
                          <span className="text-[10px] text-content/50 whitespace-nowrap mt-1">
                            {getRelativeTime(n.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-content/70 line-clamp-2">
                          {t(`notif.msg.${n.messageKey}`, n.messageKey)}
                        </p>
                        {n.metadata?.reward && (
                          <div className="text-[10px] font-bold text-gold mt-1">
                            +{n.metadata.reward} {t('common.legacy', 'Legacy')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;

