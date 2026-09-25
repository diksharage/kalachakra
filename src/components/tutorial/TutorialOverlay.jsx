import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';
import { useTheme } from '../../context/ThemeContext';
import { tutorialSteps } from '../../data/tutorialSteps';
import { X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TutorialOverlay = () => {
  const { t } = useLanguage();
  const { gameState, markTutorialComplete, resetTutorial } = useGame();
  const { playSound } = useAudio();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  
  const isVisible = gameState.onboardingCompleted && !gameState.tutorialCompleted;

  useEffect(() => {
    const handleReplay = () => {
      resetTutorial();
      setCurrentStepIndex(0);
    };
    window.addEventListener('replay-tutorial', handleReplay);
    return () => window.removeEventListener('replay-tutorial', handleReplay);
  }, []);

  const updateTargetRect = useCallback(() => {
    if (!isVisible) return;
    const step = tutorialSteps[currentStepIndex];
    if (step && step.target) {
      const el = document.querySelector(step.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (Number.isFinite(rect.top) && Number.isFinite(rect.left)) {
          setTargetRect({
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: rect.width,
            height: rect.height
          });
          
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else {
        setTargetRect(null); 
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStepIndex, isVisible]);

  useEffect(() => {
    if (isVisible) {
      updateTargetRect();
      window.addEventListener('resize', updateTargetRect);
      window.addEventListener('scroll', updateTargetRect, { passive: true });
      return () => {
        window.removeEventListener('resize', updateTargetRect);
        window.removeEventListener('scroll', updateTargetRect);
      };
    }
  }, [isVisible, updateTargetRect]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleSkip();
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, currentStepIndex]);

  if (!isVisible) return null;

  const step = tutorialSteps[currentStepIndex];
  const isLast = currentStepIndex === tutorialSteps.length - 1;

  const handleNext = () => {
    playSound('ui');
    if (isLast) {
      markTutorialComplete(false);
      navigate('/dashboard');
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    playSound('ui');
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  };

  const handleSkip = () => {
    if (window.confirm(t('tutorial.skip_confirm', 'Skip the tutorial? You can replay it later from Settings.'))) {
      markTutorialComplete(true);
    }
  };

  const pName = gameState.playerName || t('common.traveler', 'Traveler');
  const pType = gameState.playerType || 'Explorer';

  const replaceVars = (text) => {
    if (!text) return '';
    return text.replace('{name}', pName).replace('{type}', t(`onboarding.type_${pType.toLowerCase()}`, pType));
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-auto flex items-center justify-center">
      
      {/* Dimmed Background */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{
          clipPath: targetRect ? `polygon(
            0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
            ${targetRect.left - 8}px ${targetRect.top - 8}px,
            ${targetRect.left - 8}px ${targetRect.bottom + 8}px,
            ${targetRect.right + 8}px ${targetRect.bottom + 8}px,
            ${targetRect.right + 8}px ${targetRect.top - 8}px,
            ${targetRect.left - 8}px ${targetRect.top - 8}px
          )` : 'none'
        }}
      />

      {/* Target Highlight Ring */}
      {targetRect && (
        <div 
          className="absolute border-2 border-gold rounded-lg pointer-events-none"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 20px rgba(212, 166, 74, 0.5)'
          }}
        />
      )}

      {/* Tutorial Card (Fixed Centered Panel) */}
      <div 
        className={`relative z-10 flex flex-col max-h-[85vh] p-6 md:p-8 rounded-2xl shadow-2xl border ${theme === 'light' ? 'bg-[#F4E8D1] text-[#211A15] border-[#A8794F]/30' : 'bg-[#121714] text-[#E8D9B8] border-[#A8794F]/40'}`}
        style={{
          width: 'calc(100vw - 24px)', // Mobile safe width
          maxWidth: '750px',           // Desktop max width
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4 shrink-0">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A45]">
            {t('tutorial.step', 'Step')} {currentStepIndex + 1} / {tutorialSteps.length}
          </span>
          <button onClick={handleSkip} className="text-[#C49A45] hover:text-red-400 transition-colors bg-transparent border-none p-1" aria-label="Skip Tutorial">
            <X size={24} />
          </button>
        </div>

        {/* Content (Compact, scrollable only if necessary) */}
        <div className="overflow-y-auto pr-2 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold font-serif mb-3 text-[#A97932]">
            {replaceVars(t(step.titleKey, step.titleKey))}
          </h3>
          <p className="text-base md:text-lg opacity-90 leading-relaxed">
            {replaceVars(t(step.descKey, step.descKey))}
          </p>
        </div>

        {/* Divider & Footer */}
        <div className="pt-6 border-t border-[#A8794F]/30 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          
          {/* Progress Indicators */}
          <div className="flex gap-2">
            {tutorialSteps.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2.5 h-2.5 rounded-full ${idx === currentStepIndex ? 'bg-[#C49A45] shadow-[0_0_8px_#C49A45]' : 'bg-[#625B4A]'}`}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {currentStepIndex > 0 ? (
              <button 
                onClick={handlePrev}
                className="px-6 py-3 rounded-xl bg-[#211A15] border border-[#625B4A]/50 font-bold hover:bg-[#322820] transition-colors text-[#E8D9B8] shrink-0"
              >
                {t('tutorial.back', 'Back')}
              </button>
            ) : (
              <button 
                onClick={handleSkip}
                className="px-6 py-3 rounded-xl bg-transparent border border-[#625B4A]/50 font-bold hover:bg-[#211A15] transition-colors text-[#625B4A] shrink-0"
              >
                {t('tutorial.skip', 'Skip')}
              </button>
            )}

            <button 
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#A97932] to-[#C49A45] text-[#121714] font-bold shadow-lg hover:shadow-[0_0_15px_rgba(200,150,80,0.4)] transition-all flex items-center gap-2 shrink-0"
            >
              {isLast ? t('tutorial.finish', 'Finish') : t('tutorial.next', 'Next')}
              {!isLast && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
