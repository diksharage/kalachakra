import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { artifactInvestigations } from '../data/artifactInvestigations';
import { certaintyLevels } from '../data/heritageLibrary';
import {
  ArrowLeft,
  Search,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
  ShieldAlert,
  HelpCircle,
  Star
} from 'lucide-react';

const InvestigationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { gameState, completeInvestigation, logActivity } = useGame();

  const investigation = artifactInvestigations.find(inv => inv.id === id);

  const [inspectedClues, setInspectedClues] = useState([]);
  const [activeClue, setActiveClue] = useState(null);
  const [selectedClaims, setSelectedClaims] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isAlreadyCompleted = (gameState.completedInvestigations || []).includes(id);

  useEffect(() => {
    if (!investigation) {
      navigate('/investigations');
      return;
    }

    if (isAlreadyCompleted) {
      const allClueIds = investigation.clues.map(c => c.id);
      setInspectedClues(allClueIds);
      setSelectedClaims(investigation.claims.filter(c => c.isCorrect).map(c => c.id));
      setSubmitted(true);
      setIsSuccess(true);
      try {
        localStorage.setItem(`kalachakra_inv_clues_${investigation.id}`, JSON.stringify(allClueIds));
      } catch {
        // Ignore storage error
      }
    } else {
      try {
        const saved = localStorage.getItem(`kalachakra_inv_clues_${investigation.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setInspectedClues(parsed);
          }
        }
      } catch {
        // Ignore storage error
      }
    }
  }, [investigation, isAlreadyCompleted, navigate]);

  if (!investigation) return null;

  const allCluesFound = inspectedClues.length === investigation.clues.length;

  const handleClueClick = (clue) => {
    setActiveClue(clue);
    if (!inspectedClues.includes(clue.id)) {
      const next = [...inspectedClues, clue.id];
      setInspectedClues(next);
      try {
        localStorage.setItem(`kalachakra_inv_clues_${investigation.id}`, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
    }
  };

  const toggleClaim = (claimId) => {
    if (submitted && isSuccess) return;
    setSubmitted(false);
    if (selectedClaims.includes(claimId)) {
      setSelectedClaims(prev => prev.filter(c => c !== claimId));
    } else {
      setSelectedClaims(prev => [...prev, claimId]);
    }
  };

  const handleVerify = () => {
    setSubmitted(true);
    const correctIds = investigation.claims.filter(c => c.isCorrect).map(c => c.id);
    const isExactMatch =
      selectedClaims.length === correctIds.length &&
      selectedClaims.every(cid => correctIds.includes(cid));

    if (isExactMatch) {
      setIsSuccess(true);
      if (!isAlreadyCompleted) {
        completeInvestigation(investigation.id, {
          ...investigation.rewards,
          libraryId: investigation.libraryId
        });
        logActivity(
          'INVESTIGATION',
          investigation.title || investigation.titleKey,
          'Completed primary evidence verification.',
          { icon: investigation.icon }
        );
      }
    } else {
      setIsSuccess(false);
    }
  };

  const getCertaintyBadge = (certId) => {
    const cert = certaintyLevels.find(c => c.id === certId);
    if (!cert) return null;
    return (
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#090C0F] border border-[#34302A] ${cert.color}`}
      >
        <ShieldAlert size={11} />
        {t(cert.labelKey, cert.id.replace(/_/g, ' '))}
      </span>
    );
  };

  const title = t(investigation.titleKey, investigation.title);
  const description = t(investigation.descKey, investigation.description);

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-6 p-4 md:p-6 text-[#F5F1E8] animate-fade-in">
      {/* Top Bar */}
      <button
        onClick={() => navigate('/investigations')}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#C5C9CC] hover:text-[#D9A441] transition-colors bg-[#101519] border border-[#34302A] px-4 py-2 rounded-xl"
      >
        <ArrowLeft size={16} /> {t('common.back', 'Back to Investigations')}
      </button>

      {/* Header */}
      <div className="p-6 md:p-8 rounded-2xl border border-[#34302A] bg-[#101519] shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
            Level {investigation.levelId}: {investigation.levelName} • {investigation.region} • {investigation.period}
          </div>
          <div className="text-xs font-bold text-[#D9A441] flex items-center gap-1 bg-[#151B20] px-3 py-1 rounded-full border border-[#34302A]">
            <Star size={12} className="fill-[#D9A441]" /> +{investigation.rewards?.legacy || 30} Legacy XP
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#F5F1E8] mb-2">{title}</h1>
        <p className="text-[#C5C9CC] text-sm md:text-base max-w-3xl leading-relaxed">{description}</p>
      </div>

      {/* Main Split View: Inspection vs Clues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Artifact Canvas */}
        <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[380px] shadow-lg overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C5C9CC] absolute top-4 left-4 flex items-center gap-1.5 bg-[#151B20] px-3 py-1.5 rounded-xl border border-[#34302A]">
            <Search size={14} className="text-[#D9A441]" />
            <span>
              {t('investigation.inspect_prompt', 'Click hotspots to inspect clues')} ({inspectedClues.length}/
              {investigation.clues.length})
            </span>
          </div>

          <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center bg-[#151B20] rounded-full border-2 border-[#D9A441]/30 shadow-[0_0_40px_rgba(217,164,65,0.12)] mt-6">
            <span className="text-8xl md:text-9xl select-none filter drop-shadow-xl">
              {investigation.icon}
            </span>

            {/* Clue Hotspots */}
            {investigation.clues.map((clue, index) => {
              const isInspected = inspectedClues.includes(clue.id);
              const isActive = activeClue?.id === clue.id;

              return (
                <button
                  key={clue.id}
                  onClick={() => handleClueClick(clue)}
                  style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
                  title={t(clue.titleKey, clue.title || `Clue ${index + 1}`)}
                  className={`absolute w-9 h-9 -ml-4 -mt-4 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all transform hover:scale-125 focus:outline-none ${
                    isActive ? 'ring-4 ring-[#D9A441]/60 scale-125 z-20' : 'z-10'
                  } ${
                    isInspected
                      ? 'bg-emerald-500 text-[#070A0C] border-2 border-white'
                      : 'bg-[#D9A441] text-[#070A0C] animate-pulse border-2 border-[#070A0C]'
                  }`}
                >
                  {isInspected ? <CheckCircle size={15} /> : index + 1}
                </button>
              );
            })}
          </div>

          {/* Clue Quick Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {investigation.clues.map((clue, idx) => {
              const isInspected = inspectedClues.includes(clue.id);
              const isActive = activeClue?.id === clue.id;
              return (
                <button
                  key={clue.id}
                  onClick={() => handleClueClick(clue)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#D9A441] text-[#070A0C] border-[#D9A441]'
                      : isInspected
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-[#151B20] text-[#C5C9CC] border-[#34302A] hover:border-[#D9A441]/50'
                  }`}
                >
                  <span>Clue {idx + 1}:</span>
                  <span>{t(clue.titleKey, clue.title)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Clue Details & Progress */}
        <div className="bg-[#101519] border border-[#34302A] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#34302A]">
              <h2 className="font-bold text-lg font-serif text-[#F5F1E8]">
                {t('investigation.clues_title', 'Discovered Clues')}
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#151B20] border border-[#34302A] text-[#D9A441]">
                {inspectedClues.length} / {investigation.clues.length} Examined
              </span>
            </div>

            {activeClue ? (
              <div className="p-5 rounded-2xl bg-[#151B20] border border-[#D9A441]/40 space-y-3 animate-fade-in mb-5">
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <h3 className="font-bold text-lg text-[#D9A441]">
                    {t(activeClue.titleKey, activeClue.title)}
                  </h3>
                  {getCertaintyBadge(activeClue.certainty)}
                </div>
                <p className="text-sm text-[#F5F1E8]/90 leading-relaxed">
                  {t(activeClue.textKey, activeClue.text)}
                </p>
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-center text-[#C5C9CC] border-2 border-dashed border-[#34302A] rounded-2xl p-6 mb-5">
                <HelpCircle size={30} className="mb-2 text-[#D9A441]/60" />
                <p className="text-sm">
                  {t(
                    'investigation.select_clue',
                    'Select a numbered hotspot or clue button on the left to examine the physical evidence.'
                  )}
                </p>
              </div>
            )}

            {/* List of all clues */}
            <div className="space-y-2.5">
              {investigation.clues.map((c, i) => {
                const found = inspectedClues.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => handleClueClick(c)}
                    className={`p-3.5 rounded-xl border text-sm flex items-center justify-between transition-all cursor-pointer ${
                      activeClue?.id === c.id
                        ? 'bg-[#151B20] border-[#D9A441]'
                        : found
                        ? 'bg-[#151B20]/80 border-[#34302A] hover:border-[#D9A441]/50'
                        : 'bg-[#090C0F]/60 border-[#34302A]/60 hover:border-[#D9A441]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${
                          found
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-[#151B20] text-[#D9A441] border border-[#D9A441]/40'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <span className="font-bold text-[#F5F1E8] block">
                          {t(c.titleKey, c.title)}
                        </span>
                        {!found && (
                          <span className="text-[11px] text-[#C5C9CC]">Click to inspect this clue</span>
                        )}
                      </div>
                    </div>
                    {found ? (
                      <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-xs font-bold text-[#D9A441]">Inspect →</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Historical Analysis / Claims */}
      <div
        className={`bg-[#101519] border border-[#34302A] rounded-2xl p-6 md:p-8 transition-all duration-500 shadow-xl ${
          allCluesFound ? 'opacity-100' : 'opacity-75'
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="text-xl font-bold font-serif text-[#F5F1E8] flex items-center gap-2">
              <Sparkles className="text-[#D9A441]" size={20} />
              {t('investigation.claims_title', 'Formulate Your Conclusion')}
            </h2>
            {!allCluesFound && (
              <span className="text-xs font-bold text-[#D9A441] bg-[#151B20] px-3 py-1 rounded-full border border-[#D9A441]/30">
                Inspect all {investigation.clues.length} clues above to unlock verification
              </span>
            )}
          </div>
          <p className="text-sm text-[#C5C9CC] mb-6">
            {t(
              'investigation.claims_subtitle',
              'Based ONLY on the physical evidence and historical context you inspected above, select ALL statements that are historically valid.'
            )}
          </p>

          <div className="space-y-3 mb-6">
            {investigation.claims.map(claim => {
              const isSelected = selectedClaims.includes(claim.id);
              let statusStyle = 'border-[#34302A] bg-[#151B20] hover:border-[#D9A441]/50';

              if (isSelected) {
                statusStyle = 'border-[#D9A441] bg-[#D9A441]/10';
              }

              if (submitted) {
                if (claim.isCorrect && isSelected) {
                  statusStyle = 'border-emerald-500 bg-emerald-500/10';
                } else if (!claim.isCorrect && isSelected) {
                  statusStyle = 'border-red-500 bg-red-500/10';
                } else if (claim.isCorrect && !isSelected) {
                  statusStyle = 'border-amber-500 border-dashed bg-amber-500/5';
                }
              }

              return (
                <div key={claim.id} className="space-y-2">
                  <div
                    onClick={() => {
                      if (allCluesFound) toggleClaim(claim.id);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                      allCluesFound ? 'cursor-pointer' : 'cursor-not-allowed'
                    } ${statusStyle}`}
                  >
                    <div
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border shrink-0 transition-colors ${
                        isSelected ? 'bg-[#D9A441] border-[#D9A441] text-[#070A0C]' : 'border-[#C5C9CC]/40'
                      }`}
                    >
                      {isSelected && <CheckCircle size={14} />}
                    </div>
                    <div className="flex-1 text-sm font-medium text-[#F5F1E8]">
                      {t(claim.textKey, claim.text)}
                    </div>
                  </div>

                  {/* Explanation Feedback */}
                  {submitted && (isSelected || claim.isCorrect) && (
                    <div
                      className={`text-xs p-3.5 rounded-xl flex items-start gap-2 ml-4 md:ml-8 ${
                        claim.isCorrect
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-300 border border-red-500/20'
                      }`}
                    >
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{t(claim.feedbackKey, claim.feedback)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isSuccess ? (
            <button
              onClick={handleVerify}
              disabled={!allCluesFound || selectedClaims.length === 0}
              className="w-full py-4 rounded-xl font-bold bg-[#D9A441] text-[#070A0C] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:bg-[#D9A441]/90 transition-all"
            >
              {t('investigation.verify_btn', 'Verify Conclusion')}
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-[#070A0C] mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-emerald-400">
                  {t('investigation.success_title', 'Investigation Complete!')}
                </h3>
                <p className="text-sm text-[#C5C9CC] mt-1">
                  {t(
                    'investigation.success_desc',
                    'You have accurately interpreted the historical evidence and added this artifact to your collection.'
                  )}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/library')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#151B20] border border-[#34302A] hover:border-[#D9A441] text-[#F5F1E8] flex items-center gap-2 transition-colors"
                >
                  <BookOpen size={14} className="text-[#D9A441]" />{' '}
                  {t('investigation.view_library', 'Open Heritage Library')}
                </button>
                <button
                  onClick={() => navigate('/inventory')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#D9A441] text-[#070A0C] flex items-center gap-2 transition-colors"
                >
                  View in Inventory
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestigationDetail;
