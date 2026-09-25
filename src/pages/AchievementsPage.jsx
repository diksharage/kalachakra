import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAchievements } from '../context/AchievementContext';
import { Trophy, Lock } from 'lucide-react';
import { achievementCategories } from '../data/achievements';
import BackButton from '../components/common/BackButton';

const AchievementCard = ({ achievement, isUnlocked, progress }) => {
  const { t } = useLanguage();
  
  if (achievement.hidden && !isUnlocked) {
    return (
      <div className="bg-surface border border-content/10 rounded-2xl p-4 flex gap-4 opacity-50 grayscale">
        <div className="w-16 h-16 rounded-xl bg-main border border-content/20 flex items-center justify-center shrink-0">
          <Lock className="text-content/40" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="font-bold text-content">{t('achievements.hidden', 'Hidden Achievement')}</h4>
          <p className="text-sm text-content/60">{t('achievements.hiddenDesc', 'Continue your journey to discover this.')}</p>
        </div>
      </div>
    );
  }

  const percent = Math.min(100, Math.round((progress / achievement.target) * 100));

  return (
    <div className={`rounded-2xl p-4 flex gap-4 transition-all ${isUnlocked ? 'bg-surface border border-gold/40 shadow-lg shadow-gold/10' : 'bg-surface/50 border border-content/10 opacity-70'}`}>
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 ${isUnlocked ? 'bg-gradient-to-br from-gold to-terracotta' : 'bg-main border border-content/20'}`}>
        {isUnlocked ? achievement.icon : <Lock size={24} className="text-content/30" />}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-content">{t(`achievements.${achievement.titleKey}`, achievement.titleKey)}</h4>
          {isUnlocked && <span className="text-[10px] bg-gold/20 text-gold px-2 py-1 rounded font-bold uppercase tracking-wider">{t('achievements.unlocked', 'Unlocked')}</span>}
        </div>
        <p className="text-sm text-content/70 mb-3">{t(`achievements.${achievement.descKey}`, achievement.descKey)}</p>
        
        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-[10px] font-bold text-content/60 uppercase mb-1">
            <span>{isUnlocked ? t('common.complete', 'Complete') : 'Progress'}</span>
            <span>{progress} / {achievement.target}</span>
          </div>
          <div className="w-full h-1.5 bg-main rounded-full overflow-hidden">
            <div 
              className={`h-full ${isUnlocked ? 'bg-gold' : 'bg-terracotta/50'}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementsPage = () => {
  const { t } = useLanguage();
  const { achievementsData, unlockedIds, getAchievementProgress } = useAchievements();

  const totalUnlocked = unlockedIds.length;
  const totalAvailable = achievementsData.length;

  const groupedAchievements = useMemo(() => {
    const groups = {};
    achievementCategories.forEach(cat => {
      groups[cat.id] = achievementsData.filter(a => a.category === cat.id);
    });
    return groups;
  }, [achievementsData]);

  return (
    <div className="space-y-10 pb-20">
      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">

        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold to-terracotta rounded-full flex items-center justify-center mb-4 shadow-lg shadow-gold/20">
          <Trophy size={32} className="text-main" />
        </div>
        <h1 className="text-4xl font-serif font-bold gold-gradient-text mb-4">{t('achievements.title', 'Achievements')}</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="bg-surface border border-gold/30 rounded-xl px-6 py-3 shadow-md shadow-gold/10">
            <div className="text-sm font-bold text-content/60 uppercase tracking-wider mb-1">{t('achievements.unlocked', 'Unlocked')}</div>
            <div className="text-2xl font-bold text-gold">{totalUnlocked} <span className="text-content/50 text-lg">/ {totalAvailable}</span></div>
          </div>
        </div>
      
        </div>
      </header>

      <div className="max-w-5xl mx-auto space-y-12">
        {achievementCategories.map(category => {
          const catAchievements = groupedAchievements[category.id];
          if (!catAchievements || catAchievements.length === 0) return null;

          return (
            <section key={category.id}>
              <h2 className="text-xl font-serif font-bold text-content mb-6 flex items-center gap-2 border-b border-content/10 pb-2">
                <span>{category.icon}</span>
                {t(`achievements.categories.${category.id}`, category.labelKey)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catAchievements.map(ach => (
                  <AchievementCard 
                    key={ach.id}
                    achievement={ach}
                    isUnlocked={unlockedIds.includes(ach.id)}
                    progress={getAchievementProgress(ach)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
