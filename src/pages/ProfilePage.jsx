import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { getDashboardStats } from '../services/dashboardService';
import { levelThemes } from '../data/levelThemes';
import { civilizationLevels } from '../data/civilizationLevels';
import { achievementsData } from '../data/achievements';
import { heritageLibrary } from '../data/heritageLibrary';
import { inventoryItems } from '../data/inventoryItems';
import { useBackground } from '../context/BackgroundContext';
import {
  User,
  Award,
  Compass,
  BookOpen,
  Star,
  Sparkles,
  CheckCircle,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  ShieldAlert,
  Play,
  HelpCircle,
  Edit2,
  Check,
  Heart,
  Zap,
  Landmark,
  Lock,
  ChevronRight,
  BarChart2,
  Clock,
  Box,
  Trophy,
  Activity
} from 'lucide-react';

const ProfilePage = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { setBgType } = useBackground();

  React.useEffect(() => {
    setBgType('profile');
  }, [setBgType]);

  const { gameState, loginUser, resetTutorial } = useGame();
  const { theme: appTheme, toggleTheme } = useTheme();
  const { settings: audioSettings, toggleMute } = useAudio();
  const navigate = useNavigate();

  const stats = useMemo(() => getDashboardStats(gameState), [gameState]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(gameState.name || gameState.playerName || 'Explorer');

  const handleSaveName = () => {
    if (nameInput.trim()) {
      loginUser({ ...gameState, name: nameInput.trim(), playerName: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  const pType = gameState.playerType || 'Explorer';
  const currentLevel = Math.min(gameState.currentLevel || 1, 14);
  const unlockedLevels = gameState.unlockedLevels || [1];
  const completedLevels = gameState.completedLevels || [];

  // Accurate XP & Milestone calculation
  const xp = gameState.legacy || 0;
  const nextLevelXp = stats.legacy?.nextMilestone || 500;
  const xpPercent = Math.min(Math.round((xp / Math.max(1, nextLevelXp)) * 100), 100);

  // Accurate counts matching configured data
  const totalAchievementsCount = achievementsData.length;
  const unlockedAchievementObjects = useMemo(() => {
    const ids = gameState.achievements || [];
    return achievementsData.filter(a => ids.includes(a.id));
  }, [gameState.achievements]);

  const unlockedArtifactsIds = gameState.unlockedArtifacts || [];
  const totalCatalogArtifacts = heritageLibrary.length;

  // Resolve collected items for preview
  const collectedPreviewItems = useMemo(() => {
    const list = [];
    const seen = new Set();

    unlockedArtifactsIds.forEach(id => {
      if (seen.has(id)) return;
      seen.add(id);
      const fromInv = inventoryItems.find(i => i.id === id);
      const fromLib = heritageLibrary.find(i => i.id === id);
      list.push({
        id,
        icon: fromInv?.icon || fromLib?.icon || '🏺',
        name:
          fromInv?.name ||
          t(`library.entry.${id}.title`, id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
      });
    });

    Object.entries(gameState.inventory || {}).forEach(([k, v]) => {
      if ((Number(v) || 0) <= 0 || seen.has(k)) return;
      if (['xp', 'knowledge', 'culture', 'legacy', 'energy', 'coins'].includes(k)) return;
      seen.add(k);
      const fromInv = inventoryItems.find(i => i.id === k);
      list.push({
        id: k,
        icon: fromInv?.icon || '📦',
        name: fromInv?.name || k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      });
    });

    return list;
  }, [unlockedArtifactsIds, gameState.inventory, t]);

  // Accurate Mastery Percentage
  const masteryPercentage = useMemo(() => {
    const levelPart = (completedLevels.length / 14) * 50;
    const artifactPart =
      (Math.min(unlockedArtifactsIds.length, totalCatalogArtifacts) /
        Math.max(1, totalCatalogArtifacts)) *
      25;
    const achPart =
      (unlockedAchievementObjects.length / Math.max(1, totalAchievementsCount)) * 25;
    return Math.min(100, Math.round(levelPart + artifactPart + achPart));
  }, [
    completedLevels.length,
    unlockedArtifactsIds.length,
    totalCatalogArtifacts,
    unlockedAchievementObjects.length,
    totalAchievementsCount
  ]);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' mins ago';
    return 'Just now';
  };

  const displayActivity = useMemo(() => {
    if (gameState.activityLog && gameState.activityLog.length > 0) {
      return gameState.activityLog.map(act => ({
        ...act,
        displayTitle: t(act.titleKey, act.titleKey),
        displayDesc: act.descKey ? t(act.descKey, act.descKey) : ''
      }));
    }
    return [
      {
        displayTitle: `Exploring Level ${currentLevel}: ${
          civilizationLevels.find(l => l.id === currentLevel)?.name || 'Early Human Communities'
        }`,
        type: 'EXPLORE',
        timestamp: gameState.lastLogin || Date.now()
      }
    ];
  }, [gameState.activityLog, gameState.lastLogin, currentLevel, t]);

  return (
    <div
      className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6 min-h-screen text-content animate-fade-in"
      style={{ backgroundColor: '#070A0C' }}
    >
      {/* 1. PROFILE HEADER BANNER */}
      <div
        className="w-full rounded-2xl relative overflow-hidden flex flex-col justify-end p-6 md:p-10 border border-gold/10 min-h-[260px]"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/backgrounds/login_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A0C] via-[#070A0C]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0C] via-transparent to-transparent" />

        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full lg:w-auto">
            {/* Circular Player Avatar */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#101519] border-2 border-[#D9A441] p-1 shadow-[0_0_25px_rgba(217,164,65,0.25)] shrink-0 relative">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#151B20] to-[#070A0C] flex items-center justify-center overflow-hidden">
                <User size={48} className="text-[#D9A441]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D9A441] text-[#070A0C] font-bold text-xs flex items-center justify-center border-2 border-[#070A0C]">
                {currentLevel}
              </div>
            </div>

            {/* Player Info */}
            <div className="space-y-2.5 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      className="text-2xl font-serif font-bold bg-[#101519] border border-[#D9A441] rounded-lg px-3 py-1 text-white outline-none w-52"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2 bg-[#D9A441] text-[#070A0C] rounded-lg hover:bg-[#D9A441]/90"
                    >
                      <Check size={18} />
                    </button>
                  </div>
                ) : (
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-white flex items-center gap-3 drop-shadow">
                    {gameState.name || gameState.playerName || 'Explorer'}
                    <button
                      onClick={() => setIsEditingName(true)}
                      aria-label="Edit player name"
                      className="text-[#C5C9CC] hover:text-[#D9A441] transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </h1>
                )}

                <span className="px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/40 text-[#D9A441] text-xs font-bold flex items-center gap-1.5">
                  <Compass size={12} /> {pType}
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="w-full sm:w-80 space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">Level {currentLevel}</span>
                  <span className="text-[#D9A441]">
                    {xp} / {nextLevelXp} Legacy XP
                  </span>
                </div>
                <div className="w-full h-2 bg-[#090C0F] rounded-full overflow-hidden border border-[#34302A]">
                  <div
                    className="h-full bg-gradient-to-r from-[#B77B2E] to-[#D9A441] rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg bg-[#101519]/90 border border-[#34302A] text-[11px] font-bold text-[#C5C9CC] flex items-center gap-1.5">
                  <User size={12} className="text-[#D9A441]" /> Age Group: {gameState.ageGroup || '12-14'}
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#101519]/90 border border-[#34302A] text-[11px] font-bold text-[#C5C9CC] flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#D9A441]" /> Style: {pType}
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#101519]/90 border border-[#34302A] text-[11px] font-bold text-[#C5C9CC] flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-emerald-400" /> {completedLevels.length}/14 Eras Completed
                </span>
              </div>
            </div>
          </div>

          {/* Right Quote */}
          <div className="hidden xl:flex flex-col items-end max-w-xs text-right pb-2">
            <p className="text-base font-serif italic text-[#D9A441]/90 drop-shadow leading-relaxed">
              "Every artifact discovered and structure built preserves the story of human civilization."
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT MAIN COLUMN (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* MY JOURNEY — ALL 14 LEVELS */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-5 pb-3 border-b border-[#34302A]">
              <div className="flex items-center gap-2.5">
                <Compass className="text-[#D9A441]" size={18} />
                <h2 className="text-base font-bold text-white">My Journey (14 Historical Eras)</h2>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-bold text-[#C5C9CC]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed ({completedLevels.length})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441]" /> Current (Level {currentLevel})
                </span>
                <button
                  onClick={() => navigate('/journey')}
                  className="text-[#D9A441] hover:underline flex items-center gap-1"
                >
                  Open Journey Map <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {civilizationLevels.map(lvl => {
                const isCompleted = completedLevels.includes(lvl.id);
                const isCurrent = currentLevel === lvl.id && !isCompleted;
                const isUnlocked =
                  unlockedLevels.includes(lvl.id) || currentLevel >= lvl.id || isCompleted;

                return (
                  <div
                    key={lvl.id}
                    onClick={() => {
                      if (isUnlocked) navigate(`/journey/level/${lvl.id}`);
                    }}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-[#151B20] border-[#D9A441] shadow-[0_0_15px_rgba(217,164,65,0.2)] cursor-pointer'
                        : isCompleted
                        ? 'bg-[#151B20]/90 border-emerald-500/40 hover:border-emerald-400 cursor-pointer'
                        : isUnlocked
                        ? 'bg-[#151B20]/80 border-[#34302A] hover:border-[#D9A441]/50 cursor-pointer'
                        : 'bg-[#090C0F]/70 border-[#34302A]/60 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          isCurrent
                            ? 'bg-[#D9A441] text-[#070A0C]'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-[#101519] text-[#C5C9CC]'
                        }`}
                      >
                        Level {lvl.id}
                      </span>
                      {isCompleted ? (
                        <CheckCircle size={15} className="text-emerald-400" />
                      ) : isCurrent ? (
                        <Play size={14} className="text-[#D9A441] fill-[#D9A441]" />
                      ) : !isUnlocked ? (
                        <Lock size={13} className="text-[#C5C9CC]/50" />
                      ) : null}
                    </div>

                    <div className="text-xs font-bold text-white leading-snug mb-1">
                      {lvl.name}
                    </div>
                    <div className="text-[10px] font-semibold text-[#C5C9CC]">
                      {isCompleted
                        ? 'Completed'
                        : isCurrent
                        ? 'In Progress'
                        : isUnlocked
                        ? 'Unlocked'
                        : 'Locked'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STATS & RESOURCES */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#34302A]">
              <BarChart2 className="text-[#D9A441]" size={18} />
              <h2 className="text-base font-bold text-white">Stats & Resources</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#151B20] border border-[#34302A] rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D96B62]/15 border border-[#D96B62]/30 flex items-center justify-center text-[#D96B62] shrink-0">
                  <Heart size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{gameState.energy ?? 100}</div>
                  <div className="text-xs text-[#C5C9CC]">Energy</div>
                </div>
              </div>

              <div className="bg-[#151B20] border border-[#34302A] rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{gameState.knowledge || 0}</div>
                  <div className="text-xs text-[#C5C9CC]">Knowledge</div>
                </div>
              </div>

              <div className="bg-[#151B20] border border-[#34302A] rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Landmark size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{gameState.culture || 0}</div>
                  <div className="text-xs text-[#C5C9CC]">Culture</div>
                </div>
              </div>

              <div className="bg-[#151B20] border border-[#34302A] rounded-xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D9A441]/15 border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441] shrink-0">
                  <Star size={20} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{gameState.legacy || 0}</div>
                  <div className="text-xs text-[#C5C9CC]">Legacy XP</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#34302A]">
              <div className="p-3 rounded-xl bg-[#090C0F] border border-[#34302A] text-center">
                <div className="text-xs text-[#C5C9CC] mb-1">Levels Completed</div>
                <div className="text-lg font-serif font-bold text-white">
                  {completedLevels.length} <span className="text-xs text-[#C5C9CC]">/ 14</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090C0F] border border-[#34302A] text-center">
                <div className="text-xs text-[#C5C9CC] mb-1">Overall Mastery</div>
                <div className="text-lg font-serif font-bold text-[#D9A441]">
                  {masteryPercentage}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090C0F] border border-[#34302A] text-center">
                <div className="text-xs text-[#C5C9CC] mb-1">Achievements</div>
                <div className="text-lg font-serif font-bold text-white">
                  {unlockedAchievementObjects.length}{' '}
                  <span className="text-xs text-[#C5C9CC]">/ {totalAchievementsCount}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#090C0F] border border-[#34302A] text-center">
                <div className="text-xs text-[#C5C9CC] mb-1">Discoveries & Items</div>
                <div className="text-lg font-serif font-bold text-white">
                  {collectedPreviewItems.length}
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#34302A]">
              <div className="flex items-center gap-2.5">
                <Clock className="text-[#D9A441]" size={18} />
                <h2 className="text-base font-bold text-white">Recent Activity</h2>
              </div>
            </div>

            <div className="space-y-2">
              {displayActivity.slice(0, 5).map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#151B20] border border-[#34302A]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#090C0F] border border-[#34302A] flex items-center justify-center text-[#D9A441] shrink-0">
                    {act.metadata?.icon ? (
                      <span>{act.metadata.icon}</span>
                    ) : act.type === 'ACHIEVEMENT' ? (
                      <Trophy size={15} />
                    ) : (
                      <Activity size={15} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{act.displayTitle}</div>
                    {act.displayDesc && (
                      <div className="text-[11px] text-[#C5C9CC] truncate">{act.displayDesc}</div>
                    )}
                  </div>
                  <div className="text-[11px] text-[#C5C9CC] shrink-0">
                    {formatTimeAgo(act.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* ACHIEVEMENTS SUMMARY CARD */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#34302A]">
              <div className="flex items-center gap-2">
                <Trophy className="text-[#D9A441]" size={18} />
                <h2 className="text-base font-bold text-white">
                  Achievements ({unlockedAchievementObjects.length}/{totalAchievementsCount})
                </h2>
              </div>
              <button
                onClick={() => navigate('/achievements')}
                className="text-xs font-bold text-[#D9A441] hover:underline"
              >
                View All →
              </button>
            </div>

            {unlockedAchievementObjects.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#151B20] border border-[#34302A] text-center space-y-2">
                <Trophy size={26} className="text-[#D9A441]/50 mx-auto" />
                <p className="text-xs text-[#C5C9CC]">
                  Complete levels, discover artifacts, or construct buildings to unlock your first achievement badge.
                </p>
                <button
                  onClick={() => navigate('/achievements')}
                  className="text-xs font-bold text-[#D9A441] hover:underline pt-1 inline-block"
                >
                  Browse All {totalAchievementsCount} Milestones →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {unlockedAchievementObjects.slice(0, 4).map(ach => (
                  <div
                    key={ach.id}
                    onClick={() => navigate('/achievements')}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441]/50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#090C0F] border border-[#D9A441]/40 flex items-center justify-center text-xl shrink-0">
                      {ach.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {t(`achievements.${ach.titleKey}`, ach.title)}
                      </div>
                      <div className="text-[11px] text-[#C5C9CC] truncate">
                        {t(`achievements.${ach.descKey}`, ach.description)}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#D9A441] shrink-0">
                      +{ach.reward} XP
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COLLECTION PREVIEW CARD */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#34302A]">
              <div className="flex items-center gap-2">
                <Box className="text-[#D9A441]" size={18} />
                <h2 className="text-base font-bold text-white">
                  Collection ({collectedPreviewItems.length})
                </h2>
              </div>
              <button
                onClick={() => navigate('/inventory')}
                className="text-xs font-bold text-[#D9A441] hover:underline"
              >
                Open Inventory →
              </button>
            </div>

            {collectedPreviewItems.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#151B20] border border-[#34302A] text-center space-y-2">
                <Box size={26} className="text-[#D9A441]/50 mx-auto" />
                <p className="text-xs text-[#C5C9CC]">
                  No items collected yet. Explore historical sites or forage in the Builder to collect items.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {collectedPreviewItems.slice(0, 6).map(item => (
                  <div
                    key={item.id}
                    onClick={() => navigate('/inventory')}
                    className="p-3 rounded-xl bg-[#151B20] border border-[#34302A] hover:border-[#D9A441]/50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="text-xs font-bold text-white truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QUICK PREFERENCES CARD */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#34302A]">
              <h2 className="text-base font-bold text-white">Quick Preferences</h2>
              <button
                onClick={() => navigate('/settings')}
                className="text-xs font-bold text-[#D9A441] hover:underline"
              >
                All Settings →
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C5C9CC] font-bold">Audio Effects</span>
              <button
                onClick={toggleMute}
                className="px-3 py-1.5 rounded-lg bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-white font-bold flex items-center gap-1.5"
              >
                {audioSettings.muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{audioSettings.muted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C5C9CC] font-bold">Language</span>
              <div className="flex gap-1.5">
                {[
                  { id: 'en', label: 'EN' },
                  { id: 'hi', label: 'हिं' },
                  { id: 'te', label: 'తె' }
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => changeLanguage(lang.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold border ${
                      language === lang.id
                        ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441]'
                        : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#34302A] flex justify-between items-center text-xs">
              <span className="text-[#C5C9CC] font-bold">Guided Tutorial</span>
              <button
                onClick={() => {
                  resetTutorial();
                  navigate('/dashboard');
                }}
                className="text-[#D9A441] font-bold hover:underline flex items-center gap-1"
              >
                <HelpCircle size={13} /> Replay Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
