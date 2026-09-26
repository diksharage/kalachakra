import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { levelThemes } from '../../data/levelThemes';
import { 
  Map, BookOpen, Compass, Search, Trophy, Hammer, Star, ChevronRight, Activity, Zap, CheckCircle, Lock, MapPin
} from 'lucide-react';
import { getAvailableEvents } from '../../data/worldEvents';

export const JourneyProgressCard = ({ stats }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const currentLevel = Math.min(stats.journey.currentLevel, 14);
  const levels = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-content/10 bg-surface">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold font-serif">{t('dash.journey_title', 'Your Journey')}</h2>
          <div className="text-sm text-content/60">
            {stats.journey.percentage}% {t('dash.completed', 'Completed')}
          </div>
        </div>
        <button onClick={() => navigate('/journey')} className="text-sm font-bold text-gold hover:underline flex items-center">
          {t('common.view_all', 'View All')} <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {levels.map(level => {
          const isCompleted = level < currentLevel;
          const isCurrent = level === currentLevel;
          const isLocked = level > currentLevel;
          const lTheme = levelThemes[level] || levelThemes.default;

          return (
            <div 
              key={level}
              className={`
                shrink-0 w-32 md:w-40 p-4 rounded-xl border flex flex-col justify-between transition-all
                ${isCurrent ? `${lTheme.bg} ${lTheme.border} shadow-lg ring-2 ring-gold/50 scale-105 mx-2` : ''}
                ${isCompleted ? 'bg-surface border-content/20 opacity-80' : ''}
                ${isLocked ? 'bg-surface/30 border-content/5 opacity-50 grayscale' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg">{level}</span>
                {isCompleted && <CheckCircle size={20} className="text-emerald-500" />}
                {isLocked && <Lock size={20} className="text-content/30" />}
                {isCurrent && <MapPin size={20} className="animate-pulse text-gold" />}
              </div>
              <div className={`text-xs font-bold leading-tight ${isCurrent ? lTheme.text : 'text-content/70'}`}>
                {t(`levels.${level}.title`, lTheme.name)}
                </div>
                {isLocked && (
                  <div className="mt-auto pt-2 text-[9px] text-content/50 leading-tight uppercase font-bold">
                    Complete Level {level - 1} to unlock Level {level}.
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const LegacyCard = ({ stats }) => {
  const { t } = useLanguage();
  return (
    <div className="glass-panel p-6 rounded-2xl border border-gold/30 bg-gold/5 flex flex-col justify-between h-full">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gold mb-1">{t('dash.legacy_title', 'Legacy')}</div>
        <div className="text-4xl font-serif font-bold text-content flex items-center gap-2">
          <Star className="text-gold fill-gold" size={32} /> {stats.legacy.current}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1 opacity-70">
          <span>{t('dash.next_milestone', 'Next Milestone')}</span>
          <span>{stats.legacy.nextMilestone}</span>
        </div>
        <div className="w-full bg-main/50 rounded-full h-2">
          <div className="bg-gold h-2 rounded-full transition-all" style={{ width: `${stats.legacy.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export const PlayerTypeCard = () => {
  const { gameState } = useGame();
  const { t } = useLanguage();
  const pType = gameState.playerType || 'explorer';

  const typeData = {
    explorer: { icon: Compass, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    strategist: { icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    historian: { icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    builder: { icon: Hammer, color: 'text-orange-500', bg: 'bg-orange-500/10' }
  };
  const config = typeData[pType] || typeData.explorer;
  const Icon = config.icon;

  return (
    <div className={`glass-panel p-6 rounded-2xl border border-content/10 flex items-center gap-4 ${config.bg}`}>
      <div className={`p-4 rounded-xl bg-surface ${config.color} shadow-inner`}>
        <Icon size={28} />
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wider opacity-60">{t('dash.player_type', 'Player Style')}</div>
        <div className={`text-lg font-bold capitalize ${config.color}`}>{t(`onboarding.type_${pType}`, pType)}</div>
      </div>
    </div>
  );
};

export const RecommendedActions = ({ actions }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="glass-panel p-6 rounded-2xl border border-content/10 bg-surface">
      <h3 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-4">{t('dash.rec_title', 'What should I do next?')}</h3>
      <div className="space-y-3">
        {actions.map(action => (
          <button 
            key={action.id}
            onClick={() => navigate(action.route)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-main border border-content/10 hover:border-gold hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{action.icon}</span>
              <div>
                <div className="font-bold">{t(action.titleKey, action.id)}</div>
                <div className="text-xs opacity-60">{t(action.descKey, '')}</div>
              </div>
            </div>
            <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const ActivityFeed = () => {
  const { gameState } = useGame();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const notifications = gameState.notifications || [];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-content/10 bg-surface flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">{t('dash.activity_title', 'Recent Updates')}</h3>
        <button onClick={() => window.dispatchEvent(new CustomEvent('open-notifications'))} className="text-xs text-gold hover:underline">
          {t('notif.view_all', 'View All')}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
        {notifications.length === 0 ? (
          <div className="text-sm opacity-50 italic text-center py-8">{t('dash.no_activity', 'Your journey is just beginning.')}</div>
        ) : (
          notifications.slice(0, 5).map(notif => (
            <div key={notif.id} className="flex gap-3 text-sm group cursor-pointer" onClick={() => {
              if (notif.metadata?.route) navigate(notif.metadata.route);
            }}>
              <div className="mt-1 text-gold">
                {notif.metadata?.icon || <Zap size={14} />}
              </div>
              <div>
                <span className="font-bold group-hover:text-gold transition-colors">{t('notif.title.' + notif.titleKey, notif.titleKey)}</span>
                <div className="opacity-60 text-xs line-clamp-1">{t('notif.msg.' + notif.messageKey, notif.messageKey)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export const WorldEventWidget = () => {
  const { gameState } = useGame();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const activeEvents = getAvailableEvents(gameState.currentLevel || 1, gameState.completedEvents || {});
  if (activeEvents.length === 0) return null;
  
  const ev = activeEvents[0];
  
  return (
    <div className="p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gold/10 border-gold/40 animate-pulse-slow">
      <div className="flex gap-4 items-center">
        <div className="w-14 h-14 rounded-xl bg-gold text-main flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-gold/20">
          Ã¢Å¡Â¡
        </div>
        <div>
          <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{t('event.alert', 'World Event Available')}</div>
          <h3 className="text-lg font-bold font-serif text-content">{t(ev.titleKey, ev.id)}</h3>
          <div className="text-xs text-content/60 mt-1">{t('event.alert_desc', 'A situation requires your decision.')}</div>
        </div>
      </div>
      
      <button onClick={() => navigate(`/events/${ev.id}`)} className="w-full md:w-auto px-6 py-3 rounded-lg font-bold bg-gold text-main shadow-lg shadow-gold/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
        {t('event.view', 'Resolve Event')}
      </button>
    </div>
  );
};



