import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { questData } from '../data/quests';
import QuestGameplay from '../components/quests/QuestGameplay';
import {
  Target,
  CheckCircle,
  Circle,
  Compass,
  Award,
  Star,
  Lock,
  Play,
  ArrowRight,
  Sparkles,
  Package
} from 'lucide-react';
import BackButton from '../components/common/BackButton';

const computeObjectiveCurrent = (obj, stateQ, gameState, idx, levelId) => {
  if (stateQ?.status === 'completed') return obj.required;
  const savedVal = stateQ?.progress?.[idx] || 0;

  const unlockedArtifacts = gameState?.unlockedArtifacts || [];
  const completedInvestigations = gameState?.completedInvestigations || [];
  const completedChallenges = gameState?.completedChallenges || [];
  const miniGameResults = gameState?.miniGameResults || {};
  const builtEnv = gameState?.builtEnvironment || {};
  const levelBuilt = builtEnv[levelId] || [];
  const allBuiltIds = Object.values(builtEnv)
    .flat()
    .map(b => b.buildingId);
  const activeBuilt = gameState?.activeLevelState?.builtItems || [];
  const directBuildings = gameState?.buildings || [];

  let liveVal = 0;

  if (obj.type === 'explore' || obj.type === 'discover') {
    if (
      unlockedArtifacts.includes(obj.target) ||
      (gameState?.activeLevelState?.exploration || []).includes(obj.target) ||
      (gameState?.activeLevelState?.discovery || []).includes(obj.target)
    ) {
      liveVal = obj.required;
    }
  } else if (obj.type === 'build') {
    const matchingCount =
      allBuiltIds.filter(id => id === obj.target || id.startsWith(`${obj.target}_`)).length +
      activeBuilt.filter(id => id === obj.target || id.startsWith(`${obj.target}_`)).length +
      directBuildings.filter(id => id === obj.target || id.startsWith(`${obj.target}_`)).length;

    if (matchingCount > 0) {
      liveVal = Math.min(obj.required, matchingCount);
    } else if (levelBuilt.length >= obj.required) {
      liveVal = obj.required;
    }
  } else if (obj.type === 'investigate') {
    if (completedInvestigations.includes(obj.target)) {
      liveVal = obj.required;
    }
  } else if (obj.type === 'solve') {
    if (completedChallenges.includes(obj.target)) {
      liveVal = obj.required;
    }
  } else if (obj.type === 'minigame') {
    if (miniGameResults[obj.target]) {
      liveVal = obj.required;
    }
  } else if (obj.type === 'minigame_stars') {
    const hasStars = Object.values(miniGameResults).some(r => (r?.stars || 0) >= obj.target);
    if (hasStars) {
      liveVal = obj.required;
    }
  }

  return Math.min(obj.required, Math.max(savedVal, liveVal));
};

const formatRewardItemName = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const QuestsPage = () => {
  const { t } = useLanguage();
  const { gameState, startQuest, completeQuestDirectly, logActivity, notify } = useGame();
  const navigate = useNavigate();

  const [filter, setFilter] = useState('all'); // 'all', 'available', 'in_progress', 'completed'
  const [activeGameplayQuest, setActiveGameplayQuest] = useState(null);

  const currentLevel = gameState.currentLevel || 1;
  const unlockedLevels = gameState.unlockedLevels || [1];
  const questsState = gameState.quests || {};

  const questsWithStatus = useMemo(() => {
    return questData.map(q => {
      const stateQ = questsState[q.id];
      const isLevelUnlocked =
        q.levelId <= currentLevel ||
        unlockedLevels.includes(q.levelId) ||
        (gameState.completedLevels || []).includes(q.levelId);

      let status = 'locked';
      if (stateQ?.status === 'completed') {
        status = 'completed';
      } else if (stateQ?.status === 'in_progress') {
        status = 'in_progress';
      } else if (isLevelUnlocked) {
        status = 'available';
      }

      const objectivesWithProg = q.objectives.map((obj, idx) => {
        const current = computeObjectiveCurrent(obj, stateQ, gameState, idx, q.levelId);
        return {
          ...obj,
          current,
          isDone: current >= obj.required
        };
      });

      const allObjectivesMet =
        objectivesWithProg.length > 0 && objectivesWithProg.every(o => o.isDone);

      return {
        ...q,
        status,
        stateQ,
        objectivesWithProg,
        allObjectivesMet
      };
    });
  }, [questsState, currentLevel, unlockedLevels, gameState]);

  const counts = useMemo(() => {
    return {
      all: questsWithStatus.length,
      available: questsWithStatus.filter(q => q.status === 'available').length,
      in_progress: questsWithStatus.filter(q => q.status === 'in_progress').length,
      completed: questsWithStatus.filter(q => q.status === 'completed').length
    };
  }, [questsWithStatus]);

  const filteredQuests = useMemo(() => {
    return questsWithStatus.filter(q => {
      if (filter === 'all') return true;
      return q.status === filter;
    });
  }, [questsWithStatus, filter]);

  const handleAcceptQuest = (quest) => {
    startQuest(quest.id);
    logActivity('QUEST', quest.title || quest.titleKey, 'Accepted quest on the Quest Board.', {
      icon: '🎯'
    });
    notify('SYSTEM', quest.title || quest.titleKey, 'Quest is now Active! Complete objectives or verify your knowledge.', {
      icon: '🎯',
      route: '/quests'
    });
  };

  const handleStartQuiz = (quest) => {
    if (quest.status !== 'completed' && quest.status !== 'in_progress') {
      startQuest(quest.id);
    }
    setActiveGameplayQuest(quest);
  };

  const handleClaimObjectiveCompletion = (quest) => {
    const baseLegacy = quest.rewards?.legacy || 40;
    completeQuestDirectly(quest, {
      earnedLegacy: baseLegacy,
      accuracy: 100,
      mastery: 3
    });
    logActivity('QUEST_COMPLETE', quest.title || quest.titleKey, 'Completed all quest objectives!', {
      icon: '🏆'
    });
    notify('QUEST_COMPLETE', quest.title || quest.titleKey, `Earned +${baseLegacy} Legacy XP!`, {
      icon: '🏆',
      reward: baseLegacy
    });
  };

  const handleQuestComplete = ({ earnedLegacy, accuracy, mastery }) => {
    if (activeGameplayQuest) {
      completeQuestDirectly(activeGameplayQuest, { earnedLegacy, accuracy, mastery });
      logActivity(
        'QUEST_COMPLETE',
        activeGameplayQuest.title || activeGameplayQuest.titleKey,
        `Completed quest with ${accuracy}% accuracy.`,
        { icon: '🏆' }
      );
    }
    setActiveGameplayQuest(null);
  };

  // Render interactive MCQ screen when active
  if (activeGameplayQuest) {
    return (
      <div className="max-w-3xl mx-auto py-8 pb-20 px-4">
        <QuestGameplay
          quest={activeGameplayQuest}
          onComplete={handleQuestComplete}
          onClose={() => setActiveGameplayQuest(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Header Banner */}
      <header className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <BackButton />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold uppercase tracking-wider mb-3">
              <Target size={14} /> Royal Chronicles & Missions
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F1E8] mb-2">
              {t('quest.title', 'Quest Board')}
            </h1>
            <p className="text-[#C5C9CC] text-sm md:text-base max-w-2xl">
              {t(
                'quest.subtitle',
                'Accept historical missions across all 14 eras, complete in-world building and discovery objectives, or test your historical mastery.'
              )}
            </p>
          </div>
        </div>

        {/* Summary Counters */}
        <div className="grid grid-cols-3 gap-3 bg-[#151B20] border border-[#34302A] p-4 rounded-2xl shrink-0">
          <div className="text-center px-3">
            <div className="text-2xl font-serif font-bold text-[#D9A441]">{counts.available}</div>
            <div className="text-[11px] text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">Available</div>
          </div>
          <div className="text-center px-3 border-x border-[#34302A]">
            <div className="text-2xl font-serif font-bold text-amber-400">{counts.in_progress}</div>
            <div className="text-[11px] text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">Active</div>
          </div>
          <div className="text-center px-3">
            <div className="text-2xl font-serif font-bold text-emerald-400">{counts.completed}</div>
            <div className="text-[11px] text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">Completed</div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 bg-[#101519] border border-[#34302A] p-2.5 rounded-2xl">
        {[
          { id: 'all', label: `${t('quest.filter.all', 'All Quests')} (${counts.all})` },
          { id: 'available', label: `${t('quest.filter.available', 'Available')} (${counts.available})` },
          { id: 'in_progress', label: `${t('quest.filter.active', 'Active')} (${counts.in_progress})` },
          { id: 'completed', label: `${t('quest.filter.completed', 'Completed')} (${counts.completed})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition-all border ${
              filter === tab.id
                ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441] shadow-md'
                : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-[#D9A441]/50 hover:text-[#F5F1E8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quest Cards Grid */}
      {filteredQuests.length === 0 ? (
        <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-12 text-center">
          <Compass size={42} className="mx-auto mb-3 text-[#D9A441]/50" />
          <h3 className="text-lg font-serif font-bold text-[#F5F1E8] mb-1">
            {filter === 'in_progress'
              ? 'No Active Quests Right Now'
              : filter === 'completed'
              ? 'No Completed Quests Yet'
              : 'No Quests Match This Filter'}
          </h3>
          <p className="text-sm text-[#C5C9CC] max-w-md mx-auto mb-5">
            {filter === 'in_progress'
              ? 'Switch to the Available tab and click "Accept Quest" on any unlocked mission to start tracking its objectives.'
              : 'Accept an available quest or advance through the Journey Map to unlock more historical missions.'}
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="px-5 py-2.5 rounded-xl bg-[#D9A441] text-[#070A0C] font-bold text-xs"
            >
              Show All Quests
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuests.map(q => {
            const isLocked = q.status === 'locked';
            const isCompleted = q.status === 'completed';
            const isInProgress = q.status === 'in_progress';
            const isAvailable = q.status === 'available';

            const title = t(q.titleKey, q.title || q.id);
            const description = t(q.descKey, q.description || '');
            const hint = t(q.hintKey, q.hint || '');
            const primaryRoute =
              q.objectivesWithProg?.[0]?.route || `/journey/level/${q.levelId}`;

            return (
              <div
                key={q.id}
                className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                  isInProgress
                    ? 'bg-[#101519] border-[#D9A441] shadow-[0_0_20px_rgba(217,164,65,0.12)]'
                    : isCompleted
                    ? 'bg-[#101519] border-emerald-500/40'
                    : isAvailable
                    ? 'bg-[#101519] border-[#34302A] hover:border-[#D9A441]/50'
                    : 'bg-[#101519]/90 border-[#34302A]'
                }`}
              >
                <div>
                  {/* Card Header: Level & Status */}
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#151B20] border border-[#34302A] text-[#D9A441]">
                        Level {q.levelId}: {q.levelName}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#151B20] border border-[#34302A] text-[#C5C9CC]">
                        {q.type === 'main'
                          ? t('quest.type.main', 'Main Quest')
                          : t('quest.type.side', 'Side Quest')}
                      </span>
                    </div>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 shrink-0">
                        <Award size={13} /> {t('quest.completed', 'Completed')}
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] bg-[#D9A441]/15 px-3 py-1 rounded-full border border-[#D9A441]/40 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse" />
                        {t('quest.active', 'Active')}
                      </span>
                    )}
                    {isAvailable && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 bg-sky-500/15 px-3 py-1 rounded-full border border-sky-500/30 shrink-0">
                        Available
                      </span>
                    )}
                    {isLocked && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C5C9CC] bg-[#151B20] px-3 py-1 rounded-full border border-[#34302A] shrink-0">
                        <Lock size={12} /> Locked
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl font-bold font-serif mb-2 text-[#F5F1E8]">{title}</h2>
                  <p className="text-sm text-[#C5C9CC] leading-relaxed mb-4">{description}</p>

                  {/* Objectives List */}
                  <div className="space-y-2 mb-4 bg-[#151B20] p-4 rounded-xl border border-[#34302A]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C5C9CC] mb-2">
                      {t('quest.objectives', 'Quest Objectives')}
                    </div>
                    {q.objectivesWithProg.map((obj, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!isLocked && obj.route) navigate(obj.route);
                        }}
                        className={`flex items-center justify-between text-xs gap-2 p-2 rounded-lg transition-colors ${
                          !isLocked && obj.route
                            ? 'hover:bg-[#101519] cursor-pointer'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {obj.isDone ? (
                            <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                          ) : (
                            <Circle size={15} className="text-[#D9A441]/60 shrink-0" />
                          )}
                          <span
                            className={
                              obj.isDone
                                ? 'line-through text-[#C5C9CC]/60'
                                : 'text-[#F5F1E8] font-medium'
                            }
                          >
                            {t(obj.labelKey, obj.label || 'Objective')}
                          </span>
                        </div>
                        <span
                          className={`font-mono font-bold shrink-0 ${
                            obj.isDone ? 'text-emerald-400' : 'text-[#D9A441]'
                          }`}
                        >
                          {obj.current} / {obj.required}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Active Quest Hint */}
                  {isInProgress && hint && (
                    <div className="text-xs text-[#C5C9CC] bg-[#090C0F] p-3 rounded-xl mb-4 border border-[#34302A] flex items-start gap-2">
                      <Sparkles size={14} className="text-[#D9A441] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#D9A441]">{t('common.hint', 'Hint')}:</strong> {hint}
                      </span>
                    </div>
                  )}

                  {/* Locked Requirement Banner */}
                  {isLocked && (
                    <div className="text-xs text-[#C5C9CC] bg-[#090C0F] p-3 rounded-xl mb-4 border border-[#34302A] flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5">
                        <Lock size={13} className="text-[#D9A441] shrink-0" />
                        <span>
                          Unlocks in <strong className="text-[#F5F1E8]">Level {q.levelId}: {q.levelName}</strong>
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => navigate('/journey')}
                        className="text-[#D9A441] font-bold hover:underline shrink-0"
                      >
                        Journey Map →
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Footer: Rewards & Actions */}
                <div className="pt-4 border-t border-[#34302A] flex flex-col gap-3">
                  {/* Rewards Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5C9CC]">
                      {t('quest.rewards', 'Rewards')}:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {q.rewards?.legacy && (
                        <span className="text-xs font-bold text-[#D9A441] flex items-center gap-1 bg-[#151B20] px-2.5 py-1 rounded-lg border border-[#34302A]">
                          <Star size={12} className="fill-[#D9A441]" /> +{q.rewards.legacy} Legacy XP
                        </span>
                      )}
                      {q.rewards?.inventory &&
                        Object.entries(q.rewards.inventory).map(([itemKey, qty]) => (
                          <span
                            key={itemKey}
                            className="text-xs font-medium text-[#F5F1E8] flex items-center gap-1 bg-[#151B20] px-2.5 py-1 rounded-lg border border-[#34302A]"
                          >
                            <Package size={11} className="text-[#D9A441]" /> +{qty}{' '}
                            {formatRewardItemName(itemKey)}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Single Clear Action Set Based on Quest Status */}
                  {isAvailable && (
                    <div className="flex gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAcceptQuest(q)}
                        className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-[#D9A441] text-[#070A0C] shadow-md hover:bg-[#D9A441]/90 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Target size={14} /> {t('quest.accept', 'Accept Quest')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartQuiz(q)}
                        className="py-2.5 px-4 rounded-xl font-bold text-xs bg-[#151B20] text-[#D9A441] border border-[#D9A441]/40 hover:bg-[#D9A441]/15 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Play size={13} /> Quick Quiz
                      </button>
                    </div>
                  )}

                  {isInProgress && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {q.allObjectivesMet ? (
                        <button
                          type="button"
                          onClick={() => handleClaimObjectiveCompletion(q)}
                          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 text-[#070A0C] shadow-md hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Award size={15} /> Claim Quest Reward
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => navigate(primaryRoute)}
                            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-[#151B20] text-[#F5F1E8] border border-[#34302A] hover:border-[#D9A441] transition-colors flex items-center justify-center gap-1.5"
                          >
                            <span>Go to Objective</span>
                            <ArrowRight size={13} className="text-[#D9A441]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartQuiz(q)}
                            className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-[#D9A441] text-[#070A0C] shadow-md hover:bg-[#D9A441]/90 transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Play size={13} /> Verify Knowledge (Quiz)
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {isCompleted && (
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map(s => (
                          <Star
                            key={s}
                            size={15}
                            className={
                              s <= (q.stateQ?.stars || 3)
                                ? 'text-[#D9A441] fill-[#D9A441]'
                                : 'text-[#34302A]'
                            }
                          />
                        ))}
                        <span className="text-xs text-emerald-400 font-bold ml-1.5">
                          Rewards Claimed
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleStartQuiz(q)}
                        className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-[#151B20] text-[#C5C9CC] border border-[#34302A] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                      >
                        Practice Quiz Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestsPage;
