import React, { useMemo, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { questData } from '../data/quests';
import { levelThemes } from '../data/levelThemes';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { Target, CheckCircle2, Lock, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import QuestGameplay from '../components/quests/QuestGameplay';
import { useBackground } from '../context/BackgroundContext';

const QuestsPage = () => {
  const { t } = useLanguage();
  const { gameState, startQuest, completeQuestDirectly } = useGame();
  const { setBgType } = useBackground();

  React.useEffect(() => {
    setBgType('quests');
  }, [setBgType]);

  const { theme } = useTheme();
  const { playSound } = useAudio();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  // activeQuest: the quest object currently being played; null = show list
  const [activeQuest, setActiveQuest] = useState(null);
  // completionResult: shown briefly when quest finishes
  const [completionResult, setCompletionResult] = useState(null);

  const currentLevel = gameState.currentLevel || 1;
  const userQuests = gameState.quests || {};
  const unlockedLevels = gameState.unlockedLevels || [1];

  const filteredQuests = useMemo(() => {
    return questData.filter(q => {
      const state = userQuests[q.id];
      const status = state?.status || (unlockedLevels.includes(q.levelId) || q.levelId === null ? 'available' : 'locked');
      if (filter === 'active' && status !== 'in_progress') return false;
      if (filter === 'completed' && status !== 'completed') return false;
      if (filter === 'available' && status !== 'available') return false;
      return true;
    }).sort((a, b) => {
      if (a.levelId === currentLevel && b.levelId !== currentLevel) return -1;
      if (a.levelId !== currentLevel && b.levelId === currentLevel) return 1;
      return (a.levelId || 99) - (b.levelId || 99);
    });
  }, [userQuests, filter, currentLevel, unlockedLevels]);

  // Handle Accept Quest → open gameplay
  const handleAccept = useCallback((quest) => {
    startQuest(quest.id);
    setActiveQuest(quest);
    playSound?.('ui');
  }, [startQuest, playSound]);

  // Handle Continue Quest → also open gameplay
  const handleContinue = useCallback((quest) => {
    setActiveQuest(quest);
    playSound?.('ui');
  }, [playSound]);

  // Called by QuestGameplay when the session ends
  const handleQuestComplete = useCallback(({ correct, total, accuracy, earnedLegacy, mastery }) => {
    if (!activeQuest) return;
    playSound?.('quest');
    completeQuestDirectly(activeQuest, { earnedLegacy, accuracy, mastery });
    setCompletionResult({ correct, total, accuracy, earnedLegacy, mastery, quest: activeQuest });
    setActiveQuest(null);
  }, [activeQuest, completeQuestDirectly, playSound]);

  const handleCloseGameplay = useCallback(() => {
    setActiveQuest(null);
  }, []);

  const handleDismissResult = useCallback(() => {
    setCompletionResult(null);
  }, []);

  /* ─── QUEST GAMEPLAY VIEW ─── */
  if (activeQuest) {
    return (
      <div className="pb-20 max-w-3xl mx-auto">
        <QuestGameplay
          quest={activeQuest}
          onComplete={handleQuestComplete}
          onClose={handleCloseGameplay}
        />
      </div>
    );
  }

  /* ─── COMPLETION TOAST / SUMMARY ─── */
  const CompletionBanner = completionResult && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleDismissResult}>
      <div
        className="bg-surface border border-gold/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in fade-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🏆</div>
        <h3 className="text-2xl font-serif font-bold text-gold mb-1">Quest Complete!</h3>
        <p className="text-content/70 text-sm mb-4">{completionResult.quest?.id?.replace(/_/g,' ')}</p>
        <div className="flex justify-center gap-2 mb-4">
          {[1,2,3].map(s => (
            <Star key={s} size={28} className={s <= completionResult.mastery ? 'text-gold fill-gold' : 'text-content/20'} />
          ))}
        </div>
        <div className="text-gold font-bold text-xl mb-1">+{completionResult.earnedLegacy} Legacy</div>
        <div className="text-content/60 text-sm mb-6">{completionResult.correct}/{completionResult.total} correct · {completionResult.accuracy}% accuracy</div>
        <button onClick={handleDismissResult}
          className="px-8 py-3 bg-gold text-main font-bold rounded-xl hover:scale-105 transition-transform">
          Claim Rewards
        </button>
      </div>
    </div>
  );

  /* ─── QUEST LIST VIEW ─── */
  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {CompletionBanner}

      <header className="flex items-center gap-6 mb-8">
        <BackButton />
        <div className="flex-1">
          <div>
            <div className="w-14 h-14 bg-gradient-to-br from-gold to-terracotta rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-gold/20">
              <Target size={28} className="text-main" />
            </div>
            <h1 className="text-3xl font-serif font-bold gold-gradient-text mb-2">{t('quest.title', 'Quest Board')}</h1>
            <p className="text-content/70 text-sm max-w-xl">{t('quest.subtitle', 'Follow the kalachakra journey through meaningful missions.')}</p>
          </div>
        </div>
      </header>

      <div className="flex gap-2 border-b border-content/10 pb-4 overflow-x-auto no-scrollbar">
        {['all', 'available', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${filter === f ? 'bg-gold text-main' : 'bg-surface text-content/60 hover:text-content'}`}
          >
            {t(`quest.filter_${f}`, f)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuests.map(q => {
          const state = userQuests[q.id];
          const isUnlocked = q.levelId === null || unlockedLevels.includes(q.levelId);
          const status = state?.status || (isUnlocked ? 'available' : 'locked');
          const levelThemeData = levelThemes[q.levelId] || levelThemes[1];

          if (status === 'locked') {
            return (
              <div key={q.id} className="rounded-2xl p-6 flex gap-4 items-center opacity-50 grayscale border border-content/10 bg-surface">
                <div className="w-12 h-12 rounded-xl bg-main border border-content/20 flex items-center justify-center shrink-0">
                  <Lock className="text-content/30" />
                </div>
                <div>
                  <h3 className="font-bold text-content">{t('quest.locked', 'Unknown Quest')}</h3>
                  <p className="text-xs text-content/60">{t('library.lockedDesc', 'Discover more in Level')} {q.levelId}</p>
                </div>
              </div>
            );
          }

          return (
            <div key={q.id} className={`rounded-2xl p-6 border relative overflow-hidden flex flex-col ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface/80'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider ${q.type === 'main' ? 'bg-gold text-main shadow-md shadow-gold/20' : 'bg-surface border border-content/20 text-content'}`}>
                    {t(`quest.type_${q.type}`, q.type)}
                  </span>
                  {q.levelId && <span className="text-[10px] uppercase font-bold text-content/50">Level {q.levelId}</span>}
                </div>
                {status === 'completed' && (
                  <div className="flex items-center gap-1">
                    {state?.stars && [1,2,3].map(s => (
                      <Star key={s} size={12} className={s <= state.stars ? 'text-gold fill-gold' : 'text-content/20'} />
                    ))}
                    <CheckCircle2 className="text-emerald-500 ml-1" size={18} />
                  </div>
                )}
              </div>

              <h3 className={`font-bold font-serif text-xl mb-1 ${levelThemeData.text}`}>{t(q.titleKey, q.id)}</h3>
              <p className="text-sm text-content/70 mb-6">{t(q.descKey, 'Quest description')}</p>

              <div className="space-y-3 mb-6 flex-1">
                {q.objectives.map((obj, idx) => {
                  const prog = state?.progress?.[idx] || 0;
                  const isObjDone = prog >= obj.required;
                  return (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${isObjDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-surface border-content/20'}`}>
                        {isObjDone && <CheckCircle2 size={12} />}
                      </div>
                      <div className="text-sm font-medium text-content/90 flex-1">{t(obj.labelKey, 'Objective')}</div>
                      <div className="text-xs font-bold text-content/50">{prog} / {obj.required}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-content/10">
                <div className="flex items-center gap-3">
                  {q.rewards.legacy && (
                    <span className="text-xs font-bold text-gold flex items-center gap-1"><Star size={12}/> {q.rewards.legacy}</span>
                  )}
                  {q.rewards.inventory && (
                    <span className="text-xs font-bold text-content/70">🎒 +Item</span>
                  )}
                </div>

                {status === 'available' && (
                  <button
                    onClick={() => handleAccept(q)}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-gold text-main hover:scale-105 transition-transform"
                  >
                    {t('quest.accept', 'Accept Quest')}
                  </button>
                )}
                {status === 'in_progress' && (
                  <button
                    onClick={() => handleContinue(q)}
                    className="px-4 py-2 rounded-lg text-xs font-bold border border-gold text-gold hover:bg-gold hover:text-main transition-colors"
                  >
                    {t('quest.continue', 'Continue')}
                  </button>
                )}
                {status === 'completed' && (
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    <Trophy size={12} /> Completed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredQuests.length === 0 && (
        <div className="py-12 text-center text-content/50 border border-content/10 border-dashed rounded-2xl bg-surface/30">
          {t('quest.no_quests', 'No quests found for this filter.')}
        </div>
      )}
    </div>
  );
};

export default QuestsPage;
