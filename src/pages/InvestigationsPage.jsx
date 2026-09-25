import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { artifactInvestigations } from '../data/artifactInvestigations';
import { levelThemes } from '../data/levelThemes';
import { useTheme } from '../context/ThemeContext';
import { Search, Lock, CheckCircle2 } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const InvestigationsPage = () => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { unlockedLevels, completedInvestigations = [] } = gameState;

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">

        <div>
          <div className="w-14 h-14 bg-gradient-to-br from-gold to-terracotta rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gold/20">
            <Search size={28} className="text-main" />
          </div>
          <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">{t('investigation.title', 'Artifact Investigations')}</h1>
          <p className="text-content/70 text-sm max-w-xl">{t('investigation.subtitle', 'Observe evidence, collect clues, and classify historical claims.')}</p>
        </div>
        
        <div className={`glass-panel px-6 py-4 rounded-xl border flex gap-6 ${theme === 'light' ? 'bg-surface border-gold/30' : 'bg-surface/50 border-content/10'}`}>
          <div>
            <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{t('investigation.completed', 'Completed')}</div>
            <div className="text-2xl font-bold text-content">{completedInvestigations.length} <span className="text-sm text-content/50">/ {artifactInvestigations.length}</span></div>
          </div>
        </div>
      
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {artifactInvestigations.map(inv => {
          const isUnlocked = unlockedLevels.includes(inv.levelId);
          const isCompleted = completedInvestigations.includes(inv.id);
          const levelThemeData = levelThemes[inv.levelId] || levelThemes[1];

          if (!isUnlocked) {
            return (
              <div key={inv.id} className={`rounded-2xl p-6 flex gap-6 items-center opacity-50 grayscale border border-content/10 ${theme === 'light' ? 'bg-surface' : 'bg-surface/50'}`}>
                <div className="w-16 h-16 rounded-2xl bg-main border border-content/20 flex items-center justify-center shrink-0">
                  <Lock className="text-content/30" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-content text-lg mb-1">{t('investigation.locked', 'Unknown Investigation')}</h3>
                  <p className="text-sm text-content/60">{t('library.lockedDesc', 'Discover more in Level')} {inv.levelId}</p>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={inv.id}
              onClick={() => navigate(`/investigations/${inv.id}`)}
              className={`rounded-2xl p-6 border transition-all cursor-pointer hover:scale-[1.02] shadow-md relative overflow-hidden group ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface/80 hover:bg-surface'}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none ${levelThemeData.text}`}>
                <Search size={128} className="translate-x-8 -translate-y-8" />
              </div>
              
              <div className="flex gap-6 items-start relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner bg-main border border-content/10">
                  {inv.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase font-bold text-content/50 mb-1 flex items-center gap-2">
                    <span>{t('library.level', 'Level')} {inv.levelId}</span>
                    <span>•</span>
                    <span>{inv.period}</span>
                  </div>
                  <h3 className={`font-bold font-serif text-xl mb-2 ${levelThemeData.text}`}>{t(inv.titleKey, inv.titleKey)}</h3>
                  <p className="text-sm text-content/70 line-clamp-2 mb-4">{t(inv.introductionKey, 'Uncover the evidence.')}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    {isCompleted ? (
                      <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg uppercase tracking-wider font-bold flex items-center gap-1 border border-emerald-500/20">
                        <CheckCircle2 size={14} /> {t('investigation.status_completed', 'Completed')}
                      </span>
                    ) : (
                      <span className="text-xs bg-gold text-main px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold shadow-md shadow-gold/20 flex items-center gap-1 group-hover:bg-terracotta transition-colors">
                        <Search size={14} /> {t('investigation.start', 'Start Investigation')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {artifactInvestigations.length === 0 && (
        <div className="py-12 text-center text-content/50 border border-content/10 border-dashed rounded-2xl bg-surface/30">
          {t('investigation.no_entries', 'No investigations found.')}
        </div>
      )}
    </div>
  );
};

export default InvestigationsPage;
