import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { worldEvents } from '../data/worldEvents';
import { levelThemes } from '../data/levelThemes';
import { AlertCircle, Target, Star, ChevronRight, Lock } from 'lucide-react';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { gameState, resolveEvent } = useGame();
  const { theme } = useTheme();

  const eventData = worldEvents.find(e => e.id === id);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  if (!eventData) return <div className="p-8 text-center text-red-500">Event not found.</div>;

  const currentLevel = gameState.currentLevel || 1;
  const levelThemeData = levelThemes[currentLevel] || levelThemes.default;
  const inventory = gameState.inventory || {};
  
  const isCompleted = gameState.completedEvents?.[id];
  const decidedOptionId = isCompleted || selectedOptionId;
  const decidedOption = eventData.options.find(o => o.id === decidedOptionId);

  const handleDecide = (option) => {
    if (isCompleted) return;
    resolveEvent(eventData.id, option.id, option.requirements, option.consequences);
    setSelectedOptionId(option.id);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 pt-6 space-y-6">
      
      {/* Event Header */}
      <div className={`glass-panel p-8 rounded-2xl border ${levelThemeData.border} ${theme === 'light' ? levelThemeData.bg : 'bg-surface'}`}>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl bg-main border border-content/10 flex items-center justify-center text-4xl shadow-inner shrink-0">
            ⚡
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-content/60 tracking-wider mb-2 flex items-center gap-2">
              <span>{t('event.simulation_label', 'Gameplay Scenario — Historically Inspired')}</span>
            </div>
            <h1 className={`text-3xl font-serif font-bold mb-4 ${levelThemeData.text}`}>{t(eventData.titleKey, eventData.id)}</h1>
            <p className="text-lg text-content/80 leading-relaxed">
              {t(eventData.contextKey, 'A situation requires your attention.')}
            </p>
          </div>
        </div>
      </div>

      {!decidedOption ? (
        <>
          {/* Options Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventData.options.map(opt => {
              // Check requirements
              let canAfford = true;
              for (const [res, cost] of Object.entries(opt.requirements || {})) {
                if ((inventory[res] || 0) < cost) canAfford = false;
              }

              return (
                <div key={opt.id} className={`glass-panel p-6 rounded-2xl border flex flex-col justify-between transition-all ${canAfford ? 'hover:border-gold hover:shadow-lg' : 'opacity-70 bg-surface/50 grayscale'}`}>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t(opt.titleKey, opt.id)}</h3>
                    <p className="text-sm text-content/70 mb-6">{t(opt.descKey, 'Option description')}</p>
                    
                    {/* Requirements block */}
                    {Object.keys(opt.requirements || {}).length > 0 && (
                      <div className="mb-4 text-xs">
                        <span className="font-bold uppercase tracking-wider text-content/50 block mb-1">{t('event.costs', 'Requires:')}</span>
                        {Object.entries(opt.requirements).map(([res, cost]) => (
                          <div key={res} className={`flex gap-2 items-center ${canAfford ? 'text-red-400' : 'text-red-500'}`}>
                            - {cost} <span className="capitalize">{res.replace(/_/g, ' ')}</span>
                            {!canAfford && <Lock size={12} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    disabled={!canAfford}
                    onClick={() => handleDecide(opt)}
                    className="w-full mt-4 py-3 rounded-lg font-bold bg-main border border-content/20 hover:border-gold hover:text-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('event.choose', 'Make Decision')}
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* KALA Hint */}
          <div className="mt-8 bg-main/50 p-4 rounded-xl border border-content/10 flex items-start gap-4">
            <AlertCircle className="text-gold shrink-0" />
            <p className="text-sm text-content/70 italic">"{t(eventData.kalaHintKey, 'Consider your resources carefully before making a choice.')}"</p>
          </div>
        </>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-slide-up">
          <div className="glass-panel p-8 rounded-2xl border border-gold/30 bg-surface">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">{t('event.decision_made', 'Decision Made')}</h2>
            <h3 className="text-2xl font-serif font-bold text-content mb-4">{t(decidedOption.titleKey, decidedOption.id)}</h3>
            <p className="text-content/80 mb-6 leading-relaxed">
              {t(decidedOption.explanationKey, 'Your choice has influenced the settlement.')}
            </p>
            
            <div className="flex gap-4 p-4 bg-main rounded-xl border border-content/10">
              {decidedOption.consequences?.legacy && (
                <div className="flex items-center gap-2 font-bold text-gold">
                  <Star size={16} /> +{decidedOption.consequences.legacy} Legacy
                </div>
              )}
              {decidedOption.consequences?.inventory && Object.entries(decidedOption.consequences.inventory).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 font-bold text-emerald-500">
                  📦 +{v} <span className="capitalize">{k.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`glass-panel p-8 rounded-2xl border ${levelThemeData.border} bg-surface/50`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-content/60 mb-2">
              {t('event.hist_context_title', 'Historical Context')}
            </h4>
            <p className="text-sm text-content/80 leading-relaxed mb-6">
              {t(eventData.historicalContextKey, 'This simulation explores historical strategies.')}
            </p>
            <button onClick={() => navigate(gameState.activeLevelId === eventData.levelId ? `/journey/level/${eventData.levelId}/play` : `/journey/level/${eventData.levelId}`)} className="px-6 py-3 rounded-lg font-bold bg-gold text-main shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              {t('common.continue', 'Continue Journey')} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
