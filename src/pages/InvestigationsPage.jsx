import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { artifactInvestigations } from '../data/artifactInvestigations';
import { Search, CheckCircle, Lock, ChevronRight, Star, Sparkles, Compass, Eye } from 'lucide-react';
import BackButton from '../components/common/BackButton';

const getSavedClueProgress = (invId) => {
  try {
    const raw = localStorage.getItem(`kalachakra_inv_clues_${invId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const InvestigationsPage = () => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const navigate = useNavigate();

  const unlockedLevels = gameState.unlockedLevels || [1];
  const currentLevel = gameState.currentLevel || 1;
  const completedInvestigations = gameState.completedInvestigations || [];
  const unlockedArtifacts = gameState.unlockedArtifacts || [];

  const summary = useMemo(() => {
    const total = artifactInvestigations.length;
    const completed = artifactInvestigations.filter(inv => completedInvestigations.includes(inv.id)).length;
    const available = artifactInvestigations.filter(
      inv =>
        unlockedLevels.includes(inv.levelId) ||
        currentLevel >= inv.levelId ||
        unlockedArtifacts.includes(inv.libraryId) ||
        completedInvestigations.includes(inv.id)
    ).length;
    return { total, completed, available };
  }, [unlockedLevels, currentLevel, completedInvestigations, unlockedArtifacts]);

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Header Banner */}
      <header className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <BackButton />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 text-[#D9A441] text-xs font-bold uppercase tracking-wider mb-3">
              <Search size={14} /> Archaeological Evidence Lab
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5F1E8] mb-2">
              {t('investigation.title', 'Artifact Investigations')}
            </h1>
            <p className="text-[#C5C9CC] text-sm md:text-base max-w-2xl">
              {t(
                'investigation.subtitle',
                'Examine primary historical artifacts closely, inspect physical clues, and separate verified archaeological evidence from speculation.'
              )}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 bg-[#151B20] border border-[#34302A] p-4 rounded-2xl shrink-0">
          <div className="text-center px-3">
            <div className="text-2xl font-serif font-bold text-[#D9A441]">{summary.completed}/{summary.total}</div>
            <div className="text-[11px] text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">Verified</div>
          </div>
          <div className="text-center px-3 border-x border-[#34302A]">
            <div className="text-2xl font-serif font-bold text-[#F5F1E8]">{summary.available}</div>
            <div className="text-[11px] text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">Unlocked</div>
          </div>
          <div className="text-center px-3">
            <div className="text-2xl font-serif font-bold text-emerald-400">{unlockedArtifacts.length}</div>
            <div className="text-[11px] text-[#C5C9CC] uppercase tracking-wider font-bold mt-0.5">Discoveries</div>
          </div>
        </div>
      </header>

      {/* Investigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifactInvestigations.map(inv => {
          const isCompleted = completedInvestigations.includes(inv.id);
          const isArtifactDiscovered = unlockedArtifacts.includes(inv.libraryId);
          const isUnlocked =
            unlockedLevels.includes(inv.levelId) ||
            currentLevel >= inv.levelId ||
            isArtifactDiscovered ||
            isCompleted;

          const savedClues = getSavedClueProgress(inv.id);
          const totalClues = inv.clues.length;
          const examinedCluesCount = isCompleted ? totalClues : Math.min(totalClues, savedClues.length);
          const progressPercent = isCompleted
            ? 100
            : Math.round((examinedCluesCount / Math.max(1, totalClues)) * 100);

          const title = t(inv.titleKey, inv.title);
          const description = t(inv.descKey, inv.description);

          return (
            <div
              key={inv.id}
              onClick={() => {
                if (isUnlocked) navigate(`/investigations/${inv.id}`);
              }}
              className={`rounded-2xl p-6 border flex flex-col justify-between transition-all relative overflow-hidden ${
                isUnlocked
                  ? 'bg-[#101519] border-[#34302A] hover:border-[#D9A441] cursor-pointer hover:-translate-y-1 shadow-lg group'
                  : 'bg-[#101519]/90 border-[#34302A]'
              }`}
            >
              <div>
                {/* Top Icon & Status Badge */}
                <div className="flex justify-between items-start gap-3 mb-5">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border shadow-inner shrink-0 ${
                      isUnlocked
                        ? 'bg-[#151B20] border-[#D9A441]/40'
                        : 'bg-[#151B20] border-[#34302A] opacity-80'
                    }`}
                  >
                    <span>{inv.icon}</span>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle size={13} /> {t('investigation.completed', 'Completed')}
                      </span>
                    ) : isUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D9A441] bg-[#D9A441]/15 px-3 py-1 rounded-full border border-[#D9A441]/40">
                        <Eye size={13} /> {t('investigation.available', 'Unlocked')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5C9CC] bg-[#151B20] px-3 py-1 rounded-full border border-[#34302A]">
                        <Lock size={13} /> Locked
                      </span>
                    )}

                    <span className="text-[11px] font-bold text-[#D9A441] flex items-center gap-1">
                      <Star size={12} className="fill-[#D9A441]" /> +{inv.rewards?.legacy || 30} Legacy XP
                    </span>
                  </div>
                </div>

                {/* Era & Region Metadata */}
                <div className="text-xs font-bold uppercase tracking-wider mb-1.5 text-[#D9A441]">
                  Level {inv.levelId}: {inv.levelName} • {inv.region}
                </div>
                <div className="text-[11px] text-[#C5C9CC] mb-3">{inv.period}</div>

                {/* Actual Title & Description */}
                <h2 className="text-xl font-bold font-serif mb-2 text-[#F5F1E8] group-hover:text-[#D9A441] transition-colors">
                  {title}
                </h2>
                <p className="text-sm text-[#C5C9CC] leading-relaxed mb-5">{description}</p>

                {/* Discovery & Evidence Progress */}
                <div className="p-3.5 rounded-xl bg-[#151B20] border border-[#34302A] mb-5 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[#C5C9CC]">Clues Examined</span>
                    <span className={isCompleted ? 'text-emerald-400' : 'text-[#D9A441]'}>
                      {examinedCluesCount} / {totalClues} Clues ({progressPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#090C0F] rounded-full overflow-hidden border border-[#34302A]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-[#D9A441]'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#34302A]/80">
                    <span className="text-[#C5C9CC]">Linked Artifact Status:</span>
                    <span className={isArtifactDiscovered ? 'text-emerald-400 font-bold' : 'text-[#C5C9CC]'}>
                      {isArtifactDiscovered ? 'Discovered in Archive' : 'Awaiting Discovery'}
                    </span>
                  </div>
                </div>

                {/* Clear Unlock Requirement when Locked */}
                {!isUnlocked && (
                  <div className="p-3 rounded-xl bg-[#090C0F] border border-[#D9A441]/30 mb-4 flex items-start gap-2.5 text-xs text-[#F5F1E8]">
                    <Sparkles size={14} className="text-[#D9A441] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#D9A441] block mb-0.5">Unlock Requirement</span>
                      <span className="text-[#C5C9CC]">
                        {inv.unlockRequirement} (Current Level: {currentLevel})
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Action */}
              <div className="pt-4 border-t border-[#34302A] flex items-center justify-between">
                {isUnlocked ? (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D9A441] group-hover:underline">
                      {isCompleted
                        ? t('investigation.review', 'Review Evidence')
                        : examinedCluesCount > 0
                        ? 'Continue Investigation'
                        : t('investigation.start', 'Start Investigation')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#151B20] border border-[#34302A] flex items-center justify-center group-hover:bg-[#D9A441] group-hover:text-[#070A0C] group-hover:border-[#D9A441] transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/journey');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#151B20] hover:bg-[#D9A441]/20 border border-[#34302A] hover:border-[#D9A441]/50 text-xs font-bold text-[#D9A441] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Compass size={14} /> Progress on Journey Map to Unlock
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestigationsPage;
