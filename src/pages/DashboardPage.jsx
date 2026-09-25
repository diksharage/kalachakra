import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { getDashboardStats, getRecommendedActions } from '../services/dashboardService';
import { levelThemes } from '../data/levelThemes';
import { 
  JourneyProgressCard, 
  LegacyCard, 
  PlayerTypeCard, 
  RecommendedActions, 
  ActivityFeed,
  WorldEventWidget
} from '../components/dashboard/DashboardWidgets';
import { Map, BookOpen, Compass, Search, Trophy, Hammer } from 'lucide-react';

const DashboardPage = () => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const { playSound } = useAudio();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const stats = useMemo(() => getDashboardStats(gameState), [gameState]);
  const recommendations = useMemo(() => getRecommendedActions(gameState, stats), [gameState, stats]);
  
  
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

  const getStageProgress = (state) => {
    if (!state) return "";
    switch(state.stage) {
      case 1: return `Locations ${state.exploration.length}/4`;
      case 2: return `Artifacts ${state.discovery.length}/4`;
      case 3: return `Notes ${state.learning.length}/4`;
      case 4: return `Challenges ${state.completedChallenges.length}/${state.activeChallengeIds?.length || 3}`;
      case 5: return `Structures ${state.builtItems.length}/3`;
      case 6: return "Ready to complete";
      default: return "";
    }
  };

  const currentLevel = Math.min(stats.journey.currentLevel, 14);
  const levelThemeData = levelThemes[currentLevel] || levelThemes.default;
  const pName = gameState.playerName || t('common.traveler', 'Traveler');
  

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto atmospheric-bg">
      
      {/* 1. Personalized Header - Adventure Camp Style */}
      <header className="relative flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 p-8 rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-surface to-main overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNENEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="text-gold font-bold tracking-widest text-sm uppercase mb-2 animate-drift">Heritage Basecamp</div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-content drop-shadow-md mb-2">
            {t('dash.welcome', 'Welcome back, {{name}}!').replace('{{name}}', pName)}
          </h1>
          <p className="text-content/80 text-lg">
            {t('dash.subtitle', 'Your adventure continues through history, culture, and heritage.')}
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <div className="px-4 py-2 rounded-xl bg-main/80 backdrop-blur-md border border-gold/40 shadow-inner text-xs font-bold uppercase text-content/90 hover-card-fx">
            {t(`onboarding.age_${gameState.ageGroup || '12-14'}`, gameState.ageGroup || '12-14')}
          </div>
          <div className="px-4 py-2 rounded-xl bg-main/80 backdrop-blur-md border border-gold/40 shadow-inner text-xs font-bold uppercase text-gold hover-card-fx">
            {t(`onboarding.type_${gameState.playerType || 'explorer'}`, gameState.playerType || 'Explorer')}
          </div>

        </div>
      </header>

      {/* 2. World Events (Conditional) */}
      <WorldEventWidget />

      {/* 3. Top Row: Journey Progress & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <JourneyProgressCard stats={stats} />
        </div>
        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
          <LegacyCard stats={stats} />
          <PlayerTypeCard />
        </div>
      </div>

      {/* 4. Current Level Continue Action */}
      <div className={`glass-panel p-8 rounded-3xl border ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface/50'} relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">{t('dash.current_level', 'Current Level')}</div>
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-2 ${levelThemeData.text}`}>
                Level {currentLevel} - {levelThemeData.name}
              </h2>
            <div className="text-sm opacity-80 flex flex-col gap-2">
                {stats.journey.isComplete ? (
                  <p>You have preserved the Legacy and completed the journey.</p>
                ) : (gameState.activeLevelId === currentLevel && gameState.activeLevelState) ? (
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="font-bold text-content uppercase tracking-wider text-xs">
                      Current: <span className="text-gold">{getStageLabel(gameState.activeLevelState.stage)}</span>
                    </p>
                    <p className="text-content/70">
                      {getStageProgress(gameState.activeLevelState)}
                    </p>
                  </div>
                ) : (
                  <p>{t('dash.continue_desc', 'Explore the historical context and challenges.')}</p>
                )}
              </div>
          </div>
          <button 
            onClick={() => navigate(stats.journey.isComplete ? '/profile' : (gameState.activeLevelId === currentLevel && gameState.activeLevelState ? `/journey/level/${currentLevel}/play` : `/journey/level/${currentLevel}`))}
            className="w-full md:w-auto px-8 py-4 rounded-xl font-bold bg-gold text-main shadow-xl shadow-gold/20 hover:scale-[1.02] transition-transform text-lg flex items-center justify-center gap-2"
          >
            {stats.journey.isComplete ? t('nav.profile', 'View Profile') : t('dash.continue_btn', 'Continue Journey →')}
          </button>
        </div>
      </div>

      {/* 5. Middle Grid: Context & Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecommendedActions actions={recommendations} />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* 6. Analytics & Systems Overview */}
      <h3 className="text-xl font-serif font-bold mt-12 mb-6 border-b border-content/10 pb-2">
        {t('dash.analytics_title', 'Systems Overview')}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <button onClick={() => { playSound('ui'); navigate('/library'); }} className="glass-panel p-4 rounded-xl border border-content/10 bg-surface hover:border-gold transition-colors text-left group">
          <BookOpen className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-2xl font-bold">{stats.discoveries.discovered}</div>
          <div className="text-xs opacity-60 uppercase font-bold tracking-wider">{t('nav.library', 'Heritage Library')}</div>
        </button>

        <button data-tutorial="dash-explore" onClick={() => navigate('/explore')} className="glass-panel p-4 rounded-xl border border-content/10 bg-surface hover:border-gold transition-colors text-left group">
          <Map className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-2xl font-bold">{stats.map.discovered}</div>
          <div className="text-xs opacity-60 uppercase font-bold tracking-wider">{t('nav.explore', 'Historical Map')}</div>
        </button>

        <button onClick={() => navigate('/achievements')} className="glass-panel p-4 rounded-xl border border-content/10 bg-surface hover:border-gold transition-colors text-left group">
          <Trophy className="text-gold mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-2xl font-bold">{stats.achievements.unlocked}</div>
          <div className="text-xs opacity-60 uppercase font-bold tracking-wider">{t('nav.achievements', 'Achievements')}</div>
        </button>

        <button onClick={() => navigate('/builder')} className="glass-panel p-4 rounded-xl border border-content/10 bg-surface hover:border-gold transition-colors text-left group">
          <Hammer className="text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-2xl font-bold">{stats.builder.totalBuildings}</div>
          <div className="text-xs opacity-60 uppercase font-bold tracking-wider">{t('nav.build', 'Buildings')}</div>
        </button>

        <button onClick={() => navigate('/investigations')} className="glass-panel p-4 rounded-xl border border-content/10 bg-surface hover:border-gold transition-colors text-left group">
          <Search className="text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
          <div className="text-2xl font-bold">{stats.investigations.completed}</div>
          <div className="text-xs opacity-60 uppercase font-bold tracking-wider">{t('nav.investigations', 'Investigations')}</div>
        </button>

        <div className="glass-panel p-4 rounded-xl border border-content/10 bg-surface">
          <div className="text-xl mb-3">⚖️</div>
          <div className="text-2xl font-bold">{stats.events.completed}</div>
          <div className="text-xs opacity-60 uppercase font-bold tracking-wider">{t('dash.decisions', 'Decisions Made')}</div>
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;

