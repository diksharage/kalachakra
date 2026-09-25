import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { playerTypes } from '../data/playerTypes';
import { getAdaptiveText } from '../utils/ageUtils';

const OnboardingPage = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const { gameState, setPlayerType, completeOnboarding } = useGame();
  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    // Capitalize first letter to match Dashboard's expectations
    const formattedRole = roleId.charAt(0).toUpperCase() + roleId.slice(1);
    setPlayerType(formattedRole);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const finishOnboarding = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  // Adaptive Content for Step 1
  const welcomeText = getAdaptiveText(gameState.ageGroup, {
    '6-8': "KALACHAKRA is a fun game where you explore ancient India! Instead of just reading, you will play games, solve easy puzzles, build fun towns, and learn amazing stories about how people lived a long time ago.",
    '9-11': "KALACHAKRA is an interactive journey through Indian history. Instead of just reading, you will explore ancient cities, discover hidden artifacts, solve historical challenges, and build amazing civilizations.",
    'default': "KALACHAKRA is an interactive journey through Indian civilization, history and culture. Instead of only reading about history, you will explore civilizations, discover how people lived, solve challenges, build settlements, understand trade, explore architecture, experience traditions and preserve heritage."
  });

  // Adaptive Content for Step 2
  const conceptText = getAdaptiveText(gameState.ageGroup, {
    '6-8': "You won't just look at pictures of old cities. You will walk through them! You'll find lost treasures, learn fun facts, match shapes, build cool monuments, and unlock new places to explore.",
    '9-11': "You won't just read about an ancient city. You will explore it! Understand how people lived, discover hidden artifacts, manage resources, solve city challenges, build important monuments, and unlock the next stage of your journey.",
    'default': "You won't just read about a Harappan city. You will explore it. Understand how people lived. Discover its artifacts. Manage resources. Solve city-planning challenges. Build parts of the city. And unlock the next stage of your journey."
  });

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <h1 className="text-5xl md:text-6xl font-serif font-bold gold-gradient-text mb-4">KALACHAKRA</h1>
            <p className="text-xl text-gold tracking-[0.2em] uppercase font-bold mb-8">"{t('auth.tagline')}"</p>
            <div className="bg-main/50 p-6 md:p-8 rounded-2xl border border-content/10 shadow-inner max-w-2xl mx-auto">
              <p className="text-content text-lg leading-relaxed">{conceptText}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-content mb-8">{t('nav.howItWorks')}</h2>
            <div className="flex justify-center items-center gap-2 text-gold font-bold text-sm md:text-base tracking-wider uppercase flex-wrap mb-10">
              <span>Explore</span> <span className="text-content/30">→</span>
              <span>Discover</span> <span className="text-content/30">→</span>
              <span>Learn</span> <span className="text-content/30">→</span>
              <span>Play</span> <span className="text-content/30">→</span>
              <span>Solve</span> <span className="text-content/30">→</span>
              <span>Build</span>
            </div>
            <div className="bg-main/50 p-6 md:p-8 rounded-2xl border border-content/10 text-left shadow-inner">
              <p className="text-content text-lg leading-relaxed whitespace-pre-line">{conceptText}</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <h2 className="text-3xl font-serif font-bold text-center text-content mb-8">{t('onboarding.choosePlayer')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {playerTypes.map((type) => {
                const formattedType = type.id.charAt(0).toUpperCase() + type.id.slice(1);
                const isSelected = gameState.playerType === formattedType;
                
                return (
                  <button 
                    key={type.id}
                    onClick={() => handleRoleSelect(type.id)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col ${
                      isSelected 
                        ? 'bg-surface border-gold shadow-[0_0_20px_rgba(212,166,74,0.3)] transform -translate-y-1' 
                        : 'bg-main/80 border-content/10 hover:border-gold/50 hover:bg-surface/50'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{type.icon}</span>
                      <h3 className={`text-2xl font-bold font-serif ${isSelected ? 'text-gold' : 'text-content'}`}>{type.title}</h3>
                    </div>
                    <p className="text-content/80 mb-4 flex-1">{type.description}</p>
                    <div className="bg-main/50 p-3 rounded-lg border border-content/5">
                      <p className="text-xs text-gold font-bold uppercase mb-2">Preferred Gameplay</p>
                      <div className="flex flex-wrap gap-2">
                        {type.preferredActivities.map((act, i) => (
                          <span key={i} className="text-xs bg-[#F5E8CC]/10 px-2 py-1 rounded text-content/70">{act}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center animate-in fade-in zoom-in duration-500 max-w-md mx-auto">
            <div className="text-6xl mb-6">🏛️</div>
            <h1 className="text-4xl font-serif font-bold text-content mb-4">{t('common.continue')}</h1>
            <p className="text-xl text-gold mb-8">{t('auth.welcome')}, {gameState.name}.</p>
            <div className="bg-surface p-6 rounded-2xl border border-gold/30 mb-8 inline-block shadow-[0_0_30px_rgba(212,166,74,0.15)]">
              <p className="text-content text-lg">You are an <strong>{gameState.playerType}</strong>.</p>
              <p className="text-content/70 text-sm mt-2">{t('onboarding.completeSetup')}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-main text-content flex flex-col relative overflow-hidden  bg-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-main/80 to-main pointer-events-none" />
      
      {/* Header Progress */}
      {step < 4 && (
        <div className="relative z-10 w-full max-w-4xl mx-auto pt-8 px-6 text-center">
          <p className="text-xs font-bold text-gold tracking-widest uppercase mb-4">
            Step {step} of 3
          </p>
          <div className="flex justify-center gap-2 max-w-xs mx-auto">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  s === step ? 'bg-gold' : s < step ? 'bg-gold/50' : 'bg-[#F5E8CC]/20'
                }`} 
              />
            ))}
          </div>
          <p className="text-sm font-bold text-content/50 mt-4">
            {step === 1 && "{t('dashboard.welcome')}"}
            {step === 2 && "How KALACHAKRA Works"}
            {step === 3 && "{t('onboarding.choosePlayer')}"}
          </p>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-6 w-full">
        <div className="w-full max-w-5xl">
          {renderStepContent()}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 w-full max-w-5xl mx-auto p-6 flex justify-between items-center pb-12">
        {step > 1 && step < 4 ? (
          <button 
            onClick={handleBack}
            className="px-6 py-3 border border-content/30 text-content font-bold rounded-xl hover:bg-[#F5E8CC]/10 transition-colors"
          >
            Back
          </button>
        ) : <div />}

        {step === 1 && (
          <div className="flex gap-4 ml-auto">
            <button 
              className="px-6 py-3 border border-gold text-gold font-bold rounded-xl hover:bg-gold/10 transition-colors hidden sm:block"
            >
              Learn {t('nav.howItWorks')}
            </button>
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-gold text-[#171B3A] font-bold rounded-xl shadow-xl shadow-gold/40 hover:bg-[#F5E8CC] transition-all transform hover:-translate-y-1"
            >
              Begin My Journey
            </button>
          </div>
        )}

        {step === 2 && (
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-gold text-[#171B3A] font-bold rounded-xl shadow-xl shadow-gold/40 hover:bg-[#F5E8CC] transition-all transform hover:-translate-y-1"
          >
            Continue
          </button>
        )}

        {step === 3 && (
          <button 
            onClick={handleNext}
            disabled={!gameState.playerType}
            className={`px-8 py-3 font-bold rounded-xl transition-all transform ${
              gameState.playerType 
                ? 'bg-gold text-[#171B3A] shadow-xl shadow-gold/40 hover:bg-[#F5E8CC] hover:-translate-y-1' 
                : 'bg-[#F5E8CC]/20 text-content/50 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        )}

        {step === 4 && (
          <button 
            onClick={finishOnboarding}
            className="mx-auto block px-12 py-4 text-lg bg-gold text-[#171B3A] font-bold rounded-xl shadow-[0_0_30px_rgba(212,166,74,0.5)] hover:bg-[#F5E8CC] transition-all transform hover:-translate-y-1"
          >
            Enter KALACHAKRA
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;







