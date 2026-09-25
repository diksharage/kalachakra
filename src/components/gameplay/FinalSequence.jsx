import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { CheckCircle, Trophy, Star } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const FinalSequence = ({ config, onComplete }) => {
  const { t } = useLanguage();
  const { gameState } = useGame();
  const [step, setStep] = useState(0);
  const audio = useAudio();

  // Render all steps immediately to avoid artificial delays as requested
  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 0),
      setTimeout(() => setStep(2), 0),
      setTimeout(() => { setStep(3); if (audio?.playSound) audio.playSound('achievement'); }, 0),
      setTimeout(() => { setStep(4); if (audio?.playSound) audio.playSound('level_complete'); }, 0),
      setTimeout(() => setStep(5), 0),
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#111] flex items-center justify-center p-6 overflow-hidden">
      {/* Background ambient particles (CSS logic) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/30 via-main to-[#111]"></div>
      
      <div className="max-w-2xl w-full text-center relative z-10">
        
        {/* Step 1: Heritage Legacy Project */}
        {step >= 1 && (
          <div className="animate-fade-in mb-8">
            <h3 className="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-2">Heritage Legacy Project</h3>
            <p className="text-xl text-content/80 font-serif">Preservation Successful</p>
          </div>
        )}

        {/* Step 2: Journey Timeline */}
        {step >= 2 && (
          <div className="animate-slide-up flex justify-center mb-10">
            <div className="flex items-center gap-2 text-gold">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(212,166,74,0.8)]"></div>
                  {i < 4 && <div className="w-8 h-px bg-gold/50"></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Achievement */}
        {step >= 3 && (
          <div className="animate-pop-in mb-12">
            <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-br from-gold via-emerald-500 to-teal-500 shadow-2xl">
              <div className="bg-[#111] px-8 py-6 rounded-2xl flex flex-col items-center">
                <Trophy size={48} className="text-gold mb-4" />
                <p className="text-xs text-content/70 tracking-widest uppercase mb-1">Achievement Unlocked</p>
                <h4 className="text-xl font-bold text-white">PRESERVER OF THE LEGACY</h4>
                <div className="mt-3 flex items-center gap-1.5 text-gold text-sm font-bold">
                  <Star size={16} /> +500 Legacy
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 & 5: Title and Actions */}
        {step >= 4 && (
          <div className="animate-slide-up mt-8">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold mb-4 drop-shadow-[0_0_15px_rgba(212,166,74,0.5)]">
              KALACHAKRA COMPLETE
            </h1>
            
            {step >= 5 && (
              <div className="animate-fade-in mt-6">
                <p className="text-xl italic text-content/80 font-serif mb-12">"Play the Past. Build the Future."</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={onComplete}
                    className="px-8 py-4 bg-gradient-to-r from-gold to-emerald-600 text-[#111] font-bold rounded-xl hover:shadow-[0_0_20px_rgba(212,166,74,0.6)] hover:scale-105 transition-all btn-fx w-full sm:w-auto"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalSequence;

