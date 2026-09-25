import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { artifactInvestigations, classificationTypes } from '../data/artifactInvestigations';
import { adaptTextForAge } from '../utils/ageAdapter';
import { levelThemes } from '../data/levelThemes';
import { useTheme } from '../context/ThemeContext';
import { Search, ChevronRight, Eye, CheckCircle2, AlertCircle, Award, ExternalLink, ArrowLeft } from 'lucide-react';

const InvestigationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get('returnTo');
  const { t } = useLanguage();
  const { gameState, completeInvestigation } = useGame();
  const ageGroup = gameState?.ageGroup || '18+';
  const { theme } = useTheme();

  const inv = artifactInvestigations.find(i => i.id === id);

  const [step, setStep] = useState('intro'); // intro, observe, classify, complete
  const [collectedClues, setCollectedClues] = useState([]);
  const [classifications, setClassifications] = useState({}); // { claimId: 'classificationId' }
  const [feedback, setFeedback] = useState({}); // { claimId: 'string' }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (!inv) return <div className="p-8 text-center text-red-500">Investigation not found.</div>;

  const levelThemeData = levelThemes[inv.levelId] || levelThemes[1];
  const isCompletedGlobally = gameState.completedInvestigations?.includes(inv.id);

  const handleCollectClue = (clueId) => {
    if (!collectedClues.includes(clueId)) {
      setCollectedClues([...collectedClues, clueId]);
    }
  };

  const handleClassify = (claimId, classId) => {
    const claim = inv.claims.find(c => c.id === claimId);
    const isCorrect = claim.expectedClassification === classId;
    
    setClassifications({ ...classifications, [claimId]: classId });
    
    if (isCorrect) {
      setFeedback({ ...feedback, [claimId]: { type: 'success', text: t(claim.explanationKey, 'Correct classification!') }});
    } else {
      setFeedback({ ...feedback, [claimId]: { type: 'error', text: t('investigation.feedback_error', 'Not quite. Re-evaluate the evidence.') }});
    }
  };

  const allClaimsCorrect = inv.claims.every(c => classifications[c.id] === c.expectedClassification);

  const handleComplete = () => {
    if (allClaimsCorrect && !isCompletedGlobally) {
      completeInvestigation(inv.id, inv.rewards);
    }
    setStep('complete');
  };

  const renderIntro = () => (
    <div className={`glass-panel p-8 md:p-12 rounded-2xl border ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface'}`}>
      <div className="w-20 h-20 rounded-2xl bg-main border border-content/10 flex items-center justify-center text-4xl mb-6 shadow-inner">
        {inv.icon}
      </div>
      <div className="text-xs uppercase font-bold text-gold tracking-wider mb-2">Level {inv.levelId} Investigation</div>
      <h1 className={`text-4xl font-serif font-bold mb-4 ${levelThemeData.text}`}>{t(inv.titleKey, inv.titleKey)}</h1>
      <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-content/50 mb-8">
        <span>{inv.period}</span> • <span>{inv.region}</span>
      </div>
      
      <p className="text-lg text-content/80 leading-relaxed mb-8 max-w-3xl">
        {t(inv.introductionKey, 'Welcome to the investigation.')}
      </p>

      <button 
        onClick={() => setStep('observe')}
        className="px-8 py-4 rounded-xl font-bold bg-gold text-main shadow-lg shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3"
      >
        <Eye size={20} /> {t('investigation.begin', 'Begin Observation')}
      </button>
    </div>
  );

  const renderObserve = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-bold gold-gradient-text">{t('investigation.step1_title', 'Step 1: Observe & Collect')}</h2>
          <p className="text-sm text-content/70">{t('investigation.step1_desc', 'Click to examine the evidence and collect clues.')}</p>
        </div>
        <div className="text-sm font-bold bg-surface px-4 py-2 rounded-lg border border-content/10">
          Clues: <span className="text-gold">{collectedClues.length}</span> / {inv.clues.length}
        </div>
      </div>

      <div className={`aspect-video w-full rounded-2xl border ${levelThemeData.border} relative overflow-hidden flex items-center justify-center ${theme === 'light' ? levelThemeData.bg : 'bg-surface'}`}>
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')]"></div>
        <div className="text-[100px] md:text-[150px] relative z-0 opacity-50 drop-shadow-2xl">{inv.icon}</div>
        
        {/* Hotspots for clues */}
        {inv.clues.map((clue, idx) => {
          const isCollected = collectedClues.includes(clue.id);
          // Abstract coordinates for demo
          const positions = [
            { top: '20%', left: '30%' },
            { top: '60%', right: '25%' },
            { bottom: '20%', left: '45%' },
            { top: '40%', right: '40%' }
          ];
          const pos = positions[idx % positions.length];

          return (
            <button
              key={clue.id}
              onClick={() => handleCollectClue(clue.id)}
              className={`absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none z-10 ${isCollected ? 'bg-gold border-gold text-main scale-110' : 'bg-main border-content/30 text-content animate-pulse hover:border-gold hover:text-gold'}`}
              style={pos}
              title={t('investigation.examine', 'Examine')}
            >
              {isCollected ? <CheckCircle2 size={24} /> : <Search size={24} />}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {inv.clues.map(clue => {
          const isCollected = collectedClues.includes(clue.id);
          return (
            <div key={clue.id} className={`p-4 rounded-xl border transition-all ${isCollected ? 'bg-surface border-gold/50 shadow-md' : 'bg-surface/30 border-content/10 opacity-50'}`}>
              <div className="flex gap-3 items-start">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 ${isCollected ? 'bg-gold/20 border-gold/30' : 'bg-main border-content/10'}`}>
                  {clue.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-content">{isCollected ? t(clue.titleKey, clue.id) : '???'}</h4>
                  {isCollected && <p className="text-xs text-content/70 mt-1">{t(clue.descriptionKey, 'Clue description')}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button 
          disabled={collectedClues.length < inv.clues.length}
          onClick={() => setStep('classify')}
          className="px-6 py-3 rounded-lg font-bold bg-gold text-main shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {t('investigation.next_step', 'Next: Classify Claims')} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderClassify = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold gold-gradient-text">{t('investigation.step2_title', 'Step 2: Classify Claims')}</h2>
        <p className="text-sm text-content/70">{t('investigation.step2_desc', 'Based on your clues, classify these historical statements.')}</p>
      </div>

      <div className="space-y-8">
        {inv.claims.map((claim, idx) => {
          const selected = classifications[claim.id];
          const f = feedback[claim.id];
          const isCorrect = selected === claim.expectedClassification;

          return (
            <div key={claim.id} className="glass-panel p-6 rounded-2xl border border-content/10 bg-surface">
              <div className="flex gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-main border border-content/20 flex items-center justify-center text-sm font-bold text-content shrink-0">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold font-serif text-content leading-snug pt-1">"{t(claim.statementKey, 'Statement')}"</h3>
              </div>

              <div className="flex flex-wrap gap-2 pl-12 mb-4">
                {classificationTypes.map(c => (
                  <button
                    key={c.id}
                    disabled={isCorrect} // Lock if they got it right
                    onClick={() => handleClassify(claim.id, c.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${
                      selected === c.id
                        ? (isCorrect ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-red-500 text-white border-red-600')
                        : 'bg-main text-content/70 border-content/20 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {t(c.labelKey, c.id)}
                  </button>
                ))}
              </div>

              {f && (
                <div className={`ml-12 p-4 rounded-xl text-sm border flex gap-3 items-start ${
                  f.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
                }`}>
                  {f.type === 'success' ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
                  <p>{f.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button 
          disabled={!allClaimsCorrect}
          onClick={handleComplete}
          className="px-6 py-3 rounded-lg font-bold bg-gold text-main shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {t('investigation.complete_btn', 'Complete Investigation')} <Award size={18} />
        </button>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className={`glass-panel p-8 md:p-12 rounded-2xl border text-center animate-slide-up ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface'}`}>
      <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center text-emerald-500 text-5xl mb-6">
        <Award size={48} />
      </div>
      <h2 className="text-3xl font-serif font-bold text-content mb-2">{t('investigation.completed_title', 'Investigation Complete!')}</h2>
      <p className="text-content/70 mb-8 max-w-lg mx-auto">
        {t('investigation.completed_desc', 'You successfully examined the evidence and applied historical reasoning.')}
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="bg-main border border-gold/30 px-6 py-4 rounded-xl shadow-inner">
          <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Legacy Earned</div>
          <div className="text-2xl font-bold text-content">+{inv.rewards.legacy} ⭐</div>
        </div>
        {inv.rewards.libraryId && (
          <div className="bg-main border border-gold/30 px-6 py-4 rounded-xl shadow-inner">
            <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Library Addition</div>
            <div className="text-2xl font-bold text-content flex items-center gap-2">
              🔎 {t(`library.entry.${inv.rewards.libraryId}.title`, 'New Discovery')}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={() => navigate(returnTo || '/investigations')} className="px-6 py-3 rounded-lg font-bold border border-content/20 bg-main text-content hover:border-gold transition-colors">
          {t('investigation.back', 'Back to Investigations')}
        </button>
        {inv.rewards.libraryId && (
          <button onClick={() => navigate('/library')} className="px-6 py-3 rounded-lg font-bold bg-gold text-main shadow-lg shadow-gold/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
            {t('map.view_library', 'View in Library')} <ExternalLink size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20 pt-6 space-y-6">
      <button onClick={() => navigate(returnTo || '/investigations')} className="flex items-center gap-2 text-sm font-bold text-content/60 hover:text-gold transition-colors mb-4">
        <ArrowLeft size={16} /> {t('common.back', 'Back')}
      </button>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {['intro', 'observe', 'classify', 'complete'].map((s, i) => {
          const steps = ['intro', 'observe', 'classify', 'complete'];
          const currentIdx = steps.indexOf(step);
          const isActive = i <= currentIdx;
          return (
            <React.Fragment key={s}>
              <div className={`h-2 flex-1 rounded-full transition-colors ${isActive ? 'bg-gold' : 'bg-surface border border-content/10'}`} />
              {i < 3 && <div className="w-1 h-1 rounded-full bg-content/20" />}
            </React.Fragment>
          );
        })}
      </div>

      {step === 'intro' && renderIntro()}
      {step === 'observe' && renderObserve()}
      {step === 'classify' && renderClassify()}
      {step === 'complete' && renderComplete()}
    </div>
  );
};

export default InvestigationDetail;
