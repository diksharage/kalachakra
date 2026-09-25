import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { Info, X } from 'lucide-react';

const ContextualHint = ({ hintId, titleKey, descKey, position = 'bottom' }) => {
  const { t } = useLanguage();
  const { gameState, markHintComplete } = useGame();
  const [isVisible, setIsVisible] = useState(true);

  // If hint is already completed in state, don't show
  if (gameState.completedHints?.[hintId] || !isVisible) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    markHintComplete(hintId);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top': return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
      case 'bottom': return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left': return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right': return 'left-full ml-2 top-1/2 -translate-y-1/2';
      default: return 'top-full mt-2 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div className={`absolute z-[50] w-64 p-3 bg-surface border border-gold/40 shadow-xl rounded-xl animate-fade-in ${getPositionClasses()}`}>
      <div className="flex items-start gap-2">
        <Info size={16} className="text-gold shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-1">
            {t(titleKey, 'Tip')}
          </h4>
          <p className="text-xs text-content/80 leading-relaxed">
            {t(descKey, 'Here is a helpful tip.')}
          </p>
          <button 
            onClick={handleDismiss}
            className="mt-2 text-[10px] font-bold px-2 py-1 bg-gold/10 hover:bg-gold/20 text-gold rounded transition-colors"
          >
            {t('tutorial.got_it', 'Got it')}
          </button>
        </div>
        <button onClick={handleDismiss} className="text-content/40 hover:text-content">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default ContextualHint;
