import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAchievements } from '../context/AchievementContext';
import { achievementCategories } from '../data/achievements';
import { Trophy, Lock, CheckCircle, Star, Sparkles, Compass } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const rarityStyles = {
  common: {
    badge: 'text-[#C5C9CC] bg-[#151B20] border-[#34302A]',
    border: 'border-[#D9A441]/40'
  },
  uncommon: {
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    border: 'border-emerald-500/40'
  },
  rare: {
    badge: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    border: 'border-sky-500/40'
  },
  epic: {
    badge: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    border: 'border-purple-500/40'
  },
  legendary: {
    badge: 'text-[#D9A441] bg-[#D9A441]/15 border-[#D9A441]/50',
    border: 'border-[#D9A441] shadow-[0_0_20px_rgba(217,164,65,0.2)]'
  }
};

const AchievementCard = ({ achievement, isUnlocked, progress, t }) => {
  const percentage = Math.min(100, Math.round((progress / Math.max(1, achievement.target)) * 100));
  const style = rarityStyles[achievement.rarity] || rarityStyles.common;

  const title = t(`achievements.${achievement.titleKey}`, achievement.title || achievement.id);
  const description = t(`achievements.${achievement.descKey}`, achievement.description || '');

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
        isUnlocked
          ? `bg-[#101519] ${style.border} hover:-translate-y-0.5`
          : 'bg-[#101519]/90 border-[#34302A] hover:border-[#D9A441]/30'
      }`}
    >
      <div>
        <div className="flex justify-between items-start gap-3 mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border shrink-0 ${
              isUnlocked
                ? 'bg-[#151B20] border-[#D9A441]/50 shadow-[0_0_15px_rgba(217,164,65,0.2)]'
                : 'bg-[#151B20] border-[#34302A] opacity-80'
            }`}
          >
            <span>{achievement.icon || '🏆'}</span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5">
              {isUnlocked ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle size={11} /> Unlocked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#151B20] text-[#C5C9CC] border border-[#34302A]">
                  <Lock size={11} /> Locked
                </span>
              )}
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${style.badge}`}
              >
                {t(`achievements.rarity.${achievement.rarity}`, achievement.rarity)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-[#D9A441]">
              <Star size={12} className="fill-[#D9A441]" />
              <span>+{achievement.reward} Legacy XP</span>
            </div>
          </div>
        </div>

        <h3
          className={`text-lg font-bold font-serif mb-1.5 ${
            isUnlocked ? 'text-[#F5F1E8]' : 'text-[#F5F1E8]/90'
          }`}
        >
          {title}
        </h3>
        <p className="text-sm text-[#C5C9CC] leading-relaxed mb-4">{description}</p>

        {!isUnlocked && achievement.unlockHint && (
          <div className="mb-4 p-2.5 rounded-xl bg-[#151B20] border border-[#34302A] text-xs text-[#C5C9CC] flex items-start gap-2">
            <Sparkles size={13} className="text-[#D9A441] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#D9A441]">How to unlock:</strong> {achievement.unlockHint}
            </span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#34302A]">
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-[#C5C9CC] uppercase tracking-wider">
            {t('achievements.progress', 'Progress')}
          </span>
          <span className={isUnlocked ? 'text-emerald-400' : 'text-[#D9A441]'}>
            {progress} / {achievement.target} ({percentage}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-[#090C0F] border border-[#34302A]">
          <div
            className={`h-full transition-all duration-700 rounded-full ${
              isUnlocked ? 'bg-emerald-500' : 'bg-[#D9A441]'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const AchievementsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { achievements, unlockedIds, getProgress } = useAchievements();
  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, unlocked, locked

  const totalCount = achievements.length;
  const unlockedCount = useMemo(
    () => achievements.filter(a => unlockedIds.includes(a.id)).length,
    [achievements, unlockedIds]
  );
  const completionPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const filteredAchievements = useMemo(() => {
    return achievements.filter(a => {
      const catMatch = activeCategory === 'all' || a.category === activeCategory;
      const isUnlocked = unlockedIds.includes(a.id);
      const statusMatch =
        statusFilter === 'all' ||
        (statusFilter === 'unlocked' && isUnlocked) ||
        (statusFilter === 'locked' && !isUnlocked);
      return catMatch && statusMatch;
    });
  }, [achievements, activeCategory, statusFilter, unlockedIds]);

  const categories = [
    { id: 'all', icon: '🏆', labelKey: 'categories.all', label: 'All Achievements' },
    ...achievementCategories
  ];

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Header Banner */}
      <header className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <BackButton />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy size={14} /> Hall of Milestones
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F1E8] mb-2">
              {t('achievements.title', 'Achievements & Milestones')}
            </h1>
            <p className="text-[#C5C9CC] text-sm md:text-base max-w-xl">
              {t(
                'achievements.subtitle',
                'Track your discoveries, architectural feats, solved challenges, and journey milestones across Indian history.'
              )}
            </p>
          </div>
        </div>

        {/* Summary Progress Card */}
        <div className="bg-[#151B20] border border-[#34302A] p-5 rounded-2xl flex items-center gap-5 shrink-0 min-w-[270px]">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#34302A]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#D9A441] transition-all duration-700 ease-out"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-[#D9A441]">
              {completionPercentage}%
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-serif text-[#F5F1E8]">
              {unlockedCount} <span className="text-[#C5C9CC] text-lg">/ {totalCount}</span>
            </div>
            <div className="text-xs text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">
              {t('achievements.unlocked', 'Achievements Unlocked')}
            </div>
          </div>
        </div>
      </header>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-stretch md:items-center bg-[#101519] border border-[#34302A] p-3 rounded-2xl">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441] shadow-md'
                  : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-[#D9A441]/50 hover:text-[#F5F1E8]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{t(`achievements.${cat.labelKey}`, cat.label || cat.id)}</span>
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-1.5 bg-[#090C0F] p-1 rounded-xl border border-[#34302A] self-start md:self-auto shrink-0">
          {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
            { id: 'locked', label: `Locked (${totalCount - unlockedCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === tab.id
                  ? 'bg-[#151B20] text-[#D9A441] border border-[#D9A441]/40'
                  : 'text-[#C5C9CC] hover:text-[#F5F1E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Achievement Grid */}
      {filteredAchievements.length === 0 ? (
        <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-12 text-center">
          <Trophy size={40} className="text-[#D9A441]/50 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-[#F5F1E8] mb-1">
            {statusFilter === 'unlocked'
              ? 'No achievements unlocked in this category yet'
              : 'No achievements match this filter'}
          </h3>
          <p className="text-sm text-[#C5C9CC] max-w-md mx-auto mb-5">
            Explore levels on the Journey Map, solve historical challenges, and construct buildings to unlock milestones and earn Legacy XP.
          </p>
          <div className="flex justify-center gap-3">
            {statusFilter !== 'all' && (
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-xs font-bold text-[#F5F1E8]"
              >
                Show All Achievements
              </button>
            )}
            <button
              onClick={() => navigate('/journey')}
              className="px-4 py-2 rounded-xl bg-[#D9A441] text-[#070A0C] text-xs font-bold flex items-center gap-1.5"
            >
              <Compass size={14} /> Continue Journey
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAchievements.map(ach => {
            const isUnlocked = unlockedIds.includes(ach.id);
            const progress = getProgress(ach);
            return (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                isUnlocked={isUnlocked}
                progress={progress}
                t={t}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
